/*
 * Handles coinpurse UI action
 */

export default class HudCoinpurse {

    constructor(scene, factory) {
        this.scene = scene;
        this.factory = factory;

        this.view = this.scene.manager.getView();

        this.coinPurse = {
            block: null,
            icon: null,
            display: null,
            tell: null
        };

        this.addCoinPurse();
    }

    makeBlock(_x, _y, width = 32, height = 32, frameName = 'HAND_UNFOCUSED') {
        return this.factory.makeBlock(_x, _y, width, height, frameName);
    }

    popCoin(amount, status = 'default') {
        //this.tellCoinpurse(amount, 750, status);
        let timeline = this.scene.add.timeline([
            {
                at: 500,
                run: () => {
                    this.scene.manager.hud.hudSound.play('COIN_CLINK_1');
                    this.coinPurse.block.setFrame('BAG_FOCUSED');
                    this.coinPurse.icon.setFrame('COINPURSE_POP');
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
        let position = {
            x: this.view.left + this.view.margin.left,
            y: this.view.top + this.view.margin.top
        };

        this.coinPurse.block = this.makeBlock(position.x, position.y, 32, 32, 'BAG_UNFOCUSED');
        this.coinPurse.icon = this.makeIcon(position.x+8, position.y+8, 'UI', 'COINPURSE_CLOSED');
    }


    makeIcon(_x, _y, textureName, frameName) {
        return this.factory.makeIcon(_x, _y, textureName, frameName);
    }

    addFX(fx_slug, _x, _y, delay = 0) {
        var fx = this.scene.manager.fx.playFX(fx_slug, _x, _y, delay);
        fx.setDepth(100200).setScrollFactor(0);
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


    closeCoinpurse() {
        this.clearCoinpurseTell();
        this.coinPurse.icon.setFrame('COINPURSE_CLOSED');
    }


    openCoinpurse() {
        this.scene.player.coinpurse.updateTotal();
        this.coinPurse.icon.setFrame('COINPURSE_OPEN');
        //var coinTotal = this.scene.player.coinpurse.getFormattedTotal();
        var coinTotal = this.scene.player.coinpurse.getTalliedTotal();

        this.clearCoinpurseTell();
        this.coinPurse.tell = this.tellCoinpurse(coinTotal);
    }

    tellCoinpurse(content, timing = 0, status = 'default') {
        let _x = this.view.left + (this.view.margin.left);
        let _y = this.view.top + (this.view.margin.top + 40);

       
       /// Replace this receipt with block/slots for coins that unfurl when inventory is opened
       var coins = [];
       if (content.length > 0) {
            let coin_slots = [];
            let coin_slot_height = 12;
            let coin_slot_width = 72;
            let coin_slot_spacing = 2;
            var line_height = 0;
            var new_content = [];
            content.forEach(coin => {
                if (coin.text > 0) {
                    coin.icon = this.scene.add.sprite(_x + 4, _y + line_height + 2, 'FX', 'COIN_'+coin.icon+'_-2').setOrigin(0).setScrollFactor(0).setDepth(100200);
                    
                    line_height += coin_slot_height + coin_slot_spacing;
                    coins.push(coin.icon);
                    new_content.push(' x '+coin.text);
                }
            });
            content = new_content;
       }
        let flag_text = this.scene.add.bitmapText(_x + 19, _y + 6, 'SkeleTalk', content, 8).setOrigin(0).setScrollFactor(0).setDepth(100200).setTintFill(0x465e62).setLineSpacing(11);
       


        let flag_height = flag_text.getTextBounds().global.height + 12;
        let flag_width = flag_text.getTextBounds().global.width + 24;

       let flag = this.makeBlock(_x, _y, flag_width, flag_height, 'BLOCK_SHALLOW_YELLOW');
        if (timing > 0) {
            if (status != 'default') {
                let tween_to_y = status == 'positive' ? _y - this.view.margin.top : _y + this.view.margin.top;
                let tween_to_x = status == 'missing' ? _x - this.view.margin.left : _x;
                let tween_loop = status == 'missing' ? 2 : -1;
                this.scene.tweens.add({
                    targets: [flag, flag_text, coins],
                    y: tween_to_y,
                    x: tween_to_x,
                    duration: timing * .75,
                    ease: 'Sine.easeInOut',
                    loop: tween_loop,
                    yoyo: true
                });
            }

            this.scene.time.addEvent({
                delay: timing,
                callback: ()=>{
                    flag.destroy();
                    flag_text.destroy();
                    coins.forEach(coin => {
                        coin.destroy();
                    });
                }
            });
        }
        else {
            return {flag: flag, text: flag_text, coins: coins};
        }
    }

}