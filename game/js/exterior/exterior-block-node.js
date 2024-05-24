import TILES from "../config/atlas/tile-weights.js";
/* ExteriorBlockNode Class */

export default class ExteriorBlockNode {

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

    buildObjects (objectManager) {
        const node = this.node;
        if (this.node.streets.n.signal > 0) {
            var _x = node.left - 1;
            var _y = node.top - 4;
            //objectManager.newObjectToWorld(_x, _y,'STOP_N');
        }
        if (this.node.streets.e.signal > 0) {
            var _x = node.right + 6;
            var _y = node.top - 1;
            //objectManager.newObjectToWorld(_x, _y,'STOP_E');
        }
        
        if (this.node.streets.s.signal > 0) {
            var _x = node.right;
            var _y = node.bottom + 6;
            //objectManager.newObjectToWorld(_x, _y,'STOP_S');
        }
        if (this.node.streets.w.signal > 0) {
            var _x = node.left - 6;
            var _y = node.bottom;
            //objectManager.newObjectToWorld(_x, _y,'STOP_W');
        }
    
    }
    
}