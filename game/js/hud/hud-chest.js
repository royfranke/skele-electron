/*
 * Handles chest interaction UI
 */

export default class HudChest {

    constructor(scene, factory) {
        this.scene = scene;
        this.factory = factory;
        this.view = this.scene.manager.getView();
        this.position = {
            x: this.view.right - 168,
            y: this.view.top + 128,
            container: {
                x: this.view.right - 128,
                y: this.view.top + 128,
                width: 112,
                height: 128,
                text: {
                    x: this.view.margin.left/2,
                    y: this.view.margin.top/2,
                    width: 112 - this.view.margin.left,
                    height: 128 - this.view.margin.top,
                }
            },
            slip: {
                x: this.view.right - (this.view.margin.right/2),
                y: this.view.top + 108,
            }
        };
        this.chest = null;
    }

    addChestTextBlock () {
        return this.scene.add.dom(this.position.container.x + this.position.container.text.x, this.position.container.y + this.position.container.text.y, 'div', {'max-width':this.position.container.text.width+'px'}, '').setClassName('chest-textblock').setOrigin(0).setScrollFactor(0).setVisible(false);
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

                    var new_slip = this.chest.slip;
                    this.scene.tweens.add({
                        targets: [new_slip],
                        y: new_slip.y,
                        x: new_slip.x - 2,
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
            this.chest.container.destroy();
            this.chest.text.destroy();
            if (this.chest.slip != null) {
                this.chest.slip.destroy();
            }
            this.chest = null;
        }
    }

    openBag(item) {
        this.closeChest(); // Use to clean up any existing open chest
        this.chest = {
            item: item,
            slip: null,
            slot: null,
            arrow: null,
            icon: null,
            container: null,
            text: null,
            items: item.items
        };
        this.chest.container = this.factory.makeBlock(this.position.container.x, this.position.container.y, this.position.container.width, this.position.container.height, 'HAND_FOCUSED');

        this.chest.text = this.addChestTextBlock();

        this.chest.slot = this.factory.makeBlock(this.position.x, this.position.y, 32, 32, 'BAG_SELECTED');

        if (this.chest.items.length > 0) {
            this.chest.icon = this.makeIcon(this.chest.slot.x, this.chest.slot.y, 'ITEMS', this.chest.items[0].getStackIcon());
            this.chest.slip = this.makeSlip(this.position.slip.x,this.position.slip.y, 'TAKE');
        }
        else {
            this.chest.icon = this.makeIcon(this.chest.slot.x, this.chest.slot.y, 'EMPTY', 'empty')
        }

        this.chest.arrow = this.factory.makeArrow(this.chest.slot.x, this.chest.slot.y + 36);

        this.refreshChest();
    }

    openChest(object) {
        object.setState('OPEN');
        this.closeChest(); // Use to clean up any existing open chest
        this.chest = {
            item: object,
            slip: null,
            slot: null,
            arrow: null,
            icon: null,
            container: null,
            text: null,
            items: object.items
        };
        this.chest.container = this.factory.makeBlock(this.position.container.x, this.position.container.y, this.position.container.width, this.position.container.height, 'HAND_FOCUSED');

        this.chest.text = this.addChestTextBlock();

        this.chest.slot = this.factory.makeBlock(this.position.x, this.position.y, 32, 32, 'BAG_SELECTED');

        if (this.chest.items.length > 0) {
            this.chest.icon = this.makeIcon(this.chest.slot.x, this.chest.slot.y, 'ITEMS', this.chest.items[0].getStackIcon());
            this.chest.slip = this.makeSlip(this.position.slip.x,this.position.slip.y, 'TAKE');
        }
        else {
            this.chest.icon = this.makeIcon(this.chest.slot.x, this.chest.slot.y, 'EMPTY', 'empty')
        }

        this.chest.arrow = this.factory.makeArrow(this.chest.slot.x, this.chest.slot.y + 36);

        this.refreshChest();
    }

    makeSlip(_x, _y, text = 'HOLD') {
        return this.scene.add.dom(_x, _y, 'div', '', text).setClassName('select-slip').setOrigin(0).setScrollFactor(0).setDepth(100200);
    }

    refreshChest() {
        this.chest.text.setVisible(false);
        if (this.chest != null) {
            this.chest.icon.destroy();
            if (this.chest.items.length > 0) {
                this.chest.icon = this.makeIcon(this.chest.slot.x, this.chest.slot.y, 'ITEMS', this.chest.items[0].getStackIcon());
                
                if (this.chest.items[0].info.description != '') {
                    var description = this.chest.items[0].info.description;
                    
                }
                else {
                    var description = 'No description available.';
                }
                this.chest.text.setText(this.chest.items[0].name+": "+description);

                this.chest.slip.setText("Take "+this.chest.items[0].name+" from "+this.chest.item.name);
                this.chest.slip.setPosition(this.position.slip.x - this.chest.slip.width, this.position.slip.y);
                this.chest.text.setVisible(true);
            }
            else {
                this.chest.icon = this.makeIcon(this.chest.slot.x, this.chest.slot.y, 'EMPTY', 'empty')
            }
        }
    }

}