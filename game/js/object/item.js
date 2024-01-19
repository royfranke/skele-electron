/* Item Class */

export default class Item {
    constructor(scene, item) {
        this.scene = scene;
        this.registered = false;
        this.tile_x = 0;
        this.tile_y = 0;
        this.sprite = null;
        
        this.info = item;
        this.pocket_actions = [];
        this.world_actions = [{ action: 'PICK UP', object: this }];
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
        if (action == 'PICK UP') {
            var valid = this.scene.manager.hud.availablePocket(this);
            if (valid) {
                this.scene.manager.itemManager.registry.removeItem(this.tile_x, this.tile_y);
            }
        }
        this.scene.player.action.clearActions();
    }

    setTileLocation(_x, _y) {
        this.tile_x = _x;
        this.tile_y = _y;

        var x_pixels = _x * 16;
        var y_pixels = _y * 16;

        this.sprite = this.scene.physics.add.staticSprite(x_pixels, y_pixels, 'ITEMS', this.info.icon, 0).setOrigin(0, 0).setDepth(y_pixels);

        this.sprite_shadow = this.scene.add.ellipse(x_pixels, y_pixels + 10, 12, 6, 0x000000).setOrigin(0, 0);
        this.sprite_shadow.setAlpha(.25);
    }

    setPocketActions(actions) {
        this.actions = actions;
    }

    destroySprite() {
        this.sprite.destroy();
        this.sprite_shadow.destroy();
        this.sprite = null;
        this.sprite_shadow = null;
    }
}


