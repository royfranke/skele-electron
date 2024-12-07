import TILES from "../config/atlas/tile-weights.js";
import EDGETILES from "../config/atlas/edge-tile-weights.js";
import COOK from "../config/atlas/tile-recipes.js";
import WALLTILES from "../config/atlas/wall-tile-weights.js";
import ROOFTILES from "../config/atlas/roof-tile-weights.js";
import MAP_CONFIG from "../config/map.js";
import Ground from "../handler/ground.js";
import Block from "./exterior-block.js";
import Navigator from "../navigator/navigator-manager.js";
import BlockNode from "./exterior-block-node.js";
import KEYLIGHT from "../config/key-light.js";

/**
 * 	Manage Exteriors (Overworld tile scenes)
 *	
 */
 export default class ExteriorManager {

    constructor(scene) {
        this.scene = scene;
        this.initialize();
    }

    initialize () {
        this.keylight = KEYLIGHT;

        this.nav = new Navigator(this.scene);

        this.lastBlock = {x: 0, y: 0};
        this.lastTile = {x: 0, y: 0};

        this.map = this.scene.make.tilemap({
            tileWidth: MAP_CONFIG.tileSize,
            tileHeight: MAP_CONFIG.tileSize,
            width: MAP_CONFIG.width,
            height: MAP_CONFIG.height,
        });

        const tileset = this.map.addTilesetImage("ground", null, 16, 16, 0, 0);
        const edge_tileset = this.map.addTilesetImage("edge", null, 16, 16, 0, 0);
        const wall_tileset = this.map.addTilesetImage("wall", null, 16, 16, 0, 0);
        const roof_tileset = this.map.addTilesetImage("roof", null, 16, 16, 0, 0);
        
        this.groundLayer = this.map.createBlankLayer("Ground", tileset).fill(0);
        this.edgeLayer = this.map.createBlankLayer("Edge",edge_tileset);
        this.wallLayer = this.map.createBlankLayer("Wall", wall_tileset);
        this.roofLayer = this.map.createBlankLayer("Roof", roof_tileset);
        this.roofLayer.setDepth(1000);
        this.buildMap();
    }

    buildMap () {
        const self = this;
        const blocks = new Array(MAP_CONFIG.sectionsHeight).fill().map(() => new Array(this.map.sectionsWidth).fill(0));

        MAP_CONFIG.blocks.forEach(function (block, index) {
            blocks[block.y][block.x] = new Block(self.scene,self.groundLayer,self.wallLayer,self.roofLayer, block); /// Backwards on purpose to not require array flip
            
        });

        MAP_CONFIG.propertyLines.forEach(function (prop, index) {
            blocks[prop.block.y][prop.block.x].addPropertyLine(prop); /// Backwards on purpose to not require array flip
            
        });
        let nodesHeight = parseInt(MAP_CONFIG.sectionsHeight + 3);
        let nodesWidth = parseInt(MAP_CONFIG.sectionsWidth + 3);
        const nodes = new Array(nodesHeight).fill().map(() => new Array(nodesWidth).fill(0));
        
        
        MAP_CONFIG.nodes.forEach(function (node, index) {
            nodes[node.y][node.x] = new BlockNode(self.groundLayer, node); /// Backwards on purpose to not require array flip
            
            if (node.streets.n.found != 0) {
                /// Get north street coords
                
                var block_tiles = (MAP_CONFIG.blockHeight * (node.y - node.streets.n.connect))/2; /// TODO: fix
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
                var block_tiles = (MAP_CONFIG.blockWidth * (node.streets.e.connect - node.x))/2; /// TODO: fix
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
                var block_tiles = (MAP_CONFIG.blockHeight * (node.streets.s.connect - node.y))/2; /// TODO: fix
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
                var block_tiles = (MAP_CONFIG.blockWidth * (node.x - node.streets.w.connect))/2; /// TODO: fix
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
        this.nodes = nodes;

        this.blocks = blocks;
        this.block = null;
        this.ground = new Ground(this.groundLayer, this.edgeLayer);
        
    }

    create () {
        self = this;
        MAP_CONFIG.blocks.forEach(function (block, index) {
            self.blocks[block.y][block.x].buildProperties();
            self.blocks[block.y][block.x].buildObjects(); 
            self.setCorners(block);
            
        });
        const objectManager = this.scene.manager.objectManager;

        MAP_CONFIG.nodes.forEach(function (node, index) {
            self.nodes[node.y][node.x].buildObjects(objectManager); 
        });
        this.ground.initializeTiles();
        
    }

    setKeyLight (key_light_name) {
        var phase = this.keylight[key_light_name];
        this.groundLayer.setTint(phase.ground_tint);
        this.edgeLayer.setTint(phase.ground_tint);
        this.wallLayer.setTint(phase.wall_tint);
        this.roofLayer.setTint(phase.roof_tint);
    }

    createItems () {
        let blocks = this.blocks;
        MAP_CONFIG.blocks.forEach(function (block, index) {
            blocks[block.y][block.x].buildItems(); 
        });
        
    }

    update () {
        const x = this.scene.player.action.actionTile.x;
        const y = this.scene.player.action.actionTile.y;
        var thisBlock = this.xyToBlock(x,y);
        if (this.lastBlock.x != thisBlock.x || this.lastBlock.y != thisBlock.y) {
            this.lastBlock = thisBlock;
            this.block = this.getBlock(thisBlock.x, thisBlock.y);

            //this.updateDirections();
        }
/*
        if (this.lastTile.x != x || this.lastTile.y != y) {
            this.lastTile = {x: x, y: y};
            if (this.block) {
                var quad = this.blockQuadrant(x,y);
                var map_message = this.getPositionString(quad.v, quad.h, this.block.block);
                var prop = this.block.onProperty(x,y);
                if (prop) {
                    map_message = 'at '+prop.address.number+' '+prop.address.dir+' '+prop.address.street;
                }
                if (map_message != '') {
                    map_message = 'I am ' + map_message;
                }
                //this.scene.manager.hud.hudDisplay.tellMapBoxFlag(map_message);
            }
        }
*/
        
    }

    updateDirections () {
        
            var plot = this.nav.plotRoutes(4,4,5,9,'intersection');
            var directions = plot.join(" ");
            this.scene.manager.hud.hudDisplay.drawDirections(directions);

    }

    buildCity () {
        const blocks = this.blocks;
        MAP_CONFIG.blocks.forEach(function (block, index) {
            blocks[block.y][block.x].buildProperties(); 
        });

    }

    setCorners (block) {
        var self = this;
        var recipe = self.cook('SIDEWALK_2X2');
        var recipe_x = 0;
        var recipe_y = 0;
        var sidewalk_depth = 3;

        if (block.offset.n > 0) {
            // Top / North Side of block
            // Bottom / South side of street!
            recipe_x = block.left;
            recipe_y = block.top;
            
            //self.cookRecipe(recipe_x, recipe_y, recipe);
            /// Start with plain cement fill for sidewalks
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, recipe_x, recipe_y,block.width-2, sidewalk_depth);
        }

        if (block.offset.e > 0) {
            // Right / East Side of block
            // Left / West side of street!
            recipe_x = block.right-sidewalk_depth;
            recipe_y = block.top;
            
            //self.cookRecipe(recipe_x, recipe_y, recipe);
            /// Start with plain cement fill for sidewalks
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, recipe_x, recipe_y,sidewalk_depth, block.height-2);
        }

        if (block.offset.s > 0) {
            // Bottom / South Side of block
            // Top / North side of street!
            recipe_x = block.left+1;
            recipe_y = block.bottom-sidewalk_depth;
            /// Start with plain cement fill for sidewalks
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, recipe_x, recipe_y,block.width-2, sidewalk_depth);
        }

        if (block.offset.w > 0) {
            // Left / West Side of block
            // Right / East side of street!
            recipe_x = block.left;
            recipe_y = block.top;
            /// Start with plain cement fill for sidewalks
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, recipe_x, recipe_y,sidewalk_depth, block.height);
        }

        if (block.offset.n > 0 && block.offset.w > 0) { // Upper left
            this.groundLayer.weightedRandomize(TILES.CURB.SOUTHEAST_, block.left - 1, block.top - 1,1, 1);
            this.groundLayer.weightedRandomize(TILES.CURB.SOUTH_, block.left, block.top - 1,1, 1);
            recipe_x = block.left;
            recipe_y = block.top;
            self.cookRecipe(recipe_x, recipe_y, recipe);
            
        }
        if (block.offset.n > 0 && block.offset.e > 0) {  // Upper right
            this.groundLayer.weightedRandomize(TILES.CURB.SOUTHWEST_, block.right, block.top - 1,1, 1);

            recipe_x = block.right-recipe.WIDTH;
            recipe_y = block.top;
            self.cookRecipe(recipe_x, recipe_y, recipe);

        }
        if (block.offset.s > 0 && block.offset.w > 0) { // Lower left
            this.groundLayer.weightedRandomize(TILES.CURB.NORTHEAST_, block.left - 1, block.bottom,1, 1);

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

    getBlockNodeProperties (_x,_y) {
        /// first make sure this.nodes.[_y][_x] exists
        if (this.nodes[_y] == undefined || this.nodes[_y][_x] == undefined) {
            return null;
        }
        return this.nodes[_y][_x].node == undefined ? null : this.nodes[_y][_x].node;
    }

    getBlockNode (_x,_y) {
        if (this.nodes[_y] == undefined || this.nodes[_y][_x] == undefined) {
            return null;
        }
        return this.nodes[_y][_x];
    }


    getBlockProperties (_x,_y) {
        return this.blocks[_y][_x].block;
    }

    getBlock (_x,_y) {
        return this.blocks[_y][_x];
    }

    xyToBlock (_x,_y) {
        return {
            x: Math.floor(_x/MAP_CONFIG.blockWidth),
            y: Math.floor(_y/MAP_CONFIG.blockHeight)
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

    getMailboxTilesFromAddress(dir, number, street) {
        let mailbox = this.getMailboxFromAddress(dir, number, street);
        return {x: mailbox.x, y: mailbox.y};
    }

    getMailboxFromAddress(dir, number, street) {
       let prop = this.getPropertyFromAddress(dir, number, street);
       if (!prop) {
           return;
       }
       else {
        return {x: prop.lines.left,y: prop.lines.bottom};
       }
    }

    getPropertyFromAddress(dir, number, street) {
        var found = false;
        MAP_CONFIG.propertyLines.forEach(function (prop, index) {
            if (prop.address.number == number && prop.address.street == street && prop.address.dir == dir) {
                found = prop;
            }
        });
        if (!found) {
            console.log('Requested property not found: '+dir+' '+number+' '+street);
        }
        return found;
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

    validBlock (_x,_y) {
        if (_x < 0 || _y < 0 || _x >= MAP_CONFIG.sectionsWidth || _y >= MAP_CONFIG.sectionsHeight) {
            return false;
        }
        return true;
    }

}