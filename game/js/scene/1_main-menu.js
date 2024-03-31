import AppManager from "../app/app-manager.js";
/**
 * Main Menu
 */
export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("Main Menu");
    }

    create() {
        this.app = new AppManager(this,'MAIN');
    }

    update() {
        this.app.update();
    }

}