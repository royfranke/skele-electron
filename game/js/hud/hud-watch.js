import HudCommon from './hud-common.js';
/*
 * Controls the watch display on the HUD
 */

export default class HudWatch extends HudCommon {

    constructor(scene) {
       super(scene);
       
    }

    initialize () {
        this.position = {
            x: this.view.left + 56,
            y: this.view.top + this.view.margin.top
        };

        this.watch = {
            display: null,
            slice: null
        };

        this.addWatch();
    }

    addWatch () {
        this.watch.display = this.scene.add.bitmapText(this.position.x+8,this.position.y + 11, 'SkeleWatch', "00:00MB", 16).setScrollFactor(0).setOrigin(0).setDepth(15000);

        this.watch.slice = this.scene.add.nineslice(this.position.x,this.position.y, 'UI', 'HUD_DIGITAL_WATCH_FACE', this.watch.display.displayWidth + 4, 32, 8,8,8,8).setScrollFactor(0).setOrigin(0).setDepth(14000);
    }

    setWatch (time) {
        this.watch.display.setText(time.hour+":"+time.minute+this.getAlarmStatus());
    }

    getAlarmStatus () {
        return this.scene.manager.time.getAlarmStatus();
    }
    
}