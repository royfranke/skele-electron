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
                y: this.boardView.y + 128,
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
                y: this.boardView.y + 128,
                slot: {
                    frameName: 'BAG_FOCUSED',
                    block: null,
                },
                icon: {
                    textureName: 'ITEMS',
                    frameName: 'LAUNDRY_BASKET_BLUE', // Should be dryer
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
            targets.push(self.board[key].slot.block);
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

    setupBoard() {
        this.dryerCount = null;
        this.boardView.block = this.makeBlock(this.boardView.x, this.boardView.y, this.boardView.width, this.boardView.height, this.boardView.frameName);

        this.boardView.frame.block = this.makeBlock(this.boardView.x, this.boardView.y, this.boardView.width, this.boardView.height, this.boardView.frame.frameName);


        /// For each object in this.board draw a slot and icon
        for (const [key, value] of Object.entries(this.board)) {

            this.board[key].slot.block = this.makeBlock(this.board[key].x, this.board[key].y, 32, 32, this.board[key].slot.frameName);

            if (this.board[key].icon != null) {
                this.board[key].icon.icon = this.makeIcon(this.board[key].x, this.board[key].y, this.board[key].icon.textureName, this.board[key].icon.frameName);
            }
            
          }
          this.board.arrow_up.slot.block.destroy();
          this.board.arrow_up.slot.block = this.makeIcon(this.board.arrow_up.x, this.board.arrow_up.y, 'UI', this.board.arrow_up.slot.frameName);
          this.board.arrow_up.slot.block.flipY = true;

    } 

}