import TILES from "../config/atlas/tile-weights.js";
import WALLTILES from "../config/atlas/wall-tile-weights.js";
import ROOFTILES from "../config/atlas/roof-tile-weights.js";
import STOOP from "../config/options/stoop.js";
import EXT_DOOR from "../config/options/ext-door.js";
/* PropertyLine Class */

export default class PropertyLine {

    constructor(scene, block, prop) {
        this.scene = scene;
        this.block = block;
        this.prop = prop;
        this.gates = []; // For rolling gates

        this.setMaterials();
    }

    setMaterials(settings = {}) {

        if (!settings.hasOwnProperty('mailbox')) {
            let colors = ['WEATHERED', 'SHINY', 'SLEEK'];
            settings.mailbox = this.roll(colors);
        }
        if (!settings.hasOwnProperty('fence')) {
            let fence_types = ['WOOD_FENCE', 'CHAINLINK_S'];
            let fence_options = {
                'WOOD_FENCE': [
                    'HONEY',
                    'BROWN',
                    'WEATHERED'
                ],
                'CHAINLINK_S': [
                    'COMPLETE',
                ]
            };
            settings.fence = {
                prefix: this.roll(fence_types)
            };
            settings.fence.suffix = this.roll(fence_options[settings.fence.prefix]);

        }
        if (!settings.hasOwnProperty('door')) {
            settings.door = this.roll(EXT_DOOR);
        }
        if (!settings.hasOwnProperty('foundation')) {
            settings.foundation = {
                height: this.roll([1]),
            };
            if (settings.foundation.height > 0) {

                settings.foundation.material = WALLTILES.BRICK.RED_WEATHERED_;
                //roll foundation options
                // Allow stoop

                if (!settings.hasOwnProperty('stoop')) {
                    settings.stoop = {
                        landing: {
                            width: this.roll([2, 3]),
                            depth: this.roll([1, 2]),
                            material: this.roll(STOOP.LANDING)
                        },
                        steps: {
                            height: settings.foundation.height,
                            material: this.roll(STOOP.STEPS),
                        },
                        rail: {
                            material: this.roll(STOOP.RAILS)
                        }
                    };

                }
            }
        }
        if (!settings.hasOwnProperty('levels')) {
            settings.levels = [];
            settings.levels.push({ height: this.roll([4, 4, 4, 5]) });
            settings.levels.push({ height: this.roll([4, 4, 4, 5]) });
        }
        if (!settings.hasOwnProperty('roof')) {
            settings.roof = {
                height: 8
            };
        }

        this.settings = settings;
    }

    roll(array) {
        return array[Phaser.Math.RND.between(0, array.length - 1)];
    }

    showIt() {
        const top = this.prop.lines.top;
        const left = this.prop.lines.left;
        const bottom = this.prop.lines.bottom;
        const right = this.prop.lines.right;
        const width = this.prop.lines.width;
        const height = this.prop.lines.height;
        const facing = this.prop.address.facing;
        
        this.scene.manager.objectManager.newObjectToWorld(left, top, 'CONE_UPRIGHT');
        this.scene.manager.objectManager.newObjectToWorld(right - 1, top, 'CONE_UPRIGHT');
        this.scene.manager.objectManager.newObjectToWorld(left, bottom - 1, 'CONE_UPRIGHT');
        this.scene.manager.objectManager.newObjectToWorld(right - 1, bottom - 1, 'CONE_UPRIGHT');

    }

