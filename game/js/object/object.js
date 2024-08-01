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
        this.world_actions = actions;
        this.last_state = null;
        if (this.info.states.length > 0) {
            this.state = this.info.states[0];
        }
        this.chestFunctions(items);
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
        if (this.state != this.last_state) { // State change
            if (this.sprite != null && this.state != null && this.state.frames.length > 0 && this.state.transition != 'false') {
                this.sprite.anims.play(this.info.slug+"-"+this.state.name, true);   
                var transition = this.state.transition;
                this.sprite.once('animationcomplete', () => {
                    this.setState(transition);
                });
            }
        }
        if (this.sprite != null && this.state != null && this.state.frames.length > 0) {
            
            
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

    addChestActions() {
        /// Used within object-chest.js to extend addActions from object.js
    }
    

    setRegistration(registered, coord = null) {
        this.registered = registered;
        if (registered && coord != null) {
            this.setTileLocation(coord.x, coord.y);
        } else if (this.sprite != null) {
            this.destroySprite();
        }
    }

    setSlot(_x,_y,slotted_object,flip=false,behind=false) {
        var slot_x = this.tile_x - _x;
        var slot_y = this.tile_y - _y;
        var base = slotted_object.base;
        var solid = true; /// placeholder
        var variety = Phaser.Math.Between(1, slotted_object.varieties);


        var frame = slotted_object.slug+'-'+variety;

        var x_pixels = (slot_x - base.x) * 16;
        var y_pixels = (slot_y - base.y) * 16;

        var y_depth = (this.tile_y - this.info.base.y) * 16;

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
        
/* 
        if (this.info.type == 'WINDOW_EXT_' || this.info.type == 'EXT_DOOR_') {
            this.glass = this.scene.add.sprite(x_pixels, y_pixels, 'OBJECTS', this.info.slug+'-'+this.variety, 0).setOrigin(0).setDepth(y_pixels + (this.info.sprite.h) - 1).setTint(0xed931e);
        }

        this.sprite.body.setOffset(this.info.offset.x + (this.info.sprite.w/2), this.info.offset.y + (this.info.sprite.h/2));
        */
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
            /// Go to portal... (maybe this is redraw of ground)
            this.scene.portalTo();
        }
        
    }

    setTileLocation(_x, _y) {
        this.tile_x = _x;
        this.tile_y = _y;
        const base = this.info.base;

        var x_pixels = (_x - base.x) * 16;
        var y_pixels = (_y - base.y) * 16;
        var frame = this.info.slug+'-'+this.variety;

        this.sprite = this.scene.physics.add.staticSprite(x_pixels, y_pixels, 'OBJECTS', frame, 0).setOrigin(0).setSize(this.info.size.w, this.info.size.h).setDepth(y_pixels + (this.info.sprite.h));

        //this.setShadow(x_pixels, y_pixels, frame);

        if (this.info.type == 'WINDOW_EXT_' || this.info.type == 'EXT_DOOR_') {
            this.glass = this.scene.add.rectangle(x_pixels + this.info.offset.x, y_pixels + this.info.offset.y, this.info.size.w, this.info.size.h, 0x4b424a).setOrigin(0).setDepth(y_pixels + (this.info.sprite.h) - 1);
        }

        this.sprite.body.setOffset(this.info.offset.x + (this.info.sprite.w/2), this.info.offset.y + (this.info.sprite.h/2));

    }
    

    setState (state_name) {
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


