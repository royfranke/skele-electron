/* Data Manager Class */

export default class DataManager {

    constructor(scene) {
        this.scene = scene;
    }

    
    setData (key, value) {
        console.log("Setting data: "+key+" - "+value);
    }

    getData (key) {
        console.log("Getting data: "+key);
    }

    modifyData (group, key, value) {
        console.log("Modifying data: "+key+" + "+value);

        this.scene.slot[group][key] = parseInt(this.scene.slot[group][key] + parseInt(value));
        console.log(this.scene.slot[group]);

        let modifier = "+";
        if (value < 0) {
            modifier = "-";
        }
        value = Math.abs(value);
        this.scene.manager.hud.hudThinking.tellBrain( key+" "+modifier+" "+value);


        
    }
    

}
