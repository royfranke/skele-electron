import SettingsFactory from "./settings-factory.js";
import SettingsState from "./settings-state.js";
import SettingsMenu from "./settings-menu.js";

/* Settings Manager Class */

export default class SettingsManager {

    constructor(scene) {
        this.scene = scene;
        this.settingsState = new SettingsState();
        this.factory = new SettingsFactory(scene);
        
    }

    loadSettings () {
        this.menu = new SettingsMenu(this.scene);
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

}