import AppManager from "../app/app-manager.js";
import HudCommon from "../hud/hud-common.js";

/**
 * Settings
 */
export default class SystemSettingsScene extends Phaser.Scene {
    constructor() {
        super("System Settings");
    }

    init (data) {
        this.data = data;
    }

    create() {
        this.data.settings = this.cache.json.get('SETTINGSCONFIG');
        this.app = new AppManager(this,'SETTINGS');
        this.camera = this.app.camera;
        this.hud = new HudCommon(this);
        this.cursor_hover = { cursor: 'url(assets/images/cursor-hover.png), pointer' };
        this.assembleBackground();
        this.input.setDefaultCursor('url(assets/images/cursor.png), pointer');
        
    }

    update() {
        this.app.update();
    }

        assembleBackground() {
        let background = this.hud.makeBlock(this.camera.view.left, this.camera.view.top, this.camera.view.width, this.camera.view.height, 'BAG_UNFOCUSED');
        background.setDepth(1);

        let background_frame = this.hud.makeBlock(this.camera.view.left, this.camera.view.top, this.camera.view.width, this.camera.view.height, 'BLOCK_SHALLOW_RED_EDGE_FRAME');

    }

}