import SaveFactory from "./save-factory.js";

/* Save Manager Class */

export default class SaveManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new SaveFactory(scene);
    }

    initializeSave () {
        var data = this.scene.slot;
        this.scene.player.setPositionTile(data.POSITION.X,data.POSITION.Y);
        this.scene.manager.time.setTimeFromSave(data.TIME);
        this.scene.player.coinpurse.setContents(data.COINPURSE);
        //this.scene.manager.hud.pocket.setPocketsFromSave([data.POCKETS.SLOTS.SLOT0, data.POCKETS.SLOTS.SLOT1, data.POCKETS.SLOTS.SLOT2]);
    }

    initializeRoomSave () {
        var data = this.scene.slot;
        this.scene.manager.time.setTimeFromSave(data.TIME);
        this.scene.player.coinpurse.setContents(data.COINPURSE);
    }

    saveNewGameData() {
        let save = this.newSave();
        this.scene.saveNewGameData(save.data,save.slot);
    }

    saveGameData() {
        let save_data = this.softSaveGameData();
        this.scene.saveGameData(save_data,save_data.SAVE.SLOT);
    }

    softSaveGameData() {
        /// For going through portals
        /// Via scene, get various data we intend to write to the save
        console.log("Soft saving game data");
        let data = this.scene.slot;
        data.TIME = this.scene.manager.time.setSaveFromTime();
        data.COINPURSE = this.scene.player.coinpurse.setSaveFromCoinpurse();
        data.NOTEBOOKS = this.scene.manager.hud.hudNotebook.manager.setSaveFromNotebook();
        data.POCKETS.SLOTS = this.scene.manager.hud.pocket.setSaveFromPockets();
        return data;
    }


    newSave () {
        var data = this.factory.newSave();
        var slot = this.nextAvailableSlot();
        return {data: data, slot: slot};
    }

    loadSaves () {
        return this.factory.loadSaves();
    }

    loadSave (slot=0) {
        return this.factory.loadSave(slot);
    }

    discardSave (slot) {
        slot.destroy();
    }

    /// Write a js function to look in a directory for save files with the format slot_#.json
    /// and return the first number without a corresponding file
    /// This will be used to find the next available save slot
    nextAvailableSlot () {
        let slot = 0;
        let found = false;
        while (!found) {
            let save = this.factory.slotInUse(slot);
            if (save === null) {
                found = true;
                console.log("Next available slot is "+slot);
            }
            else {
                slot++;
            }
        }
        return slot;
    }

}