export default class HudInput {

    paused = false;

    constructor(scene) {
        this.scene = scene;
        this.pocket_length = 3;
        this.selected = {
            pocket: 0,
            contents: 0,
            actions: 0
        }
    }

    refreshDisplay() {
        if (this.scene.manager.hud.hudPockets.state == 'OPEN') {
            this.scene.manager.hud.hudPockets.refreshDisplay();
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
            this.selected.actions = 0; /// Reset the actions selector
        }
    }

    setSelectedContents(from_selected) {
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
        this.refreshDisplay();
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
        if (this.selected.contents == -1) {

            var doAction = this.scene.manager.hud.pocket.doAction(this.selected.pocket, 'DROP');
            if (doAction) {
                console.log('Action done-- refresh display');
                this.refreshDisplay();
            }
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

                    var doAction = this.scene.manager.hud.pocket.doAction(this.selected.pocket, action);

                    if (doAction) {
                        console.log('Action done-- refresh display');
                        this.refreshDisplay();
                    }

                }
            }
        }
        if (this.selected.contents == 1) {
            this.scene.manager.hud.tapSlip(this.selected.pocket);
            var pocket = this.scene.manager.hud.pocket.getPocket(this.selected.pocket);
            var state = pocket.STATE;
            if (state != 'EMPTY') {
                var item = pocket[state].pullItem(0);
                var placed = this.scene.manager.hud.availablePocket(item);

                if (placed != false) {
                    console.log("Placed! Refreshing");
                    this.refreshDisplay();
                }
                else {
                    var sound_var = Phaser.Math.RND.between(1, 3);
                    this.scene.manager.hud.hudSound.play('SKELE_INVALID_' + sound_var);
                    ///this.scene.manager.hud.newPocketTip('My hands are full...',3000);
                    //put the thing back in the bag
                    pocket[state].addItem(item);
                }
            }

        }
    }

    back() {

    }



}