import HudCommon from './hud-common.js';
import PaymentManager from '../payment/payment-manager.js';
/*
 * Controls the map display on the HUD
 */

export default class HudPayment extends HudCommon {

    constructor(scene) {
        super(scene);
    }

    initialize() {
        this.board = null;
        this.frame = null;
        this.manager = new PaymentManager(this.scene);
        this.state = 'UNFOCUSED';
        this.selected = 0;
        this.payWith = [];

        this.position = {
            unfocused: {
                board: {
                    x: this.view.left + (this.view.margin.left*7.5),
                    y: this.view.top + (this.view.margin.top*3.5),
                    width: 196,
                    height: this.view.height - (this.view.margin.top*3.5 + this.view.margin.bottom + 40)
                }
            },
            focused: {

            }
        };

        this.payment_components = [];

    }


    setPaymentState(state) {
        /// FOCUSED, UNFOCUSED
        this.state = state;
    }


    openInterface() {
        
        this.setPaymentState('FOCUSED');
        this.board = this.makeBlock(this.position.unfocused.board.x, this.position.unfocused.board.y,this.position.unfocused.board.width, this.position.unfocused.board.height,'BLOCK_MID_LILAC_FAT_BORDER');
        this.frame = this.makeBlock(this.position.unfocused.board.x, this.position.unfocused.board.y,this.position.unfocused.board.width, this.position.unfocused.board.height,'BLOCK_SHALLOW_RED_FRAME');

        this.setupBoard();
        this.manager.listen();
    }

    closeInterface() {
        //this.erasePayment();
        this.manager.destroyListeners();
        this.board.destroy();
        this.frame.destroy();
        this.payment_components.forEach(component => {
            component.destroy();
        });
        this.contents = [];
        this.scene.player.coinpurse.updateTotal();
        this.scene.manager.hud.hudStore.destroyReceipt();
        this.setPaymentState('UNFOCUSED');
    }

    takePayment(amount, total) {
        /// Take payment from player
       let returning_amount = amount - total;
       let contents = {PAPER: {}, COIN: {}};
       if (returning_amount > 100) 
       {
           /// Start with Paper money
           returning_amount = Math.floor(returning_amount/100);

           if (returning_amount < 5) {
                contents.PAPER.ONE = returning_amount;
           }
           else if (returning_amount == 5) {
                contents.PAPER.FIVE = 1;
           }
           else if (returning_amount < 10) {
                contents.PAPER.FIVE = 1;
                contents.PAPER.ONE = returning_amount - 5;
           }
           else if (returning_amount == 10) {
                contents.PAPER.TEN = 1;
           }
           else if (returning_amount < 15) {
                contents.PAPER.TEN = 1;
                contents.PAPER.ONE = returning_amount - 10;
           }
           else if (returning_amount == 15) {
            contents.PAPER.TEN = 1;
            contents.PAPER.FIVE = 1;
           }
           else if (returning_amount < 20) {
                contents.PAPER.TEN = 1;
                contents.PAPER.FIVE = 1;
                contents.PAPER.ONE = returning_amount - 15;
           }
           else if (returning_amount == 20) {
                contents.PAPER.TWENTY = 1;
           }
           else if (returning_amount < 25) {
                contents.PAPER.TWENTY = 1;
                contents.PAPER.ONE = returning_amount - 20;
           }
           else if (returning_amount == 25) {
                contents.PAPER.TWENTY = 1;
                contents.PAPER.FIVE = 1;
           }

           returning_amount = amount - total - (returning_amount*100);
       }
         if (returning_amount > 0) {
              /// Add coins
              let coins = [];
              if (returning_amount >= 50) {
                coins.push('QUARTER', 'QUARTER');
                returning_amount -= 50;
              }
              if (returning_amount >= 25) {
                 coins.push('QUARTER');
                 returning_amount -= 25;
              }
              if (returning_amount >= 10) {
                 coins.push('DIME');
                 returning_amount -= 10;
              }
              if (returning_amount >= 5) {
                 coins.push('NICKEL');
                 returning_amount -= 5;
              }
              if (returning_amount >= 1) {
                 coins.push('PENNY');
                 returning_amount -= 1;
              }
              if (returning_amount >= 1) {
                coins.push('PENNY');
                returning_amount -= 1;
             }
             if (returning_amount >= 1) {
                coins.push('PENNY');
                returning_amount -= 1;
             }
             if (returning_amount >= 1) {
                coins.push('PENNY');
                returning_amount -= 1;
             }

              coins.forEach(coin => {
                contents.COIN[coin] = 1;
              });

              this.scene.player.coinpurse.replaceContents(contents);
         }
       
    }

