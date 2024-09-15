/* Save Factory Class */

export default class SaveFactory {

    constructor(scene) {
        this.scene = scene;
        this.slot_limit = 3;
    }

    saveInfo (slot=0) {
        
    }

    newSave () {
        return this.scene.cache.json.get('NEWSLOT');
    }

    loadSave (slot) {
        return this.scene.cache.json.get('SLOT_' + slot);
    }

    slotInUse (slot) {
        if (this.scene.cache.json.exists('SLOT_' + slot)) {
            console.log("Slot "+slot+" is in use");
            return this.loadSave(slot);
        }
        else {
            return null;
        }
    }

    loadSaves () {
        let saves = [];
        for (let i = 0; i < this.slot_limit; i++) {
            // Include null slots in the array
            let save = this.loadSave(i);
            saves.push(save);
        }
        return saves;
    }

    discardSave (slot) {
        slot.destroy();
    }
    
}