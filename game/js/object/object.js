import Announcer from './announcer.js';

/* Object Class */

export default class Object {
    constructor(scene, object, items=[]) {
        this.scene = scene;

        /// Starts out not registered, no tile location, no sprite
        this.registered = false;
        this.tile_x = 0;
        this.tile_y = 0;
        this.sprite = null;
        this.state = null;
        this.portal = null;
        this.services = null;
        this.slotted = [];
        this.shell = false;
        this.shell_sprite = null;
        this.loots = [];
        
        // Imbue this object with the config object info
        this.info = object;
        this.announcer = null;
        this.announcements = [];
        this.name = this.info.name;
        // If there are varieties, randomize variety
        // this is also where variety vs. animation frames should be set
        if (this.info.states.length > 0) {
            this.variety = 1;
        }
        else {
            this.variety = Phaser.Math.Between(1, this.info.varieties);
        }
        
        
        let actions = [];
        // Iterate through the config actions and add this object as the action object
        let self = this;
        this.info.actions.forEach(function (action) {
            actions.push({
                action: action.name,
                stateTrigger: action.stateTrigger,
                validStates: action.validStates,
                object: self
            });
        });
        this.info.loot.forEach(function (loot) {
            self.loots.push(loot);
        });
        this.world_actions = actions;
        this.last_state = null;
        if (this.info.states.length > 0) {
            this.setState(this.info.default_state, true);
            if (this.state.name == 'SHELL' && this.info.states.length > 1) {
                this.state = this.info.states[1];
            }
            this.info.states.forEach(function (state) {
                if (state.name == 'SHELL') {
                    self.shell = true;
                    self.shell_frame = state.frames[0];
                }
            });
        }
        this.chestFunctions(items);
    }

    setVariety(variety) {
        if (variety != undefined && variety > 0 && variety <= this.info.varieties) {
            this.variety = variety;
        }
        else {
            this.variety = Phaser.Math.Between(1, this.info.varieties);
        }
        if (this.sprite != null) {
            var frame = this.info.slug+'-'+this.variety;
            this.sprite.setFrame(frame);
        }
    }

    setShelfProducts (_x, _y, items, owner, start_at=0) {
        var slots = 4;
        if (this.on_shelf == undefined) {
            this.on_shelf = [];
        }

        items.forEach(product => {
            var product_info = this.scene.manager.itemManager.itemInfo(product);
            if (product_info == null) {
                console.log('Product not found: ' + product);
                return;
            }
            product_info.tags.forEach(tag => {
                if (tag.category == 'Product Display' && tag.tag == 'shelf stable' && slots > 0 && this.on_shelf.indexOf(product_info.slug) == -1) {
                    if (start_at > 0) {
                        start_at--;
                        return;
                    }
                    var pos_x = _x;
                    var pos_y = _y;
                    switch (slots) {
                        case 1: pos_y = pos_y - 2;
                        break;
                        case 2: pos_x = pos_x + 1;
                                pos_y = pos_y - 2;
                        break;
                        case 3: pos_y = pos_y - 1;
                        break;
                        case 4: pos_x = pos_x + 1;
                                pos_y = pos_y - 1;
                        break;
                    }
                    var new_item = this.scene.manager.itemManager.newItemToWorld(pos_x, pos_y, product_info.slug);

                    new_item.sprite.setDepth(((_y + .5) * 16) + 1);
                    new_item.updateStackCount(product_info.stack - 1);
                    new_item.setOwner(owner);
                    new_item.hasFX = false;
                    switch (slots) {
                        case 3: new_item.sprite.y = new_item.sprite.y + 4;
                        break;
                        case 4: new_item.sprite.y = new_item.sprite.y + 4;
                        break;
                    }

                    this.on_shelf.push(product_info.slug);
                    slots--;
                }
            });
        });
    }
    

    setShadow (_x,_y,frame) {
        this.shadow = this.scene.add.sprite(_x,_y, "OBJECTS", frame).setOrigin(.5,0).setFlipY(true).setTintFill(0x465e62).setBlendMode(Phaser.BlendModes.MULTIPLY).setAlpha(.5).setAngle(45);
        this.shadow.setFlipX(true).setDepth(this.sprite.depth - 1);
    }

    setName (name) {
        this.name = name;
    }

    setAnnouncement (announcement, kind='DEFAULT') {
        this.announcements.push({
            announcement: announcement,
            kind: kind
        });
        this.setAnnouncer();
    }

    setAnnouncer () {
        if (this.announcer == null) {
            this.announcer = new Announcer(this.scene, this);
        }
        this.announcer.setAnnouncements(this.announcements);
    }

    chestFunctions (items) {
        /// Used within object-chest.js to extend constructor from object.js
    }

    update () {
        
        if (this.state != this.last_state || this.state == null) { // State change
            this.playAnimation();
        }

    }

