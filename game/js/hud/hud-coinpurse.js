import HudSide from './hud-side.js';
//import CoinpurseManager from '../purse/purse-manager.js';
/*
 * Controls the purse display on the HUD
 */

export default class HudCoinpurse extends HudSide {

    constructor(scene) {
        super(scene);
    }

    setVariables() {
        if (this.scene.slot.COINPURSE.STATUS.HAS == 'FALSE') {
            return;
        }
        this.keytip = 'COINPURSE';
        this.colors = {
            selected: 'ITEM_FOCUSED',
            normal: 'BAG_UNFOCUSED',
            frame: 'BLOCK_SHALLOW_YELLOW_FRAME'
        };

        this.icon = 'COINPURSE_CLOSED';

        this.position = {
            unfocused: {
                slot: {
                    x: (this.view.left + this.view.margin.left),
                    y: this.view.bottom - (this.view.margin.bottom + 72)
                },
                icon: {
                    x: (this.view.left + this.view.margin.left),
                    y: this.view.bottom - (this.view.margin.bottom + 72)
                },
                board: {
                    x: this.view.left + this.view.margin.left + 64,
                    y: this.view.bottom - (this.view.margin.bottom + 72)
                }
            },
            focused: {

            }
        };
        this.coinCoinpurse = {
            display: null,
            tell: null
        };
    }

    openManager() {

        if (this.scene.player.coinpurse.contents.STATUS.HAS == 'TRUE') {
            this.scene.player.coinpurse.updateTotal();
            this.side.icon.setFrame('COINPURSE_OPEN');

            var coinTotal = this.scene.player.coinpurse.getTalliedTotal();

            this.clearCoinpurseTell();
            this.coinCoinpurse.tell = this.tellCoinpurse(coinTotal);
        }
    }

    closeManager() {
        this.clearCoinpurseTell();
        this.side.icon.setFrame('COINPURSE_CLOSED');
    }

    tellCoinpurse(content, timing = 0, status = 'default') {
        let _x = this.position.unfocused.board.x;
        let _y = this.position.unfocused.board.y;
        /// Make container for text and icons
        this.container = this.scene.add.container(_x, _y).setDepth(100200);
        var coins = [];
        if (content.length > 0) {
            let coin_slots = [];
            let coin_slot_height = 12;
            let coin_slot_width = 80;
            let coin_slot_spacing = 2;
            var line_height = 0;
            var new_content = [];
            content.forEach(coin => {
                if (coin.text > 0 && coin.icon < 100) {
                    // Add to container

                    coin.icon = this.scene.add.sprite(6, line_height + 7, 'FX', 'COIN_' + coin.icon + '_-2').setOrigin(0).setScrollFactor(0).setDepth(100200);

                    this.container.add(coin.icon);

                    line_height += coin_slot_height + coin_slot_spacing;
                    coins.push(coin.icon);
                    new_content.push(' x ' + coin.text);
                }
                if (coin.text > 0 && coin.icon >= 100) {
                    coin.icon = coin.icon / 100;
                    coin.icon = this.scene.add.sprite(6,line_height + 5, 'ITEMS', 'PAPER_' + coin.icon + '_').setOrigin(0).setScrollFactor(0).setDepth(100200);

                    this.container.add(coin.icon);

                    line_height += coin_slot_height + coin_slot_spacing;
                    coins.push(coin.icon);
                    new_content.push(' x ' + coin.text);
                }
            });
            content = new_content;
        }

        if (content.length == 0) {
            content = [' - Empty'];
            let icon = this.scene.add.sprite(6, line_height + 5, 'UI', 'EMPTY_SYMBOL').setOrigin(0).setScrollFactor(0).setDepth(100200);
            coins.push(icon);
            this.container.add(icon);
        }
        let flag_text = this.scene.add.bitmapText(20, 12, 'SkeleTalk', content, 8).setOrigin(0).setScrollFactor(0).setDepth(100200).setTintFill(0x465e62).setLineSpacing(11);
        this.container.add(flag_text);
        let flag_height = flag_text.getTextBounds().global.height + 24;
        let flag_width = flag_text.getTextBounds().global.width + 28;
        let flag = this.makeBlock(_x, _y, flag_width, flag_height, 'BLOCK_MID_ORANGE_MED_BORDER');

        if (flag_height > 72) {
            this.container.y = this.position.unfocused.board.y - (flag_height - 72);
            flag.y = this.position.unfocused.board.y - (flag_height - 72);
        }
        
        return { flag: flag, text: flag_text, coins: coins };

    }

    clearCoinpurseTell() {
        if (this.coinCoinpurse == null) return;
        if (this.coinCoinpurse.tell != null) {
            this.coinCoinpurse.tell.flag.destroy();
            this.coinCoinpurse.tell.text.destroy();
            this.coinCoinpurse.tell.coins.forEach(coin => {
                coin.destroy();
            });
            this.coinCoinpurse.tell = null;
        }
    }

    popCoin(amount = 0, status = 'default') {
        let timeline = this.scene.add.timeline([
            {
                at: 500,
                run: () => {
                    this.scene.manager.hud.hudSound.play('COIN_CLINK');
                    this.side.block.setFrame('BAG_FOCUSED');
                    this.side.icon.setFrame('COINPURSE_POP');
                    this.makeFX('SPARKLE_', this.side.icon.x - 8, this.side.icon.y - 8);
                }
            },
            {
                at: 625,
                run: () => {
                    this.side.block.setFrame('BAG_SELECTED');
                }
            },
            {
                at: 875,
                run: () => {
                    this.side.block.setFrame('BAG_FOCUSED');
                    this.side.icon.setFrame('COINPURSE_CLOSED');
                }
            },
            {
                at: 1125,
                run: () => {
                    this.side.block.setFrame('BAG_UNFOCUSED');
                }
            }
        ]);

        timeline.play();

    }

}