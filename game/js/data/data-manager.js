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

    modifyData (key, value) {
        console.log("Modifying data: "+key+" + "+value);
    }

}
