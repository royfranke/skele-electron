/*
 * Controls the pockets display on the HUD
 */

export default class HudPockets {

    constructor(scene, factory) {
        this.scene = scene;
        this.factory = factory;
        this.view = this.scene.manager.getView();
        this.slots = this.addPockets();
        this.pocket_textblock = this.addPocketTextBlock();
        this.pocket_actions = null;
        this.item_actions = this.scene.add.group();
    }

    makeBlock(_x, _y, width = 32, height = 32, frameName = 'HAND_UNFOCUSED') {
        return this.factory.makeBlock(_x, _y, width, height, frameName);
    }

    makeIcon(_x, _y, textureName, frameName) {
        return this.factory.makeIcon(_x + 8, _y + 8, textureName, frameName);
    }

    makeIconContents(_x, _y, textureName, frameName) {
        return this.factory.makeIconContents(_x + 8, _y + 8, textureName, frameName);
    }

    addFX(fx_slug, _x, _y, delay = 0) {
        var fx = this.scene.manager.fx.playFX(fx_slug, _x, _y, delay);
        fx.setDepth(100200).setScrollFactor(0);
    }

    addPocketTextBlock () {
        const margin = {
            x: 24,
            y: 16 + (2*40),
        };
        var display_width = 104;

        return this.scene.add.dom((this.view.right - display_width) - (margin.x), this.view.top + (margin.y), 'div', {'max-width':display_width+'px'}, '').setClassName('pocket-textblock').setOrigin(0).setScrollFactor(0).setVisible(false);

    }

    addPockets() {
        var slots = [[], [], []];
        for (var x = 0; x < 3; x++) {
            var y = 0;
            slots[y][x] = {
                slot: this.addSlot(x, y, 'blue'),
                icon: this.addIcon(x, y, 'UI', 'EMPTY_SYMBOL'),
                icon_contents: null,
                stack: this.addStackIndicator(x, y),
                drop: this.addDrop(x),
            };
            y = 1;
            slots[y][x] = {
                slot: this.addSlot(x, y, 'silver'),
                icon: this.addIcon(x, y, 'UI', 'EMPTY_SYMBOL'),
                icon_contents: null,
                slip: this.addSlip(x, 'HOLD')
            };

            y = 2;
            slots[y][x] = {
                slot: this.addArrow(x, y, 'FOCUSED'),
                icon: null
            };

        }
        return slots;
    }

    addIcon(slot_x, slot_y, textureName, frameName) {

        if (textureName == 'EMPTY') {
            textureName = 'UI';
        }
        else if (frameName == 'EMPTY_SYMBOL') {
            textureName = 'UI';
        }
        else {
            textureName = 'ITEMS';
        } 
    

        var margin = {
            x: 48 + (slot_x * 40),
            y: 16 + (slot_y * 36)
        };

        let icon = this.makeIcon((this.view.right - margin.x), (this.view.top + margin.y), textureName, frameName);

        return icon;
    }

    addIconContents(slot_x, slot_y, textureName, frameName) {

        var margin = {
            x: 48 + (slot_x * 40),
            y: 16 + (slot_y * 36)
        };

        let icon = this.makeIconContents((this.view.right - margin.x), (this.view.top + margin.y), textureName, frameName);

        return icon;
    }

    addSlot(slot_x, slot_y) {
        let slotMargin = {
            x: 48 + (slot_x * 40),
            y: 16 + (slot_y * 36),
        };
        let slot = this.makeBlock((this.view.right - slotMargin.x), (this.view.top + slotMargin.y));
        return slot;
    }

    addArrow(slot_x, slot_y) {
        const slotMargin = {
            x: 48 + (slot_x * 40),
            y: 8 + (slot_y * 40),
        };
        let arrow = this.factory.makeArrow((this.view.right - slotMargin.x), (this.view.top + slotMargin.y));
        arrow.setScrollFactor(0);
        return arrow;
    }

    getArrowPosition(slot_x) {
        const slotMargin = {
            x: 16 + (slot_x * 40),
            y: 8 + (2 * 40),
        };
        var slot = this.slots[2][slot_x].slot;
        return { x: this.view.right - (slot.displayWidth) - (slotMargin.x), y: this.view.top + (slotMargin.y) };
    }

