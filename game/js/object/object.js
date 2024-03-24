/* Object Class */

export default class Object {
    constructor(scene, object) {
        this.scene = scene;
        this.registered = false;
        this.tile_x = 0;
        this.tile_y = 0;
        this.sprite = null;
        
        this.info = object;
        this.variety = Phaser.Math.Between(1, this.info.varieties);

        const self = this;
        const actions = [];
        this.info.actions.forEach(function (action) {
            actions.push({action: action.name, object: self});
        });
        this.world_actions = actions;

        


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
        if (action == 'HARVEST') {
            var valid = this.scene.manager.hud.availablePocket(this);
            if (valid) {
                this.scene.manager.objectManager.registry.removeObject(this.tile_x, this.tile_y);
            }
        }
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

        this.sprite = this.scene.physics.add.staticSprite(x_pixels, y_pixels, 'OBJECTS', this.info.slug+'-'+this.variety, 0).setOrigin(0).setSize(this.info.size.w, this.info.size.h).setDepth(y_pixels + (this.info.sprite.h));

        if (this.info.type == 'WINDOW_EXT_' || this.info.type == 'EXT_DOOR_') {
            this.glass = this.scene.add.sprite(x_pixels, y_pixels, 'OBJECTS', this.info.slug+'-'+this.variety, 0).setOrigin(0).setDepth(y_pixels + (this.info.sprite.h) - 1).setTint(0xed931e);
        }

        this.sprite.body.setOffset(this.info.offset.x + (this.info.sprite.w/2), this.info.offset.y + (this.info.sprite.h/2));

    }

    destroySprite() {
        this.sprite.destroy();
        this.sprite_shadow.destroy();
        this.sprite = null;
        this.sprite_shadow = null;
    }
}


