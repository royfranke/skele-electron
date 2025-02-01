import STATES from "../config/settings-states.js";
/*
 * Manages application menus
 * MAIN | PAUSE | SETTINGS
 */

export default class SettingsMenu {

    constructor(scene) {
       this.scene = scene;

       this.menu_back = null;
       this.last_selected = -1;
       this.selected = 0;
       this.arrow = null;
       this.nineslice = null;
       this.menu_list = this.makeMenu(); 
       this.buildMenu();       
    }

    drawMenu () {
        this.view = this.scene.app.getView();
        const max_height = this.view.windowHeight;
        const height = (this.menu.length * 18) + 20;
        if (height > max_height) {  height = max_height; }

        this.nineslice = this.scene.add.nineslice(this.view.left + this.view.margin.left,this.view.top + this.view.margin.top, 'UI', 'BAG_FOCUSED', 128, height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(1000);

        this.arrow = this.scene.add.image(this.view.left + (this.view.margin.left * 1.5),this.view.top + this.view.margin.top + 20, 'UI', 'ITEM_ARROW_SELECTED').setScrollFactor(0).setDepth(1010).setAngle(-90);
    }

    buildMenu () {
        this.drawMenu();
        const self = this;
        const selected = this.selected;
        const view = this.view;
        var menu_list = [];

        
        return menu_list;
    }

    makeMenu () {
        let menu = [];
        for (const [key, value] of Object.entries(STATES)) {
            if (value.display != undefined) {
                menu.push(value.display);
            }
        }
        return menu;
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

        for (var i=0;i<this.menu_list.length;i++) {
            if (selected == i) {
                this.arrow.setY(this.menu_list[i].y + 12);
            }
            //this.menu_list[i].setClassName(selected == i ? 'menu-item menu-item-selected' : 'menu-item');
        }
        
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
    }

    up () {
        this.setSelected(this.selected - 1);
    }

    select () {
        if (this.menu[this.selected].TYPE == 'SCENE') {
            this.scene.app.endScene(this.menu[this.selected].LOADER);
        }

        if (this.menu[this.selected].TYPE == 'FUNCTION') {
            /// TODO: if the menu item is a function, do that function
        }
    }


}