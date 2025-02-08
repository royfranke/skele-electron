import Object from "./object.js";

/* Object Bag Class */

export default class ObjectChest extends Object {

    chestFunctions(items) {
        this.items = [];
        if (items.length > 0) {
            this.items = items;
        }
    }

    isFull() {
        return this.items.length >= this.info.slots;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    addItemToChest(item) {
        if (!this.isFull()) {
            this.items.push(item);
            return true;
        } else {
            console.log("Chest.addObject: no more room in chest.");
            return false;
        }
    }

    pullItem(place = 0) {
        if (this.items.length >= place + 1) {
            var object = this.items.splice(place, 1);
            return object[0];
        } else {
            console.warn("Chest.pullItem: this bag does not contain an item at the requested position (" + place + ")");
            return false;
        }
    }

    discardItem(place = 0) {
        if (this.items.length >= place + 1) {
            this.items.splice(place, 1);
        } else {
            console.warn("Chest.discardItem: this bag does not contain an object at the requested position (" + place + ")");
        }
    }

    nextItem() {
        if (this.items.length > 1) {
            var item = this.items.shift();
            this.items.push(item);
        }
    }

    doAction(action) {
        this.scene.player.action.clearActions();
        var self = this;
        this.world_actions.forEach(function (world_action) {
            if (world_action.action == action) {
                if (world_action.stateTrigger != null) {
                    self.setState(world_action.stateTrigger);
                }
            }
        });
        if (action == 'LOOK INSIDE') {
            /// change focus to ui chest window
            this.scene.manager.openChest(this);
        }
        /*
        If the first nine characters of the action string are 'PUT AWAY ', then the player is trying to put an item in the bag.
        */
        if (action.substring(0, 9) == 'PUT AWAY ') {
            var items = this.scene.manager.hud.pocket.getHeldItems();
            var putAway = false;
            items.forEach(function (item) {
                if (action == 'PUT AWAY '+item.item.name.toUpperCase() && !putAway) {
                    putAway = true;
                    let placed = self.addItemToChest(item.item);
                    if (placed) {
                        self.scene.manager.hud.pocket.setPocket(item.pocketIndex, 'EMPTY');
                        var sound_var = Phaser.Math.RND.between(1, 3);
                        self.scene.manager.hud.hudSound.play('ITEM_PUT_AWAY_' + sound_var);
                    }
                    self.scene.manager.hud.refreshDisplay();
                }
            });
        }

    }

    addChestActions() {
        var player_action = this.scene.player.action;
        var items = this.scene.manager.hud.pocket.getHeldItems();
        var self = this;
       
        if (this.state != null && this.state.name == 'OPEN') {
            items.forEach(function (item) {
                player_action.addAction({ action: 'PUT AWAY '+item.item.name.toUpperCase(), object: self, ground: '', fx: '' });
            });
        }
        /// Get what the player is holding and add actions
        /// to add to this chest in the world
    }

}