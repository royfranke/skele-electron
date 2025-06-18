/* Payment Manager Class */

export default class PaymentManager {

    constructor(scene) {
        this.scene = scene;
    }

    listen () {
        var callback_left = function () {
            this.move('LEFT');
        }
        var callback_right = function () {
            this.move('RIGHT');
        }
        var callback_up = function () {
            this.move('UP');
        }
        var callback_down = function () {
            this.move('DOWN');
        }
        var callback_back = function () {
            this.back();
        }
        var callback_select = function () {
            this.select();
        }
        this.scene.events.addListener('INPUT_LEFT_PAYMENT', callback_left, this);
        this.scene.events.addListener('INPUT_RIGHT_PAYMENT', callback_right, this);
        this.scene.events.addListener('INPUT_UP_PAYMENT', callback_up, this);
        this.scene.events.addListener('INPUT_DOWN_PAYMENT', callback_down, this);
        this.scene.events.addListener('INPUT_BACK_PAYMENT', callback_back, this);
        this.scene.events.addListener('INPUT_SELECT_PAYMENT', callback_select, this);
   }

   destroyListeners () {
        this.scene.events.off('INPUT_LEFT_PAYMENT');
        this.scene.events.off('INPUT_RIGHT_PAYMENT');
        this.scene.events.off('INPUT_UP_PAYMENT');
        this.scene.events.off('INPUT_DOWN_PAYMENT');
        this.scene.events.off('INPUT_BACK_PAYMENT');
        this.scene.events.off('INPUT_SELECT_PAYMENT');
   }

    move(direction) {
        console.log("PaymentManager: move " + direction);
        switch (direction) {
            case 'LEFT':
                this.scene.manager.hud.hudPayment.inputLeft();
            break;
            case 'RIGHT':
                this.scene.manager.hud.hudPayment.inputRight();
            break;
            case 'UP':
                this.scene.manager.hud.hudPayment.inputUp();
            break;
            case 'DOWN':
                this.scene.manager.hud.hudPayment.inputDown();
            break;
        }
    }

    back () {
        this.scene.manager.setFocus('PLAYER');  
    }

    select () {
        console.log("SELECT");
        this.scene.manager.hud.hudPayment.inputSelect();
    }

}
