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
        this.locale = 'interior';
        this.slot = data.slot;
        this.room_id = 10;
    }

    create() {
        this.place = 'interior';
        this.app = new AppManager(this,'GAME');
        this.manager = new GameManager(this);
        this.manager.initializeGame();

        this.interior = new InteriorManager(this);
        this.player = new PlayerManager(this);
        this.interior.create();
        this.player.create();
         //// Load the save!
         this.app.initializeTutorialSave();

       // Set timeout before tutorial begins
       this.time.addEvent({
        delay: 1000,
        callback: () => {
            
            this.manager.hud.startTutorial();
        }
    });
    
    }

    update() {
        this.app.update();
        this.manager.update();
        this.player.update();
        this.interior.update();
    }
}