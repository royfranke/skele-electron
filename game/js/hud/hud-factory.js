export default class HudFactory {

    constructor(scene) {
       this.scene = scene;

       this.depth = {
            ARROW:100050,
            SLOT:100000,
            ICON:100100,
            FX:100200,
       };
    }

    makeBlock (_x,_y, width=32, height=32, frameName='HAND_UNFOCUSED') {
        if (width == 32 && height == 32) {
            return this.scene.add.image(_x,_y, 'POCKET_BLOCK', frameName).setOrigin(0).setScrollFactor(0).setDepth(this.depth.SLOT);
        }
        else {
            return this.scene.add.nineslice(_x,_y, 'POCKET_BLOCK', frameName, width, height, 8,8,8,8).setOrigin(0).setScrollFactor(0).setDepth(this.depth.SLOT);
        } 
    }

    makeArrow (_x,_y, frameName='BAG_ARROW_FOCUSED') {
        return this.scene.add.image(_x,_y, 'POCKET_ARROW', frameName).setOrigin(0).setDepth(this.depth.ARROW).setScrollFactor(0);
    }

    makeIcon (_x,_y, textureName, frameName) {
        return this.scene.add.image(_x,_y, textureName,frameName).setOrigin(0).setDepth(this.depth.ICON).setScrollFactor(0);
    }

    makeFX (fx_slug, _x, _y, delay=0) {
        var fx = this.scene.manager.fx.playFX(fx_slug,_x,_y,delay);
        fx.setDepth(this.depth.FX).setScrollFactor(0);
    }

}