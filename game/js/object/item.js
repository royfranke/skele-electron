/* Item Class */

export default class Item {
    constructor(scene, item) {
        this.scene = scene;
        this.verbose = false;
        this.registered = false;
        this.tile_x = 0;
        this.tile_y = 0;
        this.onSurface = false;
        this.active_fx = null;
        this.hasFX = false;
        this.sprite = null;
        this.stackCount = 1;
        this.info = item;
        if (this.info.status != undefined && this.info.status != null) {
            // TODO: Make this check for fx_start, fx, and fx_end
            if (this.info.status.fx_start != '' || this.info.status.fx != '' || this.info.status.fx_end != '') {
                this.hasFX = true;
            }
        }
        this.name = this.info.name;
        this.actions = ['PUT AWAY'];
        this.world_actions = [{ action: 'PICK UP', object: this }];
        this.initialize();

    }

    initialize () {

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
        if (this.verbose) console.log('Updating stack action for stack count: '+this.stackCount);
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
                        if (this.hasFX) {
                            if (this.info.status.fx_end != '') {
                                this.active_fx.destroy();
                                this.active_fx = this.scene.manager.fx.handleFX(this.info.status.fx_end, this.tile_x * 16, this.tile_y * 16);

                                this.active_fx.once('animationcomplete', () => {
                                    this.active_fx.destroy();
                                });
                            }
                            else {
                                this.active_fx.destroy();
                            }
                        }
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
        if (this.stackCount > 0 && this.info.stacks.length > 0) {
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

        var x_pixels = (_x * 16) + 8;
        var y_pixels = _y * 16;

        this.sprite = this.scene.physics.add.sprite(x_pixels, y_pixels, 'ITEMS', this.getStackIcon(), 0).setOrigin(.5,0).setDepth(y_pixels + 8);
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
            if (this.hasFX) {
                if (this.info.status.fx_start != '') {
                    this.active_fx = this.scene.manager.fx.handleFX(this.info.status.fx_start, x_pixels, y_pixels);

                    this.active_fx.once('animationcomplete', () => {
                        this.active_fx.destroy();
                        if (this.info.status.fx != '') {
                        this.active_fx = this.scene.manager.fx.handleFX(this.info.status.fx, x_pixels, y_pixels);
                        }
                    });
                }
                else {
                    this.active_fx = this.scene.manager.fx.handleFX(this.info.status.fx, x_pixels, y_pixels);
                }
                
            }
            // utilities
            //locale.ground.util.updateFooting(ground,this);
        /// put footmask here - item has landed

        });
        
    }
    
    createFooting() {
        //this.footShadow = this.scene.add.ellipse(0, 0, 12, 6, 0x465e62).setBlendMode(Phaser.BlendModes.MULTIPLY);
        //this.footShadow.setAlpha(.5);
        //this.footMask = this.scene.add.circle(0, 0, 16, 0x6666ff);
        //this.footMask.setVisible(false);
        //this.sprite.setMask(new Phaser.Display.Masks.BitmapMask(this.scene, this.footMask));
        //this.shadow = this.scene.add.sprite(0,0, "player-IDLE", 0).setFlipY(true).setTintFill(0x465e62).setBlendMode(Phaser.BlendModes.MULTIPLY).setAlpha(.5).setAngle(45);
      }
      
    findInPocketActions(action_string) {
        var interactions = this.info.interactions;
        var pocket_action = false;
        Object.keys(interactions).forEach(function (interaction, index) {
            if (interactions[interaction].req_pocket_action.toUpperCase() == action_string.toUpperCase()) {
                pocket_action = interactions[interaction];
            }
        });
        console.log(pocket_action);
        return pocket_action;
    }

    getPocketActions (refresh=false) {
        if (refresh) {
            this.actions = this.refreshPocketActions();
        }
        /////////
        this.updateStackAction();
        return this.actions;
    }



    refreshPocketActions () {
        var put_away = false;

        var interactions = this.info.interactions;
        var actions_simple = [];
        var info = this.info;
        var self = this.scene;
        Object.keys(interactions).forEach(function (interaction, index) {
            var requirement_parts_met = 0;
            var requirement_parts = interactions[interaction].requires.length;
            interactions[interaction].requires.forEach(function (requirement, index) {
                /// If the requirement is for this item or this item kind held in the hand, mark the requirement as met; otherwise check the pockets
                if (requirement.type == 'ITEM'
                    && (requirement.ITEM == info.slug
                        || 
                        self.manager.hud.pocket.findInPockets(requirement.ITEM)
                    )
                    && (requirement.slot_type == 'IN_HAND'
                    || requirement.slot_type == 'IN_HAND_OR_ACTIVE')) {
                        
                    requirement_parts_met++;
                }
                if (requirement.type == 'ITEM_KIND'
                    && (requirement.ITEM_KIND == info.type
                        || 
                        self.manager.hud.pocket.findItemKindInPockets(requirement.ITEM_KIND)
                    )
                    && (requirement.slot_type == 'IN_HAND'
                    || requirement.slot_type == 'IN_HAND_OR_ACTIVE')) {
                    requirement_parts_met++;
                }
                if (requirement.type == 'OBJ_KIND'
                    && self.manager.objectManager.findOnActiveTile(requirement.OBJ_KIND,'kind')
                    && (requirement.slot_type == 'ON_ACTIVE')) {
                    requirement_parts_met++;
                    console.log(''+requirement.OBJ_KIND+' found on active tile');
                }
                if (requirement.type == 'OBJ_TYPE'
                    && self.manager.objectManager.findOnActiveTile(requirement.OBJ_TYPE,'type')
                    && (requirement.slot_type == 'ON_ACTIVE')) {
                    requirement_parts_met++;
                    console.log(''+requirement.OBJ_TYPE+' found on active tile');
                }
                if (requirement.type == 'IN_COINPURSE') {
                    
                   
                }

            });
            if (requirement_parts_met == requirement_parts) {
                actions_simple.push(interactions[interaction].req_pocket_action);
            }
        });

        if (!put_away) {
            actions_simple.push('PUT AWAY');
        }
        return actions_simple;
    }

    bagItem(item) {
        // Not a bag.
        return false;
    }

    destroySprite() {
        this.sprite.destroy();
        //this.footMask.destroy();
        //this.footShadow.destroy();
        this.sprite = null;
    }

    destroy() {
        this.sprite.destroy();
    }

    hasContents() {
        return false;
    }

    isContainer () {
        return false;
    }

    blow () {
        if (this.info.type == 'FLYER') {
            
            let flyer = this.scene.manager.fx.handleFX('BLOWN_'+this.info.slug,this.tile_x * 16,this.tile_y * 16);
            
            let tween = this.scene.tweens.add({
                targets: [flyer],
                y: '-=64',
                x: '+=128',
                duration: 1000,
                ease: 'Sine.easeOut',
            });
            tween.on('complete', () => {
                let tween2 = this.scene.tweens.add({
                    targets: [flyer],
                    y: '+=32',
                    x: '+=256',
                    duration: 2500,
                    ease: 'Sine.easeIn',
                });
                tween2.on('complete', () => {
                    flyer.destroy();
                });
            });


            this.setRegistration(false);
        }
    }
}


