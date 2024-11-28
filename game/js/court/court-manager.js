import TILES from "../config/atlas/tile-weights.js";

import CourtMap from "./court-map.js";
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

    }

    create () {
        /*
        const objectManager = this.scene.manager.objectManager;
        this.court.inFocus.buildObjects(objectManager)
        const nodes = this.nodes;
        Initialize objects and items from config
        
*/
        this.map = new CourtMap(this.scene);
        this.court = new CourtGame(this.scene,'court_slug');
        

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

}