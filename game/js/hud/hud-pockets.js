import HudCommon from "./hud-common.js";
/*
 * Controls the pockets display on the HUD
 */

export default class HudPockets extends HudCommon {

    constructor(scene) {
        super(scene);
    }

    initialize() {
        this.slots = this.addPockets();
        //this.highlight = this.addHighlight();
        this.pocket_textblock = null;
        this.pocket_actions = null;
        this.state = null;
        this.verbose = false;
    }

    setPocketsState(state) {
        /// OPEN, CLOSED
        this.state = state;
        if (this.verbose) (console.log("Setting pockets state to: " + state))
    }

    makeBitmapText(_x, _y, width, text, size, font = "SkeleTalk") {
        let bitmap = this.factory.makeBitmapText(_x, _y, width, size, font);
        bitmap.setText(text);
        bitmap.setLineSpacing(8);
        return bitmap;
    }

    makeIconContents(_x, _y, textureName, frameName) {
        return this.factory.makeIconContents(_x + 8, _y + 8, textureName, frameName);
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

            slots[y][x].slot.setVisible(false);
            slots[y][x].icon.setVisible(false);

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

        let margin = {
            x: 48 + (slot_x * 40),
            y: 16 + (slot_y * 36)
        };

        let icon = this.makeIcon((this.view.right - margin.x), (this.view.top + margin.y), textureName, frameName);

        return icon;
    }

    addIconContents(slot_x, slot_y, textureName, frameName) {

        let margin = {
            x: 48 + (slot_x * 40),
            y: 16 + (slot_y * 36)
        };

        let icon = this.makeIconContents((this.view.right - margin.x), (this.view.top + margin.y), textureName, frameName);

        return icon;
    }

    addHighlight() {
        let highlightMargin = {
            x: this.view.right - 48,
            y: this.view.top + this.view.margin.top,
        };
        let highlight = this.makeBlock(highlightMargin.x, highlightMargin.y,32,32,'BLOCK_SHALLOW_YELLOW_FRAME');
        highlight.setDepth(100250);
        return highlight;
    }

    setHighlight(slot_x, slot_y) {
        let slotMargin = {
            x: 48 + (slot_x * 40),
            y: 16 + (slot_y * 36),
        };
        let highlight = this.highlight;
        highlight.setPosition(this.view.right - slotMargin.x, this.view.top + slotMargin.y);

        highlight.setVisible(true);
        highlight.setFrame('BLOCK_SHALLOW_ORANGE_FRAME');
        this.scene.time.addEvent({
            delay: 250,
            callback: () => {
                highlight.setFrame('BLOCK_SHALLOW_YELLOW_FRAME');
            }
        });
        
        

    }

    addSlot(slot_x, slot_y) {
        let slotMargin = {
            x: 48 + (slot_x * 40),
            y: 16 + (slot_y * 36),
        };
        let slot = this.makeBlock((this.view.right - slotMargin.x), (this.view.top + slotMargin.y));
        this.addSlotInteraction(slot_x, slot_y, slot);
        return slot;
    }

    addSlotInteraction(slot_x, slot_y, block) {

            // Mouse/Touch Input
            block.setInteractive(); 
            var self = this;
            block.on('pointerover', function (pointer) {
                // This function will be called when the coinpurse block is clicked or tapped
                
            });
            block.on('pointerdown', function (pointer) {
                // This function will be called when the slot is clicked or tapped
                if (self.scene.manager.getFocus().name != 'POCKETS') {
                    //self.scene.manager.closeChest();
                    self.scene.manager.setFocus('POCKETS');
                    /// Set a brief timeout to allow focus to be set 
                    self.scene.time.addEvent({
                        delay:50,
                        callback: () => {
                            self.scene.manager.hud.hudInput.setSelectedPocket(slot_x);
                            self.scene.manager.hud.hudInput.setSelectedContents(slot_y);
                            self.refreshDisplay();
                        }
                    });
                    

                }
                else {
                    /// If slot_x is already selected, close pockets instead of selecting contents
                    if (self.scene.manager.hud.hudInput.selected.pocket == slot_x && self.scene.manager.hud.hudInput.selected.contents == slot_y) {
                        self.scene.manager.setFocus('PLAYER');
                        return;
                    }
                    self.scene.manager.hud.hudInput.setSelectedPocket(slot_x);
                            self.scene.manager.hud.hudInput.setSelectedContents(slot_y);
                            self.refreshDisplay();
                }
            });
        
    }

    addArrow(slot_x, slot_y) {
        let slotMargin = {
            x: 48 + (slot_x * 40),
            y: 8 + (slot_y * 40),
        };
        let arrow = this.factory.makeArrow((this.view.right - slotMargin.x), (this.view.top + slotMargin.y));
        arrow.setVisible(false);
        return arrow;
    }

