/* Item Class */

export default class Item {
    constructor(scene, item) {
        this.scene = scene;
        this.registered = false;
        this.tile_x = 0;
        this.tile_y = 0;
        this.sprite = null;
        this.stackCount = 1;
        this.info = item;
        this.name = this.info.name;
        this.actions = ['PUT AWAY'];
        this.world_actions = [{ action: 'PICK UP', object: this }];
    }

    setName (name) {
        this.name = name;
    }

    addActions() { //Add actions to world
        var player_action = this.scene.player.action;
        this.world_actions.forEach(function (action) {
            player_action.addAction(action);
        });
    }

    setRegistration(registered, coord = null) {
        this.registered = registered;
        if (registered && coord != null) {
            this.setTileLocation(coord.x, coord.y);
        } else if (this.sprite != null) {
            this.destroySprite();
        }
    }

    doAction(action) {
        this.scene.player.action.clearActions();
        if (action == 'PICK UP') {
            this.pickupItem();
        }
    }

    isStackable(amount=0) {
        return (this.stackCount + amount <= this.info.stack);
    }

    updateStackCount (amount) {
        this.stackCount += amount;
        this.updateStackAction();
        if (this.sprite != null) {
            this.sprite.setTexture('ITEMS', this.getStackIcon());
        }
    }

    updateStackAction () {
        if (this.stackCount > 1) {
            if (!this.actions.includes('DROP ONE')) {
                this.actions.push('DROP ONE');
            }
        }
        else {
            if (this.actions.includes('DROP ONE')) {
                this.actions.splice(this.actions.indexOf('DROP ONE'), 1);
            }
        }
    }

    pickupItem() {
        var valid = this.scene.manager.hud.availablePocket(this);
        if (valid) {
            if (this.scene.player.state.name != 'PICKUP') {
                this.scene.player.setState('PICKUP');

                this.scene.time.addEvent({
                    delay: 500,
                    callback: ()=>{
                        this.scene.manager.itemManager.registry.removeItem(this.tile_x, this.tile_y);
                    }
                });

                this.scene.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                        this.scene.player.setState('IDLE');
                    }
                });
            } 
        }
    }

    nextItem (new_item) {
        this.scene.manager.itemManager.itemSwap(new_item);
    }

    transitionTo (new_item) {
        this.info = this.scene.manager.itemManager.itemInfo(new_item);
    }

    getStackIcon(icon=this.info.icon) {
        if (this.stackCount > 1 && this.info.stacks.length > 0) {
            /// An alternative icon may exist in relation to the stack size...
            for (var i=0;i<this.info.stacks.length;i++) {
                var stack = this.info.stacks[i];
                if (this.stackCount < stack.lessThan && this.stackCount > stack.greaterThan) {
                    icon = stack.icon;
                    break;
                }
            }
        }
        return icon;
    }

    setTileLocation(_x, _y) {
        this.tile_x = _x;
        this.tile_y = _y;

        var x_pixels = _x * 16;
        var y_pixels = _y * 16;

        this.sprite = this.scene.physics.add.staticSprite(x_pixels, y_pixels, 'ITEMS', this.getStackIcon(), 0).setOrigin(.5,0).setDepth(y_pixels + 8);
        /// tween
        const tween = this.scene.add.tween({
            targets: this.sprite,
            y: y_pixels - 8,
            duration: 450,
            yoyo: true,
            ease: 'Cubic.easeOut',
            repeat: 0
        });

        tween.on('complete', () => {
            this.createFooting();
            let locale = (this.scene.exterior != null) ? this.scene.exterior : this.scene.interior;
            let ground = locale.ground.getGround(this.tile_x, this.tile_y);
            // utilities
            locale.ground.util.updateFooting(ground,this);
        /// put footmask here - item has landed

        });
        
    }
    
    createFooting() {
        this.footShadow = this.scene.add.ellipse(0, 0, 12, 6, 0x465e62).setBlendMode(Phaser.BlendModes.MULTIPLY);
        this.footShadow.setAlpha(.5);
        this.footMask = this.scene.add.circle(0, 0, 16, 0x6666ff);
        this.footMask.setVisible(false);
        this.sprite.setMask(new Phaser.Display.Masks.BitmapMask(this.scene, this.footMask));
        //this.shadow = this.scene.add.sprite(0,0, "player-IDLE", 0).setFlipY(true).setTintFill(0x465e62).setBlendMode(Phaser.BlendModes.MULTIPLY).setAlpha(.5).setAngle(45);
      }

    setPocketActions(actions) {
        this.actions = actions;
    }

    addItem(item) {
        // Not a bag.
        return false;
    }

    destroySprite() {
        this.sprite.destroy();
        this.footMask.destroy();
        this.footShadow.destroy();
        this.sprite = null;
    }

    destroy() {
        this.sprite.destroy();
    }

    hasContents() {
        return false;
    }
}


