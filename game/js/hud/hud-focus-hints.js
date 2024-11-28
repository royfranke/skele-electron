import HudCommon from './hud-common.js';
/*
 * Gets injected into the game scene
 */

export default class HudFocusHints extends HudCommon {

    constructor(scene) {
       super(scene);
    }

    initialize () {
       this.focusHints = [
            {
                char: 'I',
                focus: 'POCKETS',
                x: (this.view.right - 160),
                y: this.view.top + 24
            },
            {
                char: 'N',
                focus: 'NOTEBOOK',
                x: (this.view.left + this.view.margin.left),
                y: this.view.bottom - (this.view.margin.bottom + 56)
            },
        ];

        this.makeFocusHints();

    }

    makeFocusHint (hint) {
        if (hint != null) {
            let keyTip = {
                block: this.makeBlock(hint.x, hint.y, 18, 18, 'BLOCK_DEEP_SAPPHIRE'),
                text: this.makeBitmapText(hint.x+5, hint.y+3, 16, 12, 'SkeleButton')
            };
            keyTip.text.setText(hint.char);
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
        if (tip != null && this.hints[tip] != undefined ) {
            let style = active ? 'SHALLOW_YELLOW' : 'DEEP_SAPPHIRE';
            this.hints[tip].block.setFrame('BLOCK_'+style);
        }
    }

    getKeyTip (tip) {
        if (tip != null && this.hints[tip] != undefined ) {
            return this.hints[tip];
        }
    }

}