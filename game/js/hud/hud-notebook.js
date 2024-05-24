/*
 * Controls the notebook display on the HUD
 */

export default class HudNotebook {

    constructor(scene, factory) {
       this.scene = scene;
       this.factory = factory;
       this.view = this.scene.manager.getView();

       this.position = {
            x: this.view.left + this.view.margin.left,
            y: this.view.bottom - 148
        };

        this.notebook = {
            block: null,
            icon: null,
            display: null
        };

        this.addNotebook();
    }

    makeBlock (_x,_y, width=32, height=32, frameName='HAND_UNFOCUSED') {
        return this.factory.makeBlock(_x,_y,width,height,frameName);
    }

    makeIcon (_x,_y, textureName, frameName) {
        return this.factory.makeIcon(_x + 8,_y + 8, textureName, frameName);
    }

    addFX (fx_slug, _x, _y, delay=0) {
        var fx = this.scene.manager.fx.playFX(fx_slug,_x,_y,delay);
        fx.setDepth(100200).setScrollFactor(0);
    }

    addNotebook () {
        this.notebook.block = this.makeBlock(this.position.x,this.position.y, 32, 32, 'ITEM_FOCUSED');
        this.notebook.icon = this.makeIcon(this.position.x,this.position.y, 'ITEMS', 'NOTEBOOK_RED');
    }
    
}