    setContentsIcon(slot_x, new_icon) {

        if (this.slots[1][slot_x].icon != null) {
            this.slots[1][slot_x].icon.destroy();
            if (this.slots[1][slot_x].icon_contents != null) {
                this.slots[1][slot_x].icon_contents.destroy();
            }
            if (new_icon.info != null) {
                this.slots[1][slot_x].icon = this.addIcon(slot_x, 1, 'ITEMS', new_icon.getStackIcon());
                if (new_icon.hasContents()) {
                    this.slots[1][slot_x].icon_contents = this.addIconContents(slot_x, 1, 'ITEMS', new_icon.items[0].getStackIcon());
                }
            }
            else {
                this.slots[1][slot_x].icon = this.addIcon(slot_x, 1, 'UI', 'EMPTY_SYMBOL');
            }
        }
    }

    setSlotColor(slot_x, slot_y, status = 'UNFOCUSED') {
        var pocket = this.scene.manager.hud.pocket.getPocket(slot_x);
        console.log(pocket);
        var type = pocket.TYPE;
        var state = pocket.STATE;
        if (state != 'EMPTY') {
            type = (pocket[state].info.type == 'BAG') ? 'BAG' : 'ITEM';
        }
        if (slot_y < 2) {
            this.slots[slot_y][slot_x].slot.setFrame(type + '_' + status);
        }
        else {
            this.setArrowColor(slot_x, status);
        }
    }

    getArrow(slot_x) {
        return this.slots[2][slot_x].slot;
    }

    arrowDown(slot_x) {
        var pocket = this.scene.manager.hud.pocket.getPocket(slot_x);
        var state = pocket.STATE;
        if (state != 'EMPTY' && pocket[state].info.type == 'BAG') {
            if (pocket[state].items.length > 1) {
                pocket[state].nextItem();
                var sound_var = Phaser.Math.RND.between(1, 3);
                this.scene.manager.hud.hudSound.play('BAG_RUMMAGE_' + sound_var);
                var arrow = this.getArrow(slot_x);
                var pos = this.getArrowPosition(slot_x);
                var tween = this.scene.tweens.add({
                    targets: [arrow],
                    y: pos.y + 4,
                    x: pos.x,
                    duration: 100,
                    ease: 'Sine.easeIn',
                    loop: 0,
                    yoyo: true,
                });
                tween.on('complete', () => {
                    this.scene.manager.hud.hudInput.setSelectedContents(-1);
                    this.refreshDisplay();
                    var new_item = this.slots[1][slot_x].icon;
                    this.scene.tweens.add({
                        targets: [new_item],
                        y: new_item.y - 2,
                        x: new_item.x,
                        duration: 250,
                        ease: 'Sine.easeIn',
                        loop: 0,
                        yoyo: true,
                    });
                });

            }
            else { // Only one item in bag
                //var sound_var = Phaser.Math.RND.between(1,3);
                //this.scene.manager.hud.hudSound.play('SKELE_INVALID_'+sound_var); replace with more subtle
                var arrow = this.getArrow(slot_x);
                var pos = this.getArrowPosition(slot_x);
                var tween = this.scene.tweens.add({
                    targets: [arrow],
                    x: pos.x - 1,
                    duration: 100,
                    ease: 'Sine.easeIn',
                    loop: 1,
                    yoyo: true,
                });
                tween.on('complete', () => {
                    this.scene.manager.hud.hudInput.setSelectedContents(-1);
                    this.refreshDisplay();

                });
            }

        }
    }

    setArrowColor(slot_x, status) {
        var arrow = this.getArrow(slot_x);
        arrow.setFrame('BAG_ARROW_' + status);
    }

    setSlotVisible(slot_x, slot_y, visible) {
        this.slots[slot_y][slot_x].slot.setVisible(visible);
        if (this.slots[slot_y][slot_x].icon != null) {
            this.slots[slot_y][slot_x].icon.setVisible(visible);

        }
    }

    openPockets() {
        this.scene.manager.hud.hudFocusHints.setKeyTip('POCKETS', true);
    }

