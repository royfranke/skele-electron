/*
 * Controls the watch display on the HUD
 */

export default class HudWatch {

    constructor(scene, factory) {
       this.scene = scene;
       this.factory = factory;
       this.view = this.scene.manager.getView();

       this.position = {
            x: this.view.left + 56,
            y: this.view.top + this.view.margin.top
        };

        this.watch = {
            block: null,
            icon: null,
            display: null
        };

        this.addWatch();

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

    addWatch () {
        this.watch.block = this.makeBlock(this.position.x,this.position.y, 32, 32, 'ITEM_FOCUSED');
        this.watch.icon = this.makeIcon(this.position.x,this.position.y, 'ITEMS', 'DIGITAL_WATCH');
    }

    tellWatch (content,timing=0,status='default') {
        let _x = this.view.left + 96;
        let _y = this.view.top + this.view.margin.top;
        
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
    
}