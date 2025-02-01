import Npc from "../object/npc.js";
import NPCS from "../config/atlas/people.js";
/* Npc Factory Class */

export default class NpcFactory {

    constructor(scene) {
        this.scene = scene;
        this.valid_npcs = NPCS;
    }

    npcInfo (slug) {
        if (this.validNpc(slug)) {
            return this.valid_npcs[slug]; /// Returns a non-sprite info set
        }
        return false;
    }

    newNpc (slug,items=[]) {
        if (this.validNpc(slug)) {
            var npc = new Npc(this.scene,this.valid_npcs[slug]);
            return npc; /// Returns a non-sprite obj
        }
        return false;
    }

    validNpc (slug) {
        if (this.valid_npcs.hasOwnProperty(slug)) {
            return true;
        }
        else {
            console.warn("Nonvalid npc slug passed in npc factory: "+slug);
        }
    }

    discardNpc (npc) {
        npc.destroy();
    }

    
}