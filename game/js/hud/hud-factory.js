export default class HudFactory {

    constructor(scene) {
       this.scene = scene;
       this.cursor_hover = { cursor: 'url(assets/images/cursor-hover.png), pointer' };
       this.depth = {
            FOCUS_HINT_SLOT: 80000,
            FOCUS_HINT: 80050,
            NOTE: 90000,
            SLOT:100000,
            ARROW:100050,
            ICON:100100,
            STACK:100200,
            BUBBLE:100250,
            FX:100300,
            NOTEBOOK:100350,
            TEXT:100400,
       };
    }



    makeQuote (quote, _x,_y, width, size=16, font='SkeleNewsprint') {
        
        let quote_text = this.makeBitmapText(_x, _y, width, size, font);
        quote_text.setText(quote);

        let quote_block = this.makeBlock(_x-16,_y-16, width+32, quote_text.displayHeight+32, 'BLOCK_MID_CREAM_BORDER');

        return {block: quote_block, text: quote_text};
    }

    makeClickArea (_x,_y, width, height, onclick=null) {  
        var click_area = this.scene.add.zone(_x,_y, width, height).setOrigin(0).setScrollFactor(0).setDepth(100500).setInteractive(this.cursor_hover);
        if (onclick != null) {
            click_area.on('pointerdown', onclick);
        }
        return click_area;
    }

    makeButton (_x,_y, text = 'OK', button='X') {
        let slip_text = this.scene.add.bitmapText(_x - 6, _y + 5, 'SkeleTalk', text, 16).setOrigin(1,0).setScrollFactor(0).setDepth(100200).setTintFill(0x465e62).setLineSpacing(11);

        let block = this.makeBlock(_x, _y, slip_text.displayWidth + 12, 24, 'BLOCK_MID_WHITE_RIGHT');
        block.setOrigin(1,0);

        let button_block = this.makeBlock(block.x - block.width, block.y, 18, 24, 'BLOCK_MID_SAPPHIRE_LEFT');
        button_block.setOrigin(1,0);
        let button_text = this.scene.add.bitmapText(button_block.x - 3, button_block.y + 5, 'SkeleTalk', button, 16).setOrigin(1,0).setScrollFactor(0).setDepth(100200).setTintFill(0xe2f2f3).setLineSpacing(11);
        let click_area = this.scene.add.zone(block.x - block.width - 18, block.y, button_block.width + block.width, button_block.height).setOrigin(0).setScrollFactor(0).setDepth(100500).setInteractive(this.cursor_hover);

        
        let button_data = {
            block: block,
            text: slip_text,
            button: button_block,
            button_text: button_text,
            click_area: click_area
        };

        button_data.click_area.on('pointerover', () => {
            button_data.block.setFrame('BLOCK_MID_CREAM_RIGHT');
            button_data.button.setFrame('BLOCK_MID_BLUE_LEFT');
        });
        button_data.click_area.on('pointerout', () => {
            button_data.block.setFrame('BLOCK_MID_WHITE_RIGHT');
            button_data.button.setFrame('BLOCK_MID_SAPPHIRE_LEFT');
        });

        return button_data;
    }

    makeSlip(_x, _y, text = 'HOLD', button='X') {
        

        let slip_text = this.scene.add.bitmapText(_x - 6, _y + 5, 'SkeleTalk', text, 8).setOrigin(1,0).setScrollFactor(0).setDepth(100200).setTintFill(0x465e62).setLineSpacing(11);

        let block = this.makeBlock(_x, _y, slip_text.displayWidth + 12, 16, 'BLOCK_MID_BEIGE_RIGHT');
        block.setOrigin(1,0);

        let button_block = this.makeBlock(block.x - block.width, block.y, 12, 16, 'BLOCK_MID_ORANGE_LEFT');
        button_block.setOrigin(1,0);
        let button_text = this.scene.add.bitmapText(button_block.x - 3, button_block.y + 5, 'SkeleTalk', button, 8).setOrigin(1,0).setScrollFactor(0).setDepth(100200).setTintFill(0x465e62).setLineSpacing(11);

        return {
            block: block,
            text: slip_text,
            button: button_block,
            button_text: button_text
        };
    }

    makeBitmapText (_x,_y, width, size=16, font='SkeleNotebook') {
        return this.scene.add.bitmapText(_x, _y, font, '', size).setOrigin(0).setDepth(this.depth.TEXT).setScrollFactor(0).setMaxWidth(width);
    }

    makeHUDRightArrow (_x,_y,color='YELLOW') {
        return this.scene.add.image(_x,_y, 'UI','HUD_ARROW_'+color+'_RIGHT').setOrigin(0).setDepth(this.depth.ARROW).setScrollFactor(0);
    }

    makeHUDDownArrow (_x,_y,color='SHADOW') {
        return this.scene.add.image(_x,_y, 'UI','HUD_ARROW_'+color+'_DOWN').setOrigin(0).setDepth(this.depth.ARROW).setScrollFactor(0);
    }


    makeNotebook (_x,_y) {
        return this.scene.add.image(_x,_y, 'UI','NOTEBOOK_CLOSED_RED').setOrigin(0).setDepth(this.depth.NOTEBOOK).setScrollFactor(0);
    }

    makeNumberPad (_x,_y, keys=[1,2,3,4,5,6,7,8,9,'#',0,'*']) {
        return this.scene.add.image(_x,_y, 'UI','NOTEBOOK_CLOSED_RED').setOrigin(0).setDepth(this.depth.NOTEBOOK).setScrollFactor(0);
    }

    makeNote (_x,_y) {
        let note_block = this.makeBlock(_x,_y, 32, 32, 'NOTE_NINESLICE');
        note_block.setDepth(this.depth.NOTE);
        return note_block;
    }

    makeBlock (_x,_y, width=32, height=32, frameName='HAND_UNFOCUSED') {

        return this.scene.add.nineslice(_x,_y, 'UI', frameName, width, height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(this.depth.SLOT);
 
    }

    makeFocusBlock (_x,_y, width=32, height=32, frameName='HAND_UNFOCUSED') {

        return this.makeBlock(_x,_y, width, height, frameName).setDepth(this.depth.FOCUS_HINT_SLOT);
 
    }

    makeFocusBitmapText (_x,_y, width, size=16, font='SkeleNotebook') {

        return this.makeBitmapText(_x,_y, width, size, font).setDepth(this.depth.FOCUS_HINT).setScrollFactor(0);
    }


    makeThinkingBitmapText (_x,_y, width, size=8, font='SkeleNotebook') {
        return this.scene.add.bitmapText(_x, _y, font, '', size).setOrigin(0, 1).setDepth(this.depth.BUBBLE + 1).setMaxWidth(width).setTintFill(0x8b8bab);
    }

    makeThinkingBlock (_x,_y, width=32, height=32, frameName='THOUGHT_CLOUD') {
        let depth = this.depth.BUBBLE;
        return this.scene.add.nineslice(_x,_y, 'UI', frameName, width, height, 16,16,16,16).setOrigin(0,1).setDepth(depth);
 
    }

    makeSideArrow (_x,_y, frameName='BAG_ARROW_FOCUSED', left=false) {
        if (left) {
            return this.scene.add.image(_x,_y, 'UI', frameName).setOrigin(0).setDepth(this.depth.ARROW).setScrollFactor(0).setAngle(90);
        }
        else {
            return this.scene.add.image(_x,_y, 'UI', frameName).setOrigin(0).setFlipY(true).setDepth(this.depth.ARROW).setScrollFactor(0).setAngle(90);
        }
        
    }

    makeArrow (_x,_y, frameName='BAG_ARROW_FOCUSED') {
        return this.scene.add.image(_x,_y, 'UI', frameName).setOrigin(0).setDepth(this.depth.ARROW).setScrollFactor(0);
    }

    makeIcon (_x,_y, textureName, frameName) {
        return this.scene.add.sprite(_x,_y, textureName,frameName).setOrigin(0).setDepth(this.depth.ICON).setScrollFactor(0);
    }

    makeIconContents (_x,_y, textureName, frameName) {
        return this.scene.add.sprite(_x,_y, textureName,frameName).setOrigin(0).setDepth(this.depth.ICON+1).setScrollFactor(0);
    }

    makeFX (fx_slug, _x, _y, delay=0) {
        var fx = this.scene.manager.fx.playFX(fx_slug,_x,_y,delay);
    }

    makeHudFX (fx_slug, _x, _y, delay=0) {
        var fx = this.scene.manager.fx.handleHudFX(fx_slug,_x,_y);

        if (delay > 0) { // This delay is for the destroy call
            this.scene.time.delayedCall(delay, () => {
                fx.destroy();
            });
        }
        else if (delay == 0){
            fx.once('animationcomplete', () => {
                fx.destroy()
            })
        }
        else {
            return fx;
        }
        
    }

    makeStackIndicator (_x,_y) {
        let circle = this.makeBlock(_x,_y, 16, 16, 'CIRCLE_MID_LILAC');
        circle.setOrigin(.5).setDepth(this.depth.STACK);

        let stack = {
            circle: circle,
            text: this.scene.add.bitmapText(_x, _y, 'SkeleNotebook', '0', 8).setOrigin(.5).setDepth(this.depth.STACK + 1).setScrollFactor(0).setTintFill(0x465e62)
        };
        stack.circle.setVisible(false);
        stack.text.setVisible(false);
        return stack;
    }

    flutter (elements=[], delay) {
        this.scene.add.tween({
            targets: elements,
            y: '-=4',
            duration: 750,
            yoyo: true,
            delay: delay,
            ease: 'Sine.easeOut',
            repeat: -1
        });
    }

    plunge (elements=[], _y) {
        return this.scene.tweens.add({
            targets: elements,
            y: _y,  
            duration: 750,
            repeat: 0,
            hold: 500,
            repeatDelay: 500,
            ease: 'bounce.out'
        });
    }

}