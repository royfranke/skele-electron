import AppManager from "../app/app-manager.js";
import PreloadManager from "../preload/preload-manager.js";
/**
 * Main Menu
 */
export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("Main Menu");
        this.version = '1.0.3';
    }

    preload () {
        this.preload = new PreloadManager(this); 
        this.preload.initialize();
    }

    create() {
        this.app = new AppManager(this,'MAIN');

    }
    
    update() {
        this.app.update();
    }

}