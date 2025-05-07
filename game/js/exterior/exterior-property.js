import TILES from "../config/atlas/tile-weights.js";
import WALLTILES from "../config/atlas/wall-tile-weights.js";
import ROOFTILES from "../config/atlas/roof-tile-weights.js";
import STOOP from "../config/options/stoop.js";
import GameUtilities from "../game/game-utilities.js";
import Shop from "../object/shop.js";
import OBJECT_TYPES from "../config/atlas/object-types.js";
/* PropertyLine Class */

export default class PropertyLine {

    constructor(scene, prop) {
        this.scene = scene;
        this.prop = prop;

        this.utilities = new GameUtilities();

    }

    setMaterials(settings = {}) {
        if (!settings.hasOwnProperty('mailbox')) {
            settings.mailbox = this.roll(OBJECT_TYPES.MAILBOX);
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
            settings.door = this.roll(OBJECT_TYPES.EXT_DOOR_);
        }
        if (!settings.hasOwnProperty('window')) {
            settings.window = this.roll(OBJECT_TYPES.WINDOW_EXT_);
        }
        if (!settings.hasOwnProperty('stair_rail')) {
            settings.stair_rail = this.roll(['PORCH_STAIR_RAIL_LEFT','PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_DARK','PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_GREEN','PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_WHITE','PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_WOOD']);
        }

        if (!settings.hasOwnProperty('foundation')) {
            settings.foundation = {
                height: this.roll([1]),
            };
            if (settings.foundation.height > 0) {

                settings.foundation.material = this.roll([WALLTILES.BRICK.RED_WEATHERED_, WALLTILES.BRICK.YELLOW_WEATHERED_]);
                //roll foundation options
                // Allow stoop

                if (!settings.hasOwnProperty('stoop')) {
                    settings.stoop = {
                        landing: {
                            width: this.roll([2, 3]),
                            depth: this.roll([2]),
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
            settings.levels.push({ height: this.roll([4, 4, 4]) });
            settings.levels.push({ height: this.roll([4, 4, 4]) });
        }
        if (!settings.hasOwnProperty('roof')) {
            settings.roof = {
                height: 15
            };
        }

        this.settings = settings;
    }

    roll(array) {
        return array[Phaser.Math.RND.between(0, array.length - 1)];
    }

    showIt() {
        let top = this.prop.lines.top;
        let left = this.prop.lines.left;
        let bottom = this.prop.lines.bottom;
        let right = this.prop.lines.right;

        this.scene.manager.objectManager.newObjectToWorld(left, top, 'CONE_UPRIGHT');
        this.scene.manager.objectManager.newObjectToWorld(right - 1, top, 'CONE_UPRIGHT');
        this.scene.manager.objectManager.newObjectToWorld(left, bottom - 1, 'CONE_UPRIGHT');
        this.scene.manager.objectManager.newObjectToWorld(right - 1, bottom - 1, 'CONE_UPRIGHT');
    }

    buildIt() {
        /// roll for whether this continues as a house or becomes a shop

        if (this.prop.structure.zoning == 'COMMERCIAL') {
            //this.showIt();
            let shop = new Shop(this.scene, this.prop, this.settings);
            return;
        }

        this.setMaterials();
        const top = this.prop.lines.top;
        const left = this.prop.lines.left;
        const bottom = this.prop.lines.bottom;
        const right = this.prop.lines.right;
        const width = this.prop.lines.width;
        const height = this.prop.lines.height;
        const facing = this.prop.address.facing;

        //check for "detached" tag-- make perimeter of space around building if found



        let yard = 5;

        var _x = left + 1;
        var _y = bottom - yard;

        var building_width = width - 2;

        if (this.prop.structure.type == 'DUPLEX-LEFT') {
            _x = left + 2;
        }
        if (this.prop.structure.type == 'DUPLEX-RIGHT') {
            _x = left;
            this.buildGarden(_x + 4, _y-1, 6, 3);
        }

        var material = this.roll([1, 2, 1, 1, 2, 2]);

        if (material == 0) {
            var colors = ['YELLOW', 'BROWN', 'RED', 'GRAY', 'WHITE'];
            var wallKind = WALLTILES.BRICK[this.roll(colors) + '_CEMENT_'];
        }
        else if (material == 1) {
            //var colors = ['BLUE_COMMERCIAL', 'BLACK_COMMERCIAL', 'RED_COMMERCIAL', 'YELLOW_COMMERCIAL'];
            var colors = ['RED_COMMERCIAL', 'YELLOW_COMMERCIAL'];
            var wallKind = WALLTILES.BRICK[this.roll(colors) + "_"];
        }
        else {
            var colors = ['ORANGE', 'YELLOW', 'GREEN_DARK', 'GRAY', 'PURPLE', 'BLUE', 'RED', 'WHITE', 'DARK_BLUE'];
            var wallKind = WALLTILES.SIDING[this.roll(colors) + "_WOOD_"];
        }

        if (this.settings.foundation.height > 0) {
            /// _y here is where the building meets the ground
            /// If there is a foundation, this is where the stairs meet the ground.
            this.buildFoundation(_x, _y, building_width, this.settings.foundation.height, this.settings.foundation.material);
            _y = _y - 1;
        }

        _y = _y - this.settings.foundation.height;
        this.buildFacadeSection(_x, _y, building_width, this.settings.levels[0].height, wallKind);

        if (building_width % 2 == 0) {
            /////

            if (this.prop.structure.type != 'DUPLEX-RIGHT' && this.prop.structure.type != 'ROWHOUSE') {
                this.scene.manager.objectManager.newObjectToWorld(_x - 1, _y + 1, 'DOWNSPOUT_' + this.settings.levels[0].height + '_W');
            }

            this.buildRoofObjects(_x, _y - (this.settings.levels[0].height) - 5, building_width, 2);
            this.buildRoofObjects(_x, _y - (this.settings.levels[0].height), building_width, 2);

        }
        else {
            this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.ROOF.BITMAP_BRICK_FLAT_, _x, _y - (this.settings.roof.height + this.settings.levels[0].height) + 1, building_width, this.settings.roof.height);

            if (this.prop.structure.type != 'DUPLEX-RIGHT' && this.prop.structure.type != 'ROWHOUSE') {
                this.scene.manager.objectManager.newObjectToWorld(_x - 1, _y, 'DOWNSPOUT_' + this.settings.levels[0].height + '_W');
            }
        }


        let entry_x = _x + 1;
        let entry_y = _y;
        let window_x = _x + 5;
        let window_y = _y;

        if (this.prop.structure.type == 'DUPLEX-LEFT') {
            entry_x = _x + building_width - 3;
            window_x = _x + 2;
        }

        this.scene.manager.objectManager.newObjectToWorld(window_x, window_y, this.settings.window);

        if (this.settings.window.includes('SINGLE')) {
            this.scene.manager.objectManager.newObjectToWorld(window_x+2, window_y, this.settings.window);

            let window_unit = this.scene.manager.objectManager.newObjectToWorld(window_x, window_y - .5, 'AC_WINDOW_UNIT');
            window_unit.sprite.setDepth(window_unit.sprite.depth + 16);
            window_unit.sprite.setOrigin(.5,1);
        }

        this.buildEntry(entry_x, entry_y);

    }

    buildPitchedRoofColumn(_x, _y, height, north, south, material) {
        var roofLayer = this.scene[this.scene.locale].roofLayer;
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
        var roofLayer = this.scene[this.scene.locale].roofLayer;

        roofLayer.weightedRandomize(material['PEAK_' + north + '_NORTH_'], _x, _y - height, 1, 1);

        roofLayer.weightedRandomize(material['PEAK_EDGE_'], _x, (_y - height) + 1, 1, height - 1);

        if (south != 2) {
            roofLayer.weightedRandomize(material['REPEAT_3_SOUTH_'], _x, _y, 1, 1);
            roofLayer.weightedRandomize(material['PEAK_' + south + '_SOUTH_'], _x, _y - 1, 1, 1);
        }
        else {
            roofLayer.weightedRandomize(material['PEAK_' + south + '_SOUTH_'], _x, _y, 1, 1);
            //roofLayer.weightedRandomize(material['MID_'], _x, _y - 1, 1, 1);

        }

    }

    buildPitchedRoof(_x, _y, width, height, material) {
        var w_material = ROOFTILES.PITCHED[material + 'WEST_'];
        var e_material = ROOFTILES.PITCHED[material + 'EAST_'];
        var roofLayer = this.scene[this.scene.locale].roofLayer;
        /// Lower left is _x, _y

        var colors = ['ORANGE', 'YELLOW', 'GREEN_DARK', 'GRAY', 'PURPLE', 'BLUE', 'RED', 'WHITE', 'DARK_BLUE'];
        var wallKind = WALLTILES.SIDING[this.roll(colors) + "_WOOD_"];

        this.buildFacadeSection(_x, _y - 1, width, 3, wallKind);
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
        var roofLayer = this.scene[this.scene.locale].roofLayer;

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
        /// Lower left is _x, _y
        this.utilities.buildFacadeSection(_x, _y, width, height, material, this.scene[this.scene.locale].wallLayer);
    }

    buildRoofObjects(_x, _y, width, pitch,) {
        var colors = ['ORANGE', 'YELLOW', 'GREEN_DARK', 'GRAY', 'PURPLE', 'BLUE', 'RED', 'WHITE', 'DARK_BLUE'];
        var wallKind = WALLTILES.SIDING[this.roll(colors) + "_WOOD_"];

        this.buildFacadeSection(_x, _y, width, pitch + 1, wallKind);

        /// If this is a duplex....
        if (this.prop.structure.type != 'DUPLEX-RIGHT') {
            this.buildRoofObject(_x, _y + 1, width / 2, pitch, 'W', 'SHINGLES_');
        }
        if (this.prop.structure.type != 'DUPLEX-LEFT') {
            this.buildRoofObject(_x + width / 2, _y + 1, width / 2, pitch, 'E', 'SHINGLES_');
        }

        if (this.prop.structure.type == 'DUPLEX-RIGHT') {
            this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.ROOF.BITMAP_BRICK_FLAT_, _x, _y - 6, width / 2, 5);
            this.removeWallTiles(_x, _y - 6, width / 2, 5);
        }

        if (this.prop.structure.type == 'DUPLEX-LEFT') {
            this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.ROOF.BITMAP_BRICK_FLAT_, _x + width / 2, _y - 6, width / 2, 5);
            this.removeWallTiles(_x + width / 2, _y - 6, width / 2, 5);
        }
    }

    buildRoofObject(_x, _y, width, pitch, direction, material) {
        this.scene.manager.objectManager.newObjectToWorld(_x, _y - 5, 'PITCHED_ROOF_BROWN_' + direction + '_' + width + '_' + pitch);


    }

    buildLawn(_x, _y, width, height) {
        this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.GRASS.FILL_, _x, _y, width, height);
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                var exists = this.roll([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 2, 3, 3]);
                if (exists == 1) {
                    var sedge = this.scene.manager.objectManager.newObjectToWorld(_x + i, _y + j, 'CREEK_SEDGE');
                    sedge.setState('HARVESTABLE');

                }
                else if (exists == 2) {
                    //this.scene.manager.plantManager.newPlantToWorld(_x + i, _y + j, 'DANDELION', Phaser.Math.RND.between(1, 44));
                }
                else if (exists == 3) {
                    //this.scene.manager.plantManager.newPlantToWorld(_x + i, _y + j, 'WOOD_SORREL', Phaser.Math.RND.between(1, 44));
                }
            }
        }

    }

    buildFoundation(_x, _y, width, height, material) {
        this.buildFacadeSection(_x, _y - height, width, height, material);
        //this.scene[this.scene.locale].wallLayer.weightedRandomize(material.MID_, _x, _y - height, width, height);
    }

    buildYardBorder(_x, width = 2) {
        /// _x is for the path gap
        var left_length = _x - this.prop.lines.left;
        var right_length = this.prop.lines.right - (_x + width) - 1; // - 1 accomodates mailbox to the right of the front walk

        if (left_length < 6) {
            if (left_length > 1) {
                this.buildFence(this.prop.lines.left, this.prop.lines.bottom - 1, left_length, this.settings.fence.prefix, this.settings.fence.suffix);
            }
            else {
                this.buildFence(this.prop.lines.left, this.prop.lines.bottom - 1, left_length, 'CHAINLINK_S', 'COMPLETE');
            }

        }
        else {
            let section_0 = 5;
            let section_1 = 5;
            if (left_length == 6) {
                section_0 = 3;
                section_1 = 3;
            }
            if (left_length == 7) {
                section_0 = 3;
                section_1 = 4;
            }
            if (left_length == 8) {
                section_0 = 4;
                section_1 = 4;
            }
            if (left_length == 9) {
                section_0 = 4;
                section_1 = 5;
            }

            let suffix = this.settings.fence.suffix == 'COMPLETE' ? 'OPEN' : this.settings.fence.suffix;

            this.buildFence(this.prop.lines.left, this.prop.lines.bottom - 1, section_0, this.settings.fence.prefix, this.settings.fence.suffix);

            this.buildFence(section_0 + this.prop.lines.left, this.prop.lines.bottom - 1, section_1, this.settings.fence.prefix, suffix);
        }


        if (this.prop.structure.type != 'DUPLEX-RIGHT') {
            // Vertical Fence
            let height = 4
            this.buildFence(this.prop.lines.left - .5, this.prop.lines.bottom - height, height, this.settings.fence.prefix, this.settings.fence.suffix, false);
            this.buildFence(this.prop.lines.left - .5, this.prop.lines.bottom - (height*2)+1, height, this.settings.fence.prefix, this.settings.fence.suffix, false);
            this.buildFence(this.prop.lines.left - .5, this.prop.lines.bottom - (height*3)+2, height, this.settings.fence.prefix, this.settings.fence.suffix, false);
        }

        this.mailbox = this.buildMailbox(_x + width, this.prop.lines.bottom - 1);


        if (this.settings.fence.prefix != 'CHAINLINK_S' && this.prop.structure.type != 'DUPLEX-LEFT') {
            // Vertical Fence
            let height = 4
            this.buildFence(_x + width + right_length, this.prop.lines.bottom - height, height, this.settings.fence.prefix, this.settings.fence.suffix, false);
        }


        if (right_length < 6) {
            if (right_length > 1) {
                this.buildFence(_x + width + 1, this.prop.lines.bottom - 1, right_length, this.settings.fence.prefix, this.settings.fence.suffix);
            }
            else {
                this.buildFence(_x + width + 1, this.prop.lines.bottom - 1, right_length, 'CHAINLINK_S', 'COMPLETE');
            }
        }
        else {
            let section_0 = 5;
            let section_1 = 5;
            if (right_length == 6) {
                section_0 = 3;
                section_1 = 3;
            }
            if (right_length == 7) {
                section_0 = 3;
                section_1 = 4;
            }
            if (right_length == 8) {
                section_0 = 4;
                section_1 = 4;
            }

            let suffix = this.settings.fence.suffix == 'COMPLETE' ? 'OPEN' : this.settings.fence.suffix;

            this.buildFence(_x + width + 1, this.prop.lines.bottom - 1, section_0, this.settings.fence.prefix, this.settings.fence.suffix);
            this.buildFence(section_0 + _x + width + 1, this.prop.lines.bottom - 1, section_1, this.settings.fence.prefix, suffix);
        }
    }

    buildFence(_x, _y, width = 2, prefix = 'WOOD_FENCE', suffix = 'BROWN', horizontal = true) {
        if (width == 0) {
            return;
        }
        let orientation = horizontal ? '' : 'VERTICAL_';
        let fence_panel = this.scene.manager.objectManager.newObjectToWorld(_x, _y, prefix + '_' + width + '_' + orientation + suffix);
        if (!horizontal) {
            fence_panel.sprite.setDepth(fence_panel.sprite.depth - 1);
        }
    }

    buildMailbox(_x, _y) {
        let mailbox = this.scene.manager.objectManager.newObjectToWorld(_x, _y, this.settings.mailbox);

        mailbox.setName('MAILBOX ' + this.prop.address.number + ' ' + this.prop.address.street);

        mailbox.setAnnouncement(this.prop.address.number);

        return mailbox;
    }

    buildFrontWalk(_x, _y) {
        var width = 2;
        var height = this.prop.lines.bottom - (_y);

        /// Allow front walk to have different tiles
        this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.CEMENT.FILL_, _x, _y, width, height);


        // Separate from front walk later
        var left_lawn_width = _x - this.prop.lines.left; // lawn width
        var lawn_height = this.prop.lines.bottom - _y; // lawn height
        this.buildLawn(this.prop.lines.left, _y, left_lawn_width, lawn_height);

        var right_lawn_width = this.prop.lines.right - _x - width; // lawn width

        this.buildLawn(this.prop.lines.left + left_lawn_width + width, _y, right_lawn_width, lawn_height);
    }

    buildEntry(_x, _y) {
        /// Get the portal from the property object, whenever that gets built out... Until then, hardcode it.
        //this.front_door.setPortal({ room_id: '6', x: 3, y: 9, facing: 'N' });
        this.setFrontDoor(_x, _y);
        let hasDoormat = this.roll([0,1,2,3]);
        if (hasDoormat > 0) {
            this.doormat = this.scene.manager.objectManager.newObjectToWorld(_x, _y + 1, 'DOORMAT_'+hasDoormat);
        }
        
        if (this.settings.foundation.height > 0) {
            //this.buildStoop(_x, _y + 1);
            this.buildPorch(_x, _y + 1);

            this.buildFrontWalk(_x, _y + 1 + this.settings.foundation.height + this.settings.stoop.landing.depth);
        }
        else {
            this.buildFrontWalk(_x, _y + 1);
        }

        this.buildYardBorder(_x, 2); // path width
    }

    setFrontDoor(_x, _y) {
        this.front_door = this.scene.manager.objectManager.newObjectToWorld(_x, _y, this.settings.door);
        this.front_door.sprite.setDepth(this.front_door.sprite.depth - 4);

        if (this.prop.portal != undefined) {
            let room_id = this.prop.portal.room_id;
            let x = this.prop.portal.x;
            let y = this.prop.portal.y;

            this.front_door.setPortal({ room_id: room_id, x: x, y: y, facing: 'N', return: { ROOM: -1, X: _x + 1, Y: _y + 3, FACING: 'S', SLUG: this.settings.door } });
        }
    }

    buildGarden(_x, _y, width, height) {
        this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.GARDEN.BITMAP_, _x, _y, width, height);

        for (var j = 1; j < height - 1; j++) {
            for (var i = 1; i < width - 1; i++) {
                var exists = this.roll([1,2,3]);
                if (exists == 1) {
                    var dandelion = this.scene.manager.plantManager.newPlantToWorld(_x + i, _y + j, 'DANDELION', Phaser.Math.RND.between(1, 44));
                }
                else if (exists == 2) {
                    var sorrel = this.scene.manager.plantManager.newPlantToWorld(_x + i, _y + j, 'WOOD_SORREL', Phaser.Math.RND.between(1, 66));
                    
                }
                else if (exists == 3) {
                    var sorrel = this.scene.manager.plantManager.newPlantToWorld(_x + i, _y + j, 'FOXTAIL', Phaser.Math.RND.between(1, 28));
                    
                }

            }
        }
    }

    buildPorch(_x, _y) {
        _x = _x - 1;
        /// PORCH_STAIR_RAIL_LEFT
        var stoop = { height: 2, width: 4 };
        var stairs = {
            x: 1,
            width: 2,
            height: 1
        };

        var landing_material = this.settings.stoop.landing.material;
        var steps_material = this.settings.stoop.steps.material;
        var porch_rail = this.settings.stair_rail;
        // Lay landing tiles
        this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES[landing_material.MATERIAL][landing_material.VARIETY[0]], _x, _y, stoop.width, stoop.height);

        ///

        this.buildFacadeSection(_x, _y + stoop.height, 4, stoop.height, this.settings.foundation.material);
        // Lay stair tiles
        this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.STAIRS[steps_material.MATERIAL], _x + stairs.x, _y + stoop.height, stairs.width, stairs.height);

        this.scene[this.scene.locale].wallLayer.removeTileAt(_x + stairs.x, _y + stoop.height);
        this.scene[this.scene.locale].wallLayer.removeTileAt(_x + 1 + stairs.x, _y + stoop.height);

        // Lay stair rail objects
        this.scene.manager.objectManager.newObjectToWorld(_x + stairs.x, _y + stoop.height, porch_rail);

        let porch_right = this.scene.manager.objectManager.newObjectToWorld(_x + stairs.x + 2, _y + stoop.height, porch_rail);

        porch_right.sprite.setFlipX(true);
        porch_right.sprite.setOffset(76, 44)


        var colors = ['TAN', 'BROWN', 'GREEN', 'PURPLE'];
        let porch_roof = this.scene.manager.objectManager.newObjectToWorld(_x, _y, 'PORCH_ROOF_4x2_' + this.roll(colors));
        porch_roof.sprite.setDepth(porch_roof.sprite.depth + 33);



        // Remove wall tiles for building where stoop sits
        for (var j = 0; j < stoop.height; j++) {
            for (var i = 0; i < stoop.width; i++) {
                this.scene[this.scene.locale].wallLayer.removeTileAt(_x + i, _y + j);
            }
        }

        return {
            height: stoop.height + stairs.height,
            stoop: stoop,
            stairs: stairs
        };

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
        this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES[landing_material.MATERIAL][landing_material.VARIETY[0]], _x, _y, width, stoop);

        // Lay stair tiles
        this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.STAIRS[steps_material.MATERIAL], _x, _y + stoop, width, stairs);

        // Lay stair rail objects
        this.scene.manager.objectManager.newObjectToWorld(_x - 1, _y, rail_material.MATERIAL + '_STAIR_RAIL_L_' + stoop + '_' + stairs + '_');
        this.scene.manager.objectManager.newObjectToWorld(_x + width, _y, rail_material.MATERIAL + '_STAIR_RAIL_R_' + stoop + '_' + stairs + '_');

        // Remove wall tiles for building where stoop sits
        for (var j = 0; j < parseInt(stoop + stairs); j++) {
            for (var i = 0; i < width; i++) {
                this.scene[this.scene.locale].wallLayer.removeTileAt(_x + i, _y + j);
            }
        }

        return {
            height: stoop + stairs,
            width: width
        };
    }

    removeWallTiles(_x, _y, width, height) {
        for (var j = 0; j < height; j++) {
            for (var i = 0; i < width; i++) {
                this.scene[this.scene.locale].wallLayer.removeTileAt(_x + i, _y + j);
            }
        }
    }

}