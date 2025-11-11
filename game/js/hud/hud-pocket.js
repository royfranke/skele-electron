import POCKET_CONFIG from "../config/pocket-states.js";
/**
 * 	Manage inventory UI
 */
export default class HudPocket {

    constructor(scene) {
        this.scene = scene;
        this.pockets = POCKET_CONFIG.POCKETS.SLOTS;
        this.states = POCKET_CONFIG.POCKETS.STATES;
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
                    if (pocket.STATE != 'EMPTY' && pocket[pocket.STATE].info.slug == item.info.slug && pocket[pocket.STATE].isStackable(item.stackCount)) {
                        found = true;
                        pocket[pocket.STATE].updateStackCount(item.stackCount);
                    }
                }
                if (!found) {
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
        return found;
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

            this.scene.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    placed.blow();
                }
            })
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

                this.scene.time.addEvent({
                    delay: 1000,
                    loop: false,
                    callback: () => {
                        // Fade out
                        this.scene.player.setState('IDLE');
                    }
                })

            }
            var item_action = item.findInPocketActions(action_string);
            if (item_action == false) {
                return false;
            }
            item_action.requires.forEach(function (requirement) {
                if (requirement.type == 'ITEM' || requirement.type == 'ITEM_KIND') {
                    if (item_action.req_result_data_key != null) {
                        var req_data_key = item_action.req_result_data_key;
                        if (item_action.req_result_data_set != '') {
                            self.scene.manager.dataManager.setData(req_data_key, item_action.req_result_data_set);
                        }
                        if (item_action.req_result_data_modify != '') {
                            self.scene.manager.dataManager.modifyData('BODY', req_data_key, item_action.req_result_data_modify);
                        }
                    }
                    if (requirement.result == 'TRANSFORMED') {
                        var transform_into = item_action.req_result_item;

                        console.log("Transforming " + requirement[requirement.type] + " into " + item_action.req_result_item);

                        /// Get the index for the current pocket
                        /// Get the pocket matching requirement[requirement.type]
                        var requirement_index = self.findInPockets(requirement[requirement.type]);

                        // if the item type is bag, we need to preserve contents
                        var contents = self.getItemsInBag(requirement_index);

                        self.setPocket(requirement_index, 'EMPTY');

                        self.scene.manager.itemManager.newItemToPocket(requirement_index, transform_into);

                        // if the item type is a bag, we need to persist contents
                        if (contents.length > 0) {
                            self.setItemsInBag(requirement_index, contents);
                        }

                    }
                    if (requirement.result == 'CONSUMED') {
                        var consume = self.getPocket(pocketIndex);
                        consume.HOLDS.updateStackCount(-1);
                        // If the item is finished, empty the pocket
                        if (consume.HOLDS.stackCount <= 0) {
                            self.setPocket(pocketIndex, 'EMPTY');
                        }
                    }
                    if (requirement.result == 'DUPLICATED') {
                        var dupe = self.getPocket(pocketIndex);
                        dupe.HOLDS.updateStackCount(1);
                    }
                    if (requirement.result == 'MAILED') {
                        var mailed = self.getPocket(pocketIndex);
                        mail.HOLDS.updateStackCount(-1);
                    }
                    if (requirement.result == 'FILLED') {
                        var fill_with = item_action.req_result_item;
                        console.log("Fill this " + requirement[requirement.type] + " up with " + item_action.req_result_item);
                        self.scene.manager.itemManager.newContentToPocket(pocketIndex, fill_with);
                    }
                }
            });
            this.scene.events.emit('REQ_' + item_action.req_group + '_MET');
            console.log('REQ_' + item_action.req_group + '_MET');

        }
        if (action_result) {
            this.scene.manager.hud.refreshDisplay();
        }
        return action_result;
    }

}