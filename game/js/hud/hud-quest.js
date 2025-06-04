import HudCommon from "./hud-common.js";

export default class HudQuest extends HudCommon {


    constructor(scene) {
        super(scene);
    }

    initialize () {
        this.quest = null;
        this.position = {
            unfocused: {
                note: {
                    x: this.view.left + this.view.margin.left + 64,
                    y: this.view.bottom - (this.view.margin.bottom + 32),
                    width: 96,
                }
            }
        };
    }
 
    addQuest (quest) {
        if (this.quest == null) {
            this.quest = {note: null, text: null};
            
            this.quest.text = this.makeBitmapText(this.position.unfocused.note.x + 8, this.position.unfocused.note.y + 16, this.position.unfocused.note.width,8, 'SkeleNotebook');

            this.quest.note = this.factory.makeNote(this.position.unfocused.note.x, this.position.unfocused.note.y);

            this.quest.text.setTintFill(0x465e62);
            this.quest.text.setAlpha(0.8);
            this.quest.text.setLineSpacing(11);
            this.quest.text.setOrigin(0);
            this.quest.text.setDepth(this.quest.note.depth + 1);
            // replace ’ with \'
            quest = quest.replace('’', '\'');
            this.quest.text.setText(quest);
            this.quest.note.setSize(this.quest.text.displayWidth + 16, this.quest.text.displayHeight + 32);
            this.openQuest();
        }
    }

    openQuest () {
        if (this.quest != null) {
            this.scene.tweens.add({
                targets: [this.quest.note, this.quest.text],
                y: '-=48',
                duration: 500,
                ease: 'Sine.easeIn',
                loop: 0,
            });
        }
    }

    closeQuest () {
        if (this.quest != null) {
            var tween = this.scene.tweens.add({
                targets: [this.quest.note, this.quest.text],
                y: '+=240',
                duration: 1000,
                ease: 'Sine.easeOut',
                loop: 0,
            });

            tween.on('complete', function () {
                this.quest.note.destroy();
                this.quest.text.destroy();
                this.quest = null;
            }
            , this);
            
        }
    }


}