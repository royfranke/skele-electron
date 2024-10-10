import STATES from "../config/hud-states.js";

/* global Phaser */
/*
 * Gets injected into the game scene
 */

export default class HudState {


    constructor() {
        this.state='NOT_LOADED';
        this.last_state='NOT_LOADED';
        this.valid_states = STATES;

    }

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
            console.warn("Nonvalid hud state passed: "+state);
        }
    }

}