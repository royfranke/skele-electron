
export default class SettingsFactory {

    constructor(scene) {
        this.scene = scene;
        this.config = this.scene.cache.json.get('SETTINGSCONFIG');
    }

    getSettingsData (type="input") {
        return {data: this.config[type.toUpperCase()],type: type};
    }

    defaultSettings (type="input") {
        return this.config[type.toUpperCase()].DEFAULT;
    }

    customSettings (type="input") {
        return this.config[type.toUpperCase()].CUSTOM;
    }

    setSetting (key, value, type="input") {
        this.config[type.toUpperCase()].CUSTOM[key] = value;
    }

    resetSettings (type="input") {
        this.config[type.toUpperCase()].CUSTOM = this.config[type.toUpperCase()].DEFAULT;
    }

}