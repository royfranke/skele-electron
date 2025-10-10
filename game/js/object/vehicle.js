/* Vehicle Class */

export default class Vehicle {
    constructor(scene, vehicle) {
        this.scene = scene;
        /// Starts out not registered, no tile location, no sprite
        this.registered = false;
        this.tile_x = 0;
        this.tile_y = 0;
        this.sprite = null;
        this.state = null;
        // Imbue this vehicle with the config vehicle info
        this.info = vehicle;
        this.name = this.info.name;
        this.nav = this.scene.manager.nav;
        this.destinations = [{x: 3, y: 2}];
        this.path = [];
        this.speed = 35;
        this.standingTile = {x: 0, y: 0};
    }

    setShadow(_x, _y, frame) {
        //this.shadow = this.scene.add.sprite(_x, _y, "TREES", frame).setOrigin(.5, 0).setFlipY(true).setTintFill(0x465e62).setBlendMode(Phaser.BlendModes.MULTIPLY).setAlpha(.5).setAngle(45);
        //this.shadow.setFlipX(true).setDepth(this.sprite.depth - 1);
    }

    setName(name) {
        this.name = name;
    }

    move (dir={up: false, right: false, down: false, left: false}, speed) {
        if (dir.up) {
          this.sprite.body.setVelocityY(-speed);
        } else if (dir.down) {
          this.sprite.body.setVelocityY(speed);
        }
    
        if (dir.left) {
          this.sprite.body.setVelocityX(-speed);
        } else if (dir.right) {
          this.sprite.body.setVelocityX(speed);
        }
        this.sprite.body.velocity.normalize().scale(speed);
    }

    moveToward(_x, _y) {
        //this.setState('WALK');
        var x_distance = this.standingTile.x - _x;
        var y_distance = this.standingTile.y - _y;
        var up = false;
        var right = false;
        var down = false;
        var left = false;
    
        if (x_distance > 0) {
          left = true;
        }
        else if (x_distance < 0) {
          right = true;
        }
        if (y_distance > 0) {
          up = true;
        }
        else if (y_distance < 0) {
          down = true;
        }

        this.move({ up: up, right: right, down: down, left: left }, this.speed);
      }

    update() {
        if (this.path.length > 0) {
            var next = this.path[0];
            this.standingTile = {x: Math.floor(this.sprite.x / 16), y: Math.floor(this.sprite.y / 16)};
            if (this.standingTile.x == next.x && this.standingTile.y == next.y) {
                this.path.shift();
                if (this.path.length == 0) {
                    this.sprite.body.setVelocity(0);
                    this.scene.events.emit('VEHICLE_ARRIVED_'+this.info.slug, this);
                }
            }
            else if (next != undefined) {
                this.moveToward(next.x, next.y);
            }
            
        }
    }
/*
    checkItinerary () {
        if (this.destinations.length > 0) {
            var dest = this.destinations[0];
            if (this.tile_x == dest.x && this.tile_y == dest.y) {
                this.destinations.shift();
                this.scene.events.emit('VEHICLE_ARRIVED_'+this.info.slug, this);
            }
            else {
              this.moveToward(this.destinations[0].x, this.destinations[0].y);
            }
        }
    }
*/

    setCollider() {
        if (this.sprite != null) {
            this.scene.physics.add.collider(this.sprite, this.scene.player.playerSprite.sprite);

            var vehicles = this.scene.manager.vehicleManager.registry.getAllVehiclesSprites(this.sprite);
            console.log(vehicles);
            this.scene.physics.add.collider(this.sprite, vehicles);
        }
    }


    setRegistration(registered, coord = null) {
        this.registered = registered;
        if (registered && coord != null) {
            this.setTileLocation(coord.x, coord.y);
        } else if (this.sprite != null) {
            this.destroySprite();
        }
    }

    getRoute() {
        console.log("Getting route for vehicle");
        if (this.destinations.length > 0) {

            var route =  this.nav.getRouteToIntersectionFromTiles(this.tile_x, this.tile_y, this.destinations[0].x, this.destinations[0].y);
            return route;
        }
        return [];
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
/// for now use a red circle as a placeholder
        //this.sprite = this.scene.add.circle(x_pixels + 8, y_pixels + 8, 16, 0xff0000).setDepth(5);

this.sprite = this.scene.physics.add.sprite(x_pixels, y_pixels, 'OBJECTS', 'CAR_SEDAN_1-1', 0).setOrigin(0).setDepth(y_pixels);

        //this.scene.physics.add.existing(this.sprite);
        this.path = this.getPath();
        console.log(this.path);
    }

    getPath () {
        var route = this.getRoute();
        var path = this.nav.getPathFromRoute(route);
        return path;
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


