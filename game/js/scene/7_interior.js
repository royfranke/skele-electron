import AppManager from "../app/app-manager.js";
import GameManager from "../game/game-manager.js";
import InteriorManager from "../interior/interior-manager.js";
import PlayerManager from "../player/player-manager.js";
import TutorialManager from "../tutorial/tutorial-manager.js";
import NpcManager from "../npc/npc-manager.js";
import WorldDataLoader from "../world/world-data-loader.js";

/**
 * Interior
 */
export default class InteriorScene extends Phaser.Scene {
    constructor() {
        super("Interior Scene");
        this.verbose = true;
    }

    init (data) {
        this.locale = 'interior';
        this.slot = data.slot;
        this.room_id = data.slot.POSITION.ROOM;
        
    }

    create() {
        this.place = 'interior';
        this.app = new AppManager(this,'GAME');
        this.manager = new GameManager(this);
        this.manager.initializeGame();
        this.events.on(Phaser.Scenes.Events.WAKE, function ()
        {
            this.manager.wake();
            
        }, this);
        this.interior = new InteriorManager(this);
        this.player = new PlayerManager(this);
        this.npcs = new NpcManager(this);

        this.interior.create();
        this.player.create();
         //// Load the save!
         this.app.initializeRoomSave();
         this.manager.hud.pocket.setPocketsFromSave();
         if (this.slot.TUTORIAL < 30) {
            this.tutorial = new TutorialManager(this);
            this.tutorial.stepTutorial(this.slot.TUTORIAL);
         }
    }

    update() {
        this.app.update();
        this.manager.update();
        this.player.update();
        this.npcs.update();
        this.interior.update();
    }

    async portalTo(portal) {
        this.slot = this.app.softSaveGameData();
        if (this.verbose) console.log(this.slot);
        const previousReturn = this.slot?.POSITION?.RETURN;
        const resolvedReturn = portal?.return ?? previousReturn ?? null;
        const toExterior = String(portal?.room_id) === '-1';
        const indexedExit = toExterior
            ? await this.resolveExteriorCoordsFromPortalIndex(portal)
            : null;

        if (toExterior && indexedExit?.portalId != null) {
            this.slot.POSITION.PORTAL_ID = indexedExit.portalId;
        }

        if (toExterior && indexedExit != null) {
            this.slot.POSITION.X = indexedExit.x;
            this.slot.POSITION.Y = indexedExit.y;
            if (portal.address != undefined) {
                this.slot.POSITION.ADDRESS = portal.address;
            }
        }
        else if (portal.address != undefined) {
            this.slot.POSITION.ADDRESS = portal.address;
            if (portal.x != undefined && portal.y != undefined) {
                this.slot.POSITION.X = portal.x;
                this.slot.POSITION.Y = portal.y;
            }
        }
        else {
            if (portal.x != undefined && portal.y != undefined) {
                this.slot.POSITION.X = portal.x;
                this.slot.POSITION.Y = portal.y;
            }
        }
        this.slot.POSITION.FACING = portal.facing ?? indexedExit?.facing ?? resolvedReturn?.FACING ?? this.slot.POSITION.FACING;
        this.slot.POSITION.ROOM = portal.room_id;
        this.slot.POSITION.RETURN = resolvedReturn;
        if (this.tutorial != undefined) {
            this.slot.TUTORIAL = this.tutorial.tutorial_step;
        }
        if (portal.room_id == '-1') {
            this.scene.stop('Interior Scene');
            this.scene.start('Game Scene',{slot: this.slot});
        }
        else {
            this.scene.stop('Interior Scene');
            this.scene.start('Interior Scene', {slot: this.slot});
        }
        
    }

    getActiveSaveSlot () {
        const slot = this.slot?.SAVE?.SLOT;
        const parsed = Number.isInteger(slot) ? slot : parseInt(slot, 10);
        return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
    }

    normalizeAddressKey (address) {
        if (!address) {
            return null;
        }

        const dir = String(address.dir ?? '').trim().toUpperCase();
        const number = String(address.number ?? '').trim();
        const street = String(address.street ?? '').trim().toUpperCase();
        if (dir === '' || number === '' || street === '') {
            return null;
        }

        return `${dir}|${number}|${street}`;
    }

