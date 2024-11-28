/* Plant Class */

export default class Plant {
    constructor(scene, plant, days_old = 0) {
        this.scene = scene;
        /// Starts out not registered, no tile location, no sprite
        this.registered = false;
        this.tile_x = 0;
        this.tile_y = 0;
        this.sprite = null;
        this.state = null;
        this.flowers = [];
        this.hasFlower = false;

        // Imbue this plant with the config plant info
        this.info = plant;
        this.name = this.info.name;
        this.day = days_old;

        this.stage = this.getStage();
    }

    getStageFrame() {
        if (this.stage != null) {
            return this.stage.frames[0].filename;
        }
    }

    getStageFlowerFrame() {
        let found = null;
        if (this.stage != null) {
            let stage = this.stage;
            for (var i = 0; i < stage.frames.length; i++) {
                stage.frames[i].tags.forEach(function (tag) {
                    if (tag == "flower") {
                        found = stage.frames[i].filename;
                    }
                });
            }
        }
        return found;
    }

    getStage() {
        let day = this.day;
        for (const [key, value] of Object.entries(this.info.stages)) {
            if (day >= value.start && day <= value.end) {
                return value;
            }
        }
    }

    setShadow(_x, _y, frame) {
        this.shadow = this.scene.add.sprite(_x, _y, "PLANTS", frame).setOrigin(.5, 0).setFlipY(true).setTintFill(0x465e62).setBlendMode(Phaser.BlendModes.MULTIPLY).setAlpha(.5).setAngle(45);
        this.shadow.setFlipX(true).setDepth(this.sprite.depth - 1);
    }

    setName(name) {
        this.name = name;
    }

    update() {

    }


    setRegistration(registered, coord = null) {
        this.registered = registered;
        if (registered && coord != null) {
            this.setTileLocation(coord.x, coord.y);
        } else if (this.sprite != null) {
            this.destroySprite();
        }
    }

    setFlower(flip = false, behind = false) {

        var frame = this.getStageFlowerFrame();

        if (frame != null) {

            var _x = this.tile_x;
            var _y = this.tile_y;

            var x_pixels = (_x - this.info.base.x) * 16 + this.info.sprite.x + (this.info.sprite.w / 2);
            var y_pixels = (_y - this.info.base.y) * 16 + this.info.sprite.y + (this.info.sprite.h / 2);

            var y_depth = Math.floor((this.tile_y - this.info.base.y) * 16);

            var depth = behind ? y_depth + (this.info.sprite.h) : (this.tile_y * 16) + this.info.sprite.h + 1;

            var sprite = this.scene.physics.add.staticSprite(x_pixels, y_pixels, 'PLANTS', frame, 0).setOrigin(.5, 1).setDepth(depth + 1);

            if (flip) {
                sprite.setFlipX(true);
            }

            this.flowers.push(sprite);
        }
        this.hasFlower = true;
        this.tweenFlower();
    }

    setCollider() {
        if (this.stage.name == 'flower opens seed heads') {

        this.scene.physics.add.overlap(this.scene.player.playerSprite.sprite, this.sprite,this.tramplePuffBall,null, this);
        }
    }

    tramplePuffBall() {
        if (this.hasFlower) {
            this.scene.manager.fx.playFX('DANDELION_CLOUD',this.sprite.x,this.sprite.y);
            console.log("Puff ball trampled!");
            this.flowers[0].destroy();
            this.hasFlower = false;
        }
        
        
    }




    tweenFlower() {
        if (this.flowers.length == 0) {
            return;
        }
        for (var i = 0; i < this.flowers.length; i++) {
            var flower = this.flowers[i];
            flower.setAngle(Phaser.Math.RND.between(-10, 2));
            var to_flower = flower.x + 4;
            var tween = this.scene.tweens.add({
                targets: flower,
                angle: Phaser.Math.RND.between(3,20),
                duration: Phaser.Math.RND.between(1500,2000),
                yoyo: true,
                ease: 'Ease.easeInOut',
                repeat: -1
            });
            tween.on('complete', () => {
                //choice.icon.tweening = false;
                //choice.icon.icon.y = choice.y + 8;
            });
            
        }

    }

    doAction(action) {
        this.scene.player.action.clearActions();
        var self = this;
        this.world_actions.forEach(function (world_action) {
            if (world_action.action == action) {
                if (world_action.stateTrigger != null) {
                    self.setState(world_action.stateTrigger);
                }
            }
        });
        console.log("Doing action: " + action);
    }


    setLight(keylight) {
        if (this.sprite != null) {
            this.sprite.setTint(keylight.plants_tint);
            for (var i = 0; i < this.flowers.length; i++) {
                this.flowers[i].setTint(keylight.plants_tint);
            }

        }
    }

    setTileLocation(_x, _y) {
        this.tile_x = _x;
        this.tile_y = _y;
        const base = this.info.base;

        var x_pixels = (_x - base.x) * 16 + this.info.sprite.x;
        var y_pixels = (_y - base.y) * 16 + this.info.sprite.y;
        var frame = this.getStageFrame();
        this.sprite = this.scene.physics.add.staticSprite(x_pixels, y_pixels, 'PLANTS', frame, 0).setOrigin(0).setDepth(y_pixels + (this.info.sprite.h));
        this.setFlower(false, false);

    }


    setState(state_name) {
        this.last_state = this.state;
        this.state = this.info.states.find(state => state.name === state_name);
    }

    destroySprite() {
        this.sprite.destroy();
        this.sprite_shadow.destroy();
        this.sprite = null;
        this.sprite_shadow = null;
    }
}


