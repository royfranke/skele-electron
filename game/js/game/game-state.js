import STATES from "../config/game-states.js";

/*
 * Manages game state 
 */

export default class GameState {

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
            console.warn("Nonvalid game state passed: " + state);
        }
    }

}