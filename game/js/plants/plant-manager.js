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

    

    newPlant (slug, days_old = 0) {
        return this.factory.newPlant(slug, days_old);
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
        
        return plant;
    }

    putPlantInWorld (plant, _x, _y) {
        const added = this.registry.placePlant(plant,_x,_y);
        if (!added) return false;

        // Also register plant metadata in chunk storage when available
        try {
            const cm = this.scene?.exterior?.chunkManager;
            const worldSystem = this.scene?.exterior?.worldSystem || (typeof window !== 'undefined' ? window.WorldSystemInstance : null);
            if (cm) {
                const chunk = cm.getChunkAtTile(_x, _y);
                if (chunk) {
                    const local = chunk.worldToLocal(_x, _y);
                    if (local) {
                        const slug = plant?.info?.slug ?? plant?.name ?? 'UNKNOWN';
                        chunk.addPlant(slug, local.x, local.y, { age_days: plant.day });
                        if (worldSystem && typeof worldSystem.markDirty === 'function') {
                            try { worldSystem.markDirty(chunk); } catch (e) {}
                        } else {
                            try { chunk.dirty = true; } catch (e) {}
                        }
                    }
                }
            }
        } catch (e) {}

        return plant;
    }


}