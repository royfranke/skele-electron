import KEYLIGHTS from "../config/key-light.js";
/* Vehicle Registry */
/* Manages vehicles in the world */

export default class VehicleRegistry {

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

    getVehicles(_x, _y) {
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

    placeVehicle(vehicle, _x, _y) {
        var added = this.addVehicle(vehicle, _x, _y);
        vehicle.setRegistration(added, { x: _x, y: _y });
        return added;
        /// Should be feedback for when a vehicle cannot be placed (for now the only condition is that another vehicle cannot already be on the tile)
    }

    addVehicle(vehicle, _x, _y) {
        // Do not refer to this directly, use placevehicle
        if (this.placeEmpty(_x, _y)) {
            this.registry[_x + "_" + _y] = [];

        }
        this.registry[_x + "_" + _y].push(vehicle);
        if (vehicle.info == undefined) {
            console.warn('Vehicle does not have an info property');
            console.warn(vehicle);
        }

        return vehicle;
    }

    removeVehicles(_x, _y) {
        if (!this.placeEmpty(_x, _y)) {
            var vehicles = this.registry[_x + "_" + _y];
            vehicles.forEach(vehicle => {
                vehicle.setRegistration(false);
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

    getAllVehiclesSprites(exclude_vehicle = null) {
        var sprites = [];
        Object.entries(this.registry).forEach(([key, values]) => {
            if (values != null && values.length > 0) {
                values.forEach(value => {
                    if (value.sprite != null && value != exclude_vehicle) {
                        sprites.push(value.sprite);
                    }
                });
            }
        });
        return sprites; 
    }

}