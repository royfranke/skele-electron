import HudCommon from './hud-common.js';
//import KeychainManager from '../keychain/keychain-manager.js';
/*
 * Controls the keychain display on the HUD
 */

export default class HudKeychain extends HudCommon {

    constructor(scene) {
        super(scene);
    }

    initialize() {

        //this.manager = new KeychainManager(this.scene);
        //this.manager.keychain.initialize();
        this.state = 'UNFOCUSED';
        this.selected = 0;
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
        this.addKeychain();

    }

    addKeychain () {
        this.side = {};
        this.side.block = this.makeBlock(this.position.unfocused.slot.x, this.position.unfocused.slot.y, 32, 32, 'BAG_UNFOCUSED');
        this.side.icon = this.makeIcon(this.position.unfocused.icon.x, this.position.unfocused.icon.y,'UI', 'KEY_RING_1');
        this.side.click_area = this.makeClickArea(this.position.unfocused.slot.x, this.position.unfocused.slot.y, 32, 32, () => {   
            if (this.state == 'UNFOCUSED') {
                this.scene.manager.setFocus('KEYCHAIN');
            }
            else {
                this.scene.manager.setFocus('PLAYER');
            }
        });
    }


    setKeychainState(state) {
        /// FOCUSED, UNFOCUSED
        this.state = state;
    }


    openKeychain() {
        console.log("Opening keychain");
        this.scene.manager.hud.hudFocusHints.setKeyTip('KEYCHAIN', true);
        this.setKeychainState('FOCUSED');

        this.side.block.setFrame('BAG_FOCUSED');

        //this.drawKeychain();
        //this.drawKeychainMenu();
        //this.manager.listen();
    }

    closeKeychain() {
        //this.manager.destroyListeners();
        
        this.side.block.setFrame('BAG_UNFOCUSED');
        this.setKeychainState('UNFOCUSED');
        this.scene.manager.hud.hudFocusHints.setKeyTip('KEYCHAIN', false);
    }

/*
    move (dir='DOWN', increment=4) {
        this.keychain_components.forEach(function (component) {
            switch (dir) {
                case 'UP':
                    component.y += increment;
                    break;
                case 'DOWN':
                    component.y -= increment;
                    break;
                case 'LEFT':
                    component.x -= increment;
                    break;
                case 'RIGHT':
                    component.x += increment;
                    break;
            }
        });
        this.mask();
    }
*/

}