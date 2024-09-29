import AppManager from "../app/app-manager.js";
import GameManager from "../game/game-manager.js";
import InteriorManager from "../interior/interior-manager.js";

import PlayerManager from "../player/player-manager.js";
/**
 * Interior
 */
export default class InteriorScene extends Phaser.Scene {
    constructor() {
        super("Interior Scene");
        
    }

    init (data) {
        this.used_portal = data.portal;
        this.room_id = data.portal.room_id;
        this.slot = data.slot;
    }

    preload () {
        //this.preload = new PreloadManager(this);
        
    }

    create() {
        this.place = 'interior';
        //this.preload.preloadAnim();
        this.app = new AppManager(this,'GAME');
        this.manager = new GameManager(this);
        this.interior = new InteriorManager(this);
        this.player = new PlayerManager(this);
        this.interior.create();
        this.player.create();
        this.player.setPositionTile(this.used_portal.x,this.used_portal.y);
        this.player.setFacing(this.used_portal.facing);
         //// Load the save!
         this.app.initializeRoomSave();
    }

    update() {
        this.app.update();
        this.manager.update();
        this.player.update();
        this.interior.update();
    }

    portalTo(portal) {
        if (portal.room_id == -1) {
            this.scene.stop('Interior Scene');
            this.scene.switch('Exterior Scene');
        }
        else {
            this.scene.stop('Interior Scene');
            this.scene.start('Interior Scene', {portal: portal, slot: this.slot});
        }
        
    }
}