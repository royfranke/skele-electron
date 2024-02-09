import STATES from "../config/hud-states.js";
/* global Phaser */
/*
 * Gets injected into the game scene
 */

export default class HudDisplay {


    constructor(scene,view) {
       this.scene = scene;
       
       this.scene.textures.get('BLOCK');
       this.scene.textures.get('POCKET_BLOCK');
       this.scene.textures.get('POCKET_ARROW');
       this.scene.textures.get('BLOCK_ARROW');
       this.scene.textures.get('EMPTY');
       this.scene.textures.get('ITEMS');
       this.pocket_actions = null;
       this.view = view;
       this.valid_states = STATES;
       this.pocket_textblock = this.addPocketTextBlock();
       this.slots = this.initializeSlots();
       this.drop = null;
       this.currentDialog = false;
       this.item_actions = this.scene.add.group();

       this.margin = {
            top: 16,
            right: 16,
            bottom: 16,
            left:16,
       };

       this.focusHints = [
            {
                char: 'I',
                focus: 'POCKETS',
                x: (this.view.right - (4*38)),
                y: this.view.top + 24
            },
        ];

        this.coinpurseStyle = {
            default: {
                'background-color': '#ccc890',
                'border': '1px solid',
                'color': '#465e62',
                'padding': '2px 4px',
                'border-radius': '4px',
                font: '12px defaultFont',
            },
            positive: {
                'background-color': '#d8ffb7',
                'border': '1px solid #74b453',
                'color': '#465e62',
                'padding': '2px 4px',
                'border-radius': '4px',
                font: '12px defaultFont',
            },
            negative: {
                'background-color': '#f8c7cf',
                'border': '1px solid #fc5c46',
                'color': '#465e62',
                'padding': '2px 4px',
                'border-radius': '4px',
                font: '12px defaultFont',
            },
            missing: {
                'background-color': '#c4d7e3',
                'border': '1px solid #465e62',
                'color': '#465e62',
                'padding': '2px 4px',
                'border-radius': '4px',
                font: '12px defaultFont',
            }
        };

        this.coinPurse = {
            block: null,
            icon: null,
            display: null
        };

        this.watch = {
            block: null,
            icon: null,
            display: null
        };
        this.coinPurseUI = null;
        this.addCoinPurse(); 
        this.addWatch(); 
        this.makeFocusHints();
        this.addMapBox();
        this.tellDialogBox('Telling.');
    }

    newPocketTip (message,duration=0) {
        var tip = this.addPocketTip(message);
        
        if (duration > 0) {
            setTimeout(() => {
                tip.destroy();
            }, duration);
        }
        return tip;
    }

    initializeSlots () {
        var slots = [[],[],[]];
            for (var x=0;x<3;x++) {
                var y = 0;
                slots[y][x] = {
                    slot: this.addSlot(x,y,'blue'),
                    icon: this.addIcon(x,y,'EMPTY','empty'),
                    item: null
                };
                y = 1;
                slots[y][x] = {
                    slot: this.addSlot(x,y,'silver'),
                    icon: this.addIcon(x,y,'EMPTY','empty'),
                    item: null,
                    slip: this.addSlip(x,'HOLD')
                };
                
                y = 2;
                slots[y][x] = {
                    slot: this.addArrow(x,y,'FOCUSED'),
                    icon: null
                };

                
            }   
        return slots;
    }

