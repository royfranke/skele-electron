import SocksManager from "../socks/socks-manager.js";
import HudCourt from "./hud-court.js";
import ITEMS from "../config/atlas/items.js";
/*
 * Controls the Socks HUD interface
 * Deploys the SocksManager to control the game
 * 
 */

export default class HudSocks extends HudCourt {

    constructor(scene) {
        super(scene);
    }

    initialize() {
        this.initializeCourt(new SocksManager(this.scene));
        this.tracked_icons = [];
        this.reveal_icons = [];
        this.reveal_tweens = [];
        this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.cleanupOnSceneShutdown());
        this.scene.events.once(Phaser.Scenes.Events.DESTROY, () => this.cleanupOnSceneShutdown());
        this.boardView = {
            x: this.view.left + 88,
            y: this.view.top + 56,
            width: 272,
            height: 176,
            frameName: 'BLOCK_MID_BLUE_BORDER',
            frame: {
                frameName: 'BLOCK_SHALLOW_GREEN_FRAME'
            },
            block: null,
        };

        this.board = {
            dryer: {
                x: this.boardView.x + 16,
                y: this.boardView.y + 16,
                slot: {
                    frameName: 'BAG_FOCUSED',
                    block: null,
                },
                icon: {
                    textureName: 'UI',
                    frameName: 'EMPTY_SYMBOL', // Should be dryer
                    icon: null,
                }
            },
            mismatch_pile: {
                x: this.boardView.x + 16,
                y: this.boardView.y + 112,
                slot: {
                    frameName: 'BAG_UNFOCUSED',
                    block: null,
                },
                icon: {
                    textureName: 'UI',
                    frameName: 'LAUNDRY_PINK_EMPTY',
                    icon: null,
                }
            },
            match_pile: {
                x: this.boardView.x + 56,
                y: this.boardView.y + 112,
                slot: {
                    frameName: 'BAG_FOCUSED',
                    block: null,
                },
                icon: {
                    textureName: 'UI',
                    frameName: 'LAUNDRY_BLUE_EMPTY',
                    icon: null,
                }
            },
            in_hand: {
                x: this.boardView.x + 128,
                y: this.boardView.y + 64,
                slot: {
                    frameName: 'ITEM_FOCUSED',
                    block: null,
                },
                icon: {
                    textureName: 'UI',
                    frameName: 'RIGHT_HAND',
                    icon: null,
                }
            },
            score: [
                {
                    name: 'streak',
                    displayName: '',
                    font: 'SkeleHype',
                    fontSize: 24,
                    width: this.boardView.width - 48,
                    x: this.boardView.x + Math.round(this.boardView.width / 2),
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
                    x: this.boardView.x + 72,
                    y: this.boardView.y + this.boardView.height - 20,
                    blockFrame: '',
                    object: null,
                    block: null,
                },
                {
                    name: 'misses',
                    displayName: '',
                    font: 'SkeleScrawl',
                    fontSize: 12,
                    width: 48,
                    x: this.boardView.x + 32,
                    y: this.boardView.y + this.boardView.height - 20,
                    blockFrame: '',
                    object: null,
                    block: null,
                },
                {
                    name: 'instructions',
                    displayName: 'Use the arrows to select a sock. \nPress X to match.',
                    font: 'SkeleTalk',
                    fontSize: 8,
                    width: 96,
                    x: this.boardView.x + this.boardView.width - 56,
                    y: this.boardView.y + 72,
                    object: null,
                    block: null,
                    blockFrame: '',
                }
            ],
        };

        this.board.arrow_up = {
            x: this.board.in_hand.x - 8,
            y: this.board.in_hand.y - 48,
            slot: {
                frameName: 'BAG_ARROW_FOCUSED',
                block: null,
            },
            icon: null
        };

        this.board.arrow_down = {
            x: this.board.in_hand.x,
            y: this.board.in_hand.y + 40,
            slot: {
                frameName: 'BAG_ARROW_FOCUSED',
                block: null,
            },
            icon: null
        };


