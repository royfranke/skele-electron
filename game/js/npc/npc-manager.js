import NpcFactory from "./npc-factory.js";
import NpcRegistry from "./npc-registry.js";

/* Npc Manager Class */

export default class NpcManager {

    constructor(scene) {
        this.scene = scene;
        this.initializeScene(scene);
    }

    create () {
        let dir = "E";
        let number = "101";
        let street = "Belly Button Street";
        let npc_cords = this.scene.exterior.getMailboxTilesFromAddress(dir, number, street);
      this.newNpcToWorld(npc_cords.x,npc_cords.y,'CAROL');
      this.newNpcToWorld(npc_cords.x + 2,npc_cords.y,'CAROL');
    }

    update () {
      this.list.forEach(npc => {
        npc.update();
      });
    }

    initializeScene(scene) {
        this.factory = new NpcFactory(scene);
        this.registry = new NpcRegistry();
        this.list = [];
        this.newColliderGroup();
    }

    newColliderGroup () {
        this.npcs = this.scene.physics.add.group();
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