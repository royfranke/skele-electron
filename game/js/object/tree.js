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
        this.leaves = [];
        // Imbue this tree with the config tree info
        this.info = tree;
        this.name = this.info.name;
    }

    setCollision() {
        if (this.sprite != null) {
            this.sprite.body.setSize(12, 8);
            this.sprite.body.setOffset(this.sprite.displayWidth/2 + 4, this.sprite.displayHeight/2 - 10);
            this.scene.physics.add.collider(this.sprite, this.scene.player.playerSprite.sprite);
        }
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
        if (this.info.slug == 'ASH') {
            //this.setBranch(0,-(this.sprite.displayHeight - 40), false, false);
            this.setBranch(4,-(this.sprite.displayHeight - 30), true, true);
            this.setBranch(0,-(this.sprite.displayHeight - 20), false, false);
            this.setBranch(4,-(this.sprite.displayHeight - 12), true, true);
            this.setBranch(0,-(this.sprite.displayHeight - 8),true, false);
        }
        if (this.info.slug == 'SUGAR_MAPLE') {
            

            if (Phaser.Math.RND.between(0,1) == 0) {
                this.setBranch(-4,-(this.sprite.displayHeight - 6), false, true);
                this.setBranch(-4,-(this.sprite.displayHeight - 2),true, false);
                this.setBranch(-8,-(this.sprite.displayHeight + 4),false, false);
            }
            else {
                this.setBranch(-4,-(this.sprite.displayHeight - 4), false, true);
                this.setBranch(-4,-(this.sprite.displayHeight - 2),true, false);
            }
        }


    }

    setBranch(x_offset=0, y_offset=0,flip = false, behind = false) {

        var branch = Phaser.Math.RND.between(1, this.info.branches);
        var branch_alt = Phaser.Math.RND.between(-1, 1);
        branch = branch + branch_alt;
        if (branch < 1) {
            branch = 1;
        }
        if (branch > this.info.branches) {
            branch = this.info.branches;
        }

            var _x = ((this.tile_x + 1)*16)+ x_offset;
            var _y = (this.tile_y*16) + y_offset;

            var depth = !behind ? this.sprite.depth - y_offset/2 : this.sprite.depth + y_offset/2;

            var sprite = this.scene.physics.add.staticSprite(_x, _y, 'TREES', this.info.slug+'_BRANCH-'+branch, 0).setOrigin(0, 1).setDepth(depth);


            if (behind) {
                var dir = 'BACK';
                var leaves = Phaser.Math.RND.between(1, this.info.leaves_back);
                depth = depth - 1;
            }
            else {
                var dir = 'FRONT';
                var leaves = Phaser.Math.RND.between(1, this.info.leaves_front);
                depth = depth + 32;
            }
            
        
            var leaves_sprite = this.scene.physics.add.staticSprite(_x, _y - 8, 'TREES', this.info.slug+'_LEAVES-'+dir+'-'+leaves, 0).setOrigin(0, 1).setDepth(depth);

            if (flip) {
                sprite.setOrigin(1, 1).setFlipX(true);
                leaves_sprite.setOrigin(1, 1).setFlipX(true);
            }

            this.branches.push(sprite);
            this.leaves.push(leaves_sprite);

        this.hasBranch = true;
        this.tweenBranch();
    }



    tweenBranch() {
        if (this.branches.length == 0) {
            return;
        }
        for (var i = 0; i < this.branches.length; i++) {
            var leaves = this.leaves[i];
            
            var branch = this.branches[i];
            branch.setAngle(Phaser.Math.RND.between(-5, 2));
            var tween = this.scene.tweens.add({
                targets: [branch, leaves],
                angle: Phaser.Math.RND.between(5,10),
                duration: Phaser.Math.RND.between(6000,8000),
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
                this.leaves[i].setTint(keylight.roof_tint);
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
        this.setCollision();
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


