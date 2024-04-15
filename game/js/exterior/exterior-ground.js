import TILES from "../config/atlas/tile-weights.js";
import GROUND_LOOKUP from "../config/atlas/type-by-tile-index.js";
import GROUND_TYPE from "../config/atlas/ground-types.js";

/**
 * A small helper class that can take control of our shadow tilemap layer. It keeps track of which
 * room is currently active.
 */
 export default class ExteriorGround {
    constructor(scene) {
        this.scene = scene;
        this.groundLookup = GROUND_LOOKUP;
        this.groundType = GROUND_TYPE;
        this.bitmap = [1, 2, 4, 8, 0, 16, 32, 64, 128];
        this.mapping = [0,0,1,1,0,0,1,1,2,2,3,4,2,2,3,4,5,5,6,6,5,5,7,7,8,8,9,10,8,8,11,12,0,0,1,1,0,0,1,1,2,2,3,4,2,2,3,4,5,5,6,6,5,5,7,7,8,8,9,10,8,8,11,12,13,13,14,14,13,13,14,14,15,15,16,17,15,15,16,17,18,18,19,19,18,18,20,20,21,21,22,23,21,21,24,25,13,13,14,14,13,13,14,14,26,26,27,28,26,26,27,28,18,18,19,19,18,18,20,20,29,29,30,31,29,29,32,33,0,0,1,1,0,0,1,1,2,2,3,4,2,2,3,4,5,5,6,6,5,5,7,7,8,8,9,10,8,8,11,12,0,0,1,1,0,0,1,1,2,2,3,4,2,2,3,4,5,5,6,6,5,5,7,7,8,8,9,10,8,8,11,12,13,13,14,14,13,13,14,14,15,15,16,17,15,15,16,17,34,34,35,35,34,34,36,36,37,37,38,39,37,37,40,41,13,13,14,14,13,13,14,14,26,26,27,28,26,26,27,28,34,34,35,35,34,34,36,36,42,42,43,44,42,42,45,46];
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

    wrapGround (_x, _y, layer) {
        if (inBounds(_x, _y, layer)) {
            // If in bounds
            /// if type of ground uses bitmap
            /// if tile index is not 255/fill


        }
    }

    inBounds(_x, _y, layer) {
        return (_x*16 >= 0 && _x*16 < layer.width && _y*16 >= 0 && _y*16 < layer.height);
    }

    getGround(_x, _y, layer) {
        if (this.inBounds(_x, _y, layer)) {
            var tile = layer.getTileAt(_x,_y);
            var tile_type = this.groundLookup[tile.index];

            if (tile_type == undefined) { return; }
            return this.groundType[tile_type];
        }
    }

    calculateTileBitmap(_x, _y, layer) {
        if (this.inBounds(_x, _y, layer)) {
            var tile = layer.getTileAt(_x,_y);
            var tile_type = this.groundLookup[tile.index];

            if (tile_type == undefined) { 
                //console.warn('Failed at '+_x+' '+_y);
                //return;
                tile_type = 'DIRT';
            }
            var tile_attr = this.groundType[tile_type];
            var border_votes = [];
            var position_index = 0;
            var place = 0;

            if (tile_attr.BITMAP) {
                for (var r = -1; r <= 1; r++) {
                    for (var c = -1; c <= 1; c++) {
                        if (this.inBounds(parseInt(_x + c), parseInt(_y + r),layer)) {
                            var neighbor_tile = layer.getTileAt(parseInt(_x + c), parseInt(_y + r));
                            var neighbor_tile_type = this.groundLookup[neighbor_tile.index];
                            if (neighbor_tile_type == tile_type) {
                                position_index = parseInt(position_index + this.bitmap[place]);
                            }
                            else {
                                if (tile_type == 'GARDEN' && neighbor_tile_type == 'FOUNDATION') {
                                    position_index = parseInt(position_index + this.bitmap[place]);
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

    calculateTileTypeIndex ({ type: tile_type, position: position_index, border_votes: border_votes, layer: layer, x: _x, y: _y }) {
        if (tile_type == 'DIRT' && position_index != 255) {
            var mapped_index = this.mapping[position_index];
            var border_vote = this.mostFrequentValue(border_votes);
            if (border_votes.includes('MULCH')) {
                //let depth = Phaser.Math.RND.pick(['BITMAP_LEAVES_DEEP_','BITMAP_LEAVES_SHALLOW_']);
                //layer.putTileAt(TILES[tile_type][depth][0].index[mapped_index],_x,_y);
                layer.putTileAt(TILES[tile_type].BITMAP_MULCH_[0].index[mapped_index],_x,_y);
            }
            else if (border_votes.includes('LEAVES')) {
                layer.putTileAt(TILES[tile_type].BITMAP_LEAVES_SHALLOW_[0].index[mapped_index],_x,_y);
            }
            else if (border_votes.includes('GRASS')) {
                layer.putTileAt(TILES[tile_type].BITMAP_GRASS_[0].index[mapped_index],_x,_y);
            }
            else if (border_vote == 'CEMENT' || border_vote == 'CURB') {
                layer.putTileAt(TILES[tile_type].BITMAP_CEMENT_[0].index[mapped_index],_x,_y);
            }
            else {
                layer.weightedRandomize(TILES[tile_type].FILL_, _x,_y,1,1);
            }
            
        }
        else if (tile_type == 'FOUNDATION') {
            var mapped_index = this.mapping[position_index];
                layer.putTileAt(TILES[tile_type].BITMAP_[0].index[mapped_index],_x,_y);
        }
        else if (tile_type == 'GARDEN') {
            var mapped_index = this.mapping[position_index];
                layer.putTileAt(TILES[tile_type].BITMAP_[0].index[mapped_index],_x,_y);
        }
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
        /*
        else if (tile_type == 'LEAVES' && position_index != 255) {
            var mapped_index = this.mapping[position_index];
            if (border_vote == 'GRASS') {
                layer.putTileAt(TILES[tile_type].BITMAP_GRASS_[0].index[mapped_index],_x,_y);
            }
            else {
                layer.weightedRandomize(TILES[tile_type].FILL_, _x,_y,1,1);
            }
        }*/
        else if (tile_type == 'GRASS' && position_index != 255) {
            var mapped_index = this.mapping[position_index];
            if (border_votes.includes('MULCH') || border_votes.includes('LEAVES') || border_votes.includes('GARDEN')) {
                layer.putTileAt(TILES[tile_type].BITMAP_MULCH_[0].index[mapped_index],_x,_y);
            }
            else {
                layer.weightedRandomize(TILES[tile_type].FILL_, _x,_y,1,1);
            }
        }
        else {
            if ((tile_type == 'DIRT' || tile_type == 'CEMENT' ||  tile_type == 'MULCH' || tile_type == 'GRASS') && position_index == 255) {
                //layer.weightedRandomize(TILES[tile_type].FILL_, _x,_y,1,1);
            }
            layer.weightedRandomize(TILES[tile_type].FILL_, _x,_y,1,1);
        }
    }

    placeTileType(_x, _y, layer, tile_type, forceRedraw) {

        if (this.inBounds(_x, _y, layer)) {
            var tile = layer.getTileAt(_x,_y);
            var old_tile_type = this.groundLookup[tile.index];
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

      
}
