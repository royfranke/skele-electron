/* Npc Registry */
/* Manages NPCs in the world */

export default class NpcRegistry {

    constructor() {
        this.registry = {};
    }

    dirtySlot (_x, _y) {
        return (_x+"_"+_y in this.registry);
    }

    getNpcActions (_x, _y) {
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

    placeNpcActions (npc, _x, _y) { /// This refers to NPC world actions, not NPC body
        var added = this.addNpcActions(npc, _x, _y);
        npc.setRegistration(added,{x: _x, y: _y});
        return added;
        /// Should be feedback for when an npc cannot be placed (for now the only condition is that another npc cannot already be on the tile)
    }

    addNpcActions (npc, _x, _y) {
        // Do not refer to this directly, use placeobject
        if (this.placeEmpty(_x,_y)) {
            this.registry[_x+"_"+_y] = npc;
            return true;
        }
        else {
            // An NPC is already on this tile
            console.log("Someone here already: "+_x+" "+_y);
            return false;
        }
    }

    removeNpcActions (_x, _y) {
        if (!this.placeEmpty(_x,_y)) {
            const npc = this.registry[_x+"_"+_y];
            npc.setRegistration(false);
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