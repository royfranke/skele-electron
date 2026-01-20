import AppManager from "../app/app-manager.js";
import GameManager from "../game/game-manager.js";
import HudCommon from '../hud/hud-common.js';
import TimeManager from "../time/time-manager.js";

/**
 * Save
 */
export default class SaveScene extends Phaser.Scene {
    constructor() {
        super("Save Scene");
        this.verbose = true;
        this.date = null;
    }

    init (data) {
        this.locale = 'Save';
        this.slot = data.slot;
    }

    create() {
        this.place = 'Save';
        this.app = new AppManager(this,'SAVE');
        this.camera = this.app.camera;
        this.hud = new HudCommon(this);
        this.time = new TimeManager();
        

        this.saved();
        this.events.on(Phaser.Scenes.Events.WAKE, function ()
        {
            this.manager.wake();
        }, this);
        console.log("Save scene!");
        this.assembleBackground();
    }

    update() {
        this.app.update();
    }

    startDay() {
        this.scene.stop('Save Scene');
        this.scene.start('Interior Scene', {slot: this.slot});
    }

    saved () {
        var date = this.time.getDateFromSave(this.slot.TIME);

        this.date = date.weekday+', '+date.month+' '+date.day;

        var tip = "Tripping over the curb? Slow down to keep upright.";
        this.app.appView.drawTip(tip);
        
        
    }

    saveGameData(data,slot) {
        // Replace `data` and `slot` with the actual data and slot you want to save
        if (this.verbose) console.log("I'm going to call save-data for slot "+slot);
        if (this.verbose) console.log(data);
        let save_data = {data:data,slot:slot};
        //const manager = this.manager;
        window.api.invoke('save-data', save_data)
            .then(function(res) {
                return true;
            })
            .catch(function(err) {
                console.error(err);
                return false;
            });
      }

      assembleBackground() {
        let background = this.hud.makeBlock(this.camera.view.left, this.camera.view.top, this.camera.view.width, this.camera.view.height, 'BLOCK_MID_DARK_FAT_BORDER');
        background.setDepth(1);

        let background_frame = this.hud.makeBlock(this.camera.view.left, this.camera.view.top, this.camera.view.width, this.camera.view.height, 'BLOCK_SHALLOW_RED_EDGE_FRAME');

        let menu_background = this.hud.makeBlock(this.cameras.main.centerX - 100, this.camera.view.top +this.camera.view.margin.top, 300, this.camera.view.height - (this.camera.view.margin.top + this.camera.view.margin.bottom), 'BLOCK_MID_SKY_FAT_BORDER');
        menu_background.setDepth(2);

        let menu_background_frame = this.hud.makeBlock(this.cameras.main.centerX - 100, this.camera.view.top +this.camera.view.margin.top, 300, this.camera.view.height - (this.camera.view.margin.top + this.camera.view.margin.bottom), 'BLOCK_SHALLOW_YELLOW_EDGE_FRAME');
        menu_background_frame.setDepth(3);

        
        var button = this.hud.makeButton(menu_background.x + menu_background.width - 12, menu_background.y + menu_background.height - 36, 'OK', 'X');
        
        button.click_area.on('pointerdown', () => {
            this.startDay();
        });
        var headline = this.slot.SAVE.HEADLINE.toLowerCase().replace(/ /g,"_");

        var slot_headline = this.add.bitmapText(menu_background.x + menu_background.width/2, menu_background.y + 16, 'SkeleMarquee', headline, 16).setOrigin(.5,0).setScrollFactor(0).setDepth(1000);

        
        var slot_summary = this.add.bitmapText(menu_background.x + 16, slot_headline.y + 16 + slot_headline.displayHeight, 'SkeleNotebook', summary, 8).setOrigin(0,0).setScrollFactor(0).setDepth(1000).setTintFill(0x465e62).setLineSpacing(11);

        var ready = "Ready to begin "+this.date+"?";
        var slot_ready = this.add.bitmapText(menu_background.x + 16, menu_background.y + menu_background.height - 24, 'SkeleTalk', ready, 8).setOrigin(0,0).setScrollFactor(0).setDepth(1000).setTintFill(0x465e62).setLineSpacing(11);

        this.notebook = {};

        /// Get the actual notebook page
        var pages = this.slot.NOTEBOOK.PAGES;
        /// Get last page
        var page = pages[pages.length - 1];

        

        var summary = page.title;
        this.notebook.panel = this.hud.factory.makeNotebook(menu_background.x + 32, slot_headline.y + 8 + slot_headline.displayHeight);
        this.notebook.panel.setFrame('NOTEBOOK_OPEN');
        this.notebook.page = this.hud.makeBitmapText(this.notebook.panel.x + 42, this.notebook.panel.y + 16, 80, 8, 'SkeleNotebook');
        this.notebook.page.setText(summary+'\n'+page.content);
        this.notebook.page.setLineSpacing(8);
    }
}