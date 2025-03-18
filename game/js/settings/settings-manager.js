import SettingsFactory from "./settings-factory.js";
import SettingsState from "./settings-state.js";

/* Settings Manager Class */

export default class SettingsManager {

    constructor(scene) {
        this.scene = scene;
        this.settingsState = new SettingsState();
        this.factory = new SettingsFactory(scene);
        
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

    setView (_x, _y, width, height) {
        var slot_slice = this.scene.add.nineslice(_x,_y, 'UI', 'BLOCK_MID_LILAC_BORDER', width, height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(998);
        var slot_highlight = this.scene.add.nineslice(_x,_y, 'UI', 'BLOCK_SHALLOW_DARK_FRAME', width, height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(999).setVisible(true);
    }

}