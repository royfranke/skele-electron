import HudCommon from './hud-common.js';

/*
 * Shared class for HUD overlay elements like game settings, which pause the game
 */

export default class HudOverlay extends HudCommon {

    constructor(scene) {
        super(scene);
    }

    initialize () {
        this.position = {
            x: this.view.x,
            y: this.view.y,
            width: this.view.width,
            height: this.view.height
        };

        this.overlay = this.scene.add.rectangle(this.position.x, this.position.y, this.position.width, this.position.height, 0x4b424a, .5).setOrigin(0).setDepth(500000).setScrollFactor(0);
    }

    setState(state) {
        /// FOCUSED, UNFOCUSED
        this.state = state;
    }


}