
import SettingsManager from "../settings/settings-manager.js";
import CourtsManager from "../courts/courts-manager.js";
/*
 * Manages application view
 * SPLASH | MAIN | SETTINGS | NEW | LOAD | GAME | TUTORIAL
 */

export default class AppView {

    constructor(scene, view, state_name) {
        this.scene = scene;
        this.view = view;
        this.tip = null;
        this.version = '1.2.1';
        this.create(state_name);
    }

    create(state_name) {
        if (state_name === 'SPLASH') {

        }
        if (state_name === 'MAIN') {
            //this.createMain();
        }
        if (state_name === 'SETTINGS') {
            this.createSettings();
        }
        if (state_name === 'LOAD') {
            this.createLoad();
        }
        if (state_name === 'COURTS') {
            this.createCourts();
        }
        
        this.state_name = state_name;
    }

    drawTip(tip) {
        if (this.tip) {
            this.tip.destroy();
        }
        var width = (this.view.width/3) - (this.view.margin.left + this.view.margin.right);
        var _x = this.view.left + this.view.margin.left;
        var _y = this.view.bottom - (this.view.margin.bottom);

        var text_tip = this.scene.add.bitmapText(_x, _y, 'SkeleTalk',tip, 8).setOrigin(0).setScrollFactor(0).setDepth(1001).setMaxWidth(width - 16).setLineSpacing(10).setAlpha(0);
        text_tip.setTintFill(0xFFFFFF);
        var tween = this.scene.add.tween({
            targets: [text_tip],
            y: '-='+(text_tip.displayHeight + 8),
            alpha: 1,
            duration: 1000,
            ease: 'Sine.easeInOut',
            repeat: 0
        });

        this.tip = text_tip;
    }

