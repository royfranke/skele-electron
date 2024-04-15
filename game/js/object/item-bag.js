import Item from "./item.js";

/* Item Bag Class */

export default class ItemBag extends Item {
    constructor(scene, item, items = []) {
        super(scene, item);
        this.actions = [{ action: 'PICK UP', object: this }, { action: 'OPEN', object: this }];

        this.info.items = items;

    }

    isFull() {
        return this.info.items.length >= this.info.slots;
    }

    isEmpty() {
        return this.info.items.length === 0;
    }

    addItem(item) {
        if (!this.isFull()) {
            this.info.items.push(item);
            return true;
        } else {
            console.log("Bag.addItem: no more room in bag.");
            return false;
        }
    }

    pullItem(place = 0) {
        if (this.info.items.length >= place + 1) {
            var item = this.info.items.splice(place, 1);
            return item[0];
        } else {
            console.warn("Bag.pullItem: this bag does not contain an item at the requested position (" + place + ")");
            return false;
        }
    }

    discardItem(place = 0) {
        if (this.info.items.length >= place + 1) {
            this.info.items.splice(place, 1);
        } else {
            console.warn("Bag.discardItem: this bag does not contain an item at the requested position (" + place + ")");
        }
    }

    nextItem() {
        if (this.info.items.length > 1) {
            var item = this.info.items.shift();
            this.info.items.push(item);
        }
    }

    addActions() { // Adds world actions
        var player_action = this.scene.player.action;
        this.actions.forEach(function (action) {
            player_action.addAction(action);
        });
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
            this.scene.manager.openChest(this);
        }
        this.scene.player.action.clearActions();
    }
}