import TILES from "../config/atlas/tile-weights.js";
/* Room Class */

export default class Room {

    /*
{"room_1":{
    "room_id": "1",
    "name": "Test",
    "floorWidth": "8",
    "floorHeight": "4",
    "overallWidth": "10",
    "overallHeight": "6",
    "roomData": {
        "featureList": [
            {
                "x": "3",
                "y": "4",
                "kind": "extdoor"
            }
        ],
        "removalList": [
            {
                "x": "0",
                "y": "3"
            },
            {
                "x": "1",
                "y": "3"
            }
        ]
    }
}}

    */

    constructor(scene, room_id) {
        this.scene = scene;
        console.log("Room ID: "+room_id);
        this.roomsJSON = this.scene.cache.json.get('ROOMS');
        console.log(this.roomsJSON);
        this.config = this.roomsJSON["room_"+room_id];

        this.config = this.convertToInteger(this.config);

        this.built = false;

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


