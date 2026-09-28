import AppManager from "../app/app-manager.js";
import HudCommon from "../hud/hud-common.js";

/**
 * Load Game
 */
export default class LoadGameScene extends Phaser.Scene {
    constructor() {
        super("Load Game");
    }

    create() {
        this.app = new AppManager(this,'LOAD');
        this.camera = this.app.camera;
        this.hud = new HudCommon(this, this.camera);
        this.assembleBackground();
    }

    assembleBackground() {

        let background = this.hud.makeBlock(this.camera.view.left, this.camera.view.top, this.camera.view.width, this.camera.view.height, 'BAG_UNFOCUSED');
        background.setDepth(1);

        let background_frame = this.hud.makeBlock(this.camera.view.left, this.camera.view.top, this.camera.view.width, this.camera.view.height, 'BLOCK_SHALLOW_RED_EDGE_FRAME');
    }

    update() {
        this.app.update();
    }
}