    buildShop() {
        var top = this.prop.lines.top;
        var left = this.prop.lines.left;
        var bottom = this.prop.lines.bottom;
        var right = this.prop.lines.right;
        var width = this.prop.lines.width;
        var height = this.prop.lines.height;
        var facing = this.prop.address.facing;

        var building_width = width;
        var colors = ['RED_COMMERCIAL']
        var wallKind = WALLTILES.BRICK[this.roll(colors) + "_"];

        var _x = left;
        var _y = bottom - 1;
        var level_position = _y;

        for (var i = 0; i < this.settings.levels.length; i++) {
            this.buildFacadeSection(_x, level_position, building_width, this.settings.levels[i].height, wallKind);
            level_position = level_position - this.settings.levels[i].height;
        }

        this.block.groundLayer.weightedRandomize(TILES.ROOF.BITMAP_BRICK_FLAT_, _x, (level_position - this.settings.roof.height) + 1, building_width, this.settings.roof.height);


        
        this.gates.push(this.scene.manager.objectManager.newObjectToWorld(_x, _y, 'ROLLING_GATE_DOOR'));
        this.gates[0].sprite.setDepth(this.gates[0].sprite.depth + 1);
        this.front_door = this.scene.manager.objectManager.newObjectToWorld(_x, _y, 'EXT_DOOR_STORE_BLACK');
        this.front_door.setPortal({room_id: '1', x:3, y: 13, facing: 'n'});

        this.scene.manager.objectManager.newObjectToWorld(_x + 2, _y, 'EXT_WINDOW_STORE_4_CLAD');
        this.gates.push(this.scene.manager.objectManager.newObjectToWorld(_x + 2, _y, 'ROLLING_GATE_WIDE'));
        this.gates[1].sprite.setDepth(this.gates[1].sprite.depth + 1);

        this.scene.manager.objectManager.newObjectToWorld(_x + 6, _y, 'EXT_WINDOW_STORE_4_CLAD');
        this.gates.push(this.scene.manager.objectManager.newObjectToWorld(_x + 6, _y, 'ROLLING_GATE_WIDE'));
        this.gates[2].sprite.setDepth(this.gates[2].sprite.depth + 1);

        this.setRollingGates('OPENING');
    }

    setRollingGate(gate_index, state_name)  {
        this.gates[gate_index].setState(state_name);
    }

    setRollingGates(state_name) {
        for (var i = 0; i < this.gates.length; i++) {
            this.gates[i].setState(state_name);
        }
    }

    buildIt() {
        const top = this.prop.lines.top;
        const left = this.prop.lines.left;
        const bottom = this.prop.lines.bottom;
        const right = this.prop.lines.right;
        const width = this.prop.lines.width;
        const height = this.prop.lines.height;
        const facing = this.prop.address.facing;

        //check for "detached" tag-- make perimeter of space around building if found

        let yard = 3;

        //this.block.groundLayer.weightedRandomize(TILES.FOUNDATION.BITMAP_, left+1, top + 1, width - 2, height - (yard + 1));
        //this.block.groundLayer.weightedRandomize(TILES.GARDEN.BITMAP_, left+1, top + height - (yard + 1), width - 2,  yard);


        var _x = left + 1;
        //var _y = top + height - yard;
        var _y = bottom - yard;

        var building_width = width - 2;
        var material = this.roll([0, 1, 1, 2, 2]);

        if (material == 0) {
            var colors = ['YELLOW', 'BROWN', 'RED', 'GRAY', 'WHITE'];
            var wallKind = WALLTILES.BRICK[this.roll(colors) + '_CEMENT_'];
        }
        else if (material == 1) {
            var colors = ['RED_COMMERCIAL', 'YELLOW_COMMERCIAL'];
            var wallKind = WALLTILES.BRICK[this.roll(colors) + "_"];
        }
        else {
            var colors = ['ORANGE', 'YELLOW', 'GREEN', 'GRAY', 'PURPLE', 'BLUE'];
            var wallKind = WALLTILES.SIDING[this.roll(colors) + "_"];
        }

        if (this.settings.foundation.height > 0) {
            /// _y here is where the building meets the ground
            /// If there is a foundation, this is where the stairs meet the ground.
            this.buildFoundation(_x, _y, building_width, this.settings.foundation.height, this.settings.foundation.material);
            _y = _y - 1;
        }

        _y = _y - this.settings.foundation.height;
        this.buildFacadeSection(_x, _y, building_width, this.settings.levels[0].height, wallKind);

        ////
        this.block.groundLayer.weightedRandomize(TILES.ROOF.BITMAP_BRICK_FLAT_, _x, _y - (this.settings.roof.height + this.settings.levels[0].height) + 1, building_width, this.settings.roof.height);

        /*
        this.buildRoofSection(_x - 1, _y - (this.settings.levels[0].height) + 1, building_width + 2, this.settings.roof.height/2, ROOFTILES.PITCHED.METAL_SOUTH_);

        this.buildRoofSection(_x - 1, _y - (this.settings.levels[0].height + this.settings.roof.height/2) + 1, building_width + 2, this.settings.roof.height/2, ROOFTILES.PITCHED.METAL_NORTH_);
       */

        //this.buildPitchedRoof(_x - 1, _y - (this.settings.levels[0].height) + 1, building_width + 2, this.settings.roof.height, 'SHINGLES_');

        this.scene.manager.objectManager.newObjectToWorld(left + Math.floor(width / 2), _y, 'EXT_WINDOW_2_YELLOW_BRICK_T_');

        this.buildEntry(_x + 1, _y);

    }

