import TILES from "../config/atlas/tile-weights.js";
import WALLTILES from "../config/atlas/wall-tile-weights.js";
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
    constructor(scene, block, prop) {
        this.scene = scene;
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

        //this.block.groundLayer.weightedRandomize(TILES.FOUNDATION.BITMAP_, left+1, top + 1, width - 2, height - (yard + 1));
        //this.block.groundLayer.weightedRandomize(TILES.GARDEN.BITMAP_, left+1, top + height - (yard + 1), width - 2,  yard);
        this.block.groundLayer.weightedRandomize(TILES.FOUNDATION.BITMAP_, left+1, top + 1, width - 1, height - (yard + 4));
        
        this.block.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, left+Math.floor(width/2), top + height - yard - 1, 2,  yard + 3);

        this.block.groundLayer.weightedRandomize(TILES.STAIRS.CEMENT_, left+Math.floor(width/2), top + height - yard + 1, 2,  1);

        
        var _x = left + 1;
        var _y = top + height - yard;

        var colors = ['YELLOW','BROWN','RED','GRAY','WHITE'];
        var color_choice = Phaser.Math.RND.between(0,colors.length - 1);
        var building_width = width - 2;

        this.block.wallLayer.weightedRandomize(WALLTILES.BRICK[colors[color_choice]+'_CEMENT_'].LOWER_LEFT_, _x, _y, 1, 1);

        this.block.wallLayer.weightedRandomize(WALLTILES.BRICK[colors[color_choice]+'_CEMENT_'].LOWER_, _x + 1, _y, building_width - 1, 1);
        this.block.wallLayer.weightedRandomize(WALLTILES.BRICK[colors[color_choice]+'_CEMENT_'].LOWER_RIGHT_, _x + building_width, _y, 1, 1);

        this.front_door = this.scene.manager.objectManager.newObjectToWorld(left+Math.floor(width/2), _y - 1,'DOOR_WINDOWS_SMALL_');
        this.front_door = this.scene.manager.objectManager.newObjectToWorld(left+Math.floor(width/2) + 2, _y - 1,'WINDOW_DOUBLE_');
        

        this.block.wallLayer.removeTileAt(left+Math.floor(width/2), _y);
        this.block.wallLayer.removeTileAt(left+Math.floor(width/2)+1, _y);
        _y = _y - 2;

        this.block.wallLayer.weightedRandomize(WALLTILES.BRICK[colors[color_choice]+'_CEMENT_'].MID_LEFT_, _x, _y, 1, 2);

        this.block.wallLayer.weightedRandomize(WALLTILES.BRICK[colors[color_choice]+'_CEMENT_'].MID_, _x + 1, _y, building_width - 1, 2);
        this.block.wallLayer.weightedRandomize(WALLTILES.BRICK[colors[color_choice]+'_CEMENT_'].MID_RIGHT_, _x + building_width, _y, 1, 2);


        _y = _y - 1;
        this.block.wallLayer.weightedRandomize(WALLTILES.BRICK[colors[color_choice]+'_CEMENT_'].TOP_LEFT_, _x, _y, 1, 1);

        this.block.wallLayer.weightedRandomize(WALLTILES.BRICK[colors[color_choice]+'_CEMENT_'].TOP_, _x + 1, _y, building_width - 1, 1);
        this.block.wallLayer.weightedRandomize(WALLTILES.BRICK[colors[color_choice]+'_CEMENT_'].TOP_RIGHT_, _x + building_width, _y, 1, 1);
        
    }

    
}