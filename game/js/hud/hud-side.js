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
            normal: 'BAG_UNFOCUSED'
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

        this.add();
    }

    add () {
        if (this.side == null || this.side == undefined) {
            this.side = {icon: null, block: null, click_area: null};
        }
        this.side.block = this.makeBlock(this.position.unfocused.slot.x, this.position.unfocused.slot.y, 32, 32, this.colors.normal);

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
        this.openManager();
    }

    closeManager() {
        // To be overridden
    }   

    close() {
        this.closeManager();
        this.side.block.setFrame(this.colors.normal);
        this.setState('UNFOCUSED');
        this.scene.manager.hud.hudFocusHints.setKeyTip(this.keytip, false);
    }

}