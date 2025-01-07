import HudCommon from './hud-common.js';
/*
 * Controls the watch display on the HUD
 */

export default class HudAction extends HudCommon {

    constructor(scene) {
       super(scene);
       
    }

    clearActions () {
        if (this.actionsGroup) {
            this.actionsGroup.forEach(function (action) {
                action.block.destroy();
                action.text.destroy();
                action.button.destroy();
                action.button_text.destroy();
            });
        }
    }

    drawActions (displayActions, x = 0, y = 0) {

        this.clearActions();

        var actionsGroup = [];
        var self = this;
        displayActions.forEach(function (action, index) {
            var selected = false;
            var more = false;
            if (index == 0) {
                selected = true;
            }
            if (index == 1) {
                more = true;
            }
            let newAction = self.drawAction(x, y + (index * 16), action.action, selected);
            actionsGroup.push(newAction);
        });
        this.actionsGroup = actionsGroup;
    }


    drawAction (_x,_y, action, selected) {
        let slip_text = this.scene.add.bitmapText(_x,_y, 'SkeleTalk', action, 8).setScrollFactor(1).setOrigin(0).setDepth(100200).setTintFill(0x465e62).setLineSpacing(11);

        let block = this.makeBlock(slip_text.x - 6, slip_text.y - 5, slip_text.displayWidth + 12, 16, (selected ? 'BLOCK_MID_BEIGE_RIGHT' : 'BLOCK_MID_YELLOW'));
        block.setOrigin(0).setScrollFactor(1);

        let button_block = this.makeBlock(block.x - 12, block.y, 12, 16, 'BLOCK_MID_ORANGE_LEFT');
        button_block.setOrigin(0).setScrollFactor(1);
        let button_text = this.scene.add.bitmapText(button_block.x + 3, button_block.y + 5, 'SkeleTalk', 'X', 8).setOrigin(0).setScrollFactor(1).setDepth(100200).setTintFill(0x465e62).setLineSpacing(11);

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