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
        const view = this.manager.getView();
        /// Splash HTML styled in index.html
        this.add.dom(view.left+ view.margin.left, view.top 
            + view.margin.top, 'div','','Slot 1').setOrigin(0).setClassName('saved-game');
    }

    update() {
        this.manager.update();
    }
}