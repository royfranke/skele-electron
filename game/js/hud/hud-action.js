import HudCommon from './hud-common.js';
/*
 * Controls the watch display on the HUD
 */

export default class HudAction extends HudCommon {

    constructor(scene) {
       super(scene);
       
    }

    drawAction (_x,_y, action, selected) {


        let slip_text = this.scene.add.bitmapText(_x,_y, 'SkeleTalk', action, 8).setOrigin(0).setScrollFactor(0).setDepth(100200).setTintFill(0x465e62).setLineSpacing(11);

        let block = this.makeBlock(slip_text.x - 6, slip_text.y - 5, slip_text.displayWidth + 12, 16, (selected ? 'BLOCK_MID_BEIGE_RIGHT' : 'BLOCK_MID_YELLOW'));
        block.setOrigin(0);

        let button_block = this.makeBlock(block.x - 12, block.y, 12, 16, 'BLOCK_MID_ORANGE_LEFT');
        button_block.setOrigin(0);
        let button_text = this.scene.add.bitmapText(button_block.x + 3, button_block.y + 5, 'SkeleTalk', 'X', 8).setOrigin(0).setScrollFactor(0).setDepth(100200).setTintFill(0x465e62).setLineSpacing(11);

        if (!selected) {
            button_block.setVisible(false);
            button_text.setVisible(false);
        }
        return {
            block: block,
            text: slip_text,
            button: button_block,
            button_text: button_text
        };
    }
    
}