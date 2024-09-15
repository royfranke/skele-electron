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

    init (data) {
        console.log(data.room_id);
        this.room_id = data.room_id;
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
        this.player = new PlayerManager(this);
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
        this.scene.switch('Exterior Scene');
    }
}