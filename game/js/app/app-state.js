import STATES from "./app-states.js";

/*
 * Manages application state 
 * SPLASH | MAIN | SETTINGS | NEW | LOAD | GAME | TUTORIAL
 */

export default class AppState {

    constructor(state) {
       this.valid_states = STATES;
       this.state = null;
       this.setState(state);
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