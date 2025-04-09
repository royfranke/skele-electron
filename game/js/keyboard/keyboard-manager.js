import Keyboard from "./keyboard.js";
/* Keyboard Manager Class */

export default class KeyboardManager {

    constructor(scene) {
        this.scene = scene;
        this.keyboard = new Keyboard(this.scene);
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
        this.scene.events.addListener('INPUT_LEFT_KEYBOARD', callback_left, this);
        this.scene.events.addListener('INPUT_RIGHT_KEYBOARD', callback_right, this);
        this.scene.events.addListener('INPUT_UP_KEYBOARD', callback_up, this);
        this.scene.events.addListener('INPUT_DOWN_KEYBOARD', callback_down, this);
        this.scene.events.addListener('INPUT_BACK_KEYBOARD', callback_back, this);
   }

   destroyListeners () {
        this.scene.events.off('INPUT_LEFT_KEYBOARD');
        this.scene.events.off('INPUT_RIGHT_KEYBOARD');
        this.scene.events.off('INPUT_UP_KEYBOARD');
        this.scene.events.off('INPUT_DOWN_KEYBOARD');
        this.scene.events.off('INPUT_BACK_KEYBOARD');
   }

    move(direction) {
          //this.scene.manager.hud.hudKeyboard.move(direction);

    }

    back () {
        //this.scene.manager.setFocus('PLAYER');  
    }
}
