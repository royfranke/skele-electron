/* Object Registry */
/* Manages objects in the world, not yet adapted for electron */

export default class ObjectRegistry {

    registry;

    constructor() {
        this.registry = {};
    }

    dirtySlot (_x, _y) {
        return (_x+"_"+_y in this.registry);
    }

    getObject (_x, _y) {
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
        object.setRegistration(added,{x: _x, y: _y});
        return added;
        /// Should be feedback for when an object cannot be placed (for now the only condition is that another object cannot already be on the tile)
    }

    addObject (object, _x, _y) {
        // Do not refer to this directly, use placeobject
        if (this.placeEmpty(_x,_y)) {
            this.registry[_x+"_"+_y] = object;
            /// Object needs a method (setRegistration) that can be flagged to trigger an in-world sprite
            return true;
        }
        else {
            // An object is already on this tile
            console.log("Something here already: "+_x+" "+_y);
            return false;
        }
    }

    removeObject (_x, _y) {
        if (!this.placeEmpty(_x,_y)) {
            const object = this.registry[_x+"_"+_y];
            object.setRegistration(false);
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