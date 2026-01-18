import HudCommon from './hud-common.js';
import StoreManager from '../store/store-manager.js';
/*
 * Controls the map display on the HUD
 */

export default class HudStore extends HudCommon {

    constructor(scene) {
        super(scene);
    }

    initialize() {
        this.board = null;
        this.frame = null;
        this.map_title = null;
        this.manager = new StoreManager(this.scene);
        this.state = 'UNFOCUSED';
        this.selected = 0;
        this.basket = [];
        this.inventory = [];
        this.position = {
            unfocused: {
                basket: {
                    x: this.view.left + (this.view.margin.left*7.5),
                    y: this.view.top + (this.view.margin.top),
                },
                board: {
                    x: this.view.right - (this.view.margin.right*10),
                    y: this.view.top + (this.view.margin.top*3.5),
                    width: 144,
                    height: this.view.height - (this.view.margin.top*3.5 + this.view.margin.bottom + 40)
                },
                receipt: {
                    x: this.view.left + (this.view.margin.left*9),
                    y: this.view.top + (this.view.margin.top*3.5),
                    width: 144,
                    height: this.view.height - (this.view.margin.top*3.5 + this.view.margin.bottom + 40)
                },
                back_button: {
                    x: this.view.left + (this.view.margin.left*7),
                    y: this.view.top + 56
                },
                add_button: {
                    x: this.view.right - (this.view.margin.right*12.25),
                    y: this.view.top + (this.view.margin.top*4),
                },
                remove_button: {
                    x: this.view.right - (this.view.margin.right*12.25),
                    y: this.view.top + (this.view.margin.top*6),
                }
            },
            focused: {

            }
        };

    }


    setStoreState(state) {
        /// FOCUSED, UNFOCUSED
        this.state = state;
    }


    openStore() {
        
        this.setStoreState('FOCUSED');
        this.board = this.makeBlock(this.position.unfocused.board.x, this.position.unfocused.board.y,this.position.unfocused.board.width, this.position.unfocused.board.height,'BLOCK_MID_BEIGE');
        this.frame = this.makeBlock(this.position.unfocused.board.x, this.position.unfocused.board.y,this.position.unfocused.board.width, this.position.unfocused.board.height,'BLOCK_SHALLOW_RED_FRAME');

        this.drawStore();
        this.drawStoreMenu();
        this.manager.listen();
    }

    closeStore() {
        this.eraseStore();
        this.manager.destroyListeners();
        this.board.destroy();
        this.frame.destroy();
        this.setStoreState('UNFOCUSED');
    }

    drawStoreMenu(inventory=null) {
        if (inventory == null) {
            inventory = this.scene.interior.config.listing.sells;
        }
        this.inventory = inventory;
        if (inventory.length == 0) {
            console.warn('No items to sell in store');
            return;
        }
        else {
            console.log('Drawing store menu with ' + inventory.length + ' items');
        }

        var self = this;
        var _x = this.position.unfocused.board.x + 24;
        var _y = this.position.unfocused.board.y + 16;
        var _width = this.position.unfocused.board.width - 32;
        
        this.arrow_right = this.makeHUDRightArrow(_x + this.position.unfocused.board.width - 48, _y + 4, 'SHADOW');
        this.arrow_left = this.makeHUDLeftArrow(_x - 16, _y + 4, 'SHADOW');
        this.add_button = this.makeHUDUpArrow(this.position.unfocused.add_button.x, this.position.unfocused.add_button.y, 'SHADOW');
        this.remove_button = this.makeHUDDownArrow(this.position.unfocused.remove_button.x, this.position.unfocused.remove_button.y, 'SHADOW');

        this.add_remove = this.makeBlock(this.position.unfocused.add_button.x - 8, this.position.unfocused.add_button.y - 8, 32,64,'BLOCK_MID_RED');


        self.store_components.push(this.add_remove);
        self.store_components.push(this.add_button);
        self.store_components.push(this.remove_button);
        self.store_components.push(this.arrow_right);
        self.store_components.push(this.arrow_left);

        this.scene.add.tween({
            targets: [this.add_button],
            y: '+=4',
            duration: 1000,
            yoyo: true,
            ease: 'Sine.easeIn',
            repeat: -1
        });


        this.scene.add.tween({
            targets: [this.remove_button],
            y: '-=4',
            duration: 1000,
            yoyo: true,
            ease: 'Sine.easeIn',
            repeat: -1
        });

        let tween = this.scene.add.tween({
            targets: [this.arrow_left],
            x: '+=4',
            duration: 1000,
            yoyo: true,
            ease: 'Sine.easeIn',
            repeat: -1
        });

        let tweenUp = this.scene.add.tween({
            targets: [this.arrow_right],
            x: '-=4',
            duration: 1000,
            yoyo: true,
            ease: 'Sine.easeIn',
            repeat: -1
        });
        
        let item = inventory[0];

        this.in_basket = this.makeBitmapText(this.position.unfocused.remove_button.x + 8, this.position.unfocused.remove_button.y - 8,32,16,'SkeleTalk');
        this.in_basket.setOrigin(.5, 0.5);
/// see how many of this item is already in the basket
        let count = 0;
        this.basket.forEach(function (basket_item) {
            if (basket_item == item) {
                count++;
            }
        });
        this.in_basket.setText(count);
        this.in_basket.setTintFill(0x522922);

        self.store_components.push(this.in_basket);

        var item_info = self.scene.manager.itemManager.itemInfo(item);
        var item_icon = this.makeIcon(_x,_y - 4, 'ITEMS', item_info.slug)
        var item_price = this.makeBitmapText(_x + 40, _y + 4, _width - 32, 16, 'SkeleTalk');
        
        var item_name = self.makeBitmapText(_x - 8, _y + 32, _width + 8,  8,'SkeleTalk');
        
        
        /// Make the price a string in dollars
        item_name.setText(item_info.name);
        item_name.setTintFill(0x522922);
        
        var item_description = this.makeBitmapText(item_name.x, item_name.y + item_name.displayHeight + 8, _width + 8, 8, 'SkeleTalk');

        item_description.setText(item_info.description);
        item_description.setTintFill(0x4b424a);
        item_description.setLineSpacing(6);
        
        item_price.setText('$' + (item_info.cost/100).toFixed(2));
        item_price.setTintFill(0x333e63);
        
        var item_price_tag = this.makeBlock(item_price.x - 4, item_price.y - 4, item_price.displayWidth + 8, item_price.displayHeight + 8, 'BLOCK_SHALLOW_PINK');
            item_name.setDepth(self.board.depth + 1);
            self.store_components.push(item_name);
            self.store_components.push(item_icon);
            self.store_components.push(item_price);
            self.store_components.push(item_description);
            self.store_components.push(item_price_tag);
        
        
    }

