import HudAction from "./hud-action.js"; //Extends HudCommon
import HudChest from "./hud-chest.js"; //Extends HudCommon
import HudCoinpurse from "./hud-coinpurse.js"; //Extends HudCommon
import HudDialog from "./hud-dialog.js";
import HudDisplay from "./hud-display.js";
import HudFocusHints from "./hud-focus-hints.js";
import HudHealth from "./hud-health.js";    //Extends HudCommon
import HudInput from "./hud-input.js";
import HudKeyboard from "./hud-keyboard.js"; //Extends HudCommon
import HudKeychain from "./hud-keys.js"; //Extends HudCommon
import HudQuest from "./hud-quest.js"; //Extends HudCommon
import HudMap from "./hud-map.js"; //Extends HudCommon
import HudNotebook from "./hud-notebook.js"; //Extends HudCommon
import HudNumberPad from "./hud-numberpad.js"; //Extends HudCommon
import HudPayment from "./hud-payment.js"; //Extends HudCommon
import HudPocket from "./hud-pocket.js";
import HudPockets from "./hud-pockets.js"; //Extends HudCommon
import HudSound from "./hud-sound.js";
import HudState from "./hud-state.js";
import HudThinking from "./hud-thinking.js"; //Extends HudCommon
import HudWatch from "./hud-watch.js"; //Extends HudCommon
import HudZener from "./hud-zener.js"; //Extends HudCommon
import HudStore from "./hud-store.js"; //Extends HudCommon
import HudSocks from "./hud-socks.js"; //Extends HudCommon

/*
 * Manages HUD Elements and Classes
 */

export default class HudManager {

    constructor(scene) {
        this.scene = scene;
        this.verbose = false;
        this.initialize();
    }

    initialize() {
        console.log("Initializing base HUD");

        this.hudState = new HudState();
        this.state = this.getState();
        this.hudDialog = new HudDialog(this.scene);

        this.hudPockets = new HudPockets(this.scene);
        this.pocket = new HudPocket(this.scene);
        this.hudFocusHints = new HudFocusHints(this.scene);
        this.hudCoinpurse = new HudCoinpurse(this.scene);
        this.hudInput = new HudInput(this.scene);
        this.hudSound = new HudSound(this.scene);
        this.hudKeyboard = new HudKeyboard(this.scene);
    }

    initializeGameHUD() {
        /// Use this method to gather managers that are not needed for the tutorial/new game
        console.log("Initializing game HUD");
        this.hudThinking = new HudThinking(this.scene);
        this.hudNumberPad = new HudNumberPad(this.scene);
        this.hudChest = new HudChest(this.scene);
        this.hudHealth = new HudHealth(this.scene);
        this.hudWatch = new HudWatch(this.scene);
        this.hudNotebook = new HudNotebook(this.scene);
        this.hudKeychain = new HudKeychain(this.scene);
        this.hudMap = new HudMap(this.scene);
        this.hudQuest = new HudQuest(this.scene);
        this.hudAction = new HudAction(this.scene);
        this.hudZener = new HudZener(this.scene);
        this.hudSocks = new HudSocks(this.scene);
        this.hudStore = new HudStore(this.scene);
        this.hudPayment = new HudPayment(this.scene);
        this.hudDisplay = new HudDisplay(this.scene);

        this.hudCoinpurse.addHiddenCoinPurse();

    }


    getState() {
        return this.hudState.getState(); // State Object
    }

    setState(state_string) {
        if (this.verbose) { console.log('Set Hud state: ' + state_string); }
        return this.hudState.setState(state_string);
    }

    getLastState() {
        return this.hudState.getLastState(); // State Object
    }

    getView() {
        return this.scene.manager.getView(); // View Object
    }

    update() {
        this.last_state = this.state;
        this.state = this.getState();

        if (this.last_state.name != this.state.name) {
            this.stateChanged();
        }

        if (this.state.input) {
            for (const [key, value] of Object.entries(this.scene.app.input.INPUT)) {
                if (this.scene.app.input.INPUT[key].TAP) {
                    if (this.verbose) { console.log(key); }
                    this.hudInput.input(key); // Input refreshes display
                    //this.hudSound.play('UI_ARROW');
                }
            }
        }
        if (this.hudWatch != undefined) {
            this.hudWatch.setWatch(this.scene.manager.time.getDigitalTime());
        }

        if (this.state.name == 'SOCKS_FOCUSED') {
            this.hudSocks.update();
        }

    }


    arrowDown(slot_x) {
        this.hudPockets.arrowDown(slot_x);
    }

    refreshDisplay() {
        return this.hudPockets.refreshDisplay();
    }

    refreshChest() {
        return this.hudChest.refreshChest();
    }

    closeChest() {
        this.hudChest.closeChest();
    }
    
    tapAction(slot_x, action_y, action) {
        this.hudPockets.tapAction(slot_x, action_y);
        this.scene.manager.hud.pocket.doAction(slot_x, action);
    }

