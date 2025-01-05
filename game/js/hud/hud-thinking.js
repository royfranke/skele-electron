import HudCommon from './hud-common.js';
/*

 */

export default class HudThinking extends HudCommon {

    constructor(scene) {
        super(scene);
        this.thinking = false;
    }

    initialize() {

    }

    think(text) {
        if (this.thinking) {
            return;
        }
        var _x = this.scene.player.snappedStanding.x
        var _y = this.scene.player.snappedStanding.y - 32;
        var thought_bubble = this.makeThinkingBubble(text, _x, _y);
        this.thinking = true;
        

        this.scene.time.delayedCall(4000, function () {
            thought_bubble.bubble.destroy();
            thought_bubble.thought.destroy();
            this.thinking = false;
        }, [], this);
    }

    makeThinkingBubble(text, _x, _y) {
        let thought = this.makeWorldBitmapText(_x + 1, _y - 10, 112, 8, 'SkeleNotebook');
        thought.setText(text);
        let bubble = this.makeWorldBlock(_x, _y, thought.displayWidth + 20, thought.displayHeight + 20, 'SPEECH_BUBBLE_MID');


        return { bubble: bubble, thought: thought};
    }

}