import TILES from "../config/atlas/tile-weights.js";
import COOK from "../config/atlas/tile-recipes.js";
import WALLTILES from "../config/atlas/wall-tile-weights.js";
import Ground from "../handler/ground.js";
import ObjectManager from "../objects/object-manager.js";
import Room from "../object/room.js";

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

        this.createMap();
        
 
    }

    create () {
        this.buildFeatureList();
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
    }

    buildRoom () {
        console.log('building room');
        if (!this.built) {
            this.config = this.room.config;
            /// Start with the floor.
            var _x = 1;
            var _y = 5;
            var base_flooring = '';

            if (this.config.floorSlug != undefined && this.config.floorSlug != '') {
                base_flooring += this.config.floorSlug;
            }
            else {
                base_flooring += 'TILE.CHECKERED_WHITE_BROWN_';
            }

            // Now break apart the flooring string to access the tileset
            var flooring = base_flooring.split('.');
 
    
            this.groundLayer.weightedRandomize(TILES[flooring[0]][flooring[1]], _x, _y, this.config.floorWidth, this.config.floorHeight);
            

            const groundLayer = this.groundLayer;
            

            for (let i = 0; i < this.config.roomData.removalList.length; i++) {
                let removal = this.config.roomData.removalList[i];
                groundLayer.putTileAt(0, _x + removal.x, _y + removal.y);
            }
            this.drawFloorCutAway();
            this.drawWallCutAway();
            this.built = true;
        }
    }

    buildFeatureList () {
        /// Start with the floor.
        var _x = 1;
        var _y = 5;
        for (let i = 0; i < this.room.config.roomData.featureList.length; i++) {
            let feature = this.room.config.roomData.featureList[i];
            if (feature.slug != 'FRONTDOOR') {
                let obj = this.scene.manager.objectManager.newObjectToWorld(_x + feature.x, _y + feature.y,feature.slug);
                if (obj != null && feature.params != undefined && feature.params.portal != undefined) {
                    obj.setPortal(feature.params.portal);
                }
            }
            else {
                let obj = this.scene.manager.objectManager.newObjectToWorld(_x + feature.x, _y + feature.y,'EXT_DOOR_WINDOWS_GRAY');
                obj.setPortal({room_id: '-1', x: 16, y: 16, facing: 'S'});
            }
        }
    }

    getEntry () {
        return {
            x: this.player_start_x,
            y: this.player_start_y
        };
    }

    drawWallCutAway () {
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
                    this.wallLayer.weightedRandomize(WALLTILES.PAINT.PINK_WORN_.LOWER_, x, y, 1, 1);
                    this.wallLayer.weightedRandomize(WALLTILES.PAINT.PINK_WORN_.MID_, x, y-1, 1, 1);
                    this.wallLayer.weightedRandomize(WALLTILES.PAINT.PINK_WORN_.TOP_, x, y-2, 1, 1);

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