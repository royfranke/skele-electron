import AppManager from "../app/app-manager.js";
/**
 * Load Game
 */
export default class LoadGameScene extends Phaser.Scene {
    constructor() {
        super("Load Game");
    }

    create() {
        this.app = new AppManager(this,'LOAD');
    }

    update() {
        this.app.update();
    }
}