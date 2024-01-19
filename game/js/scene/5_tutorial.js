import AppManager from "../app/app-manager.js";
/**
 * Tutorial
 */
export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super("Tutorial");
    }

    create() {
        this.manager = new AppManager(this,'TUTORIAL');
    }

    update() {
        this.manager.update();
    }
}