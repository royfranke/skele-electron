import GameUtilities from "../game/game-utilities.js";


/**
 * Overworld Ground Class
 */
 export default class ExteriorGround {
    constructor(layer, edgeLayer) {

        this.layer = layer;
        this.edgeLayer = edgeLayer;

        this.util = new GameUtilities();

    }

    highlightTile(_x, _y) {
        //this.placeTileType(_x, _y, 'PLAZA', true);
    }

    initializeTiles () {
        this.util.initializeTiles(this.layer, this.edgeLayer);
    }

    inBounds(_x, _y) {
        return this.util.inBounds(_x, _y, this.layer);
    }

    getGround(_x, _y) {
        return this.util.getGround(_x, _y, this.layer);
    }

    calculateTileBitmap(_x, _y) {
        return this.util.calculateTileBitmap(_x, _y, this.layer, this.edgeLayer);
    }

    mostFrequentValue(arr) {
        return this.util.mostFrequentValue(arr);
    }

    calculateTileTypeIndex ({ type: tile_type, position: position_index, border_votes: border_votes, x: _x, y: _y }) {
        this.util.calculateTileTypeIndex({ type: tile_type, position: position_index, border_votes: border_votes, layer: this.layer, edgeLayer: this.edgeLayer, x: _x, y: _y });
    }

    placeTileType(_x, _y, tile_type, forceRedraw) {
        this.util.placeTileType(_x, _y, this.layer, this.edgeLayer, tile_type, forceRedraw)
        return;
    }

    changeTile(_x, _y) {
        this.util.changeTile(_x, _y, this.layer, this.edgeLayer);
    }
      
}
