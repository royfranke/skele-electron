import HudState from "./hud-state.js";
import HudInput from "./hud-input.js";
import HudSound from "./hud-sound.js";
import HudPocket from "./hud-pocket.js";
import HudDisplay from "./hud-display.js";
/* global Phaser */
/*
 * Gets injected into the game scene
 */

export default class HudManager {

    state=null;
    last_state=null;
    input=null;

    constructor(scene) {
       this.scene = scene;
       this.game = this.scene.manager;
       this.hudState = new HudState();
       this.hudInput = new HudInput(this.scene);
       this.hudSound = new HudSound(this.scene);
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
                    this.hudSound.play('UI_ARROW');
                }
            }
        }
        
    }

    arrowDown (slot_x) {
        this.hudDisplay.arrowDown(slot_x);
        
    }

    refreshDisplay () {
        return this.hudDisplay.refreshDisplay();
    }

    tapSlip (slot_x) {
        this.hudDisplay.tapSlip(slot_x);
        this.hudSound.play('UI_SELECT');
    }

    newPocketTip(message,duration=0) {
        this.hudDisplay.newPocketTip(message,duration);
    }

    availablePocket (item) {
        return this.pocket.availablePocket(item);
    }

    stateChanged () {
        if (this.state.name == 'INVISIBLE') {
            console.log('HUD hidden.');
            this.hudDisplay.pocketsVisible(false);
        }
        if (!this.last_state || this.last_state.name == 'INVISIBLE') {
            console.log('HUD revealed.');
            this.hudDisplay.pocketsVisible(true);
        }
        if (this.state.name == 'VISIBLE_FOCUSED') {
            console.log('HUD focused.'); // open pocket
            this.hudDisplay.openPockets();
        }
        if (this.state.name == 'VISIBLE_UNFOCUSED') {
            console.log('HUD unfocused.'); // close pocket
            this.hudDisplay.closePockets();
        }
    }

    loadHud () {
        if (this.state.name == 'NOT_LOADED') {
            this.setState('LOADING');
            console.log('Loading HUD.');
            this.pocket = new HudPocket(this.scene);
            this.hudDisplay = new HudDisplay(this.scene,this.getView());
            /// After loading functions...
            this.setState('LOADED');
            console.log('Loaded HUD.');
        }
    }

}