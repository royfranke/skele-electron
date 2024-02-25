import MENU from "../config/app-menus.js";
/*
 * Manages application menus
 * MAIN | PAUSE | SETTINGS
 */

export default class AppMenu {

    constructor(scene, state, view) {
       this.scene = scene;
       this.view = view;
       this.selected = 0;
       
       this.menu = MENU[state];
       this.menu_list = this.buildMenu(view);
    }

    buildMenu () {
        const self = this.scene;
        const selected = this.selected;
        const view = this.view;
        var menu_list = [];
        this.menu.forEach(function (menu_item, index) {
            // TODO: Come back to swap these int out for margin vars
            var element = self.add.dom(view.left + 16,
                (index * 30) + view.top + 16, 'div', '', `${menu_item.LABEL}`).setClassName(selected == index ? 'menu-item menu-item-selected' : 'menu-item' ).setOrigin(0,0);
            menu_list.push(element);
        });
        return menu_list;
    }

    setSelected (selected=0) {
        if (selected >= this.menu_list.length) {
            selected = 0;
        }
        if (selected < 0) {
            selected = this.menu_list.length - 1;
        }
        this.selected = selected;

        for (var i=0;i<this.menu_list.length;i++) {
            this.menu_list[i].setClassName(selected == i ? 'menu-item menu-item-selected' : 'menu-item');
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
            this.scene.manager.endScene(this.menu[this.selected].LOADER);
        }

        if (this.menu[this.selected].TYPE == 'FUNCTION') {
            /// TODO: if the menu item is a function, do that function
        }
    }


}