import TILES from "../config/atlas/tile-weights.js";
/* Court Game Class */

export default class CourtGame {

    constructor(scene,court_slug) {
        //court_slug lets us look up court
        this.scene = scene;
        this.config = {
            width: 12,
            height: 12,
        };
        

    }



    buildObjects () {

        this.front_door = this.scene.manager.objectManager.newObjectToWorld(3, 5,'DOOR_WINDOWS_SMALL_');
    
    }

    buildItems () {
        var sardines = this.scene.manager.itemManager.newItem('SARDINES');
        var newspaper = this.scene.manager.itemManager.newItem('NEWSPAPER');
        var lotto = this.scene.manager.itemManager.newItem('LOTTO');
        this.scene.manager.itemManager.newItemToWorld(3, 2,'BACKPACK_PURPLE',[sardines, newspaper,lotto]);
    
    }

}