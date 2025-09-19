import ItemFactory from "./item-factory.js";
import ItemRegistry from "./item-registry.js";

/* Item Manager Class */

export default class ItemManager {

    constructor(scene) {
        this.scene = scene;
        this.initializeScene(scene);
    }

    initializeScene(scene) {
        this.factory = new ItemFactory(scene);
        this.registry = new ItemRegistry();
    }

    newItem (slug,items=[]) {
        return this.factory.newItem(slug,items);
    }

    itemInfo (slug) {
        return this.factory.itemInfo(slug);
    }

    discardItem (item) {
        item.destroy();
    }

    dropItem (item) {
        /// Stub to replace with method that places item in the world
        item.destroy();
    }

    addItemToPockets (item,specific_pocket=null) {
        return this.scene.manager.hud.availablePocket(item, specific_pocket);
    }

    newContentToPocket (pocketIndex,slug) {
        // Get the item in this pocket index and add new slug as contents
        var item = this.newItem(slug);
        return this.scene.manager.hud.availableContainer(item, pocketIndex);
    }

    newItemToPocket (pocketIndex,slug,items=[]) {
        var item = this.newItem(slug,items);
        var result = this.addItemToPockets(item,pocketIndex);
        if (!result) {
            console.warn('Could not add to pocket '+ pocketIndex +': '+slug);
            console.log(item);
        }
        return result;
    }


    newItemToPockets (slug,items=[]) {
        var item = this.newItem(slug,items);
        var result = this.addItemToPockets(item);
        if (!result) {
            console.warn('Could not add to pocket: '+slug);
            console.log(item);
        }
        return result;
    }

    newItemToWorld (_x,_y,slug,items=[]) {
        var item = this.newItem(slug,items);
        var result = this.putItemInWorld(item,_x,_y);
        if (!result) {
            console.warn('Could not add to world: '+slug);
            return false;
        }
        return item;
    }

    putItemInBag (item,exclude=null) {
        var result = this.scene.manager.hud.availableBag(item,exclude);
        if (!result) {
            this.scene.manager.hud.hudDisplay.tellBrain('No space found...',2000,'missing');
        }
        return result;
    }

    putItemInWorld (item, _x, _y) {
        var result = this.registry.placeItem(item,_x,_y);
        if (!result) {
            this.scene.manager.hud.hudThinking.think('Something here already');
        }
        else {
            this.scene.manager.handleKeylight('ITEMS');
        }
        return result;
    }

    openBag (item) {
        this.scene.manager.setFocus('CHEST');
        this.scene.manager.hud.hudChest.openBag(item);
    }
    
}