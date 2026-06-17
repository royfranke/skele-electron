import GameUtilities from "../game/game-utilities.js";


/**
 * Ground Class
 */
 export default class Ground {
    constructor(layer, edgeLayer, scene = null) {

        this.layer = layer;
        this.edgeLayer = edgeLayer;
        this.scene = scene;

        this.util = new GameUtilities();

    }

    initializeTiles (layer=this.layer, scene={}, edgeLayer=this.edgeLayer) {
        this.util.initializeTiles(layer, scene, edgeLayer);
    }

    inBounds(_x, _y) {
        return this.util.inBounds(_x, _y, this.layer);
    }

    getGround(_x, _y) {
        if (this.layer == undefined || this.layer.layer == undefined) {
            return this.util.getGround(_x, _y, null);
        }
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
        
        // Sync tile changes back to chunk data
        if (this.scene?.exterior && typeof this.scene.exterior.syncPhaserLayersToChunks === 'function') {
            try { this.scene.exterior.syncPhaserLayersToChunks(); } catch (e) {}
        }
        
        return;
    }

    changeTile(_x, _y) {
        this.util.changeTile(_x, _y, this.layer, this.edgeLayer);
        
        // Sync tile changes back to chunk data
        if (this.scene?.exterior && typeof this.scene.exterior.syncPhaserLayersToChunks === 'function') {
            try { this.scene.exterior.syncPhaserLayersToChunks(); } catch (e) {}
        }
    }
}
