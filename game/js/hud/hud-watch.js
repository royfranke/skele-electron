import HudSide from './hud-side.js';
/*
 * Controls the watch display on the HUD
 */

export default class HudWatch extends HudSide {

    constructor(scene) {
       super(scene);
       
    }

    setVariables () {
        this.keytip = 'WATCH';
        this.colors = {
            selected: 'ITEM_FOCUSED',
            normal: 'BAG_UNFOCUSED',
            frame:'BLOCK_SHALLOW_YELLOW_FRAME'
        };

        this.icon = 'WATCH_DEFAULT';

        this.position = {
            unfocused: {
                slot: {
                    x: (this.view.left + this.view.margin.left),
                    y: this.view.top + this.view.margin.top
                },
                icon: {
                    x: (this.view.left + this.view.margin.left),
                    y: this.view.top + this.view.margin.top
                },
                watch: {
                    x: (this.view.left + this.view.margin.left) + 64,
                    y: this.view.top + this.view.margin.top
                },
            },
            focused: {

            }
        };
        this.watch = {
            display: null,
            slice: null
        };
        this.addHiddenWatch();
    }

    addHiddenWatch(conditions='with_coinpurse') {
        this.watch.display = this.makeBitmapText(this.position.unfocused.watch.x + 11,this.position.unfocused.watch.y + 11, 64, 16, 'SkeleWatch')
        this.watch.display.setText("00:00BM");
        this.watch.slice = this.makeBlock(this.position.unfocused.watch.x,this.position.unfocused.watch.y, this.watch.display.displayWidth + 8, 32, 'HUD_DIGITAL_WATCH_FACE');
        this.watch.slice.setVisible(false);
        this.watch.display.setVisible(false);
    }

    openManager () {
        this.side.icon.setFrame('WATCH_BRIGHT');
        this.watch.slice.setVisible(true);
        this.watch.display.setVisible(true);
    }

    closeManager () {
        this.side.icon.setFrame('WATCH_DEFAULT');
        this.watch.slice.setVisible(false);
        this.watch.display.setVisible(false);
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