import AppManager from "../app/app-manager.js";
/**
 * Tutorial
 */
export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super("Tutorial");
    }

    create() {
        this.app = new AppManager(this,'TUTORIAL');
    }

    update() {
        this.app.update();
    }
}