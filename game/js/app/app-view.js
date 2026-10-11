
import SettingsManager from "../settings/settings-manager.js";
import HudSound from "../hud/hud-sound.js";
import HudCommon from "../hud/hud-common.js";
/*
 * Manages application view
 * SPLASH | MAIN | SETTINGS | NEW | LOAD | GAME | TUTORIAL
 */

export default class AppView {

    constructor(scene, view, state_name) {
        this.scene = scene;
        this.view = view;
        this.tip = null;
        this.version = '1.3.0';
        this.sound = new HudSound(scene);
        this.create(state_name);
    }

    create(state_name) {
        if (state_name === 'SPLASH') {

        }
        if (state_name === 'MAIN') {
            //this.createMain();
        }
        if (state_name === 'SETTINGS') {
            this.createSettings();
        }
        if (state_name === 'LOAD') {
            this.createLoad();
        }

        this.state_name = state_name;
    }

    drawTip(tip) {
        if (this.tip) {
            this.tip.destroy();
        }
        var width = (this.view.width) - (this.view.margin.left + this.view.margin.right);
        var _x = this.view.left + this.view.margin.left;
        var _y = this.view.bottom - (this.view.margin.top);

        var text_tip = this.scene.add.bitmapText(_x, _y, 'SkeleTalk', tip, 8).setOrigin(0).setScrollFactor(0).setDepth(1001).setMaxWidth(width - 16).setLineSpacing(10).setAlpha(0);
        text_tip.setTintFill(0xFFFFFF);
        var tween = this.scene.add.tween({
            targets: [text_tip],
            y: '-=' + (text_tip.displayHeight),
            alpha: 1,
            duration: 1000,
            ease: 'Sine.easeInOut',
            repeat: 0
        });

        this.tip = text_tip;
    }

    createSettings() {
        this.settingsManager = new SettingsManager(this.scene);


        var height = this.view.bottom - (this.view.top + this.view.margin.top + (this.view.margin.bottom * 2));
        var _x = this.view.left + (this.view.margin.left * 2) + 120;
        var _y = this.view.top + this.view.margin.top;
        var width = this.view.right - _x - this.view.margin.right;

        this.settingsManager.setView(_x, _y, width, height, this.view);
    }

    handleSettingsInput(key) {
        if (this.settingsManager != null) {
            this.settingsManager.input(key);
        }
    }

    addCootieCatcher(_x, _y) {
        var catcher = this.scene.add.sprite(_x, _y, "FX", 0);
        catcher.setDepth(100500);
        catcher.anims.play('COOTIE_CATCHER_1', false);
        catcher.setOrigin(0.5, 0.5);
        catcher.stop();
        return catcher;
    }

    playCootieCatcher() {
        if (this.cootiecatcher !== null && this.cootiecatcher.anim) {
            //this.cootiecatcher.anim.stop();
            // Check if animation is playing
            let anims = this.cootiecatcher.anim.anims;
            if (anims != undefined && anims.isPlaying) {
                return;
            }

            if (this.cootiecatcher.last === 1) {
                this.cootiecatcher.last = 2;
            }
            else {
                this.cootiecatcher.last = 1;
            }
            if (this.cootiecatcher.anim.anims != undefined) {
                this.cootiecatcher.anim.anims.play('COOTIE_CATCHER_' + this.cootiecatcher.last, false);
            }


        }
    }

