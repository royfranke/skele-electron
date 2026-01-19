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
            selected: 'BLOCK_MID_BEIGE_FAT_BORDER',
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
                actions: {
                    x: (this.view.left + this.view.margin.left) + 126,
                    y: this.view.top + this.view.margin.top + 40
                },
                arrow: {
                    x: (this.view.left + this.view.margin.left) + 160,
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
        this.watch.alarm_display = this.makeBitmapText(this.position.unfocused.watch.x + 11,this.position.unfocused.watch.y + 11, 64, 16, 'SkeleWatch')
        this.watch.alarm_display.setText("00:00AM");

        this.watch.arrow = this.factory.makeSideArrow(this.position.unfocused.arrow.x ,this.position.unfocused.arrow.y);
        this.watch.arrow.setVisible(false);

        this.watch.slice = this.makeBlock(this.position.unfocused.watch.x,this.position.unfocused.watch.y, this.watch.display.displayWidth + 8, 32, 'HUD_DIGITAL_WATCH_FACE');
        this.watch.actions = this.makeSlip(this.position.unfocused.actions.x, this.position.unfocused.actions.y, 'SET ALARM OFF', 'X');
        this.setSlipVisible(this.watch.actions, false);
        this.watch.slice.setVisible(false);
        this.watch.display.setVisible(false);
        this.watch.alarm_display.setVisible(false);

    }

    openManager () {
        this.side.icon.setFrame('WATCH_BRIGHT');
        this.watch.slice.setVisible(true);
        this.watch.display.setVisible(true);
        this.setSlipVisible(this.watch.actions, true);
        this.listen();
    }

    closeManager () {
        this.side.icon.setFrame('WATCH_DEFAULT');
        this.watch.slice.setVisible(false);
        this.watch.display.setVisible(false);
        this.watch.alarm_display.setVisible(false);
        this.watch.arrow.setVisible(false);
        this.setSlipVisible(this.watch.actions, false);
        this.destroyListeners();
    }

    setWatch (time) {
        this.watch.display.setText(time.hour+":"+time.minute+this.getAlarmStatus());
    }

    setAlarmTime (time) {
        this.scene.manager.hud.hudSound.play('WATCH_BEEP');
        this.tapArrow();
        this.scene.manager.time.incrementAlarmTime(0,15);
        this.showAlarmTime();
        
    }

    tapArrow() {
        this.watch.arrow.setFrame('BAG_ARROW_SELECTED');
            /// Arrow down tween on right arrow
            var tween = this.scene.tweens.add({
                targets: [this.watch.arrow],
                y: this.position.unfocused.arrow.y,
                x: this.position.unfocused.arrow.x + 8,
                duration: 250,
                ease: 'Sine.easeIn',
                loop: 0,
                yoyo: true,
            });
            tween.on('complete', () => {
                this.watch.arrow.setFrame('BAG_ARROW_FOCUSED');
                this.watch.arrow.setPosition(this.position.unfocused.arrow.x, this.position.unfocused.arrow.y);
            });
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

    listen() {
        this.scene.events.addListener('INPUT_SELECT_WATCH', function () {
            this.setAlarm();
        }, this);

        this.scene.events.addListener('INPUT_RIGHT_WATCH', function () {
            this.setAlarmTime();
        }, this);
    }

    destroyListeners() {
        this.scene.events.removeListener('INPUT_SELECT_WATCH');
        this.scene.events.removeListener('INPUT_RIGHT_WATCH');
    }

    showAlarmTime () {
        let alarm_time = this.scene.manager.time.getAlarmTime();
        let hour = (alarm_time.hour < 10) ? '0'+alarm_time.hour : alarm_time.hour;
        let minute = (alarm_time.minute < 10) ? '0'+alarm_time.minute : alarm_time.minute;
        this.watch.alarm_display.setText(hour+":"+minute+'C');
        this.watch.display.setVisible(false);
        this.watch.alarm_display.setVisible(true);
        this.watch.arrow.setVisible(true);
    }

    setAlarm() {
        /// Open alarm set interface
        this.scene.manager.hud.hudSound.play('WATCH_BEEP');
        this.tapSlip()
        this.scene.manager.time.setAlarmStatus( this.scene.manager.time.isAlarmSet() ? 'FALSE' : 'TRUE' );
        var self = this;
        this.scene.time.addEvent({
            delay: 200,
            callback: () => {
                if (self.scene.manager.time.isAlarmSet()) {
                    self.watch.actions.text.setText('SET ALARM OFF');
                    self.showAlarmTime();
                }
                else {
                    self.watch.actions.text.setText('SET ALARM ON');
                    self.watch.alarm_display.setVisible(false);
                    self.watch.display.setVisible(true);
                    self.watch.arrow.setVisible(false);
                }
            }
        })
    }

    tapSlip() {
        if (this.watch.actions != null && this.watch.actions.block != null) {
            this.watch.actions.block.setFrame('BLOCK_SHALLOW_BLUE_RIGHT');

            this.scene.time.addEvent({
                delay: 125,
                callback: () => {
                    if (this.watch.actions.block != null) {
                        this.watch.actions.block.setFrame('BLOCK_MID_BEIGE_RIGHT');
                    }
                }
            });
        }
    }
    
}