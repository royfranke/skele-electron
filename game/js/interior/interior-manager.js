import TILES from "../config/atlas/tile-weights.js";
import COOK from "../config/atlas/tile-recipes.js";
import WALLTILES from "../config/atlas/wall-tile-weights.js";
import Ground from "../handler/ground.js";
import ObjectManager from "../objects/object-manager.js";
import Room from "../object/room.js";
import KEYLIGHT from "../config/key-light.js";

/**
 * 	Manage Interiors (Non-overworld tile scenes)
 *	
 */
 export default class InteriorManager {

    constructor(scene) {
        this.scene = scene;
        this.player_start_x = 3;
        this.player_start_y = 7;
        this.built = false;
        this.room = new Room(this.scene, this.scene.room_id);
        this.doors = [];
        this.createMap();
        
 
    }

    create () {
        this.buildFeatureList();
        this.lastKeyLight = null;
        this.keylight = KEYLIGHT;

    }

    setKeyLight (key_light_name) {
        var phase = this.keylight[key_light_name];
        this.groundLayer.setTint(phase.ground_tint);
        this.edgeLayer.setTint(phase.wall_tint); /// note roof tint for edge in interior
        this.wallLayer.setTint(phase.wall_tint);
        this.roofLayer.setTint(phase.wall_tint);
        this.lastKeyLight = key_light_name;
    }


    update () {

    }

    createMap () {
        this.map = this.scene.make.tilemap({
            tileWidth: 16,
            tileHeight: 16,
            width: this.room.config.overallWidth,
            height: this.room.config.overallHeight + 6,
        });

        const tileset = this.map.addTilesetImage("ground", null, 16, 16, 0, 0);
        const edge_tileset = this.map.addTilesetImage("edge", null, 16, 16, 0, 0);
        const wall_tileset = this.map.addTilesetImage("wall", null, 16, 16, 0, 0);
        
        this.groundLayer = this.map.createBlankLayer("Ground", tileset).fill(0);
        this.edgeLayer = this.map.createBlankLayer("Edge",edge_tileset);
        this.wallLayer = this.map.createBlankLayer("Wall", wall_tileset);

        this.roofLayer = this.map.createBlankLayer("Roof", wall_tileset).setDepth(this.map.height*16);

        this.buildRoom();

        this.ground = new Ground(this.groundLayer, this.edgeLayer);
        //this.scene.app.camera.setBounds(this.map.widthInPixels, this.map.heightInPixels);
        
    }

    createItems () {
        ///
        if (this.room.config.roomData.itemList == undefined) return;
        this.room.config.roomData.itemList.forEach(item => {
            this.scene.manager.itemManager.newItemToWorld(item.x + 1, item.y + this.wall_height + 1, item.slug);
        });
    }

    buildRoom () {
        console.log('building room');
        if (!this.built) {
            this.config = this.room.config;
            /// Start with the floor.
            var _x = 1;
            
            var base_flooring = '';
            var wall_height = this.config.wallHeight ? this.config.wallHeight : 3;

            var _y = wall_height + 1;

            this.wall_height = wall_height;

            if (this.config.floorSlug != undefined && this.config.floorSlug != '' && this.config.floorSlug != null) {
                base_flooring += this.config.floorSlug;
            }
            else {
                base_flooring += 'TILE.CHECKERED_WHITE_BROWN_';
            }
            console.log(base_flooring);
            // Now break apart the flooring string to access the tileset
            var flooring = base_flooring.split('.');
 
    
            this.groundLayer.weightedRandomize(TILES[flooring[0]][flooring[1]], _x, _y, this.config.floorWidth, this.config.floorHeight);
            

            const groundLayer = this.groundLayer;
            

            for (let i = 0; i < this.config.roomData.removalList.length; i++) {
                let removal = this.config.roomData.removalList[i];
                groundLayer.putTileAt(0, _x + removal.x, _y + removal.y);
            }
            if (this.config.roomData.recipeList != undefined && this.config.roomData.recipeList != '' && this.config.roomData.recipeList != null) {
                for (let i = 0; i < this.config.roomData.recipeList.length; i++) {
                    let recipe = this.config.roomData.recipeList[i];
                    if (recipe != null && recipe.slug != null) {
                        var flooring = recipe.slug.split('.');
                        this.groundLayer.weightedRandomize(TILES[flooring[0]][flooring[1]], _x + recipe.x, _y + recipe.y, 1,1);
                    }
                }
            }
            this.drawFloorCutAway();
            this.drawWallCutAway();
            this.built = true;
        }
    }

    buildFeatureList () {
        /// Start with the floor.
        var _x = 1;
        var _y = this.wall_height + 1;
        var has_front_door=false;
        var shelf_count = 0;
        for (let i = 0; i < this.room.config.roomData.featureList.length; i++) {
            let feature = this.room.config.roomData.featureList[i];
            if (feature.slug != 'FRONTDOOR') {
                let obj = this.scene.manager.objectManager.newObjectToWorld(_x + feature.x, _y + feature.y,feature.slug);
                
                if (obj != null && feature.params != undefined && feature.params.portal != undefined) {
                    if (feature.params.portal.room_id == -1) {
                        // get the address of this room and assign it to the portal
                        console.log(this.room.config.address);
                        if (this.room.config.address != undefined) {
                            feature.params.portal.address = this.room.config.address;
                        }
                    }
                    obj.setPortal(feature.params.portal);
                    console.log(feature.params.portal);
                    this.doors.push(obj);

                }

                if (obj != null && feature.params != undefined) {
                    obj.setParams(feature.params);
                }
                
                if (obj.info.type == 'STORE_COUNTER') {
                    obj.setServices(this.room.config.listing.services);
                }

                if (obj.info.type == 'SHOP_SHELVES') {
                    obj.setShelfProducts(_x + feature.x, _y + feature.y, this.room.config.listing.sells, this.config.listing.slug, shelf_count*4);
                    shelf_count++;
                }

            }
            else {
                if (!has_front_door) {
                    has_front_door = true;
                    this.front_door = {x: _x + feature.x,y: _y + feature.y};
                    
                }
            }
        }
    }
/*
    setPortalFromSave (portal) {
        if (portal != undefined) {
            if (this.front_door != undefined) {
                let x = this.front_door.x;
                let y = this.front_door.y;
                this.front_door = this.scene.manager.objectManager.newObjectToWorld(x, y,portal.SLUG)
                this.front_door.setPortal({room_id: portal.ROOM, x: portal.X, y: portal.Y, facing: portal.FACING, return: portal.RETURN, slug: portal.SLUG});
                this.front_door.setBehindGlass('0x000000', 0);
                this.front_door.glass.setAlpha(0.25);
            }
            else {
                console.log('No front door for room ' + this.room_id);
            }
        }
        else {
            console.log('No portal for room ' + this.room_id);
        }
    }
*/
    getEntry () {
        return {
            x: this.player_start_x,
            y: this.player_start_y
        };
    }

    drawWallCutAway () {
        var base_wall = '';
        if (this.config.wallSlug != undefined && this.config.wallSlug != '') {
            base_wall += this.config.wallSlug;
        }
        else {
            base_wall += 'PAINT.PINK_WORN_';
        }

        // Now break apart the wall string to access the tileset
        var wall = base_wall.split('.');
        
        // Loop through the tiles in this map and put a new tile where the tile index is 0 and the tile y-1 from it is 0 and the tile x+1 from it is not 0.
        var removeRoofTiles = [];
        for (let y = 0; y < this.map.height; y++) {
            for (let x = 0; x < this.map.width; x++) {

                let this_tile_blank = this.tileBlank(x,y);
                let upper_tile_blank = this.tileBlank(x,y-1);
                let lower_tile_blank = this.tileBlank(x,y+1);
                let right_tile_blank = this.tileBlank(x+1,y);
                let left_tile_blank = this.tileBlank(x-1,y);
                let left_lower_tile_blank = this.tileBlank(x-1,y+1);
                let right_lower_tile_blank = this.tileBlank(x+1,y+1);

                if (this_tile_blank && upper_tile_blank && !right_tile_blank) {
                    //this.wallLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.TOP_LEFT_, x, y, 1, 1);
                }
                if (this_tile_blank && upper_tile_blank && !left_tile_blank) {
                    //this.wallLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.TOP_RIGHT_, x, y, 1, 1);
                }
                if (this_tile_blank && !lower_tile_blank) {
                    this.wallLayer.weightedRandomize(WALLTILES[wall[0]][wall[1]].LOWER_, x, y, 1, 1);
                    this.wallLayer.weightedRandomize(WALLTILES[wall[0]][wall[1]].MID_, x, y-1, 1, 1);
                    this.wallLayer.weightedRandomize(WALLTILES[wall[0]][wall[1]].TOP_, x, y-2, 1, 1);

                    ////
                    removeRoofTiles.push({x: x, y: y});
                    removeRoofTiles.push({x: x, y: y-1});
                    removeRoofTiles.push({x: x, y: y-2});

                    this.wallLayer.weightedRandomize(WALLTILES.BORDER.TOPVIEW_.TOP_, x, y-3, 1, 1);

                    if (left_lower_tile_blank) {
                        this.wallLayer.weightedRandomize(WALLTILES.BORDER.TOPVIEW_.TOP_LEFT_, x-1, y-3, 1, 1);
                        
                        var section_floor_height = this.getSectionFloorHeight(x, y + 1);

                       this.roofLayer.weightedRandomize(WALLTILES.BORDER.TOPVIEW_.MID_LEFT_, x-1, y-2, 1, section_floor_height - 1);

                        this.roofLayer.weightedRandomize(WALLTILES.BORDER.TOPVIEW_.LOWER_LEFT_, x-1, (y-3) + section_floor_height, 1, 1);

                        this.roofLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.TOP_LEFT_, x-1, (y-3) + section_floor_height + 1, 1, 2);

                        this.roofLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.MID_LEFT_, x-1, y + section_floor_height, 1, 1);
                    }
                    if (right_lower_tile_blank) {
                        this.wallLayer.weightedRandomize(WALLTILES.BORDER.TOPVIEW_.TOP_RIGHT_, x+1, y-3, 1, 1);

                        var section_floor_height = this.getSectionFloorHeight(x, y + 1,false);

                        this.roofLayer.weightedRandomize(WALLTILES.BORDER.TOPVIEW_.MID_RIGHT_, x+1, y-2, 1, section_floor_height - 1);

                        this.roofLayer.weightedRandomize(WALLTILES.BORDER.TOPVIEW_.LOWER_RIGHT_, x+1, (y-3) + section_floor_height, 1, 1);

                        this.roofLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.TOP_RIGHT_, x+1, (y-3) + section_floor_height + 1, 1, 2);

                        this.roofLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.MID_RIGHT_, x+1, y + section_floor_height, 1, 1);
                    }
                }
            }
        }
        removeRoofTiles.forEach(tile => {
            this.roofLayer.putTileAt(0, tile.x, tile.y);
        });
    }

    getSectionFloorHeight (_x, _y, left=true) {
        var height = 0;
        let x = left ? _x - 1 : _x + 1;
        while (!this.tileBlank(_x,_y+height) && this.tileBlank(x,_y+height)) {
            height++;
        }
        return height;
    }

    drawFloorCutAway () {
        // Loop through the tiles in this map and put a new tile where the tile index is 0 and the tile x-1 from it is not 0.
        for (let y = 0; y < this.map.height; y++) {
            for (let x = 0; x < this.map.width; x++) {

                let this_tile_blank = this.tileBlank(x,y);
                let upper_tile_blank = this.tileBlank(x,y-1);

                if (this_tile_blank && !upper_tile_blank) {
                    this.wallLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_TILE_.LOWER_, x, y, 1, 1);
                    
                    let left_of_floor_blank = this.tileBlank(x - 1, y - 1);
                    if (left_of_floor_blank) {
                        this.wallLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.LOWER_LEFT_, x - 1, y, 1, 1);
                    }

                    let right_of_floor_blank = this.tileBlank(x + 1, y - 1);
                    
                    if (right_of_floor_blank) {   
                        this.wallLayer.weightedRandomize(WALLTILES.BORDER.SECTIONED_.LOWER_RIGHT_, x + 1, y, 1, 1);
                    }

                }
            }
        }
    
    }

    tileBlank (_x,_y) {
        return (this.groundLayer.getTileAt(_x, _y) == null || this.groundLayer.getTileAt(_x, _y).index === 0) ? true : false;
    }
    

    cookStairs (_x, _y, width, height) {
        this.groundLayer.weightedRandomize(TILES.STAIRS.WOOD_LEFT_TOP_, _x, _y, 1,1);

        this.groundLayer.weightedRandomize(TILES.STAIRS.WOOD_RIGHT_TOP_, _x + 1, _y, 1,1);

        this.groundLayer.weightedRandomize(TILES.STAIRS.WOOD_LEFT_, _x, _y+1, 1,height - 2);

        this.groundLayer.weightedRandomize(TILES.STAIRS.WOOD_RIGHT_, _x + 1, _y+1, 1,height - 2);

        this.groundLayer.weightedRandomize(TILES.STAIRS.WOOD_LEFT_BOTTOM_, _x, _y+height-1, 1,1);

        this.groundLayer.weightedRandomize(TILES.STAIRS.WOOD_RIGHT_BOTTOM_, _x + 1, _y+height-1, 1,1);
    }


    clearTileMaps () {
        this.groundLayer.fill(TILES.BLANK);
        this.wallLayer.fill(WALLTILES.BLANK);
    }

}