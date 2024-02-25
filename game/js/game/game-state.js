import STATES from "../config/game-states.js";

/* global Phaser */
/*
 * Gets injected into the game scene
 */

export default class GameState {

    constructor() {
        this.valid_states = STATES;
        this.state = 'NOT_LOADED';
        this.last_state = 'NOT_LOADED';
    }

    getState() {
        return this.valid_states[this.state];
    }

    getLastState() {
        return this.valid_states[this.last_state];
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