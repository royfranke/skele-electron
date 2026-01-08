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
            this.scene.player.setPositionTile(front.x,front.y);
        }
        else {
            this.scene.player.setPositionTile(data.POSITION.X,data.POSITION.Y);
        }
        
        this.scene.player.setFacing(data.POSITION.FACING);
        this.scene.manager.time.setTimeFromSave(data.TIME);
        this.scene.player.coinpurse.setContents(data.COINPURSE);
        //this.scene.manager.hud.hudWatch.plungeWatch();
        this.scene.manager.hud.pocket.setPocketsFromSave();
    }

    initializeRoomSave () {
        var data = this.scene.slot;
        this.scene.player.setPositionTile(data.POSITION.X,data.POSITION.Y);

        var auntie = this.scene.npcs.newNpcToWorld(data.POSITION.X,data.POSITION.Y - 3,'AUNTIE');
        auntie.goTo(data.POSITION.X, data.POSITION.Y - 1);

        this.scene.player.setFacing(data.POSITION.FACING);
        this.scene.manager.time.setTimeFromSave(data.TIME);
        this.scene.player.coinpurse.setContents(data.COINPURSE);
        //this.scene.manager.hud.hudWatch.plungeWatch();
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

    softSaveBlock(block_x, block_y) {
        let block = this.scene.exterior.getBlock(block_x, block_y);
        let saved_block = block.saveBlock();
        if (this.scene.slot.BLOCKS === undefined) { this.scene.slot.BLOCKS = {}; }
        if (this.scene.slot.BLOCKS[block_x] === undefined) { this.scene.slot.BLOCKS[block_x] = {}; }
        this.scene.slot.BLOCKS[block_x][block_y] = saved_block;
    }

    softSaveGameData() {
        /// For going through portals
        /// Via scene, get various data we intend to write to the save
        console.log("Soft saving game data");
        let data = this.scene.slot;
        data.HEALTH = this.scene.manager.hud.hudHealth.setSaveFromHealth();
        data.TIME = this.scene.manager.time.setSaveFromTime();
        data.COINPURSE = this.scene.player.coinpurse.setSaveFromCoinpurse();
        data.NOTEBOOK = this.scene.manager.hud.hudNotebook.manager ? this.scene.manager.hud.hudNotebook.manager.setSaveFromNotebook() : this.scene.slot.NOTEBOOK;
        data.KEYS = this.scene.manager.hud.hudKeychain.manager ? this.scene.manager.hud.hudKeychain.manager.setSaveFromKeychain() : this.scene.slot.KEYS;
        data.POCKETS.SLOTS = this.scene.manager.hud.pocket.setSaveFromPockets();
        data.POSITION = this.scene.player.getPositionTile();
        if (data.BLOCKS === undefined) { data.BLOCKS = {}; }
        if (data.ROOMS === undefined) { data.ROOMS = {}; }
        if (this.scene.room_id > 0 && this.scene.room_id != 10) {
            data.ROOMS[this.scene.room_id] = this.setSaveFromInterior();
        }
        if (this.scene.exterior) {
            let block = this.scene.exterior.xyToBlock(this.scene.player.standingTile.x,this.scene.player.standingTile.y);
            this.softSaveBlock(block.x, block.y);
        }
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

    setSaveFromInterior () {
        /// Get Items from registry
        let ITEMS = this.scene.manager.itemManager.registry.getAllItems();
        let data = {
            OBJECTS: [],
            ITEMS: ITEMS
        }
        return data;
    }

}