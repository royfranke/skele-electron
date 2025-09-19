import TILES from "../config/atlas/tile-weights.js";
import ROOMS from "../config/atlas/rooms.js";
/* Room Class */

export default class Room {

    constructor(scene, room_id) {
        this.scene = scene;
        this.roomsJSON = ROOMS;
        this.config = this.roomsJSON["room_"+room_id];
        
        this.config = this.convertToInteger(this.config);
        this.doors = [];
        this.built = false;
        console.log(this.config);

        this.sells = [];
        if (this.config.listing != undefined) {
            if (this.config.listing.sells != undefined) {
                this.sells = this.config.listing.sells;
            }
            if (this.config.listing.services != undefined) {
                this.services = this.config.listing.services;
            }
        }
    }

    create () {
        
    }

    // For each value in this.config, if it is a number, convert it to an integer. Make sure to do this for all nested objects as well.
    convertToInteger(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object') {
                    this.convertToInteger(obj[key]); // recursively call the function for nested objects
                } else if (parseInt(obj[key]) || parseInt(obj[key]) === 0){
                    obj[key] = parseInt(obj[key]);
                }
            }
        }
        return obj;
    }
}


