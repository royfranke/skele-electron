import SaveFactory from "./save-factory.js";

/* Save Manager Class */

export default class SaveManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new SaveFactory(scene);
    }

    initializeSave () {
        var data = this.scene.slot;
        if (data.POSITION.ADDRESS != undefined) {
            var front = this.scene.exterior.getFrontDoorTilesFromAddress(data.POSITION.ADDRESS.dir, data.POSITION.ADDRESS.number, data.POSITION.ADDRESS.street);
            this.scene.player.setPositionTile(front.x,front.y + 1);
        }
        else {
            this.scene.player.setPositionTile(data.POSITION.X,data.POSITION.Y);
        }
        
        this.scene.player.setFacing(data.POSITION.FACING);
        this.scene.manager.time.setTimeFromSave(data.TIME);
        this.scene.player.coinpurse.setContents(data.COINPURSE);
        if (this.scene.player.coinpurse.contents.STATUS.HAS == 'TRUE') {
            this.scene.manager.hud.hudCoinpurse.plungeCoinPurse();
        }
        this.scene.manager.hud.hudWatch.plungeWatch();
        this.scene.manager.hud.pocket.setPocketsFromSave();
    }

    initializeRoomSave () {
        var data = this.scene.slot;
        this.scene.player.setPositionTile(data.POSITION.X,data.POSITION.Y);
        this.scene.player.setFacing(data.POSITION.FACING);
        this.scene.manager.time.setTimeFromSave(data.TIME);
        this.scene.player.coinpurse.setContents(data.COINPURSE);

        if (this.scene.player.coinpurse.contents.STATUS.HAS == 'TRUE') {
            this.scene.manager.hud.hudCoinpurse.plungeCoinPurse();
        }
        this.scene.manager.hud.hudWatch.plungeWatch();
        this.scene.manager.hud.pocket.setPocketsFromSave();
        //this.scene.interior.setPortalFromSave(data.POSITION.RETURN);
    }

    initializeTutorialSave () {
        var data = this.scene.slot;
        this.scene.manager.time.setTimeFromSave(data.TIME);
        this.scene.player.coinpurse.setContents(data.COINPURSE);

        this.scene.manager.hud.pocket.setPocketsFromSave();
        
        this.scene.player.setPositionTile(data.POSITION.X,data.POSITION.Y);
        this.scene.player.setFacing(data.POSITION.FACING);
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
        data.POSITION =     this.scene.player.getPositionTile();
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