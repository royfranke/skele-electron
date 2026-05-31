import NpcFactory from "./npc-factory.js";

/* Npc Manager Class */

export default class NpcManager {

    constructor(scene) {
        this.scene = scene;
        this.initializeScene(scene);
    }

    create () {
        /*
        let dir = "E";
        let number = "101";
        let street = "Belly Button Street";
        let npc_cords = this.scene.exterior.getMailboxTilesFromAddress(dir, number, street);
      this.newNpcToWorld(npc_cords.x,npc_cords.y,'PATRICE');
      this.newNpcToWorld(npc_cords.x + 2,npc_cords.y,'SKELE_AUNTIE');
      */
                let dir = "W";
                let number = "107";
                let street = "Belly Button Street";
                let npc_cords = this.scene.exterior.getFrontDoorTilesFromAddress(dir, number, street);
                if (npc_cords && typeof npc_cords.x === 'number' && typeof npc_cords.y === 'number') {
                    this.newNpcToWorld(npc_cords.x+2,npc_cords.y-2,'PATRICE');
                } else {
                    if (this.scene.exterior && this.scene.exterior.debug) console.warn('NPC spawn skipped: no front-door coords for', dir, number, street);
                }
      
    }

    update () {
            if (!Array.isArray(this.list)) {
                return;
            }

            this.list.forEach(npc => {
                if (npc && typeof npc.update === 'function') {
                        npc.update();
                }
            });
    }

    initializeScene(scene) {
        this.factory = new NpcFactory(scene);
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

    newNpcToWorld (_x,_y,slug,npcs=[]) {
        var npc = this.newNpc(slug,npcs);
        npc.create(_x,_y);
        this.list.push(npc);
        return npc;
    }

    getNpcBySlug (slug) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].info.slug == slug) {
                return this.list[i];
            }
        }
        return false;
    }
    
    discardNpcBySlug (slug) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].info.slug == slug) {
                this.discardNpc(this.list[i]);
                this.list.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    discardNpc (npc) {
        if (npc.sprite) {
            npc.sprite.destroy();
        }
        if (npc.footMask) {
          npc.footMask.destroy();
        }
        if (npc.footShadow) {
          npc.footShadow.destroy();
        }

        npc = null;
        return true;
    }
}