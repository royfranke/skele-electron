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

    constructor(scene, block) {
        this.scene = scene;
        this.block = block;
        this.propertyLines = [];
        this.setGround();
    }

    setGround () {
        const block = this.block;
        let groundLayer = this.scene[this.scene.locale].groundLayer;
        if (block.ground.toUpperCase() == 'FOREST') {
            //this.setForest();
        }
        else {
            groundLayer.weightedRandomize(TILES[block.ground.toUpperCase()].FILL_, block.left, block.top, block.width, block.height);
            if (block.ground.toUpperCase() == 'GRASS') {
                ////
                let sidewalk_h = 3;
                let sidewalk_w = 3;
                
                //// Add some dandelions
                /*
                for (var i=sidewalk_w; i<block.width - (sidewalk_w*2); i++) {
                    for (var j=sidewalk_h; j<block.height - (sidewalk_h*2); j++) {
                        if (Phaser.Math.RND.between(0,16) == 1) {
                            this.scene.manager.plantManager.newPlantToWorld(i + block.left, j + block.top, 'DANDELION',Phaser.Math.RND.between(1,44));
                        }
                    }
                }
                */
                    
            }
        }
        
    }

    setForest () {
        const block = this.block;
        const groundLayer = this.scene[this.scene.locale].groundLayer;
        const forestTypes = ['LEAVES', 'MULCH', 'DIRT', 'GRASS'];


        groundLayer.weightedRandomize(TILES.DIRT.FILL_, block.left, block.top, block.width, block.height);
        var last_tile = null;

        for (let h = 0; h < block.height - (block.offset.n + block.offset.s); h++) {
            for (let w = 0; w < block.width - (block.offset.w + block.offset.e); w++) {
                var tile = Phaser.Math.RND.between(0, 128);

                switch (tile) {
                    case 0:
                        var x = block.left+w+block.offset.w;
                        var y = block.top+h+block.offset.n;
                        this.scene.manager.treeManager.newTreeToWorld(x, y + .5, 'ASH');
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x-2, y-2, 5, 5);
                        groundLayer.weightedRandomize(TILES.LEAVES.FILL_, x-1, y-1, 3, 3);

                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x-1, y-1, 1, 1);
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x+1, y-1, 1, 1);
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x, y, 1, 1);
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x-1, y+1, 1, 1);
                        groundLayer.weightedRandomize(TILES.MULCH.FILL_, x+1, y+1, 1, 1);
                    break;
                    case 12:
                        this.scene.manager.plantManager.newPlantToWorld(x, y, 'DANDELION',Phaser.Math.RND.between(1,44));
                    break;
                }
            }
        }

        
    }

    addPropertyLine (prop) {

        prop.lines.top = this.block.top + prop.lines.y;
        prop.lines.left = this.block.left + prop.lines.x;
        prop.lines.bottom = this.block.top + prop.lines.y + prop.lines.height;
        prop.lines.right = prop.lines.left + prop.lines.width;

        let propertyLine = new PropertyLine(this.scene, prop);
        
        this.propertyLines.push(propertyLine);
    }

    buildProperties () {
        this.propertyLines.forEach(function (prop, index) {
            prop.buildIt();
        });
    }
