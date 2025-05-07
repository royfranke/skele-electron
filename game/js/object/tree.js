/* Tree Class */

export default class Tree {
    constructor(scene, tree) {
        this.scene = scene;
        /// Starts out not registered, no tile location, no sprite
        this.registered = false;
        this.tile_x = 0;
        this.tile_y = 0;
        this.sprite = null;
        this.state = null;
        this.branches = [];
        // Imbue this tree with the config tree info
        this.info = tree;
        this.name = this.info.name;
    }

    setShadow(_x, _y, frame) {
        //this.shadow = this.scene.add.sprite(_x, _y, "TREES", frame).setOrigin(.5, 0).setFlipY(true).setTintFill(0x465e62).setBlendMode(Phaser.BlendModes.MULTIPLY).setAlpha(.5).setAngle(45);
        //this.shadow.setFlipX(true).setDepth(this.sprite.depth - 1);
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

    setBranches(count=2) {
        this.setBranch(0,-(this.sprite.displayHeight - 40), false, false);
        this.setBranch(4,-(this.sprite.displayHeight - 41), true, true);
        this.setBranch(0,-(this.sprite.displayHeight - 16), false, false);
        this.setBranch(4,-(this.sprite.displayHeight - 12), true, true);
    }

    setBranch(x_offset=0, y_offset=0,flip = false, behind = false) {

        var branch = Phaser.Math.RND.between(1, this.info.branches);

            var _x = ((this.tile_x + 1)*16)+ x_offset;
            var _y = (this.tile_y*16) + y_offset;

            //var x_pixels = (_x - this.info.base.x) * 16 + this.info.sprite.x + (this.info.sprite.w / 2);
            //var y_pixels = (_y - this.info.base.y) * 16 + this.info.sprite.y + (this.info.sprite.h / 2);

            var y_depth = this.tile_y * 16;

            var depth = behind ? this.sprite.depth - 1 : this.sprite.depth + 1;

            var sprite = this.scene.physics.add.staticSprite(_x, _y, 'TREES', this.info.slug+'_BRANCH-'+branch, 0).setOrigin(0, 1).setDepth(depth);

            if (flip) {
                sprite.setOrigin(1, 1).setFlipX(true);
            }

            this.branches.push(sprite);
        
        this.hasBranch = true;
        this.tweenBranch();
    }



    tweenBranch() {
        if (this.branches.length == 0) {
            return;
        }
        for (var i = 0; i < this.branches.length; i++) {
            var branch = this.branches[i];
            branch.setAngle(Phaser.Math.RND.between(-5, 2));
            var tween = this.scene.tweens.add({
                targets: branch,
                angle: Phaser.Math.RND.between(5,10),
                duration: Phaser.Math.RND.between(5000,6000),
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


    setLight(keylight) {
        if (this.sprite != null) {
            this.sprite.setTint(keylight.wall_tint);
            for (var i = 0; i < this.branches.length; i++) {
                this.branches[i].setTint(keylight.wall_tint);
            }
        }
    }

    setTileLocation(_x, _y) {
        this.tile_x = _x;
        this.tile_y = _y;

        var x_pixels = _x * 16;
        var y_pixels = _y * 16;
        var trunk_variant = Phaser.Math.RND.between(1, this.info.trunks);
        this.sprite = this.scene.physics.add.staticSprite(x_pixels, y_pixels, 'TREES', this.info.slug+'_TRUNK-'+trunk_variant, 0).setOrigin(0,1).setDepth(y_pixels);

        this.setBranches();


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


