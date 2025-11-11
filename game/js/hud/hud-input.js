export default class HudInput {

    constructor(scene) {
        this.scene = scene;
        this.pocket_length = 3;
        this.selected = {
            pocket: 0,
            contents: 0,
            actions: 0
        }
    }

    setSelectedPocket(selected = 0) {
        if (this.scene.manager.hud.hudPockets.state == 'OPEN') {
            if (selected >= this.pocket_length) {
                selected = 0;
            }
            if (selected < 0) {
                selected = this.pocket_length - 1;
            }
            this.selected.pocket = selected;
            this.selected.contents = 0; /// Reset the contents selector
            this.selected.actions = 0; ///  Reset the actions selector
            this.scene.manager.hud.hudPockets.refreshPocketActions(this.selected.pocket);
        }
    }

    setSelectedContents(from_selected, force = false) {
        if (this.scene.manager.hud.hudPockets.state == 'OPEN') {
            var pocket = this.scene.manager.hud.pocket.getPocket(this.selected.pocket);

            var state = pocket.STATE;
            if (state != 'EMPTY') {

                var isBag = (pocket[state].info.type == 'BAG');

                if (!isBag) {
                    var selected = this.selected.actions + (from_selected);
                    var content_length = pocket[state].actions.length;
                    if (selected < -1) { // -1 == DROP action
                        selected = content_length - 1;
                        /// Down arrow on inventory content            
                    }
                    else if (selected >= content_length) {
                        selected = 0;
                    }

                    this.selected.actions = selected;
                    this.selected.contents = 0; /// Reset the contents selector
                }
                else { // It's a bag
                    var selected = this.selected.contents + (from_selected);
                    var content_length = 3;
                    if (selected >= content_length || selected < -1) {
                        selected = content_length - 1;
                        /// Down arrow on inventory content            
                    }
                    if (force) {
                        selected = from_selected;
                    }
                    if (selected == content_length - 1) {
                        this.scene.manager.hud.arrowDown(this.selected.pocket);

                    }

                    this.selected.contents = selected;
                    this.selected.actions = 0; /// Reset the actions selector
                }

            }
        }
    }

    input(key) {
        switch (key) {
            case 'UP': this.up();
                break;
            case 'DOWN': this.down();
                break;
            case 'RIGHT': this.right();
                break;
            case 'LEFT': this.left();
                break;
            case 'SELECT': this.select();
                break;
            case 'BACK': this.back();
                break;
        }
        this.scene.manager.hud.hudPockets.refreshDisplay();
    }

    down() {
        this.setSelectedContents(1);
    }

    up() {
        this.setSelectedContents(-1);
    }

    left() {
        this.setSelectedPocket(this.selected.pocket + 1);
    }

    right() {
        this.setSelectedPocket(this.selected.pocket - 1);
    }


    select() {
        if (this.selected.contents == -1) { /// DROP
            this.scene.manager.hud.pocket.doAction(this.selected.pocket, 'DROP');
            return;
        }
        if (this.selected.contents == 0) {
            var pocket = this.scene.manager.hud.pocket.getPocket(this.selected.pocket);
            var state = pocket.STATE;
            if (state != 'EMPTY') {
                if (pocket[state].info.type != 'BAG') { // change this later when adding ability to use actions with bag (Drop Bag)
                    if (this.selected.actions > -1) {
                        var action = pocket[state].actions[this.selected.actions];
                    }
                    else {
                        var action = 'DROP';
                    }

                    this.scene.manager.hud.pocket.doAction(this.selected.pocket, action);
                    return;
                }
            }
        }
        if (this.selected.contents == 1) {
            this.scene.manager.hud.tapHold(this.selected.pocket);
        }
    }

    back() {

    }


}