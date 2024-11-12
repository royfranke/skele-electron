import TILES from "../config/atlas/tile-weights.js";
/* ExteriorBlockNode Class */

export default class ExteriorBlockNode {

    constructor(groundLayer, node) {
        this.node = node;
        this.node['name'] = this.getIntersectionName();
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

    getIntersectionName () {
        var streets = [
            this.node.streets.e.name ?? '',
            this.node.streets.w.name ?? '',
            this.node.streets.n.name ?? '',
            this.node.streets.s.name ?? ''
        ];
        /// Limit streets to unique values
        streets = [...new Set(streets)];
        // Remove empty values
        streets = streets.filter(street => street !== '');

        return streets.join(' & ');
    }

    buildObjects () {

    }

}