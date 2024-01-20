import STATES from "../config/player-states.js";

/* global Phaser */
/*
 * Gets injected into game scene
 */

export default class PlayerState {


    constructor(state) {
       this.last_state = null;
       this.state = null;
       this.valid_states = STATES;
    }

    getState () { 
        if (this.state == null) {
            this.state = this.valid_states['IDLE'];
        }
        return this.state;
    }

    getLastState () {
        if (this.last_state == null) {
            this.last_state = this.valid_states['IDLE'];
        }
        return this.last_state;
    }

    setState (state) {
        if (this.validState(state)) {
            this.last_state = this.state;
            this.state = this.valid_states[state];
            console.log('setting...'+state);
            console.log(this.state);
        }
    }

    validState (state) {
        if (this.valid_states.hasOwnProperty(state)) {
            return true;
        }
        else {
            console.warn("Nonvalid player state passed: "+state);
        }
    }

}