import AppManager from "../app/app-manager.js";
import GameManager from "../game/game-manager.js";
import ExteriorManager from "../exterior/exterior-manager.js";
import PlayerManager from "../player/player-manager.js";
import NpcManager from "../npc/npc-manager.js";

/**
 * Game
 */
export default class GameScene extends Phaser.Scene {
    constructor() {
        super("Game Scene");
        this.verbose = true;
    }

    init (data) {
        this.locale = 'exterior';
        this.slot = data.slot;
        this.room_id = data.slot.POSITION.ROOM;
        /*
        if (this.room_id != '-1') {
            this.scene.stop('Game Scene');
            this.scene.start('Interior Scene',{slot: this.slot});
        }*/
    }


    async create() {
        if (this.room_id == '10') {
            if (this.verbose) console.log("New Game");
            return this.newGame();
        }
        if (this.room_id != '-1') {
            this.scene.stop('Game Scene');
            this.scene.start('Interior Scene',{slot: this.slot});
            return;
        }

        this.place = 'exterior';
        this.irisInDelayMs = 300;
        this.deferSceneStart = true;
        this.app = new AppManager(this,'GAME');
        this.manager = new GameManager(this);
        this.manager.initializeGame();
        this.exterior = new ExteriorManager(this);
        this.exterior.initialize();
        await this.exterior.detectChunkFiles();

        // Instantiate Player/NPC managers synchronously so update() won't
        // crash, but delay their `create()` (which sets colliders) until
        // after exterior layers are created.
        this.player = new PlayerManager(this);
        this.npcs = new NpcManager(this);
        
        this.exterior.create();
        if (this.exterior && typeof this.exterior.bootstrapPortalIndexFromDisk === 'function') {
            await this.exterior.bootstrapPortalIndexFromDisk();
        }
        //// Load save position/facing before runtime collider setup so the player
        //// does not briefly appear at constructor defaults.
        this.app.initializeSave();
        this.player.create();

        await this.waitForExteriorPlayerReady();
        this.npcs.create();
        this.deferSceneStart = false;
        this.app.startDeferredSceneStart();
    }

    async waitForExteriorPlayerReady(timeoutMs = 4500) {
        const start = Date.now();

        return new Promise((resolve) => {
            const checkReady = () => {
                const exteriorReady = (this.exterior?.isWorldReady && typeof this.exterior.isWorldReady === 'function')
                    ? this.exterior.isWorldReady()
                    : true;
                const playerSprite = this.player?.playerSprite?.sprite;
                const playerReady = !!(playerSprite && playerSprite.body);

                if (exteriorReady && playerReady) {
                    resolve(true);
                    return;
                }

                if ((Date.now() - start) >= timeoutMs) {
                    if (this.verbose) {
                        console.warn('[GameScene] waitForExteriorPlayerReady timed out, starting scene effects anyway');
                    }
                    resolve(false);
                    return;
                }

                this.time.delayedCall(16, checkReady);
            };

            checkReady();
        });
    }

    update() {
        if (this.app?.update) this.app.update();
        if (this.manager?.update) this.manager.update();
        const exteriorReady = (this.exterior?.isWorldReady && typeof this.exterior.isWorldReady === 'function')
            ? this.exterior.isWorldReady()
            : true;

        if (exteriorReady && this.player?.update) this.player.update();
        if (exteriorReady && this.npcs?.update) this.npcs.update();
        if (this.exterior?.update) this.exterior.update();
    }

    async portalTo(portal) {
        if (this.verbose) console.log(portal);
        /// Before portal, save the game
        this.slot = this.app.softSaveGameData();
        if (this.verbose) console.log(this.slot);
        this.slot.POSITION.X = portal.x;
        this.slot.POSITION.Y = portal.y;
        this.slot.POSITION.FACING = portal.facing;
        this.slot.POSITION.ROOM = portal.room_id;
        this.slot.POSITION.RETURN = portal.return;
        this.slot.POSITION.PORTAL_ID = portal.portalId ?? this.slot.POSITION.PORTAL_ID ?? null;

        if (this.exterior != undefined && typeof this.exterior.flushActiveChunksOnTransition === 'function') {
            await this.exterior.flushActiveChunksOnTransition('portal');
        }

        if (this.exterior != undefined && this.exterior.saveDirtyChunks != undefined) {
            await this.exterior.saveDirtyChunks();
        }

        if (this.exterior != undefined && typeof this.exterior.savePortalIndexFile === 'function') {
            await this.exterior.savePortalIndexFile();
        }

        console.log(this.slot.POSITION + 'portal to ding ding');
        this.scene.start('Interior Scene', {slot: this.slot});
    }

    newGame() {
        if (this.verbose) {
            console.log("Start tutorial for slot ");
            console.log(this.slot);
        }
        this.scene.start('Tutorial', {slot: this.slot});
    }

    saveGameData(data,slot) {
        // Replace `data` and `slot` with the actual data and slot you want to save
        if (this.verbose) console.log("I'm going to call save-data for slot "+slot);
        if (this.verbose) console.log(data);
        let save_data = {data:data,slot:slot};
        const manager = this.manager;
        window.api.invoke('save-data', save_data)
            .then(function(res) {
                manager.hud.pocket.setPocketsFromSave();
                return true;
            })
            .catch(function(err) {
                console.error(err);
                return false;
            });
      }
    
}