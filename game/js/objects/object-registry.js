import KEYLIGHTS from "../config/key-light.js";
/* Object Registry */
/* Manages objects in the world */

export default class ObjectRegistry {

    constructor(scene = null) {
        this.scene = scene;
        this.registry = {};
        this.glass_registry = [];
        this.maxSolidBaseWidth = 1;
        this.maxSolidBaseHeight = 1;
        this.solidFootprintCounts = new Map();
        this.solidFootprintTilesByObject = new WeakMap();
    }

    update () {
        Object.entries(this.registry).forEach(([key, values]) => {
            if (values != null && values.length > 0) {
                values.forEach(value => {
                    value.update();
                });
            }
        });
    }

    updateLights (light) {
        Object.entries(this.registry).forEach(([key, values]) => {
            if (values != null && values.length > 0) {
                values.forEach(value => {
                    value.setLight(KEYLIGHTS[light]);
                });
            }
        });
    }


    dirtySlot (_x, _y) {
        return (_x+"_"+_y in this.registry);
    }



    findOnActiveTile (slug, pick, _x, _y) {
        let objects = this.getObjects(_x,_y);
        if (objects == null) {return false;}
        var result = false;
        objects.forEach(object => {
            if (pick == 'kind' && !result) {
                if (object.info.slug == slug) {
                    result = true;
                }
            }
            if (pick == 'type' && !result) {
                if (object.info.type == slug) {
                    result = true;
                }
            }
            
        });
        return result;
    }

    getObjects (_x, _y) {
        if (!this.placeEmpty(_x,_y)) {
            return this.registry[_x+"_"+_y];
        }
        return null;
    }

