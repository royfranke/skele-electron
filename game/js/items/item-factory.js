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

    newItem (item,items=[]) {
        // First check if the item is a slug or object
        if (typeof item === 'string') {
            var slug = item;
        }
        else {
            var slug = item.ITEM;
        }

        if (this.validItem(slug)) {
            if (this.valid_items[slug].type == 'BAG') {
                var item = new ItemBag(this.scene,this.valid_items[slug],items);
            }
            else if (this.valid_items[slug].contains.length > 0) {
                console.log("This item can have contents");
                var item = new ItemContainer(this.scene,this.valid_items[slug],items);
            }
            else {
                var item = new Item(this.scene,this.valid_items[slug]);
            }
            
            return item; /// Returns a non-sprite obj
        }
        console.log("Item not found: ");
        console.log(slug);
        return false;
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