    refreshDisplay () {
        this.clearActions();
        this.pocket_textblock.setVisible(false);
        const selected = this.scene.manager.hud.hudInput.selected;
        for (var i=0;i<3;i++) {
            var slot_y = i;
            for (var r=0;r<3;r++) {
                var pocket = this.scene.manager.hud.pocket.getPocket(r); // new HudPocket Obj?

                var slot_x = r;
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

                    if (pocket[state].info.items.length > 0) {
                        this.setContentsIcon(r,pocket[state].info.items[0]);
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
                    this.drawDrop(r,pocket_drop);
                
                }
                if (state == 'EMPTY' && selected.pocket == r && i == 0) {
                    this.destroyDrop();
                }
                

                if (selected.pocket == r && selected.contents == i) {
                    this.setSlotColor(r, i, 'SELECTED');
                    if (state == 'EMPTY') {
                        //this.setPocketTip(pocket[state].NAME);
                    }
                    else {
                        //this.setPocketTip(pocket[state].info.name);
                    }
                }
                
                if (state == 'EMPTY') {
                    var frameName = pocket[state].ICON;
                }
                else {
                    var frameName = pocket[state].info.icon;
                }
                
                if (this.slots[slot_y][slot_x].icon != null && slot_y == 0) {
                    this.slots[slot_y][slot_x].icon.destroy();
                    this.slots[slot_y][slot_x].icon = this.addIcon(slot_x, slot_y, state, frameName)
                }
                
            }
        }
        this.scene.manager.hud.stateChanged();
    }

    destroyDrop () {
        if (this.drop != null) {
            this.drop.destroy();
            this.drop = null;
        }
    }

    clearActions () {
        if (this.pocket_actions != null) {
            this.pocket_actions.forEach(function (action, index) {
                action.destroy();
            });
        }
    }

    drawActions (slot_x,selected,actions) {
        
        var item_actions = [];
        const self = this;
        actions.forEach(function (action, index) {
            var current_selection = (selected == index);
            var element = self.itemAction(slot_x,index,current_selection,action);
            item_actions.push(element);
        });
        return item_actions;

    }

    drawDrop (slot_x,selected) {
        if (this.drop != null) {
            this.drop.destroy();
            this.drop = null;
        }
        const slotMargin = {
            x: 48 + (slot_x*40),
            y: 0,
        };
        var right = this.view.right;
        this.drop = this.scene.add.dom(right - slotMargin.x, this.view.top + (slotMargin.y), 'div', '', 'DROP').setClassName(selected == true ? 'select-slip' : 'select-slip-not-selected' ).setOrigin(0).setScrollFactor(0);

    }

    itemAction (slot_x,action_y, selected, action) {
            const slotMargin = {
                x: 48 + (slot_x*40),
                y: 56 + (action_y*16),
            };
            var right = this.view.right;
            return this.scene.add.dom(right - slotMargin.x, this.view.top + (slotMargin.y), 'div', '', action).setClassName(selected == true ? 'select-slip' : 'select-slip-not-selected' ).setOrigin(0).setScrollFactor(0);
    }

    setContentsIcon (slot_x, new_icon) {
        
        if (this.slots[1][slot_x].icon != null) {
            this.slots[1][slot_x].icon.destroy();
            if (new_icon.info != null) {
                this.slots[1][slot_x].icon = this.addIcon(slot_x, 1, new_icon.info.use, new_icon.info.icon);
            }
            else {
                this.slots[1][slot_x].icon = this.addIcon(slot_x, 1, 'EMPTY','empty');
            }
        }
    }

    tapSlip (slot_x) {
        if (this.slots[1][slot_x].slip != null) {
            this.slots[1][slot_x].slip.setClassName('select-slip button-tap');
            setTimeout(() => {
                this.slots[1][slot_x].slip.setClassName('select-slip');
            }, 100);
        }
    }

    addSlip (slot_x, text='HOLD') {
        const slotMargin = {
            x: 24 + (slot_x*40),
            y: 64,
        };
        var right = this.view.right;
        const slip =  this.scene.add.dom(right - slotMargin.x, this.view.top + (slotMargin.y), 'div', '', text).setClassName('select-slip').setOrigin(1,0).setScrollFactor(0).setVisible(false);
        return slip;
    }

    addPocketTip (message) {
        const tip =  this.scene.add.dom(this.view.right + 32, this.view.top, 'div', '', message).setClassName('pocket-tip').setOrigin(1,0).setScrollFactor(0);
        return tip;
    }

    setSlipVisible (slot_x, visible) {
        if (this.slots[1][slot_x].slip != null) {
            this.slots[1][slot_x].slip.setVisible(visible);
        }
    }

