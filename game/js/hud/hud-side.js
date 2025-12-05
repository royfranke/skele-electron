import HudCommon from './hud-common.js';

/*
 * Shared class for side HUD elements like keys, map, and notebook
 */

export default class HudSide extends HudCommon {

    constructor(scene) {
        super(scene);
    }

    setVariables() {
        this.keytip = '';
        this.colors = {
            selected: 'BAG_SELECTED',
            normal: 'BAG_UNFOCUSED',
            frame:'BLOCK_SHALLOW_CREAM_EDGE_FRAME'
        };

        this.icon = '';

        this.position = {
            unfocused: {
                slot: {
                    x: (this.view.left + this.view.margin.left),
                    y: this.view.bottom - (this.view.margin.bottom + 72 + 40)
                },
                icon: {
                    x: (this.view.left + this.view.margin.left),
                    y: this.view.bottom - (this.view.margin.bottom + 72 + 40)
                },
                keytip: {
                    x: (this.view.left + this.view.margin.left),
                    y: this.view.bottom - (this.view.margin.bottom + 120 + 48)
                },
                board: {
                    x: this.view.right - (this.view.margin.right*10),
                    y: this.view.top + (this.view.margin.top*3.5),
                    width: 144,
                    height: this.view.height - (this.view.margin.top*3.5 + this.view.margin.bottom + 40)
                }
            },
            focused: {

            }
        };

        this.position.focused = {
            keytip: {
                x: this.position.unfocused.keytip.x - 48,
                y: this.position.unfocused.keytip.y
            }
        };
    }

    initialize() {
        this.setVariables();

        this.state = 'UNFOCUSED';
        this.selected = 0;
        
        if (this.keytip == '' || this.keytip == null || this.keytip == undefined) {
            return;
        }
        this.add();
        this.tweenFrame();
    }

    tweenFrame() {
        if (this.frame_tween) {
            this.frame_tween.stop();
        }
        this.frame_tween = this.scene.tweens.add({
            targets: [this.side.active_frame],
            scale: .95,
            x: '+=1',
            y: '+=1',
            duration: 500,
            ease: 'Sine.easeIn',
            loop: -1,
            yoyo: true,
        });
    }

    add () {
        if (this.side == null || this.side == undefined) {
            this.side = {icon: null, block: null, click_area: null};
        }
        this.side.block = this.makeBlock(this.position.unfocused.slot.x, this.position.unfocused.slot.y, 32, 32, this.colors.normal);

        var frame_x = this.position.unfocused.slot.x - 3;
        var frame_y = this.position.unfocused.slot.y - 3;
        if (this.position.focused != null && this.position.focused != undefined && this.position.focused.slot != null && this.position.focused.slot != undefined) {
            frame_x = this.position.focused.slot.x - 3;
            frame_y = this.position.focused.slot.y - 3;
        }
        this.side.active_frame = this.makeBlock(frame_x, frame_y, 38, 38, this.colors.frame);
        this.side.active_frame.setDepth(this.side.block.depth+1);
        this.side.active_frame.setVisible(false);

        if (this.side.icon == null || this.side.icon == undefined) {
            this.side.icon = this.makeIcon(this.position.unfocused.icon.x, this.position.unfocused.icon.y,'UI', this.icon);
        }
        
        this.side.click_area = this.makeClickArea(this.position.unfocused.slot.x, this.position.unfocused.slot.y, 56, 32, () => {
            if (this.state == 'UNFOCUSED') {
                this.scene.manager.setFocus(this.keytip);
            }
            else {
                this.scene.manager.setFocus('PLAYER');
            }
        });

    }

    setState(state) {
        /// FOCUSED, UNFOCUSED
        this.state = state;
    }

    openManager() {
        // To be overridden
    }

    open() {
        this.scene.manager.hud.hudFocusHints.setKeyTip(this.keytip, true);
        this.setState('FOCUSED');
        this.side.block.setFrame(this.colors.selected);
        this.side.active_frame.setVisible(true);
        this.openManager();
    }

    closeManager() {
        // To be overridden
    }   

    close() {
        this.closeManager();
        this.side.block.setFrame(this.colors.normal);
        this.side.active_frame.setVisible(false);
        this.setState('UNFOCUSED');
        this.scene.manager.hud.hudFocusHints.setKeyTip(this.keytip, false);
    }

}