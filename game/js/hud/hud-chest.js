import HudCommon from './hud-common.js';
/*
 * Handles chest interaction UI
 */

export default class HudChest extends HudCommon {

    constructor(scene) {
        super(scene);
    }

    initialize() {
        this.position = {
            x: this.view.right - 168,
            y: this.view.top + 128,
            container: {
                x: this.view.right - 128,
                y: this.view.top + 128,
                width: 112,
                height: 128,
                text: {
                    x: this.view.margin.left / 2,
                    y: this.view.margin.top / 2,
                    width: 112 - this.view.margin.left,
                    height: 128 - this.view.margin.top,
                }
            },
            slip: {
                x: this.view.right - this.view.margin.right,
                y: this.view.top + 108,
            }
        };
        this.chest = null;
    }

    makeBitmapText(_x, _y, width, text, size, font = "SkeleTalk") {
        let bitmap = this.factory.makeBitmapText(_x, _y, width, size, font);
        bitmap.setText(text);
        bitmap.setLineSpacing(8);
        return bitmap;
    }



    addChestTextBlock() {
        var text = this.makeBitmapText(this.position.container.x + this.position.container.text.x, this.position.container.y + this.position.container.text.y, this.position.container.text.width, '', 8);
        text.setVisible(false);
        return text;
    }

    slipCommand() {
        return "TAKE " + this.chest.items[0].name.toUpperCase();
    }

    chestArrowDown() {
        if (this.chest != null) {
            var arrow = this.chest.arrow;
            if (this.chest.items.length > 1) { // Multiple items in bag
                this.chest.item.nextItem();
                this.scene.manager.hud.hudSound.play('ARROW_BOBBLE_SELECT');
                let tween = this.scene.tweens.add({
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

                    /*
                    var new_slip = this.chest.slip;
                    this.scene.tweens.add({
                        targets: [new_slip.block, new_slip.text, new_slip.button, new_slip.button_text],
                        y: new_slip.block.y,
                        x: new_slip.block.x - 2,
                        duration: 250,
                        ease: 'Sine.easeIn',
                        loop: 0,
                        yoyo: true,
                    });
                    */
                });

            }
            else { // Only one item in bag
                this.scene.manager.hud.hudSound.play('ARROW_SINGLE_SELECT');
                this.scene.tweens.add({
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
        this.chest.container = this.makeBlock(this.position.container.x, this.position.container.y, this.position.container.width, this.position.container.height, 'BLOCK_MID_CREAM_BORDER');

        this.chest.text = this.addChestTextBlock();
        this.chest.slot = this.makeBlock(this.position.x, this.position.y, 32, 32, 'BAG_SELECTED');
        this.chest.arrow = this.factory.makeArrow(this.chest.slot.x, this.chest.slot.y + 36);

        this.refreshChest();
    }


    makeSlip(_x, _y, text = 'TAKE') {
        this.destroySlip();
        return this.factory.makeSlip(_x, _y, text);
    }


    refreshChest() {
        this.chest.text.setVisible(false);
        if (this.chest != null) {
            if (this.chest.icon != null) {
                this.chest.icon.destroy();
            }
            if (this.chest.items.length > 0) {

                this.chest.icon = this.makeIcon(this.chest.slot.x, this.chest.slot.y, 'ITEMS', this.chest.items[0].getStackIcon());

                if (this.chest.items[0].info.description != '') {
                    var description = this.chest.items[0].info.description;

                }
                else {
                    var description = 'No description available.';
                }
                this.chest.text.setText(this.chest.items[0].name + ": " + description);
                this.chest.slip = this.makeSlip(this.position.slip.x, this.position.slip.y, this.slipCommand());
                ;
                this.chest.text.setVisible(true);
            }
            else {
                this.destroySlip();
                this.chest.icon = this.makeIcon(this.chest.slot.x, this.chest.slot.y, 'UI', 'EMPTY_SYMBOL');
            }
        }
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
        this.chest.container = this.makeBlock(this.position.container.x, this.position.container.y, this.position.container.width, this.position.container.height, 'BLOCK_MID_CREAM_BORDER');

        this.chest.text = this.addChestTextBlock();

        this.chest.slot = this.makeBlock(this.position.x, this.position.y, 32, 32, 'BAG_SELECTED');

        this.chest.arrow = this.factory.makeArrow(this.chest.slot.x, this.chest.slot.y + 36);

        this.refreshChest();
    }

    closeChest() {
        if (this.chest != null) {
            this.chest.icon.destroy();
            this.chest.slot.destroy();
            this.chest.arrow.destroy();
            this.chest.container.destroy();
            this.chest.text.destroy();
            this.destroySlip();
            this.chest = null;
        }
    }

    destroySlip() {
        if (this.chest.slip != null) {
            this.chest.slip.block.destroy();
            this.chest.slip.text.destroy();
            this.chest.slip.button.destroy();
            this.chest.slip.button_text.destroy();
            this.chest.slip = null;
        }
    }

}