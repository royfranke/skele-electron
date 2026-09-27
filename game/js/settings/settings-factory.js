
export default class SettingsFactory {

    constructor(scene) {
        this.scene = scene;
        this.config = this.scene.cache.json.get('SETTINGSCONFIG');
    }

    getSettingsData (type="input") {
        return {data: this.config[type.toUpperCase()],type: type};
    }

    getCategory (type="input") {
        return this.config[type.toUpperCase()];
    }

    defaultSettings (type="input") {
        const category = this.getCategory(type);
        return category ? category.DEFAULT : undefined;
    }

    customSettings (type="input") {
        const category = this.getCategory(type);
        if (!category) {
            return undefined;
        }
        return category.CUSTOM || category.DEFAULT;
    }

    availableSettings (type="input") {
        const category = this.getCategory(type);
        return category ? category.AVAILABLE : undefined;
    }

    getSetting (key, type="input") {
        const custom = this.customSettings(type);
        return custom ? custom[key] : undefined;
    }

    setSetting (key, value, type="input") {
        const category = this.getCategory(type);
        if (!category || !category.DEFAULT || !Object.prototype.hasOwnProperty.call(category.DEFAULT, key)) {
            return false;
        }
        if (!category.CUSTOM) {
            category.CUSTOM = Object.assign({}, category.DEFAULT);
        }
        category.CUSTOM[key] = value;
        return true;
    }

    resetSettings (type="input") {
        const category = this.getCategory(type);
        if (!category || !category.DEFAULT) {
            return false;
        }
        category.CUSTOM = Object.assign({}, category.DEFAULT);
        return true;
    }

}