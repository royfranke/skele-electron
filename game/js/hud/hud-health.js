import HudCommon from './hud-common.js';
/*
 * Controls the health display on the HUD
 */

export default class HudHealth extends HudCommon {

    constructor(scene) {
       super(scene);
       
    }

    initialize () {
        this.verbose = true;
        this.position = {
            x: this.view.right - this.view.margin.right,
            y: this.view.bottom - this.view.margin.bottom
        };

        this.health = {
            hp: 0,
            hearts: [],
            slice: null
        };

        
        
        if (this.scene.slot.HEALTH != null) {
            this.setHealthMax(this.scene.slot.HEALTH.MAX);
            this.setHealth(this.scene.slot.HEALTH.CURRENT);
        }
        else {
            this.setHealthMax(3);
            this.setHealth(3);
        }

        this.addHealth();
    }


    addHealth () {
        if (this.verbose) {console.log("Adding health to HUD");}
        this.health.slice = this.makeBlock(this.position.x, this.position.y, (this.health.hearts.length * 18) + 16, 32, 'BLOCK_MID_RED_FAT_BORDER');
        this.health.slice.setOrigin(1,1);
    }

    setHealthMax (hearts=3) {
        // Clear existing hearts
        if (this.health.hearts.length > 0) {
            if (this.verbose) {console.log("Clearing existing hearts from HUD");}
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
        if (this.verbose) {console.log("Setting health to " + hearts);}
        this.health.last_hp = this.health.hp;
        this.health.hp = hearts;
        if (hearts > this.health.hearts.length) {
            hearts = this.health.hearts.length;
        }
        for (let i = 0; i < this.health.hearts.length; i++) {
            this.health.hearts[i].setTexture('UI', 'HEART_FULL');
            if (i < hearts) {
                if (hearts - i == 0.25) {
                    //this.heartFX(i,'HEART_FULL_TO_HALF');
                    this.health.hearts[i].setTexture('UI', 'HEART_QUARTER');
                }
                if (hearts - i == 0.5) {
                    //this.heartFX(i,'HEART_FULL_TO_HALF');
                    this.health.hearts[i].setTexture('UI', 'HEART_HALF');
                }
                if (hearts - i == 0.75) {
                    //this.heartFX(i,'HEART_FULL_TO_HALF');
                    this.health.hearts[i].setTexture('UI', 'HEART_3_QUARTER');
                }
            } else {
                // Set to empty heart if less than half
                this.health.hearts[i].setTexture('UI', 'HEART_EMPTY');
                //this.heartFX(i,'HEART_HALF_TO_EMPTY');
            }
        }
    }

    getHealth () {
        return this.health.hp;
    }
    getHealthMax () {
        return this.health.hearts.length;
    }

    modifyHealth (amount) {
        if (this.verbose) {console.log("Modifying health by " + amount);}
        let currentHealth = this.getHealth();
        let newHealth = currentHealth + amount;

        if (newHealth < 0) {
            newHealth = 0;
        } else if (newHealth > this.health.hearts.length) {
            newHealth = this.health.hearts.length;
        }

        this.setHealth(newHealth);
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

    setSaveFromHealth() {
        return {
            "CURRENT": this.getHealth(),
            "MAX": this.getHealthMax()
        };
    }
}