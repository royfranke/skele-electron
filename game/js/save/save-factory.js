/* Save Factory Class */

export default class SaveFactory {

    constructor(scene) {
        this.scene = scene;
    }

    saveInfo (slot=0) {
        
    }

    newSave () {
        //this.save = new NewSave();
        //return save.file;
        return {"Test": "Test", "Test2": "Test2"};
    }

    loadSave (slot=0) {
        //return new Save();
    }

    discardSave (slot) {
        slot.destroy();
    }

    
}