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
        this.destinations = [{ x: 3, y: 2 }];
        this.path = [];
        this.speed = 35;
        this.standingTile = { x: 0, y: 0 };
        this.facing = 'e';
        this.direction_timeout = false;
        this.stopped = true;
    }

    setShadow(_x, _y, frame) {
        //this.shadow = this.scene.add.sprite(_x, _y, "TREES", frame).setOrigin(.5, 0).setFlipY(true).setTintFill(0x465e62).setBlendMode(Phaser.BlendModes.MULTIPLY).setAlpha(.5).setAngle(45);
        //this.shadow.setFlipX(true).setDepth(this.sprite.depth - 1);
    }

    setStopped(stopped) {
        this.stopped = stopped;
        if (stopped) {
            this.sprite.body.setVelocity(0);
        }
    }

    setName(name) {
        this.name = name;
    }

    move(dir = { up: false, right: false, down: false, left: false }, speed) {
        if (this.direction_timeout) {
            return;
        }
        var new_facing = this.facing;
        if (dir.up) {
            this.sprite.body.setVelocityY(-speed);
            if (this.facing == 'n' || this.facing == 'ne' || this.facing == 'nw') {
                new_facing = 'n';
            }
            else if (this.facing == 'e') {
                new_facing = 'ne';
            }
            else if (this.facing == 'w') {
                new_facing = 'nw';
            }
            else if (this.facing == 'se') {
                new_facing = 'e';
            }
            else if (this.facing == 'sw') {
                new_facing = 'w';
            }

        } else if (dir.down) {
            this.sprite.body.setVelocityY(speed);
            if (this.facing == 's' || this.facing == 'se' || this.facing == 'sw') {
                new_facing = 's';
            }
            else if (this.facing == 'e') {
                new_facing = 'se';
            }
            else if (this.facing == 'w') {
                new_facing = 'sw';
            }
            else if (this.facing == 'ne') {
                new_facing = 'e';
            }
            else if (this.facing == 'nw') {
                new_facing = 'w';
            }
        }

        if (dir.left) {
            this.sprite.body.setVelocityX(-speed);
            if (dir.up) { // Pressing up and left
                if (this.facing == 'n' || this.facing == 'nw' || this.facing == 'w') {
                    new_facing = 'nw';
                }
                else if (this.facing == 's') {
                    new_facing = 'sw';
                }
                else if (this.facing == 'sw') {
                    new_facing = 'w';
                }
                else if (this.facing == 'se') {
                    new_facing = 'e';
                }
                else if (this.facing == 'ne') {
                    new_facing = 'n';
                }
                else if (this.facing == 'e') {
                    new_facing = 'ne';
                }
            } else if (dir.down) { // Pressing down + left
                if (this.facing == 's' || this.facing == 'sw' || this.facing == 'w') {
                    new_facing = 'sw';
                }
                else if (this.facing == 'n') {
                    new_facing = 'nw';
                }
                else if (this.facing == 'nw') {
                    new_facing = 'w';
                }
                else if (this.facing == 'ne') {
                    new_facing = 'e';
                }
                else if (this.facing == 'e') {
                    new_facing = 'se';
                }
                else if (this.facing == 'se') {
                    new_facing = 's';
                }
            } else { // Pressing left only
                if (this.facing == 'w' || this.facing == 'nw' || this.facing == 'sw') {
                    new_facing = 'w';
                }
                else if (this.facing == 'n') {
                    new_facing = 'nw';
                }
                else if (this.facing == 's') {
                    new_facing = 'sw';
                }
                else if (this.facing == 'ne') {
                    new_facing = 'n';
                }
                else if (this.facing == 'se') {
                    new_facing = 's';
                }
                else if (this.facing == 'e') {
                    new_facing = 'se';
                }   
            }

        } else if (dir.right) {
            this.sprite.body.setVelocityX(speed);
            if (dir.up) { // Pressing up and right
                if (this.facing == 'n' || this.facing == 'ne' || this.facing == 'e') {
                    new_facing = 'ne';
                }
                else if (this.facing == 's') {
                    new_facing = 'se';
                }
                else if (this.facing == 'se') {
                    new_facing = 'e';
                }
                else if (this.facing == 'sw') {
                    new_facing = 'w';
                }
                else if (this.facing == 'nw') {
                    new_facing = 'n';
                }
                else if (this.facing == 'w') {
                    new_facing = 'nw';
                }
            } else if (dir.down) {
                // Pressing down + right
                if (this.facing == 's' || this.facing == 'se' || this.facing == 'e') {
                    new_facing = 'se';
                }
                else if (this.facing == 'n') {
                    new_facing = 'ne';
                }
                else if (this.facing == 'ne') {
                    new_facing = 'e';
                }
                else if (this.facing == 'nw') {
                    new_facing = 'w';
                }
                else if (this.facing == 'w') {
                    new_facing = 'sw';
                }
                else if (this.facing == 'sw') {
                    new_facing = 's';
                }   
            } else {
                // Pressing right only
                if (this.facing == 'e' || this.facing == 'ne' || this.facing == 'se') {
                    new_facing = 'e';
                }
                else if (this.facing == 'n') {
                    new_facing = 'ne';
                }
                else if (this.facing == 's') {
                    new_facing = 'se';
                }
                else if (this.facing == 'nw') {
                    new_facing = 'w';
                }
                else if (this.facing == 'sw') {
                    new_facing = 's';
                }
                else if (this.facing == 'w') {
                    new_facing = 'sw';
                }
            }

        }

        this.setFacing(new_facing);
        if (new_facing == 'ne' || new_facing == 'nw' || new_facing == 'se' || new_facing == 'sw') {
            this.direction_timeout = true;
            this.scene.time.delayedCall(250, function () {
                this.direction_timeout = false;
            }, [], this);
        }
        this.sprite.body.velocity.normalize().scale(speed);
        this.sprite.setDepth(this.sprite.y + 16);
    }

    updateFlip() {
        var flip = (this.facing == 'nw' || this.facing == 'w' || this.facing == 'sw') ? true : false;
        this.sprite.setFlipX(flip);
    }

    moveToward(_x, _y) {
        //this.setState('WALK');
        var x_distance = this.standingTile.x - _x;
        var y_distance = this.standingTile.y - _y;
        var up = false;
        var right = false;
        var down = false;
        var left = false;
        var tolerance = 3;
        if (this.stopped) {
            return;
        }
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

        if (up && right || up && left || down && right || down && left) {
            if (x_distance < tolerance && x_distance > -tolerance) {
                right = false;
                left = false;
            }
            if (y_distance < tolerance && y_distance > -tolerance) {
                up = false;
                down = false;
            }
        }

        this.move({ up: up, right: right, down: down, left: left }, this.speed);
    }

    update() {
        if (this.path.length > 0) {
            var next = this.path[0];
            this.standingTile = { x: Math.floor(this.sprite.x / 16), y: Math.floor(this.sprite.y / 16) };
            if (this.standingTile.x == next.x && this.standingTile.y == next.y) {
                this.path.shift();
                if (this.path.length == 0) {
                    this.stopped = true;
                    this.scene.events.emit('VEHICLE_ARRIVED_' + this.info.slug, this);
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

    clearDestinations() {
        this.destinations = [];
    }

    setCollider() {
        if (this.sprite != null) {
            this.scene.physics.add.collider(this.sprite, this.scene.player.playerSprite.sprite);
            this.sprite.setPushable(false);
            var vehicles = this.scene.manager.vehicleManager.registry.getAllVehiclesSprites(this.sprite);

            //this.scene.physics.add.collider(this.sprite, vehicles);
            const self = this;
            this.scene.physics.add.collider(this.sprite, vehicles, function (vehicle1, vehicle2) {
                console.log("Vehicle collision detected");
                // Simple collision response: stop both vehicles
                vehicle1.body.setVelocity(0);
                vehicle2.body.setVelocity(0);
                // Additional logic can be added here, such as damage calculation, bounce effect, etc.

            });
            

            
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

            var route = this.nav.getRouteToIntersectionFromTiles(this.tile_x, this.tile_y, this.destinations[0].x, this.destinations[0].y);
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

    setSprite(dir) {
        if (this.sprite == null) {
            this.sprite = this.scene.physics.add.sprite(this.tile_x * 16, this.tile_y * 16, this.info.slug + "-" + new_dir, 0).setOrigin(.5).setDepth(this.tile_y * 16);
        }
        if (dir == 'w') {
            var new_dir = 'e';
        }
        else if (dir == 'nw') {
            var new_dir = 'ne';
        }
        else if (dir == 'sw') {
            var new_dir = 'se';
        }
        else {
            var new_dir = dir;
        }
        this.sprite.anims.play(this.info.slug + "-" + new_dir, true);

        this.setSize(new_dir);

        this.updateFlip();
    }

    setSize(dir) {
        if (dir == 'n' || dir == 's') {
            this.sprite.body.setSize(3*16, 6.5*16);
            this.sprite.setOrigin(.5);
        }
        else if (dir == 'e' || dir == 'w') {
            this.sprite.body.setSize(8*16, 3*16);
            this.sprite.setOrigin(.5);
        }
        else if (dir == 'ne' || dir == 'nw' || dir == 'se' || dir == 'sw') {
            this.sprite.body.setSize(8*16, 3*16);
            this.sprite.setOrigin(.5);
        }
    }

    setFacing(dir) {
        this.facing = dir;
        this.setSprite(this.facing);
    }

    setTileLocation(_x, _y) {
        this.tile_x = _x;
        this.tile_y = _y;

        var x_pixels = _x * 16;
        var y_pixels = _y * 16;
        /// for now use a red circle as a placeholder
        //this.sprite = this.scene.add.circle(x_pixels + 8, y_pixels + 8, 16, 0xff0000).setDepth(5);

        this.setSprite(this.facing);

        //this.scene.physics.add.existing(this.sprite);
        this.path = this.getPath();
        console.log(this.path);
    }

    getPath() {
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