    closePockets() {
        this.pocket_textblock.setVisible(false);
        for (var r = 0; r < 3; r++) {
            var pocket = this.scene.manager.hud.pocket.getPocket(r); // new HudPocket Obj?

            this.setSlotColor(r, 0, 'UNFOCUSED');
        }
        for (var i = 1; i < 3; i++) {
            for (var r = 0; r < 3; r++) {
                this.setSlotVisible(r, i, false);
            }
        }
        this.clearActions();
        this.showDrop(-1);
        this.setSlipsVisible(false);
        this.scene.manager.hud.hudFocusHints.setKeyTip('POCKETS', false);
        //this.changeFocus();
    }

    pocketsVisible(visible) {
        for (var i = 0; i < 3; i++) {
            for (var r = 0; r < 3; r++) {
                this.setSlotVisible(r, i, visible);
                //this.refreshDisplay();
            }
        }
    }

    addDrop(slot_x, selected = false) {
        let slotMargin = {
            x: 48 + (slot_x * 40),
            y: 0,
        };
        return this.scene.add.dom(
            this.view.right - slotMargin.x,
            this.view.top + (slotMargin.y),
            'div',
            '',
            'DROP').setClassName(selected == true ? 'select-slip' : 'select-slip-not-selected').setOrigin(0).setScrollFactor(0);
    }

    showDrop(slot_x=-1,selected=false) {
        for (var i = 0; i < 3; i++) {
            if (i != slot_x) {
                this.slots[0][i].drop.setVisible(false);
            }
            else {
                this.slots[0][i].drop.setClassName(selected == true ? 'select-slip' : 'select-slip-not-selected')
                this.slots[0][i].drop.setVisible(true);
            }
        }
    }

    addStackIndicator(slot_x, slot_y) {
        let slotMargin = {
            x: 26 + (slot_x * 40),
            y: 38 + (slot_y * 36),
        };
        return this.makeStackIndicator((this.view.right - slotMargin.x), (this.view.top + slotMargin.y));
    }

    makeStackIndicator(_x, _y) {
        return this.factory.makeStackIndicator(_x, _y);
    }

    addSlip(slot_x, text = 'HOLD') {
        const slotMargin = {
            x: 24 + (slot_x * 40),
            y: 64,
        };
        let slip = this.makeSlip(this.view.right - slotMargin.x, this.view.top + (slotMargin.y), text);
        return slip.setScrollFactor(0).setVisible(false);
    }

    makeSlip(_x, _y, text = 'HOLD') {
        return this.scene.add.dom(_x, _y, 'div', '', text).setClassName('select-slip').setOrigin(1, 0);
    }

    clearActions() {
        if (this.pocket_actions != null) {
            this.pocket_actions.forEach(function (action, index) {
                action.destroy();
            });
        }
    }

    tapSlip(slot_x) {
        if (this.slots[1][slot_x].slip != null) {
            this.slots[1][slot_x].slip.setClassName('select-slip button-tap');

            this.scene.time.addEvent({
                delay: 125,
                callback: ()=>{
                    this.slots[1][slot_x].slip.setClassName('select-slip');
                }
            });
        }
    }

    drawActions(slot_x, selected, actions) {

        var item_actions = [];
        const self = this;
        actions.forEach(function (action, index) {
            var current_selection = (selected == index);
            var element = self.itemAction(slot_x, index, current_selection, action);
            item_actions.push(element);
        });
        return item_actions;

    }

    itemAction(slot_x, action_y, selected, action) {
        const slotMargin = {
            x: 48 + (slot_x * 40),
            y: 56 + (action_y * 16),
        };
        var right = this.view.right;
        return this.scene.add.dom(right - slotMargin.x, this.view.top + (slotMargin.y), 'div', '', action).setClassName(selected == true ? 'select-slip' : 'select-slip-not-selected').setOrigin(0).setScrollFactor(0);
    }

    setSlipVisible(slot_x, visible) {
        if (this.slots[1][slot_x].slip != null) {
            this.slots[1][slot_x].slip.setVisible(visible);
            if (visible) {
                var slotMargin = {
                    x: this.view.right - (24 + (slot_x * 40)),
                    y: this.view.top + 64,
                };
                this.slots[1][slot_x].slip.setPosition(slotMargin.x, slotMargin.y);
            }
        }
    }

    setSlipsVisible(visible) {
        for (var i = 0; i < 3; i++) {
            this.setSlipVisible(i, visible);
        }
    }

    setItemActionVisible (slot_x, visible) {
        if (this.slots[0][slot_x].actions != null) {
            this.slots[0][slot_x].actions.setVisible(visible);
        }
    }

