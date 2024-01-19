import TILES from "../config/atlas/tile-weights.js";
import COOK from "../config/atlas/tile-recipes.js";
import MAP_CONFIG from "../config/map.js";
import ExteriorGround from "./exterior-ground.js";
import Block from "./exterior-block.js";
import BlockNode from "./exterior-block-node.js";

/**
 * 	Manage Exteriors (Overworld tile scenes)
 *	
 */
 export default class ExteriorManager {

    constructor(scene) {
        this.scene = scene;

        this.overMap = MAP_CONFIG;
        this.lastBlock = {x: 0, y: 0};
        this.lastTile = {x: 0, y: 0};

        this.map = this.scene.make.tilemap({
            tileWidth: this.overMap.tileSize,
            tileHeight: this.overMap.tileSize,
            width: this.overMap.width,
            height: this.overMap.height,
        });
        const overMap = this.overMap;

        const tileset = this.map.addTilesetImage("ground", null, 16, 16, 0, 0); // 1px margin, 2px spacing
        this.groundLayer = this.map.createBlankLayer("Ground", tileset).fill(TILES.BLANK);

        const groundLayer = this.groundLayer;
        var self = this;
        const blocks = new Array(this.overMap.sectionsHeight).fill().map(() => new Array(this.map.sectionsWidth).fill(0));

        overMap.blocks.forEach(function (block, index) {
            blocks[block.y][block.x] = new Block(self.scene,groundLayer, block); /// Backwards on purpose to not require array flip
            
        });

        overMap.propertyLines.forEach(function (prop, index) {
            blocks[prop.block.y][prop.block.x].addPropertyLine(prop); /// Backwards on purpose to not require array flip
            
        });

        console.log(blocks);
        let nodesHeight = parseInt(this.overMap.sectionsHeight + 3);
        let nodesWidth = parseInt(this.overMap.sectionsWidth + 3);
        const nodes = new Array(nodesHeight).fill().map(() => new Array(nodesWidth).fill(0));

        overMap.nodes.forEach(function (node, index) {
            nodes[node.y][node.x] = new BlockNode(groundLayer, node); /// Backwards on purpose to not require array flip


            if (node.streets.n.found != 0) {
                /// Get north street coords
                
                var block_tiles = (overMap.blockHeight * (node.y - node.streets.n.connect))/2; /// TODO: fix
                var ways = node.streets.n.dir.trim().length;
                var two_way = ways > 1 ? node.streets.n.dir.toUpperCase()+'_' : '';
                var recipe_name = 'CROSSWALK_'+ways+'WAY_'+node.streets.n.lanes+'LANE_'+two_way+'N_';
                var recipe = self.cook(recipe_name);
                var recipe_x = node.left;
                if (node.width != recipe.WIDTH) {
                    recipe_x = node.left + Math.ceil((node.width - recipe.WIDTH)/2);
                }

                var recipe_y = node.top - recipe.HEIGHT + 1;
                
                self.cookRecipe(recipe_x, recipe_y, recipe);
                block_tiles = block_tiles - recipe.HEIGHT;
                if (ways == 1) {
                    for (var i=0;i<3; i++) {
                        // Increments y position for start of tile recipe by height and y of previous recipe
                        var recipe_name =  'STREET_'+ways+'WAY_'+node.streets.n.lanes+'LANE_'+node.streets.n.dir.toUpperCase()+'_';
                        var recipe = self.cook(recipe_name);
                        recipe_y = recipe_y - recipe.HEIGHT;
                        self.cookRecipe(recipe_x, recipe_y, recipe);
                        block_tiles = block_tiles - recipe.HEIGHT;
                    }
                }
                for (var i=0;i<block_tiles; i++) {
                    var recipe_name = 'STREET_'+ways+'WAY_'+node.streets.n.lanes+'LANE_NS_';
                    var recipe = self.cook(recipe_name);
                    recipe_y = recipe_y - recipe.HEIGHT;
                    self.cookRecipe(recipe_x, recipe_y, recipe);
                }
            }


            if (node.streets.e.found == 0 || node.streets.e.connect == -1) {
            }
            else {
                /// Get east street coords
                var block_tiles = (overMap.blockWidth * (node.streets.e.connect - node.x))/2; /// TODO: fix
                var ways = node.streets.e.dir.trim().length;
                var two_way = ways > 1 ? node.streets.e.dir.toUpperCase()+'_' : '';
                var recipe_name = 'CROSSWALK_'+ways+'WAY_'+node.streets.e.lanes+'LANE_'+two_way+'E_';
                var recipe = self.cook(recipe_name);
                var recipe_y = node.top;
                if (node.height != recipe.HEIGHT) {
                    recipe_y = node.top + Math.ceil((node.height - recipe.HEIGHT)/2);
                }

                var recipe_x = node.right;
                
                self.cookRecipe(recipe_x, recipe_y, recipe);
                block_tiles = block_tiles - recipe.WIDTH;
                if (ways == 1) {
                    for (var i=0;i<3; i++) {
                        // Increments x position for start of tile recipe by width and x of previous recipe
                        recipe_x = recipe_x + recipe.WIDTH;

                        var recipe_name = 'STREET_'+ways+'WAY_'+node.streets.e.lanes+'LANE_'+node.streets.e.dir.toUpperCase()+'_';
                        var recipe = self.cook(recipe_name);
                        self.cookRecipe(recipe_x, recipe_y, recipe);
                        block_tiles = block_tiles - recipe.WIDTH;
                    }
                }
                for (var i=0;i<block_tiles; i++) {
                    recipe_x = recipe_x + recipe.WIDTH;

                    var recipe_name = 'STREET_'+ways+'WAY_'+node.streets.e.lanes+'LANE_EW_';
                    var recipe = self.cook(recipe_name);
                    self.cookRecipe(recipe_x, recipe_y, recipe);
                }
            }
            
            if (node.streets.s.found == 0 || node.streets.s.connect == -1) {

            }
            else {
                /// Get south street coords
                var block_tiles = (overMap.blockHeight * (node.streets.s.connect - node.y))/2; /// TODO: fix
                var ways = node.streets.s.dir.trim().length;
                var two_way = ways > 1 ? node.streets.s.dir.toUpperCase()+'_' : '';
                var recipe_name = 'CROSSWALK_'+ways+'WAY_'+node.streets.s.lanes+'LANE_'+two_way+'S_';
                var recipe = self.cook(recipe_name);
                
                var recipe_x = node.left;
                if (node.width != recipe.WIDTH) {
                    recipe_x = node.left + Math.ceil((node.width - recipe.WIDTH)/2);
                }

                var recipe_y = node.bottom;
                
                self.cookRecipe(recipe_x, recipe_y, recipe);                block_tiles = block_tiles - recipe.HEIGHT;                if (ways == 1) {
                    for (var i=0;i<3; i++) {
                        // Increments y position for start of tile recipe by height and y of previous recipe
                        recipe_y = recipe_y + recipe.HEIGHT;
                        var recipe_name =  'STREET_'+ways+'WAY_'+node.streets.s.lanes+'LANE_'+node.streets.s.dir.toUpperCase()+'_';
                        var recipe = self.cook(recipe_name);
                        self.cookRecipe(recipe_x, recipe_y, recipe);
                        block_tiles = block_tiles - recipe.HEIGHT;
                    }
                }
                for (var i=0;i<block_tiles; i++) {
                    recipe_y = recipe_y + recipe.HEIGHT;

                    var recipe_name = 'STREET_'+ways+'WAY_'+node.streets.s.lanes+'LANE_NS_';
                    var recipe = self.cook(recipe_name);
                    self.cookRecipe(recipe_x, recipe_y, recipe);
                }
            }

            if (node.streets.w.found == 0 || node.streets.w.connect == -1) {
                //groundLayer.weightedRandomize(TILES.CURB.WEST_, node.left, node.top + 1,1, node.height - 1);
            }
            else {
                /// Get west street coords
                var block_tiles = (overMap.blockWidth * (node.x - node.streets.w.connect))/2; /// TODO: fix
                var ways = node.streets.w.dir.trim().length;
                var two_way = ways > 1 ? node.streets.w.dir.toUpperCase()+'_' : '';
                var recipe_name = 'CROSSWALK_'+ways+'WAY_'+node.streets.w.lanes+'LANE_'+two_way+'W_';
                var recipe = self.cook(recipe_name);
                var recipe_y = node.top;
                if (node.height != recipe.HEIGHT) {
                    recipe_y = node.top + Math.ceil((node.height - recipe.HEIGHT)/2);
                }

                var recipe_x = node.left - recipe.WIDTH + 1;
                
                self.cookRecipe(recipe_x, recipe_y, recipe);
                block_tiles = block_tiles - recipe.WIDTH;
                if (ways == 1) { /// One ways west
                    for (var i=0;i<3; i++) {
                        // Increments x position for start of tile recipe by width and x of previous recipe

                        var recipe_name = 'STREET_'+ways+'WAY_'+node.streets.w.lanes+'LANE_'+node.streets.w.dir.toUpperCase()+'_';
                        var recipe = self.cook(recipe_name);
                        recipe_x = recipe_x - recipe.WIDTH;
                        self.cookRecipe(recipe_x, recipe_y, recipe);
                        block_tiles = block_tiles - recipe.WIDTH;
                    }
                } /// One ways end
                for (var i=0;i<block_tiles; i++) {
            
                    var recipe_name = 'STREET_'+ways+'WAY_'+node.streets.w.lanes+'LANE_EW_';
                    var recipe = self.cook(recipe_name);
                    recipe_x = recipe_x - recipe.WIDTH;
                    self.cookRecipe(recipe_x, recipe_y, recipe);
                }
            }
        });

        overMap.blocks.forEach(function (block, index) {
            self.setCorners(block);
        });

        this.blocks = blocks;
        this.block = null;
        this.ground = new ExteriorGround(this.scene);
        this.ground.initializeTiles(this.groundLayer);
    }

    create () {
        
    }

    update () {

    }

    buildCity () {
        const blocks = this.blocks;
        this.overMap.blocks.forEach(function (block, index) {
            blocks[block.y][block.x].buildProperties(); 
        });
    }

    setCorners (block) {
        var self = this;
        var recipe = self.cook('SIDEWALK_2X2');
        var recipe_x = 0;
        var recipe_y = 0;

        if (block.offset.n > 0) {
            // Top / North Side of block
            // Bottom / South side of street!
            recipe_x = block.left+1;
            recipe_y = block.top+1;
            //self.cookRecipe(recipe_x, recipe_y, recipe);
            /// Start with plain cement fill for sidewalks
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, recipe_x, recipe_y,block.width-2, 2);
        }

        if (block.offset.e > 0) {
            // Right / East Side of block
            // Left / West side of street!
            recipe_x = block.right-2;
            recipe_y = block.top+1;
            //self.cookRecipe(recipe_x, recipe_y, recipe);
            /// Start with plain cement fill for sidewalks
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, recipe_x, recipe_y,2, block.height-2);
        }

        if (block.offset.s > 0) {
            // Bottom / South Side of block
            // Top / North side of street!
            recipe_x = block.left+1;
            recipe_y = block.bottom-2;
            /// Start with plain cement fill for sidewalks
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, recipe_x, recipe_y,block.width-2, 2);
        }

        if (block.offset.w > 0) {
            // Left / West Side of block
            // Right / East side of street!
            recipe_x = block.left+1;
            recipe_y = block.top+1;
            /// Start with plain cement fill for sidewalks
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, recipe_x, recipe_y,2, block.height-2);
        }

        if (block.offset.n > 0 && block.offset.w > 0) { // Upper left
            this.groundLayer.weightedRandomize(TILES.CURB.SOUTHEAST_, block.left, block.top,1, 1);
            recipe_x = block.left+1;
            recipe_y = block.top+1;
            self.cookRecipe(recipe_x, recipe_y, recipe);
            
        }
        if (block.offset.n > 0 && block.offset.e > 0) {  // Upper right
            this.groundLayer.weightedRandomize(TILES.CURB.SOUTHWEST_, block.right, block.top,1, 1);

            recipe_x = block.right-recipe.WIDTH;
            recipe_y = block.top+1;
            self.cookRecipe(recipe_x, recipe_y, recipe);

        }
        if (block.offset.s > 0 && block.offset.w > 0) { // Lower left
            this.groundLayer.weightedRandomize(TILES.CURB.NORTHEAST_, block.left, block.bottom,1, 1);

            recipe_x = block.left+1;
            recipe_y = block.bottom-recipe.HEIGHT;
            self.cookRecipe(recipe_x, recipe_y, recipe);
        }
        if (block.offset.s > 0 && block.offset.e > 0) { // LOWER RIGHT
            this.groundLayer.weightedRandomize(TILES.CURB.NORTHWEST_, block.right, block.bottom,1, 1);

            recipe_x = block.right-recipe.WIDTH;
            recipe_y = block.bottom-recipe.HEIGHT;
            self.cookRecipe(recipe_x, recipe_y, recipe);
        }

    }


    getBlockProperties (_x,_y) {
        return this.blocks[_y][_x].block;
    }

    getBlock (_x,_y) {
        return this.blocks[_y][_x];
    }

    xyToBlock (_x,_y) {
        return {
            x: Math.floor(_x/this.overMap.blockWidth),
            y: Math.floor(_y/this.overMap.blockHeight)
        };
    }

    blockQuadrant (_x,_y) {
        const block = this.block;
        var quadrant = {v: '', h: ''};
        if (_x - block.left > block.width / 2) { ///  East
            quadrant.h = 'e';
        }
        else { /// West
            quadrant.h = 'w';
        }

        if (_y - block.top < block.height / 2) { ///  North
            quadrant.v = 'n';
        }
        else { /// South
            quadrant.v = 's';
        }
        return quadrant;

    }

    cook (recipe_name) {
        var recipe = COOK[recipe_name];
        if (recipe == undefined) {
            console.log('Missing recipe: '+recipe_name);
            return false;
        }
        return recipe;
    }

    cookRecipe(_x, _y, recipe) {
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

    getPositionString (_v,_h, _block) {
        var position_string = '';
        if (_v != '' && _block.bounds[_v] != '') {
            if (_v == 'n') {
                position_string = 'south of '+_block.bounds[_v];
            }
            else {
                position_string = 'north of '+_block.bounds[_v];
            }

            if (_h != '' && _block.bounds[_h] != '') {
                position_string += ' & ';
            }
        }
        if (_h != '' && _block.bounds[_h] != '') {
            if (_h == 'e') {
                position_string += 'west of '+_block.bounds[_h];
            }
            else {
                position_string += 'east of '+_block.bounds[_h];
            }
        }
        return position_string;
    }

}