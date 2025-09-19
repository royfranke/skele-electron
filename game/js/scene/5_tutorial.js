import AppManager from "../app/app-manager.js";
import GameManager from "../game/game-manager.js";
import InteriorManager from "../interior/interior-manager.js";
import PlayerManager from "../player/player-manager.js";
import TutorialManager from "../tutorial/tutorial-manager.js";

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

         this.tutorial = new TutorialManager(this);

       // Set timeout before tutorial begins
       this.time.addEvent({
        delay: 1000,
        callback: () => {
            
            this.tutorial.startTutorial();
        }
    });
    
    }

    update() {
        this.app.update();
        this.manager.update();
        this.player.update();
        this.interior.update();
    }


    beginGame() {
        this.manager.time.setTimeFromSleep();
        this.slot = this.app.softSaveGameData();
        if (this.verbose) console.log(this.slot);
        this.slot.POSITION.X = 9 + 1;
        this.slot.POSITION.Y = 6 + 5;
        this.slot.POSITION.FACING = 'S';
        this.slot.POSITION.ROOM = 3;
        this.slot.TUTORIAL = this.tutorial.tutorial_step;

        this.scene.stop('Tutorial Scene');
        this.scene.start('Interior Scene', {slot: this.slot});
        
    }
}