    createLoad() {
        var self = this;
        var left = this.view.left + this.view.margin.left;
        var top = this.view.top + this.view.margin.top + 28;
        var height = this.view.bottom - top - (this.view.margin.bottom * 2);
        var gap = 4;
        var width = Math.floor((this.view.right - left - this.view.margin.right - (gap * 2)) / 3);

        this.backButton = new HudCommon(this.scene, this.view).makeBackButton(left + 88, this.view.top + this.view.margin.top, 'Back to Menu');
        this.backButton.click_area.on('pointerdown', () => this.handleLoadInput('BACK'));

        this.slots = [];
        this.selected = 0;
        this.loading = false;
        this.saves = [];
        for (var i = 0; i < 3; i++) {
            this.saves.push(this.scene.cache.json.get('SLOT_' + i) || null);
        }

        for (var i = 0; i < 3; i++) {
            var slotLeft = left + ((width + gap) * i);
            var slot_slice = this.scene.add.nineslice(slotLeft, top, 'UI', 'BLOCK_MID_LILAC_BORDER', width, height, 8, 8, 8, 8).setOrigin(0).setScrollFactor(0).setDepth(998);
            var slot_highlight = this.scene.add.nineslice(slotLeft, top, 'UI', 'BLOCK_SHALLOW_YELLOW_EDGE_FRAME', width, height, 8, 8, 8, 8).setOrigin(0).setScrollFactor(0).setDepth(999).setVisible(false);

            // Mouse/Touch Input
            let slot_number = i + 1;
            slot_slice.setInteractive();
            slot_slice.on('pointerover', () => self.selectLoad(slot_number));
            slot_slice.on('pointerdown', () => self.chooseLoad(slot_number));

            let slot_byline;
            let slot_headline;
            let slot_item_grid = [];
            let slot_item_grid_items = [];
            if (this.saves[i] != null) {
                slot_byline = this.scene.add.bitmapText(slotLeft + this.view.margin.left, top + this.view.margin.top, 'SkeleTalk', 'Day ' + this.saves[i].TIME.DAY + ', ' + this.saves[i].SAVE.DATE, 8).setOrigin(0).setScrollFactor(0).setDepth(1000).setMaxWidth(width - this.view.margin.left * 2);

                var _x = slotLeft + this.view.margin.left;
                var _y = top + this.view.margin.top * 2;

                slot_headline = this.revealMarquee(this.saves[i].SAVE.HEADLINE, _x, _y).setMaxWidth(width - this.view.margin.left * 2);

                /// Draw a grid of six blocks with items towards the bottom of the slot
                const item_grid = this.addItemGrid(slotLeft, top, width, height, this.saves[i]);
                slot_item_grid = item_grid.slot_item_grid;
                slot_item_grid_items = item_grid.slot_item_grid_items;

            }

            this.slots.push({ slice: slot_slice, selector: slot_highlight, slot_byline: slot_byline, slot_headline: slot_headline, slot_item_grid: slot_item_grid, slot_item_grid_items: slot_item_grid_items });
        }
    }

