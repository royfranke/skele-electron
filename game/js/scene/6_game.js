import AppManager from "../app/app-manager.js";
import GameManager from "../game/game-manager.js";
import ExteriorManager from "../exterior/exterior-manager.js";
import PreloadManager from "../preload/preload-manager.js";
import PlayerManager from "../player/player-manager.js";
import NpcManager from "../npc/npc-manager.js";
/**
 * Game
 */
export default class GameScene extends Phaser.Scene {
    constructor() {
        super("Game Scene");
        
    }

    preload () {
        this.preload = new PreloadManager(this); 
    }

    create() {
        // Replace the exterior and interior classes with a ground class interpretter in its own ground/ground-manager.js
        this.preload.preloadAnim();
        this.place = 'exterior';
        this.app = new AppManager(this,'GAME');
        this.manager = new GameManager(this);
        this.events.on(Phaser.Scenes.Events.WAKE, function ()
        {
            this.manager.wake();
        }, this);
        this.exterior = new ExteriorManager(this);
        this.player = new PlayerManager(this, 80, 32);
        this.npcs = new NpcManager(this);
        
        this.exterior.create();
        this.player.create();
        this.npcs.create();

    }

    update() {
        this.app.update();
        this.manager.update();
        this.player.update();
        this.npcs.update();
        this.exterior.update();
    }

    portalTo() {
        this.scene.switch('Court Scene');
    }
    
}