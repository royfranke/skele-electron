/* Action Registry */
/* Manages actions in the world */

export default class ActionRegistry {

    registry;

    constructor() {
        this.registry = {};
    }

    dirtySlot (_x, _y) {
        return (_x+"_"+_y in this.registry);
    }

    getAction (_x, _y) {
        if (!this.placeEmpty(_x,_y)) {
            return this.registry[_x+"_"+_y];
        }
        return null;
    }

    placeReady (_x, _y) {
        if (this.dirtySlot(_x, _y)) {
            if (this.registry[_x+"_"+_y].length > 0) {
                /// TODO
                return true;

            }
        }
        else {
            return true;
        }
    }

    placeEmpty (_x, _y) {
        if (this.dirtySlot(_x, _y)) {
            return this.registry[_x+"_"+_y] == null;
        }
        else {
            return true;
        }
    }

    placeAction (action, _x, _y) {
        var added = this.addAction(action, _x, _y);
        action.setRegistration(added,{x: _x, y: _y});
        return added;
        /// Should be feedback for when an action cannot be placed (for now the only condition is that another action cannot already be on the tile)
    }

    addAction (action, _x, _y) {
        // Do not refer to this directly, use placeaction
        if (this.placeReady(_x,_y)) {
            this.registry[_x+"_"+_y].push(action);
            
            return true;
        }
        else {
            // This action is already on this tile
            console.log("Trying to re-add action: "+_x+" "+_y);
            return false;
        }
    }

    removeAction (_x, _y) {
        if (!this.placeEmpty(_x,_y)) {
            const action = this.registry[_x+"_"+_y];
            action.setRegistration(false);
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