    addItemGrid(slotLeft, top, width, height, save) {
        var slot_item_grid = [];
        var slot_item_grid_items = [];
        /// First draw empty blocks
        let slot_width = 28;
        let slot_height = 28;
        var missingColor = 0x4973a5;
        /// Add a grid of 3 columns and 2 rows of item blocks
        for (var row = 0; row < 2; row++) {
            for (var col = 0; col < 4; col++) {
                var x = slotLeft + 12 + (slot_width + 4) * col;
                var y = (top + height - (slot_height + 8) * 2) + (slot_height + 4) * row;
                var nineslice = this.scene.add.nineslice(x, y, 'UI', 'BLOCK_SHALLOW_DARK_BLUE', slot_width, slot_height, 8, 8, 8, 8).setOrigin(0).setScrollFactor(0).setDepth(999);
                slot_item_grid.push(nineslice);

                if (col == 0 && row == 0) {
                    var item = this.scene.add.sprite(x + 5, y + 5, 'UI', 'WATCH_DEFAULT', 0).setOrigin(0, 0).setDepth(1000);

                    slot_item_grid_items.push(item);
                }

                if (col == 1 && row == 0) {
                    if (save && save.POCKETS && save.POCKETS.SLOTS && save.POCKETS.SLOTS.SLOT2 && save.POCKETS.SLOTS.SLOT2.STATE === "HOLDS") {
                        var item_held = save.POCKETS.SLOTS.SLOT2.HOLDS.ITEM;
                        var item = this.scene.add.sprite(x + 5, y + 5, 'ITEMS', item_held, 0).setOrigin(0, 0).setDepth(1000);
                    } else {
                        var item = this.scene.add.sprite(x + 5, y + 5, 'UI', 'LEFT_HAND', 0).setOrigin(0, 0).setDepth(1000);

                    }
                    slot_item_grid_items.push(item);
                }
                if (col == 2 && row == 0) {
                    if (save && save.POCKETS && save.POCKETS.SLOTS && save.POCKETS.SLOTS.SLOT0 && save.POCKETS.SLOTS.SLOT0.STATE === "WEARS") {
                        var item_worn = save.POCKETS.SLOTS.SLOT0.WEARS.ITEM;
                        var item = this.scene.add.sprite(x + 5, y + 5, 'ITEMS', item_worn, 0).setOrigin(0, 0).setDepth(1000);
                    } else {
                        var item = this.scene.add.sprite(x + 5, y + 5, 'UI', 'SHOULDERS', 0).setOrigin(0, 0).setDepth(1000);
                    }
                    slot_item_grid_items.push(item);
                }
                if (col == 3 && row == 0) {
                    if (save && save.POCKETS && save.POCKETS.SLOTS && save.POCKETS.SLOTS.SLOT1 && save.POCKETS.SLOTS.SLOT1.STATE === "HOLDS") {
                        var item_held = save.POCKETS.SLOTS.SLOT1.HOLDS.ITEM;
                        var item = this.scene.add.sprite(x + 5, y + 5, 'ITEMS', item_held, 0).setOrigin(0, 0).setDepth(1000);
                    } else {
                        var item = this.scene.add.sprite(x + 5, y + 5, 'UI', 'RIGHT_HAND', 0).setOrigin(0, 0).setDepth(1000);
                    }
                    slot_item_grid_items.push(item);
                }

                if (col == 0 && row == 1) {
                    var item = this.scene.add.sprite(x + 5, y + 5, 'ITEMS', 'MAP_BUS', 0).setOrigin(0, 0).setDepth(1000);

                    if (save && save.MAPS && save.MAPS.length > 0) {
                        item.setVisible(true);
                    } else {
                        item.setTintFill(missingColor);
                    }

                    slot_item_grid_items.push(item);
                }

                if (col == 1 && row == 1) {

                    var item = this.scene.add.sprite(x + 5, y + 5, 'ITEMS', 'NOTEBOOK_RED', 0).setOrigin(0, 0).setDepth(1000);
                    console.log(save.NOTEBOOK);

                    if (save && save.NOTEBOOK && save.NOTEBOOK.STATUS && save.NOTEBOOK.STATUS.HAS === "TRUE") {
                        item.setVisible(true);
                    } else {
                        item.setTintFill(missingColor);
                    }

                    slot_item_grid_items.push(item);
                }
                if (col == 2 && row == 1) {
                    var item = this.scene.add.sprite(x + 5, y + 5, 'UI', 'COINPURSE_CLOSED', 0).setOrigin(0, 0).setDepth(1000);

                    if (save && save.COINPURSE && save.COINPURSE.STATUS && save.COINPURSE.STATUS.HAS === "TRUE") {
                        item.setVisible(true);
                    } else {
                        item.setTintFill(missingColor);
                    }

                    slot_item_grid_items.push(item);
                }
                if (col == 3 && row == 1) {


                    if (save && save.KEYRING && save.KEYRING.STATUS && save.KEYRING.STATUS.HAS === "TRUE") {
                        let keyCount = save.KEYS.length || 0;
                        var item = this.scene.add.sprite(x + 5, y + 5, 'UI', 'KEY_RING_' + keyCount, 0).setOrigin(0, 0).setDepth(1000);
                    } else {
                        var item = this.scene.add.sprite(x + 5, y + 5, 'UI', 'KEY_RING_2', 0).setOrigin(0, 0).setDepth(1000);
                        item.setTintFill(missingColor);
                    }

                    slot_item_grid_items.push(item);
                }


            }
        }
        return { slot_item_grid: slot_item_grid, slot_item_grid_items: slot_item_grid_items };
    }


    /* Keyboard driver for the load screen; slots are numbered 1-3. */
    handleLoadInput(key) {
        if (this.loading) {
            return;
        }

        switch (key) {
            case 'LEFT':
            case 'UP':
                this.selectLoad(this.selected <= 1 ? this.slots.length : this.selected - 1);
                this.sound.play('MENU_INPUT');
                break;
            case 'RIGHT':
            case 'DOWN':
                this.selectLoad(this.selected >= this.slots.length ? 1 : this.selected + 1);
                this.sound.play('MENU_INPUT');
                break;
            case 'SELECT':
                this.chooseLoad(this.selected);
                break;
            case 'BACK':
                this.scene.app.endScene('MAIN');
                break;
        }
    }

