import POCKET_CONFIG from "../config/pocket-states.js";
/**
 * 	Manage inventory UI
 */
export default class HudPocket {

    constructor(scene) {
        this.scene = scene;
        this.pockets = POCKET_CONFIG.POCKETS.SLOTS;
        this.states = POCKET_CONFIG.POCKETS.STATES;
        this.setPocketsFromSave();
    }

    setPocketsFromSave() {
        var itemManager = this.scene.manager.itemManager;
        this.slots = [this.scene.slot.POCKETS.SLOTS.SLOT0, this.scene.slot.POCKETS.SLOTS.SLOT1, this.scene.slot.POCKETS.SLOTS.SLOT2];
        for (var i = 0; i < this.slots.length; i++) {
            var pocket = this.slots[i];
            var new_item = null;
            if (pocket.STATE != 'EMPTY') {
                var items = [];
console.log(pocket[pocket.STATE]);
                if (pocket[pocket.STATE].ITEMS != undefined) {
                    
                    pocket[pocket.STATE].ITEMS.forEach(function (item) {
                        console.log(item.ITEM);
                        items.push(itemManager.newItem(item.ITEM));
                    });
                }
console.log(items);
                new_item = itemManager.newItem(pocket[pocket.STATE].ITEM, items);
                
            }

            this.setPocket(i, pocket.STATE, new_item);
        }
    }

    setPocket(pocketIndex, pocket_state, value = null) {
        let self = this;
        if (this.getPocketAllowed(pocketIndex, pocket_state)) {
            if (pocket_state == 'EMPTY') {
                self.states.forEach(function (state) {
                    if (self.pockets[pocketIndex][state] != 'DISALLOWED' && state != 'EMPTY') {
                        self.pockets[pocketIndex][state] = null;
                    }
                });
            }
            else {
                self.pockets[pocketIndex][pocket_state] = value;
            }
            self.pockets[pocketIndex].STATE = pocket_state;
        }
    }

    getPocket(pocketIndex) {
        return this.pockets[pocketIndex];
    }

    getPocketAllowed(pocketIndex, pocket_state) {
        if (this.pockets[pocketIndex][pocket_state] != 'DISALLOWED') {
            return true;
        }
        return false;
    }

    findInPockets(item_slug) {
        var found = false;
        this.pockets.forEach(function (pocket, index) {
            if (!found) {
                if (pocket.STATE != 'EMPTY' && pocket[pocket.STATE].info.slug == item_slug) {
                    found = index;
                }
            }
        });
        return found;
    }

    getHeldItems() {
        var heldItems = [];
        this.pockets.forEach(function (pocket, index) {
            if (pocket.STATE != 'EMPTY') {
                heldItems.push({pocketIndex: index, item: pocket[pocket.STATE]});
            }
        });
        return heldItems;
    }

    availablePocket(item) {
        let self = this;
        var found = false;
        this.pockets.forEach(function (pocket, index) {
            if (!found) {
                if (pocket.STATE != 'EMPTY' && pocket[pocket.STATE].info.slug == item.info.slug && pocket[pocket.STATE].isStackable(item.stackCount)) {
                    found = true;
                    pocket[pocket.STATE].updateStackCount(item.stackCount);
                    self.scene.manager.hud.refreshDisplay();
                }
            }
            if (!found) {
                if (pocket.STATE == 'EMPTY' && pocket[item.info.use] != 'DISALLOWED') {
                    self.setPocket(index, item.info.use, item);
                    found = true;
                    self.scene.manager.hud.refreshDisplay();
                }
            }
        });
        return found;
    }

    availableBag(item, exclude = null) {
        var found = false;
        this.pockets.forEach(function (pocket, index) {
            if (!found) {
                if (exclude != index) {
                    if (pocket.STATE != 'EMPTY' && pocket[pocket.STATE].info.type == 'BAG') {

                        //The below needs to apply to all the contents of the bag, not stacking the bag itself
                        pocket[pocket.STATE].items.forEach(function (bag_item) {
                         if (!found) {
                            if (bag_item.info.slug == item.info.slug && bag_item.isStackable(item.stackCount)) {
                                found = true;
                                bag_item.updateStackCount(item.stackCount);
                                self.scene.manager.hud.refreshDisplay();
                            }
                         }
                        });
                        
                        if (!found && pocket[pocket.STATE].addItem(item)) {
                            found = true;
                            self.scene.manager.hud.refreshDisplay();
                        }
                    }
                }

            }
        });
        return found;
    }

    // TODO: Refactor
    doAction(pocketIndex, action_string) {
        var _x = this.scene.player.action.actionTile.x;
        var _y = this.scene.player.action.actionTile.y;

        var action_result = false;
        var pocket = this.getPocket(pocketIndex);
        if (action_string == 'DROP' && pocket.STATE != 'EMPTY') {
            var item = pocket[pocket.STATE];
            var placed = this.scene.manager.itemManager.putItemInWorld(item, _x, _y);
            if (placed) {
                this.setPocket(pocketIndex, 'EMPTY');
            }
        }
        else if (action_string == 'DROP ONE' && pocket.STATE != 'EMPTY') {
            var item = pocket[pocket.STATE];
            var placed = this.scene.manager.itemManager.newItemToWorld(_x, _y, item.info.slug);
            if (placed) {
                item.updateStackCount(-1);
            }
        }
        else if (action_string == 'PUT AWAY' && pocket.STATE != 'EMPTY') {
            var item = pocket[pocket.STATE];
            /// Check for bags
            /// Check bags for space
            /// If there's space, move the item into the bag
            var inBag = this.availableBag(item, pocketIndex);
            if (inBag) {
                /// Remove from this pocket
                /// Tween; when tween done empty pocket
                this.setPocket(pocketIndex, 'EMPTY');
                var sound_var = Phaser.Math.RND.between(1, 3);
                this.scene.manager.hud.hudSound.play('ITEM_PUT_AWAY_' + sound_var);
                action_result = true;
            }
        }
        else if (pocket.STATE != 'EMPTY') {
            var item = pocket[pocket.STATE];
            var self = this;
            if (action_string == 'EAT' && this.scene.player.state.name != 'EAT') {
                self.scene.player.setState('EAT');
                setTimeout(() => {
                    self.scene.player.setState('IDLE');
                }, 2000);
            }
            item.info.actions.forEach(function (item_action) {
                if (action_string == item_action.name) {
                    if (item_action.consume) {
                        self.setPocket(pocketIndex, 'EMPTY');
                    }
                    if (item_action.transition != false) {
                        self.setPocket(pocketIndex, 'EMPTY');
                        self.scene.manager.itemManager.newItemToPockets(item_action.transition);
                    }
                }
            });
        }
        return action_result;
    }

}