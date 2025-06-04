import HudCommon from './hud-common.js';
/*
 * Controls the health display on the HUD
 */

export default class HudHealth extends HudCommon {

    constructor(scene) {
       super(scene);
       
    }

    initialize () {
        this.position = {
            x: this.view.right - this.view.margin.right,
            y: this.view.bottom - this.view.margin.bottom
        };

        this.health = {
            hearts: [],
            slice: null
        };

        this.setHealthMax(3);
        this.addHealth();
        this.setHealth(1.5);
    }


    addHealth () {
        console.log("Adding health to HUD");
        this.health.slice = this.makeBlock(this.position.x, this.position.y, (this.health.hearts.length * 18) + 16, 32, 'SHOULDERS_UNFOCUSED');
        this.health.slice.setOrigin(1,1);
    }

    setHealthMax (hearts=3) {
        // Clear existing hearts
        if (this.health.hearts.length > 0) {
            console.log("Clearing existing hearts from HUD");
            this.health.hearts.forEach(heart => {
                heart.destroy();
            });
            this.health.hearts = [];
        }
        for (let i = 0; i < hearts; i++) {
            let heart = this.makeIcon(this.position.x - ((18 * i) + 16),this.position.y - 16, 'UI', 'HEART_FULL');
            heart.setOrigin(1,1);
            this.health.hearts.push(heart);
        }
    }

    setHealth (hearts) {
        console.log("Setting health to " + hearts);
        if (hearts > this.health.hearts.length) {
            hearts = this.health.hearts.length;
        }
        for (let i = 0; i < this.health.hearts.length; i++) {
            this.health.hearts[i].setTexture('UI', 'HEART_FULL');
            if (i < hearts) {
                if (hearts - i == 0.5) {
                    this.heartFX(i,'HEART_FULL_TO_HALF');
                }
            } else {
                this.health.hearts[i].setTexture('UI', 'HEART_FULL');
                // Set to empty heart if less than half
                //this.health.hearts[i].setTexture('UI', 'HEART_EMPTY');
                this.heartFX(i,'HEART_HALF_TO_EMPTY');
            }
        }
    }

    heartFX (index=2,fx_slug='HEART_FULL_TO_HALF') {
        if (index < 0 || index >= this.health.hearts.length) {
            console.warn("Invalid heart index: " + index);
            return;
        }
        let heart = this.health.hearts[index];
        
        let _x = heart.x;
        let _y = heart.y;

        /// Delay this by 250
        this.scene.time.addEvent({
            delay: 1000,
            loop: false,
            callback: () => {
                let texture = fx_slug === 'HEART_FULL_TO_HALF' ? 'HEART_HALF' : 'HEART_EMPTY';
        heart.setTexture('UI', texture);
                let fx = this.scene.manager.fx.handleHudFX(fx_slug, _x, _y);
                fx.setOrigin(1,1);
                fx.on('animationcomplete', () => {
                    fx.destroy();
                });
            }
        });

    }

    
}