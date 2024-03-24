import NpcFactory from "./npc-factory.js";
import NpcRegistry from "./npc-registry.js";

/* Npc Manager Class */

export default class NpcManager {

    constructor(scene) {
        this.scene = scene;
        this.initializeScene(scene);
    }

    create () {
      this.newNpcToWorld(40,40,'CAROL');
    }

    update () {
      var registry = this.registry;
      this.list.forEach(npc => {
        npc.update();
      });
    }

    initializeScene(scene) {
        this.factory = new NpcFactory(scene);
        this.registry = new NpcRegistry();
        this.list = [];
    }

    newNpc (slug,items=[]) {
        return this.factory.newNpc(slug,items);
    }

    npcInfo (slug) {
        return this.factory.npcInfo(slug);
    }

    discardNpc (npc) {
        npc.destroy();
    }


    newNpcToWorld (_x,_y,slug,npcs=[]) {
        var npc = this.newNpc(slug,npcs);
        npc.create(_x,_y);
        this.list.push(npc);
    }
    
}