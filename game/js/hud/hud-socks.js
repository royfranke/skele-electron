import SocksManager from "../socks/socks-manager.js";
import HudCommon from "./hud-common.js";
import ITEMS from "../config/atlas/items.js";
/*
 * Controls the Socks HUD interface
 * Deploys the SocksManager to control the game
 * 
 */

export default class HudSocks extends HudCommon {

    constructor(scene) {
        super(scene);
    }

    initialize() {
        this.open = false;
        this.manager = new SocksManager(this.scene);
        this.boardView = {
            x: this.view.left+88,
            y: this.view.top+56,
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
                    frameName: 'LAUNDRY_BLUE_EMPTY', // Should be dryer
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

    update () {
        if (this.open) {
            this.manager.update();
        }
    }

    openSocks () {
        if (!this.open) {
            this.open = true;
            this.setupBoard();
            this.manager.startTurn();
        }
    }

    closeSocks () {
        if (this.open) {
            this.boardView.block.destroy();
            this.boardView.frame.block.destroy();
            var self = this;
            for (const [key, value] of Object.entries(self.board)) {
                if (self.board[key].slot.block != null) {
                    self.board[key].slot.block.destroy();
                }
                if (self.board[key].icon != null && self.board[key].icon.icon != null) {
                    self.board[key].icon.icon.destroy();
                }
            }

            this.manager.resetDryer();
            this.open = false;
        }
    }


    select () {
        this.manager.select();
    }

    back () {
        this.manager.back();
    }

    arrowDown () {
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

    arrowUp () {
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

    gameOver () {
        var targets = [];
        /// For each object in this.board draw a slot and icon
        var self = this;
        for (const [key, value] of Object.entries(self.board)) {
            if (self.board[key].slot != undefined) {
                targets.push(self.board[key].slot.block);
            }
            if (self.board[key].icon != null) {
                self.board[key].icon.icon 
                targets.push(self.board[key].icon.icon);
            }
            
        }
        var tween = this.scene.tweens.add({
            targets: targets,
            y:1200,
            yoyo: false,
            duration: 500,
            ease: 'Sine.easeInOut',
            repeat: 0,
            delay: this.scene.tweens.stagger(100)
        });

        tween.on('complete', () => {
           targets.forEach((target) => {
               target.destroy();
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


    lastSock () {
        /// Destroy the dryer
    }

    drawSelected (slug) {
        // draw the selected sock
        this.board.in_hand.icon.icon.destroy();
        this.board.in_hand.icon.icon = this.makeIcon(this.board.in_hand.x, this.board.in_hand.y, 'ITEMS', slug);
        this.scene.tweens.add({
            targets: [this.board.in_hand.icon.icon],
            y: '-= 2',
            duration: 250,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: true,
        });
    }

    ejectSock (slug) {
        this.sock_in_play = this.makeIcon(this.board.dryer.x, this.board.dryer.y, 'ITEMS', slug);
        this.sock_in_play_slug = slug;
    }


    drawReveal (result) {
        if (result.result) {
            // draw valid indicator or fx and have the socks become one rolled sock and fall into the laundry basket match pile
            let self = this;
            let bundled = ITEMS[this.sock_in_play_slug].stacks[0].icon;
            let bundled_icon = this.makeIcon(this.sock_in_play.x, this.sock_in_play.y, 'ITEMS', bundled);
            this.sock_in_play.destroy();
            this.board.in_hand.icon.icon.destroy();
            let tween = this.scene.tweens.add({
                targets: [bundled_icon],
                x: this.board.match_pile.x,
                y: this.board.match_pile.y,
                duration: 1000,
                ease: 'Sine.easeInOut',
                loop: 0,
                yoyo: false,
            });
            tween.on('complete', () => {
                bundled_icon.destroy();
                self.board.match_pile.icon.icon.destroy();
                self.board.match_pile.icon.icon =  self.getStackIcon('match_pile', self.reference_score.correct);
            });

        } else {
            //draw invalid indicator and have the socks bounce off each other and fall in the mismatch pile
            let doomed_sock = this.makeIcon(this.sock_in_play.x, this.sock_in_play.y, 'ITEMS', this.sock_in_play_slug);
            this.sock_in_play.destroy();
            
            let doomed_other_sock = this.makeIcon(this.board.in_hand.icon.icon.x, this.board.in_hand.icon.icon.y, 'ITEMS', this.board.in_hand.icon.icon.frame.name);
            this.board.in_hand.icon.icon.destroy();

            let tween = this.scene.tweens.add({
                targets: [doomed_sock, this.board.in_hand.icon.icon],
                x: this.board.mismatch_pile.x,
                y: this.board.mismatch_pile.y,
                duration: 1000,
                ease: 'Sine.easeInOut',
                loop: 0,
                yoyo: false,
            });
            tween.on('complete', () => {
                doomed_other_sock.destroy();
                doomed_sock.destroy();
            });
        }

    }

    getStackIcon (pile, count) {
        let icon = null;
        for (let i = 0; i < this.match_pile_icon.length; i++) {
            console.log('----------------');
            console.log(count);
            console.log(this.match_pile_icon[i]);
            if (count > this.match_pile_icon[i].greaterThan && count < this.match_pile_icon[i].lessThan) {
                icon = this.match_pile_icon[i].slug;
                
            }
        }

        if (icon == null) {
            icon = this.match_pile_icon[0].slug;
        }

        return this.makeIcon(this.board[pile].x, this.board[pile].y, 'UI', icon);
    }
    

    setupBoard() {
        this.dryerCount = null;
        this.boardView.block = this.makeBlock(this.boardView.x, this.boardView.y, this.boardView.width, this.boardView.height, this.boardView.frameName);

        this.boardView.frame.block = this.makeBlock(this.boardView.x, this.boardView.y, this.boardView.width, this.boardView.height, this.boardView.frame.frameName);


        /// For each object in this.board draw a slot and icon
        for (const [key, value] of Object.entries(this.board)) {
            if (key == 'score') {continue;}
            this.board[key].slot.block = this.makeBlock(this.board[key].x, this.board[key].y, 32, 32, this.board[key].slot.frameName);

            if (this.board[key].icon != null) {
                this.board[key].icon.icon = this.makeIcon(this.board[key].x, this.board[key].y, this.board[key].icon.textureName, this.board[key].icon.frameName);
            }
            
          }
          this.board.arrow_up.slot.block.destroy();
          this.board.arrow_up.slot.block = this.makeIcon(this.board.arrow_up.x, this.board.arrow_up.y, 'UI', this.board.arrow_up.slot.frameName);
          this.board.arrow_up.slot.block.flipY = true;



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

    } 

    setHits (hits='') {
        this.board.score[1].object.setText(this.getNumberSymbol(hits));
    }

    setMisses (misses='') {
        this.board.score[2].object.setText(this.getNumberSymbol(misses));
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

}