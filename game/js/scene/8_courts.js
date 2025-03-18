import AppManager from "../app/app-manager.js";
import GameManager from "../game/game-manager.js";  

/**
 * Game
 */
export default class CourtsScene extends Phaser.Scene {
    constructor() {
        super("Courts Scene");
        this.verbose = true;
    }

    create() {
        this.app = new AppManager(this,'COURTS');
        //this.manager = new GameManager(this);

        this.app.appView.courtManager.initialize();
    }

    update() {
        this.app.update();

    }
    
}