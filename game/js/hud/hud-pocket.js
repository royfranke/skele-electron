import POCKET_CONFIG from "../config/pocket-states.js";
import RequirementsEngine from "../requirements/requirements-engine.js";
/**
 * 	Manage inventory UI
 */
export default class HudPocket {

    constructor(scene) {
        this.scene = scene;
        this.pockets = POCKET_CONFIG.POCKETS.SLOTS;
        this.states = POCKET_CONFIG.POCKETS.STATES;
        this.requirementsEngine = new RequirementsEngine(scene);
    }

    setSaveFromPockets() {
        let pockets = {
            SLOT0: this.getPocketForSave(0),
            SLOT1: this.getPocketForSave(1),
            SLOT2: this.getPocketForSave(2)
        };
        for (var i = 0; i < 3; i++) {
            if (pockets['SLOT' + i].STATE != 'EMPTY') {
                let items = [];
                if (pockets['SLOT' + i][pockets['SLOT' + i].STATE].items != undefined) {
                    pockets['SLOT' + i][pockets['SLOT' + i].STATE].items.forEach(function (item) {
                        items.push({
                            ITEM: item.info != undefined ? item.info.slug : item,
                            STACK: item.stackCount ? item.stackCount : 1
                        });
                    });
                }

                let item = pockets['SLOT' + i][pockets['SLOT' + i].STATE];

                pockets['SLOT' + i][pockets['SLOT' + i].STATE] = {
                    ITEM: item.info != undefined ? item.info.slug : item,
                    STACK: item.stackCount ? item.stackCount : 1,
                    ITEMS: items
                };
            }
        }
        return pockets;
    }

    setPocketsFromSave() {
        if (this.scene.manager != undefined) {
            var itemManager = this.scene.manager.itemManager;
        }
        else {
            var itemManager = false;
            console.log("Item Manager is undefined-- is this the tutorial?");
        }

        this.slots = [
            this.scene.slot.POCKETS.SLOTS.SLOT0,
            this.scene.slot.POCKETS.SLOTS.SLOT1,
            this.scene.slot.POCKETS.SLOTS.SLOT2
        ];

        for (var i = 0; i < this.slots.length; i++) {
            var pocket = this.slots[i];
            var new_item = null;
            if (pocket.STATE != 'EMPTY') {
                var items = [];

                if (pocket[pocket.STATE].ITEMS != undefined) {
                    pocket[pocket.STATE].ITEMS.forEach(function (item) {
                        if (itemManager != false) {
                            let stack_item = itemManager.newItem(item.ITEM);
                            if (item.STACK != undefined) {
                                stack_item.stackCount = item.STACK;
                            }
                            items.push(stack_item);
                        }
                    });
                }
                if (itemManager != false) {
                    new_item = itemManager.newItem(pocket[pocket.STATE].ITEM, items);
                }
                if (pocket[pocket.STATE].STACK != undefined) {
                    new_item.stackCount = pocket[pocket.STATE].STACK;
                }
            }
            this.setPocket(i, pocket.STATE, new_item);
        }
    }

    setItemsInBag(pocketIndex, items) {
        let pocket = this.getPocket(pocketIndex);
        if (pocket.STATE != 'EMPTY' && pocket[pocket.STATE].info.type == 'BAG') {
            pocket[pocket.STATE].items = [];
            items.forEach(function (item) {
                pocket[pocket.STATE].items.push(item);
            });
        }
    }

