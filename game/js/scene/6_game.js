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
        this.verbose = true;
    }

    init (data) {
        this.locale = 'exterior';
        this.slot = data.slot;
        this.room_id = -1;
    }



    create() {
        if (this.slot.SAVE.HEADLINE == 'NEW') {
            if (this.verbose) console.log("New Game");
            return this.newGame();
        }
        
        this.place = 'exterior';
        this.app = new AppManager(this,'GAME');
        this.manager = new GameManager(this);
        this.manager.initializeGame();
        this.events.on(Phaser.Scenes.Events.WAKE, function ()
        {
            this.manager.setState('NOT LOADED');

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
        if (this.verbose) console.log(portal);
        /// Before portal, save the game
        this.slot = this.app.softSaveGameData();
        if (this.verbose) console.log(this.slot);
        this.slot.POSITION.X = portal.x;
        this.slot.POSITION.Y = portal.y;
        this.slot.POSITION.FACING = portal.facing;
        this.slot.POSITION.ROOM = portal.room_id;
        this.slot.POSITION.RETURN = portal.return;
        console.log(this.slot.POSITION + 'portal to ding ding');
        this.scene.start('Interior Scene', {slot: this.slot});
    }

    newGame() {
        if (this.verbose) {
            console.log("Start tutorial for slot ");
            console.log(this.slot);
        }
        this.scene.start('Tutorial', {slot: this.slot});
    }

    saveGameData(data,slot) {
        // Replace `data` and `slot` with the actual data and slot you want to save
        if (this.verbose) console.log("I'm going to call save-data for slot "+slot);
        if (this.verbose) console.log(data);
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