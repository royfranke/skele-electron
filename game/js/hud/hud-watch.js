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
            display: null,
            slice: null
        };

        this.addWatch();

    }

    /*

    Todo: fix for use
    makeBitmapText (_x,_y, width, text, size) {
        let bitmap = this.factory.makeBitmapText(_x,_y, width, size);
        bitmap.setText(text);
        bitmap.setScrollFactor(0);
        return bitmap;

        
    }
*/


    makeBlock (_x,_y, width=32, height=32, frameName='HAND_UNFOCUSED') {
        return this.factory.makeBlock(_x,_y,width,height,frameName);
    }

    makeIcon (_x,_y, textureName, frameName) {
        return this.factory.makeIcon(_x + 8,_y + 8, textureName, frameName);
    }

    addFX (fx_slug, _x, _y, delay=0) {
        this.factory.makeHudFX(fx_slug, _x, _y, delay);
    }

    addWatch () {
        this.watch.block = this.makeBlock(this.position.x,this.position.y, 32, 32, 'ITEM_UNFOCUSED');
        this.watch.icon = this.makeIcon(this.position.x,this.position.y, 'ITEMS', 'DIGITAL_WATCH');

        this.watch.display = this.scene.add.bitmapText(this.view.left + 102, this.view.top + this.view.margin.top + 8, 'SkeleWatch', "00:00MB", 16).setScrollFactor(0).setOrigin(0).setDepth(15000);

        this.watch.slice = this.scene.add.nineslice(this.view.left + 96, this.view.top + this.view.margin.top, 'UI', 'HUD_DIGITAL_WATCH_FACE', this.watch.display.displayWidth + 2, 28, 8,8,8,8).setScrollFactor(0).setOrigin(0).setDepth(14000);
    }

    tellWatch (content,timing=0,status='default') {
        /*
        let _x = this.view.left + 96;
        let _y = this.view.top + this.view.margin.top;

        let flag = this.scene.add.bitmapText(_x, _y, 'SkeleWatch', "00:00MB", 16).setScrollFactor(0).setOrigin(0).setDepth(15000);
        */
       
        return this.watch.display;
/*

        if (timing > 0) {
            setTimeout(() => {
                flag.destroy();
            }, timing);
        }
        else {
            return flag;
        }
            */
    }
    
}