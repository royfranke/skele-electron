import TILES from "../config/atlas/tile-weights.js";
import COOK from "../config/atlas/tile-recipes.js";
import WALLTILES from "../config/atlas/wall-tile-weights.js";
import InteriorGround from "./interior-ground.js";
import ObjectManager from "../objects/object-manager.js";


/**
 * 	Manage Interiors (Non-overworld tile scenes)
 *	
 */
 export default class InteriorManager {

    constructor(scene) {
        this.scene = scene;

        this.lastRoom = {x: 0, y: 0};
        this.lastTile = {x: 0, y: 0};

        const tileSize = 16;

        this.interior = {
            width: 24,
            height: 24,
            rooms: []
        }

        this.map = this.scene.make.tilemap({
            tileWidth: tileSize,
            tileHeight: tileSize,
            width: this.interior.width,
            height: this.interior.height,
        });

        const tileset = this.map.addTilesetImage("ground", null, 16, 16, 0, 0);
        const wall_tileset = this.map.addTilesetImage("wall", null, 16, 16, 0, 0);

        
        
        this.groundLayer = this.map.createBlankLayer("Ground", tileset);

        this.wallLayer = this.map.createBlankLayer("Wall", wall_tileset);


        this.interior.rooms = this.makeRooms();
        this.buildRoom(this.interior.rooms[0]);

        this.ground = new InteriorGround(this.scene);
        this.scene.manager.objectManager = new ObjectManager(this.scene);
    }

    create () {
        
    }

    update () {

    }

    createItems () {
        ///
    }

    getEntry () {
        return {
            x: this.player_start_x,
            y: this.player_start_y
        };
    }
    

    buildRoom (room) {
        this.clearTileMaps();
        var y = 0;
        var x = 1;
            
        var tile_group = room.floor.group != null ? room.floor.group : 'FILL_';
        this.groundLayer.weightedRandomize(TILES[room.floor.tile][tile_group], x+1, y + room.wall.height + 1, room.floor.width, room.floor.height);

        // Doorway South
        var doorway_x = room.doors[0].x;
        var doorway_y = room.doors[0].y;
       
        /// TODO - Doesnt work.
        this.scene.manager.objectManager.newObjectToWorld(doorway_x,doorway_y,'DOOR_WINDOWS_SMALL_');
            
        this.player_start_x = room.doors[0].x + 1;
        this.player_start_y = room.doors[0].y - 1;

            room.doors.forEach(door => {
                this.groundLayer.weightedRandomize(TILES[room.floor.tile][tile_group], door.x,door.y, door.width, door.height);
            });

            room.windows.forEach(window => {
                this.cookWindow(window.x,window.y);
            });

            
        
            this.wallLayer.weightedRandomize(WALLTILES.BORDER.TOPVIEW_.TOP_LEFT_, x, y, 1, 1);
            this.wallLayer.weightedRandomize(WALLTILES.BORDER.TOPVIEW_.TOP_, x+1, y, room.floor.width, 1);
            this.wallLayer.weightedRandomize(WALLTILES.BORDER.TOPVIEW_.TOP_RIGHT_, x + room.floor.width + 1, y, 1, 1);

            /// Side border pieces
            this.wallLayer.weightedRandomize(WALLTILES.BORDER.TOPVIEW_.MID_LEFT_, x, y + 1, 1, room.floor.height - 1);
            this.wallLayer.weightedRandomize(WALLTILES.BORDER.TOPVIEW_.LOWER_LEFT_, x, y + room.floor.height, 1, 1);

            this.wallLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.TOP_LEFT_, x, y + 1 + room.floor.height, 1, room.wall.height-1);
            this.wallLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.MID_LEFT_, x, y + room.floor.height + room.wall.height, 1, 1);
            this.wallLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.LOWER_LEFT_, x, y + room.floor.height + room.wall.height + 1, 1, 1);

            var x_right = x + 1 + room.floor.width;
            this.wallLayer.weightedRandomize(WALLTILES.BORDER.TOPVIEW_.MID_RIGHT_, x_right, y + 1, 1, room.floor.height - 1);
            this.wallLayer.weightedRandomize(WALLTILES.BORDER.TOPVIEW_.LOWER_RIGHT_, x_right, y + room.floor.height, 1, 1);
            
 
            this.wallLayer.weightedRandomize(WALLTILES.BORDER['SECTIONED_'+room.floor.tile+'_'].LOWER_, x+1, y + room.floor.height + room.wall.height + 1, room.floor.width, 1);

            //Portal South
           
            this.wallLayer.weightedRandomize(WALLTILES.BORDER['SECTIONED_'+room.floor.tile+'_'].LOWER_, x+1, y + room.floor.height + room.wall.height + 2, 2, 1);

            this.wallLayer.putTilesAt([-1, -1], x+1, y + room.floor.height + room.wall.height + 1);
            

            this.wallLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.TOP_RIGHT_, x_right, y + 1 + room.floor.height, 1, room.wall.height-1);
            this.wallLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.MID_RIGHT_, x_right, y + room.floor.height + room.wall.height, 1, 1);
            this.wallLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.LOWER_RIGHT_, x_right, y + room.floor.height + room.wall.height + 1, 1, 1);
            



            for (var h=0; h<room.wall.height;h++) {
                var place = 'MID_';
                if (h == 0) {place = 'TOP_';}
                if (h == room.wall.height - 1) {place = 'LOWER_';}
                this.wallLayer.weightedRandomize(WALLTILES[room.wall.type][room.wall.variety][place], x+1, y + 1+h, room.floor.width, 1);
            }

    
    }

    makeRooms () {
        const floor_choices = [
            {
                tile: 'PLANK',
                group: 'FILL_'
            },
            {
                tile: 'TILE',
                group: 'CHECKERED_WHITE_BROWN_'
            },
            {
                tile: 'TILE',
                group: 'CHECKERED_BLUE_WHITE_'
            },
            {
                tile: 'TILE',
                group: 'CHECKERED_GREEN_BLUE_PURPLE_BLACK_'
            },
            {
                tile: 'TILE',
                group: 'GREEN_CHECKERED_'
            },
        ];

        const wall_choices = [
            {
                type: 'PAINT',
                variety: 'GREEN_PURPLE_'
            },
            {
                type: 'PAINT',
                variety: 'WHITE_'
            },
            {
                type: 'PAINT',
                variety: 'BLUE_WORN_'
            },
        ];

        const wall = {
          height: {
            min: 3,
            max: 5
          }  
        };

        const floor = {
            height: {
                min: 3,
                max: 8
            },
            width: {
                min: 3,
                max: 8
            }
        };

        var room_count = Phaser.Math.Between(1, 1);
        var rooms = [];
        for (var i=0; i<room_count; i++) {
            
            var floor_choice = Phaser.Math.Between(0, floor_choices.length - 1);
            var wall_choice = Phaser.Math.Between(0, wall_choices.length - 1);

            var floor_width = Phaser.Math.Between(floor.width.min, floor.width.max);

            var floor_height = Phaser.Math.Between(floor.height.min, floor.height.max);

            var wall_height = Phaser.Math.Between(wall.height.min, wall.height.max);

            var doors = this.planDoors(floor_width, floor_height,wall_height);
            var windows = this.planWindows(floor_width,wall_height);
            rooms[i] =  {
                floor: {
                    width: floor_width,
                    height: floor_height,
                    tile: floor_choices[floor_choice].tile,
                    group: floor_choices[floor_choice].group
                },
                wall: {
                    height: wall_height,
                    type: wall_choices[wall_choice].type,
                    variety: wall_choices[wall_choice].variety,
                },
                doors: doors,
                windows: windows,
            };


        }
        return rooms;
        
    }

    planDoors (floor_width, floor_height, wall_height) {
        var door_south = {
            x: 2,
            y: floor_height + wall_height + 1,
            width: 2,
            height: 1
        }

        var door_north = {
            x: 1,
            y: wall_height + 1,
            width: 2,
            height: 1
        }

        var door_east = {
            x: 1 + floor_width,
            y: wall_height + 2,
            width: 1,
            height: 2
        }

        var door_west = {
            x: 1,
            y: wall_height + 2,
            width: 1,
            height: 2
        }


        var doors = [door_south, door_east];
        return doors;
    }
    planWindows (floor_width,wall_height) {
        var windows = [];

        for (var i=0;i<floor_width;i++) {
            var remaining = floor_width - i;
            var window_width_max = 5 < remaining ? 5 : remaining;
            var window_width = Phaser.Math.Between(0,window_width_max);
            if (window_width > 0) {
                window_width = 2;
                // While I only have double windows
                var window = {
                    x: i + 2,
                    y: 1
                };
                windows.push(window);
                i = i + window_width;
            }
        }

        return windows;
    }

    cookStairs (_x, _y, width, height) {
        this.groundLayer.weightedRandomize(TILES.STAIRS.WOOD_LEFT_TOP_, _x, _y, 1,1);

        this.groundLayer.weightedRandomize(TILES.STAIRS.WOOD_RIGHT_TOP_, _x + 1, _y, 1,1);

        this.groundLayer.weightedRandomize(TILES.STAIRS.WOOD_LEFT_, _x, _y+1, 1,height - 2);

        this.groundLayer.weightedRandomize(TILES.STAIRS.WOOD_RIGHT_, _x + 1, _y+1, 1,height - 2);

        this.groundLayer.weightedRandomize(TILES.STAIRS.WOOD_LEFT_BOTTOM_, _x, _y+height-1, 1,1);

        this.groundLayer.weightedRandomize(TILES.STAIRS.WOOD_RIGHT_BOTTOM_, _x + 1, _y+height-1, 1,1);
    }

    cookWindow (_x,_y) {
        var pixel_x = _x*16;
        var pixel_y = _y*16;
        var sprite_frame = Phaser.Math.Between(0,3);
        const view = this.scene.add.rectangle(pixel_x + 4, pixel_y, 24, 16, 0xffa0a0).setOrigin(0);
        const frame = this.scene.add.sprite(pixel_x, pixel_y, "int_window", sprite_frame).setOrigin(0);
        var window = {
            view: view,
            frame: frame
        }
        return window;
    }

    cookDoor (_x,_y) {
         var pixel_x = _x*16;
         var pixel_y = _y*16;
         
         const view = this.scene.add.rectangle(pixel_x + 4, pixel_y + 8, 24, 40, 0xffa0a0).setOrigin(0);
         const frame = this.scene.add.sprite(pixel_x, pixel_y, "int_door", 1).setOrigin(0);
         var door = {
             view: view,
             frame: frame
         }
         return door;
     }
    

    cookRecipe(_x, _y, recipe) {  /// Sync this with cookRecipe in exterior-manager
        if (recipe == undefined) {
            return;
        }
        var width = recipe.WIDTH;
        var height = recipe.HEIGHT;
        var tile = recipe.TILES;
        var recipe_index = 0;
        for (var h=0;h<height;h++) {
            for (var w=0;w<width;w++) {
                //console.log( parseInt(_x + w)+" - "+parseInt(_y + h));
                this.groundLayer.weightedRandomize(tile[recipe_index],parseInt( _x + w),parseInt(_y + h), 1, 1);
                recipe_index++;

                //this.groundLayer.putTileAt(0, parseInt( _x + w),parseInt(_y + h))
            }
        }
    }

    enterPortal () {
        var next_room = 0;
        if (this.player_in_room == 0) {
            next_room = 1;
        }

        var room = this.interior.rooms[this.player_in_room];

        /// This should bcome something where we have a registry of tile callback locations in a room and they get destroyed upon exiting
        /*
        room.doors.forEach(door => {
            this.groundLayer.setTileLocationCallback(door.x,door.y, door.width, door.height, null, null);
        }); */

        this.buildRoom(this.interior.rooms[next_room]);
        this.scene.player.setPosition(this.player_start_x, this.player_start_y);
        this.player_in_room = next_room;
    }

    clearTileMaps () {
        this.groundLayer.fill(TILES.BLANK);
        this.wallLayer.fill(WALLTILES.BLANK);
    }

}