import TILES from "../config/atlas/tile-weights.js";
/* ExteriorBlockNode Class */

export default class ExteriorBlockNode {
    /*
            x: 3,
            y: 0,
            center_x: 120,
            center_y: 0,
            tile_x: 114,
            tile_y: -3,
            top: -3,
            right: 127,
            bottom: 4,
            left: 114,
            width: 13,
            height: 7,

            streets: {  
                n: {
                                        found: 0
                },
                e: {
                                        lanes: 1,
                    name: "Northern Boundary",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 2,
                    name: "Index Street",
                    dir: "ns",
                    connect: 1,
                    sidewalk: 1,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                        found: 0
                },
            },
        }
    */

    constructor(groundLayer, node) {
        this.node = node;
        this.groundLayer = groundLayer;
        groundLayer.weightedRandomize(TILES.ASPHALT.FILL_, node.left, node.top, node.width, node.height);
        groundLayer.weightedRandomize(TILES.CURB.NORTH_, node.left, node.top, node.width, 1);
        groundLayer.weightedRandomize(TILES.CURB.SOUTH_, node.left, node.bottom, node.width, 1);
        groundLayer.weightedRandomize(TILES.CURB.EAST_, node.right, node.top,1, node.height);
        groundLayer.weightedRandomize(TILES.CURB.WEST_, node.left, node.top,1, node.height);
        
        groundLayer.weightedRandomize(TILES.CURB.INSET_NORTHWEST_, node.left, node.top,1, 1);
        groundLayer.weightedRandomize(TILES.CURB.NORTHEAST_INSET_, node.right, node.top,1, 1);

        groundLayer.weightedRandomize(TILES.CURB.SOUTHWEST_INSET_, node.left, node.bottom,1, 1);
        groundLayer.weightedRandomize(TILES.CURB.SOUTHEAST_INSET_, node.right, node.bottom ,1, 1);
    }
    
}