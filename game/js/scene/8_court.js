import AppManager from "../app/app-manager.js";
import GameManager from "../game/game-manager.js";
import CourtManager from "../court/court-manager.js";
import PreloadManager from "../preload/preload-manager.js";
import PlayerManager from "../player/player-manager.js";
/**
 * Game Court
 */
export default class CourtScene extends Phaser.Scene {
    constructor() {
        super("Court Scene");
        
    }

    preload () {
        //this.preload = new PreloadManager(this);
        
    }

    create() {
        this.place = 'court';
        //this.preload.preloadAnim();
        this.app = new AppManager(this,'GAME');
        this.manager = new GameManager(this);
        this.court = new CourtManager(this);
        this.player = new PlayerManager(this);
        this.court.create();
        this.player.create();
    }

    update() {
        this.app.update();
        this.manager.update();
        this.player.update();
        this.court.update();
    }

    portalTo() {
        this.scene.switch('Game Scene');
    }
}