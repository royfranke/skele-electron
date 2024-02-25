import TILES from "../config/atlas/tile-weights.js";
import COOK from "../config/atlas/tile-recipes.js";
import CourtGround from "./court-ground.js";
import CourtGame from "./court-game.js";

/**
 * 	Manage Courts (Court game tile scenes)
 *	
 */
 export default class CourtManager {

    constructor(scene) {
        this.scene = scene;
        this.returnTile = {x: 0, y: 0};
        this.lastTile = {x: 0, y: 0};

        this.court = new CourtGame(this.scene,'court_slug');
        this.map = this.scene.make.tilemap({
            tileWidth: 16,
            tileHeight: 16,
            width: this.court.config.width,
            height: this.court.config.height,
        });
        const tileset = this.map.addTilesetImage("ground", null, 16, 16, 0, 0);

        this.groundLayer = this.map.createBlankLayer("Ground", tileset).fill(TILES.BLANK);

        var tile_type = 'GRASS';
        this.groundLayer.weightedRandomize(TILES[tile_type].FILL_, 0,0,this.court.config.width,this.court.config.height);

        //this.scene.manager.objectManager = new ObjectManager(this.scene);
        this.ground = new CourtGround(this.scene);
    }

    create () {
        /*
        const objectManager = this.scene.manager.objectManager;
        this.court.inFocus.buildObjects(objectManager)
        const nodes = this.nodes;
        Initialize objects and items from config
        
*/


        var recipe = this.cook('SIDEWALK_2X2');
        var recipe_x = 0;
        var recipe_y = 0;
        this.cookRecipe(recipe_x, recipe_y, recipe);
        this.ground.initializeTiles(this.groundLayer);
        

        this.court.buildObjects();
        this.court.buildItems();
    }

    update () {
        const x = this.scene.player.action.actionTile.x;
        const y = this.scene.player.action.actionTile.y;


        if (this.lastTile.x != x || this.lastTile.y != y) {
            this.lastTile = {x: x, y: y};
        }
        
    }

    createItems () {
        ///
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

                this.groundLayer.weightedRandomize(tile[recipe_index],parseInt( _x + w),parseInt(_y + h), 1, 1);
                recipe_index++;

                //this.groundLayer.putTileAt(0, parseInt( _x + w),parseInt(_y + h))
            }
        }
    }


}