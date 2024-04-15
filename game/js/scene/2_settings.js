import AppManager from "../app/app-manager.js";
import PreloadManager from "../preload/preload-manager.js";
/**
 * Settings
 */
export default class SystemSettingsScene extends Phaser.Scene {
    constructor() {
        super("System Settings");
    }

    preload () {
        this.preload = new PreloadManager(this); 
        
    }

    create() {
        
        this.app = new AppManager(this,'SETTINGS');
    }

    update() {
        this.app.update();
    }

}