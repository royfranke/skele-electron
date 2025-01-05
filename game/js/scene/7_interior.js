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
        this.verbose = true;
    }

    init (data) {
        this.locale = 'interior';
        this.slot = data.slot;
        this.room_id = data.slot.POSITION.ROOM;
    }

    preload () {
        //this.preload = new PreloadManager(this);
        
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
        this.interior.create();
        this.player.create();
         //// Load the save!
         this.app.initializeRoomSave();
    }

    update() {
        this.app.update();
        this.manager.update();
        this.player.update();
        this.interior.update();
    }

    portalTo(portal) {
        this.slot = this.app.softSaveGameData();
        if (this.verbose) console.log(this.slot);
        this.slot.POSITION.X = portal.x;
        this.slot.POSITION.Y = portal.y;
        this.slot.POSITION.FACING = portal.facing;
        this.slot.POSITION.ROOM = portal.room_id;
        this.slot.POSITION.RETURN = portal.return;
        if (portal.room_id == '-1') {
            this.scene.stop('Interior Scene');
            this.scene.start('Game Scene',{slot: this.slot});
        }
        else {
            this.scene.stop('Interior Scene');
            this.scene.start('Interior Scene', {slot: this.slot});
        }
        
    }
}