    getArrowPosition(slot_x) {
        let slotMargin = {
            x: 16 + (slot_x * 40),
            y: 8 + (2 * 40),
        };
        let slot = this.slots[2][slot_x].slot;
        return { x: this.view.right - (slot.displayWidth) - (slotMargin.x), y: this.view.top + (slotMargin.y) };
    }

    setContentsIcon(slot_x, new_icon={info: null}) {
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
        let pocket = this.scene.manager.hud.pocket.getPocket(slot_x);
        let type = pocket.TYPE;
        let state = pocket.STATE;
        if (state != 'EMPTY') {
            type = (pocket[state].info.type == 'BAG') ? 'BAG' : 'ITEM';
        }
        if (slot_y < 2) {
            this.slots[slot_y][slot_x].slot.setTexture('UI',type + '_' + status);
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
                this.scene.manager.hud.hudSound.play('ARROW_BOBBLE_SELECT');
                var arrow = this.getArrow(slot_x);
                var pos = this.getArrowPosition(slot_x);
                var tween = this.scene.tweens.add({
                    targets: [arrow],
                    y: '+= 4',
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
                this.scene.manager.hud.hudSound.play('ARROW_SINGLE_SELECT');
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
        let arrow = this.getArrow(slot_x);
        arrow.setTexture('UI','BAG_ARROW_' + status);
    }

    setSlotVisible(slot_x, slot_y, visible) {
        this.slots[slot_y][slot_x].slot.setVisible(visible);
        if (this.slots[slot_y][slot_x].icon != null) {
            this.slots[slot_y][slot_x].icon.setVisible(visible);
        }
    }

    openPockets() {
        if (this.scene.manager.hud.state.name != 'POCKETS_FOCUSED') {
            this.closePockets();
        }
        if (this.state == 'OPEN') {
            return;
        }

        this.scene.manager.hud.hudFocusHints.setKeyTip('POCKETS', true);
        this.setPocketsState('OPEN');
        this.refreshDisplay();
    }

    closePockets() {
        this.scene.manager.hud.hudFocusHints.setKeyTip('POCKETS', false);

        for (let i = 0; i < 3; i++) {
            for (let r = 0; r < 3; r++) {
                if (i == 0) {
                    this.setSlotColor(r, 0, 'UNFOCUSED');
                }
                else {
                    this.setSlotVisible(r, i, false);
                }
            }
        }
        this.clearPocketDisplay();
        this.showDrop(-1);
        this.setSlipsVisible(false);
        this.setPocketsState('CLOSED');
    }

    pocketsVisible(visible) {
        for (let i = 0; i < 3; i++) {
            for (let r = 0; r < 3; r++) {
                this.setSlotVisible(r, i, visible);
            }
        }
    }

    addDrop(slot_x) {
        let slotMargin = {
            x: 48 + (slot_x * 40),
            y: 0
        };

        let block = this.makeBlock(this.view.right - slotMargin.x, this.view.top + (slotMargin.y), 32, 16, 'BLOCK_MID_YELLOW');

        let drop_text = this.makeBitmapText(block.x + 4, block.y + 5, 48, 'DROP', 8, 'SkeleTalk');

        let button_block = this.makeBlock(block.x - 12, block.y, 12, 16, 'BLOCK_MID_ORANGE_LEFT');

        let button_text = this.makeBitmapText(button_block.x + 4, button_block.y + 5, 24, 'X', 8, 'SkeleTalk');

        block.setVisible(false);
        drop_text.setVisible(false);
        button_block.setVisible(false);
        button_text.setVisible(false);

        return {
            block: block,
            text: drop_text,
            button: button_block,
            button_text: button_text
        };
    }

    showDrop(slot_x = -1, selected = false) {
        for (var i = 0; i < 3; i++) {
            if (i != slot_x) {
                this.slots[0][i].drop.block.setVisible(false);
                this.slots[0][i].drop.text.setVisible(false);
                this.slots[0][i].drop.button.setVisible(false);
                this.slots[0][i].drop.button_text.setVisible(false);
            }
            else {
                this.slots[0][i].drop.block.setTexture('UI',selected == true ? 'BLOCK_MID_BEIGE_RIGHT' : 'BLOCK_MID_LILAC');
                if (selected) {
                    this.slots[0][i].drop.button.setVisible(true);
                    this.slots[0][i].drop.button_text.setVisible(true);
                }
                else {
                    this.slots[0][i].drop.button.setVisible(false);
                    this.slots[0][i].drop.button_text.setVisible(false);
                }
                this.slots[0][i].drop.block.setVisible(true);
                this.slots[0][i].drop.text.setVisible(true);
            }
        }
    }

    addStackIndicator(slot_x, slot_y) {
        let slotMargin = {
            x: 20 + (slot_x * 40),
            y: 44 + (slot_y * 36),
        };
        let stack = this.makeStackIndicator((this.view.right - slotMargin.x), (this.view.top + slotMargin.y));
        return stack;
    }


    addSlip(slot_x, text = 'HOLD') {
        const slotMargin = {
            x: 56 + (slot_x * 40),
            y: 64,
        };
        let slip = this.makeSlip(this.view.right - slotMargin.x, this.view.top + (slotMargin.y), text);

        slip.block.setVisible(false);
        slip.text.setVisible(false);
        slip.button.setVisible(false);
        slip.button_text.setVisible(false);
        return slip;
    }

    makeSlip(_x, _y, text = 'HOLD') {
        return this.factory.makeSlip(_x, _y, text);
    }

    clearActions() {
        if (this.pocket_actions != null) {
            this.pocket_actions.forEach(function (action, index) {
                action.block.destroy();
                action.text.destroy();
                action.button.destroy();
                action.button_text.destroy();
            });
        }
    }

    tapSlip(slot_x) {
        if (this.slots[1][slot_x].slip != null) {
            this.slots[1][slot_x].slip.block.setFrame('BLOCK_SHALLOW_BLUE_RIGHT');

            this.scene.time.addEvent({
                delay: 125,
                callback: () => {
                    this.slots[1][slot_x].slip.block.setFrame('BLOCK_MID_YELLOW_RIGHT');
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
            x: 42 + (slot_x * 40),
            y: 56 + (action_y * 16),
        };

        let slip_text = this.scene.add.bitmapText(this.view.right - slotMargin.x, this.view.top + slotMargin.y, 'SkeleTalk', action, 8).setOrigin(0).setScrollFactor(0).setDepth(100200).setTintFill(0x465e62).setLineSpacing(11);

        let block = this.makeBlock(slip_text.x - 6, slip_text.y - 5, slip_text.displayWidth + 12, 16, (selected ? 'BLOCK_MID_BEIGE_RIGHT' : 'BLOCK_MID_YELLOW'));
        block.setOrigin(0);

        let button_block = this.makeBlock(block.x - 12, block.y, 12, 16, 'BLOCK_MID_ORANGE_LEFT');
        button_block.setOrigin(0);
        let button_text = this.scene.add.bitmapText(button_block.x + 3, button_block.y + 5, 'SkeleTalk', 'X', 8).setOrigin(0).setScrollFactor(0).setDepth(100200).setTintFill(0x465e62).setLineSpacing(11);

        if (!selected) {
            button_block.setVisible(false);
            button_text.setVisible(false);
        }
        return {
            block: block,
            text: slip_text,
            button: button_block,
            button_text: button_text
        };
    }

    setSlipVisible(slot_x, visible) {
        if (this.slots[1][slot_x].slip != null) {
            this.slots[1][slot_x].slip.block.setVisible(visible);
            this.slots[1][slot_x].slip.text.setVisible(visible);
            this.slots[1][slot_x].slip.button.setVisible(visible);
            this.slots[1][slot_x].slip.button_text.setVisible(visible);
        }
    }

    setSlipsVisible(visible) {
        for (let i = 0; i < 3; i++) {
            this.setSlipVisible(i, visible);
        }
    }

    setItemActionVisible(slot_x, visible) {
        if (this.slots[0][slot_x].actions != null) {
            this.slots[0][slot_x].actions.setVisible(visible);
        }
    }

    setItemActionsVisible(visible) {
        for (var i = 0; i < 3; i++) {
            if (this.slots[0][i].actions != null) {
                this.slots[0][i].actions.setVisible(visible);
            }
        }

    }

    clearPocketDisplay() {
        this.clearActions();
        this.destroyPocketTextBlock();
        if (this.pocket_icon_tween != null) {
            this.pocket_icon_tween.stop();
            this.pocket_icon_tween = null;
        }
    }


    refreshDisplay() {
        this.clearPocketDisplay();
        const selected = this.scene.manager.hud.hudInput.selected;
        for (let i = 0; i < 3; i++) {
            let slot_y = i;
            for (let r = 0; r < 3; r++) {
                var pocket = this.scene.manager.hud.pocket.getPocket(r); // new HudPocket Obj?

                let slot_x = r;
                var state = pocket.STATE;
                var color = 'FOCUSED';

                this.setSlotColor(r, i, color);
                if (state != 'EMPTY' && selected.pocket == r && pocket[state].info.type == 'BAG') {
                    this.setSlotVisible(r, i, true);
                    //this.setSlotColor(r, i, color);
                    if (selected.contents == 1) {
                        this.setSlipVisible(slot_x, true);
                    }
                    else {
                        this.setSlipVisible(slot_x, false);
                    }

                    if (pocket[state].items.length > 0) {
                        this.setContentsIcon(r, pocket[state].items[0]);
                    }
                    else {
                        this.setSlipVisible(r, false);
                        this.setContentsIcon(r, { info: null });
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

                if (state != 'EMPTY' && selected.pocket == r && pocket[state].info.type != 'BAG' && i == 0) {
                    /// It's an item that has actions
                    this.pocket_actions = this.drawActions(r, selected.actions, pocket[state].getPocketActions());

                    this.setPocketTextBlock(pocket[state].info.description);

                }


                if (state != 'EMPTY' && selected.pocket == r && pocket[state] != null && i == 0) {
                    /// It's an item that can be dropped
                    var pocket_drop = (selected.actions == -1 || selected.contents == -1);
                    this.showDrop(r, pocket_drop);

                }
                if (state == 'EMPTY' && selected.pocket == r && i == 0) {
                    /// hide drop
                    this.showDrop(-1);
                }


                if (selected.pocket == r && selected.contents == i) {
                    this.setSlotColor(r, i, 'SELECTED');
                    //this.setHighlight(r,i);
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
                        this.slots[slot_y][slot_x].stack.circle.setVisible(false);
                        this.slots[slot_y][slot_x].stack.text.setVisible(false);
                    }
                }
                else {
                    var frameName = pocket[state].getStackIcon();

                    if (this.slots[slot_y][slot_x].stack != undefined) {
                        this.slots[slot_y][slot_x].stack.text.setVisible(pocket[state].stackCount > 1);
                        this.slots[slot_y][slot_x].stack.circle.setVisible(pocket[state].stackCount > 1);

                        if (pocket[state].stackCount > 1) {
                            this.slots[slot_y][slot_x].stack.text.setText(pocket[state].stackCount);
                        }
                    }
                }


                if (this.slots[slot_y][slot_x].icon != null && slot_y == 0) {
                    this.slots[slot_y][slot_x].icon.destroy();
                    this.slots[slot_y][slot_x].icon = this.addIcon(slot_x, slot_y, state, frameName);

                    if (selected.pocket == r && selected.contents == i && this.state == 'OPEN') {
                    /// Get the icon for this slot and bobble it
                        this.pocket_icon_tween = this.scene.tweens.add({
                            targets: [this.slots[slot_y][slot_x].icon],
                            y: '-=3',
                            duration: 400,
                            ease: 'Sine.easeIn',
                            loop: -1,
                            yoyo: true
                        });
                    }

                    if (this.slots[slot_y][slot_x].icon_contents != null) {
                        this.slots[slot_y][slot_x].icon_contents.destroy();
                        this.slots[slot_y][slot_x].icon_contents = null;
                    }


                    if (state != 'EMPTY' && pocket[state].hasContents()) {
                        this.slots[slot_y][slot_x].icon_contents = this.addIcon(slot_x, slot_y, 'ITEMS', pocket[state].items[0].getStackIcon());
                    }
                }

            }
        }
        if (this.state != 'OPEN') {
            this.closePockets();
        }
        this.refreshPocketActions(selected.pocket);
    }

    refreshPocketActions(slot_x) {
        var pocket = this.scene.manager.hud.pocket.getPocket(slot_x);
        var state = pocket.STATE;
        if (state != 'EMPTY' && pocket[state].info.type != 'BAG') {
            /// It's an item that has actions
            pocket[state].getPocketActions(true);
        }
    }


    addPocketTextBlock() {
        let margin = {
            x: 8,
            y: this.view.margin.top + 72,
        };
        let display_width = 180;

        let text = this.makeBitmapText((this.view.right - display_width) - margin.x, this.view.top + margin.y, display_width - 16, '', 8, 'SkeleTalk');

        return { text: text };
    }

    setPocketTextBlock(description) {
        this.destroyPocketTextBlock();

        if (description != '') {
            this.pocket_textblock = this.addPocketTextBlock();

            this.pocket_textblock.text.setText(description);

            let text_height = this.pocket_textblock.text.getTextBounds().local.height;

            //let text_width = this.pocket_textblock.text.getTextBounds().local.width;
            let display_width = 180;

            
            this.pocket_textblock.block = this.makeBlock(this.pocket_textblock.text.x - 8, this.pocket_textblock.text.y - 12, display_width, text_height + 24, 'BLOCK_MID_BEIGE_BORDER');

            this.pocket_textblock.frame = this.makeBlock(this.pocket_textblock.text.x - 8, this.pocket_textblock.text.y - 12, display_width, text_height + 24, 'BLOCK_SHALLOW_ORANGE_EDGE_FRAME');
            
            this.pocket_textblock.text.setVisible(true);
        }
    }

    destroyPocketTextBlock() {
        if (this.pocket_textblock != null) {
            this.pocket_textblock.block.destroy();
            this.pocket_textblock.text.destroy();
            this.pocket_textblock.frame.destroy();
            this.pocket_textblock = null;
        }
    }
}