import HudCommon from './hud-common.js';
/*

 */

export default class HudThinking extends HudCommon {

    constructor(scene) {
        super(scene);
        this.thinking = false;
        this.hud_thinking = false;
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
        let bubble = this.makeWorldBlock(_x, _y, thought.displayWidth + 20, thought.displayHeight + 20, 'THOUGHT_CLOUD');


        return { bubble: bubble, thought: thought};
    }

    makeHUDThinkingBubble(text) {
        if (this.hud_thinking) {
            return;
        }
        let thought = this.makeBitmapText(this.view.center.x, this.view.top - 20, 256, 8, 'SkeleNotebook');
        thought.setText(text).setOrigin(.5, 0).setDepth(30000001);
        let bubble = this.makeWorldBlock(thought.x, thought.y - 8, thought.displayWidth + 32, thought.displayHeight + 16, 'THOUGHT_CLOUD');
        bubble.setScrollFactor(0).setOrigin(.5, 0).setDepth(30000000);
        this.hud_thinking = true;  
        var tween = this.scene.add.tween({
            targets: [thought, bubble],
            y: '+=48',
            duration: 1000,
            yoyo: false,
            ease: 'Sine.easeOut',
            repeat: 0
        });
        tween.on('complete', () => {
            this.scene.add.tween({
                targets: [thought, bubble],
                y: '-=2',
                duration: 1000,
                yoyo: true,
                ease: 'Sine.easeOut',
                repeat: -1
            });
        });

        this.scene.time.delayedCall(4000, function () {
            tween = this.scene.add.tween({
                targets: [thought, bubble],
                y: -64,
                duration: 1500,
                yoyo: false,
                ease: 'Sine.easeOut',
                repeat: 0
            });
            tween.on('complete', () => {
                bubble.destroy();
                thought.destroy();
                this.hud_thinking = false;
            });
        }, [], this);
    }

    tellBrain(text) {
        this.makeHUDThinkingBubble(text);

    }

}