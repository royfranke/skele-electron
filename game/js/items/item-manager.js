import ItemFactory from "./item-factory.js";
import ItemRegistry from "./item-registry.js";

/* Item Manager Class */

export default class ItemManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new ItemFactory(this.scene);
        this.registry = new ItemRegistry();
    }

    newItem (slug,items=[]) {
        return this.factory.newItem(slug,items);
    }

    discardItem (item) {
        item.destroy();
    }

    dropItem (item) {
        /// Stub to replace with method that places item in the world
        item.destroy();
    }

    addItemToPockets (item) {
        var result = this.scene.manager.hud.availablePocket(item);
        return result;
    }

    newItemToPockets (slug,items=[]) {
        var item = this.newItem(slug,items);
        var result = this.addItemToPockets(item);
        if (!result) {
            console.warn('Could not add to pocket: '+item);
            console.log(item);
        }
        return item;
    }

    putItemInBag (item,exclude=null) {
        console.log('Putting this item in a bag from item manager...');
        var result = this.scene.manager.hud.availableBag(item,exclude);
        if (!result) {
            this.scene.manager.hud.hudDisplay.tellBrain('No space found...',2000,'missing');
        }
        return result;
    }

    putItemInWorld (item, _x, _y) {
        console.log('Putting this item in the world from item manager...');
        var result = this.registry.placeItem(item,_x,_y);
        if (!result) {
            this.scene.manager.hud.hudDisplay.tellBrain('Something here already',2000,'missing');
        }
        return result;
    }

    
}