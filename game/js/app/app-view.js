
import SettingsManager from "../settings/settings-manager.js";
/*
 * Manages application view
 * SPLASH | MAIN | SETTINGS | NEW | LOAD | GAME | TUTORIAL
 */

export default class AppView {

    constructor(scene, view, state_name) {
        this.scene = scene;
        this.view = view;
        this.create(state_name);
    }

    create(state_name) {
        if (state_name === 'SPLASH') {
            this.createSplash();
        }
        if (state_name === 'MAIN') {
            this.createMain();
        }
        if (state_name === 'SETTINGS') {
            this.createSettings();
            //this.settings = new SettingsManager(this.scene);
        }
        if (state_name === 'LOAD') {
            this.createLoad();
        }
        this.state_name = state_name;
    }

    createSplash() {
        /// Splash HTML styled in index.html
        this.scene.add.dom(this.view.left + this.view.width / 1.8, this.view.top + (this.view.height / 2), 'div', '', 'up and at em').setClassName('splash');
    }

    createMain() {

        var start_top = this.view.top + (this.view.height / 1.5);
        var start_left = this.view.left;
        var color = ['#32675a', '#3d56d2', '#7758ab', '#974d9e', '#d93232', '#f47832', '#ed931e', '#f2b22b', '#f8d239'];
        for (var i = 0; i < color.length; i++) {
            this.scene.add.dom(start_left + (4 * i), start_top - (4 * i), 'div', 'animation-delay:' + (i * .5) + 's;width: ' + this.view.width + 'px;color:' + color[i], 'Summer Break').setOrigin(0).setClassName('title-card');
        }


        let version = this.scene.add.bitmapText(this.view.left + this.view.margin.left, this.view.bottom - this.view.margin.bottom, 'SkeleNotebook', 'v.'+this.scene.version+' Skele\'s Summer Break', 8).setOrigin(0).setScrollFactor(0).setDepth(1001);

        this.scene.add.nineslice(version.x - 8,version.y - 5, 'UI', 'BLOCK_MID_BROWN_BORDER', version.displayWidth + 16, version.displayHeight + 8, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(1000);
    }

    createSettings() {
        this.settingsManager = new SettingsManager(this.scene);
        var start_top = this.view.top + (this.view.height / 1.5);
        var start_left = this.view.left;
        var color = ['#32675a', '#3d56d2', '#7758ab', '#974d9e', '#d93232', '#f47832', '#ed931e', '#f2b22b', '#f8d239'];
        for (var i = 0; i < color.length; i++) {
            this.scene.add.dom(start_left + (4 * i), start_top - (4 * i), 'div', 'animation-delay:' + (i * .5) + 's;width: ' + this.view.width + 'px;color:' + color[i], 'Settings').setOrigin(0).setClassName('title-card');
        }
        var height = this.view.bottom - (this.view.top + this.view.margin.top + this.view.margin.bottom);
        
        var left  = this.view.left + (this.view.margin.left*2) + 128;
        var width = this.view.right - left - this.view.margin.right;
        this.scene.add.nineslice(left,this.view.top + this.view.margin.top, 'UI', 'BAG_UNFOCUSED', width, height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(1000);

       //this.settingsManager.saveSettings('input');
    }

    createLoad() {
        
        var total_height = this.view.bottom - (this.view.top + this.view.margin.top + this.view.margin.bottom);
        var height = total_height/3;
        var left  = this.view.left + (this.view.margin.left*2) + 128;
        var width = this.view.right - left - this.view.margin.right;

        this.slots = [];
        var SAVES = [];
        for (var i=0;i<3;i++) {
            if (this.scene.cache.json.get('SLOT_'+i)) {
                SAVES.push(this.scene.cache.json.get('SLOT_'+i));
            }
        }
        for (var i=0;i<3;i++) {
            var top = this.view.top + this.view.margin.top + ((height + 4) *i);
            var slot_slice = this.scene.add.nineslice(left, top, 'UI', 'BLOCK_MID_LILAC_BORDER', width, height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(998);
            var slot_highlight = this.scene.add.nineslice(left, top, 'UI', 'BLOCK_SHALLOW_YELLOW_FRAME', width, height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(999).setVisible(false);
            
            this.slots.push({slice: slot_slice, selector: slot_highlight});

            if (SAVES.length > i) {
                this.scene.add.bitmapText(left + this.view.margin.left, top + this.view.margin.top, 'SkeleTalk', 'Slot '+(i+1)+': Day '+SAVES[i].TIME.DAY, 8).setOrigin(0).setScrollFactor(0).setDepth(1000);

                this.scene.add.bitmapText(left + this.view.margin.left, top + this.view.margin.top*2, 'SkeleMarquee', SAVES[i].SAVE.HEADLINE.toLowerCase().replace(/ /g,"_"), 16).setOrigin(0).setScrollFactor(0).setDepth(1000);
            }
            else {
                this.scene.add.bitmapText(left + this.view.margin.left, top + this.view.margin.top, 'SkeleTalk', 'Slot '+(i+1)+': Day ???', 8).setOrigin(0).setScrollFactor(0).setDepth(1000);
                
            }
        }
    }


    selectLoad (selected) {
        for (var i=0;i<3;i++) {
            if (i != selected - 1) {
                this.slots[i].slice.setTexture('UI','BLOCK_MID_LILAC_BORDER');
                this.slots[i].selector.setVisible(false);
            }
            else {
                if (selected > 0) {
                    this.slots[selected - 1].slice.setTexture('UI','BLOCK_MID_CREAM_BORDER');
                    this.slots[selected - 1].selector.setVisible(true);
                }
            }
        }
    }

}