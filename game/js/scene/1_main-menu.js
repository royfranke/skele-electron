import AppManager from "../app/app-manager.js";
/**
 * Main Menu
 */
export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("Main Menu");
    }

    create() {
        this.manager = new AppManager(this,'MAIN');
        const view = this.manager.getView();
        /// Splash HTML styled in index.html
        var start_top = view.top + (view.height/1.5);
        var start_left = view.left;
        var color = ['#32675a','#3d56d2','#7758ab','#974d9e','#d93232','#f47832','#ed931e','#f2b22b','#f8d239'];
        for (var i=0;i<color.length;i++) {
            this.add.dom(start_left + (4*i), start_top - (4*i), 'div','animation-delay:'+(i*.5)+'s;width: '+view.width+'px;color:'+color[i],'Skele Summer').setOrigin(0).setClassName('title-card');
        }

        this.add.dom(view.left, view.bottom - 32, 'div','','v.1.0.0 Skele').setOrigin(0).setClassName('footer');
    }

    update() {
        this.manager.update();
    }

}