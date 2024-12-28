import TILES from "../config/atlas/tile-weights.js";
import GROUND_LOOKUP from "../config/atlas/type-by-tile-index.js";
import GROUND_TYPE from "../config/atlas/ground-types.js";
import COOK from "../config/atlas/tile-recipes.js";
import EDGETILES from "../config/atlas/edge-tile-weights.js";

export default class GameUtilities {

    constructor() {
        this.BITMAP_CODE = [1, 2, 4, 8, 0, 16, 32, 64, 128];
        this.mapping = [0,0,1,1,0,0,1,1,2,2,3,4,2,2,3,4,5,5,6,6,5,5,7,7,8,8,9,10,8,8,11,12,0,0,1,1,0,0,1,1,2,2,3,4,2,2,3,4,5,5,6,6,5,5,7,7,8,8,9,10,8,8,11,12,13,13,14,14,13,13,14,14,15,15,16,17,15,15,16,17,18,18,19,19,18,18,20,20,21,21,22,23,21,21,24,25,13,13,14,14,13,13,14,14,26,26,27,28,26,26,27,28,18,18,19,19,18,18,20,20,29,29,30,31,29,29,32,33,0,0,1,1,0,0,1,1,2,2,3,4,2,2,3,4,5,5,6,6,5,5,7,7,8,8,9,10,8,8,11,12,0,0,1,1,0,0,1,1,2,2,3,4,2,2,3,4,5,5,6,6,5,5,7,7,8,8,9,10,8,8,11,12,13,13,14,14,13,13,14,14,15,15,16,17,15,15,16,17,34,34,35,35,34,34,36,36,37,37,38,39,37,37,40,41,13,13,14,14,13,13,14,14,26,26,27,28,26,26,27,28,34,34,35,35,34,34,36,36,42,42,43,44,42,42,45,46];
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
            var tile_type = GROUND_LOOKUP[tile.index];

            if (tile_type == undefined) { return GROUND_TYPE['DIRT']; }
            return GROUND_TYPE[tile_type];
        }
    }

    buildFacadeSection(_x, _y, width, height, material, layer) {
        /// Lower left is _x, _y
        layer.weightedRandomize(material.LOWER_LEFT_, _x, _y, 1, 1);
        layer.weightedRandomize(material.LOWER_, _x + 1, _y, width - 2, 1);
        layer.weightedRandomize(material.LOWER_RIGHT_, _x + width - 1, _y, 1, 1);

        if (height > 2) {
            // go up by the number of mid tiles (height-2)
            _y = _y - (height - 2);
            layer.weightedRandomize(material.MID_LEFT_, _x, _y, 1, height - 2);
            layer.weightedRandomize(material.MID_, _x + 1, _y, width - 2, height - 2);
            layer.weightedRandomize(material.MID_RIGHT_, _x + width - 1, _y, 1, height - 2);
        }
        if (height > 1) {
            _y = _y - 1;
            layer.weightedRandomize(material.TOP_LEFT_, _x, _y, 1, 1);
            layer.weightedRandomize(material.TOP_, _x + 1, _y, width - 2, 1);
            layer.weightedRandomize(material.TOP_RIGHT_, _x + width - 1, _y, 1, 1);
        }

    }

    placeTileType(_x, _y, layer, edgeLayer, tile_type, forceRedraw) {

        if (this.inBounds(_x, _y, layer)) {
            var tile = layer.getTileAt(_x,_y);
            var old_tile_type = GROUND_LOOKUP[tile.index];
            if (tile_type != old_tile_type || forceRedraw) {
                layer.weightedRandomize(TILES[tile_type].FILL_, _x,_y,1,1);
                this.changeTile(_x, _y, layer, edgeLayer);
            }
        }
        return;
    }

    changeTile(_x, _y, layer, edgeLayer=null) {
        for (var r = -1; r <= 1; r++) {
            for (var c = -1; c <= 1; c++) {
                var p_x = parseInt(_x + c);
                var p_y = parseInt(_y + r);
                if (this.inBounds(p_x, p_y, layer)) {
                    var tile_index = this.calculateTileBitmap(p_x, p_y, layer, edgeLayer);
                    if (edgeLayer != null) {
                        edgeLayer.removeTileAt(p_x, p_y); /// Remove bitmap tile edge
                    }
                    this.calculateTileTypeIndex(tile_index);
                }
            }
        }
        return;
    }
    


    calculateTileBitmap(_x, _y, layer, edgeLayer) {
        if (this.inBounds(_x, _y, layer)) {
            var tile = layer.getTileAt(_x,_y);
            var tile_type = GROUND_LOOKUP[tile.index];
            var tile_attr = GROUND_TYPE[tile_type];

            if (tile_attr == undefined) {
                tile_type = GROUND_LOOKUP[1];
                tile_attr = GROUND_TYPE[tile_type];
                //console.warn('Failed at '+_x+' '+_y); return;
            }
            
            var border_votes = [];
            var position_index = 0;
            var place = 0;

                for (var r = -1; r <= 1; r++) {
                    for (var c = -1; c <= 1; c++) {
                        if (this.inBounds(parseInt(_x + c), parseInt(_y + r),layer)) {
                            var neighbor_tile = layer.getTileAt(parseInt(_x + c), parseInt(_y + r));
                            var neighbor_tile_type = GROUND_LOOKUP[neighbor_tile.index];
                            if (neighbor_tile_type == tile_type) {
                                position_index = parseInt(position_index + this.BITMAP_CODE[place]);
                            }
                            else {
                                border_votes.push(neighbor_tile_type);
                            }
                        }
                        place++;
                    }
                }

            return { type: tile_type, position: position_index, border_votes: border_votes, layer: layer, edgeLayer: edgeLayer, x: _x, y: _y };
        }
    }

    getBorderZIndex (border_votes) {
        var self = this;
        var highest = 0;
        var highest_border = '';
        border_votes.forEach(function (vote) {  
           var value = self.getZIndex(vote);
           if (value > highest) {
               highest = value;
               highest_border = vote;
           }
        });
        return {name: highest_border, z: highest};
    }

    getZIndex (vote) {
        var tile_attr = GROUND_TYPE[vote];
        if (tile_attr != undefined) {
            return tile_attr.ZINDEX;
        }
        return 0;
    }


    calculateTileTypeIndex ({ type: tile_type, position: position_index, border_votes: border_votes, layer: layer, edgeLayer: edgeLayer, x: _x, y: _y }) {
        if (position_index != 255) {
            var tile_attr = GROUND_TYPE[tile_type];

            if (tile_attr == undefined) {
                tile_type = 'DIRT';
                tile_attr = GROUND_TYPE[tile_type];
            }

            
            var mapped_index = this.mapping[position_index];
            var border_vote = this.mostFrequentValue(border_votes);
            
            if (tile_attr.BITMAP) {
                if (!TILES[tile_type].BITMAP_) {
                    if (tile_type == 'ROOF') {
                        if (TILES.ROOF.BITMAP_FLAT_BRICK_CEMENT_ != undefined) {
                            layer.putTileAt(TILES[tile_type].BITMAP_FLAT_BRICK_CEMENT_[0].index[mapped_index],_x,_y);
                        }
                    }
                    else if (tile_type == 'DIRT' && border_votes.includes('CEMENT')) {
                        layer.putTileAt(TILES[tile_type].BITMAP_CEMENT_[0].index[mapped_index],_x,_y);
                    }
                }
                else {
                    layer.putTileAt(TILES[tile_type].BITMAP_[0].index[mapped_index],_x,_y);
                }
                
            }
            var highest = this.getBorderZIndex(border_votes);
            var edge = tile_attr.EDGE;
            if (edge == '') {
                edge = 'NONE';
            }
            if (highest.z > tile_attr.ZINDEX && edge != 'NONE') {
                if (EDGETILES.EDGE['BITMAP_'+highest.name+'_'+edge+'_'] != undefined) {
                    edgeLayer.putTileAt(EDGETILES.EDGE['BITMAP_'+highest.name+'_'+edge+'_'][0].index[mapped_index],_x,_y);
                }
                else {
                    console.log('BITMAP_'+highest.name+'_'+edge+'_');
                }
                
            }
        }
/*
        else if (tile_type == 'CEMENT' && position_index != 255) {
            var mapped_index = this.mapping[position_index];
            
            if (border_votes.includes('MULCH') || border_votes.includes('GARDEN')) {
                layer.putTileAt(TILES[tile_type].BITMAP_MULCH_[0].index[mapped_index],_x,_y);
            }
            else if (border_votes.includes('GRASS')) {
                layer.putTileAt(TILES[tile_type].BITMAP_GRASS_[0].index[mapped_index],_x,_y);
            }
            else {
                layer.weightedRandomize(TILES[tile_type].FILL_, _x,_y,1,1);
            }
        }
        else if (tile_type == 'MULCH' && position_index != 255) {
            var mapped_index = this.mapping[position_index];
            var border_vote = this.mostFrequentValue(border_votes);
            if (border_vote == 'LEAVES') {
                //let depth = Phaser.Math.RND.pick(['BITMAP_LEAVES_DEEP_','BITMAP_LEAVES_SHALLOW_']);
                //layer.putTileAt(TILES[tile_type][depth][0].index[mapped_index],_x,_y);
                layer.putTileAt(TILES[tile_type].BITMAP_LEAVES_[0].index[mapped_index],_x,_y);
            }
            else {
                layer.weightedRandomize(TILES[tile_type].FILL_, _x,_y,1,1);
            }
        }
      
        else if (tile_type == 'LEAVES' && position_index != 255) {
            var mapped_index = this.mapping[position_index];
            if (border_vote == 'GRASS') {
                layer.putTileAt(TILES[tile_type].BITMAP_GRASS_[0].index[mapped_index],_x,_y);
            }
            else {
                layer.weightedRandomize(TILES[tile_type].FILL_, _x,_y,1,1);
            }
        }
        else if (tile_type == 'GRASS' && position_index != 255) {
            var mapped_index = this.mapping[position_index];
            if (border_votes.includes('MULCH') || border_votes.includes('LEAVES') || border_votes.includes('GARDEN')) {
                layer.putTileAt(TILES[tile_type].BITMAP_MULCH_[0].index[mapped_index],_x,_y);
            }
            else {
                layer.weightedRandomize(TILES[tile_type].FILL_, _x,_y,1,1);
            }
        } */
        else {
            if (TILES[tile_type] != undefined) {
                var mapped_index = this.mapping[position_index];
                if (TILES[tile_type].FILL_ != undefined) {
                    layer.weightedRandomize(TILES[tile_type].FILL_, _x,_y,1,1);
                }
                else if (TILES[tile_type].BITMAP_ != undefined) {
                    layer.putTileAt(TILES[tile_type].BITMAP_[0].index[mapped_index],_x,_y);
                }
                else if (TILES[tile_type].BITMAP_ASPHALT_ != undefined) {
                    layer.putTileAt(TILES[tile_type].BITMAP_ASPHALT_[0].index[mapped_index],_x,_y);
                }
            }
            else {
                console.warn('Tile type not found: '+tile_type);
            
            }
        }
    }


    initializeTiles (layer, edgeLayer=null) {
        var initialized = 0;
        console.log('Layer Height: '+layer.height);
        console.log('Layer Width: '+layer.width);
        console.log('Layer Area: '+(layer.height * layer.width));
        for (var r = 0; r < layer.height; r++) {
            for (var c = -1; c <= layer.width; c++) {
                this.changeTile(c, r, layer, edgeLayer);
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

    updateFooting (ground,obj) {
        this.updateFootMask(ground,obj);
        this.updateFootShadow(ground,obj);
        obj.sprite.setDepth(obj.sprite.y + 8);
      }
    
      updateFootMask(ground,obj) {
        var _y = obj.sprite.y;
        if (ground != undefined) {
          if (ground.USEMASK) {
              _y = _y - ground.ZINDEX;
          }
        }
        obj.footMask.setPosition(obj.sprite.x, _y);
        obj.footMask.setDepth(obj.sprite.depth + 1);
        return;
      }
    
      updateFootShadow(ground,obj) {
        var _y = obj.sprite.y + 12;
        var scale = 1;
        if (ground != undefined) {
          if (ground.USEMASK && ground.ZINDEX > 0) {
              _y = Math.floor(_y - (ground.ZINDEX / 2));
              scale = (ground.ZINDEX / 25) + scale;
          }
        }
        obj.footShadow.setPosition(obj.sprite.x, _y);
        obj.footShadow.setScale(scale);
        obj.footShadow.setDepth(obj.sprite.depth - 1);
        return;
      }

}