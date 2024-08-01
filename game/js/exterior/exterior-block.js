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

    constructor(scene, groundLayer, wallLayer, roofLayer, block) {
        this.scene = scene;
        this.block = block;
        this.groundLayer = groundLayer;
        this.wallLayer = wallLayer;
        this.roofLayer = roofLayer;
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

    getAdjoiningNodes (_x,_y) {
        var nodes = {NW:null, NE:null, SE:null, SW:null};
        nodes.NW = this.scene.exterior.getBlockNodeProperties(_x, _y);
        nodes.NE = this.scene.exterior.getBlockNodeProperties(_x+1, _y);
        nodes.SE = this.scene.exterior.getBlockNodeProperties(_x+1, _y+1);
        nodes.SW = this.scene.exterior.getBlockNodeProperties(_x, _y+1);
        return nodes;
    }

    buildObjects () {
        this.nodes = this.getAdjoiningNodes(this.block.x, this.block.y);

        if (this.nodes.NW != null) {
            var stop = this.nodes.NW.streets.s.signal == 1 ? 'S' : null;
            if (stop != null) {
                this.buildStreetPole(this.block.left+1, this.block.top+1,{EW:this.block.bounds.n,NS:this.block.bounds.w, STOP:stop});
            }
            if (this.nodes.NW.streets.s.signal == 2) {
                this.buildTrafficLight(this.block.left+1, this.block.top+1,'NW',{EW:this.block.bounds.n,NS:this.block.bounds.w});
            }
        }
        if (this.nodes.NE != null) {
            var stop = this.nodes.NE.streets.w.signal == 1 ? 'W' : null;
            if (stop != null) {
                this.buildStreetPole(this.block.right-1, this.block.top+1,{EW:this.block.bounds.n,NS:this.block.bounds.e, STOP:stop});
            }
            if (this.nodes.NE.streets.s.signal == 2) {
                this.buildTrafficLight(this.block.right-1, this.block.top+1,'NE',{EW:this.block.bounds.n,NS:this.block.bounds.e});
            }
        }

        if (this.nodes.SE != null) {
            var stop = this.nodes.SE.streets.n.signal == 1 ? 'N' : null;
            if (stop != null) {
                this.buildStreetPole(this.block.right-1, this.block.bottom-1,{EW:this.block.bounds.s,NS:this.block.bounds.e, STOP:stop});
            }
            if (this.nodes.SE.streets.e.signal == 2) {
                this.buildTrafficLight(this.block.right-1, this.block.bottom-1,'SE',{EW:this.block.bounds.s,NS:this.block.bounds.e});
            }
        }

        if (this.nodes.SW != null) {
            var stop = this.nodes.SW.streets.e.signal == 1 ? 'E' : null;
            if (stop != null) {
                this.buildStreetPole(this.block.left+1, this.block.bottom-1,{EW:this.block.bounds.s,NS:this.block.bounds.w, STOP:stop});
            }
            if (this.nodes.SW.streets.e.signal == 2) {
                this.buildTrafficLight(this.block.left+1, this.block.bottom-1,'SW',{EW:this.block.bounds.s,NS:this.block.bounds.w});
            }
            
        }
        /*
        if (this.block.offset.s > 0) {
            //this.scene.manager.objectManager.newObjectToWorld(block.left+8, block.top+1,'WOOD_POLE');   
            this.scene.manager.objectManager.newObjectToWorld(this.block.right-6, this.block.bottom-1,'HYDRANT_CITY_');
        }

        if (this.block.offset.s > 0 && this.block.offset.e > 0) { // LOWER RIGHT
            this.buildStreetPole(this.block.right-1, this.block.bottom-1,{NS:this.block.bounds.s,EW:this.block.bounds.e, STOP:'N'});

        }

        if (this.block.offset.n > 0 && this.block.offset.w > 0) { // UPPER LEFT
            /// node here equals block x y
            this.buildStreetPole(this.block.left+1, this.block.top+1,{NS:this.block.bounds.s,EW:this.block.bounds.e, STOP:'S'});

        }

*/
    
    
    }

    buildTrafficLight (_x,_y,block_corner,signs={NS:null,EW:null}) {
        var pole = this.scene.manager.objectManager.newObjectToWorld(_x, _y,'METAL_POLE');
        var facing = '';
        var flip = false;
        var corner = '';
        switch (block_corner) {
            case 'NE':
                /// SW intersection corner
                corner = 'SW';
                flip = true;
                facing = 'W';
                
                var light = this.scene.manager.objectManager.objectInfo('TRAFFIC_LIGHT_NORTH');
                pole.setSlot(-4,7,light,false,true);
                var arm = this.scene.manager.objectManager.objectInfo('TRAFFIC_LIGHT_ARM_SOUTH');
                pole.setSlot(0,6,arm,false);
            break;
            case 'NW':
                corner = 'SE';
                facing = 'W';
                // SE intersection corner
                
            break;
            case 'SE':
                corner = 'NW';
                facing = 'SE';
                //  NW intersection corner 
                
            break;
            case 'SW':
                corner = 'NE';
                flip = true;
                facing = 'SE';

                // NE intersection corner

                var arm = this.scene.manager.objectManager.objectInfo('TRAFFIC_LIGHT_ARM_SOUTH');
                pole.setSlot(4,6,arm,true);

                var light = this.scene.manager.objectManager.objectInfo('TRAFFIC_LIGHT_SOUTH');
                pole.setSlot(4,7,light,false);
            break;
        }
        var slotted = this.scene.manager.objectManager.objectInfo('WALK_SIGNAL_'+facing+'_');
        pole.setSlot(0,2,slotted,flip);

        

        if (signs.NS != null) {
            var slotted = this.scene.manager.objectManager.objectInfo('STREET_SIGN_NS_');
            pole.setSlot(.5,4.25,slotted);
            pole.setAnnouncement(signs.NS, 'STREET_SIGN_NS_'+corner);
        }
        
        if (signs.EW != null) {
            var slotted = this.scene.manager.objectManager.objectInfo('STREET_SIGN_EW_');
            pole.setSlot(.5,3.75,slotted);
            pole.setAnnouncement(signs.EW, 'STREET_SIGN_EW_'+corner);
            /* Need to fix for correct signs output to buildstreetpole */
        }
    }

    buildStreetPole (_x,_y,signs={NS:null,EW:null,STOP:null}) {

        var pole = this.scene.manager.objectManager.newObjectToWorld(_x, _y,'WOOD_POLE');

        

        if (signs.NS != null) {
            var slotted = this.scene.manager.objectManager.objectInfo('STREET_SIGN_NS_');
            pole.setSlot(.5,4.25,slotted);
            pole.setAnnouncement(signs.NS, 'STREET_SIGN_NS_');
        }
        
        if (signs.EW != null) {
            var slotted = this.scene.manager.objectManager.objectInfo('STREET_SIGN_EW_');
            pole.setSlot(.5,3.75,slotted);
            pole.setAnnouncement(signs.EW, 'STREET_SIGN_EW_');
            /* Need to fix for correct signs output to buildstreetpole */
        }
        
        if (signs.STOP != null) {
            var slotted = this.scene.manager.objectManager.objectInfo('STOP_SIGN_'+signs.STOP);
            var behind = signs.STOP == 'N' || signs.STOP == 'E' ? true : false;
            pole.setSlot(.5,2,slotted,false,behind);
            /*if (behind) {
                var slotted = this.scene.manager.objectManager.objectInfo('OBJ_FLYER_YELLOW');
                pole.setSlot(0,2,slotted, false);
            }*/
        }
    }

    buildItems () {
        /*
            var content = [];
            if (Phaser.Math.RND.between(0,1) == 1) {
                content.push(this.scene.manager.itemManager.newItem('APPLE'));
            }
            if (Phaser.Math.RND.between(0,2) == 1) {
                content.push(this.scene.manager.itemManager.newItem('ENVELOPE_FRONT_1'));
            }
            if (Phaser.Math.RND.between(0,2) == 1) {
                content.push(this.scene.manager.itemManager.newItem('CUPCAKE_PINK'));
            }

            if (Phaser.Math.RND.between(0,1) == 1) {
            this.scene.manager.itemManager.newItemToWorld(this.block.left+3, this.block.top+2,'BACKPACK_PURPLE',content);
            }
            else {
                this.scene.manager.itemManager.newItemToWorld(this.block.left+3, this.block.top+2,'BACKPACK_CANVAS',content);
            }
        */
    
    }

}