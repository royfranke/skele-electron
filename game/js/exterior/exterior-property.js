import TILES from "../config/atlas/tile-weights.js";
/* ExteriorProperty Class */

export default class ExteriorProperty {

/*
lines: {
    x: {{ prop.x }},
    y: {{ prop.y }},
    width: {{ prop.width }},
    height: {{ prop.height }}
},
block: {
    x: {{ prop.blockX }},
    y: {{ prop.blockY }}
},
address: {
    name: "{{ prop.name }}",
    facing: "{{ prop.facing }}",
    number: "{{ prop.addressNumber }}",
    street: "{{ prop.addressStreet }}",
}
*/
    constructor(block, prop) {
        this.block = block;
        this.prop = prop;
    }

    buildIt () {
        const top = this.prop.lines.top;
        const left = this.prop.lines.left;
        const bottom = this.prop.lines.bottom;
        const right = this.prop.lines.right;
        const width = this.prop.lines.width;
        const height = this.prop.lines.height;
        const facing = this.prop.address.facing;

        //check for "detached" tag-- make perimeter of space around building if found

        console.log('Building...');
        console.log(this.prop.address.number+' '+this.prop.address.street);

        let yard = 4;

        this.block.groundLayer.weightedRandomize(TILES.FOUNDATION.BITMAP_, left+1, top + 1, width - 2, height - (yard + 1));
        this.block.groundLayer.weightedRandomize(TILES.GARDEN.BITMAP_, left+1, top + height - (yard + 1), width - 2,  yard);

        this.block.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, left+Math.floor(width/2), top + height - (yard + 1), 1,  yard + 1);
        
    }

    
}