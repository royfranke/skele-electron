import STATES from "../config/sound-states.js";

/* global Phaser */
/*
 * Gets injected into the game scene
 */

export default class HudSound {

    state='OFF';
    last_state='OFF';

    constructor(scene) {
        this.scene = scene;
       //this.valid_states = STATES;

    }

    play (sound_key) {
        console.log("Play sound: "+sound_key)
        var sound = this.scene.sound.add(sound_key);
       sound.play();
    }
    
/*
    getState () {
        return this.valid_states[this.state];
    }

    getLastState () {
        return this.valid_states[this.last_state];
    }

    setState (state) {
        if (this.validState(state)) {
            this.last_state = this.state;
            this.state = state;
        }
    }

    validState (state) {
        if (this.valid_states.hasOwnProperty(state)) {
            return true;
        }
        else {
            console.log(state);
            console.warn("Nonvalid hud state passed.");
        }
    }
*/
}