    chooseLoad(selected) {
        if (this.loading || selected < 1 || selected > this.slots.length) {
            return;
        }

        var data = this.saves[selected - 1];
        if (data == null) {
            return;
        }

        this.loading = true;
        this.sound.play('MENU_SELECT');
        this.selectedLoad(selected, data);
    }

    getMarqueeFill(headline, blank = false) {
        var headline_display = '';
        for (var i = 0; i < headline.length; i++) {
            var character = headline[i];
            headline_display += /[a-z]/i.test(character)
                ? (blank ? ' ' : Phaser.Math.RND.pick(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']))
                : character;
        }
        return headline_display;
    }

    revealMarquee(headline, _x, _y) {
        var headline_text = headline.toLowerCase();
        var headline_display = this.getMarqueeFill(headline_text, true);

        var headline_object = this.scene.add.bitmapText(_x, _y, 'SkeleMarquee', headline_display, 16).setOrigin(0).setScrollFactor(0).setDepth(1000);

        var self = this;
        var shuffle = this.scene.time.addEvent({
            delay: 125,
            repeat: 6,
            callback: () => {
                headline_display = self.getMarqueeFill(headline_text);
                headline_object.setText(headline_display);
            }
        });
        var reveal = this.scene.time.addEvent({
            delay: 1000,
            repeat: 0,
            callback: () => {
                headline_object.setText(headline_text);
            }
        });

        return headline_object;
    }


    selectLoad(selected) {
        /// Highlights save slot on load menu
        if (selected === this.selected) {
            return;
        }
        this.selected = selected;
        for (var i = 0; i < 3; i++) {
            if (i != selected - 1) {
                this.slots[i].slice.setTexture('UI', 'BLOCK_MID_BLUE_FAT_BORDER');
                this.slots[i].selector.setVisible(false);
            }
            else {
                if (selected > 0) {
                    this.slots[selected - 1].slice.setTexture('UI', 'BLOCK_MID_SKY_FAT_BORDER');
                    this.slots[selected - 1].selector.setVisible(true);
                }
            }
        }
    }

    selectedLoad(selected, data) {
        console.log("Selected slot " + selected);
        var self = this;
        // Uses a tween to drop the slots not selected
        /// Remove the back button by destroying its components
        if (this.backButton) {
            this.backButton.block.destroy();
            this.backButton.text.destroy();
            this.backButton.button.destroy();
            this.backButton.button_text.destroy();
            this.backButton.click_area.destroy();
            this.backButton = null;
        }
        let tip = '"Don\'t forget to look both ways before you cross."';
        this.drawTip(tip);

        for (var i = 0; i < 3; i++) {
            if (i != selected - 1) {
                this.slots[i].slice.setTexture('UI', 'BLOCK_MID_TWILIGHT_BORDER');
                this.slots[i].selector.setVisible(false);

                const tween = this.scene.add.tween({
                    targets: [self.slots[i].slice, self.slots[i].selector, self.slots[i].slot_byline, self.slots[i].slot_headline, ...(self.slots[i].slot_item_grid || []), ...(self.slots[i].slot_item_grid_items || [])].filter(Boolean),
                    x: '+=' + self.slots[i].slice.displayWidth,
                    alpha: 0,
                    duration: 1500,
                    ease: 'Sine.easeIn',
                    repeat: 0
                });

            }
            else {
                if (selected > 0) {
                    this.slots[selected - 1].slice.setTexture('UI', 'BLOCK_MID_LILAC_FAT_BORDER');
                    this.slots[selected - 1].selector.setVisible(true);

                    this.slots[selected - 1].slot_headline.setText('waking up....');
                    const tween = this.scene.add.tween({
                        targets: [...(self.slots[i].slot_item_grid_items || [])].filter(Boolean),
                        y: '-=4',
                        duration: 500,
                        yoyo: true,
                        ease: 'Sine.easeInOut',
                        repeat: 1,
                        delay: this.scene.tweens.stagger(100),
                    });

                    tween.on('complete', () => {
                        self.scene.scene.start('Game Scene', { slot: data });
                    });
                }
            }
        }
    }

}