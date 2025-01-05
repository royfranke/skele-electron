import ObjectFactory from "./object-factory.js";
import ObjectRegistry from "./object-registry.js";
import AnnouncementRegistry from "../announcements/announcement-registry.js";

/* Object Manager Class */

export default class ObjectManager {

    constructor(scene) {
        this.scene = scene;
        this.announce = new AnnouncementRegistry();
        this.factory = new ObjectFactory(this.scene);
        this.registry = new ObjectRegistry();
        
    }

    update () {
        this.registry.update();
    }

    newObject (slug,items=[]) {
        return this.factory.newObject(slug,items);
    }

    objectInfo (slug) {
        return this.factory.objectInfo(slug);
    }

    discardObject (object) {
        object.destroy();
    }

    newObjectToWorld (_x,_y,slug,items=[]) {
        var object = this.newObject(slug,items);
        var result = this.putObjectInWorld(object,_x,_y);
        if (!result) {
            console.warn('Could not add to world: '+slug);
            return false;
        }
        
        return result;
    }

    putObjectInWorld (object, _x, _y) {

        var result = this.registry.placeObject(object,_x,_y);
        if (!result) {
            console.log('Could not put this object in the world from object manager...');
        }
        if (object.info.solid == 1) {
            this.scene.physics.add.collider(this.scene.player.playerSprite.sprite, object.sprite);
        }
        return result;
    }

    openChest (object) {
        this.scene.manager.setFocus('CHEST');
        this.scene.manager.hud.hudChest.openChest(object);
    }
    
}