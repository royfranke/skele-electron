import Keychain from "./keychain.js";
/* Keychain Cards Manager Class */

export default class KeychainManager {

    constructor(scene) {
        this.scene = scene;
        //console.log(this.scene.slot);
        this.keychain = new Keychain(this.scene.slot.KEYS);
        this.selected = 0;
    }

    setSaveFromKeychain() {
        return this.keychain.keys;
    }

    selectNext() {
        this.setSelected(this.selected + 1);
        this.scene.manager.hud.hudKeychain.arrowRight();
    }

    selectPrevious() {
        this.setSelected(this.selected - 1);
        this.scene.manager.hud.hudKeychain.arrowLeft();
    }

    setSelected(selected = 0) {

        if (selected >= this.keychain.keys.length) {
            selected = 0;
        }
        if (selected < 0) {
            selected = this.keychain.keys.length - 1;
        }
        this.last_selected = this.selected;
        this.selected = selected;

    }

    listen() {
        var callback_left = function () {
            this.selectPrevious();
        }
        var callback_right = function () {
            this.selectNext();
        }
        this.scene.events.addListener('INPUT_LEFT_KEYCHAIN', callback_left, this);
        this.scene.events.addListener('INPUT_RIGHT_KEYCHAIN', callback_right, this);
        this.scene.events.addListener('INPUT_SELECT_KEYCHAIN', function () {
            this.putKeyInPocket();
        }, this);
    }

    putKeyInPocket () {
        if (this.selected > this.keychain.keys.length - 1) {
            this.setSelected(0);
        }
        if (this.keychain.keys.length == 0) {
            this.scene.manager.setFocus('PLAYER');
            return;
        }
        var key = this.keychain.keys[this.selected];
        var count = key.COUNT;
        if (count > 0) {
            var result = this.scene.manager.itemManager.newItemToPockets(key.SLUG);
            if (!result) {
                this.scene.manager.hud.hudThinking.tellBrain('My pockets are full.');
                
            }
            else {
                result.setAddress(key.ADDRESS);
                key.COUNT -= 1;
                if (key.COUNT <= 0) {
                    this.keychain.keys.splice(this.selected, 1);
                    if (this.selected >= this.keychain.keys.length) {
                        this.selected = this.keychain.keys.length - 1;
                    }
                }
                this.scene.manager.hud.hudKeychain.drawKeyring(0);
            }
        }
    }

    putKeyOnKeychain (item) {
        let address = item.getAddress();
        this.keychain.addKey(address, 1, item.info.slug);
        this.scene.manager.hud.hudKeychain.refreshIcon();
        return true;
    }

    destroyListeners() {
        this.scene.events.off('INPUT_LEFT_KEYCHAIN');
        this.scene.events.off('INPUT_RIGHT_KEYCHAIN');
    }

}
