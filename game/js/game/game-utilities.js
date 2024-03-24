import TILES from "../config/atlas/tile-weights.js";
import GROUND_LOOKUP from "../config/atlas/type-by-tile-index.js";
import GROUND_TYPE from "../config/atlas/ground-types.js";
import COOK from "../config/atlas/tile-recipes.js";

export default class GameUtilities {

    constructor() {
        const BITMAP_CODE = [1, 2, 4, 8, 0, 16, 32, 64, 128];
        const BITMAP_MAPPING = [0,0,1,1,0,0,1,1,2,2,3,4,2,2,3,4,5,5,6,6,5,5,7,7,8,8,9,10,8,8,11,12,0,0,1,1,0,0,1,1,2,2,3,4,2,2,3,4,5,5,6,6,5,5,7,7,8,8,9,10,8,8,11,12,13,13,14,14,13,13,14,14,15,15,16,17,15,15,16,17,18,18,19,19,18,18,20,20,21,21,22,23,21,21,24,25,13,13,14,14,13,13,14,14,26,26,27,28,26,26,27,28,18,18,19,19,18,18,20,20,29,29,30,31,29,29,32,33,0,0,1,1,0,0,1,1,2,2,3,4,2,2,3,4,5,5,6,6,5,5,7,7,8,8,9,10,8,8,11,12,0,0,1,1,0,0,1,1,2,2,3,4,2,2,3,4,5,5,6,6,5,5,7,7,8,8,9,10,8,8,11,12,13,13,14,14,13,13,14,14,15,15,16,17,15,15,16,17,34,34,35,35,34,34,36,36,37,37,38,39,37,37,40,41,13,13,14,14,13,13,14,14,26,26,27,28,26,26,27,28,34,34,35,35,34,34,36,36,42,42,43,44,42,42,45,46];
    }

    mostFrequentValue(arr) {
        // Create an object to store the frequency of each value
        const frequencyMap = {};
      
        // Iterate through the array and count the frequency of each value
        arr.forEach(value => {
          frequencyMap[value] = (frequencyMap[value] || 0) + 1;
        });
      
        // Find the value with the highest frequency
        let mostFrequent = null;
        let maxFrequency = 0;
      
        for (const value in frequencyMap) {
          if (frequencyMap[value] > maxFrequency) {
            mostFrequent = value;
            maxFrequency = frequencyMap[value];
          }
        }
        return mostFrequent;
    }
    

    inBounds(_x, _y, layer) {
        return (_x*16 >= 0 && _x*16 < layer.width && _y*16 >= 0 && _y*16 < layer.height);
    }

    getGround(_x, _y, layer) {
        if (this.inBounds(_x, _y, layer)) {
            var tile = layer.getTileAt(_x,_y);
            var tile_type = GROUND_TYPE[tile.index];

            if (tile_type == undefined) { return; }
            return GROUND_TYPE[tile_type];
        }
    }

    placeTileType(_x, _y, layer, tile_type, forceRedraw) {

        if (this.inBounds(_x, _y, layer)) {
            var tile = layer.getTileAt(_x,_y);
            var old_tile_type = GROUND_LOOKUP[tile.index];
            console.log('Tile was: '+old_tile_type);
            console.log('Tile should become: '+tile_type);
            if (tile_type != old_tile_type || forceRedraw) {
                layer.weightedRandomize(TILES[tile_type].FILL_, _x,_y,1,1);
                this.changeTile(_x, _y, layer);
            }
        }
        return;
    }

    changeTile(_x, _y, layer) {
        for (var r = -1; r <= 1; r++) {
            for (var c = -1; c <= 1; c++) {
                var p_x = parseInt(_x + c);
                var p_y = parseInt(_y + r);
                if (this.inBounds(p_x, p_y, layer)) {
                    var tile_index = this.calculateTileBitmap(p_x, p_y, layer);
                    this.calculateTileTypeIndex(tile_index);
                }
            }
        }
        return;
    }


    calculateTileBitmap(_x, _y, layer) {
        if (this.inBounds(_x, _y, layer)) {
            var tile = layer.getTileAt(_x,_y);
            var tile_type = GROUND_LOOKUP[tile.index];

            if (tile_type == undefined) { console.warn('Failed at '+_x+' '+_y); return; }
            var tile_attr = GROUND_TYPE[tile_type];
            var border_votes = [];
            var position_index = 0;
            var place = 0;

            if (tile_attr.BITMAP) {
                for (var r = -1; r <= 1; r++) {
                    for (var c = -1; c <= 1; c++) {
                        if (this.inBounds(parseInt(_x + c), parseInt(_y + r),layer)) {
                            var neighbor_tile = layer.getTileAt(parseInt(_x + c), parseInt(_y + r));
                            var neighbor_tile_type = GROUND_LOOKUP[neighbor_tile.index];
                            if (neighbor_tile_type == tile_type) {
                                position_index = parseInt(position_index + BITMAP_MAPPING[place]);
                            }
                            else {
                                if (tile_type == 'GARDEN' && neighbor_tile_type == 'FOUNDATION') {
                                    position_index = parseInt(position_index + BITMAP_MAPPING[place]);
                                }
                                else {
                                    border_votes.push(neighbor_tile_type);
                                }
                                
                            }
                        }
                        place++;
                    }
                }
            }
            else {
                position_index = 255;
            }

            return { type: tile_type, position: position_index, border_votes: border_votes, layer: layer, x: _x, y: _y };
        }
    }

    initializeTiles (layer) {
        var initialized = 0;
        console.log('Layer Height: '+layer.height);
        console.log('Layer Width: '+layer.width);
        console.log('Layer Area: '+(layer.height * layer.width));
        for (var r = 0; r < layer.height; r++) {
            for (var c = -1; c <= layer.width; c++) {
                this.changeTile(c, r, layer);
                initialized++;
            }
        }
        console.log(initialized+" tiles initialized.");
    }


    getFacing(facing, up, right, down, left) {
        if (left) {
            if (up) {
                facing = 'nw';
            }
            else if (down) {
                facing = 'sw';
            }
            else {
                facing = 'w';
            }
        }
        else if (right) {
            if (up) {
                facing = 'ne';
            }
            else if (down) {
                facing = 'se';
            }
            else {
                facing = 'e';
            }
        }
        else if (down) {
            facing = 's';
        }
        else if (up) {
            facing = 'n';
        }
        return facing;
    }

    cook (recipe_name) {
        var recipe = COOK[recipe_name];
        if (recipe == undefined) {
            console.log('Missing recipe: '+recipe_name);
            return false;
        }
        return recipe;
    }

    cookRecipe(_x, _y, recipe,layer) {
        if (recipe == undefined) {
            return;
        }
        var width = recipe.WIDTH;
        var height = recipe.HEIGHT;
        var tile = recipe.TILES;
        var recipe_index = 0;
        for (var h=0;h<height;h++) {
            for (var w=0;w<width;w++) {
                layer.weightedRandomize(tile[recipe_index],parseInt( _x + w),parseInt(_y + h), 1, 1);
                recipe_index++;
            }
        }
    }

}