import FXFactory from "./fx-factory.js";

/* FX Manager Class */

export default class FXManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new FXFactory(this.scene);
        this.scene.textures.get('FX');
    }

    playFX (slug,_x,_y,delay=0) {
        return this.scene.time.delayedCall(delay, this.newFX, [slug,_x,_y], this);
    }

    newFX (slug,_x,_y) {
        return this.factory.newFX(slug,_x,_y);
    }

    handleFX (slug,_x,_y) {
        return this.factory.handleFX(slug,_x,_y);
    }

    newBounceFX (slug,_x,_y) {
        return this.factory.newBounceFX(slug,_x,_y);
    }


    coinUp(_x,_y,value=1) {
        this.newBounceFX('COIN_'+value+'_',_x+8,_y);
    }

}