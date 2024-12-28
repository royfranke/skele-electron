import ZenerManager from "../zener/zener-manager.js";
import HudCommon from "./hud-common.js";
/*
 * Controls the Zener HUD interface
 * Deploys the ZenerManager to control the game
 * 
 */

export default class HudZener extends HudCommon {

    constructor(scene) {
        super(scene);
    }

    initialize() {
        this.open = false;
        this.manager = new ZenerManager(this.scene);
        this.boardView = {
            x: this.view.left+88,
            y: this.view.top+56,
            width: 272,
            height: 176,
            frameName: 'BLOCK_MID_LILAC_BORDER',
            frame: {
                frameName: 'BLOCK_SHALLOW_SAPPHIRE_FRAME'
            },
            block: null,
        };
        this.results = {
            positive: ['Yes!!','Uh-huh!','That\'s it!','You got it!'],
            negative: ['Uh-uh.','Nope!','Try Again!','No way.','Pfffff. No.']
        };
        this.deckAnimations = [
            {
                lessThan: 26,
                greaterThan: 14,
                animation: 'CARD_DECK_RUFFLE_TALL',
            },
            {
                lessThan: 15,
                greaterThan: 5,
                animation: 'CARD_DECK_RUFFLE_MID',
            },
            {
                lessThan: 6,
                greaterThan: 2,
                animation: 'CARD_DECK_RUFFLE_LOW',
            }
        ];
        this.board = {
            deck: {
                x: this.boardView.x + 16,
                y: this.boardView.y + 16,
                slot: {
                    frameName: 'BAG_FOCUSED',
                    block: null,
                },
                icon: {
                    textureName: 'FX',
                    frameName: 'CARD_DECK_RUFFLE_TALL-1', // Should be deck
                    icon: null,
                }
            },

            draw: {
                x: this.boardView.x + 56,
                y: this.boardView.y + 16,
                slot: {
                    frameName: 'BAG_SELECTED',
                    block: null,
                },
                icon: {
                    textureName: 'FX',
                    frameName: 'TURN_CARD_TO_FACE-1', // Back of card
                    icon: null,
                }
            },
            choices: [
                {
                    symbol: 'circle',
                    x: this.boardView.x + 40,
                    y: this.boardView.y + 96,
                    slot: {
                        frameName: 'ITEM_FOCUSED',
                        block: null,
                    },
                    icon: {
                        textureName: 'ITEMS',
                        frameName: 'ZENER_1',
                        icon: null,
                    }
                },
                {
                    symbol: 'plus',
                    x: this.boardView.x + 80,
                    y: this.boardView.y + 96,
                    slot: {
                        frameName: 'ITEM_UNFOCUSED',
                        block: null,
                    },
                    icon: {
                        textureName: 'ITEMS',
                        frameName: 'ZENER_2',
                        icon: null,
                    }
                },
                {
                    symbol: 'waves',
                    x: this.boardView.x + 120,
                    y: this.boardView.y + 96,
                    slot: {
                        frameName: 'ITEM_UNFOCUSED',
                        block: null,
                    },
                    icon: {
                        textureName: 'ITEMS',
                        frameName: 'ZENER_3',
                        icon: null,
                    }
                },
                {
                    symbol: 'square',
                    x: this.boardView.x + 160,
                    y: this.boardView.y + 96,
                    slot: {
                        frameName: 'ITEM_UNFOCUSED',
                        block: null,
                    },
                    icon: {
                        textureName: 'ITEMS',
                        frameName: 'ZENER_4',
                        icon: null,
                    }
                },
                {
                    symbol: 'star',
                    x: this.boardView.x + 200,
                    y: this.boardView.y + 96,
                    slot: {
                        frameName: 'ITEM_UNFOCUSED',
                        block: null,
                    },
                    icon: {
                        textureName: 'ITEMS',
                        frameName: 'ZENER_5',
                        icon: null,
                    }
                }
            ],

            score: [
                {
                    name: 'streak',
                    displayName: '',
                    font: 'SkeleHype',
                    fontSize: 24,
                    width: this.boardView.width - 48,
                    x: this.boardView.x + Math.round(this.boardView.width/2),
                    y: this.boardView.y + this.boardView.height - 24,
                    object: null,
                    blockFrame: '',
                    block: null
                },
                {
                    name: 'hits',
                    displayName: '',
                    font: 'SkeleScrawl',
                    fontSize: 12,
                    width: 48,
                    x: this.boardView.x + (this.boardView.width-120),
                    y: this.boardView.y + 32,
                    blockFrame: 'BLOCK_MID_MOONSTONE',
                    object: null,
                    block: null,
                },
                {
                    name: 'misses',
                    displayName: '',
                    font: 'SkeleScrawl',
                    fontSize: 12,
                    width: 48,
                    x: this.boardView.x + (this.boardView.width-48),
                    y: this.boardView.y + 32,
                    blockFrame: 'BLOCK_MID_MOONSTONE',
                    object: null,
                    block: null,
                },
                {
                    name: 'instructions',
                    displayName: 'Which card is this?',
                    font: 'SkeleTalk',
                    fontSize: 16,
                    width: this.boardView.width - 48,
                    x: this.boardView.x + Math.round(this.boardView.width/2),
                    y: this.boardView.y + 72,
                    object: null,
                    block: null,
                    blockFrame: 'BLOCK_SHALLOW_WHITE',
                }
            ],
        };
    }

