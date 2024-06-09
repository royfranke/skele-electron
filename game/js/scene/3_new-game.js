import AppManager from "../app/app-manager.js";
import SaveManager from "../save/save-manager.js";


/**
 * New Game
 */
export default class NewGameScene extends Phaser.Scene {
    constructor() {
        super("New Game");
    }

    create() {
        this.app = new AppManager(this,'NEW');     
    }

    update() {
        this.app.update();
    }

    saveGameData(data,slot) {
        // Replace `data` and `slot` with the actual data and slot you want to save
        console.log("I'm going to call save-data");
        window.api.invoke('save-data', data)
            .then(function(res) {
                console.log(res); // will print "This worked!" to the browser console
            })
            .catch(function(err) {
                console.error(err); // will print "This didn't work!" to the browser console.
            });
      }

      

}