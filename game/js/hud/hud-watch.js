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

        this.position = {
            with_coinpurse: {
                unfocused: {
                    x: this.view.left + 56,
                    y: this.view.top - 32
                },
                focused: {
                    x: this.view.left + 56,
                    y: this.view.top + this.view.margin.top
                }
            },
            solo: {
                unfocused: {
                    x: this.view.left + this.view.margin.left,
                    y: this.view.top - 32
                },
                focused: {
                    x: this.view.left + this.view.margin.left,
                    y: this.view.top + this.view.margin.top
                }
            }
        };

        this.watch = {
            display: null,
            slice: null
        };

        this.addHiddenWatch();
    }

    addHiddenWatch(conditions='with_coinpurse') {
        this.watch.display = this.makeBitmapText(this.position[conditions].unfocused.x+10,this.position[conditions].unfocused.y + 11, 64, 16, 'SkeleWatch')
        this.watch.display.setText("00:00BM");
        this.watch.slice = this.makeBlock(this.position[conditions].unfocused.x, this.position[conditions].unfocused.y, this.watch.display.displayWidth + 8, 32, 'HUD_DIGITAL_WATCH_FACE');
    }

    plungeWatch(conditions='with_coinpurse') {
        if (this.watch.slice != null) {
            this.scene.tweens.add({
                targets: this.watch.slice,
                y: this.position[conditions].focused.y,
                duration: 1800,
                repeat: 0,
                hold: 500,
                repeatDelay: 500,
                ease: 'bounce.out'
            });

            this.scene.tweens.add({
                targets: this.watch.display,
                y: this.position[conditions].focused.y + 11,
                duration: 1800,
                repeat: 0,
                hold: 500,
                repeatDelay: 500,
                ease: 'bounce.out'
            });
        }
    }

    addWatch (conditions='with_coinpurse') {
        this.watch.display = this.makeBitmapText(this.position[conditions].focused.x+8,this.position[conditions].focused.y + 11, 64, 16, 'SkeleWatch')
        this.watch.display.setText("00:00BM");
        this.watch.slice = this.makeBlock(this.position[conditions].focused.x, this.position[conditions].focused.y, this.watch.display.displayWidth + 4, 32, 'HUD_DIGITAL_WATCH_FACE');
    }

    setWatch (time) {
        this.watch.display.setText(time.hour+":"+time.minute+this.getAlarmStatus());
    }

    getAlarmStatus () {
        let status = this.scene.manager.time.getAlarmStatus();
        if (status == 'D') {
            this.alarmBeep();
        }
        return status;
    }

    alarmBeep () {
        let beep = this.scene.manager.hud.hudSound.play('WATCH_BEEP',3,200);

        this.scene.time.addEvent({
            delay: 3000,
            callback: () => {
                // Fade out
                this.scene.manager.time.setAlarmStatus('TRUE');
            }
        })
    }
    
}