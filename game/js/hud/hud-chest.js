/*
 * Handles chest interaction UI
 */

export default class HudChest {

    constructor(scene, factory) {
        this.scene = scene;
        this.factory = factory;
        this.view = this.scene.manager.getView();
        this.position = {
            x: this.view.right - 128,
            y: this.view.top + 128,
        };
        this.chest = null;
    }

    chestArrowDown() {
        if (this.chest != null) {
            var arrow = this.chest.arrow;
            if (this.chest.items.length > 1) {
                this.chest.item.nextItem();
                var sound_var = Phaser.Math.RND.between(1, 3);
                this.scene.manager.hud.hudSound.play('BAG_RUMMAGE_' + sound_var);

                var tween = this.scene.tweens.add({
                    targets: [arrow],
                    y: this.chest.arrow.y + 4,
                    x: this.chest.arrow.x,
                    duration: 100,
                    ease: 'Sine.easeIn',
                    loop: 0,
                    yoyo: true,
                });
                tween.on('complete', () => {
                    this.refreshChest();
                    var new_item = this.chest.icon;
                    this.scene.tweens.add({
                        targets: [new_item],
                        y: new_item.y - 2,
                        x: new_item.x,
                        duration: 250,
                        ease: 'Sine.easeIn',
                        loop: 0,
                        yoyo: true,
                    });
                });

            }
            else { // Only one item in bag
                //var sound_var = Phaser.Math.RND.between(1,3);
                //this.scene.manager.hud.hudSound.play('SKELE_INVALID_'+sound_var); replace with more subtle
                var tween = this.scene.tweens.add({
                    targets: [arrow],
                    x: this.chest.arrow.x - 1,
                    duration: 100,
                    ease: 'Sine.easeIn',
                    loop: 1,
                    yoyo: true,
                });
            }
        }
    }

    makeIcon(_x, _y, textureName, frameName) {
        return this.factory.makeIcon(_x + 8, _y + 8, textureName, frameName);
    }

    addFX(fx_slug, _x, _y, delay = 0) {
        var fx = this.scene.manager.fx.playFX(fx_slug, _x, _y, delay);
        fx.setDepth(100200).setScrollFactor(0);
    }

    closeChest() {
        if (this.chest != null) {
            this.chest.icon.destroy();
            this.chest.slot.destroy();
            this.chest.arrow.destroy();
            if (this.chest.slip != null) {
                this.chest.slip.destroy();
            }
            this.chest = null;
        }
    }

    openChest(item) {
        this.closeChest(); // Use to clean up any existing open chest
        this.chest = {
            item: item,
            slip: null,
            slot: null,
            arrow: null,
            icon: null,
            items: item.info.items
        };

        this.chest.slot = this.factory.makeBlock(this.position.x, this.position.y);

        if (this.chest.items.length > 0) {
            this.chest.icon = this.makeIcon(this.chest.slot.x, this.chest.slot.y, 'ITEMS', this.chest.items[0].info.icon);
            //this.chest.slip = this.makeSlip(this.chest.slot.x,this.chest.slot.y, 'TAKE');
        }
        else {
            this.chest.icon = this.makeIcon(this.chest.slot.x, this.chest.slot.y, 'EMPTY', 'empty')
        }

        this.chest.arrow = this.factory.makeArrow(this.chest.slot.x, this.chest.slot.y + 36);
    }

    refreshChest() {
        if (this.chest != null) {
            this.chest.icon.destroy();
            if (this.chest.items.length > 0) {
                this.chest.icon = this.makeIcon(this.chest.slot.x, this.chest.slot.y, 'ITEMS', this.chest.items[0].info.icon);
            }
            else {
                this.chest.icon = this.makeIcon(this.chest.slot.x, this.chest.slot.y, 'EMPTY', 'empty')
            }
        }
    }

}