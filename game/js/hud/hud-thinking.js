import HudCommon from './hud-common.js';
/*
 * Gets injected into the game scene
 */

export default class HudThinking extends HudCommon {

    constructor(scene) {
        super(scene);
    }

    initialize() {

    }

    think(text) {
        var _x = this.scene.player.snappedStanding.x
        var _y = this.scene.player.snappedStanding.y - 32;
        var thought_bubble = this.makeThinkingBubble(text, _x, _y);

        this.scene.time.delayedCall(4000, function () {
            thought_bubble.bubble.destroy();
            thought_bubble.thought.destroy();
            thought_bubble.frame.destroy();
        }, [], this);
    }

    makeThinkingBubble(text, _x, _y) {
        let thought = this.makeWorldBitmapText(_x + 1, _y - 10, 112, 8, 'SkeleNotebook');
        thought.setText(text);
        let bubble = this.makeWorldBlock(_x, _y, thought.displayWidth + 20, thought.displayHeight + 20, 'BLOCK_MID_SKY');

        let frame = this.makeWorldBlock(_x, _y, thought.displayWidth + 20, thought.displayHeight + 20, 'BLOCK_SHALLOW_YELLOW_FRAME');


        return { bubble: bubble, thought: thought, frame: frame };
    }

}