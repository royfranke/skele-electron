import Item from "./item.js";

/* Item Container Class */

export default class ItemContainer extends Item {
    constructor(scene, item, items = []) {
        super(scene, item, items);
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
        console.log("A container has been created.");
        this.fx = null;
        this.items = items;
        this.actions = [];
    }

    isFull() {
        return this.items.length >= 1;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    replaceContents(item) {
        if (item.slug != undefined) {item = item.slug};
        if (this.contentsAllowed(item)) {
            // Don't remove the content until you know the new slug is allowed
            this.discardContents();
            this.addContentsToContainer(item);
        }
    }

    addContentsToContainer(item) {
        if (!this.isFull()) {
            if (item.slug != undefined) {item = item.slug};
            if (this.contentsAllowed(item)) {
                this.items.push(item);
                console.log("Added contents");
                console.log(item);
                return true;
            }
            else {
                console.log("Container.addContentsToContainer: contents not allowed: "+item.slug);
            return false;
            }
            
        } else {
            console.log("Container.addContentsToContainer: container is full.");
            return false;
        }
    }

    pullContents() {
        if (this.items.length >= 1) {
            var item = this.items.splice(0, 1);
            return item[0];
        } else {
            console.warn("Container.pullContents: this container does not contain any contents.");
            return false;
        }
    }

    discardContents() {
        if (this.items.length >= 1) {
            this.items.splice(place, 1);
        } else {
            console.warn("Container.discardContents: this container is already empty.");
        }
    }

    addActions() { //Add actions to world
        var player_action = this.scene.player.action;
        this.world_actions.forEach(function (action) {
            player_action.addAction(action);
        });
    }

    doAction(action) {
        if (action == 'WEAR' || action == 'PUT AWAY' || action == 'PICK UP') {
            var valid = this.scene.manager.hud.availablePocket(this);
            if (valid) {
                this.scene.manager.itemManager.registry.removeItem(this.tile_x, this.tile_y);
            }
        }

        /*
        If the first nine characters of the action string are 'PUT AWAY ', then the player is trying to put an item in the bag.
        */
        if (action.substring(0, 9) == 'PUT AWAY ') {
            var contents = this.scene.manager.hud.pocket.getHeldItems();
            var putAway = false;
            var self = this;
            contents.forEach(function (item) {
                if (action == 'PUT AWAY '+item.item.name.toUpperCase() && !putAway) {
                    putAway = true;
                    let placed = self.addItemToContainer(item.item);
                    if (placed) {
                        self.scene.manager.hud.pocket.setPocket(item.pocketIndex, 'EMPTY');
                        var sound_var = Phaser.Math.RND.between(1, 3);
                        self.scene.manager.hud.hudSound.play('ITEM_PUT_AWAY_' + sound_var);
                    }
                    self.scene.manager.hud.refreshDisplay();
                }
            });
        }
        this.scene.player.action.clearActions();
    }

    setRegistration(registered, coord = null) {
        this.registered = registered;
        if (registered && coord != null) {
            this.setTileLocation(coord.x, coord.y);
        } else if (this.sprite != null) {
            this.destroySprite();
        }
    }


    setTileLocation(_x, _y) {
        this.tile_x = _x;
        this.tile_y = _y;

        var x_pixels = _x * 16;
        var y_pixels = _y * 16;

        this.sprite = this.scene.physics.add.staticSprite(x_pixels, y_pixels, 'ITEMS', this.getStackIcon(), 0).setOrigin(.5,0).setDepth(y_pixels + 8);
        this.contents_sprite = null;
        console.log("Setting tile location");
        if (this.items.length > 0) {
            console.log("Fetching sprite: "+this.items[0].info.icon);
            this.contents_sprite = this.scene.physics.add.staticSprite(x_pixels, y_pixels, 'ITEMS', this.getStackIcon(this.items[0].info.icon), 0).setOrigin(.5,0).setDepth(y_pixels + 9);
        }
        /// tween
        const tween = this.scene.add.tween({
            targets: [this.sprite, this.contents_sprite],
            y: y_pixels - 2,
            duration: 350,
            yoyo: true,
            ease: 'Cubic.easeOut',
            repeat: 0
        });

        tween.on('complete', () => {
            this.createFooting();
            this.createFX();
            let locale = (this.scene.exterior != null) ? this.scene.exterior : this.scene.interior;
            let ground = locale.ground.getGround(this.tile_x, this.tile_y);
            // utilities
            locale.ground.util.updateFooting(ground,this);
        /// put footmask here - item has landed

        });
        
    }

    destroySprite() {
        if (this.fx != null) {
            this.fx.destroy();
            this.scene.manager.fx.playFX('STEAM_END_',this.sprite.x,this.sprite.y,0);
        }
        this.sprite.destroy();
        if (this.contents_sprite) {
            this.contents_sprite.destroy();
        }
        
        this.footMask.destroy();
        this.footShadow.destroy();
        this.sprite = null;
    }

    contentsAllowed (slug) {
        let found = false;
        console.log(this.info.contains);
        for (let i=0;i<this.info.contains.length;i++) {
            if (slug == this.info.contains[i]) {
                found = true;
                break;
            }
        }
        return found;
    }

    hasContents() {
        return !this.isEmpty();
    }

    isContainer () {
        return true;
    }

    createFX() {
        this.fx = this.scene.manager.fx.handleFX('STEAM_REPEAT_',this.sprite.x,this.sprite.y,0);
    }

}