    tapHold(slot_x) {
        this.tapSlip(slot_x);
        var pocket = this.pocket.getPocket(slot_x);
        var state = pocket.STATE;
        if (state != 'EMPTY') {
            var item = pocket[state].pullItem(0);
            var placed = this.scene.manager.hud.availablePocket(item);
            if (placed != false) {
                console.log("Placed! Refreshing");
                this.refreshDisplay();
            }
            else {
                var sound_var = Phaser.Math.RND.between(1, 3);
                this.scene.manager.hud.hudSound.play('SKELE_INVALID_' + sound_var);
                this.scene.manager.hud.hudThinking.tellBrain('My hands are full...');
                //put the thing back in the bag
                pocket[state].bagItem(item,0);
            }
        }
    }

    tapSlip(slot_x) {
        this.hudPockets.tapSlip(slot_x);
        //this.hudSound.play('UI_SELECT');
        //TODO: replace with more subtle sound
    }
    /*
        newPocketTip(message,duration=0) {
            this.hudDisplay.newPocketTip(message,duration);
        }
    */
    availablePocket(item, specific_pocket = null) {
        return this.pocket.availablePocket(item, specific_pocket);
    }

    availableContainer(item) {
        return this.pocket.availableContainer(item);
    }

    stateChanged() {
        if (this.state.name == 'INVISIBLE') {
            this.hudPockets.pocketsVisible(false);
        }
        /// Show Pockets
        if (!this.last_state || this.last_state.name == 'INVISIBLE') {
            this.hudPockets.pocketsVisible(true);
        }
        else {
            if (this.state.name == 'POCKETS_FOCUSED') {
                this.hudPockets.openPockets();
                this.hudCoinpurse.openCoinpurse();
            }
            if (this.last_state.name == 'POCKETS_FOCUSED' && this.state.name != 'POCKETS_FOCUSED') {
                this.hudPockets.closePockets();
                this.hudCoinpurse.closeCoinpurse();
            }
            if (this.last_state.name != 'KEYCHAIN_FOCUSED' && this.state.name == 'KEYCHAIN_FOCUSED') {
                this.hudKeychain.openKeychain();
            }
            if (this.state.name != 'KEYCHAIN_FOCUSED' && this.last_state.name == 'KEYCHAIN_FOCUSED') {
                this.hudKeychain.closeKeychain();
            }
            if (this.last_state.name != 'NOTEBOOK_FOCUSED' && this.state.name == 'NOTEBOOK_FOCUSED') {
                this.hudNotebook.openNotebook();
            }
            /// Close Notebook
            if (this.state.name != 'NOTEBOOK_FOCUSED' && this.last_state.name == 'NOTEBOOK_FOCUSED') {
                this.hudNotebook.closeNotebook();
            }

            if (this.last_state.name != 'NUMBERPAD_FOCUSED' && this.state.name == 'NUMBERPAD_FOCUSED') {
                this.hudNumberPad.openNumberPad();
            }
            /// Close NumberPad
            if (this.state.name != 'NUMBERPAD_FOCUSED' && this.last_state.name == 'NUMBERPAD_FOCUSED') {
                this.hudNumberPad.closeNumberPad();
            }

            if (this.last_state.name != 'MAP_FOCUSED' && this.state.name == 'MAP_FOCUSED') {
                this.hudMap.openMap();
            }
            /// Close Map
            if (this.state.name != 'MAP_FOCUSED' && this.last_state.name == 'MAP_FOCUSED') {
                this.hudMap.closeMap();
            }
            if (this.last_state.name != 'DIALOG_FOCUSED' && this.state.name == 'DIALOG_FOCUSED') {
                this.hudDialog.focusDialog();
            }
            /// Close Dialog
            if (this.state.name != 'DIALOG_FOCUSED' && this.last_state.name == 'DIALOG_FOCUSED') {
                this.hudDialog.clearDialog();
            }

            /// Open Store Interface
            if (this.state.name == 'STORE_FOCUSED' && this.last_state != null && this.last_state.name != 'STORE_FOCUSED') {
                this.hudStore.openStore();
            }

            /// Close Store Interface
            if (this.state.name != 'STORE_FOCUSED' && this.last_state != null && this.last_state.name == 'STORE_FOCUSED') {
                this.hudStore.closeStore();
            }


            /// Open Payment Interface
            if (this.state.name == 'PAYMENT_FOCUSED' && this.last_state != null && this.last_state.name != 'PAYMENT_FOCUSED') {
                this.hudPayment.openInterface();
            }

            /// Close Payment Interface
            if (this.state.name != 'PAYMENT_FOCUSED' && this.last_state != null && this.last_state.name == 'PAYMENT_FOCUSED') {
                this.hudPayment.closeInterface();
            }

        }


        /// Open Card Game (Zener)
        if (this.state.name == 'ZENER_FOCUSED' && this.last_state != null && this.last_state.name != 'ZENER_FOCUSED') {
            this.hudZener.openZener();
        }

        /// Open Card Game (Socks)
        if (this.state.name == 'SOCKS_FOCUSED' && this.last_state != null && this.last_state.name != 'SOCKS_FOCUSED') {
            this.hudSocks.openSocks();
        }

        /// Close Card Game (Socks)
        if (this.state.name != 'SOCKS_FOCUSED' && this.last_state != null && this.last_state.name == 'SOCKS_FOCUSED') {
            this.hudSocks.closeSocks();
        }

    }

    think(thought) {
        if (this.hudThinking != null) {
            this.hudThinking.think(thought);
        }
    }

}