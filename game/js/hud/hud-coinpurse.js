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

    popCoin(amount_string, status = 'default') {
        this.tellCoinpurse(amount_string, 750, status);
        this.coinPurse.icon.setFrame('COINPURSE_pop');

        this.scene.time.addEvent({
            delay: 125,
            callback: ()=>{
                this.coinPurse.icon.setFrame('COINPURSE_closed');
            }
        });
    }

    addCoinPurse() {
        let position = {
            x: this.view.left + this.view.margin.left,
            y: this.view.top + this.view.margin.top
        };

        this.coinPurse.block = this.makeBlock(position.x, position.y, 32, 32, 'BAG_FOCUSED');
        this.coinPurse.icon = this.makeIcon(position.x+8, position.y+8, 'COINPURSE', 'COINPURSE_closed');
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
            this.coinPurse.tell.destroy();
            this.coinPurse.tell = null;
        }
    }


    closeCoinpurse() {
        this.clearCoinpurseTell();
        this.coinPurse.icon.setFrame('COINPURSE_closed');
    }


    openCoinpurse() {
        this.scene.player.coinpurse.updateTotal();
        this.coinPurse.icon.setFrame('COINPURSE_open');
        var coinTotal = this.scene.player.coinpurse.getFormattedTotal();

        this.clearCoinpurseTell();
        this.coinPurse.tell = this.tellCoinpurse(coinTotal);
    }

    tellCoinpurse(content, timing = 0, status = 'default') {
        let _x = this.view.left + (this.view.margin.left / 2);
        let _y = this.view.top + (this.view.margin.top + 28);

        let flag = this.scene.add.dom(_x, _y, 'div', '', content).setOrigin(0).setScrollFactor(0).setClassName('coinpurse coinpurse-'+status);
        if (timing > 0) {
            if (status != 'default') {
                let tween_to_y = status == 'positive' ? _y - this.view.margin.top : _y + this.view.margin.top;
                let tween_to_x = status == 'missing' ? _x - this.view.margin.left : _x;
                let tween_loop = status == 'missing' ? 2 : -1;
                this.scene.tweens.add({
                    targets: [flag],
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
                }
            });
        }
        else {
            return flag;
        }
    }

}