import AppManager from "../app/app-manager.js";
/**
 * Settings
 */
export default class SystemSettingsScene extends Phaser.Scene {
    constructor() {
        super("System Settings");
    }

    create() {
        this.app = new AppManager(this,'SETTINGS');
    }

    update() {
        this.app.update();
    }

}