import AppManager from "../app/app-manager.js";
import PreloadManager from "../preload/preload-manager.js";

/**
 * New Game
 */
export default class NewGameScene extends Phaser.Scene {
    constructor() {
        super("New Game");
    }

    preload () {
        this.preload = new PreloadManager(this); 
        
    }

    create() {
        this.app = new AppManager(this,'NEW');
        this.ready = true;
    }

    update() {
        if (this.ready) {
            this.app.saveManager.saveNewGameData();
            this.ready = false;
        }
        this.app.update();
    }

    saveNewGameData(data,slot) {
        // Replace `data` and `slot` with the actual data and slot you want to save
        console.log("I'm going to call save-data for slot "+slot);
        console.log(data);
        let save_data = {data:data,slot:slot};
        window.api.invoke('save-data', save_data)
            .then(function(res) {
                console.log(res); // will print "This worked!" to the browser console
            })
            .catch(function(err) {
                console.error(err); // will print "This didn't work!" to the browser console.
            });
      }

      

}