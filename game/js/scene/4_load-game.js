import AppManager from "../app/app-manager.js";
import PreloadManager from "../preload/preload-manager.js";
/**
 * Load Game
 */
export default class LoadGameScene extends Phaser.Scene {
    constructor() {
        super("Load Game");
    }


    preload () {
        this.preload = new PreloadManager(this); 
    }

    create() {
        this.app = new AppManager(this,'LOAD');
    }

    update() {
        this.app.update();
    }
}