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
                board: {
                    x: this.view.left + (this.view.margin.left*7.5),
                    y: this.view.top + (this.view.margin.top*3.5),
                    width: 196,
                    height: this.view.height - (this.view.margin.top*3.5 + this.view.margin.bottom + 40)
                }
        };
        this.position.pay_button = {
            x: this.position.board.x + this.position.board.width - 40,
            y: this.position.board.y + this.position.board.height - 32
        }

        this.position.cancel_button = {
            x: this.position.board.x + 8,
            y: this.position.board.y + this.position.board.height - 32
        }

        this.position.alert = {
            x: this.position.board.x + this.position.board.width,
            y: this.position.board.y + this.position.board.height/2
        };
        this.payment_components = [];

    }


    setPaymentState(state) {
        /// FOCUSED, UNFOCUSED
        this.state = state;
    }


    openInterface() {
        
        this.setPaymentState('FOCUSED');

        var button = this.makeButton(this.position.pay_button.x, this.position.pay_button.y,'PAY', 'X', 'SHAMROCK');
        button.click_area.on('pointerdown', () => {
            this.inputSelect();
        });

        var cancel_button = this.makeButton(this.position.pay_button.x - (button.text.displayWidth + 40), this.position.pay_button.y,'CANCEL', 'Z', 'RED');
        cancel_button.click_area.on('pointerdown', () => {
            this.inputBack();
        });

        this.payment_components.push(button.block);
        this.payment_components.push(button.text);    
        this.payment_components.push(button.button);
        this.payment_components.push(button.button_text);
        this.payment_components.push(button.click_area);
        this.payment_components.push(cancel_button.block);
        this.payment_components.push(cancel_button.text);    
        this.payment_components.push(cancel_button.button);
        this.payment_components.push(cancel_button.button_text);
        this.payment_components.push(cancel_button.click_area);

        //this.setupBoard();
        this.manager.listen();
    }

    closeInterface() {
        //this.erasePayment();
        this.manager.destroyListeners();
        this.payment_components.forEach(component => {
            component.destroy();
        });
        this.contents = [];
        this.scene.player.coinpurse.updateTotal();
        this.scene.manager.hud.hudStore.destroyReceipt();
        this.setPaymentState('UNFOCUSED');
        this.scene.manager.setFocus('PLAYER');
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
            if (this.scene.manager.hud.hudStore.bagItems()) {
                this.takePayment(this.scene.player.coinpurse.total,this.scene.manager.hud.hudStore.total*100);
            }
            this.scene.manager.hud.hudPayment.closeInterface();
        }
        else {

            this.makePaymentAlert("You don't have the money, honey!");
        }
    }

    makePaymentAlert(message) {
        var alert = this.makeBlock(this.position.alert.x, this.position.alert.y, 140, 48, 'BLOCK_MID_BEIGE');
        alert.setOrigin(0).setDepth(100300);
        var alert_frame = this.makeBlock(this.position.alert.x, this.position.alert.y, 140, 48, 'BLOCK_SHALLOW_BRICK_EDGE_FRAME');
        alert_frame.setOrigin(0).setDepth(100301);
        var alert_text = this.scene.add.bitmapText(this.position.alert.x + 12, this.position.alert.y + 12, 'SkeleTalk', message, 8).setOrigin(0).setScrollFactor(0).setDepth(100302).setTintFill(0x4b424a).setMaxWidth(120).setLineSpacing(11);
        
        this.scene.time.delayedCall(2000, () => {
            alert.destroy();
            alert_text.destroy();
            alert_frame.destroy();
        }, [], this);
    }

    inputBack() {
        this.scene.events.emit('INPUT_BACK_PAYMENT');
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
        let _x = this.position.board.x + 8;
        let _y = this.position.board.y + 8;

        var coins = [];
        /// Get coinpurse contents
        this.scene.player.coinpurse.updateTotal();
        var content = this.scene.player.coinpurse.getTalliedTotal();
        /*
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
        */
        if (content.length == 0) { 
            // Nothing in coinpurse
        }

        let flag_text = this.scene.add.bitmapText(_x + 20, _y + 10, 'SkeleTalk', content, 8).setOrigin(0).setScrollFactor(0).setDepth(100200).setTintFill(0x465e62).setLineSpacing(11);
        this.payment_components.push(flag_text);

        /*
        let row_arrow_left = this.makeHUDLeftArrow(_x + 32, _y + 4, 'SHADOW');

        let row_arrow_right = this.makeHUDRightArrow(_x + 72, _y + 4, 'SHADOW');
        this.payment_components.push(row_arrow_left);
        this.payment_components.push(row_arrow_right);
        */

        
    }


}