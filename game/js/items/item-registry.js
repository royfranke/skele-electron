import KEYLIGHTS from "../config/key-light.js";
/* Item Registry */
/* Manages items on each scene map */

export default class ItemRegistry {

    constructor(scene = null) {
        this.scene = scene;
        this.registry = {};
    }

    dirtySlot (_x, _y) {
        return (_x+"_"+_y in this.registry);
    }

    getItem (_x, _y) {
        if (!this.placeEmpty(_x,_y)) {
            return this.registry[_x+"_"+_y];
        }
        return null;
    }

    getAllItems () {
        let items = [];
        //Change this to Object.entries later
        for (var [key, item] of Object.entries(this.registry)) {
            items.push({'slug': item.info.slug, 'x': key.split("_")[0], 'y': key.split("_")[1], stack: item.stackCount, items: item.getAllItems(), params: item.getParameters()});
        };
        return items;
    }

    placeEmpty (_x, _y) {
        if (this.dirtySlot(_x, _y)) {
            return this.registry[_x+"_"+_y] == null;
        }
        else {
            return true;
        }
    }

    placeItem (item, _x, _y, options = {}) {
        var added = this.addItem(item, _x, _y, options);
        return added;
        /// Should be feedback for when an item cannot be placed (for now the only condition is that another item cannot already be on the tile)
    }

    addItem (item, _x, _y, options = {}) {
        const syncChunk = options.syncChunk !== false;
        // Do not refer to this directly, use placeitem
        if (this.placeEmpty(_x,_y)) {
            this.registry[_x+"_"+_y] = item;
            /// Item needs a method (setRegistration) that can be flagged to trigger an in-world sprite
            item.setRegistration(true,{x: _x, y: _y});
            if (syncChunk) {
                this.syncChunkItemAdd(item, _x, _y);
            }
            return true;
        }
        else {
            if (this.registry[_x+"_"+_y].info.slug == item.info.slug) {
                /// The item in this spot matches the item being placed
                /// Check to see if the item is stackable
                if (this.registry[_x+"_"+_y].isStackable(item.stackCount)) {
                    this.registry[_x+"_"+_y].updateStackCount(item.stackCount);
                    item.setRegistration(false);
                    if (syncChunk) {
                        this.syncChunkItemAdd(this.registry[_x+"_"+_y], _x, _y);
                    }
                    return true;
                }
            }
            // An item is already on this tile
            console.log("Something here already: "+_x+" "+_y);
            return false;
        }
    }

    removeItem (_x, _y, options = {}) {
        const syncChunk = options.syncChunk !== false;
        if (!this.placeEmpty(_x,_y)) {
            const item = this.registry[_x+"_"+_y];
            item.setRegistration(false);
            this.registry[_x+"_"+_y] = null;

            if (this.registry.hasOwnProperty(_x+"_"+_y)) {
                // Remove the key-value pair
                delete this.registry[_x+"_"+_y];
              }

            if (syncChunk) {
                this.syncChunkItemRemove(item, _x, _y);
            }
            return true;
        }
        else {
            // This spot was already empty
            return false;
        }
    }
    
    updateLights (light) {
        Object.entries(this.registry).forEach(([key, value]) => {
            if (value != null) {
                value.setLight(KEYLIGHTS[light]);
            }
        });
    }

    syncChunkItemAdd (item, _x, _y) {
        if (this.scene == null || this.scene.locale !== 'exterior') {
            return;
        }

        const exterior = this.scene.exterior;
        if (exterior == undefined || exterior.upsertChunkItemEntity == undefined) {
            return;
        }

        exterior.upsertChunkItemEntity(item, _x, _y);
    }

    syncChunkItemRemove (item, _x, _y) {
        if (this.scene == null || this.scene.locale !== 'exterior') {
            return;
        }

        const exterior = this.scene.exterior;
        if (exterior == undefined || exterior.removeChunkItemEntity == undefined) {
            return;
        }

        exterior.removeChunkItemEntity(item, _x, _y);
    }
    
}