    inputSelect() {
        /// Player is paying-- check if they have enough money
        this.scene.player.coinpurse.updateTotal();
        let hasPayment = this.scene.player.coinpurse.availableAmount(this.scene.manager.hud.hudStore.total*100);
        if (hasPayment) {
            this.takePayment(this.scene.player.coinpurse.total,this.scene.manager.hud.hudStore.total*100);
            this.scene.manager.hud.hudStore.bagItems();
            this.scene.manager.hud.hudPayment.closeInterface();
        }
        else {
            console.log('Does not have payment');
            
        }
        

    }

    inputLeft() {


    }

    inputRight() {
    }

    inputDown() {
        var content = this.scene.player.coinpurse.getTalliedTotal();
        if (content.length > 0) {
            this.selected++;
            if (this.selected >= content.length) {
                this.selected = 0;
            }
        }
        else {
            this.selected = 0;
        }
    }

    inputUp() {
        var content = this.scene.player.coinpurse.getTalliedTotal();
        if (content.length > 0) {
            this.selected--;
            if (this.selected < 0) {
                this.selected = content.length - 1;
            }
        }
        else {
            this.selected = 0;
        }
    }


    setupBoard() {
        let _x = this.position.unfocused.board.x + 8;
        let _y = this.position.unfocused.board.y + 8;

        var coins = [];
        /// Get coinpurse contents
        this.scene.player.coinpurse.updateTotal();
        var content = this.scene.player.coinpurse.getTalliedTotal();
        if (content.length > 0) {
            let coin_slots = [];
            let coin_slot_height = 12;
            let coin_slot_width = 72;
            let coin_slot_spacing = 2;
            var line_height = 0;
            var new_content = [];
            let self = this;
            content.forEach(coin => {
                if (coin.text > 0 && coin.icon < 100) {
                    coin.icon = this.scene.add.sprite(_x + 4, _y + line_height + 5, 'FX', 'COIN_' + coin.icon + '_-2').setOrigin(0).setScrollFactor(0).setDepth(100200);

                    line_height += coin_slot_height + coin_slot_spacing;
                    self.payment_components.push(coin.icon);
                    new_content.push(' x ' + coin.text);
                }
                if (coin.text > 0 && coin.icon >= 100) {
                    coin.icon = coin.icon/100;
                    coin.icon = self.scene.add.sprite(_x + 4, _y + line_height + 5, 'ITEMS', 'PAPER_' + coin.icon + '_').setOrigin(0).setScrollFactor(0).setDepth(100200);
                    line_height += coin_slot_height + coin_slot_spacing;
                    self.payment_components.push(coin.icon);
                    new_content.push(' x ' + coin.text);
                }
            });
            content = new_content;
        }
        
        if (content.length == 0) { 
            // Nothing in coinpurse
        }

        let flag_text = this.scene.add.bitmapText(_x + 20, _y + 10, 'SkeleTalk', content, 8).setOrigin(0).setScrollFactor(0).setDepth(100200).setTintFill(0x465e62).setLineSpacing(11);
        this.payment_components.push(flag_text);

        let row_arrow_left = this.makeHUDLeftArrow(_x + 32, _y + 4, 'SHADOW');

        let row_arrow_right = this.makeHUDRightArrow(_x + 72, _y + 4, 'SHADOW');
        this.payment_components.push(row_arrow_left);
        this.payment_components.push(row_arrow_right);
        
    }


}