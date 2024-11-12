import HudState from "./hud-state.js";
import HudInput from "./hud-input.js";
import HudSound from "./hud-sound.js";
import HudPocket from "./hud-pocket.js";
import HudPockets from "./hud-pockets.js";
import HudFactory from "./hud-factory.js";
import HudDisplay from "./hud-display.js";
import HudDialog from "./hud-dialog.js";
import HudChest from "./hud-chest.js";
import HudWatch from "./hud-watch.js";
import HudZener from "./hud-zener.js";
import HudNotebook from "./hud-notebook.js";
import HudCoinpurse from "./hud-coinpurse.js";
import HudFocusHints from "./hud-focus-hints.js";

/* global Phaser */
/*
 * Gets injected into the game scene
 */

export default class HudManager {

    constructor(scene) {
       this.scene = scene;
       this.game = this.scene.manager;
       this.factory = new HudFactory(this.scene);
       this.hudChest = new HudChest(this.scene, this.factory);
       this.hudPockets = new HudPockets(this.scene, this.factory);
       this.hudWatch = new HudWatch(this.scene, this.factory);
       this.hudNotebook = new HudNotebook(this.scene, this.factory);
       this.hudDialog = new HudDialog(this.scene, this.factory);
       this.hudFocusHints = new HudFocusHints(this.scene, this.factory);
       this.hudCoinpurse = new HudCoinpurse(this.scene, this.factory);
       this.hudState = new HudState();
       this.hudZener = new HudZener(this.scene, this.factory);
       this.state = this.getState();
       this.loadHud();
    }

    getState () {
        return this.hudState.getState(); // State Object
    }

    setState (state_string) {
        return this.hudState.setState(state_string);
    }

    getLastState () {
        return this.hudState.getLastState(); // State Object
    }

    getView () {
        return this.game.getView(); // View Object
    }

    update () {
        this.last_state = this.state;
        this.state = this.getState();
        
        if (this.state.name == 'NOT_LOADED') { this.loadHud(); }

        if (this.last_state.name != this.state.name) {
            this.stateChanged();
        }

        if (this.state.input) {
            for (const [key, value] of Object.entries(this.scene.app.input.INPUT)) {
                if (this.scene.app.input.INPUT[key].TAP) {
                    this.hudInput.input(key);
                    //this.hudSound.play('UI_ARROW');
                }
            }
        }
        
    }

    chestHold () {
        if (this.hudChest.chest != null && this.hudChest.chest.items.length > 0) {
            let item = this.hudChest.chest.items[0];
            var placed = this.scene.manager.hud.availablePocket(item);
                
                if (placed != false) {
                    console.log("Placed! Refreshing");
                    this.hudChest.chest.items.shift();
                    this.refreshChest();
                }
                else {
                    var sound_var = Phaser.Math.RND.between(1,3);
                    this.scene.manager.hud.hudSound.play('SKELE_INVALID_'+sound_var);
                    //this.scene.manager.hud.newPocketTip('My hands are full...',3000);
                }
        }
    }

    chestArrowDown () {
        this.hudChest.chestArrowDown();
    }

    arrowDown (slot_x) {
        this.hudPockets.arrowDown(slot_x);
    }

    refreshDisplay () {
        return this.hudPockets.refreshDisplay();
    }

    refreshChest () {
        return this.hudChest.refreshChest();
    }

    closeChest () {
        this.hudChest.closeChest();
    }

    tapSlip (slot_x) {
        this.hudPockets.tapSlip(slot_x);
        //this.hudSound.play('UI_SELECT');
        //TODO: replace with more subtle sound
    }
/*
    newPocketTip(message,duration=0) {
        this.hudDisplay.newPocketTip(message,duration);
    }
*/
    availablePocket (item, specific_pocket = null) {
        return this.pocket.availablePocket(item, specific_pocket);
    }

    stateChanged () {
        if (this.state.name == 'INVISIBLE') {
            this.hudPockets.pocketsVisible(false);
        }
        /// Show Pockets
        if (!this.last_state || this.last_state.name == 'INVISIBLE') {
            this.hudPockets.pocketsVisible(true);
        }
        else
            {
            if (this.state.name == 'POCKETS_FOCUSED') {
                this.hudPockets.openPockets();
                this.hudCoinpurse.openCoinpurse();
            //this.hudSound.play('FOCUS_TIP_POCKETS');
            }
            if (this.last_state.name == 'POCKETS_FOCUSED' && this.state.name != 'POCKETS_FOCUSED') {
                this.hudPockets.closePockets();
                this.hudCoinpurse.closeCoinpurse();
            }
            if (this.last_state.name != 'NOTEBOOK_FOCUSED' && this.state.name == 'NOTEBOOK_FOCUSED') {
                this.hudNotebook.openNotebook();

                this.hudSound.play('FOCUS_TIP_NOTEBOOK');
            }
            /// Close Notebook
            if (this.state.name != 'NOTEBOOK_FOCUSED' && this.last_state.name == 'NOTEBOOK_FOCUSED') {
                this.hudNotebook.closeNotebook();
            }
        }

        /// Open Card Game (Zener)
        if (this.state.name == 'ZENER_FOCUSED' && this.last_state != null && this.last_state.name != 'ZENER_FOCUSED') {
            this.hudZener.openZener();
        }

        /// Close Card Game (Zener)
        if (this.state.name != 'ZENER_FOCUSED' && this.last_state != null && this.last_state.name == 'ZENER_FOCUSED') {
            this.hudZener.closeZener();
        }
        
    }

    loadHud () {
        if (this.state.name == 'NOT_LOADED') {
            this.hudInput = new HudInput(this.scene);
            this.hudSound = new HudSound(this.scene);
            this.setState('LOADING');
            console.log('Loading HUD.');
            this.pocket = new HudPocket(this.scene);
            this.hudDisplay = new HudDisplay(this.scene,this.factory);
            this.hudCoinpurse.addCoinPurse();
            /// After loading functions...
            this.setState('LOADED');
            console.log('Loaded HUD.');
            //this.hudDialog.tellDialogBox('I got these-- these cards. I got one of each and I mix \'em and then you tell me which card is next. ... Got it?');
            //this.hudDialog.tellReplyBox('Yep.\nHow do I know which one is next?\nSounds dumb.');
            
        }
    }

}