    openZener () {
        if (!this.open) {
            this.open = true;
            this.setupBoard();
            this.manager.startTurn();
        }
    }

    closeZener () {
        if (this.open) {
            this.boardView.block.destroy();
            this.boardView.frame.block.destroy();
            this.board.deck.slot.block.destroy();
            this.board.deck.icon.icon.destroy();
            this.board.draw.slot.block.destroy();
            this.board.draw.icon.icon.destroy();
            this.board.choices.forEach((choice) => {
                choice.slot.block.destroy();
                choice.icon.icon.destroy();
            });
            this.board.score.forEach((score) => {
                score.object.destroy();
                if (score.block != null) {
                    score.block.destroy();
                }
            });
            this.manager.resetDeck();
            this.open = false;
        }
    }


    select () {
        this.manager.select();
    }

    back () {
        this.manager.back();
    }

    arrowRight () {
        this.manager.selectNext();
    }

    arrowLeft () {
        this.manager.selectPrevious();
    }

    drawShuffle () {
        if (this.deckCount > 1) {
            var shuffle = null;
            this.deckAnimations.forEach((anim) => {
                if (this.deckCount < anim.lessThan && this.deckCount > anim.greaterThan) {
                    shuffle = this.board.deck.icon.icon.anims.play(anim.animation, false);
                    shuffle.once('animationcomplete', () => {
                        this.manager.deck.setState('AWAITING GUESS');
                        this.drawSelected(this.manager.deck.selected);
                    });
                }
            });

            if (shuffle == null) {
                this.manager.deck.setState('AWAITING GUESS');
                this.drawSelected(this.manager.deck.selected);
            }
            this.scene.manager.hud.hudSound.play('CARD_SHUFFLE_MID');
        }
        if (this.deckCount == 0) {
            this.makeFX('CLOUD_DUST_', this.board.draw.x, this.board.draw.y + 8);
            this.lastDraw();
        }
        if (this.deckCount == 1) {
            this.lastCard();
            this.makeFX('CLOUD_DUST_', this.board.deck.x, this.board.deck.y + 8);
            this.manager.deck.setState('AWAITING GUESS');
        }
    }

