import VehicleFactory from "./vehicle-factory.js";
import VehicleRegistry from "./vehicle-registry.js";


/* Vehicle Manager Class */

export default class VehicleManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new VehicleFactory(this.scene);
        this.registry = new VehicleRegistry();

        this.locale = this.scene[this.scene.place];
    }

    update () {
        var self = this;
        Object.entries(this.registry.registry).forEach(([key, values]) => {
            if (values != null && values.length > 0) {
                values.forEach(value => {
                    
                        value.update();
                    
                });
            }
        });
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
    

    newVehicle (slug,passengers=[]) {
        return this.factory.newVehicle(slug,passengers);
    }

    vehicleInfo (slug) {
        return this.factory.vehicleInfo(slug);
    }

    discardVehicle (vehicle) {
        vehicle.destroy();
    }

    newVehicleToWorld (_x,_y,slug,days_old=0) {
        var vehicle = this.newVehicle(slug,days_old);
        var result = this.putVehicleInWorld(vehicle,_x,_y);
        if (!result) {
            console.warn('Could not put this vehicle in the world from vehicle manager: '+slug);
            return false;
        }
        
        return result;
    }

    putVehicleInWorld (vehicle, _x, _y) {
        return this.registry.placeVehicle(vehicle,_x,_y);
    }


}