    bagItems () {

        /// Get basket from player's pockets
        let basket_item = this.hasBasket();
        /// Bag items from the store
        if (this.basket.length == 0) {
            //console.warn('No items in basket to bag');
            
            return false;
        }
        let bagged_items = [];
        let self = this;
        let already_bagged = [];
        this.basket.forEach(function (item) {;
            //console.log(item);
            if (already_bagged.includes(item)) {
                //console.warn('Item already bagged, skipping');
                
            }
            else {
                already_bagged.push(item);
                var new_item = self.scene.manager.itemManager.newItem(item);
                if (new_item.info.stack > 1) {
                    let count = 0;
                    self.basket.forEach(function (basket_item) {
                        if (basket_item == item) {
                            count++;
                        }
                    });
                    //console.log(count);
                    new_item.setStackCount(count);
                }
                bagged_items.push(new_item);
            }
            
        });
        // Replace the shopping basket with a plastic bag containing the items
        this.scene.manager.hud.think('Here you go. Tell your auntie I said hi.');
        this.scene.manager.hud.pocket.setPocket(basket_item, 'EMPTY');

        let plastic_bag =  this.scene.manager.itemManager.newItemToPocket(basket_item,'PLASTIC_BAG_1',bagged_items);

        this.basket = [];
        this.eraseBasketInventory();
        return true;
    }

    addToBasket(item) {
        /// Add item to basket
        if (this.basket.length >= 12) {
            console.warn('Basket is full, cannot add more items');
            return;
        }
        this.basket.push(item);
        /// Update the in_basket text
        let count = 0;
        this.basket.forEach(function (basket_item) {
            if (basket_item == item) {
                count++;
            }
        });
        this.in_basket.setText(count);
        this.drawBasketInventory();
        this.scene.manager.hud.hudSound.play('BUY_ADD');
    }

    removeFromBasket(item) {
        /// Remove item from basket
        let index = this.basket.indexOf(item);
        if (index > -1) {
            this.basket.splice(index, 1);
        }
        /// Update the in_basket text
        let count = 0;
        this.basket.forEach(function (basket_item) {
            if (basket_item == item) {
                count++;
            }
        });
        this.in_basket.setText(count);
        this.drawBasketInventory();
        this.scene.manager.hud.hudSound.play('BUY_DECREASE');
    }

    eraseBasketInventory() {
        /// Erase the basket inventory
        if (this.basket_components) {
            this.basket_components.forEach(function (component) {
                component.destroy();
            });
            
        }
        this.basket_components = [];
    }

    drawBasketInventory() {
        this.eraseBasketInventory();
        /// Draw the basket inventory
        if (this.basket.length == 0) {
            console.warn('No items in basket to display');
            return;
        }
        var self = this;
        var _x = this.position.unfocused.basket.x;
        var _y = this.position.unfocused.basket.y;
        var basket_height = this.basket.length > 5 ? 40 : 0;
        var basket_block = self.makeBlock(_x, _y , 196, basket_height + 32, 'BLOCK_MID_RED');

        self.add_button.y = this.position.unfocused.add_button.y + basket_height;
        self.remove_button.y = this.position.unfocused.remove_button.y + basket_height;
        self.add_remove.y = this.position.unfocused.add_button.y + basket_height - 8;
        self.in_basket.y = this.position.unfocused.remove_button.y + basket_height - 8;

        self.basket_components.push(basket_block);
        this.basket.forEach(function (item, index) {
            var item_info = self.scene.manager.itemManager.itemInfo(item);
            if (index > 5) {
                var item_icon = self.makeIcon(_x + ((index - 6) * 32), _y + 40, 'ITEMS', item_info.slug);
            }
            else {
                var item_icon = self.makeIcon(_x + (index * 32), _y, 'ITEMS', item_info.slug);
            }
            
            self.basket_components.push(item_icon);
        });

    }