    drawSelected (selected) {
        if (this.manager.deck.state == 'AWAITING GUESS') {
            this.board.choices.forEach((choice, index) => {
                if (index == selected) {
                    this.bobbleChoice(choice);
                    choice.slot.block.setFrame('ITEM_SELECTED');
                } else {
                    choice.slot.block.setFrame('ITEM_FOCUSED');
                }
            });
        }
        else {
            this.board.choices.forEach((choice, index) => {
                choice.slot.block.setFrame('ITEM_UNFOCUSED');
            });
        }
        
    }

    bobbleChoice (choice) {
        if (!choice.icon.tweening || choice.icon.tweening == undefined) {
            choice.icon.tweening = true;
            var tween = this.scene.add.tween({
                targets: choice.icon.icon,
                y: choice.y + 4,
                duration: 450,
                yoyo: true,
                ease: 'Bounce.inOut',
                repeat: 1
            });
            tween.on('complete', () => {
                choice.icon.tweening = false;
                choice.icon.icon.y = choice.y + 8;
            });
        }
    }

    setInstructions (instructions) {
        this.board.score[3].object.setText(instructions);
    }

    updateDeck (deck) {
        this.deckCount = deck;

        switch (deck) {
            case 0: this.setInstructions('- Game Over -');
                    this.gameOver();
            break;
            case 1: this.setInstructions('Last Card!');
            break;
        }

    }

    gameOver () {
        var targets = [];
        this.board.choices.forEach((choice) => {
            choice.icon.icon.destroy();
            targets.push(choice.slot.block);
        });

        var tween = this.scene.tweens.add({
            targets: targets,
            y: 700,
            yoyo: false,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: 0,
            delay: this.scene.tweens.stagger(100)
        });

        tween.on('complete', () => {
            this.board.choices.forEach((choice) => {
                choice.slot.block.destroy();
            });
          });

        this.tallyScore();
    }

    tallyScore () {
        this.board.score[0].object.setFont('SkeleTalk');
        this.board.score[0].object.setFontSize(16);
        this.scene.tweens.add({
            targets: this.board.score[0].object,
            y: '-=24',
            duration: 2000,
            ease: 'Sine.easeInOut'
        });

        let timeline = this.scene.add.timeline([
            {
                at: 500,
                run: () => {
                    this.setHype('BEST STREAK: '+this.reference_score.streak_best);
                }
            },
            {
                at: 1500,
                run: () => {
                    this.setHype('BEST STREAK: '+this.reference_score.streak_best + '\nHITS: ' + this.reference_score.correct);
                }
            },
            {
                at: 2500,
                run: () => {
                    this.setHype('BEST STREAK: '+this.reference_score.streak_best + '\nHITS: ' + this.reference_score.correct + '\nFINAL: ' +(this.reference_score.streak_best*this.reference_score.correct));
                }
            }
        ]);

        timeline.play();
    }

    lastCard () {
        this.board.deck.icon.icon.destroy();
    }

    lastDraw () {
        this.board.draw.icon.icon.destroy();
    }

    drawReveal (result) {
        if (result.result) {
            this.makeFX('SELECTOR_VALID_', this.board.choices[this.manager.selected].x, this.board.choices[this.manager.selected].y,1000);
            this.makeFX('SPARKLE_', this.board.choices[this.manager.selected].x, this.board.choices[this.manager.selected].y);
        } else {
            this.makeFX('SELECTOR_INVALID_', this.board.choices[this.manager.selected].x, this.board.choices[this.manager.selected].y,1000);
        }

        var anim = this.board.draw.icon.icon.anims.play('TURN_CARD_TO_FACE', false);
        anim.once('animationcomplete', () => {
            var card_turn = this.board.draw.icon.icon.anims.play('TURN_CARD_TO_'+result.card.toUpperCase(), false);
            this.drawSelected(this.manager.deck.selected);

            card_turn.once('animationcomplete', () => {
                this.setInstructions(this.resultMessage(result.result));
                
                this.scene.time.delayedCall(500, () => {
                    this.board.draw.icon.icon.anims.play('TURN_CARD_FROM_'+result.card.toUpperCase(), false);
                    this.board.draw.icon.icon.once('animationcomplete', () => {
                        var anim = this.board.draw.icon.icon.anims.play('TURN_CARD_TO_BACK', false);
                        anim.once('animationcomplete', () => {
                            anim.setFrame('TURN_CARD_TO_FACE-1');
                            this.drawShuffle();
                        });
                    });
                });

            });
        });
    }

