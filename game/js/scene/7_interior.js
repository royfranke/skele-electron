import AppManager from "../app/app-manager.js";
import GameManager from "../game/game-manager.js";
import InteriorManager from "../interior/interior-manager.js";

import PlayerManager from "../player/player-manager.js";
/**
 * Interior
 */
export default class InteriorScene extends Phaser.Scene {
    constructor() {
        super("Interior Scene");
        
    }

    preload () {
        //this.preload = new PreloadManager(this);
        
    }

    create() {
        this.place = 'interior';
        //this.preload.preloadAnim();
        this.app = new AppManager(this,'GAME');
        this.manager = new GameManager(this);
        this.interior = new InteriorManager(this);
        var player_entry = this.interior.getEntry();
        this.player = new PlayerManager(this, player_entry.x, player_entry.y);
        this.interior.create();
        this.player.create();
    }

    update() {
        this.app.update();
        this.manager.update();
        this.player.update();
        this.interior.update();
    }

    portalTo() {
        this.scene.start('Exterior Scene');
    }
}