import AppManager from "../app/app-manager.js";
import GameManager from "../game/game-manager.js";
import InteriorManager from "../interior/interior-manager.js";
import PlayerManager from "../player/player-manager.js";
import TutorialManager from "../tutorial/tutorial-manager.js";
import NpcManager from "../npc/npc-manager.js";

/**
 * Interior
 */
export default class InteriorScene extends Phaser.Scene {
    constructor() {
        super("Interior Scene");
        this.verbose = true;
    }

    init (data) {
        this.locale = 'interior';
        this.slot = data.slot;
        this.room_id = data.slot.POSITION.ROOM;
        
    }

    create() {
        this.place = 'interior';
        this.app = new AppManager(this,'GAME');
        this.manager = new GameManager(this);
        this.manager.initializeGame();
        this.events.on(Phaser.Scenes.Events.WAKE, function ()
        {
            this.manager.wake();
            
        }, this);
        this.interior = new InteriorManager(this);
        this.player = new PlayerManager(this);
        this.npcs = new NpcManager(this);

        this.interior.create();
        this.player.create();
         //// Load the save!
         this.app.initializeRoomSave();
         this.manager.hud.pocket.setPocketsFromSave();
         if (this.slot.TUTORIAL < 30) {
            this.tutorial = new TutorialManager(this);
            this.tutorial.stepTutorial(this.slot.TUTORIAL);
         }
    }

    update() {
        this.app.update();
        this.manager.update();
        this.player.update();
        this.npcs.update();
        this.interior.update();
    }

    portalTo(portal) {
        this.slot = this.app.softSaveGameData();
        if (this.verbose) console.log(this.slot);
        if (portal.address != undefined) {
            this.slot.POSITION.ADDRESS = portal.address;
        }
        else {
            this.slot.POSITION.X = portal.x;
            this.slot.POSITION.Y = portal.y;
        }
        this.slot.POSITION.FACING = portal.facing;
        this.slot.POSITION.ROOM = portal.room_id;
        this.slot.POSITION.RETURN = portal.return;
        if (this.tutorial != undefined) {
            this.slot.TUTORIAL = this.tutorial.tutorial_step;
        }
        if (portal.room_id == '-1') {
            this.scene.stop('Interior Scene');
            this.scene.start('Game Scene',{slot: this.slot});
        }
        else {
            this.scene.stop('Interior Scene');
            this.scene.start('Interior Scene', {slot: this.slot});
        }
        
    }

    save () {

        var date = this.manager.time.getDateForNotebook();
        date = date.weekday+', '+date.month+' '+date.day;
        
        //this.manager.hud.hudNotebook.manager.notebook.addPage(date, 'Testing!');

        this.slot = this.app.softSaveGameData();

        this.slot.SAVE.DATE = date;
        this.slot.SAVE.HEADLINE = 'BEJEWELLED';

        this.manager.time.setTimeFromSleep();
        this.app.saveManager.saveGameData();
        
    }

    saveGameData(data,slot) {
        // Replace `data` and `slot` with the actual data and slot you want to save
        if (this.verbose) console.log("I'm going to call save-data for slot "+slot);
        if (this.verbose) console.log(data);
        let save_data = {data:data,slot:slot};
        const manager = this.manager;
        var self = this;
        window.api.invoke('save-data', save_data)
            .then(function(res) {
                
                self.scene.stop('Interior Scene');
                self.scene.start('Save Scene', {slot: self.slot});
                return true;
            })
            .catch(function(err) {
                console.error(err);
                return false;
            });
      }
}