    playAnimation () {
        if (this.sprite != null && this.state != null && this.state.frames != null && this.state.frames.length > 0 && this.state.transition != 'false') {
            this.sprite.anims.play(this.info.slug+"-"+this.state.name, true);   
            var transition = this.state.transition;
            this.sprite.once('animationcomplete', () => {
                this.setState(transition);
            });
        }
        if (this.sprite != null && this.state != null && this.state.frames != null && this.state.frames.length > 0 && this.state.transition == 'false') {
            this.sprite.anims.play(this.info.slug+"-"+this.state.name, true);   
        }
    }

    addActions() { //Add actions to world
        if (this.state != null) { 
            var player_action = this.scene.player.action;
            const state = this.state;
            this.world_actions.forEach(function (action) {
                if (action.validStates.includes(state.name)) {
                    player_action.addAction(action);
                }
            });
            this.addChestActions();
            
        }
        
    }

    setServices (services) {
        this.services = services;
        console.log(services);
        this.addServiceActions();
    }

    addServiceActions() {
        console.log('Adding service actions');
        if (this.services == null) {
            console.log('No services to add');
             return; }
        var player_action = this.scene.player.action;
        var self = this;
        console.log(this.services);
        this.services.forEach(function (service) {
            console.log(service);
            player_action.addAction({ action: service.name, object: self, ground: '', fx: '' });
        });
        
    }

    addChestActions() {
        /// Used within object-chest.js to extend addActions from object.js
    }
    

    setRegistration(registered, coord = null) {
        this.registered = registered;
        if (registered && coord != null) {
            return this.setTileLocation(coord.x, coord.y);
        } else if (this.sprite != null) {
            this.destroySprite();
        }
        return false;
    }

    setSlot(_x,_y,slotted_object,flip=false,behind=false) {
        var slot_x = this.tile_x - _x;
        var slot_y = this.tile_y - _y;
        var base = slotted_object.base;
        var solid = true; /// placeholder
        var variety = Phaser.Math.Between(1, slotted_object.varieties);


        var frame = slotted_object.slug+'-'+variety;

        var x_pixels = Math.floor((slot_x - base.x) * 16);
        var y_pixels = Math.floor((slot_y - base.y) * 16);

        var y_depth = Math.floor((this.tile_y - this.info.base.y) * 16 );

        var depth = behind ? y_depth + (this.info.sprite.h - _y) : (this.tile_y * 16) + (this.info.sprite.h + _y);

        if (solid)  {
            var sprite = this.scene.physics.add.staticSprite(x_pixels, y_pixels, 'OBJECTS', frame, 0).setOrigin(0).setSize(slotted_object.size.w, slotted_object.size.h).setDepth(depth);
            
            sprite.body.setOffset(slotted_object.offset.x + (slotted_object.sprite.w/2), slotted_object.offset.y + (slotted_object.sprite.h/2));
        }
        else {
            var sprite = this.scene.add.sprite(x_pixels, y_pixels, 'OBJECTS', frame, 0).setOrigin(0).setSize(slotted_object.size.w, slotted_object.size.h).setDepth(depth);

            sprite.body.setOffset(slotted_object.offset.x + (slotted_object.sprite.w/2), slotted_object.offset.y + (slotted_object.sprite.h/2));
        }

        if (flip) {
           sprite.setFlipX(true);
        }
        
        this.slotted.push(sprite);

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
        if (action == 'OPEN' && this.info.portal == 1) {
            /// Get portal location info from object -- what room_id, x, y, player facing direction
            /// Go to portal... (maybe this is redraw of ground)
            /// Have this after opening anim of doors
            // Play the door opening sound
            this.scene.manager.hud.hudSound.play('DOOR_OPENING');
            /// Time delay for door opening sound
            this.scene.time.delayedCall(375, () => {
                if (this.portal != null) {
                    this.scene.portalTo(this.portal);
                }
            });
        }

        if (action == 'CHECK OUT' || action == 'CHECKOUT') {
            this.scene.manager.hud.hudStore.checkout();
        }
        
        if (action == 'SAVE') {
            console.log("Saving game");
            return this.scene.app.saveManager.saveGameData();
        }

        if (action == 'CURL UP ON') {
            console.log("Sleeping - Saving game");
            /// get the center of this object
            var x = (this.tile_x - this.info.base.x) + (this.info.sprite.w / 2)/ 16;
            var y = (this.tile_y - this.info.base.y)+ (this.info.sprite.h / 2)/ 16;
            this.sprite.setDepth(this.sprite.depth - 32); 
            return this.scene.player.goToSleep(x,y);
        }

        if (action == 'RING') {
            this.scene.manager.hud.hudSound.play('DING_DING');
        }

        if (action == 'USE PHONE') {
            console.log("Using phone");
            this.scene.manager.setFocus('NUMBERPAD');
            this.scene.events.addListener('CALL_PHONE', function (number) {
                console.log("Calling "+number);
                this.scene.time.delayedCall(3000, () => {
                    this.scene.manager.hud.hudSound.play('ANSWER_WRONG');
                    this.doAction('HANG UP');
                    this.scene.manager.setFocus('PLAYER');
                });
                
            }, this);
        }


        if (this.loots.length > 0) {
            this.loots.forEach(loot => {
                if (action == loot.actionTrigger.toUpperCase()) {
                    self.scene.manager.loot.processLootOdds(loot, self.tile_x, self.tile_y);
                }
            });
        }
    }

