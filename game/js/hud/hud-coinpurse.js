import HudCommon from './hud-common.js';
/*
 * Handles coinpurse UI action
 */

export default class HudCoinpurse extends HudCommon {

    constructor(scene) {
        super(scene);
    }  

    initialize() {
        this.position = {
            unfocused: {
                x: this.view.left + this.view.margin.left,
                y: this.view.top - 32
            },
            focused: {
                x: this.view.left + this.view.margin.left,
                y: this.view.top + this.view.margin.top
            }
        };

        this.coinPurse = {
            block: null,
            icon: null,
            display: null,
            tell: null
        };
    }

    popCoin(amount=0, status = 'default') {
        let timeline = this.scene.add.timeline([
            {
                at: 500,
                run: () => {
                    this.scene.manager.hud.hudSound.play('COIN_CLINK_1');
                    this.coinPurse.block.setFrame('BAG_FOCUSED');
                    this.coinPurse.icon.setFrame('COINPURSE_POP');
                    this.makeFX('SPARKLE_', this.coinPurse.block.x, this.coinPurse.block.y);
                }
            },
            {
                at: 625,
                run: () => {
                    this.coinPurse.block.setFrame('BAG_SELECTED');
                }
            },
            {
                at: 750,
                run: () => {
                    this.coinPurse.block.setFrame('BAG_FOCUSED');
                    this.coinPurse.icon.setFrame('COINPURSE_CLOSED');
                }
            },
            {
                at: 1000,
                run: () => {
                    this.coinPurse.block.setFrame('BAG_UNFOCUSED');
                }
            }
        ]);

        timeline.play();

    }

    addCoinPurse() {
        this.coinPurse.block = this.makeBlock(this.position.focused.x, this.position.focused.y, 32, 32, 'BAG_UNFOCUSED');
        this.coinPurse.icon = this.makeIcon(this.position.focused.x, this.position.focused.y, 'UI', 'COINPURSE_CLOSED'); 
        this.setupCoinpurseInteraction();
    }

    addHiddenCoinPurse() {
        this.coinPurse.block = this.makeBlock(this.position.unfocused.x, this.position.unfocused.y, 32, 32, 'BAG_UNFOCUSED');
        this.coinPurse.icon = this.makeIcon(this.position.unfocused.x, this.position.unfocused.y, 'UI', 'COINPURSE_CLOSED');
        this.setupCoinpurseInteraction();
    }

    plungeCoinPurse() {
        if (this.coinPurse.block != null) {
            this.scene.tweens.add({
                targets: this.coinPurse.block,
                y: this.position.focused.y,
                duration: 1800,
                repeat: 0,
                hold: 500,
                repeatDelay: 500,
                ease: 'bounce.out'
            });

            this.scene.tweens.add({
                targets: this.coinPurse.icon,
                y: this.position.focused.y + 8,
                duration: 2000,
                repeat: 0,
                hold: 500,
                repeatDelay: 500,
                ease: 'bounce.out'
            });
        }
    }

    setupCoinpurseInteraction() {
        // Mouse/Touch Input
        this.coinPurse.block.setInteractive(); 
        var self = this;
        this.coinPurse.block.on('pointerover', function (pointer) {
            // This function will be called when the coinpurse block is clicked or tapped
            
        });
        this.coinPurse.block.on('pointerdown', function (pointer) {
            // This function will be called when the menu block is clicked or tapped
            if (self.scene.manager.getFocus().name != 'POCKETS') {
                self.scene.manager.closeChest();
                self.scene.manager.setFocus('POCKETS');
            }
            else {
                self.scene.manager.setFocus('PLAYER');  
            }
        });
    }

    closeCoinpurse() {
        this.clearCoinpurseTell();
        this.coinPurse.icon.setFrame('COINPURSE_CLOSED');
    }


    openCoinpurse() {
        if (this.scene.player.coinpurse.contents.STATUS.HAS == 'TRUE') {
            this.scene.player.coinpurse.updateTotal();
            this.coinPurse.icon.setFrame('COINPURSE_OPEN');

            var coinTotal = this.scene.player.coinpurse.getTalliedTotal();

            this.clearCoinpurseTell();
            this.coinPurse.tell = this.tellCoinpurse(coinTotal);
        }
    }

    tellCoinpurse(content, timing = 0, status = 'default') {
        let _x = this.view.left + (this.view.margin.left);
        let _y = this.view.top + (this.view.margin.top + 40);

        var coins = [];
        if (content.length > 0) {
            let coin_slots = [];
            let coin_slot_height = 12;
            let coin_slot_width = 72;
            let coin_slot_spacing = 2;
            var line_height = 0;
            var new_content = [];
            content.forEach(coin => {
                if (coin.text > 0 && coin.icon < 100) {
                    coin.icon = this.scene.add.sprite(_x + 4, _y + line_height + 5, 'FX', 'COIN_' + coin.icon + '_-2').setOrigin(0).setScrollFactor(0).setDepth(100200);

                    line_height += coin_slot_height + coin_slot_spacing;
                    coins.push(coin.icon);
                    new_content.push(' x ' + coin.text);
                }
                if (coin.text > 0 && coin.icon >= 100) {
                    coin.icon = coin.icon/100;
                    coin.icon = this.scene.add.sprite(_x + 4, _y + line_height + 5, 'ITEMS', 'PAPER_' + coin.icon + '_').setOrigin(0).setScrollFactor(0).setDepth(100200);
                    line_height += coin_slot_height + coin_slot_spacing;
                    coins.push(coin.icon);
                    new_content.push(' x ' + coin.text);
                }
            });
            content = new_content;
        }
        
        if (content.length == 0) { 
            content = [' - Empty'];
            let icon = this.scene.add.sprite(_x + 4, _y + line_height + 5, 'UI', 'EMPTY_SYMBOL').setOrigin(0).setScrollFactor(0).setDepth(100200);
            coins.push(icon);
        }
        let flag_text = this.scene.add.bitmapText(_x + 20, _y + 10, 'SkeleTalk', content, 8).setOrigin(0).setScrollFactor(0).setDepth(100200).setTintFill(0x465e62).setLineSpacing(11);

        let flag_height = flag_text.getTextBounds().global.height + 20;
        let flag_width = flag_text.getTextBounds().global.width + 28;
        let flag = this.makeBlock(_x, _y, flag_width, flag_height, 'BLOCK_MID_LILAC');

        return { flag: flag, text: flag_text, coins: coins };

    }

    clearCoinpurseTell() {
        if (this.coinPurse.tell != null) {
            this.coinPurse.tell.flag.destroy();
            this.coinPurse.tell.text.destroy();
            this.coinPurse.tell.coins.forEach(coin => {
                coin.destroy();
            });
            this.coinPurse.tell = null;
        }
    }

}