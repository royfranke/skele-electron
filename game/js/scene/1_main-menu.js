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
        const test = this.add.bitmapText(400, 200, 'SkeleReceipt', '', 8);
        test.setText('1X CURSES - 10.29\n2X FROGS --- 5.00\n1X BROOM -- 12.00\n1X POTION -- 3.00\nTOTAL: --- $30.29\n\nTHANK YOU!');

    }
    
    update() {
        this.app.update();
    }

}