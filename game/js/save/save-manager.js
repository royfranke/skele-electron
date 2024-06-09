import SaveFactory from "./save-factory.js";

/* Save Manager Class */

export default class SaveManager {

    constructor(scene,state_name) {
        this.scene = scene;
        this.factory = new SaveFactory(scene);
        this.create(state_name);
    }

    create (state_name) {
        if (state_name == 'NEW') {
            this.save = this.newSave();
        }
        else {
            //this.save
        }
    }

    save (data,slot=0) {
        window.api.invoke('save-data', data)
        .then(function(res) {
            console.log(res); // will print "This worked!" to the browser console
        })
        .catch(function(err) {
            console.error(err); // will print "This didn't work!" to the browser console.
        });
    }

    newSave (slot=0) {
        var data = this.factory.newSave();
        return {data: data,slot: slot};
    }

    loadSave (slot=0) {
        return this.factory.loadSave(slot);
    }

    discardSave (slot) {
        slot.destroy();
    }

}