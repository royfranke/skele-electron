import KEYLIGHTS from "../config/key-light.js";
/* Plant Registry */
/* Manages plants in the world */

export default class PlantRegistry {

    constructor() {
        this.registry = {};
    }


    updateLights(light) {
        Object.entries(this.registry).forEach(([key, values]) => {
            if (values != null && values.length > 0) {
                values.forEach(value => {
                    value.setLight(KEYLIGHTS[light]);
                });
            }
        });
    }


    dirtySlot(_x, _y) {
        return (_x + "_" + _y in this.registry);
    }

    getPlants(_x, _y) {
        if (!this.placeEmpty(_x, _y)) {
            return this.registry[_x + "_" + _y];
        }
        return null;
    }

    placeEmpty(_x, _y) {
        if (this.dirtySlot(_x, _y)) {
            return this.registry[_x + "_" + _y] == null;
        }
        else {
            return true;
        }
    }

    placePlant(plant, _x, _y) {
        var added = this.addPlant(plant, _x, _y);
        plant.setRegistration(added, { x: _x, y: _y });
        return added;
        /// Should be feedback for when a plant cannot be placed (for now the only condition is that another plant cannot already be on the tile)
    }

    addPlant(plant, _x, _y) {
        // Do not refer to this directly, use placeplant
        if (this.placeEmpty(_x, _y)) {
            this.registry[_x + "_" + _y] = [];

        }
        this.registry[_x + "_" + _y].push(plant);
        if (plant.info == undefined) {
            console.warn('Plant does not have an info property');
            console.warn(plant);
        }

        return true;
    }

    removePlants(_x, _y) {
        if (!this.placeEmpty(_x, _y)) {
            var plants = this.registry[_x + "_" + _y];
            plants.forEach(plant => {
                plant.setRegistration(false);
            });
            this.registry[_x + "_" + _y] = null;

            if (this.registry.hasOwnProperty(_x + "_" + _y)) {
                // Remove the key-value pair
                delete this.registry[_x + "_" + _y];
            }
            return true;
        }
        else {
            // This spot was already empty
            return false;
        }
    }

}