/*
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
*/
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

            if (this.nodes.NW.streets.s.signal == 2) {
                this.buildTrafficLight(this.block.left+1, this.block.top+1,'NW',{EW:this.block.bounds.n,NS:this.block.bounds.w});
            }
            else {
                this.buildStreetPole(this.block.left+1, this.block.top+1,{EW:this.block.bounds.n,NS:this.block.bounds.w, STOP:stop, CORNER: 'SE'});
            }
        }
        if (this.nodes.NE != null) {
            var stop = this.nodes.NE.streets.w.signal == 1 ? 'W' : null;
            if (stop != null) {
                this.buildStreetPole(this.block.right-1, this.block.top+1,{EW:this.block.bounds.n,NS:this.block.bounds.e, STOP:stop, CORNER: 'SW'});
            }
            if (this.nodes.NE.streets.s.signal == 2) {
                this.buildTrafficLight(this.block.right-1, this.block.top+1,'NE',{EW:this.block.bounds.n,NS:this.block.bounds.e});
            }
        }

        if (this.nodes.SE != null) {
            var stop = this.nodes.SE.streets.n.signal == 1 ? 'N' : null;
            if (stop != null) {
                this.buildStreetPole(this.block.right-1, this.block.bottom-1,{EW:this.block.bounds.s,NS:this.block.bounds.e, STOP:stop, CORNER: 'NW'});
            }
            if (this.nodes.SE.streets.e.signal == 2) {
                this.buildTrafficLight(this.block.right-1, this.block.bottom-1,'SE',{EW:this.block.bounds.s,NS:this.block.bounds.e});
            }
        }

        if (this.nodes.SW != null) {
            var stop = this.nodes.SW.streets.e.signal == 1 ? 'E' : null;
            if (stop != null) {
                this.buildStreetPole(this.block.left+1, this.block.bottom-1,{EW:this.block.bounds.s,NS:this.block.bounds.w, STOP:stop, CORNER: 'NE'});
            }
            if (this.nodes.SW.streets.e.signal == 2) {
                this.buildTrafficLight(this.block.left+1, this.block.bottom-1,'SW',{EW:this.block.bounds.s,NS:this.block.bounds.w});
            }
            
        } 
        if (this.block.offset.n > 0) {
            this.scene.manager.objectManager.newObjectToWorld(this.block.left+7, this.block.top,'POSTBOX_S');
            this.scene.manager.objectManager.newObjectToWorld(this.block.left+12, this.block.top,'HYDRANT_CITY_');

        }  
        if (this.block.offset.s > 0) {
            this.buildStreetPole(this.block.left+10, this.block.bottom-1,{},true);
            this.scene.manager.objectManager.newObjectToWorld(this.block.right-7, this.block.bottom-1,'HYDRANT_CITY_');


            this.scene.manager.treeManager.newTreeToWorld(this.block.left+8.25, this.block.bottom - .25, 'ASH');
            this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.DIRT.FILL_, this.block.left+8, this.block.bottom - 1, 2, 1);

            //this.scene.manager.treeManager.newTreeToWorld(this.block.left+27.25, this.block.bottom - .25, 'ASH');
            this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.DIRT.FILL_, this.block.left+27, this.block.bottom - 1, 2, 1);

            this.scene.manager.treeManager.newTreeToWorld(this.block.left+36.25, this.block.bottom - .25, 'ASH');
            this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.MULCH.FILL_, this.block.left+36, this.block.bottom - 1, 2, 1);


        }
        if (this.block.offset.e > 0) {
            this.buildStreetPole(this.block.right-1, this.block.bottom-7,{TELEPHONE:true},false);

            this.buildStreetPole(this.block.right-1, this.block.top+7,{TELEPHONE:true},false);

        }
    
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

                var light = this.scene.manager.objectManager.objectInfo('TRAFFIC_LIGHT_EAST');
                pole.setSlot(1.75,10.5,light,true);
                var arm = this.scene.manager.objectManager.objectInfo('TRAFFIC_LIGHT_ARM_EAST');
                pole.setSlot(1,5.5,arm,true);
                
            break;
            case 'SE':
                corner = 'NW';
                facing = 'SE';
                //  NW intersection corner 
                var light = this.scene.manager.objectManager.objectInfo('TRAFFIC_LIGHT_EAST');
                pole.setSlot(.25,7.5,light,false);
            break;
            case 'SW':
                corner = 'NE';
                flip = true;
                facing = 'SE';

                // NE intersection corner

                var arm = this.scene.manager.objectManager.objectInfo('TRAFFIC_LIGHT_ARM_SOUTH');
                pole.setSlot(4,6,arm,true);

                //var light = this.scene.manager.objectManager.objectInfo('TRAFFIC_LIGHT_SOUTH');
                //////-------
                //pole.setSlot(4,7,light,false);

                var traffic_light = this.scene.manager.objectManager.newObjectToWorld(_x - 4, _y - 7,'TRAFFIC_LIGHT_SOUTH');
                traffic_light.sprite.setDepth(pole.sprite.depth+7);
                traffic_light.setState('GREEN');
            break;
        }
        var slotted = this.scene.manager.objectManager.objectInfo('WALK_SIGNAL_'+facing+'_');
        pole.setSlot(0,2,slotted,flip);

        

        if (signs.NS != null && signs.NS != '') {
            var slotted = this.scene.manager.objectManager.objectInfo('STREET_SIGN_NS_');
            pole.setSlot(.5,4.25,slotted);
            pole.setAnnouncement(signs.NS, 'STREET_SIGN_NS_'+corner);
        }
        
        if (signs.EW != null && signs.EW != '') {
            var slotted = this.scene.manager.objectManager.objectInfo('STREET_SIGN_EW_');
            pole.setSlot(.5,3.75,slotted);
            pole.setAnnouncement(signs.EW, 'STREET_SIGN_EW_'+corner);
        }
    }

    buildStreetPole (_x,_y,signs={NS:null,EW:null,STOP:null,CORNER:'',TELEPHONE:false}, light=true) {

        var pole = this.scene.manager.objectManager.newObjectToWorld(_x, _y,'WOOD_POLE');

        if (light) {
            let sodium = this.scene.manager.objectManager.newObjectToWorld(_x, _y - 6,'SODIUM');
            sodium.sprite.setDepth(pole.sprite.depth+1);
            
        }

        if (signs.NS != null && signs.NS != '') {
            var slotted = this.scene.manager.objectManager.objectInfo('STREET_SIGN_NS_');
            pole.setSlot(.5,4.25,slotted);
            pole.setAnnouncement(signs.NS, 'STREET_SIGN_NS_'+signs.CORNER);
        }
        
        if (signs.EW != null && signs.EW != '') {
            var slotted = this.scene.manager.objectManager.objectInfo('STREET_SIGN_EW_');
            pole.setSlot(.5,3.75,slotted);
            pole.setAnnouncement(signs.EW, 'STREET_SIGN_EW_'+signs.CORNER);
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

        if (signs.TELEPHONE) {
            var slotted = this.scene.manager.objectManager.objectInfo('TELEPHONE_POLE_TOP');
            pole.setSlot(0,5,slotted);
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