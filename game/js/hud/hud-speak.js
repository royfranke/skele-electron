import HudCommon from './hud-common.js';
/*

 */

export default class HudSpeak extends HudCommon {

    constructor(scene) {
        super(scene);
        this.speaking = false;
        this.hud_speaking = false;
    }

    initialize() {

    }

    speak(text) {
        if (this.speaking) {
            return;
        }
        var _x = this.scene.player.snappedStanding.x + 8;
        var _y = this.scene.player.snappedStanding.y - 8;
        var speech_bubble = this.makeSpeechBubble(text, _x, _y);
        this.speaking = true;
        

        this.scene.time.delayedCall(4000, function () {
            speech_bubble.bubble.destroy();
            speech_bubble.speech.destroy();
            this.speaking = false;
        }, [], this);
    }

    makeSpeechBubble(text, _x, _y) {
        let speech = this.makeSpeakingBitmapText(_x + 8, _y - 12, 112, 8, 'SkeleTalk');
        speech.setText(text);
        let bubble = this.makeSpeakingBlock(_x, _y, speech.displayWidth + 20, speech.displayHeight + 20, 'SPEECH_BUBBLE_ROUND');

        // tween the bubble and speech up a little
        var tween = this.scene.add.tween({
            targets: [speech, bubble],
            y: '-=8',
            duration: 500,
            yoyo: false,
            ease: 'Sine.easeOut',
            repeat: 0
        });


        return { bubble: bubble, speech: speech};
    }

    makeHUDSpeakingBubble(text) {
        if (this.hud_speaking) {
            return;
        }
        let speech = this.makeBitmapText(this.view.center.x, this.view.top - 20, 256, 8, 'SkeleNotebook');
        speech.setText(text).setOrigin(.5, 0).setDepth(30000001);
        let bubble = this.makeThinkingBlock(speech.x, speech.y - 8, speech.displayWidth + 32, speech.displayHeight + 16, 'THOUGHT_CLOUD');
        bubble.setScrollFactor(0).setOrigin(.5, 0).setDepth(30000000);
        this.hud_speaking = true;  
        var tween = this.scene.add.tween({
            targets: [speech, bubble],
            y: '+=48',
            duration: 1000,
            yoyo: false,
            ease: 'Sine.easeOut',
            repeat: 0
        });
        tween.on('complete', () => {
            this.scene.add.tween({
                targets: [speech, bubble],
                y: '-=2',
                duration: 1000,
                yoyo: true,
                ease: 'Sine.easeOut',
                repeat: -1
            });
        });

        this.scene.time.delayedCall(4000, function () {
            tween = this.scene.add.tween({
                targets: [speech, bubble],
                y: -64,
                duration: 1500,
                yoyo: false,
                ease: 'Sine.easeOut',
                repeat: 0
            });
            tween.on('complete', () => {
                bubble.destroy();
                speech.destroy();
                this.hud_speaking = false;
            });
        }, [], this);
    }

}