import Plant from "../object/plant.js";
import PLANTS from "../config/atlas/plants.js";
/* Plant Factory Class */

export default class PlantFactory {

    constructor(scene) {
        this.scene = scene;
        this.valid_plants = PLANTS;
    }

    plantInfo (slug) {
        if (this.validPlant(slug)) {
            return this.valid_plants[slug]; /// Returns a non-sprite info set obj
        }
        return false;
    }

    newPlant (slug,days_old=0) {
        if (this.validPlant(slug)) {
            return new Plant(this.scene,this.valid_plants[slug],days_old); /// Returns a non-sprite obj
        }
        else {
            console.warn("Nonvalid plant slug passed in plant factory: "+slug);
        }
        return false;
    }

    validPlant (slug) {
        if (this.valid_plants.hasOwnProperty(slug)) {
            return true;
        }
        else {
            console.warn("Nonvalid plant slug passed in plant factory: "+slug);
        }
    }

    discardPlant (plant) {
        plant.destroy();
    }

    
}