import Store from "./store.js";
/* Store Manager Class */

export default class StoreManager {

    constructor(scene) {
        this.scene = scene;
        this.store = new Store(this.scene);
    }

    listen () {
        var self = this;
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
            self.scene.manager.hud.hudPayment.inputSelect();
        }

        this.scene.events.addListener('INPUT_LEFT_STORE', callback_left, this);
        this.scene.events.addListener('INPUT_RIGHT_STORE', callback_right, this);
        this.scene.events.addListener('INPUT_UP_STORE', callback_up, this);
        this.scene.events.addListener('INPUT_DOWN_STORE', callback_down, this);
        this.scene.events.addListener('INPUT_BACK_STORE', callback_back, this);
        this.scene.events.addListener('INPUT_SELECT_STORE', callback_select, this);
   }

   destroyListeners () {
        this.scene.events.off('INPUT_LEFT_STORE');
        this.scene.events.off('INPUT_RIGHT_STORE');
        this.scene.events.off('INPUT_UP_STORE');
        this.scene.events.off('INPUT_DOWN_STORE');
        this.scene.events.off('INPUT_BACK_STORE');
        this.scene.events.off('INPUT_SELECT_STORE');
   }

    move(direction) {
        console.log("StoreManager: move " + direction);
        switch (direction) {
            case 'LEFT':
                this.scene.manager.hud.hudStore.inputLeft();
            break;
            case 'RIGHT':
                this.scene.manager.hud.hudStore.inputRight();
            break;
            case 'UP':
                this.scene.manager.hud.hudStore.inputUp();
            break;
            case 'DOWN':
                this.scene.manager.hud.hudStore.inputDown();
            break;
        }
    }

    back () {
        this.scene.manager.setFocus('PLAYER');  
    }

}
