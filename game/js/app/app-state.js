import STATES from "../config/app-states.js";

/* global Phaser */
/*
 * Gets injected into every scene
 */

export default class AppState {

    state=null;
    last_state=null;

    constructor(state) {
       this.valid_states = STATES;
       this.setState(state);
    }

    getState () {
        return this.state;
    }

    getLastState () {
        return this.last_state;
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
            console.warn("Nonvalid application state passed: "+state);
        }
    }

}