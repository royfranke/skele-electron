import SettingsFactory from "./settings-factory.js";
import SettingsState from "./settings-state.js";


/* Settings Manager Class */

export default class SettingsManager {

    constructor(scene) {
        this.scene = scene;
        this.settingsState = new SettingsState();
        this.factory = new SettingsFactory(scene);
        this.config = {
            "INPUT": this.factory.getSettingsData("input"),
            "AUDIO": this.factory.getSettingsData("audio"),
            "DISPLAY": this.factory.getSettingsData("display"),
            "CONTENT": this.factory.getSettingsData("content")
        };

        this.display = {
            input: {
                frame: "BLOCK_SHALLOW_GREEN_FRAME",
                block: "BLOCK_MID_LILAC_BORDER",
            },
            audio: {
                frame: "BLOCK_SHALLOW_DARK_FRAME",
                block: "BLOCK_MID_LILAC_BORDER",
            },
            display: {
                frame: "BLOCK_SHALLOW_DARK_FRAME",
                block: "BLOCK_MID_LILAC_BORDER",
            },
            content: {
                frame: "BLOCK_SHALLOW_DARK_FRAME",
                block: "BLOCK_MID_LILAC_BORDER",
            }
        }
    }

    getState () {
        return this.settingsState.getStateConfig();
    }

    setState (state_string) {
        return this.settingsState.setState(state_string);
    }

    getLastState () {
        return this.settingsState.getLastState();
    }

    defaultSettings (type="input") {
        var data = this.factory.defaultSettings(type);
        return {data: data,type: type};
    }

    customSettings (type="input") {
        var data = this.factory.customSettings(type);
        return {data: data,type: type};
    }

    saveSettings (type) {
        let data = this.factory.getSettingsData(type);
        this.scene.saveSettingsData(data);
    }

    setSetting (key, value, type) {
        this.factory.setSetting(key, value, type);
    }

    resetSettings (type) {
        this.factory.resetSettings(type);
    }

    setView (_x, _y, width, height, type="input") {
        var slot_slice = this.scene.add.nineslice(_x,_y, 'UI', this.display[type].block, width, height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(998);
        var slot_highlight = this.scene.add.nineslice(_x,_y, 'UI', this.display[type].frame, width, height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(999).setVisible(true);
        var settings = this.config[type.toUpperCase()].data.CUSTOM;
        console.log(settings);
        /// Do for each key value
        for (let key in settings) {
            let value = settings[key];
            let text = this.scene.add.bitmapText(_x + 8, _y + 8, 'SkeleTalk', key + ': ' + value, 8).setOrigin(0).setScrollFactor(0).setDepth(1000);
            _y += 16;
        }
    }

}