import NpcFactory from "./npc-factory.js";
import NpcRuntimeProjector from "./npc-runtime-projector.js";

/* Npc Manager Class */

export default class NpcManager {

    constructor(scene) {
        this.scene = scene;
        this.initializeScene(scene);
    }

    create () {

               if (this.projector) this.projector.projectAll();
      
    }

    update() {
        if (!Array.isArray(this.list)) return;
        this.list.forEach(npc => { if (npc?.update) npc.update(); });

        if (this.projector) this.projector.updateAll();
    }

    initializeScene(scene) {
        this.factory = new NpcFactory(scene);
        this.list = [];
        this.newColliderGroup();

        if (scene.manager?.npcSchedule) {
        this.projector = new NpcRuntimeProjector(scene, this);
        }
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