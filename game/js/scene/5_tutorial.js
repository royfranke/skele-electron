import AppManager from "../app/app-manager.js";
import GameManager from "../game/game-manager.js";
import InteriorManager from "../interior/interior-manager.js";
import PlayerManager from "../player/player-manager.js";

/**
 * Tutorial
 */
export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super("Tutorial");
    }

    init (data) {
        this.slot = data.slot;
        this.room_id = data.room_id;
    }

    create() {
        this.place = 'interior';
        this.app = new AppManager(this,'TUTORIAL');
        this.manager = new GameManager(this);
        this.interior = new InteriorManager(this);
        this.player = new PlayerManager(this);

        this.interior.create();
        this.player.create();
         //// Load the save!
         this.app.initializeRoomSave();

    }

    update() {
        this.app.update();
    }
}