    addVersion () {
        let version = this.scene.add.bitmapText(this.view.left + this.view.margin.left, this.view.bottom - this.view.margin.bottom, 'SkeleTalk', 'v.'+this.version+' Skele\'s Summer Break', 8).setOrigin(0).setScrollFactor(0).setDepth(1001);

        let block = this.scene.add.nineslice(version.x - 8,version.y - 5, 'UI', 'BLOCK_MID_BROWN_BORDER', version.displayWidth + 16, version.displayHeight + 8, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(1000);

        this.display_version = {block: block, text: version};
    }

    createCourts () {
        this.scene.add.nineslice(this.view.left,this.view.top, 'UI', 'BLOCK_MID_SAPPHIRE_BORDER', this.view.width, this.view.height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(800);
        this.addVersion();
        this.courtManager = new CourtsManager(this.scene);
    }

    createSettings() {
        this.settingsManager = new SettingsManager(this.scene);

        
        var height = this.view.bottom - (this.view.top + this.view.margin.top + (this.view.margin.bottom*2));
        var _x  = this.view.left + (this.view.margin.left*2) + 120;
        var _y = this.view.top + this.view.margin.top;
        var width = this.view.right - _x - this.view.margin.right;

        this.settingsManager.setView(_x,_y, width, height, 'content');
        this.addVersion();
       //this.settingsManager.saveSettings('input');
    }

    createLoad() {
        this.addVersion();
        var self = this;
        var tip_message = [
            '"Don\'t forget about your pile of homework."',
            '"Keep good company."',
            '"Keep your cool."'

        ];
        var tip = this.drawTip(Phaser.Math.RND.pick(tip_message));
        var total_height = this.view.bottom - (this.view.top + this.view.margin.top + (this.view.margin.bottom*2));
        var height = total_height/3;
        var left  = this.view.left + (this.view.margin.left*2) + 120;
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
            var slot_highlight = this.scene.add.nineslice(left, top, 'UI', 'BLOCK_SHALLOW_RED_EDGE_FRAME', width, height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(999).setVisible(false);

            
            // Mouse/Touch Input
            slot_slice.setInteractive(); 
            if (i === 0) {
                slot_slice.on('pointerover', function (pointer) {
                    // This function will be called when the menu block is clicked or tapped
                    self.scene.app.menu.setSelected(1);
                });
                slot_slice.on('pointerdown', function (pointer) {
                    // This function will be called when the menu block is clicked or tapped
                    self.scene.app.menu.select(1);
                });
            }
            if (i === 1) {
                slot_slice.on('pointerover', function (pointer) {
                    // This function will be called when the menu block is clicked or tapped
                    self.scene.app.menu.setSelected(2);
                });
                slot_slice.on('pointerdown', function (pointer) {
                    // This function will be called when the menu block is clicked or tapped
                    self.scene.app.menu.select(2);
                });
            }
            if (i === 2) {
                slot_slice.on('pointerover', function (pointer) {
                    // This function will be called when the menu block is clicked or tapped
                    self.scene.app.menu.setSelected(3);
                });
                slot_slice.on('pointerdown', function (pointer) {
                    // This function will be called when the menu block is clicked or tapped
                    self.scene.app.menu.select(3);
                });
            }
            
            

            if (SAVES.length > i) {
                var slot_byline = this.scene.add.bitmapText(left + this.view.margin.left, top + this.view.margin.top, 'SkeleTalk', 'Slot '+(i+1)+': Day '+SAVES[i].TIME.DAY + ', ' + SAVES[i].SAVE.DATE, 8).setOrigin(0).setScrollFactor(0).setDepth(1000);

                var _x = left + this.view.margin.left;
                var _y = top + this.view.margin.top*2;
                
                var slot_headline = this.revealMarquee(SAVES[i].SAVE.HEADLINE,_x,_y);
            }
            else {
                var slot_byline = this.scene.add.bitmapText(left + this.view.margin.left, top + this.view.margin.top, 'SkeleTalk', 'Slot '+(i+1)+': Day ???', 8).setOrigin(0).setScrollFactor(0).setDepth(1000);
                var slot_headline = this.scene.add.bitmapText(left + this.view.margin.left, top + this.view.margin.top*2, 'SkeleMarquee', 'new', 16).setOrigin(0).setScrollFactor(0).setDepth(1000);
            }

            this.slots.push({slice: slot_slice, selector: slot_highlight,slot_byline: slot_byline, slot_headline: slot_headline});
        }
    }

    getMarqueeFill (length,blank=false) {
        var headline_display = '';
        for (var i=0;i<length;i++) {
            if (blank) {var content = '_';}
            var content = Phaser.Math.RND.pick(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','_','_']);
            headline_display += content;
        }
        return headline_display;
    }

    revealMarquee (headline,_x,_y) {
        var headline_text = headline.toLowerCase().replace(/ /g,"_");
        var headline_display = this.getMarqueeFill(headline_text.length,true);
        
        var headline_object = this.scene.add.bitmapText(_x,_y, 'SkeleMarquee', headline_display, 16).setOrigin(0).setScrollFactor(0).setDepth(1000);
        
        var self = this;
        var shuffle = this.scene.time.addEvent({
            delay: 125,
            repeat:6,
            callback: ()=>{
                headline_display = self.getMarqueeFill(headline_text.length);
                headline_object.setText(headline_display);
            }
        });
        var reveal = this.scene.time.addEvent({
            delay: 1000,
            repeat:0,
            callback: ()=>{
                headline_object.setText(headline_text);
            }
        });
        
        return headline_object;
    }


    selectLoad (selected) {
        /// Highlights save slot on load menu
        for (var i=0;i<3;i++) {
            if (i != selected - 1) {
                this.slots[i].slice.setTexture('UI','BLOCK_MID_LILAC_FAT_BORDER');
                this.slots[i].selector.setVisible(false);
            }
            else {
                if (selected > 0) {
                    this.slots[selected - 1].slice.setTexture('UI','BLOCK_MID_BEIGE_FAT_BORDER');
                    this.slots[selected - 1].selector.setVisible(true);
                }
            }
        }
    }

    selectedLoad (selected,data) {
        console.log("Selected slot "+selected); 
        var self = this;
        // Uses a tween to drop the slots not selected
        this.scene.app.menu.disappearMenu();

        for (var i=0;i<3;i++) {
            if (i != selected - 1) {
                this.slots[i].slice.setTexture('UI','BLOCK_MID_TWILIGHT_BORDER');
                this.slots[i].selector.setVisible(false);

                const tween = this.scene.add.tween({
                    targets: [self.slots[i].slice, self.slots[i].selector,self.slots[i].slot_byline, self.slots[i].slot_headline],
                    x: '+='+self.slots[i].slice.displayWidth,
                    alpha: 0,
                    duration: 1500,
                    ease: 'Sine.easeIn',
                    repeat: 0
                });
                let tip = '"Don\'t forget to look both ways before you cross."';
                tween.on('complete', () => {
                  self.drawTip(tip);
                });
            }
            else {
                if (selected > 0) {
                    this.slots[selected - 1].slice.setTexture('UI','BLOCK_MID_YELLOW_FAT_BORDER');
                    this.slots[selected - 1].selector.setVisible(true);

                    this.slots[selected - 1].slot_headline.setText('loading...');
                    const tween = this.scene.add.tween({
                        targets: [self.slots[i].slice, self.slots[i].selector, self.slots[i].slot_byline, self.slots[i].slot_headline],
                        x: '+=4',
                        y: '-=1',
                        duration: 750,
                        yoyo: true,
                        ease: 'Sine.easeInOut',
                        repeat: 1
                    });
                    
                    tween.on('complete', () => {
                        self.scene.scene.start('Game Scene',{slot: data});
                    });
                }
            }
        }
    }

}