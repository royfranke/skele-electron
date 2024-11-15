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

    init (data) {
        this.slot = data.slot;
    }

    preload () {
        this.preload = new PreloadManager(this); 
    }

    create() {
        if (this.slot.SAVE.HEADLINE == 'NEW') {
            console.log("New Game");
        }
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
        this.player = new PlayerManager(this);
        this.npcs = new NpcManager(this);
        
        this.exterior.create();
        this.player.create();
        this.npcs.create();
        //// Load the save!
        this.app.initializeSave();
    }

    update() {
        this.app.update();
        this.manager.update();
        this.player.update();
        this.npcs.update();
        this.exterior.update();
    }

    portalTo(portal) {
        console.log(portal);
        /// Before portal, save the game
        this.slot = this.app.softSaveGameData();
        console.log(this.slot);
        this.scene.start('Interior Scene', {portal: portal, slot: this.slot});
    }

    saveGameData(data,slot) {
        // Replace `data` and `slot` with the actual data and slot you want to save
        console.log("I'm going to call save-data for slot "+slot);
        console.log(data);
        let save_data = {data:data,slot:slot};
        const manager = this.manager;
        window.api.invoke('save-data', save_data)
            .then(function(res) {
                manager.hud.pocket.setPocketsFromSave();
                return true;
            })
            .catch(function(err) {
                console.error(err);
                return false;
            });
      }
    
}