import FXManager from "../fx/fx-manager.js";
import HudCommon from "../hud/hud-common.js";
import AppManager from "../app/app-manager.js";


/**
 * Splash Scene
 */
export default class SplashScene extends Phaser.Scene {
    constructor() {
        super("Splash");
    }

    create() {
        console.log("Splash Scene");
        this.ready = false;
        this.app = new AppManager(this,'SPLASH');
        this.manager = {
            fx: new FXManager(this)
        };
        /// Create a yellow circle in the center of the screen
        this.hud = new HudCommon(this);

        let text = this.hud.makeBitmapText(this.cameras.main.centerX, this.cameras.main.centerY + 32, 200, 8, 'SkelePuff');
        text.setTintFill(0xffe57b);
        text.setText("MERCY");
        text.setOrigin(0.5, 0.5);
        
        this.circle = this.add.circle(this.cameras.main.centerX, this.cameras.main.centerY,20, 0x54467f);
        this.circle.setOrigin(.5,.5);
        this.circle.setInteractive();
        this.circle.on('pointerdown', () => {
            console.log("Circle clicked");
            this.ready = true;
            this.scene.start("Main Menu");
        });

        var catcher = this.hud.makeFX("COOTIE_CATCHER_1",this.cameras.main.centerX, this.cameras.main.centerY, -1);
        catcher.setOrigin(0.5, 0.5);
        catcher.stop();
        /// start again after a 500ms delay
        this.time.delayedCall(1000, () => {
            catcher.play('COOTIE_CATCHER_1');
    });
        this.time.delayedCall(1500, () => {
            catcher.play('COOTIE_CATCHER_2');
        });
        this.time.delayedCall(2000, () => {
            catcher.play('COOTIE_CATCHER_1');
        });
        this.time.delayedCall(2500, () => {
            catcher.play('COOTIE_CATCHER_2');
        });
    }

    update () {

    }
}