    buildPitchedRoofColumn(_x, _y, height, north, south, material) {
        var roofLayer = this.block.roofLayer;
        if (south != 2) {
            roofLayer.weightedRandomize(material['REPEAT_3_SOUTH_'], _x, _y, 1, 1);
            roofLayer.weightedRandomize(material['REPEAT_1_SOUTH_'], _x, _y - 1, 1, 1);
        }
        else {
            roofLayer.weightedRandomize(material['REPEAT_2_SOUTH_'], _x, _y, 1, 1);
            roofLayer.weightedRandomize(material['MID_'], _x, _y - 1, 1, 1);
        }

        roofLayer.weightedRandomize(material['REPEAT_' + north + '_NORTH_'], _x, _y - height, 1, 1);

        roofLayer.weightedRandomize(material['MID_'], _x, (_y - height) + 1, 1, height - 2);
    }

    buildPitchedRoofCap(_x, _y, height, north, south, material) {
        var roofLayer = this.block.roofLayer;

        roofLayer.weightedRandomize(material['PEAK_' + south + '_SOUTH_'], _x, _y, 1, 1);

        roofLayer.weightedRandomize(material['PEAK_' + north + '_NORTH_'], _x, _y - height, 1, 1);

        roofLayer.weightedRandomize(material['PEAK_EDGE_'], _x, (_y - height) + 1, 1, height - 1);

    }

    buildPitchedRoof(_x, _y, width, height, material) {
        var w_material = ROOFTILES.PITCHED[material + 'WEST_'];
        var e_material = ROOFTILES.PITCHED[material + 'EAST_'];
        var roofLayer = this.block.roofLayer;
        /// Lower left is _x, _y

        var colors = ['ORANGE', 'YELLOW', 'GREEN', 'GRAY', 'PURPLE', 'BLUE'];
        var wallKind = WALLTILES.SIDING[this.roll(colors) + "_"];
        this.buildFacadeSection(_x + 1, _y - 1, width - 2, 3, wallKind);
        // First determine which roof parts we need

        var w_side_width = Math.floor(width / 2);
        var w_side_remaining = w_side_width;
        var w_side_place = 0;
        var w_y = _y;

        var north = 1;
        var south = 2;

        while (w_side_remaining > 1) {

            this.buildPitchedRoofColumn(_x + w_side_place, Math.ceil(w_y), height, north, south, w_material);

            north = north == 1 ? 2 : 1;
            south = south == 1 ? 2 : 1;

            w_side_place++;
            w_side_remaining--;
            w_y = w_y - .5;
        }
        // Then do roof cap
        this.buildPitchedRoofCap(_x + w_side_place, Math.ceil(w_y), height, north, south, w_material);

        ////////////////////////////
        // Start fresh for east side
        var e_side_width = Math.ceil(width / 2);
        var e_side_remaining = e_side_width;
        var e_side_place = 0;
        var e_y = _y;

        north = 1;
        south = 2;

        while (e_side_remaining > 1) {
                
                this.buildPitchedRoofColumn(_x + (width - 1) - e_side_place, Math.ceil(e_y), height, north, south, e_material);
    
                north = north == 1 ? 2 : 1;
                south = south == 1 ? 2 : 1;
    
                e_side_place++;
                e_side_remaining--;
                e_y = e_y - .5;
            }
        // Then do roof cap
        this.buildPitchedRoofCap(_x + w_side_width, Math.ceil(e_y), height, north, south, e_material);
    }

