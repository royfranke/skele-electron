import FXS from "../config/atlas/fxs.js";
/* FX Factory Class */

export default class FXFactory {

    constructor(scene) {
        this.scene = scene;
        this.valid_fx = FXS;
    }

    newBounceFX (slug, _x, _y) {
        if (this.validFX(slug)) {
            
            var fx = this.scene.add.sprite(_x, _y, "FX", 0);
            fx.setDepth(_y + fx.height);
            fx.anims.play(slug, false);

            const tween = this.scene.add.tween({
                targets: fx,
                y: _y - 32,
                duration: 450,
                yoyo: true,
                ease: 'Sine.easeOut',
                repeat: 1
            });
            
            tween.on('complete', () => {
              fx.destroy()
            });
            
            return fx;
        }
        return false;
    }

    // For when you want to return the FX instead of self destroying
    handleFX (slug, _x, _y) {
        if (this.validFX(slug)) {
            
            var fx = this.scene.add.sprite(_x, _y, "FX", 0);
            fx.setDepth(_y + fx.height);
            fx.anims.play(slug, false);
            
            return fx;
        }
        return false;
    }

    // For when you want to return the FX instead of self destroying
    handleHudFX (slug, _x, _y) {
        if (this.validFX(slug)) {
            
            var fx = this.scene.add.sprite(_x, _y, "FX", 0);
            fx.setDepth(100300).setOrigin(0).setScrollFactor(0);
            fx.anims.play(slug, false);
            
            return fx;
        }
        return false;
    }

    newFX (slug, _x, _y) {
        if (this.validFX(slug)) {
            
            var fx = this.scene.add.sprite(_x, _y, "FX", 0);
            fx.setDepth(_y + fx.height);
            fx.anims.play(slug, false);
            fx.once('animationcomplete', () => {
                fx.destroy()
            })
            
            return true;
        }
        return false;
    }

    hudFX (slug, _x, _y) {
        if (this.validFX(slug)) {
            
            var fx = this.scene.add.sprite(_x, _y, "FX", 0);
            fx.setDepth(100300).setScrollFactor(0);
            fx.anims.play(slug, false);
            fx.once('animationcomplete', () => {
                fx.destroy()
            })
            
            return true;
        }
        return false;
    }

    validFX (slug) {
        if (this.valid_fx.hasOwnProperty(slug)) {
            return true;
        }
        else {
            console.warn("Nonvalid fx slug passed in fx factory: "+slug);
        }
    }

    discardFX (fx) {
        fx.destroy();
    }

    
}