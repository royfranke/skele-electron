import PlantFactory from "./plant-factory.js";
import PlantRegistry from "./plant-registry.js";


/* Plant Manager Class */

export default class PlantManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new PlantFactory(this.scene);
        this.registry = new PlantRegistry();

        this.locale = this.scene[this.scene.place];

    }

    update () {

    }

    setCollider() {
        var self = this;
        Object.entries(this.registry.registry).forEach(([key, values]) => {
            if (values != null && values.length > 0) {
                values.forEach(value => {
                    
                        value.setCollider();
                    
                });
            }
        });
        
    }

    trample () {
        console.log("trample");
    }

    

    newPlant (slug,items=[]) {
        return this.factory.newPlant(slug,items);
    }

    plantInfo (slug) {
        return this.factory.plantInfo(slug);
    }

    discardPlant (plant) {
        plant.destroy();
    }

    newPlantToWorld (_x,_y,slug,days_old=0) {
        var plant = this.newPlant(slug,days_old);
        var result = this.putPlantInWorld(plant,_x,_y);
        if (!result) {
            console.warn('Could not put this plant in the world from plant manager: '+slug);
            return false;
        }
        
        return true;
    }

    putPlantInWorld (plant, _x, _y) {
        return this.registry.placePlant(plant,_x,_y);
    }


}