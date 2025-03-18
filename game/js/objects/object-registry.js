import KEYLIGHTS from "../config/key-light.js";
/* Object Registry */
/* Manages objects in the world */

export default class ObjectRegistry {

    constructor() {
        this.registry = {};
        this.glass_registry = [];
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

    placeEmpty (_x, _y) {
        if (this.dirtySlot(_x, _y)) {
            return this.registry[_x+"_"+_y] == null;
        }
        else {
            return true;
        }
    }

    placeObject (object, _x, _y) {
        var added = this.addObject(object, _x, _y);
        if (!added) {
            return false;
        }
        return object.setRegistration(added,{x: _x, y: _y});
        /// Should be feedback for when an object cannot be placed (for now the only condition is that another object cannot already be on the tile)
    }

    addObject (object, _x, _y) {
        // Do not refer to this directly, use placeobject
        if (this.placeEmpty(_x,_y)) {
            this.registry[_x+"_"+_y] = [];
            
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
            /// Object needs a method (setRegistration) that can be flagged to trigger an in-world sprite
            return true;
    }

    removeObjects (_x, _y) {
        if (!this.placeEmpty(_x,_y)) {
            var objects = this.registry[_x+"_"+_y];
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
    
}