    buildRoofSection(_x, _y, width, height, material) {
        var roofLayer = this.block.roofLayer;

        /// Lower left is _x, _y
        roofLayer.weightedRandomize(material.LOWER_LEFT_, _x, _y, 1, 1);
        roofLayer.weightedRandomize(material.LOWER_, _x + 1, _y, width - 2, 1);
        roofLayer.weightedRandomize(material.LOWER_RIGHT_, _x + width - 1, _y, 1, 1);

        if (height > 2) {
            // go up by the number of mid tiles (height-2)
            _y = _y - (height - 2);
            roofLayer.weightedRandomize(material.MID_LEFT_, _x, _y, 1, height - 2);
            roofLayer.weightedRandomize(material.MID_, _x + 1, _y, width - 2, height - 2);
            roofLayer.weightedRandomize(material.MID_RIGHT_, _x + width - 1, _y, 1, height - 2);
        }
        if (height > 1) {
            _y = _y - 1;
            roofLayer.weightedRandomize(material.TOP_LEFT_, _x, _y, 1, 1);
            roofLayer.weightedRandomize(material.TOP_, _x + 1, _y, width - 2, 1);
            roofLayer.weightedRandomize(material.TOP_RIGHT_, _x + width - 1, _y, 1, 1);
        }

    }

    buildFacadeSection(_x, _y, width, height, material) {
        this.block.groundLayer.weightedRandomize(TILES.DIRT.FILL_, _x - 1, _y - height, width + 2, height + 2);
        /// Lower left is _x, _y
        this.block.wallLayer.weightedRandomize(material.LOWER_LEFT_, _x, _y, 1, 1);
        this.block.wallLayer.weightedRandomize(material.LOWER_, _x + 1, _y, width - 2, 1);
        this.block.wallLayer.weightedRandomize(material.LOWER_RIGHT_, _x + width - 1, _y, 1, 1);

        if (height > 2) {
            // go up by the number of mid tiles (height-2)
            _y = _y - (height - 2);
            this.block.wallLayer.weightedRandomize(material.MID_LEFT_, _x, _y, 1, height - 2);
            this.block.wallLayer.weightedRandomize(material.MID_, _x + 1, _y, width - 2, height - 2);
            this.block.wallLayer.weightedRandomize(material.MID_RIGHT_, _x + width - 1, _y, 1, height - 2);
        }
        if (height > 1) {
            _y = _y - 1;
            this.block.wallLayer.weightedRandomize(material.TOP_LEFT_, _x, _y, 1, 1);
            this.block.wallLayer.weightedRandomize(material.TOP_, _x + 1, _y, width - 2, 1);
            this.block.wallLayer.weightedRandomize(material.TOP_RIGHT_, _x + width - 1, _y, 1, 1);
        }



    }

    buildFoundation(_x, _y, width, height, material) {
        this.buildFacadeSection(_x, _y - height, width, height, material);
        //this.block.wallLayer.weightedRandomize(material.MID_, _x, _y - height, width, height);
    }

    buildYardBorder(_x, width = 2) {
        /// _x is for the path gap
        var left_length = _x - this.prop.lines.left;
        var right_length = this.prop.lines.right - (_x + width) - 1; // - 1 accomodates mailbox to the right of the front walk

        if (left_length < 6) {
            
            this.buildFence(this.prop.lines.left, this.prop.lines.bottom, left_length, this.settings.fence.prefix, this.settings.fence.suffix);

        }
        else {
            this.scene.manager.objectManager.newObjectToWorld(this.prop.lines.left, this.prop.lines.bottom, 'BOXELDER');
        }

        this.mailbox = this.buildMailbox(_x + width, this.prop.lines.bottom);


        if (right_length < 6) {
            this.buildFence(_x + width + 1, this.prop.lines.bottom, right_length, this.settings.fence.prefix, this.settings.fence.suffix);

            if (this.settings.fence.prefix != 'CHAINLINK_S') {
                this.buildFence(_x + width + right_length, this.prop.lines.bottom - 3, 4, this.settings.fence.prefix, this.settings.fence.suffix, false);
                }
        }
        else {
            this.block.groundLayer.weightedRandomize(TILES.DIRT.FILL_, _x + width + 1, this.prop.lines.bottom, 6, 2);
            this.scene.manager.objectManager.newObjectToWorld(_x + width + 1, this.prop.lines.bottom, 'BOXELDER');
            this.scene.manager.objectManager.newObjectToWorld(_x + width + 3, this.prop.lines.bottom, 'BOXELDER');
            this.scene.manager.objectManager.newObjectToWorld(_x + width + 5, this.prop.lines.bottom, 'WICKET_NS');
        }
    }

