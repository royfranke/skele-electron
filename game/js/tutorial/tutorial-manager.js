/* Tutorial Manager Class */

export default class TutorialManager {

    constructor(scene) {
        this.scene = scene;
        this.tutorial_step = 0;
    }

    wake() {
        if (this.scene.slot.TUTORIAL < 30) {
            //this.stepTutorial(this.scene.slot.TUTORIAL);
        }
    }

    startTutorial() {
        this.tutorial_step = 0;
        this.scene.manager.dialog.triggerDialog(1);

        let _x = this.scene.player.standingTile.x;
        let _y = this.scene.player.standingTile.y + 4;
        console.log("Tutorial start at: " + _x + "," + _y);
        //this.scene.manager.fx.playFX('CHALK_ARROW_FX',_x*16,_y*16,2000);
        this.tutorial_step++;
        var callback_closed = function () {
            this.scene.events.off('DIALOG_CLOSE', callback_closed, this);
            this.stepTutorial(this.tutorial_step);
        }

        this.scene.events.addListener('DIALOG_CLOSE', callback_closed, this);
    }

    stepTutorial(step) {
        console.log("Step Tutorial: " + step);
        if (step == 1) {

            var _x = this.scene.player.standingTile.x - 4;
            var _y = this.scene.player.standingTile.y + 6;
            var zone = this.scene.add.zone(_x * 16, _y * 16, 128, 16).setOrigin(0, 0);

            this.scene.physics.add.existing(zone, true);
            this.scene.physics.add.overlap(zone, [this.scene.player.playerSprite.sprite], (_zone, player) => {
                zone.destroy();
                this.stepTutorial(2);
            });
        }
        if (step == 2) {
            this.scene.manager.dialog.triggerDialog(17);
            var _x = this.scene.player.standingTile.x - 2;
            var _y = this.scene.player.standingTile.y - 1;
            var zone = this.scene.add.zone(_x * 16, _y * 16, 16, 128).setOrigin(0, 0);

            this.scene.physics.add.existing(zone, true);
            this.scene.physics.add.overlap(zone, [this.scene.player.playerSprite.sprite], (_zone, player) => {
                zone.destroy();
                this.stepTutorial(3);
            });
        }
        if (step == 3) {
            this.scene.manager.dialog.triggerDialog(18);
            var _x = this.scene.player.standingTile.x + 2;
            var _y = this.scene.player.standingTile.y - 1;
            var zone = this.scene.add.zone(_x * 16, _y * 16, 16, 128).setOrigin(0, 0);

            this.scene.physics.add.existing(zone, true);
            this.scene.physics.add.overlap(zone, [this.scene.player.playerSprite.sprite], (_zone, player) => {
                zone.destroy();
                this.stepTutorial(4);
            });
        }
        if (step == 4) {
            this.scene.manager.dialog.triggerDialog(19);
            // Add input listener for running
            var self = this;

            var run_callback = function () {

                self.scene.events.off('PLAYER_STATE_CHANGE_RUN', run_callback, this);
                var event = self.scene.time.addEvent({
                    delay: 1500,
                    repeat: 0,
                    callback: () => {
                        self.stepTutorial(5);
                    }
                });

            }
            this.scene.events.addListener('PLAYER_STATE_CHANGE_RUN', run_callback, this, true); /// true should be = once
        }
        if (step == 5) {
            this.scene.manager.dialog.triggerDialog(20);
            var self = this;

            var run_callback = function () {

                self.scene.events.off('PLAYER_STATE_CHANGE_RUN', run_callback, this);
                var event = self.scene.time.addEvent({
                    delay: 2000,
                    repeat: 0,
                    callback: () => {
                        self.stepTutorial(6);
                    }
                });

            }
            this.scene.events.addListener('PLAYER_STATE_CHANGE_RUN', run_callback, this, true); /// true should be = once
        }
        if (step == 6) {
            this.tutorial_step = 7;
            this.scene.beginGame();
        }
        if (step == 7) { // Beginning of Gilly sequence
            this.scene.time.addEvent({
                delay: 100,
                repeat: 0,
                callback: () => {
                    this.scene.player.setState('TRIP');
                }
            });

            this.scene.time.addEvent({
                delay: 1500,
                repeat: 0,
                callback: () => {
                    this.scene.player.setState('IDLE');
                }
            });

            var event = this.scene.time.addEvent({
                delay: 3000,
                repeat: 0,
                callback: () => {
                    // Door opens
                    this.scene.interior.doors[0].setState('OPENING');
                    var gilly_mom = this.scene.npcs.newNpcToWorld(7,4,'GILLY_MOM');
                    gilly_mom.goTo(7,6);
                    this.tutorial_step = 8;
                    this.stepTutorial(8);
                }
            });
            
        }
        if (step == 8) {
            /// This is where you need to be for Mrs. Gilly to see you.
            var _x = 6;
            var _y = 4;
            var zone = this.scene.add.zone(_x * 16, _y * 16, 32, 160).setOrigin(0, 0);

            var gilly_sees_you = false;

            this.scene.physics.add.existing(zone, true);
            this.scene.physics.add.overlap(zone, [this.scene.player.playerSprite.sprite], (_zone, player) => {
                zone.destroy();
                gilly_sees_you = true;
                this.tutorial_step = 9;
                this.stepTutorial(9);
            });

            var event = this.scene.time.addEvent({
                delay: 1000,
                repeat: 0,
                callback: () => {
                    // Dialog starts
                    if (!gilly_sees_you) {
                        this.scene.manager.dialog.triggerDialog(5);
                    }
                    
                }
            });

        }
        if (step == 9) {
            var event = this.scene.time.addEvent({
                delay: 500,
                repeat: 0,
                callback: () => {
                    this.scene.manager.dialog.triggerDialog(6);
                    this.tutorial_step = 10;
                    
                    var callback_reply = function () {
                        this.scene.events.off('DIALOG_REPLY', callback_reply, this);

                        var callback_close = function () {
                            this.scene.events.off('DIALOG_CLOSE', callback_close, this);
                            this.stepTutorial(10);
                        }

                        this.scene.events.addListener('DIALOG_CLOSE', callback_close, this);
                    }
        
                    this.scene.events.addListener('DIALOG_REPLY', callback_reply, this);
                    
                }
            });
        }
        if (step == 10) {
            // Mrs. Gilly leaves
            var gilly = this.scene.npcs.getNpcBySlug('GILLY_MOM');
            
            
            gilly.goTo(7,2);
            var event = this.scene.time.addEvent({
                delay: 500,
                repeat: 0,
                callback: () => {
                    this.scene.interior.doors[0].setState('CLOSING');
                    gilly.destroy();
                    this.tutorial_step = 11;
                }
            });
            
        }
        if (step == 11 && this.scene.slot.POSITION.ROOM == 19) {
            // Player is in the Gilly kitchen

            var event = this.scene.time.addEvent({
                delay: 1000,
                repeat: 0,
                callback: () => {
                    if (this.scene.manager.hud.pocket.findInPockets('BACKPACK_PURPLE') === 0) {
                        this.tutorial_step = 12;
                        this.stepTutorial(12);
                    }
                    else {
                        this.scene.manager.dialog.triggerDialog(21);
                    }
                }
            });
            
        }
        if (step == 12 && this.scene.slot.POSITION.ROOM == 19) {
            var event = this.scene.time.addEvent({
                delay: 500,
                repeat: 0,
                callback: () => {
                    this.scene.manager.dialog.triggerDialog(22);
                    this.tutorial_step = 13;
                }
            });
        }
        console.log("Step: "+step);
        console.log("Tutorial Step: "+this.tutorial_step);
    }



  
}
    