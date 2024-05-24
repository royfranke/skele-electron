import STATES from "../config/hud-states.js";
/* global Phaser */
/*
 * Gets injected into the game scene
 */

export default class HudFocusHints {

    constructor(scene, factory) {
       this.scene = scene;
       this.factory = factory;

       this.view = this.scene.manager.getView();

       this.focusHints = [
            {
                char: 'I',
                focus: 'POCKETS',
                x: (this.view.right - (4*38)),
                y: this.view.top + 24
            },
            {
                char: 'N',
                focus: 'NOTEBOOK',
                x: (this.view.left + this.view.margin.left),
                y: this.view.bottom - 168
            },
        ];

        this.makeFocusHints();
    }

    /*
    *   key - focusState, part of screen (mapped to key name maybe?)
    types of keytips -- focus toggle (I, N), preceding an action menu item (X)
    */
    makeFocusHint (hint) {
        if (hint != null) {
            let keyTip =  this.scene.add.dom(hint.x,hint.y, 'div', '', hint.char).setClassName('key-tip').setOrigin(0).setScrollFactor(0);
            return keyTip;
        }
        else {
            return null;
        }
    }

    makeFocusHints () {
        this.hints = {
            PLAYER: null,
            POCKETS: null,
            NOTEBOOK: null,
            PAUSE: null
        };
        for (var i=0; i<this.focusHints.length;i++) {
            var hint = this.makeFocusHint(this.focusHints[i]);
            this.hints[this.focusHints[i].focus] = hint;
        }
    }

    setKeyTip (tip, active=false) {
        if (tip != null) {
            let style = active ? '-active' : '';
            tip.setClassName('key-tip'+style);
        }
    }

    changeFocus (from, to) {
        this.setKeyTip(this.hints[from], false);
        this.setKeyTip(this.hints[to], true);
    }

}