    buildFence(_x, _y, width = 2, prefix = 'WOOD_FENCE', suffix = 'BROWN', horizontal = true) {
        let orientation = horizontal ? '' : 'VERTICAL_';
        this.scene.manager.objectManager.newObjectToWorld(_x, _y, prefix + '_' + width + '_' + orientation + suffix);
    }

    buildMailbox(_x, _y) {
        var newspaper = this.scene.manager.itemManager.newItemToWorld(_x - 1, _y, 'NEWSPAPER');
        let mailbox = this.scene.manager.objectManager.newObjectToWorld(_x, _y, 'MAILBOX_' + this.settings.mailbox);

        mailbox.setName('MAILBOX ' + this.prop.address.number + ' ' + this.prop.address.street);

        mailbox.setAnnouncement(this.prop.address.number);

        return mailbox;
    }

    buildFrontWalk(_x, _y) {
        var width = 2;
        var height = this.prop.lines.bottom - _y + 1;
        this.block.groundLayer.weightedRandomize(TILES.CEMENT.FILL_, _x, _y, width, height);
    }

    buildEntry(_x, _y) {
        
        this.front_door = this.scene.manager.objectManager.newObjectToWorld(_x, _y, 'EXT_DOOR_' + this.settings.door);

        /// Get the portal from the property object, whenever that gets built out... Until then, hardcode it.
        this.front_door.setPortal({room_id: '6', x:3, y: 9, facing: 'N'});
        //this.doormat = this.scene.manager.objectManager.newObjectToWorld(_x, _y + 1, 'DOORMAT_1');
        if (this.settings.foundation.height > 0) {
            this.buildStoop(_x, _y + 1);
            this.buildFrontWalk(_x, _y + 1 + this.settings.foundation.height + this.settings.stoop.landing.depth);
        }
        else {
            this.buildFrontWalk(_x, _y + 1);
        }

        this.buildYardBorder(_x, 2); // path width
    }

    buildStoop(_x, _y) {
        var facing = 's';
        var stoop = this.settings.stoop.landing.depth;
        var width = this.settings.stoop.landing.width;
        var stairs = this.settings.stoop.steps.height;


        var landing_material = this.settings.stoop.landing.material;
        var steps_material = this.settings.stoop.steps.material;
        var rail_material = this.settings.stoop.rail.material;

        // Lay roof tiles
        //this.buildRoofSection(_x - 1, _y - (this.settings.levels[0].height - 2), width + 2, 3, ROOFTILES.SHINGLES.SOUTH_);

        // Lay landing tiles
        this.block.groundLayer.weightedRandomize(TILES[landing_material.MATERIAL][landing_material.VARIETY[0]], _x, _y, width, stoop);

        // Lay stair tiles
        this.block.groundLayer.weightedRandomize(TILES.STAIRS[steps_material.MATERIAL], _x, _y + stoop, width, stairs);

        // Lay stair rail objects
        this.scene.manager.objectManager.newObjectToWorld(_x - 1, _y, rail_material.MATERIAL + '_STAIR_RAIL_L_' + stoop + '_' + stairs + '_');
        this.scene.manager.objectManager.newObjectToWorld(_x + width, _y, rail_material.MATERIAL + '_STAIR_RAIL_R_' + stoop + '_' + stairs + '_');

        // Remove wall tiles for building where stoop sits
        for (var j = 0; j < parseInt(stoop + stairs); j++) {
            for (var i = 0; i < width; i++) {
                this.block.wallLayer.removeTileAt(_x + i, _y + j);
            }
        }

        return {
            height: stoop + stairs,
            width: width
        };
    }

}