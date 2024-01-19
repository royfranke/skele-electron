/* Item Registry */
/* Manages items in the world, not yet adapted for electron */

export default class ItemRegistry {

    registry;

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
        item.setRegistration(added,{x: _x, y: _y});
        return added;
        /// Should be feedback for when an item cannot be placed (for now the only condition is that another item cannot already be on the tile)
    }

    addItem (item, _x, _y) {
        // Do not refer to this directly, use placeitem
        if (this.placeEmpty(_x,_y)) {
            this.registry[_x+"_"+_y] = item;
            /// Item needs a method (setRegistration) that can be flagged to trigger an in-world sprite
            console.log(this.registry);
            return true;
        }
        else {
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
    
}