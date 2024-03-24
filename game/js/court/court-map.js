/**
 * A class for keeping track of the tilemap/ground
 */
 export default class CourtMap {
    constructor(scene) {
        this.scene = scene;
        this.utility = this.scene.manager.utilities;
    }

    create () {
        this.map = this.scene.make.tilemap({
            tileWidth: 16,
            tileHeight: 16,
            width: this.court.config.width,
            height: this.court.config.height,
        });
        
        var tileset = this.map.addTilesetImage("ground", null, 16, 16, 0, 0);

        this.groundLayer = this.map.createBlankLayer("Ground", tileset).fill(TILES.BLANK);


        var tile_type = 'PLAZA';
        this.groundLayer.weightedRandomize(TILES[tile_type].FILL_, 0,0,this.court.config.width,this.court.config.height);

        var recipe = this.cook('SIDEWALK_2X2');
        var recipe_x = 0;
        var recipe_y = 0;
        this.cookRecipe(recipe_x, recipe_y, recipe);
        this.ground.initializeTiles(this.groundLayer);
    }
    
}
