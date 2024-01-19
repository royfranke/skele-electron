import STATES from "../config/focus-states.js";

/* global Phaser */
/*
 * Gets injected into the game scene
 */

export default class GameFocus {

    focus='NOT_LOADED';
    last_focus='NOT_LOADED';

    constructor() {

       this.valid_states = STATES;

    }

    getFocus () {
        return this.valid_states[this.focus];
    }

    getLastFocus () {
        return this.valid_states[this.last_focus];
    }

    changed () {
        var focus = this.getFocus();
        var last_focus = this.getLastFocus();
        return (focus.name != last_focus.name);
    }

    setFocus (state) {
        if (this.validState(state)) {
            this.last_focus = this.focus;
            this.focus = state;
        }
    }

    validState (state) {
        if (this.valid_states.hasOwnProperty(state)) {
            return true;
        }
        else {
            console.warn("Nonvalid game focus passed: "+state);
        }
    }

}