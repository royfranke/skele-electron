import HudCommon from './hud-common.js';
/*
 * Controls the court/mini game selector
 */

export default class HudCourt extends HudCommon {

    constructor(scene) {
       super(scene);
       
    }

    initialize () {
    var self = this;
    this.choice_labels = ['ZENER','SOCKS','A','B'];
    this.choices = [];
    var block_width = (self.view.width / 4) - (self.view.margin.left+(self.view.margin.left/4));
    var block_height = 64;
    var block_margin = self.view.margin.left;
        for (let i=0; i<this.choice_labels.length; i++) {
            var _x = self.view.left + self.view.margin.left + ((block_margin + block_width)*i);
            var _y = self.view.top + self.view.margin.top;
            var text = self.makeBitmapText(_x + (block_width/2),_y + (block_height/2), block_width, 8, 'SkeleTalk');
            text.setText(this.choice_labels[i]).setOrigin(.5);
            this.choices[i] = {
                block: self.makeBlock(_x, _y, block_width, block_height, 'BLOCK_MID_BLUE_BORDER'),
                frame: self.makeBlock(_x, _y, block_width, block_height, 'BLOCK_SHALLOW_DARK_BLUE_FRAME'),
                text: text
            };
            this.choices[i].block.setInteractive();
            this.choices[i].block.on('pointerdown', function () {
                self.scene.app.appView.courtManager.setSelected(i);
            },this);
        }
    }

    update(selected) {
        for (let i=0; i<this.choices.length; i++) {
            if (i == selected) {
                this.choices[i].block.setTexture('UI', 'BLOCK_MID_CREAM_BORDER');
                this.choices[i].frame.setFrame('BLOCK_SHALLOW_ORANGE_FRAME');
            }
            else {
                this.choices[i].block.setTexture('UI', 'BLOCK_MID_BLUE_BORDER');
                this.choices[i].frame.setFrame('BLOCK_SHALLOW_DARK_BLUE_FRAME');
            }
        }
    }

    
}