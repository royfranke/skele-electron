import KEYLIGHTS from "../config/key-light.js";
/* Item Registry */
/* Manages items on each scene map */

export default class ItemRegistry {

    constructor() {
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

    placeEmpty (_x, _y) {
        if (this.dirtySlot(_x, _y)) {
            return this.registry[_x+"_"+_y] == null;
        }
        else {
            return true;
        }
    }

    placeItem (item, _x, _y) {
        var added = this.addItem(item, _x, _y);
        return added;
        /// Should be feedback for when an item cannot be placed (for now the only condition is that another item cannot already be on the tile)
    }

    addItem (item, _x, _y) {
        // Do not refer to this directly, use placeitem
        if (this.placeEmpty(_x,_y)) {
            this.registry[_x+"_"+_y] = item;
            /// Item needs a method (setRegistration) that can be flagged to trigger an in-world sprite
            item.setRegistration(true,{x: _x, y: _y});
            return true;
        }
        else {
            if (this.registry[_x+"_"+_y].info.slug == item.info.slug) {
                /// The item in this spot matches the item being placed
                /// Check to see if the item is stackable
                if (this.registry[_x+"_"+_y].isStackable(item.stackCount)) {
                    this.registry[_x+"_"+_y].updateStackCount(item.stackCount);
                    item.setRegistration(false);
                    return true;
                }
            }
            // An item is already on this tile
            console.log("Something here already: "+_x+" "+_y);
            return false;
        }
    }

    removeItem (_x, _y) {
        if (!this.placeEmpty(_x,_y)) {
            const item = this.registry[_x+"_"+_y];
            item.setRegistration(false);
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
    
    updateLights (light) {
        Object.entries(this.registry).forEach(([key, value]) => {
            if (value != null) {
                value.setLight(KEYLIGHTS[light]);
            }
        });
    }
    
}