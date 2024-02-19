import TILES from "../config/atlas/tile-weights.js";
import WALLTILES from "../config/atlas/wall-tile-weights.js";
//import COOK from "../config/tiles/interior/tile-recipes.js";

/**
 * 	Manage Interiors (Non-overworld tile scenes)
 *	
 */
 export default class InteriorManager {

    constructor(scene) {
        this.scene = scene;

        const tileSize = 16;


        this.interior = {
            width: 24,
            height: 24,
            rooms: []
        }

        this.interior.rooms = this.makeRooms();

        this.map = this.scene.make.tilemap({
            tileWidth: tileSize,
            tileHeight: tileSize,
            width: this.interior.width,
            height: this.interior.height,
        });

        const tileset = this.map.addTilesetImage("ground", null, 16, 16, 0, 0); // 1px margin, 2px spacing
        
        this.floorLayer = this.map.createBlankLayer("Floor", tileset);

        const wall_tileset = this.map.addTilesetImage("wall", null, 16, 16, 0, 0); // 1px margin, 2px spacing
        
        this.wallLayer = this.map.createBlankLayer("Wall", wall_tileset);
        

        var y_start = 0;
        var x_start = 0;

        for (var i=0; i<this.interior.rooms.length;i++) {
            var room = this.interior.rooms[i];

            var y = y_start;
            var x = x_start;
            
            var tile_group = room.floor.group != null ? room.floor.group : 'FILL_';
            this.floorLayer.weightedRandomize(TILES[room.floor.tile][tile_group], x+1, y + room.wall.height + 1, room.floor.width, room.floor.height);

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

            this.wallLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.TOP_RIGHT_, x_right, y + 1 + room.floor.height, 1, room.wall.height-1);
            this.wallLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.MID_RIGHT_, x_right, y + room.floor.height + room.wall.height, 1, 1);
            this.wallLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.LOWER_RIGHT_, x_right, y + room.floor.height + room.wall.height + 1, 1, 1);
            



            for (var h=0; h<room.wall.height;h++) {
                var place = 'MID_';
                if (h == 0) {place = 'TOP_';}
                if (h == room.wall.height - 1) {place = 'LOWER_';}
                this.wallLayer.weightedRandomize(WALLTILES[room.wall.type][room.wall.variety][place], x+1, y + 1+h, room.floor.width, 1);
            }
            


            x_start = x + room.floor.width + 2;
            y_start = y_start + 2;
    }

        this.windows_cooked = false;
    }

    create () {
        
    }

    update () {
        if (!this.windows_cooked) {
            this.cookWindow(1,2);
            this.windows_cooked = true;
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

        var room_count = Phaser.Math.Between(1, 4);
        var rooms = [];
        for (var i=0; i<room_count; i++) {
            
            var floor_choice = Phaser.Math.Between(0, floor_choices.length - 1);
            var wall_choice = Phaser.Math.Between(0, wall_choices.length - 1);

            var floor_width = Phaser.Math.Between(floor.width.min, floor.width.max);

            var floor_height = Phaser.Math.Between(floor.height.min, floor.height.max);

            rooms[i] =  {
                floor: {
                    width: floor_width,
                    height: floor_height,
                    tile: floor_choices[floor_choice].tile,
                    group: floor_choices[floor_choice].group
                },
                wall: {
                    height: 3,
                    type: wall_choices[wall_choice].type,
                    variety: wall_choices[wall_choice].variety,
                }
            };
        }
        return rooms;
        
    }

    cookStairs (_x, _y, width, height) {
        this.floorLayer.weightedRandomize(TILES.STAIRS.WOOD_LEFT_TOP_, _x, _y, 1,1);

        this.floorLayer.weightedRandomize(TILES.STAIRS.WOOD_RIGHT_TOP_, _x + 1, _y, 1,1);

        this.floorLayer.weightedRandomize(TILES.STAIRS.WOOD_LEFT_, _x, _y+1, 1,height - 2);

        this.floorLayer.weightedRandomize(TILES.STAIRS.WOOD_RIGHT_, _x + 1, _y+1, 1,height - 2);

        this.floorLayer.weightedRandomize(TILES.STAIRS.WOOD_LEFT_BOTTOM_, _x, _y+height-1, 1,1);

        this.floorLayer.weightedRandomize(TILES.STAIRS.WOOD_RIGHT_BOTTOM_, _x + 1, _y+height-1, 1,1);
    }

    cookWindow (_x,_y) {
       //this.scene.add.sprite(_x*16, _y*16, 'INT_WINDOW_BLINDS',0);

        var pixel_x = _x*16;
        var pixel_y = _y*16;
        var sprite_frame = Phaser.Math.Between(0,3);
        const view = this.scene.add.rectangle(pixel_x + 4, pixel_y, 24, 16, 0xffa0a0).setOrigin(0);
        const frame = this.scene.add.sprite(pixel_x, pixel_y, "int_window", sprite_frame).setOrigin(0);
        //marker.anims.play("INT_WINDOW_BLINDS", false);
        //marker.anims.stop();
        //marker.setVisible(false);
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
                this.floorLayer.weightedRandomize(tile[recipe_index],parseInt( _x + w),parseInt(_y + h), 1, 1);
                recipe_index++;

                //this.groundLayer.putTileAt(0, parseInt( _x + w),parseInt(_y + h))
            }
        }
    }

    

}