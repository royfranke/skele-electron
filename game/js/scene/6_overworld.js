import AppManager from "../app/app-manager.js";
import GameManager from "../game/game-manager.js";
import ExteriorManager from "../exterior/exterior-manager.js";
import PreloadManager from "../preload/preload-manager.js";
import PlayerManager from "../player/player-manager.js";
/**
 * Game Overworld
 */
export default class OverworldScene extends Phaser.Scene {
    constructor() {
        super("Overworld Scene");
        
    }

    preload () {
        this.preload = new PreloadManager(this);
        
    }

    create() {
        this.preload.preloadAnim();
        this.app = new AppManager(this,'GAME');
        this.manager = new GameManager(this);
        this.exterior = new ExteriorManager(this);
        this.player = new PlayerManager(this, 32, 32);
    }

    update() {
        this.app.update();
        this.manager.update();
        this.player.update();
        this.exterior.update();
    }
}