import AppManager from "../app/app-manager.js";
/**
 * Load Game
 */
export default class LoadGameScene extends Phaser.Scene {
    constructor() {
        super("Load Game");
    }

    create() {
        this.manager = new AppManager(this,'LOAD');
    }

    update() {
        this.manager.update();
    }
}