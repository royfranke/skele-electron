import HudSide from './hud-side.js';
//import KeychainManager from '../keychain/keychain-manager.js';
/*
 * Controls the keychain display on the HUD
 */

export default class HudKeychain extends HudSide {

    constructor(scene) {
        super(scene);
    }

    setVariables() {
        this.keytip = 'KEYCHAIN';
        this.colors = {
            selected: 'ITEM_FOCUSED',
            normal: 'BAG_UNFOCUSED',
            frame:'BLOCK_SHALLOW_YELLOW_FRAME'
        };

        this.icon = 'KEY_RING_3';

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
                    x: this.view.right - (this.view.margin.right*10),
                    y: this.view.top + (this.view.margin.top*3.5),
                    width: 144,
                    height: this.view.height - (this.view.margin.top*3.5 + this.view.margin.bottom + 40)
                }
            },
            focused: {

            }
        };

    }

}