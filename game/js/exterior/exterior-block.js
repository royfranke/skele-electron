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
            groundLayer.weightedRandomize(TILES['DIRT'].FILL_, block.left, block.top, block.width, block.height);
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
                    case 13:
                        //this.scene.manager.objectManager.newObjectToWorld(x, y, 'STUMP_SEAT');
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

        if (this.block.offset.n > 0) {
            this.scene.manager.objectManager.newObjectToWorld(this.block.left+7, this.block.top,'POSTBOX_S');
            this.scene.manager.objectManager.newObjectToWorld(this.block.left+12, this.block.top,'HYDRANT_CITY_');
            //this.scene.manager.vehicleManager.newVehicleToWorld(this.block.left+7, this.block.top - 4, 'CAR_SEDAN_1');

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
        
        if (this.block.ground.toUpperCase() == 'FOREST') {
            this.buildForest();
        }
    
    }

    buildForest () {
        const block = this.block;
        const groundLayer = this.scene[this.scene.locale].groundLayer;

        for (let h = 0; h < block.height - (block.offset.n + block.offset.s); h++) {
            for (let w = 0; w < block.width - (block.offset.w + block.offset.e); w++) {
                var tile = Phaser.Math.RND.between(0, 128);
                var x = block.left+w+block.offset.w;
                var y = block.top+h+block.offset.n;

                switch (tile) {
                    case 12:
                        this.scene.manager.plantManager.newPlantToWorld(x, y, 'DANDELION',Phaser.Math.RND.between(1,44));
                    break;
                    case 13:
                        var stump = this.scene.manager.objectManager.newObjectToWorld(x, y, 'STUMP_SEAT');
                        stump.setVariety(Phaser.Math.RND.between(1,3));
                        w++;
                    break;
                }
            }
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