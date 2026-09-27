import SettingsFactory from "./settings-factory.js";
import SettingsState from "./settings-state.js";
import SettingsView from "./settings-view.js";
import { saveSettings as persistSettings } from "./settings-store.js";


/* Settings Manager Class */

export default class SettingsManager {

    constructor(scene) {
        this.scene = scene;
        this.settingsState = new SettingsState();
        this.factory = new SettingsFactory(scene);
        this.view = null;
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

    saveSettings () {
        return persistSettings(this.scene);
    }

    getSetting (key, type="input") {
        return this.factory.getSetting(key, type);
    }

    setSetting (key, value, type) {
        return this.factory.setSetting(key, value, type);
    }

    resetSettings (type) {
        return this.factory.resetSettings(type);
    }

    setView (_x, _y, width, height, view) {
        this.view = new SettingsView(this.scene, this, view);
        this.view.create(_x, _y, width, height);
        return this.view;
    }

    input (key) {
        if (this.view != null) {
            this.view.input(key);
        }
    }

}