        this.match_pile_icon = [
            {
                lessThan: 1,
                greaterThan: -1,
                slug: 'LAUNDRY_BLUE_EMPTY',
            },
            {
                lessThan: 3,
                greaterThan: 1,
                slug: 'LAUNDRY_BLUE_1',
            },
            {
                lessThan: 5,
                greaterThan: 2,
                slug: 'LAUNDRY_BLUE_2',
            },
            {
                lessThan: 12,
                greaterThan: 4,
                slug: 'LAUNDRY_BLUE_3',
            },
        ];
    }

    update() {
        if (this.open) {
            this.manager.update();
        }
    }

    openSocks() {
        this.openCourt(() => this.setupBoard());
    }

    closeSocks() {
        this.closeCourt({
            teardown: () => {
            this.clearRevealArtifacts();
            this.clearTrackedIcons();
            this.safeDestroy(this.boardView.block);
            this.safeDestroy(this.boardView.frame.block);
            var self = this;
            for (const [key, value] of Object.entries(self.board)) {
                if (self.board[key].slot != null) {
                    if (self.board[key].slot.block != null) {
                        this.safeDestroy(self.board[key].slot.block);
                        self.board[key].slot.block = null;
                    }
                    if (self.board[key].icon != null && self.board[key].icon.icon != null) {
                        this.safeDestroy(self.board[key].icon.icon);
                        self.board[key].icon.icon = null;
                    }
                }
            }
            for (let i = 0; i < this.board.score.length; i++) {
                if (self.board.score[i].block != null) {
                    this.safeDestroy(self.board.score[i].block);
                    self.board.score[i].block = null;
                }
                if (self.board.score[i].object != null) {
                    this.safeDestroy(self.board.score[i].object);
                    self.board.score[i].object = null;
                }
            }
            if (this.sock_in_play != null) {
                this.safeDestroy(this.sock_in_play);
                this.sock_in_play = null;
            }
            if (this.board.in_hand.icon.icon != null) {
                this.safeDestroy(this.board.in_hand.icon.icon);
                this.board.in_hand.icon.icon = null;
            }
            },
            resetGame: () => this.manager.resetDryer(false)
        });
    }

    cleanupOnSceneShutdown() {
        this.clearRevealArtifacts();
        this.clearTrackedIcons();
        if (this.manager != null) {
            this.manager.destroyListeners();
        }
        this.open = false;
    }


    select() {
        this.manager.select();
    }

    arrowDown() {
        this.manager.selectNext();
        this.scene.tweens.add({
            targets: [this.board.arrow_down.slot.block],
            y: '+= 4',
            duration: 100,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: true,
        });

    }

    arrowUp() {
        this.manager.selectPrevious();

        this.scene.tweens.add({
            targets: [this.board.arrow_up.slot.block],
            y: '-= 4',
            duration: 100,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: true,
        });
    }

    gameOver() {
        if (this.isGameOver) {
            return;
        }
        this.isGameOver = true;
        var targets = [];
        var self = this;
        for (const [key, value] of Object.entries(self.board)) {
            if (self.board[key].slot != undefined) {
                targets.push(self.board[key].slot.block);
            }
            if (self.board[key].icon != null) {
                if (self.board[key].icon.icon != null) {
                    targets.push(self.board[key].icon.icon);
                }
            }

        }
        /// For score objects, push the text and block if it exists
        for (let i = 0; i < this.board.score.length; i++) {
            if (i == 0) {continue;}
            if (self.board.score[i].block != null) {
                targets.push(self.board.score[i].block);
            }
            if (self.board.score[i].object != null) {
                targets.push(self.board.score[i].object);
            }
         }
        var tween = this.scene.tweens.add({
            targets: targets,
            y: 1200,
            yoyo: false,
            duration: 500,
            ease: 'Sine.easeInOut',
            repeat: 0,
            delay: this.scene.tweens.stagger(100)
        });

        tween.on('complete', () => {
            targets.forEach((target) => {
                this.safeDestroy(target);
            });
        });

        this.tallyScore();
    }

    tallyScore() {
        this.tallyScoreCommon();
        this.makeEndButton();
    }

    makeEndButton () {
        this.makeEndButtonCommon('INPUT_SELECT_SOCKS', 'INPUT_BACK_SOCKS');
    }


    lastSock() {
        /// Destroy the dryer
    }

    drawSelected(slug) {
        if (this.isGameOver) {
            return;
        }
        // draw the selected sock
        if (this.board.in_hand.icon.icon != null) {
            this.safeDestroy(this.board.in_hand.icon.icon);
        }
        this.board.in_hand.icon.icon = this.makeTrackedIcon(this.board.in_hand.x, this.board.in_hand.y, 'ITEMS', slug);
        this.scene.tweens.add({
            targets: [this.board.in_hand.icon.icon],
            y: '-= 2',
            duration: 250,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: true,
        });
    }

    ejectSock(slug) {
        if (this.sock_in_play != null) {
            this.safeDestroy(this.sock_in_play);
        }
        this.sock_in_play = this.makeTrackedIcon(this.board.dryer.x, this.board.dryer.y, 'ITEMS', slug);
        this.sock_in_play_slug = slug;
    }

    makeTrackedIcon(_x, _y, textureName, frameName) {
        let icon = this.makeIcon(_x, _y, textureName, frameName);
        this.tracked_icons.push(icon);
        return icon;
    }

    safeDestroy(target) {
        if (target != null && target.active) {
            target.destroy();
        }
    }

    clearTrackedIcons() {
        this.tracked_icons.forEach((icon) => {
            this.safeDestroy(icon);
        });
        this.tracked_icons = [];
    }

    trackRevealIcon(icon) {
        if (icon != null) {
            this.reveal_icons.push(icon);
        }
        return icon;
    }

    trackRevealTween(tween) {
        if (tween != null) {
            this.reveal_tweens.push(tween);
        }
        return tween;
    }

    clearRevealArtifacts() {
        this.reveal_tweens.forEach((tween) => {
            if (tween != null && tween.isPlaying()) {
                tween.stop();
            }
        });
        this.reveal_tweens = [];

        this.reveal_icons.forEach((icon) => {
            this.safeDestroy(icon);
        });
        this.reveal_icons = [];
    }


    drawReveal(result) {
        if (result.result) {
            // draw valid indicator or fx and have the socks become one rolled sock and fall into the laundry basket match pile
            let self = this;
            let bundled = ITEMS[this.sock_in_play_slug].stacks[0].icon;
            let bundled_icon = this.trackRevealIcon(this.makeTrackedIcon(this.sock_in_play.x, this.sock_in_play.y, 'ITEMS', bundled));
            this.safeDestroy(this.sock_in_play);
            this.sock_in_play = null;
            this.safeDestroy(this.board.in_hand.icon.icon);
            this.board.in_hand.icon.icon = null;
            let tween = this.trackRevealTween(this.scene.tweens.add({
                targets: [bundled_icon],
                x: this.board.match_pile.x,
                y: this.board.match_pile.y,
                duration: 1000,
                ease: 'Sine.easeInOut',
                loop: 0,
                yoyo: false,
            }));
            tween.on('complete', () => {
                this.safeDestroy(bundled_icon);
                self.reveal_icons = self.reveal_icons.filter((icon) => icon !== bundled_icon);
                self.reveal_tweens = self.reveal_tweens.filter((tracked) => tracked !== tween);
                if (self.board.match_pile.icon.icon != null) {
                    this.safeDestroy(self.board.match_pile.icon.icon);
                }
                self.board.match_pile.icon.icon = self.getStackIcon('match_pile', self.reference_score.correct);
            });

        } else {
            //draw invalid indicator and have the socks bounce off each other and fall in the mismatch pile
            let self = this;
            let doomed_sock = this.trackRevealIcon(this.makeTrackedIcon(this.sock_in_play.x, this.sock_in_play.y, 'ITEMS', this.sock_in_play_slug));
            this.safeDestroy(this.sock_in_play);
            this.sock_in_play = null;

            let doomed_other_sock = this.trackRevealIcon(this.makeTrackedIcon(this.board.in_hand.icon.icon.x, this.board.in_hand.icon.icon.y, 'ITEMS', this.board.in_hand.icon.icon.frame.name));
            this.safeDestroy(this.board.in_hand.icon.icon);
            this.board.in_hand.icon.icon = null;

            let tween = this.trackRevealTween(this.scene.tweens.add({
                targets: [doomed_sock, doomed_other_sock],
                x: this.board.mismatch_pile.x,
                y: this.board.mismatch_pile.y,
                duration: 1000,
                ease: 'Sine.easeInOut',
                loop: 0,
                yoyo: false,
            }));
            tween.on('complete', () => {
                this.safeDestroy(doomed_other_sock);
                this.safeDestroy(doomed_sock);
                self.reveal_icons = self.reveal_icons.filter((icon) => icon !== doomed_sock && icon !== doomed_other_sock);
                self.reveal_tweens = self.reveal_tweens.filter((tracked) => tracked !== tween);
            });
        }

    }

    getStackIcon(pile, count) {
        let icon = null;
        for (let i = 0; i < this.match_pile_icon.length; i++) {
            if (count > this.match_pile_icon[i].greaterThan && count < this.match_pile_icon[i].lessThan) {
                icon = this.match_pile_icon[i].slug;
            }
        }

        if (icon == null) {
            icon = this.match_pile_icon[0].slug;
        }

        return this.makeTrackedIcon(this.board[pile].x, this.board[pile].y, 'UI', icon);
    }


    setupBoard() {
        this.dryerCount = null;
        this.boardView.block = this.makeBlock(this.boardView.x, this.boardView.y, this.boardView.width, this.boardView.height, this.boardView.frameName);

        this.boardView.frame.block = this.makeBlock(this.boardView.x, this.boardView.y, this.boardView.width, this.boardView.height, this.boardView.frame.frameName);


        /// For each object in this.board draw a slot and icon
        for (const [key, value] of Object.entries(this.board)) {
            if (key == 'score') { continue; }
            this.board[key].slot.block = this.makeBlock(this.board[key].x, this.board[key].y, 32, 32, this.board[key].slot.frameName);

            if (this.board[key].icon != null) {
                if (this.board[key].icon.icon != null) {
                    this.safeDestroy(this.board[key].icon.icon);
                }
                this.board[key].icon.icon = this.makeTrackedIcon(this.board[key].x, this.board[key].y, this.board[key].icon.textureName, this.board[key].icon.frameName);
            }

        }
        if (this.board.arrow_up.slot.block != null) {
            this.safeDestroy(this.board.arrow_up.slot.block);
        }
        this.board.arrow_up.slot.block = this.makeTrackedIcon(this.board.arrow_up.x, this.board.arrow_up.y, 'UI', this.board.arrow_up.slot.frameName);
        this.board.arrow_up.slot.block.flipY = true;


        for (let i = 0; i < this.board.score.length; i++) {
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

        this.back_button = this.makeButton(this.boardView.x - 8, this.boardView.y,'CANCEL', 'Z', 'RED');


        this.back_button.click_area.on('pointerdown', () => {
            this.scene.events.emit('INPUT_BACK_SOCKS');
        });

        this.manager.listen();
    }

    setHits(hits = '') {
        if (this.board.score[1].object != null) {
            this.board.score[1].object.setText(this.getNumberSymbol(hits));
        }
    }

    setMisses(misses = '') {
        if (this.board.score[2].object != null) {
            this.board.score[2].object.setText(this.getNumberSymbol(misses));
        }
    }

    setHype(hype = '') {
        if (this.board.score[0].object != null) {
            this.board.score[0].object.setText(hype);
        }
    }

    drawScore(score) {
        this.drawScoreCommon(score);
    }

}