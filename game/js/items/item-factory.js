import Item from "../object/item.js";
import ItemBag from "../object/item-bag.js";
import ItemContainer from "../object/item-container.js";
import ITEMS from "../config/atlas/items.js";
/* Item Factory Class */

export default class ItemFactory {

    constructor(scene) {
        this.scene = scene;
        this.valid_items = ITEMS;
    }

    itemInfo (slug) {
        if (this.validItem(slug)) {
            return this.valid_items[slug]; /// Returns a non-sprite info set
        }
        return false;
    }

    newItem (slug,items=[]) {
        if (this.validItem(slug)) {
            if (this.valid_items[slug].type == 'BAG') {
                var item = new ItemBag(this.scene,this.valid_items[slug],items);
            }
            else if (this.valid_items[slug].contains.length > 0) {
                var item = new ItemContainer(this.scene,this.valid_items[slug],items);
                var actions = this.getPocketActions(item);
                item.setPocketActions(actions);
            }
            else {
                var item = new Item(this.scene,this.valid_items[slug]);
                var actions = this.getPocketActions(item);
                item.setPocketActions(actions);
            }
            
            return item; /// Returns a non-sprite obj
        }
        console.log("Item not found: ");
        console.log(slug);
        return false;
    }

    getPocketActions (item) {
        var put_away = false;
        var type = item.info.type;
        var actions = item.info.actions;
        var actions_simple = [];
        actions.forEach(function (action, index) {
            if (action.name == 'PUT AWAY') {
                put_away = true;
            }
            actions_simple.push(action.name)
        });

        if (!put_away) {
            actions_simple.push('PUT AWAY');
        }
        return actions_simple;
    }


    validItem (slug) {
        if (this.valid_items.hasOwnProperty(slug)) {
            return true;
        }
        else {
            console.warn("Nonvalid item slug passed in item factory: "+slug);
        }
    }

    discardItem (item) {
        item.destroy();
    }

    
}