    setItemActionsVisible (visible) {
        for (var i=0;i<3;i++) {
            if (this.slots[0][i].actions != null) {
                this.slots[0][i].actions.setVisible(visible);
            }
        }
        
    }



    refreshDisplay () {
        this.clearActions();
        this.pocket_textblock.setVisible(false);
        const selected = this.scene.manager.hud.hudInput.selected;
        for (let i=0;i<3;i++) {
            let slot_y = i;
            for (let r=0;r<3;r++) {
                var pocket = this.scene.manager.hud.pocket.getPocket(r); // new HudPocket Obj?

                let slot_x = r;
                var state = pocket.STATE;
                var color = 'FOCUSED';
                
                this.setSlotColor(r, i, color);
                if (state != 'EMPTY' && selected.pocket == r && pocket[state].info.type == 'BAG') {
                    this.setSlotVisible(r, i, true);
                    //this.setSlotColor(r, i, color);
                    if (selected.contents == 1) {
                        this.setSlipVisible(slot_x,true);
                    }
                    else {
                        this.setSlipVisible(slot_x,false);
                    }

                    if (pocket[state].items.length > 0) {
                        this.setContentsIcon(r,pocket[state].items[0]);
                    }
                    else {
                        this.setSlipVisible(r,false);
                        this.setContentsIcon(r,{info:null});
                    }
                    
                }
                else {
                    if (i > 0) {
                        this.setSlotVisible(r, i, false);
                    }
                }
                if (state != 'EMPTY' && selected.pocket != r && pocket[state].info.type == 'BAG') {
                    this.setSlipVisible(r, false);
                }
                this.item_actions.clear();
                if (state != 'EMPTY' && selected.pocket == r && pocket[state].info.type != 'BAG' && i == 0) {
                    /// It's an item that has actions
                    this.pocket_actions = this.drawActions(r,selected.actions,pocket[state].actions);
                    if (pocket[state].info.description != '') {
                        this.pocket_textblock.setText(pocket[state].info.description);
                        this.pocket_textblock.setVisible(true);
                    }
                }

                
                if (state != 'EMPTY' && selected.pocket == r && pocket[state] != null && i == 0) {
                    /// It's an item that can be dropped
                    var pocket_drop = (selected.actions == -1 || selected.contents == -1);
                    this.showDrop(r,pocket_drop);
                
                }
                if (state == 'EMPTY' && selected.pocket == r && i == 0) {
                    /// hide drop
                    this.showDrop(-1);
                }
                

                if (selected.pocket == r && selected.contents == i) {
                    this.setSlotColor(r, i, 'SELECTED');
                    if (state == 'EMPTY') {
                        //this.setPocketTip(pocket[state].NAME);
                    }
                    else {
                        //this.setPocketTip(pocket[state].name);
                    }
                }
                
                if (state == 'EMPTY') {
                    var frameName = pocket[state].ICON;
                    
                    if (this.slots[slot_y][slot_x].stack != undefined) {
                        this.slots[slot_y][slot_x].stack.setVisible(false);
                    }
                }
                else {
                    var frameName = pocket[state].getStackIcon();
                    
                    if (this.slots[slot_y][slot_x].stack != undefined) {
                        this.slots[slot_y][slot_x].stack.setVisible(pocket[state].stackCount > 1);

                        if (pocket[state].stackCount > 1) {
                            this.slots[slot_y][slot_x].stack.setText(pocket[state].stackCount);
                        }
                    }
                }


                if (this.slots[slot_y][slot_x].icon != null && slot_y == 0) {
                    this.slots[slot_y][slot_x].icon.destroy();
                    this.slots[slot_y][slot_x].icon = this.addIcon(slot_x, slot_y, state, frameName);


                    if (this.slots[slot_y][slot_x].icon_contents != null) {
                        this.slots[slot_y][slot_x].icon_contents.destroy();
                        this.slots[slot_y][slot_x].icon_contents = null;
                    }


                    if (state != 'EMPTY' && pocket[state].hasContents()) {
                        this.slots[slot_y][slot_x].icon_contents = this.addIconContents(slot_x, slot_y, 'ITEMS', pocket[state].items[0].getStackIcon());
                    }
                }
                
            }
        }
        this.scene.manager.hud.stateChanged();
    }
}