import Item from "./item.js";

/* Item Bag Class */

export default class ItemBag extends Item {
    constructor(scene, item, items = []) {
        super(scene, item);
        this.actions = [{ action: 'PICK UP', object: this, ground: '', fx: ''}, { action: 'OPEN', object: this, ground: '', fx: '' }];

        this.items = items;

    }

    isFull() {
        return this.items.length >= this.info.slots;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    bagItem(item) {
        if (!this.isFull()) {
            this.items.push(item);
            return true;
        } else {
            console.log("Bag.bagItem: no more room in bag.");
            return false;
        }
    }

    pullItem(place = 0) {
        if (this.items.length >= place + 1) {
            var item = this.items.splice(place, 1);
            return item[0];
        } else {
            console.warn("Bag.pullItem: this bag does not contain an item at the requested position (" + place + ")");
            return false;
        }
    }

    discardItem(place = 0) {
        if (this.items.length >= place + 1) {
            this.items.splice(place, 1);
        } else {
            console.warn("Bag.discardItem: this bag does not contain an item at the requested position (" + place + ")");
        }
    }

    nextItem() {
        if (this.items.length > 1) {
            var item = this.items.shift();
            this.items.push(item);
        }
    }

    addActions() { // Adds world actions
        var player_action = this.scene.player.action;
        this.actions.forEach(function (action) {
            player_action.addAction(action);
        });
        var items = this.scene.manager.hud.pocket.getHeldItems();
        var self = this;
        items.forEach(function (item) {
            player_action.addAction({ action: 'PUT AWAY '+item.item.name.toUpperCase(), object: self, ground: '', fx: '' });
        });
        /// Get what the player is holding and add actions
        /// to add to this bag in the world
    }

    doAction(action) {
        if (action == 'WEAR' || action == 'PUT AWAY' || action == 'PICK UP') {
            var valid = this.scene.manager.hud.availablePocket(this);
            if (valid) {
                this.scene.manager.itemManager.registry.removeItem(this.tile_x, this.tile_y);
            }
        }
        if (action == 'OPEN') {
            /// change focus to ui chest window
            this.scene.manager.openBag(this);
        }
        /*
        If the first nine characters of the action string are 'PUT AWAY ', then the player is trying to put an item in the bag.
        */
        if (action.substring(0, 9) == 'PUT AWAY ') {
            var items = this.scene.manager.hud.pocket.getHeldItems();
            var putAway = false;
            var self = this;
            items.forEach(function (item) {
                if (action == 'PUT AWAY '+item.item.name.toUpperCase() && !putAway) {
                    putAway = true;
                    let placed = self.bagItem(item.item);
                    if (placed) {
                        self.scene.manager.hud.pocket.setPocket(item.pocketIndex, 'EMPTY');
                        var sound_var = Phaser.Math.RND.between(1, 3);
                        self.scene.manager.hud.hudSound.play('ITEM_PUT_AWAY_' + sound_var);
                    }
                    self.scene.manager.hud.refreshDisplay();
                }
            });
        }
        this.scene.player.action.clearActions();
    }
}