    setSlipsVisible (visible) {
        for (var i=0;i<3;i++) {
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


    setSlotColor (slot_x, slot_y, status='UNFOCUSED') {
        var pocket = this.scene.manager.hud.pocket.getPocket(slot_x);

        var type = pocket.TYPE;
        var state = pocket.STATE;
        if (state != 'EMPTY') {
            type = (pocket[state].info.type == 'BAG') ? 'BAG' : 'ITEM';
        }
        if (slot_y < 2) {
            this.slots[slot_y][slot_x].slot.setFrame(type+'_'+status);
        }
        else {
            this.setArrowColor(slot_x,status);
        }
    }

    getArrow (slot_x) {
        return this.slots[2][slot_x].slot;
    }

    arrowDown (slot_x) {
        var pocket = this.scene.manager.hud.pocket.getPocket(slot_x);
        var state = pocket.STATE;
        if (state != 'EMPTY') {
            if (pocket[state].info.type == 'BAG') {
                pocket[state].nextItem();
            }
        }
        
        var arrow = this.getArrow(slot_x);
        var pos = this.getArrowPosition(slot_x);
        this.scene.tweens.add({
            targets: [ arrow ],
            y: pos.y + 4,
            x: pos.x,
            duration: 100,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: true,
        });
    }

    setArrowColor (slot_x, status) {
        var arrow = this.getArrow(slot_x);
        arrow.setFrame('BAG_ARROW_'+status);
    }

    setSlotVisible (slot_x, slot_y, visible) {
        this.slots[slot_y][slot_x].slot.setVisible(visible);
        if (this.slots[slot_y][slot_x].icon != null) {
            this.slots[slot_y][slot_x].icon.setVisible(visible);

        }
    }

    addPocketTextBlock () {
        const margin = {
            x: 24,
            y: 16 + (2*40),
        };
        var display_width = 104;

        return this.scene.add.dom((this.view.right - display_width) - (margin.x), this.view.top + (margin.y), 'div', {'max-width':display_width+'px'}, '').setClassName('pocket-textblock').setOrigin(0).setScrollFactor(0).setVisible(false);

    }

    addSlot (slot_x, slot_y) {
        let slot = this.scene.add.image(0,0, 'POCKET_BLOCK', 'HAND_UNFOCUSED').setOrigin(0);
        slot.setScrollFactor(0);
        slot.setDepth(100000);
        const slotMargin = {
            x: 16 + (slot_x*40),
            y: 16 + (slot_y*36),
        };
        slot.setPosition((this.view.right - slot.displayWidth) - (slotMargin.x), this.view.top + (slotMargin.y));
        return slot;
    }

    addArrow (slot_x, slot_y, status) {
        let slot = this.scene.add.image(0,0, 'POCKET_ARROW', 'BAG_ARROW_'+status).setOrigin(0);
        slot.setScrollFactor(0);
        slot.setDepth(100000);
        const slotMargin = {
            x: 16 + (slot_x*40),
            y: 8 + (slot_y*40),
        };
        slot.setPosition((this.view.right - slot.displayWidth) - (slotMargin.x), this.view.top + (slotMargin.y));
        return slot;
    }

    getArrowPosition (slot_x) {
        const slotMargin = {
            x: 16 + (slot_x*40),
            y: 8 + (2*40),
        };
        var slot = this.slots[2][slot_x].slot;
        return {x: this.view.right - (slot.displayWidth) - (slotMargin.x), y: this.view.top + (slotMargin.y)};
    }

    popCoin (amount_string,status='default') {
        this.tellCoinpurse(amount_string,750,status);
        this.coinPurse.icon.setFrame('COINPURSE_pop');
        setTimeout(() => {
            this.coinPurse.icon.setFrame('COINPURSE_closed');
        }, 250);
    }

    addCoinPurse () {
        let _x = this.view.left + 16;
        let _y = this.view.top + 16;
        this.coinPurse.block = this.scene.add.image(_x,_y, 'POCKET_BLOCK', 'BAG_FOCUSED').setOrigin(0).setScrollFactor(0).setDepth(100000);
        this.coinPurse.icon = this.scene.add.image(_x + 8,_y + 8, 'COINPURSE', 'COINPURSE_closed').setOrigin(0).setScrollFactor(0).setDepth(100001);
    }

    addWatch () {
        let _x = this.view.left + 56;
        let _y = this.view.top + 16;
        this.watch.block = this.scene.add.image(_x,_y,  'POCKET_BLOCK', 'ITEM_FOCUSED').setOrigin(0).setScrollFactor(0).setDepth(100000);
        this.watch.icon = this.scene.add.image(_x + 8,_y + 8, 'ITEMS', 'DIGITAL_WATCH').setOrigin(0).setScrollFactor(0).setDepth(100001);
    }


    addIcon (slot_x, slot_y, textureName, frameName) {
        if (textureName != 'EMPTY') {
            textureName = 'ITEMS';
        }
        let icon = this.scene.add.image(0,0, textureName,frameName).setOrigin(0);
        icon.setScrollFactor(0);
        icon.setDepth(100100);
        var margin = {
            x: 24 + (slot_x*40),
            y: 24 + (slot_y*36),
        };
        var right = this.view.right;
        icon.setPosition(right - (icon.displayWidth) - (margin.x), this.view.top + (margin.y));
        return icon;
    }

    addFX (slot_x, slot_y, delay=0) {
        var margin = {
            x: 40 + (slot_x*40),
            y: 24 + (slot_y*36),
        };
        var _x = this.view.right - (margin.x);
        var _y = this.view.top + margin.y;

        this.scene.manager.fx.itemWoosh(_x,_y,delay);
    }

    openPockets () {
        this.setKeyTip(this.hints.POCKETS, true);
        
        
        this.openCoinpurse();
    }
    
    closePockets () {
        this.closeCoinpurse();
        this.pocket_textblock.setVisible(false);
        for (var r=0;r<3;r++) {
            var pocket = this.scene.manager.hud.pocket.getPocket(r); // new HudPocket Obj?

            var color = pocket.COLOR.EMPTY;
            this.setSlotColor(r,0,'UNFOCUSED');
        }
        for (var i=1;i<3;i++) {
            for (var r=0;r<3;r++) {
                this.setSlotVisible(r, i, false);
            }
            
        }
        this.clearActions();
        this.destroyDrop();
        this.setSlipsVisible(false);
        this.setKeyTip(this.hints.POCKETS, false);
        this.changeFocus();
    }

    pocketsVisible (visible) {
        
        for (var i=0;i<3;i++) {
            for (var r=0;r<3;r++) {
                this.setSlotVisible(r, i, visible);
                //this.refreshDisplay();
            }
        }
    }

    /*
    *   key - focusState, part of screen (mapped to key name maybe?)
    types of keytips -- focus toggle (I, N), preceding an action menu item (X)
    */
    makeFocusHint (hint) {
        if (hint != null) {
            const keyTip =  this.scene.add.dom(hint.x,hint.y, 'div', '', hint.char).setClassName('key-tip').setOrigin(0).setScrollFactor(0);
            return keyTip;
        }
        else {
            return null;
        }
    }

    makeFocusHints () {
        this.hints = {PLAYER: null, POCKETS: null, PAUSE: null};
        for (var i=0; i<this.focusHints.length;i++) {
            var hint = this.makeFocusHint(this.focusHints[i]);
            this.hints[this.focusHints[i].focus] = hint;
        }
    }

    setKeyTip (tip, active=false) {
        if (tip != null) {
            let style = active ? '-active' : '';
            tip.setClassName('key-tip'+style);
        }
    }

    changeFocus (from, to) {
        this.setKeyTip(this.hints[from], false);
        this.setKeyTip(this.hints[to], true);
    }

    closeCoinpurse () {
        this.coinPurse.icon.setFrame('COINPURSE_closed');
        if (this.coinPurseUI != null) {
            this.coinPurseUI.destroy();
            this.coinPurseUI = null;
        }
        
    }


    openCoinpurse () {
        this.scene.player.coinpurse.updateTotal();
        this.coinPurse.icon.setFrame('COINPURSE_open');
        var coinTotal = this.scene.player.coinpurse.getFormattedTotal();

        if (this.coinPurseUI != null) {
            this.coinPurseUI.destroy();
            this.coinPurseUI = null;
        }
        this.coinPurseUI = this.tellCoinpurse(coinTotal);
    }


    tellWatch (content,timing=0,status='default') {
        let _x = this.view.left + 96;
        let _y = this.view.top + this.margin.top;
        
        let flag = this.scene.add.dom(_x,_y, 'div','', content).setScrollFactor(0).setOrigin(0).setClassName('watch-time');
        if (timing > 0) {
            setTimeout(() => {
                flag.destroy();
            }, timing);
        }
        else {
            return flag;
        }
    }

    tellCoinpurse (content,timing=0,status='default') {
        let _x = this.view.left + (this.margin.left/2);
        let _y = this.view.top + (this.margin.top + 28);
        
        let flag = this.scene.add.dom(_x,_y, 'div',this.coinpurseStyle[status], content).setOrigin(0).setScrollFactor(0);
        if (timing > 0) {
            if (status != 'default') {
                let tween_to_y = status == 'positive' ? _y - this.margin.top : _y + this.margin.top;
                let tween_to_x = status == 'missing' ? _x - this.margin.left : _x;
                let tween_loop = status == 'missing' ? 2 : -1;
                this.scene.tweens.add({
                    targets: [ flag ],
                    y: tween_to_y,
                    x: tween_to_x,
                    duration: timing*.75,
                    ease: 'Sine.easeInOut',
                    loop: tween_loop,
                    yoyo: true
                });
            }
            setTimeout(() => {
                flag.destroy();
            }, timing);
        }
        else {
            return flag;
        }
    }

    tellBrain (content,timing=0,status='default') {
        var _x = this.scene.player.snappedStanding.x
        var _y = this.scene.player.snappedStanding.y - 32;
        var thought = this.scene.add.dom(_x,_y, 'div','', content).setOrigin(0);
        thought.setClassName('thought-'+status);
        if (timing > 0) {
            if (status != 'default') {
                let tween_to_y = status == 'positive' ? _y - this.margin.top : _y - this.margin.top/2;
                let tween_to_x = status == 'missing' ? _x + this.margin.left : _x - this.margin.left/2;
                this.scene.tweens.add({
                    targets: [ thought ],
                    y: tween_to_y,
                    x: tween_to_x,
                    duration: timing,
                    ease: 'Sine.easeInOut',
                    loop: -1,
                    yoyo: true
                });
            }
            setTimeout(() => {
                thought.destroy();
            }, timing);
        }
        else {
            return thought;
        }
    }

    addMapBox () {
        this.mapBox = {box: null, flag: null};
        let _x = this.view.left + this.margin.left;
        let _y = this.view.bottom - (96 + this.margin.bottom)
        this.mapBox.box = this.scene.add.image(_x,_y, 'mapBox').setOrigin(0).setScrollFactor(0).setDepth(100100);
        this.mapBox.flag = this.scene.add.dom(_x,_y + 96, 'div','', 'Mini Map').setClassName('mini-map-flag').setOrigin(0).setScrollFactor(0);
    }

    tellMapBoxFlag (content) {
        this.mapBox.flag.setText(content);
    }

    tellDialogBox (content) {
        if (!this.currentDialog) {
            let box = this.addDialogBox();
            box.setText(content);
            this.currentDialog = true;
        }
        else {

        }
    }

    addDialogBox () {
        let _x = this.view.left + 112;
        let _y = this.view.bottom - (96 + this.margin.bottom);

        let dialogBox = this.scene.add.dom(_x,_y, 'div','', 'Dialog').setOrigin(0).setScrollFactor(0).setClassName('dialog-box');

        
/*
        let dialogContent = this.scene.add.text(_x,_y, '', {
            font: "16px defaultFont",
            fill: "#3a3a50",
            padding: { x: 16, y: 16 },
          })
          .setScrollFactor(0)
          .setWordWrapWidth(320)
          .setMaxLines(3).setDepth(101100);
          */
          
          this.scene.time.addEvent({
            delay: 3000,
            callback: ()=>{
                dialogBox.destroy();
                this.currentDialog = false;
            }
        });
        return dialogBox;
    }
}