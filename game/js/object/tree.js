/* Tree Class */

export default class Tree {
    constructor(scene, tree, days_old = 0, appearance = null) {
        this.scene = scene;
        /// Starts out not registered, no tile location, no sprite
        this.registered = false;
        this.tile_x = 0;
        this.tile_y = 0;
        this.sprite = null;
        this.sprite_shadow = null;
        this.state = null;
        this.branches = [];
        this.leaves = [];
        // Imbue this tree with the config tree info
        this.info = tree;
        this.name = this.info.name;
        this.day = days_old;
        this.age_days = days_old;
        this.appearance = this.normalizeAppearance(appearance);
    }

    clamp(value, min, max) {
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) {
            return min;
        }
        return Math.max(min, Math.min(max, numeric));
    }

    normalizeAppearance(appearance = null) {
        if (!appearance || typeof appearance !== 'object') {
            return null;
        }

        const trunkVariant = Number.isFinite(appearance.trunkVariant) ? appearance.trunkVariant : Number(appearance.trunkVariant);
        const branches = Array.isArray(appearance.branches)
            ? appearance.branches.map(branch => this.normalizeBranch(branch))
            : [];

        return {
            trunkVariant: Number.isFinite(trunkVariant) ? trunkVariant : null,
            branches,
        };
    }

    normalizeBranch(branch = {}) {
        const behind = branch.behind === true;
        const maxBranches = Math.max(1, Number(this.info.branches) || 1);
        const maxLeaves = Math.max(1, Number(behind ? this.info.leaves_back : this.info.leaves_front) || 1);

        return {
            xOffset: Number.isFinite(branch.xOffset) ? branch.xOffset : Number(branch.xOffset) || 0,
            yOffset: Number.isFinite(branch.yOffset) ? branch.yOffset : Number(branch.yOffset) || 0,
            flipX: branch.flipX === true,
            behind,
            branchVariant: this.clamp(branch.branchVariant, 1, maxBranches),
            leafDir: branch.leafDir === 'BACK' ? 'BACK' : 'FRONT',
            leavesVariant: this.clamp(branch.leavesVariant, 1, maxLeaves),
        };
    }

    getVisualData() {
        return this.normalizeAppearance(this.appearance);
    }

    randomTrunkVariant() {
        return Phaser.Math.RND.between(1, Math.max(1, Number(this.info.trunks) || 1));
    }

    randomBranchVariant() {
        let branch = Phaser.Math.RND.between(1, Math.max(1, Number(this.info.branches) || 1));
        branch += Phaser.Math.RND.between(-1, 1);
        return this.clamp(branch, 1, Math.max(1, Number(this.info.branches) || 1));
    }

    randomLeafVariant(behind = false) {
        const maxLeaves = Math.max(1, Number(behind ? this.info.leaves_back : this.info.leaves_front) || 1);
        return Phaser.Math.RND.between(1, maxLeaves);
    }

    createBranchSpec(xOffset, yOffset, flipX = false, behind = false) {
        return {
            xOffset,
            yOffset,
            flipX,
            behind,
            branchVariant: this.randomBranchVariant(),
            leafDir: behind ? 'BACK' : 'FRONT',
            leavesVariant: this.randomLeafVariant(behind),
        };
    }

    generateBranchSpecs() {
        if (this.info.slug == 'ASH') {
            return [
                this.createBranchSpec(4, -(this.sprite.displayHeight - 30), true, true),
                this.createBranchSpec(0, -(this.sprite.displayHeight - 20), false, false),
                this.createBranchSpec(4, -(this.sprite.displayHeight - 12), true, true),
                this.createBranchSpec(0, -(this.sprite.displayHeight - 8), true, false),
            ];
        }

        if (this.info.slug == 'SUGAR_MAPLE') {
            if (Phaser.Math.RND.between(0, 1) == 0) {
                return [
                    this.createBranchSpec(-4, -(this.sprite.displayHeight - 6), false, true),
                    this.createBranchSpec(-4, -(this.sprite.displayHeight - 2), true, false),
                    this.createBranchSpec(-8, -(this.sprite.displayHeight + 4), false, false),
                ];
            }

            return [
                this.createBranchSpec(-4, -(this.sprite.displayHeight - 4), false, true),
                this.createBranchSpec(-4, -(this.sprite.displayHeight - 2), true, false),
            ];
        }

        return [];
    }

    clearBranchSprites() {
        this.branches.forEach(sprite => {
            try { sprite.destroy(); } catch (e) {}
        });
        this.leaves.forEach(sprite => {
            try { sprite.destroy(); } catch (e) {}
        });
        this.branches = [];
        this.leaves = [];
    }

    setCollision() {
        if (this.sprite != null && this.sprite.body != null) {
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

    setBranches(branchSpecs = null) {
        const specs = Array.isArray(branchSpecs) && branchSpecs.length > 0
            ? branchSpecs.map(spec => this.normalizeBranch(spec))
            : this.generateBranchSpecs();

        this.clearBranchSprites();
        this.appearance = this.appearance || {};
        this.appearance.branches = specs.map(spec => ({ ...spec }));

        specs.forEach(spec => this.setBranch(spec));
    }

    setBranch(spec = {}) {
        const branch = this.normalizeBranch(spec);

        const _x = ((this.tile_x + 1) * 16) + branch.xOffset;
        const _y = (this.tile_y * 16) + branch.yOffset;

        let depth = !branch.behind ? this.sprite.depth - branch.yOffset / 2 : this.sprite.depth + branch.yOffset / 2;
        const sprite = this.scene.physics.add.staticSprite(_x, _y, 'TREES', this.info.slug + '_BRANCH-' + branch.branchVariant, 0).setOrigin(0, 1).setDepth(depth);

        if (branch.behind) {
            depth = depth - 1;
        } else {
            depth = depth + 32;
        }

        const leaves_sprite = this.scene.physics.add.staticSprite(_x, _y - 8, 'TREES', this.info.slug + '_LEAVES-' + branch.leafDir + '-' + branch.leavesVariant, 0).setOrigin(0, 1).setDepth(depth).setAlpha(0.8);

        if (branch.flipX) {
            sprite.setOrigin(1, 1).setFlipX(true);
            leaves_sprite.setOrigin(1, 1).setFlipX(true);
        }

        this.branches.push(sprite);
        this.leaves.push(leaves_sprite);

        this.hasBranch = true;
        this.tweenBranch();

        return branch;
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
            this.sprite.setTint(keylight.objects_tint);
            for (var i = 0; i < this.branches.length; i++) {
                this.branches[i].setTint(keylight.objects_tint);
                this.leaves[i].setTint(keylight.roof_tint);
            }
        }
    }

    setTileLocation(_x, _y) {
        const savedAppearance = this.normalizeAppearance(this.appearance);
        this.clearBranchSprites();
        if (this.sprite != null) {
            try { this.sprite.destroy(); } catch (e) {}
            this.sprite = null;
        }

        this.tile_x = _x;
        this.tile_y = _y;

        const x_pixels = _x * 16;
        const y_pixels = _y * 16;
        const trunk_variant = savedAppearance?.trunkVariant ?? this.randomTrunkVariant();
        this.appearance = {
            trunkVariant: trunk_variant,
            branches: Array.isArray(savedAppearance?.branches) ? savedAppearance.branches.map(branch => this.normalizeBranch(branch)) : [],
        };

        this.sprite = this.scene.physics.add.staticSprite(x_pixels, y_pixels, 'TREES', this.info.slug + '_TRUNK-' + trunk_variant, 0).setOrigin(0,1).setDepth(y_pixels);
        this.setCollision();
        this.setBranches(this.appearance.branches.length > 0 ? this.appearance.branches : null);

    }


    setState(state_name) {
        this.last_state = this.state;
        this.state = this.info.states.find(state => state.name === state_name);
    }

    destroySprite() {
        this.clearBranchSprites();
        if (this.sprite != null) {
            try { this.sprite.destroy(); } catch (e) {}
        }
        if (this.sprite_shadow != null) {
            try { this.sprite_shadow.destroy(); } catch (e) {}
        }
        this.sprite = null;
        this.sprite_shadow = null;
    }

    destroy() {
        this.destroySprite();
    }
}


