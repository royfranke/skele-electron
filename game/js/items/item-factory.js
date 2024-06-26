import Item from "../object/item.js";
import ItemBag from "../object/item-bag.js";
import ITEMS from "../config/atlas/items.js";
import ACTIONS from "../config/atlas/item-actions.js";
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
            else {
                var item = new Item(this.scene,this.valid_items[slug]);
                //var actions = this.getPocketActions(item);
                //item.setPocketActions(actions);
            }
            
            return item; /// Returns a non-sprite obj
        }
        return false;
    }
/*
    getPocketActions (item) {
        var put_away = false;
        var type = item.info.type;
        ACTIONS[type].actions.forEach(function (action, index) {
            if (action == 'PUT AWAY') {
                put_away = true;
            }
        });

        if (!put_away) {
            ACTIONS[type].actions.push('PUT AWAY');
        }
        return ACTIONS[type].actions;
    }
*/

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