    async resolveExteriorCoordsFromPortalIndex (portal) {
        try {
            const slot = this.getActiveSaveSlot();
            if (slot == null) {
                return null;
            }

            if (this.portalIndexLoader == undefined) {
                this.portalIndexLoader = new WorldDataLoader('/assets/chunks/', { slot });
            }

            const index = await this.portalIndexLoader.loadPortalIndex();
            const portals = Array.isArray(index?.portals) ? index.portals : [];
            if (portals.length === 0) {
                return null;
            }

            const portalId = portal?.portalId ?? null;
            if (portalId != null) {
                const byId = portals.find(entry => entry?.portalId === portalId);
                if (byId?.x != null && byId?.y != null) {
                    return {
                        x: byId?.return?.X ?? byId.x,
                        y: byId?.return?.Y ?? byId.y,
                        facing: byId?.return?.FACING ?? byId?.facing ?? null,
                        portalId: byId?.portalId ?? portalId,
                    };
                }
            }

            const addressKey = this.normalizeAddressKey(portal?.address ?? this.slot?.POSITION?.ADDRESS ?? null);
            if (addressKey != null) {
                const byAddress = portals.find(entry => this.normalizeAddressKey(entry?.address) === addressKey);
                if (byAddress?.x != null && byAddress?.y != null) {
                    return {
                        x: byAddress?.return?.X ?? byAddress.x,
                        y: byAddress?.return?.Y ?? byAddress.y,
                        facing: byAddress?.return?.FACING ?? byAddress?.facing ?? null,
                        portalId: byAddress?.portalId ?? null,
                    };
                }
            }

            const savedPortalId = this.slot?.POSITION?.PORTAL_ID ?? null;
            if (savedPortalId != null) {
                const bySavedId = portals.find(entry => entry?.portalId === savedPortalId);
                if (bySavedId?.x != null && bySavedId?.y != null) {
                    return {
                        x: bySavedId?.return?.X ?? bySavedId.x,
                        y: bySavedId?.return?.Y ?? bySavedId.y,
                        facing: bySavedId?.return?.FACING ?? bySavedId?.facing ?? null,
                        portalId: bySavedId?.portalId ?? savedPortalId,
                    };
                }
            }

            const roomId = portal?.room_id;
            if (roomId != undefined && roomId != null) {
                const byRoom = portals.find(entry => String(entry?.room_id) === String(roomId));
                if (byRoom?.x != null && byRoom?.y != null) {
                    return {
                        x: byRoom?.return?.X ?? byRoom.x,
                        y: byRoom?.return?.Y ?? byRoom.y,
                        facing: byRoom?.return?.FACING ?? byRoom?.facing ?? null,
                        portalId: byRoom?.portalId ?? null,
                    };
                }
            }

            // For interior->exterior exits, portal payload often has room_id = -1.
            // Use the current interior room id as the exterior index key.
            const currentInteriorRoomId = this.room_id;
            if (currentInteriorRoomId != undefined && currentInteriorRoomId != null) {
                const byCurrentRoom = portals.find(entry => String(entry?.room_id) === String(currentInteriorRoomId));
                if (byCurrentRoom?.x != null && byCurrentRoom?.y != null) {
                    return {
                        x: byCurrentRoom?.return?.X ?? byCurrentRoom.x,
                        y: byCurrentRoom?.return?.Y ?? byCurrentRoom.y,
                        facing: byCurrentRoom?.return?.FACING ?? byCurrentRoom?.facing ?? null,
                        portalId: byCurrentRoom?.portalId ?? null,
                    };
                }
            }

            return null;
        } catch (e) {
            if (this.verbose) {
                console.warn('resolveExteriorCoordsFromPortalIndex failed', e);
            }
            return null;
        }
    }

    save () {


        var date = this.manager.time.getDateForNotebook();
        date = date.weekshort+', '+date.month+' '+date.day;

        var heading = date;
        var content = "I found a garbage patch in the woods. I threw rocks at birds with J.D. I helped Auntie make dinner.";

        this.manager.hud.hudNotebook.manager.notebook.addPage(heading, content);

        this.slot = this.app.softSaveGameData();

        var tomorrow_date = this.manager.time.getTomorrowDateForSave();
        var tomorrow = tomorrow_date.weekday+', '+tomorrow_date.month+' '+tomorrow_date.day;  

        this.slot.SAVE.DATE = tomorrow;
        this.slot.SAVE.HEADLINE = this.manager.quest.getSaveHeadline().toLowerCase().replace(/ /g,"_");

        this.manager.time.setTimeFromSleep();
        this.app.saveManager.saveGameData();
        
    }

    saveGameData(data,slot) {
        // Replace `data` and `slot` with the actual data and slot you want to save
        if (this.verbose) console.log("I'm going to call save-data for slot "+slot);
        if (this.verbose) console.log(data);
        let save_data = {data:data,slot:slot};
        const manager = this.manager;
        var self = this;
        window.api.invoke('save-data', save_data)
            .then(function(res) {
                
                self.scene.stop('Interior Scene');
                self.scene.start('Save Scene', {slot: self.slot});
                return true;
            })
            .catch(function(err) {
                console.error(err);
                return false;
            });
      }
}