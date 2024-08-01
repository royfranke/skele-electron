import AppManager from "../app/app-manager.js";
import PreloadManager from "../preload/preload-manager.js";
/**
 * Main Menu
 */
export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("Main Menu");
    }

    preload () {
        this.preload = new PreloadManager(this); 
    }

    create() {
        this.app = new AppManager(this,'MAIN');
        const test = this.add.bitmapText(400, 200, 'SkeleNotebook', '', 16);
        test.setText('Curses, Neighbors, & Frogs $1.29');

    }

    update() {
        this.app.update();
    }

}