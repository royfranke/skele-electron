import TILES from "../config/atlas/tile-weights.js";
import PropertyLine from "./exterior-property.js";
/* Block Class */

export default class Block {
    /*
    block_x
    block_y
    tile_x
    tile_y
    width 
    height
    top: 0,
    right: 40,
    bottom: 30,
    left: 0,
    ground
    offset: {
        n: 3,
        e: 2,
        s: 2,
        w: 3,
    },
    bounds: {
        n: "Lore Drive",
        e: "Yew Street",
        s: "Pilgrim Street",
        w: "Farmer Street",
    },
    */

    constructor(scene, groundLayer, wallLayer, block) {
        this.scene = scene;
        this.block = block;
        this.groundLayer = groundLayer;
        this.wallLayer = wallLayer;
        this.propertyLines = [];
        this.setGround();
    }

    setGround () {
        const block = this.block;
        const groundLayer = this.groundLayer;
        if (block.ground.toUpperCase() == 'FOREST') {
            this.setForest();
        }
        else {
            groundLayer.weightedRandomize(TILES[block.ground.toUpperCase()].FILL_, block.left, block.top, block.width, block.height);
        }
        
    }

    setForest () {
        const block = this.block;
        const groundLayer = this.groundLayer;
        const forestTypes = ['LEAVES', 'MULCH', 'DIRT', 'GRASS'];
        let slice_height = 4;
        let slice_width  = 8;
        let segment_height = Math.floor(block.height/slice_height);
        let segment_width = Math.floor(block.width/slice_width);
        console.log(block.x+' - '+block.y+': '+segment_width+' by '+segment_height);
        groundLayer.weightedRandomize(TILES.MULCH.FILL_, block.left, block.top, block.width, block.height);
        var tile_type_left = null;
        for (var s_h=0;s_h<slice_height; s_h++) {
            for (var s_w=0;s_w<slice_width; s_w++) {
                var left = parseInt(block.left + (s_w * segment_width));
                var top = parseInt(block.top + (s_h * segment_height));
                var tile_choice = Phaser.Math.RND.between(0,3);
                var tile_type = forestTypes[tile_choice];
                groundLayer.weightedRandomize(TILES[tile_type].FILL_, left, top, segment_width, segment_height);
                var last_border_choice = 0;
                if (left > 0) {
                    if (tile_type_left != tile_type) {
                        for (var i=0; i<segment_height; i++) {
                            var border_choice = Phaser.Math.RND.between(0,3);
                            if (border_choice > 0) {
                                if (last_border_choice == 3) {
                                    border_choice = Phaser.Math.RND.between(2,4);
                                }
                                if (last_border_choice == 2) {
                                    border_choice = Phaser.Math.RND.between(1,3);
                                }
                                groundLayer.weightedRandomize(TILES[tile_type].FILL_, left - border_choice, top + i, border_choice, 1);
                                last_border_choice = border_choice;
                            }
                        }
                    }
                }
                if (top > 0) {
                    for (var i=0; i<segment_width; i++) {
                        var border_choice = Phaser.Math.RND.between(0,3);
                        if (border_choice > 0) {
                            if (last_border_choice == 3) {
                                border_choice = Phaser.Math.RND.between(2,4);
                            }
                            if (last_border_choice == 2) {
                                border_choice = Phaser.Math.RND.between(1,3);
                            }
                            groundLayer.weightedRandomize(TILES[tile_type].FILL_, left + i, top - border_choice,1, border_choice );
                            last_border_choice = border_choice;
                        }
                        
                    }
                }
                tile_type_left = tile_type;
            }
        }
        
    }

    setCorners () {
        if (this.block.offset.w > 0) { // Left
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, this.block.left+1, this.block.top+1,2, this.block.height - 2);
        }
        if (this.block.offset.e > 0) { // Right
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, this.block.right-2, this.block.top+1,2, this.block.height - 2);
        }

        if (this.block.offset.n > 0 && this.block.offset.w > 0) { // Upper left
            this.groundLayer.weightedRandomize(TILES.CURB.SOUTHEAST_, this.block.left, this.block.top,1, 1);
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, this.block.left+1, this.block.top+1,2, 2);
        }
        if (this.block.offset.n > 0 && this.block.offset.e > 0) {  // Upper right
            this.groundLayer.weightedRandomize(TILES.CURB.SOUTHWEST_, this.block.right, this.block.top,1, 1);
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, this.block.right-2, this.block.top+1,2, 2);
        }
        if (this.block.offset.s > 0 && this.block.offset.w > 0) { // Lower left
            this.groundLayer.weightedRandomize(TILES.CURB.NORTHEAST_, this.block.left, this.block.bottom,1, 1);
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, this.block.left+1, this.block.bottom-2,2, 2);
        }
        if (this.block.offset.s > 0 && this.block.offset.e > 0) { // LOWER RIGHT
            this.groundLayer.weightedRandomize(TILES.CURB.NORTHWEST_, this.block.right, this.block.bottom,1, 1);
            this.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, this.block.right-2, this.block.bottom-2,2, 2);
        }

        
    }

    addPropertyLine (prop) {

        prop.lines.top = this.block.top + prop.lines.y;
        prop.lines.left = this.block.left + prop.lines.x;
        prop.lines.bottom = this.block.top + prop.lines.y + prop.lines.height;
        prop.lines.right = prop.lines.left + prop.lines.width;

        let propertyLine = new PropertyLine(this.scene, this, prop);
        
        this.propertyLines.push(propertyLine);
    }

    buildProperties () {
        this.propertyLines.forEach(function (prop, index) {
            prop.buildIt();
        });
    }

    onProperty (_x, _y) {
        var property = false;
        this.propertyLines.forEach(function (prop, index) {
            if (_x > prop.prop.lines.left && _x < prop.prop.lines.right) {
                if (_y > prop.prop.lines.top && _y < prop.prop.lines.bottom) {
                    property = prop.prop;
                    return;
                }
            }
        });
        return property;
    }

    buildObjects () {
        const block = this.block;
        if (this.block.offset.n > 0) {
            //this.scene.manager.objectManager.newObjectToWorld(block.left+8, block.top+1,'WOOD_POLE');   
        }
        
    
    }

    buildItems () {
        const block = this.block;
        if (this.block.offset.n > 0) {
            this.scene.manager.itemManager.newItemToWorld(block.left+3, block.top+2,'APPLE');
        }
    
    }

}