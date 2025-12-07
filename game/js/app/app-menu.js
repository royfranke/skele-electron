import MENU from "./app-menus.js";
import PRELOAD_SOUND from "../config/atlas/audio.js";
/*
 * Manages application menus
 * MAIN | PAUSE | SETTINGS
 */

export default class AppMenu {

    constructor(scene, state, view) {
       this.scene = scene;
       this.view = view;
       this.menu_back = null;
       this.last_selected = -1;
       this.selected = 0;
       this.menu = MENU[state];
       this.background = this.buildBackground();
       this.menu_list = this.buildMenu();
       this.setSelected(0);
    }

    buildMenu () {
        const self = this;
        const view = this.view;
        var menu_list = [];
        
        this.menu.forEach(function (menu_item, index) {

            var block = self.scene.add.nineslice(view.left + view.margin.left + 24,(view.top + view.margin.top) + (28 * index), 'UI', 'BLOCK_MID_ORANGE', 96, 24, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(1000);

            // Mouse/Touch Input
            block.setInteractive(); 
            block.on('pointerover', function (pointer) {
                // This function will be called when the menu block is clicked or tapped
                self.setSelected(index);
            });
            block.on('pointerdown', function (pointer) {
                // This function will be called when the menu block is clicked or tapped
                self.select();
            });

            
            var text = self.scene.add.bitmapText(block.x + 6,block.y + 8, 'SkeleTalk', menu_item.LABEL, 8).setOrigin(0).setScrollFactor(0).setDepth(1001);

            if (menu_item.BUTTON_STICK) {
                //self.scene.add.image(view.left + (view.margin.left * 1.5),(index * 18) + view.top + view.margin.top + 20, 'UI', 'BAG_ARROW_SELECTED').setScrollFactor(0).setDepth(1000).setAngle(-90);
                
            }

            if (menu_item.BUTTON == 'BACK') {
                //self.menu_back = menu_item;
            }
            menu_list.push({block: block, text: text});
        });

        let selector_block = this.scene.add.nineslice(menu_list[0].block.x - 24, menu_list[0].block.y, 'UI', 'BLOCK_DEEP_ORANGE_LEFT', 24, 24, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(1010);
        let selector_text = this.scene.add.bitmapText(selector_block.x + 8,selector_block.y + 4, 'SkeleButton', 'X', 16).setOrigin(0).setScrollFactor(0).setDepth(1011);
        let selector_frame = this.scene.add.nineslice(selector_block.x,(view.top + view.margin.top), 'UI', 'BLOCK_SHALLOW_YELLOW_EDGE_FRAME', 96 + 24, 24, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(1200);

        this.selector = {block: selector_block, text: selector_text, frame: selector_frame};
        
        return menu_list;
    }

    buildBackground () {
        const view = this.view;

        this.scene.add.nineslice(view.left,view.top, 'UI', 'BLOCK_MID_SAPPHIRE_BORDER', view.width, view.height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(800);
    }

    setSelected (selected=0) {
        if (selected >= this.menu_list.length) {
            selected = 0;
        }
        if (selected < 0) {
            selected = this.menu_list.length - 1;
        }
        this.last_selected = this.selected;
        this.selected = selected;
        var self = this;
        for (var i=0;i<this.menu_list.length;i++) {
            if (selected == i) {
                this.selector.block.setY(this.menu_list[i].block.y);
                this.selector.text.setY(this.menu_list[i].block.y + 4);
                this.selector.frame.setY(this.menu_list[i].block.y);

                this.selector.frame.setVisible(false);
            }
            this.menu_list[i].block.setFrame(selected == i ? 'BLOCK_MID_MOONSTONE_RIGHT' : 'BLOCK_MID_DARK_BLUE');

            if (self.scene.app != undefined) {
                self.scene.app.appView.playCootieCatcher();
            }
        }
    }

    disappearMenu () {
        this.selector.block.setVisible(false);
        this.selector.text.setVisible(false);
        this.selector.frame.setVisible(false);
        this.menu_list.forEach(function (item) {
            item.block.setVisible(false);
            item.text.setVisible(false);
        });
    }

    input (key) {
        switch (key) {
            case 'UP': this.up();
            break;
            case 'DOWN': this.down();
            break;
            case 'SELECT': this.select();
            break;
            case 'BACK': 
                if (this.menu_back != null) {
                    this.back();
                }
            break;
        }
    }

    back () {  
        if (this.menu_back.TYPE == 'SCENE') {
            this.scene.app.endScene(this.menu_back.LOADER);
        }

        if (this.menu_back.TYPE == 'FUNCTION') {
            /// TODO: if the menu item is a function, do that function
        }
     }


    down () {
        this.setSelected(this.selected + 1);
        this.playMenuSound('MENU_INPUT');
    }

    up () {
        this.setSelected(this.selected - 1);
        this.playMenuSound('MENU_INPUT');
    }

    select () {
        this.playMenuSound('MENU_SELECT');
        if (this.menu[this.selected].TYPE == 'SCENE') {
            /// Delay scene change until after sound completes
            this.scene.time.delayedCall(250, () => {
                this.scene.app.endScene(this.menu[this.selected].LOADER);
            }
            , [], this);
            //
        }

        if (this.menu[this.selected].TYPE == 'LOADSAVE') {
            var slot = this.menu[this.selected].LOADER;
            
            if (this.scene.cache.json.get(slot)) {
                var load_data = this.scene.cache.json.get(slot);
                this.scene.app.preloadGame(load_data);
            }
        }

        if (this.menu[this.selected].TYPE == 'FUNCTION') {
            /// TODO: if the menu item is a function, do that function
        }

        if (this.menu[this.selected].TYPE == 'LOADSETTINGS') {
            

        }
    }

    playMenuSound (sound_slug, repeat=0, repeat_delay=0) {
        var volume = 1;
        var self = this;
        PRELOAD_SOUND.forEach(function (sound, index) {
            if (sound.NAME === sound_slug) {
                let available = sound.FILES.length;
                let random = Phaser.Math.Between(0, available-1);
                let sound_key = sound.NAME+'_'+random;
                let new_sound = self.scene.sound.add(sound_key, {volume: volume});

                if (repeat > 0) {
                    let timeline = self.scene.add.timeline([

                        {
                    
                            at: repeat_delay,
                    
                            run: () => { new_sound.play(); },
                        },
                    ]);
                    timeline.repeat(repeat).play();
                    return timeline;
                }
                else {
                    new_sound.play();
                    return;
                }
                
            }
        });
    }


}