    getObjectsAround (_x, _y) {
        let objects = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                let nx = _x + dx;
                let ny = _y + dy;
                if (!this.placeEmpty(nx, ny)) {
                    let objs = this.registry[nx + "_" + ny];
                    if (objs != null && objs.length > 0) {
                        objects = objects.concat(objs);
                    }
                }
            }
        }
        return objects;
    }

    placeEmpty (_x, _y) {
        if (this.dirtySlot(_x, _y)) {
            return this.registry[_x+"_"+_y] == null;
        }
        else {
            return true;
        }
    }

    placeObject (object, _x, _y, options = {}) {
        var added = this.addObject(object, _x, _y, options);
        if (!added) {
            return false;
        }
        return object.setRegistration(added,{x: _x, y: _y});
        /// Should be feedback for when an object cannot be placed (for now the only condition is that another object cannot already be on the tile)
    }

    addObject (object, _x, _y, options = {}) {
        const syncChunk = options.syncChunk !== false;
        // Do not refer to this directly, use placeobject
        if (this.placeEmpty(_x,_y)) {
            this.registry[_x+"_"+_y] = [];
            
        }

        const slotKey = _x+"_"+_y;
        const incomingSlug = object?.info?.slug ?? null;
        if (incomingSlug != null) {
            const duplicateKind = this.registry[slotKey].some(existing => existing?.info?.slug === incomingSlug);
            if (duplicateKind) {
                return false;
            }
        }

        this.registry[_x+"_"+_y].push(object);
            if (object.info == undefined) {
                console.warn('Object does not have an info property');
                console.warn(object);
                return false;
            }
            if (object.info.type == undefined) {
                console.warn('Object does not have an info.type property');
                console.warn(object);
                return false;
            }
            if (object.info.type == 'WINDOW_EXT_' || object.info.type == 'EXT_DOOR_' || object.info.type == 'STORE_WINDOW_EXT' || object.info.type == 'STORE_DOOR') {
                this.glass_registry.push(object.glass);
            }

            this.trackSolidBaseFootprint(object);
            this.indexSolidFootprint(object, _x, _y);

            if (syncChunk) {
                this.syncChunkObjectAdd(object, _x, _y);
            }
            try {
                if (this.scene?.locale === 'exterior' && this.scene?.exterior?.refreshChunkCollisionForObject) {
                    this.scene.exterior.refreshChunkCollisionForObject(object, _x, _y);
                }
            } catch (e) {}
            /// Object needs a method (setRegistration) that can be flagged to trigger an in-world sprite
            return true;
    }

    removeObjects (_x, _y, options = {}) {
        const syncChunk = options.syncChunk !== false;
        if (!this.placeEmpty(_x,_y)) {
            var objects = this.registry[_x+"_"+_y];
            if (syncChunk && Array.isArray(objects)) {
                objects.forEach(object => {
                    this.syncChunkObjectRemove(object, _x, _y);
                });
            }
            objects.forEach(object => {
                this.unindexSolidFootprint(object);
            });
            try {
                if (this.scene?.locale === 'exterior' && this.scene?.exterior?.refreshChunkCollisionForObject) {
                    objects.forEach(object => {
                        this.scene.exterior.refreshChunkCollisionForObject(object, _x, _y);
                    });
                }
            } catch (e) {}
            objects.forEach(object => {
                object.setRegistration(false);
            });
            this.registry[_x+"_"+_y] = null;

            if (this.registry.hasOwnProperty(_x+"_"+_y)) {
                // Remove the key-value pair
                delete this.registry[_x+"_"+_y];
            }
            return true;
        }
        else {
            // This spot was already empty
            return false;
        }
    }

    syncChunkObjectAdd (object, _x, _y) {
        if (this.scene == null || this.scene.locale !== 'exterior') {
            return;
        }

        const exterior = this.scene.exterior;
        if (exterior == undefined || exterior.upsertChunkObjectEntity == undefined) {
            return;
        }

        exterior.upsertChunkObjectEntity(object, _x, _y);
    }

    syncChunkObjectRemove (object, _x, _y) {
        if (this.scene == null || this.scene.locale !== 'exterior') {
            return;
        }

        const exterior = this.scene.exterior;
        if (exterior == undefined || exterior.removeChunkObjectEntity == undefined) {
            return;
        }

        exterior.removeChunkObjectEntity(object, _x, _y);
    }

    trackSolidBaseFootprint (object) {
        const solid = object?.info?.solid;
        if (!(solid === 1 || solid === true)) {
            return;
        }

        const base = object?.info?.base ?? {};
        const width = Math.max(1, Math.ceil(Number(base.w) || 1));
        const height = Math.max(1, Math.ceil(Number(base.h) || 1));

        if (width > this.maxSolidBaseWidth) {
            this.maxSolidBaseWidth = width;
        }
        if (height > this.maxSolidBaseHeight) {
            this.maxSolidBaseHeight = height;
        }
    }

    getSolidFootprintBounds (object, anchorX, anchorY) {
        const base = object?.info?.base ?? {};
        const width = Math.max(1, Math.ceil(Number(base.w) || 1));
        const height = Math.max(1, Math.ceil(Number(base.h) || 1));
        const startX = Math.floor(Number(anchorX));
        const startY = Math.floor(Number(anchorY));

        return {
            startX,
            startY,
            endX: startX + width - 1,
            endY: startY + height - 1,
        };
    }

    indexSolidFootprint (object, anchorX, anchorY) {
        const solid = object?.info?.solid;
        if (!(solid === 1 || solid === true)) {
            return;
        }

        const bounds = this.getSolidFootprintBounds(object, anchorX, anchorY);
        const keys = [];
        for (let y = bounds.startY; y <= bounds.endY; y++) {
            for (let x = bounds.startX; x <= bounds.endX; x++) {
                const key = `${x}_${y}`;
                keys.push(key);
                this.solidFootprintCounts.set(key, (this.solidFootprintCounts.get(key) ?? 0) + 1);
            }
        }

        this.solidFootprintTilesByObject.set(object, keys);
    }

    unindexSolidFootprint (object) {
        const keys = this.solidFootprintTilesByObject.get(object);
        if (!Array.isArray(keys)) {
            return;
        }

        keys.forEach((key) => {
            const current = this.solidFootprintCounts.get(key) ?? 0;
            if (current <= 1) {
                this.solidFootprintCounts.delete(key);
            }
            else {
                this.solidFootprintCounts.set(key, current - 1);
            }
        });

        this.solidFootprintTilesByObject.delete(object);
    }

    isSolidFootprintBlocked (_x, _y) {
        return (this.solidFootprintCounts.get(`${_x}_${_y}`) ?? 0) > 0;
    }
    
}