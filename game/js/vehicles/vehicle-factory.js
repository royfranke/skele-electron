import Vehicle from "../object/vehicle.js";
import VEHICLES from "../config/atlas/vehicles.js";
/* Vehicle Factory Class */

export default class VehicleFactory {

    constructor(scene) {
        this.scene = scene;
        this.valid_vehicles = VEHICLES;
    }

    vehicleInfo (slug) {
        if (this.validVehicle(slug)) {
            return this.valid_vehicles[slug]; /// Returns a non-sprite info set obj
        }
        return false;
    }

    newVehicle (slug) {
        if (this.validVehicle(slug)) {
            return new Vehicle(this.scene,this.valid_vehicles[slug]); /// Returns a non-sprite obj
        }
        else {
            console.warn("Nonvalid vehicle slug passed in vehicle factory: "+slug);
        }
        return false;
    }

    validVehicle (slug) {
        if (this.valid_vehicles.hasOwnProperty(slug)) {
            return true;
        }
        else {
            console.warn("Nonvalid vehicle slug passed in vehicle factory: "+slug);
        }
    }

    discardVehicle (vehicle) {
        vehicle.destroy();
    }

    
}