    inputDown() {
        // Remove item from basket
        if (this.basket.length == 0) {
            console.warn('No items in basket to remove');
            return;
        }
        let first = this.inventory[0];
        this.removeFromBasket(first);

        this.remove_button.setFrame('HUD_ARROW_YELLOW_DOWN');
        let self = this;
        this.scene.time.addEvent({
            delay: 350,
            callback: ()=>{
                self.remove_button.setFrame('HUD_ARROW_SHADOW_DOWN');
            }
        });
    }

    inputUp() {
        // Put item in basket
        let first = this.inventory[0];
        this.addToBasket(first);
        this.add_button.setFrame('HUD_ARROW_YELLOW_DOWN');
        let self = this;
        this.scene.time.addEvent({
            delay: 350,
            callback: ()=>{
                self.add_button.setFrame('HUD_ARROW_SHADOW_DOWN');
            }
        });
    }

    inputLeft() {
        let first = this.inventory.shift();
        this.inventory.push(first);
        this.scene.manager.hud.hudSound.play('BUY_ARROW');
        this.refreshStoreMenu(this.inventory);
    }

    inputRight() {
        let last = this.inventory.pop();
        this.inventory.unshift(last);
        this.scene.manager.hud.hudSound.play('BUY_ARROW');
        this.refreshStoreMenu(this.inventory);
    }

    refreshStoreMenu(inventory=null) {
        this.store_components.forEach(function (component) {
            component.destroy();
        });
        this.store_components = [];
        this.drawStoreMenu();
    }

    drawStore() {

        this.store_components = [];
        
        this.back_button = this.makeBackButton(this.position.unfocused.back_button.x, this.position.unfocused.back_button.y);

    }

    eraseStore() {
        this.store_components.forEach(function (component) {
            component.destroy();
        });
        this.back_button = this.destroySlip(this.back_button);
        this.store_components = [];
    }

    hasBasket () {
        /// Check if player has a basket in their pockets
        let basket_item = this.scene.manager.hud.pocket.findInPockets('BASKET_RED');
        if (basket_item == false) {
            return false;
        }
        return basket_item;
    }

    checkout() {
        /// Assemble a receipt
        /// Get basket from player's pockets
        let basket_item = this.hasBasket();
        if (basket_item == false) {
            // Check if they have an empty pocket
            //console.warn('No basket in pockets to put items in');
            this.scene.manager.hud.think('Ehh, you need a basket! Everyone needs a basket to shop.');
            return false;
        }
        if (this.basket.length == 0) {
            // Check if holding basket
            this.scene.manager.hud.think('This basket is empty. Can\'t buy nothing.');
            return;
        }
        let receipt = [];
        this.basket.forEach(function (item) {
            let item_info = self.scene.manager.itemManager.itemInfo(item);
            receipt.push({
                name: item_info.name,
                cost: item_info.cost
            });
        });

        this.drawReceipt(receipt);
        this.scene.manager.setFocus('PAYMENT');
    }


    drawReceipt(receipt) {
        /// Draw the receipt
        this.board = this.makeBlock(this.position.unfocused.receipt.x, this.position.unfocused.receipt.y,this.position.unfocused.receipt.width, this.position.unfocused.receipt.height,'BLOCK_MID_WHITE');

        var _x = this.position.unfocused.receipt.x + 16;
        var _y = this.position.unfocused.receipt.y + 16;
        var _width = this.position.unfocused.receipt.width - 24;
        let receipt_text = '';
        let total = 0;
        // Get store name for receipt
        let store_name = this.scene.interior.config.listing.name;
        receipt_text += store_name.toUpperCase() + '\n';
        receipt_text += '\n';
        receipt.forEach(function (item) {
            /// Only show the first 18 characters of item.name
            receipt_text += item.name.substring(0, 16).toUpperCase() + ' ... $' + (item.cost/100).toFixed(2) + '\n';
            total += item.cost;
        });
        total = (total/100).toFixed(2);
        receipt_text += '\n';
        receipt_text += '-----------------------\n';
        receipt_text += '\nTOTAL ... $' + total;
        let receipt_bitmap = this.makeBitmapText(_x, _y, _width, 8, 'SkeleReceipt');
        receipt_bitmap.setText(receipt_text);
        receipt_bitmap.setRightAlign();
        receipt_bitmap.setTintFill(0x522922);
        
        this.store_components.push(this.back_button);
        this.store_components.push(this.board);
        this.store_components.push(receipt_bitmap);

        this.total = total;
    }

    destroyReceipt() {
        /// Destroy the receipt
        this.store_components.forEach(function (component) {
            if (component != null) {
                component.destroy();
            }
        });
        this.store_components = [];
        this.board = null;
        this.frame = null;
        this.setStoreState('UNFOCUSED');
    }

}