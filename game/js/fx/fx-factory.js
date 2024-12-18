import FXS from "../config/atlas/fxs.js";
/* FX Factory Class */

export default class FXFactory {

    constructor(scene) {
        this.scene = scene;
        this.valid_fx = FXS;
    }

    newUncrumpleFX (slug, _x, _y) {
        
            var self = this.scene;
            var fx = this.scene.add.sprite(_x, _y, "FX", 0);
            fx.setDepth(_y + fx.height);
            fx.anims.play('UNCRUMPLE_DOLLAR', false).once('animationcomplete', () => {

                var paper = self.add.sprite(_x, _y, "ITEMS", slug);
                paper.setDepth(_y + 16);
                fx.destroy();
                var tween = self.add.tween({
                    targets: paper,
                    y: '-=16',
                    duration: 450,
                    yoyo: true,
                    ease: 'Sine.easeOut',
                    repeat: 1
                });

                var fadetween = self.add.tween({
                    targets: paper,
                    duration: 1500,
                    alpha: 0,
                    ease: 'Sine.easeIn',
                });
                
                tween.on('complete', () => {
                    paper.destroy();
                    fadetween.destroy();
                  });
            
            });

            return fx;

    }

    newBounceFX (slug, _x, _y) {
        if (this.validFX(slug)) {
            
            var fx = this.scene.add.sprite(_x, _y, "FX", 0);
            fx.setDepth(_y + fx.height);
            fx.anims.play(slug, false);

            const tween = this.scene.add.tween({
                targets: fx,
                y: _y - 24,
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