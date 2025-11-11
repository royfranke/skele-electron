import Item from "./item.js";

/* Item Bag Class */

export default class ItemBag extends Item {
    constructor(scene, item, items = []) {
        super(scene, item);
        this.actions = [
            {
                action: 'PICK UP',
                object: this,
                ground: '',
                fx: ''
            }, {
                action: 'OPEN',
                object: this,
                ground: '',
                fx: ''
            }
        ];
        this.items = items;
    }

    isFull() {
        return this.items.length >= this.info.slots;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    bagItem(item, place = null) {
        if (!this.isFull()) {
            if (place !== null && place < this.info.slots) {
                this.items.splice(place, 0, item);
            } else {
                this.items.push(item);
            }
            this.scene.manager.hud.hudThinking.tellBrain("I put "+item.name+" in the "+this.info.name+".");
            return true;
        } else {
            // No more room in the bag
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
            this.pickupItem();
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
                    }
                    else {
                        self.scene.manager.hud.hudThinking.tellBrain("There's no more room in the "+self.info.name+".");
                    }
                    self.scene.manager.hud.refreshDisplay();
                }
            });
        }
        this.scene.player.action.clearActions();
    }
}