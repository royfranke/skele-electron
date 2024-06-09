import STATES from "../config/settings-states.js";

/*
 * Manages settings state 
 * NOT_LOADED | INPUT | AUDIO | DISPLAY | GAME CONTENT
 */

export default class SettingsState {

    constructor() {
        this.valid_states = STATES;
        this.state = null;
        this.setState('NOT_LOADED');
    }

    getState () {
        return this.state;
    }

    getLastState () {
        return this.last_state;
    }

    getStateConfig () {
        return this.valid_states[this.state];
    }

    setState(state) {
        if (this.validState(state)) {
            this.last_state = this.state;
            this.state = state;
        }
    }

    validState(state) {
        if (this.valid_states.hasOwnProperty(state)) {
            return true;
        }
        else {
            console.warn("Nonvalid settings state passed: " + state);
        }
    }

}