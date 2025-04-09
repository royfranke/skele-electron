import HudCommon from './hud-common.js';
import KeyboardManager from '../keyboard/keyboard-manager.js';
/*
 * Controls the map display on the HUD
 */

export default class HudKeyboard extends HudCommon {

    constructor(scene) {
        super(scene);
    }

    initialize() {
        this.board = null;
        this.frame = null;
        this.keyboard_title = null;
        this.manager = new KeyboardManager(this.scene);
        this.manager.keyboard.initialize();
        this.state = 'UNFOCUSED';
        this.keyboard_components = [];
        this.position = {
            board: {
                x: this.view.left + (this.view.margin.left*7.5),
                y: this.view.top + (this.view.margin.top),
                width: 196,
                height: this.view.height - (this.view.margin.top + this.view.margin.bottom)
            }
        };
    }

    setKeyboardState(state) {
        /// FOCUSED, UNFOCUSED
        this.state = state;
    }


    openKeyboard() {
        this.setKeyboardState('FOCUSED');
        this.board = this.makeBlock(this.position.board.x, this.position.board.y,this.position.board.width, this.position.board.height,'BLOCK_MID_CREAM');
        this.frame = this.makeBlock(this.position.board.x, this.position.board.y,this.position.board.width, this.position.board.height,'BLOCK_SHALLOW_GREEN_FRAME');

        this.drawKeyboard();
        this.manager.listen();
    }

    closeKeyboard() {
        this.eraseKeyboard();
        this.manager.destroyListeners();
        this.board.destroy();
        this.frame.destroy();
        this.setKeyboardState('UNFOCUSED');
    }

    drawKeyboard() {

    }

    eraseKeyboard() {
        this.keyboard_components.forEach(function (component) {
            component.destroy();
        });
        this.board.destroy();
        this.frame.destroy();
        this.keyboard_components = [];

    }


}