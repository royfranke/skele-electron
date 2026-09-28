import SETTINGS_STATES from "../config/settings-states.js";
import HudSound from "../hud/hud-sound.js";
import HudCommon from "../hud/hud-common.js";
/* global Phaser */
/*
 * Interactive settings panel: category sidebar plus typed rows
 * (toggle | level | keybind) for the selected category.
 */

const CATEGORIES = ['CONTENT', 'AUDIO', 'INPUT'];
const ROW_TYPES = { CONTENT: 'toggle', AUDIO: 'level', INPUT: 'bind' };
const ROW_HEIGHT = 20;
const HEADER_HEIGHT = 32;
const FOOTER_HEIGHT = 20;
const MAX_LEVEL = 10;
const PIP_SIZE = 8;
const PIP_GAP = 2;
const RESET_KEY = '__RESET__';

export default class SettingsView extends HudCommon {

    constructor(scene, manager, view) {
        super(scene, view);
        this.manager = manager;
        this.sound = new HudSound(scene);
        this.view = view;
        this.category = 0;
        this.selected = 0;
        this.capturing = false;
        this.rows = [];
        this.tabs = [];
    }

    create (_x, _y, width, height) {
        this.panel = { x: _x, y: _y, width: width, height: height };

        this.scene.add.nineslice(_x, _y, 'UI', 'BLOCK_MID_LILAC_BORDER', width, height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(998);
        this.scene.add.nineslice(_x, _y, 'UI', 'BLOCK_SHALLOW_YELLOW_EDGE_FRAME', width, height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(1200);

        this.headerText = this.scene.add.bitmapText(_x + 10, _y + 9, 'SkeleMarquee', '', 16).setOrigin(0).setScrollFactor(0).setDepth(1001);
        this.statusText = this.scene.add.bitmapText(_x + 10, _y + height - 14, 'SkeleTalk', '', 8).setOrigin(0).setScrollFactor(0).setDepth(1001);

        this.buildTabs();
        this.setCategory(0);
    }

    buildTabs () {
        const view = this.view;
        const left = view.left + view.margin.left + 24;
        const top = view.top + view.margin.top;

        this.selector = this.scene.add.nineslice(left - 24, top, 'UI', 'BLOCK_DEEP_ORANGE_LEFT', 24, 24, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(1010);
        this.selectorText = this.scene.add.bitmapText(this.selector.x + 8, this.selector.y + 4, 'SkeleButton', 'X', 16).setOrigin(0).setScrollFactor(0).setDepth(1011);

        CATEGORIES.forEach((category, index) => {
            const top_y = top + (28 * index);
            const block = this.scene.add.nineslice(left, top_y, 'UI', 'BLOCK_MID_DARK_BLUE', 96, 24, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(1000);
            const text = this.scene.add.bitmapText(left + 6, top_y + 8, 'SkeleTalk', SETTINGS_STATES[category].display, 8).setOrigin(0).setScrollFactor(0).setDepth(1001);

            block.setInteractive();
            block.on('pointerover', () => this.setCategory(index));
            block.on('pointerdown', () => this.setCategory(index));

            this.tabs.push({ block: block, text: text, y: top_y });
        });

        this.backButton = this.makeBackButton(left + 96, top + (28 * CATEGORIES.length), 'Back to Menu');
        this.backButton.click_area.on('pointerdown', () => this.exit());
    }

    categoryName () {
        return CATEGORIES[this.category];
    }

    setCategory (index) {
        if (this.capturing || index < 0 || index >= CATEGORIES.length) {
            return;
        }

        const changed = index !== this.category;
        this.category = index;
        this.selected = 0;

        this.tabs.forEach((tab, i) => {
            tab.block.setFrame(i === index ? 'BLOCK_MID_MOONSTONE_RIGHT' : 'BLOCK_MID_DARK_BLUE');
        });
        this.selector.setY(this.tabs[index].y);
        this.selectorText.setY(this.tabs[index].y + 4);

        this.headerText.setText(SETTINGS_STATES[this.categoryName()].display.toUpperCase());
        this.buildRows();
        this.setStatus();

        if (changed) {
            this.sound.play('MENU_INPUT');
        }
    }

    clearRows () {
        this.rows.forEach((row) => {
            row.block.destroy();
            row.label.destroy();
            if (row.value) {
                row.value.destroy();
            }
            if (row.pips) {
                row.pips.forEach((pip) => pip.destroy());
            }
        });
        this.rows = [];
    }

    buildRows () {
        this.clearRows();

        const type = ROW_TYPES[this.categoryName()];
        const settings = this.manager.factory.customSettings(this.categoryName()) || {};
        const keys = Object.keys(settings);
        keys.push(RESET_KEY);

        const top = this.panel.y + HEADER_HEIGHT;
        const usable = this.panel.height - HEADER_HEIGHT - FOOTER_HEIGHT;
        const perColumn = Math.max(1, Math.floor(usable / ROW_HEIGHT));
        const columns = Math.ceil(keys.length / perColumn);
        const columnWidth = Math.floor((this.panel.width - 16) / columns);

        keys.forEach((key, index) => {
            const column = Math.floor(index / perColumn);
            const _x = this.panel.x + 8 + (column * columnWidth);
            const _y = top + ((index % perColumn) * ROW_HEIGHT);
            const rowType = key === RESET_KEY ? 'reset' : type;

            const block = this.scene.add.nineslice(_x, _y, 'UI', 'BLOCK_MID_DARK_BLUE', columnWidth - 8, ROW_HEIGHT - 2, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(999);
            const label = this.scene.add.bitmapText(_x + 6, _y + 5, 'SkeleMarquee', rowType === 'reset' ? 'RESET TO DEFAULTS' : key.toUpperCase(), 8).setOrigin(0).setScrollFactor(0).setDepth(1001);

            const row = { key: key, type: rowType, block: block, label: label, x: _x, y: _y, width: columnWidth - 8 };

            if (rowType === 'level') {
                row.pips = [];
                const pips_x = _x + row.width - 8 - (MAX_LEVEL * (PIP_SIZE + PIP_GAP));
                for (let level = 1; level <= MAX_LEVEL; level++) {
                    const pip = this.scene.add.image(pips_x + ((level - 1) * (PIP_SIZE + PIP_GAP)), _y + 5, 'UI', 'BLOCK_MID_DARK').setOrigin(0).setDisplaySize(PIP_SIZE, PIP_SIZE).setScrollFactor(0).setDepth(1001);
                    pip.setInteractive();
                    pip.on('pointerdown', () => {
                        this.selectRow(index);
                        this.setLevel(key, level);
                    });
                    row.pips.push(pip);
                }
            }
            else if (rowType !== 'reset') {
                row.value = this.scene.add.bitmapText(_x + row.width - 8, _y + 5, 'SkeleMarquee', '', 8).setOrigin(1, 0).setScrollFactor(0).setDepth(1001);
                row.value.setTintFill(0x2d4275);
            }

            block.setInteractive();
            block.on('pointerover', () => this.selectRow(index));
            block.on('pointerdown', () => this.activate());

            this.rows.push(row);
        });

        this.refreshRows();
        this.selectRow(0, true);
    }

    refreshRows () {
        const category = this.categoryName();
        const settings = this.manager.factory.customSettings(category) || {};

        this.rows.forEach((row) => {
            if (row.type === 'toggle') {
                row.value.setText(settings[row.key] ? 'ON' : 'OFF');
                row.value.setTintFill(settings[row.key] ? 0x5a735b : 0x9e2b2d);
            }
            if (row.type === 'bind') {
                row.value.setText(this.capturing && row.key === this.currentKey() ? '...' : String(settings[row.key]));
            }
            if (row.type === 'level') {
                const level = Number(settings[row.key]) || 0;
                row.pips.forEach((pip, i) => {
                    pip.setFrame(i < level ? 'BLOCK_MID_WHITE' : 'BLOCK_MID_DARK');
                });
            }
        });
    }

    currentKey () {
        return this.rows[this.selected] ? this.rows[this.selected].key : null;
    }

    selectRow (index, force = false) {
        if (this.capturing) {
            return;
        }
        if (index < 0) {
            index = this.rows.length - 1;
        }
        if (index >= this.rows.length) {
            index = 0;
        }
        if (!force && index === this.selected) {
            return;
        }

        this.selected = index;
        this.rows.forEach((row, i) => {
            row.block.setFrame(i === index ? 'BLOCK_MID_SUNRISE' : 'BLOCK_MID_BLUE');
        });
        this.setStatus();
    }

    setStatus (message) {
        if (message) {
            this.statusText.setText(message);
            return;
        }

        const row = this.rows[this.selected];
        if (!row) {
            this.statusText.setText('');
            return;
        }

        if (row.type === 'toggle') {
            this.statusText.setText('SELECT to toggle');
        }
        else if (row.type === 'level') {
            this.statusText.setText('LEFT / RIGHT to adjust');
        }
        else if (row.type === 'bind') {
            this.statusText.setText('SELECT then press a new key');
        }
        else {
            this.statusText.setText('SELECT to restore defaults');
        }
    }

    input (key) {
        if (this.capturing) {
            return;
        }

        switch (key) {
            case 'UP': this.selectRow(this.selected - 1); this.sound.play('MENU_INPUT'); break;
            case 'DOWN': this.selectRow(this.selected + 1); this.sound.play('MENU_INPUT'); break;
            case 'LEFT': this.nudge(-1); break;
            case 'RIGHT': this.nudge(1); break;
            case 'MORE': this.setCategory((this.category + 1) % CATEGORIES.length); break;
            case 'SELECT': this.activate(); break;
            case 'BACK': this.exit(); break;
        }
    }

    nudge (direction) {
        const row = this.rows[this.selected];
        if (!row || row.type !== 'level') {
            return;
        }

        const current = Number(this.manager.getSetting(row.key, this.categoryName())) || 0;
        this.setLevel(row.key, current + direction);
    }

    setLevel (key, level) {
        const clamped = Math.min(MAX_LEVEL, Math.max(0, level));
        if (clamped === this.manager.getSetting(key, this.categoryName())) {
            return;
        }

        this.manager.setSetting(key, clamped, this.categoryName());
        this.refreshRows();
        this.sound.play('MENU_INPUT');
        this.persist();
    }

    activate () {
        const row = this.rows[this.selected];
        if (!row || this.capturing) {
            return;
        }

        if (row.type === 'toggle') {
            this.manager.setSetting(row.key, !this.manager.getSetting(row.key, this.categoryName()), this.categoryName());
            this.sound.play('MENU_SELECT');
            this.refreshRows();
            this.persist();
            return;
        }

        if (row.type === 'reset') {
            this.manager.resetSettings(this.categoryName());
            this.sound.play('MENU_SELECT');
            this.refreshRows();
            this.applyBindings();
            this.persist();
            return;
        }

        if (row.type === 'bind') {
            this.captureBinding(row);
        }
    }

    captureBinding (row) {
        this.capturing = true;
        this.sound.play('MENU_SELECT');
        this.refreshRows();
        this.setStatus('Press a key, or ESC to cancel');

        this.scene.input.keyboard.once('keydown', (event) => {
            this.capturing = false;
            const name = this.resolveKeyName(event.keyCode);

            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC) {
                this.setStatus('Cancelled');
            }
            else if (name == null) {
                this.setStatus('That key cannot be used');
            }
            else {
                this.bind(row.key, name);
            }

            // Clears the keypress so it is not also read as a menu action.
            this.scene.input.keyboard.resetKeys();
            this.refreshRows();
        });
    }

    resolveKeyName (keyCode) {
        const available = this.manager.factory.availableSettings('input') || {};
        const { KeyCodes } = Phaser.Input.Keyboard;

        for (const name of Object.keys(available)) {
            if (KeyCodes[name] === keyCode) {
                return name;
            }
        }

        return null;
    }

    /* Keeps every action bound by swapping with whoever already owns the key. */
    bind (action, name) {
        const bindings = this.manager.factory.customSettings('input') || {};
        const previous = bindings[action];

        for (const other of Object.keys(bindings)) {
            if (other !== action && bindings[other] === name) {
                this.manager.setSetting(other, previous, 'input');
            }
        }

        this.manager.setSetting(action, name, 'input');
        this.applyBindings();
        this.persist();
        this.setStatus(action.toLowerCase() + ' set to ' + name);
    }

    applyBindings () {
        const input = this.scene.app && this.scene.app.input;
        if (input && typeof input.refreshBindings === 'function') {
            input.refreshBindings();
        }
        this.backButton.button_text.setText(this.manager.getSetting('BACK', 'INPUT'));
    }

    persist () {
        this.manager.saveSettings().then((result) => {
            if (!result || !result.ok) {
                this.setStatus('Could not save settings');
            }
        });
    }

    exit () {
        if (this.capturing) {
            return;
        }
        this.sound.play('MENU_SELECT');
        this.scene.app.endScene('MAIN');
    }

}
