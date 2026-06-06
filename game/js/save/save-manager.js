import SaveFactory from "./save-factory.js";

/* Save Manager Class */

export default class SaveManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new SaveFactory(scene);
    }

    initializeSave () {
        var data = this.scene.slot;
        const portalId = data?.POSITION?.PORTAL_ID ?? null;

        if (portalId != null && this.scene?.exterior?.getExteriorReturnFromPortal != null) {
            const portalCoords = this.scene.exterior.getExteriorReturnFromPortal({
                portalId: portalId,
                room_id: data.POSITION.ROOM,
                address: data.POSITION.ADDRESS ?? null,
            });
            if (portalCoords != null && portalCoords.x != undefined && portalCoords.y != undefined) {
                this.scene.player.setPositionTile(portalCoords.x, portalCoords.y);
                this.scene.player.setFacing(portalCoords.facing ?? data.POSITION.FACING ?? data.POSITION.RETURN?.FACING);
                this.scene.manager.time.setTimeFromSave(data.TIME);
                this.scene.player.coinpurse.setContents(data.COINPURSE);
                this.scene.manager.hud.pocket.setPocketsFromSave();
                return;
            }
        }

        if (data.POSITION.ADDRESS != undefined) {
            var front = this.scene.exterior.getFrontDoorTilesFromAddress(data.POSITION.ADDRESS.dir, data.POSITION.ADDRESS.number, data.POSITION.ADDRESS.street);
            if (front != null && front.x != undefined && front.y != undefined) {
                this.scene.player.setPositionTile(front.x,front.y);
            }
            else if (data.POSITION.X != undefined && data.POSITION.Y != undefined) {
                this.scene.player.setPositionTile(data.POSITION.X,data.POSITION.Y);
            }
            else if (data.POSITION.RETURN != undefined && data.POSITION.RETURN.X != undefined && data.POSITION.RETURN.Y != undefined) {
                this.scene.player.setPositionTile(data.POSITION.RETURN.X,data.POSITION.RETURN.Y);
            }
            else {
                this.scene.player.setPositionTile(0,0);
            }
        }
        else {
            if (data.POSITION.X != undefined && data.POSITION.Y != undefined) {
                this.scene.player.setPositionTile(data.POSITION.X,data.POSITION.Y);
            }
            else if (data.POSITION.RETURN != undefined && data.POSITION.RETURN.X != undefined && data.POSITION.RETURN.Y != undefined) {
                this.scene.player.setPositionTile(data.POSITION.RETURN.X,data.POSITION.RETURN.Y);
            }
            else {
                this.scene.player.setPositionTile(0,0);
            }
        }
        
        this.scene.player.setFacing(data.POSITION.FACING ?? data.POSITION.RETURN?.FACING);
        this.scene.manager.time.setTimeFromSave(data.TIME);
        this.scene.player.coinpurse.setContents(data.COINPURSE);
        //this.scene.manager.hud.hudWatch.plungeWatch();
        this.scene.manager.hud.pocket.setPocketsFromSave();
    }

    initializeRoomSave () {
        var data = this.scene.slot;
        this.scene.player.setPositionTile(data.POSITION.X,data.POSITION.Y);

        //var auntie = this.scene.npcs.newNpcToWorld(data.POSITION.X,data.POSITION.Y - 3,'AUNTIE');
        //auntie.goTo(data.POSITION.X, data.POSITION.Y - 1);

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
        if (this.scene?.exterior?.useLegacySlotBlockSave !== true) {
            return;
        }
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
        if (data.ROOMS === undefined) { data.ROOMS = {}; }
        if (this.scene.room_id > 0 && this.scene.room_id != 10) {
            data.ROOMS[this.scene.room_id] = this.setSaveFromInterior();
        }
        if (this.scene.exterior && this.scene.exterior.useLegacySlotBlockSave === true) {
            let block = this.scene.exterior.xyToBlock(this.scene.player.standingTile.x,this.scene.player.standingTile.y);
            this.softSaveBlock(block.x, block.y);
        }
        data.QUESTS = this.scene.manager.quest.saveQuestLog();
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