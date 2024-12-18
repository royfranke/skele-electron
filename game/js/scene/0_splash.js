import AppManager from "../app/app-manager.js";
/**
 * Splash Scene
 */
export default class SplashScene extends Phaser.Scene {
    constructor() {
        super("Splash");
    }

    create() {
        this.app = new AppManager(this,'SPLASH');
    }
}
