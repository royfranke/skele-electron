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

    makeBlock(_x, _y, width = 24, height = 24, frameName = 'BLOCK_MID_YELLOW') {
        return this.factory.makeBlock(_x, _y, width, height, frameName);
    }

    makeBitmapText (_x,_y, width, size=24, font='SkeleButton') {
        return this.factory.makeBitmapText(_x, _y, width, size, font);
    }

    makeFocusHint (hint) {
        if (hint != null) {

            let keyTip = {
                block: this.makeBlock(hint.x, hint.y, 18, 18, 'BLOCK_DEEP_BLUE'),
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
            let style = active ? 'SHALLOW_YELLOW' : 'DEEP_BLUE';
            this.hints[tip].block.setFrame('BLOCK_'+style);
        }
    }

    getKeyTip (tip) {
        if (tip != null && this.hints[tip] != undefined ) {
            return this.hints[tip];
        }
    }

    // Not currently being used -- remove?
    changeFocus (from, to) {
        this.setKeyTip(from, false);
        this.setKeyTip(to, true);
    }

}