    setCollider () {
        //this.scene.physics.add.overlap(this.scene.player.playerSprite.sprite, this.sprite,this.collision,null, this);
    }

    collision () {

            if (this.info.type == 'POOP') {
                console.log(this.info.slug+" trampled!");
                this.setState('TRAMPLED', true);
            }
    }

    setPortal (portal) {
        this.portal = portal;
    }

    getPortal () {
        return this.portal;
    }

    setParams (params) {
        // Used for setting extra parameters from save data
        
        if (params.state != undefined) {
            this.setState(params.state, true);
        }
    }

    setLight (keylight) {
        if (this.sprite != null) {
            this.sprite.setTint(keylight.objects_tint);
            for (var i = 0; i < this.slotted.length; i++) {
                this.slotted[i].setTint(keylight.objects_tint);
            }
            if (this.info.type == 'LAMP' && this.state.name == 'ON') {
                this.sprite.setTint(0xFFFFFF);

            }
        }
    }

    setLamp () {
        if (this.info.type == 'STREETLAMP') {
            var self = this;
            var callback = function(now, today) {
                if (now.hour >= 18 || now.hour < 6) {
                    if (self.light_cone == null) {
                        var x_pixels = (self.tile_x - self.info.base.x) * 16;
                        var y_pixels = (self.tile_y - self.info.base.y) * 16;
                        self.light_cone = self.scene.manager.fx.handleFX('STREET_LIGHT_CONE', x_pixels + self.info.offset.x, y_pixels + self.info.offset.y);
                        self.light_cone.setOrigin(.5,0).setDepth(y_pixels + (self.info.sprite.h) + (16*5)).setAlpha(.45).setBlendMode(Phaser.BlendModes.SCREEN);

                        self.light = self.scene.add.ellipse(x_pixels + self.info.offset.x, y_pixels + self.info.offset.y + (16*5.6), 48,22, 0xf47832, .15).setDepth(y_pixels + (self.info.sprite.h) + (16*4)).setBlendMode(Phaser.BlendModes.LIGHTER);
                    }
                }
                else {
                    if (self.light_cone != null) {
                        self.light_cone.destroy();
                        self.light.destroy();
                        self.light_cone = null;
                        self.light = null;
                    }
                }
            };
            this.scene.events.addListener('HOUR_CHANGE', callback, this);
        }

    }

    setTileLocation(_x, _y) {
        this.tile_x = _x;
        this.tile_y = _y;
        const base = this.info.base;

        var x_pixels = (_x - base.x) * 16 + this.info.sprite.x;
        var y_pixels = (_y - base.y) * 16 + this.info.sprite.y;
        var frame = this.info.slug+'-'+this.variety;

        this.sprite = this.scene.physics.add.staticSprite(x_pixels, y_pixels, 'OBJECTS', frame, 0).setOrigin(0).setDepth(y_pixels + (this.info.sprite.h) + this.info.depth);

        this.setCollider();
        
        if (this.shell == true) {
            this.shell_sprite = this.scene.physics.add.staticSprite(x_pixels, y_pixels, 'OBJECTS', this.shell_frame, 0).setOrigin(0).setDepth(y_pixels + (this.info.sprite.h) + 1 + this.info.depth);
        }

        if (this.info.solid) {
            this.sprite.setSize(this.info.size.w, this.info.size.h);
            this.sprite.body.setOffset(this.info.offset.x + (this.info.sprite.w/2), this.info.offset.y + (this.info.sprite.h/2));
        }
//this.sprite.setTint(0xe88dad, 0xb2977e, 0x787b69, 0x465e62)
        //this.setShadow(x_pixels, y_pixels, frame);

        this.runSpecial();
        // Temporary for testing
        this.setLamp();
        return this;
    }

    runSpecial() {
    }

    setState (state_name, force=true) {
        console.log("Setting state to "+state_name+" for "+this.info.slug);
        if (this.last_state == null) {
            force = true;
        }
        this.last_state = this.state;
        if (!force) { // TODO: Figure out why this didn't work to cycle the states
            this.info.states.forEach(function (state) {
                if (state.stateTrigger == state_name) {
                    if (state.validStates.includes(this.state.name)) {
                        this.state = state;
                    }
                }
            });
        }
        else {
            this.state = this.info.states.find(state => state.name === state_name);
            if (this.state == null) {
                this.state = this.info.states[0];
            }
        }
    }

    destroySprite() {
        this.sprite.destroy();
        this.sprite_shadow.destroy();
        this.sprite = null;
        this.sprite_shadow = null;
    }
}