    getItemsInBag(pocketIndex) {
        let pocket = this.getPocket(pocketIndex);
        let items = [];
        if (pocket.STATE != 'EMPTY' && pocket[pocket.STATE].info.type == 'BAG') {
            items = pocket[pocket.STATE].items;
        }
        return items;
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

    getPocketForSave(pocketIndex) {
        var pocket = this.pockets[pocketIndex];
        var item_list = [];
        if (pocket[pocket.STATE] != 'DISALLOWED' && pocket[pocket.STATE] != null) {
            if (pocket[pocket.STATE].items != undefined) {
                pocket[pocket.STATE].items.forEach(function (item) {
                    item_list.push({ ITEM: item.info.slug, STACK: item.stackCount });
                });
            }
        }

        var save_pocket = {
            TYPE: pocket.TYPE,
            STATE: pocket.STATE,
            EMPTY: pocket.EMPTY,
            HOLDS: pocket.HOLDS,
            USES: pocket.USES,
            WEARS: pocket.WEARS
        };

        if (pocket.HOLDS != 'DISALLOWED' && pocket.HOLDS != null) {
            save_pocket.HOLDS.ITEM = pocket.HOLDS.info.slug; save_pocket.HOLDS.STACK = pocket.HOLDS.stackCount;
            save_pocket.HOLDS.ITEMS = item_list;
        }

        if (pocket.USES != 'DISALLOWED' && pocket.USES != null) {
            save_pocket.USES.ITEM = pocket.USES.info.slug; save_pocket.USES.STACK = pocket.USES.stackCount;
            save_pocket.USES.ITEMS = item_list;
        }

        if (pocket.WEARS != 'DISALLOWED' && pocket.WEARS != null) {
            save_pocket.WEARS.ITEM = pocket.WEARS.info.slug;
            save_pocket.WEARS.STACK = pocket.WEARS.stackCount;
            save_pocket.WEARS.ITEMS = item_list;
        }

        return save_pocket;
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
                var item = pocket[pocket.STATE];
                if (item.hasOwnProperty('info')) {
                    item = item.info.slug;
                }
                if (pocket.STATE != 'EMPTY' && item == item_slug) {
                    found = index;
                }
            }
        });
        return found;
    }

    findItemKindInPockets(item_kind_slug) {
        var found = false;
        this.pockets.forEach(function (pocket, index) {
            if (!found) {
                if (pocket.STATE != 'EMPTY' && pocket[pocket.STATE].info.type == item_kind_slug) {
                    found = index;
                }
            }
        });
        return found;
    }   

    findItemKindInPockets(item_kind_slug) {
        var found = false;
        this.pockets.forEach(function (pocket, index) {
            if (!found) {
                if (pocket.STATE != 'EMPTY' && pocket[pocket.STATE].info.type == item_kind_slug) {
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
                heldItems.push({ pocketIndex: index, item: pocket[pocket.STATE] });
            }
        });
        return heldItems;
    }

    availablePocket(item, specific_pocket = null) {
        let self = this;
        var found = false;
        this.pockets.forEach(function (pocket, index) {
            if (!specific_pocket || (specific_pocket != null && specific_pocket == index)) {
                if (!found) {
                    if (item.slug != undefined) {
                        item = self.scene.manager.itemManager.newItem(item.slug);
                    }
                    if (pocket.STATE != 'EMPTY' && pocket[pocket.STATE].info.slug == item.info.slug && pocket[pocket.STATE].isStackable(item.stackCount)) {
                        found = true;
                        pocket[pocket.STATE].updateStackCount(item.stackCount);
                    }
                }
                if (!found) {
                    if (item.slug != undefined) {
                        item = self.scene.manager.itemManager.newItem(item.slug);
                    }
                    if (pocket.STATE == 'EMPTY' && pocket[item.info.use] != 'DISALLOWED') {
                        self.setPocket(index, item.info.use, item);
                        found = true;
                    }
                }
                if (found) {
                    self.scene.manager.hud.refreshDisplay();
                }
            }
        });
        return item.info != undefined && found ? item : false;
    }


    availableContainer(item, exclude = null) {
        var found = false;
        this.pockets.forEach(function (pocket, index) {
            if (!found) {
                if (exclude != index) {
                    if (pocket.STATE != 'EMPTY' && pocket[pocket.STATE].info.contains.length > 0) {

                        if (!found && pocket[pocket.STATE].replaceContents(item)) {
                            found = true;
                            self.scene.manager.hud.refreshDisplay();
                        }
                    }
                }

            }
        });
        return found;
    }

    availableBag(item, exclude = null) {
        var found = false;
        var self = this;
        this.pockets.forEach(function (pocket, index) {
            if (!found) {
                if (exclude != index) {
                    if (pocket.STATE != 'EMPTY' && pocket[pocket.STATE].info.type == 'BAG') {

                        //The below needs to apply to all the contents of the bag, not stacking the bag itself
                        pocket[pocket.STATE].items.forEach(function (bag_item) {
                            if (!found) {
                                if (bag_item.slug != undefined) {
                                    bag_item = self.scene.manager.itemManager.newItem(bag_item.slug);
                                }
                                if (bag_item.info.slug == item.info.slug && bag_item.isStackable(item.stackCount)) {
                                    found = true;
                                    bag_item.updateStackCount(item.stackCount);
                                    self.scene.manager.hud.refreshDisplay();
                                }
                            }
                        });

                        if (!found && pocket[pocket.STATE].bagItem(item)) {
                            found = true;
                            self.scene.manager.hud.refreshDisplay();
                        }
                    }
                }

            }
        });

        if (!found) {
            this.scene.manager.hud.hudThinking.tellBrain("I'm out of bag space.");
        }
        return found;
    }

    dropItem(pocketIndex, _x, _y) {
        var pocket = this.getPocket(pocketIndex);
        if (pocket.STATE != 'EMPTY') {
            var item = pocket[pocket.STATE];
            var placed = this.scene.manager.itemManager.putItemInWorld(item, _x, _y);
            if (placed) {
                this.setPocket(pocketIndex, 'EMPTY');
            }
        }
    }

    dropOneItem(pocketIndex, _x, _y) {
        var pocket = this.getPocket(pocketIndex);
        if (pocket.STATE != 'EMPTY') {
            var item = pocket[pocket.STATE];
            var placed = this.scene.manager.itemManager.newItemToWorld(_x, _y, item.info.slug);
            if (placed) {
                item.updateStackCount(-1);
                if (item.stackCount <= 0) {
                    this.setPocket(pocketIndex, 'EMPTY');
                }
            }
        }
    }

    putAwayItem(pocketIndex) {
        var pocket = this.getPocket(pocketIndex);
        if (pocket.STATE != 'EMPTY') {
            var item = pocket[pocket.STATE];
            /// Check for bags
            /// Check bags for space
            /// If there's space, move the item into the bag
            var inBag = this.availableBag(item, pocketIndex);
            if (inBag) {
                /// Remove from this pocket
                this.setPocket(pocketIndex, 'EMPTY');
                return true;
            }
        }
        return false;
    }

    removeItemFromPockets(item_slug, quantity=1) {
        var self = this;
        var removed = 0;
        this.pockets.forEach(function (pocket, index) {
            if (removed < quantity) {
                if (pocket.STATE != 'EMPTY') {
                    var item = pocket[pocket.STATE];
                    if (item.info.slug == item_slug) {
                        let to_remove = Math.min(item.stackCount, quantity - removed);
                        item.updateStackCount(-to_remove);
                        removed += to_remove;
                        if (item.stackCount <= 0) {
                            self.setPocket(index, 'EMPTY');
                        }
                    }
                }
            }
        });
        return removed;
    }   

    // TODO: Refactor
    doAction(pocketIndex, action_string) {
        const pocket = this.getPocket(pocketIndex);
        if (pocket.STATE === 'EMPTY') return false;

        // Handle simple actions
        if (['DROP', 'DROP ONE', 'PUT AWAY', 'PUT ON KEYCHAIN'].includes(action_string)) {
            return this.handleSimpleAction(pocketIndex, action_string, pocket);
        }

        // Handle EAT state
        if (action_string === 'EAT') {
            this.handleEatAction();
        }

        // Process complex requirement-based actions
        const item = pocket[pocket.STATE];
        const itemAction = item.findInPocketActions(action_string);
        
        if (!itemAction) return false;

        const context = { pocketIndex, item };
        const checkResult = this.requirementsEngine.checkRequirements(
            itemAction.requires,
            context
        );

        if (!checkResult.satisfied) {
            return false;
        }

        // Apply data modifications
        if (itemAction.req_result_data_key) {
            this.applyDataModifications(itemAction);
        }

        // Apply requirement results
        this.requirementsEngine.applyResults(
            itemAction.requires,
            itemAction,
            context
        );

        // Emit quest event
        this.scene.events.emit('REQ_' + itemAction.req_group + '_MET');
        
        this.scene.manager.hud.refreshDisplay();
        return true;
    }

    handleSimpleAction(pocketIndex, action, pocket) {
        var _x = this.scene.player.action.actionTile.x;
        var _y = this.scene.player.action.actionTile.y;
        
        if (action === 'DROP') {
            this.dropItem(pocketIndex, _x, _y);
            return true;
        }
        else if (action === 'DROP ONE') {
            this.dropOneItem(pocketIndex, _x, _y);
            return true;
        }
        else if (action === 'PUT AWAY') {
            const result = this.putAwayItem(pocketIndex);
            if (result) {
                this.scene.manager.hud.refreshDisplay();
            }
            return result;
        }
        else if (action === 'PUT ON KEYCHAIN') {
            const result = this.scene.manager.hud.hudKeychain.manager.putKeyOnKeychain(pocket[pocket.STATE]);
            var consume = this.getPocket(pocketIndex);
            consume.HOLDS.updateStackCount(-1);
            if (consume.HOLDS.stackCount <= 0) {
                this.setPocket(pocketIndex, 'EMPTY');
            }
            this.scene.manager.hud.refreshDisplay();
            return true;
        }
        return false;
    }

    handleEatAction() {
        var self = this;
        if (self.scene.player.state.name != 'EAT') {
            self.scene.player.setState('EAT');
            self.scene.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    self.scene.player.setState('IDLE');
                }
            });
        }
    }

    applyDataModifications(itemAction) {
        var req_data_key = itemAction.req_result_data_key;
        if (itemAction.req_result_data_set != '') {
            this.scene.manager.dataManager.setData(req_data_key, itemAction.req_result_data_set);
        }
        if (itemAction.req_result_data_modify != '') {
            this.scene.manager.dataManager.modifyData('BODY', req_data_key, itemAction.req_result_data_modify);
        }
    }

}