import Object from "./object.js";

/* Object Bag Class */

export default class ObjectBag extends Object {
    constructor(scene, object, items = []) {
        super(scene, object);
        this.actions = [{ action: 'OPEN', object: this }];
        if (items.length > 0) {
            this.info.items = items;
        }
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
            console.log("Chest.addObject: no more room in chest.");
            return false;
        }
    }

    pullItem(place = 0) {
        if (this.info.items.length >= place + 1) {
            var object = this.info.items.splice(place, 1);
            return object[0];
        } else {
            console.warn("Chest.pullItem: this bag does not contain an item at the requested position (" + place + ")");
            return false;
        }
    }

    discardItem(place = 0) {
        if (this.info.items.length >= place + 1) {
            this.info.items.splice(place, 1);
        } else {
            console.warn("Chest.discardItem: this bag does not contain an object at the requested position (" + place + ")");
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
        if (action == 'OPEN') {
            this.scene.manager.openChest(this);
        }
        this.scene.player.action.clearActions();
    }
}