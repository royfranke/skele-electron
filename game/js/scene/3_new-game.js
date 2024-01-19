import AppManager from "../app/app-manager.js";
/**
 * New Game
 */
export default class NewGameScene extends Phaser.Scene {
    constructor() {
        super("New Game");
    }

    create() {
        this.manager = new AppManager(this,'NEW');
    }

    update() {
        this.manager.update();
    }

}