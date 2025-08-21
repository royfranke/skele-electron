import AppManager from "../app/app-manager.js";
/**
 * Settings
 */
export default class SystemSettingsScene extends Phaser.Scene {
    constructor() {
        super("System Settings");
    }

    create() {
        
        this.app = new AppManager(this,'SETTINGS');
    }

    update() {
        this.app.update();
    }

    saveSettingsData(data) {
        // Replace `data` and `slot` with the actual data and slot you want to save
        console.log("I'm going to call 'save-settings'");
        window.api.invoke('save-settings', data)
            .then(function(res) {
                console.log(res); // will print "This worked!" to the browser console
            })
            .catch(function(err) {
                console.error(err); // will print "This didn't work!" to the browser console.
            });
    }

    

}