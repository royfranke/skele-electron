import HudSide from './hud-side.js';
import KeychainManager from '../keychain/keychain-manager.js';
/*
 * Controls the keychain display on the HUD
 */

export default class HudKeychain extends HudSide {

    constructor(scene) {
        super(scene);
    }

    refreshIcon() {
        var key_icon = this.manager.keychain.getKeyCount();
        if (key_icon > 6) { key_icon = 6; }
        this.side.icon.setFrame('KEY_RING_'+key_icon);
    }

    setVariables() {
        if (this.scene.slot.KEYRING.STATUS.HAS == 'FALSE') {
            return;
        }
        this.manager = new KeychainManager(this.scene);

        this.keytip = 'KEYCHAIN';
        this.colors = {
            selected: 'ITEM_FOCUSED',
            normal: 'BAG_UNFOCUSED',
            frame:'BLOCK_SHALLOW_YELLOW_FRAME'
        };

        var key_icon = this.manager.keychain.getKeyCount();
        if (key_icon > 6) { key_icon = 6; }
        this.icon = 'KEY_RING_'+key_icon;

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
                board: {
                    x: this.view.left + this.view.margin.left + 64,
                    y: this.view.bottom - (this.view.margin.bottom + 72 + 48),
                    width: (this.manager.keychain.keys.length * 32) + 16,
                    height: 72
                }
            },
            focused: {

            }
        };

    }

    //Keys go: {"ADDRESS": address, "SLUG": slug, "COUNT": count}

    openManager() {
        if (this.manager.keychain.keys.length > 0) {
            this.drawKeyring(this.manager.selected);
            this.manager.listen();
        }
    }

    closeManager() {
        this.clearKeyringBoard();
        this.manager.destroyListeners();
    }

    drawKeyring(selected = 0) {
        this.clearKeyringBoard();
        this.key_icons = [];
        this.key_stack = [];
        for (var i=0; i<this.manager.keychain.keys.length; i++) {
            let key = this.manager.keychain.keys[i];
            let x = this.position.unfocused.board.x + (i * 40);
            let y = this.position.unfocused.board.y + 8;
            let keyBlock = this.makeBlock(x, y, 32, 32, (i === selected) ? this.colors.selected : this.colors.normal);
            let keyIcon = this.makeIcon(x, y, 'ITEMS', key.SLUG);
            if (key.COUNT > 1) {
                let stack_indicator = this.makeStackIndicator(x+28, y+28);
                if (stack_indicator != null) {
                    stack_indicator.text.setText(key.COUNT);
                    stack_indicator.text.setVisible(true);
                    stack_indicator.circle.setVisible(true);
                }
                this.key_stack.push(stack_indicator);
            }
            this.key_icons.push(keyIcon);
            this.key_icons.push(keyBlock);

            if (i === selected) {
                var slip = this.makeSlip(x + 32,y + 37, 'HOLD', 'X');
                if (this.slip == null) { this.slip = []; }
                this.slip.push(slip);
            }
        }
    }

    clearKeyringBoard() {
        this.refreshIcon();
        if (this.key_icons != null) {
            for (var i=0; i<this.key_icons.length; i++) {
                this.key_icons[i].destroy();
            }
            this.key_icons = null;
        }
        if (this.key_stack != null) {
            for (var i=0; i<this.key_stack.length; i++) {
                this.key_stack[i].circle.destroy();
                this.key_stack[i].text.destroy();
            }
            this.key_stack = null;
        }
        if (this.slip != null) {
            for (var i=0; i<this.slip.length; i++) {
                this.slip[i].block.destroy();
                this.slip[i].text.destroy();
                this.slip[i].button_text.destroy();
                this.slip[i].button.destroy();
            }
            this.slip = null;
        }


    }

    arrowLeft() {
        this.drawKeyring(this.manager.selected);
    }

    arrowRight() {
        this.drawKeyring(this.manager.selected);
    }

}