    setupBoard() {
        this.deckCount = null;
        this.boardView.block = this.makeBlock(this.boardView.x, this.boardView.y, this.boardView.width, this.boardView.height, this.boardView.frameName);

        this.boardView.frame.block = this.makeBlock(this.boardView.x, this.boardView.y, this.boardView.width, this.boardView.height, this.boardView.frame.frameName);

        this.board.deck.slot.block = this.makeBlock(this.board.deck.x, this.board.deck.y, 32, 32, this.board.deck.slot.frameName);
        this.board.deck.icon.icon = this.makeIcon(this.board.deck.x, this.board.deck.y - 16, this.board.deck.icon.textureName, this.board.deck.icon.frameName);

        this.board.draw.slot.block = this.makeBlock(this.board.draw.x, this.board.draw.y, 32, 32, this.board.draw.slot.frameName);
        this.board.draw.icon.icon = this.makeIcon(this.board.draw.x, this.board.draw.y, this.board.draw.icon.textureName, this.board.draw.icon.frameName);

        for (let i = 0; i < 5; i++) {
            this.board.choices[i].slot.block = this.makeBlock(this.board.choices[i].x, this.board.choices[i].y, 32, 32, this.board.choices[i].slot.frameName);
            this.board.choices[i].icon.icon = this.makeIcon(this.board.choices[i].x, this.board.choices[i].y, this.board.choices[i].icon.textureName, this.board.choices[i].icon.frameName);
        }

        for (let i = 0; i < this.board.score.length; i++) {;
            this.board.score[i].object = this.scene.add.bitmapText(this.board.score[i].x, this.board.score[i].y, 'SkeleTalk', this.board.score[i].displayName, 12).setOrigin(.5).setScrollFactor(0).setDepth(100200);

            if (i > 0) {
                this.board.score[i].object.setTintFill(0x465e62);
            }

            this.board.score[i].object.setFont(this.board.score[i].font);
            this.board.score[i].object.setFontSize(this.board.score[i].fontSize);
            this.board.score[i].object.setMaxWidth(this.board.score[i].width);
            this.board.score[i].object.setLineSpacing(2);
            
            if (this.board.score[i].blockFrame != '') {
                this.board.score[i].block = this.makeBlock(this.board.score[i].x, this.board.score[i].y, this.board.score[i].width + 16, 32, this.board.score[i].blockFrame).setOrigin(.5).setScrollFactor(0).setDepth(100100);
            }

        }
        this.setHits();
        this.setMisses();
        this.drawSelected(0);
    }

    setHits (hits='') {
        this.board.score[1].object.setText('Hits\n' + this.getNumberSymbol(hits));
    }

    setMisses (misses='') {
        this.board.score[2].object.setText('Misses\n' + this.getNumberSymbol(misses));
    }

    setHype (hype='') {
        this.board.score[0].object.setText(hype);
    }

    drawScore (score) {
        this.reference_score = score;
        if (score.streak > 1) {
            this.setHype('STREAK! X' + score.streak);
            
        }
        else {
            this.setHype();
        }

        this.setHits(score.correct);
        this.setMisses(score.incorrect);
    }

    resultMessage (result) {
        if (result) {
            return this.results.positive[Phaser.Math.Between(0, this.results.positive.length - 1)];
        }
        else {
            return this.results.negative[Phaser.Math.Between(0, this.results.negative.length - 1)];
        }
    }

}