export default class HudFactory {

    constructor(scene) {
       this.scene = scene;

       this.depth = {
            ARROW:100050,
            SLOT:100000,
            ICON:100100,
            STACK:100200,
            FX:100300,
            TEXT:100400,
       };
    }

    makeBitmapText (_x,_y, width, size=16, font='SkeleNotebook') {
        return this.scene.add.bitmapText(_x, _y, font, '', size).setOrigin(0).setDepth(this.depth.TEXT).setScrollFactor(0).setMaxWidth(width);
    }

    makeNotebook (_x,_y) {
        return this.scene.add.image(_x,_y, 'UI','NOTEBOOK_CLOSED_RED').setOrigin(0).setDepth(this.depth.SLOT).setScrollFactor(0);
    }

    makeBlock (_x,_y, width=32, height=32, frameName='HAND_UNFOCUSED') {
        if (width == 32 && height == 32) {
            return this.scene.add.image(_x,_y, 'UI', frameName).setOrigin(0).setScrollFactor(0).setDepth(this.depth.SLOT);
        }
        else {
            return this.scene.add.nineslice(_x,_y, 'UI', frameName, width, height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(this.depth.SLOT);
        } 
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
        return this.scene.add.dom(_x, _y, 'div', '', '0').setClassName('stack-indicator').setOrigin(0).setDepth(this.depth.STACK).setScrollFactor(0);
    }

}