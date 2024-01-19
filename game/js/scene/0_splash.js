import AppManager from "../app/app-manager.js";
/**
 * Splash Scene
 */
export default class SplashScene extends Phaser.Scene {
    constructor() {
        super("Splash");
    }

    create() {
        this.manager = new AppManager(this,'SPLASH');
        const view = this.manager.getView();
        /// Splash HTML styled in index.html
        this.add.dom(view.left + view.width/1.8,view.top + (view.height/2), 'div','','up and at em').setClassName('splash');
    }
}
