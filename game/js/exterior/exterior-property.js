import TILES from "../config/atlas/tile-weights.js";
import WALLTILES from "../config/atlas/wall-tile-weights.js";
import ROOFTILES from "../config/atlas/roof-tile-weights.js";
import STOOP from "../config/options/stoop.js";
import GameUtilities from "../game/game-utilities.js";
import Shop from "../object/shop.js";
import OBJECT_TYPES from "../config/atlas/object-types.js";
/* PropertyLine Class */

export default class PropertyLine {

    constructor(scene, prop, wallsBuilt = false) {
        this.scene = scene;
        this.prop = prop;
        this.wallsBuilt = wallsBuilt;
        this.utilities = new GameUtilities();
        if (wallsBuilt) {
            var block_properties = this.scene.slot.BLOCKS[this.prop.block.x][this.prop.block.y].properties;
            for (var i = 0; i < block_properties.length; i++) {
                if (block_properties[i].address == this.prop.address) {
                    this.prop.structure.settings = block_properties[i].structure.settings;
                }
            }
        }
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
        if (!settings.hasOwnProperty('upper_windows')) {
            settings.upper_windows = this.roll(OBJECT_TYPES.WINDOW_EXT_);
            
        }
        if (!settings.hasOwnProperty('stair_rail')) {
            settings.stair_rail = this.roll(['PORCH_STAIR_RAIL_LEFT','PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_DARK','PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_GREEN','PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_WHITE','PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_WOOD']);
        }

        if (!settings.hasOwnProperty('foundation')) {
            settings.foundation = {
                height: this.roll([1]),
            };
            if (settings.foundation.height > 0) {
                if (this.prop.structure.type == 'ROWHOUSE') {
                    settings.foundation.material = this.roll([WALLTILES.BRICK.RED_COMMERCIAL_, WALLTILES.BRICK.YELLOW_COMMERCIAL_,WALLTILES.CEMENT.GREEN_WORN_, WALLTILES.CEMENT.RED_YELLOW_WORN_, WALLTILES.CEMENT.BLUE_WORN_, WALLTILES.STUCCO.YELLOW_WORN_]);
                }
                else {
                    settings.foundation.material = this.roll([WALLTILES.BRICK.RED_WEATHERED_, WALLTILES.BRICK.YELLOW_WEATHERED_]);
                }
                
                //roll foundation options
                // Allow stoop

                if (!settings.hasOwnProperty('stoop')) {
                    settings.stoop = {
                        landing: {
                            width: this.roll([2]),
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
            if (this.prop.structure.type == 'ROWHOUSE') {
                settings.levels.push({ height: this.roll([4, 4, 4]) });
            }
            
        }
        if (!settings.hasOwnProperty('roof')) {
            settings.roof = {
                height: 15
            };
        }

        this.settings = settings;
        this.prop.structure.settings = settings;
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



    // Position Calculator - tracks building coordinates
    calculateBuildingPositions() {
        const left = this.prop.lines.left;
        const bottom = this.prop.lines.bottom;
        const width = this.prop.lines.width;
        
        let yard = 5;
        let building_width = width - 2;
        let building_x = left + 1;
        
        if (this.prop.structure.type == 'ROWHOUSE') {
            yard = 1;
            building_width = width;
            building_x = left;
        }

        if (this.prop.structure.type == 'DUPLEX-LEFT') {
            building_x = building_x + 1;
        }
        if (this.prop.structure.type == 'DUPLEX-RIGHT') {
            building_x = building_x - 1;
        }
        
        const ground_y = bottom - yard;
        
        return {
            building_x,
            ground_y,
            building_width,
            yard,
            left,
            bottom,
            width
        };
    }

    // Calculate wall material based on random selection
    calculateWallMaterial() {
        const material = this.roll([1, 2]);
        
        if (material == 1) {
            const colors = ['RED_COMMERCIAL', 'YELLOW_COMMERCIAL'];
            return WALLTILES.BRICK[this.roll(colors) + "_"];
        } else {
            const colors = ['ORANGE', 'YELLOW', 'GREEN_DARK', 'GRAY', 'PURPLE', 'BLUE', 'RED', 'WHITE', 'DARK_BLUE', 'GREEN_WEATHERED'];
            return WALLTILES.SIDING[this.roll(colors) + "_WOOD_"];
        }
    }

    // Draw all tiles for the building
    drawBuildingTiles(positions, wallMaterial) {
        let current_y = positions.ground_y;
        
        // Draw foundation tiles
        if (this.settings.foundation.height > 0) {
            this.buildFoundation(
                positions.building_x,
                current_y,
                positions.building_width,
                this.settings.foundation.height,
                this.settings.foundation.material
            );
            current_y = current_y - 1 - this.settings.foundation.height;
        }
        
        // Draw ground level facade
        this.buildFacadeSection(
            positions.building_x,
            current_y,
            positions.building_width,
            this.settings.levels[0].height,
            wallMaterial
        );
        
        const ground_level_y = current_y;
        
        // Draw upper level facade for rowhouses (only if walls aren't already built)
        if (this.settings.levels.length > 1 && this.prop.structure.type == 'ROWHOUSE') {
            current_y = current_y - this.settings.levels[0].height;
            this.buildFacadeSection(
                positions.building_x,
                current_y,
                positions.building_width,
                this.settings.levels[0].height,
                wallMaterial
            );
        }
        
        if (!this.wallsBuilt) {
            // Draw roof tiles
            this.drawRoofTiles(positions, current_y);
        }
        
        return { ground_level_y, current_y };
    }

    // Draw roof tiles based on building type
    drawRoofTiles(positions, current_y) {
        if (positions.building_width % 2 == 0 && this.prop.structure.type != 'ROWHOUSE') {
            this.buildFacadeSection(
                positions.building_x,
                current_y - (this.settings.levels[0].height) - 5,
                positions.building_width,
                2,
                this.calculateWallMaterial()
            );
            this.buildFacadeSection(
                positions.building_x,
                current_y - (this.settings.levels[0].height),
                positions.building_width,
                2,
                this.calculateWallMaterial()
            );
        } else {
            this.scene[this.scene.locale].groundLayer.weightedRandomize(
                TILES.ROOF.BITMAP_BRICK_FLAT_,
                positions.building_x,
                current_y - (this.settings.roof.height + this.settings.levels[0].height) + 1,
                positions.building_width,
                this.settings.roof.height
            );
        }
    }

    // Place all objects on the building
    placeBuildingObjects(positions, levels) {
        const { ground_level_y } = levels;
        
        // Place downspouts
        this.placeDownspouts(positions, levels);
        
        // Place roof objects
        this.placeRoofObjects(positions, levels);
        
        // Calculate window and entry positions
        const window_x = this.calculateWindowX(positions);
        const entry_x = this.calculateEntryX(positions);
        
        // Place windows
        this.placeGroundLevelWindows(window_x, ground_level_y);
        
        // Place upper windows for rowhouses
        if (this.settings.levels.length > 1 && this.prop.structure.type == 'ROWHOUSE') {
            this.addWindows(positions.building_x + 1, levels.current_y, positions.building_width - 1);
        }
        
        // Place entry (door and related objects)
        this.buildEntry(entry_x, ground_level_y);
    }

    // Calculate window X position based on building type
    calculateWindowX(positions) {
        if (this.prop.structure.type == 'DUPLEX-LEFT') {
            return positions.building_x + 2;
        }
        if (this.prop.structure.type == 'ROWHOUSE') {
            return this.settings.window.includes('SINGLE') ? 
                positions.building_x + 3 : 
                positions.building_x + 4;
        }
        return positions.building_x + 5;
    }

    // Calculate entry X position based on building type
    calculateEntryX(positions) {
        if (this.prop.structure.type == 'DUPLEX-LEFT') {
            return positions.building_x + positions.building_width - 3;
        }
        return positions.building_x + 1;
    }

    // Place downspout objects
    placeDownspouts(positions, levels) {
        if (this.prop.structure.type != 'DUPLEX-RIGHT' && this.prop.structure.type != 'ROWHOUSE') {
            if (positions.building_width % 2 == 0 && this.prop.structure.type != 'ROWHOUSE') {
                this.scene.manager.objectManager.newObjectToWorld(
                    positions.building_x - 1,
                    levels.current_y + 1,
                    'DOWNSPOUT_' + this.settings.levels[0].height + '_W'
                );
            } else {
                this.scene.manager.objectManager.newObjectToWorld(
                    positions.building_x - 1,
                    levels.ground_level_y,
                    'DOWNSPOUT_' + this.settings.levels[0].height + '_W'
                );
            }
        }
    }

    // Place roof objects
    placeRoofObjects(positions, levels) {
        if (positions.building_width % 2 == 0 && this.prop.structure.type != 'ROWHOUSE') {
            this.buildRoofObjects(
                positions.building_x,
                levels.current_y - (this.settings.levels[0].height) - 5,
                positions.building_width,
                2
            );
            this.buildRoofObjects(
                positions.building_x,
                levels.current_y - (this.settings.levels[0].height),
                positions.building_width,
                2
            );
        }
    }

    // Place ground level windows and AC unit
    placeGroundLevelWindows(window_x, ground_level_y) {
        this.scene.manager.objectManager.newObjectToWorld(window_x, ground_level_y, this.settings.window);
        
        if (this.settings.window.includes('SINGLE')) {
            this.scene.manager.objectManager.newObjectToWorld(window_x + 2, ground_level_y, this.settings.window);
            
            let window_unit = this.scene.manager.objectManager.newObjectToWorld(window_x, ground_level_y - .5, 'AC_WINDOW_UNIT');
            window_unit.sprite.setDepth(window_unit.sprite.depth + 16);
            window_unit.sprite.setOrigin(.5, 1);
        }
    }

    // Handle front yard features based on building type
    handleFrontYardFeatures(positions) {
        if (this.prop.structure.type == 'ROWHOUSE') {
            this.buildRowhouseFront(positions.building_x, positions.ground_y - 3, positions.width, positions.yard + 3);
        }
        
        if (this.prop.structure.type == 'DUPLEX-LEFT') {
            this.buildGarden(positions.building_x, positions.ground_y - 1, 6, 3);
        }
        
        if (this.prop.structure.type == 'DUPLEX-RIGHT') {
            this.buildGarden(positions.left + 4, positions.ground_y - 1, 6, 3);
        }
    }

    buildIt() {

        // Handle commercial properties
        if (this.prop.structure.zoning == 'COMMERCIAL') {
            let shop = new Shop(this.scene, this.prop, this.wallsBuilt);
            return;
        }

        // Initialize materials and settings
        this.setMaterials(this.prop.structure.settings ? this.prop.structure.settings : {});

        // Calculate all building positions
        const positions = this.calculateBuildingPositions();
        
        // Handle front yard features (rowhouse front, gardens)
        this.handleFrontYardFeatures(positions);
        
        
        
        if (!this.wallsBuilt) {
            // Draw all building tiles (foundation, facade, roof)
            // Calculate wall material
            const wallMaterial = this.calculateWallMaterial();
            var levels = this.drawBuildingTiles(positions, wallMaterial);
        } else {
            // Calculate correct levels when walls are already built
            let current_y = positions.ground_y;
            if (this.settings.foundation.height > 0) {
                current_y = current_y - 1 - this.settings.foundation.height;
            }
            const ground_level_y = current_y;
            
            // Adjust current_y for upper level if rowhouse
            if (this.settings.levels.length > 1 && this.prop.structure.type == 'ROWHOUSE') {
                current_y = current_y - this.settings.levels[0].height;
            }
            
            var levels = { ground_level_y, current_y };
        }
        
        // Place all building objects (windows, doors, downspouts, etc.)
        this.placeBuildingObjects(positions, levels);
    }

    buildFacadeSection(_x, _y, width, height, material) {
        /// Lower left is _x, _y
        this.utilities.buildFacadeSection(_x, _y, width, height, material, this.scene[this.scene.locale].wallLayer);
    }

    buildRoofObjects(_x, _y, width, pitch,) {
        if (!this.wallsBuilt) {
            var colors = ['ORANGE', 'YELLOW', 'GREEN_DARK', 'GRAY', 'PURPLE', 'BLUE', 'RED', 'WHITE', 'DARK_BLUE'];
            var wallKind = WALLTILES.SIDING[this.roll(colors) + "_WOOD_"];

            this.buildFacadeSection(_x, _y, width, pitch + 1, wallKind);
        }
        
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
                    this.scene.manager.plantManager.newPlantToWorld(_x + i, _y + j, 'DANDELION', Phaser.Math.RND.between(1, 44));
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

    addWindows(_x, _y, width, index=0) {
        let window_width = 3;
        if (this.settings.upper_windows.includes('SINGLE') && this.roll([0,1,2,3,4]) == 1) {
            window_width = 2;
        }
        if (width < window_width) {
            return;
        }
        
        this.scene.manager.objectManager.newObjectToWorld(_x + (index*window_width), _y, this.settings.window);


        var remaining_width = parseInt(width - window_width);
        if (remaining_width >= window_width) {
            index++;
           this.addWindows(_x, _y, remaining_width, index);
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
        this.setFrontDoor(_x, _y);
        let hasDoormat = this.roll([0,1,2,3]);
        if (hasDoormat > 0) {
            this.doormat = this.scene.manager.objectManager.newObjectToWorld(_x, _y + 1, 'DOORMAT_'+hasDoormat);
        }
        
        if (this.settings.foundation.height > 0) {
            if (this.prop.structure.type == 'ROWHOUSE') {
                this.buildStoop(_x, _y + 1);
            }
            else {
                this.buildPorch(_x, _y + 1);
            }
        
            this.buildFrontWalk(_x, _y + 1 + this.settings.foundation.height + this.settings.stoop.landing.depth);

            if (this.prop.structure.type == 'ROWHOUSE') {
                return;
            }
        }
        else {
            this.buildFrontWalk(_x, _y + 1);
        }

        this.buildYardBorder(_x, 2); // path width
    }

    getFrontDoor() {
        return this.front_door;
    }

    setFrontDoor(_x, _y) {
        this.front_door = this.scene.manager.objectManager.newObjectToWorld(_x, _y, this.settings.door);
        this.front_door.sprite.setDepth(this.front_door.sprite.depth - 4);

        if (this.prop.portal != undefined) {
            let room_id = this.prop.portal.room_id;
            let x = this.prop.portal.x;
            let y = this.prop.portal.y;
            this.prop.portal.world = {
                x: _x + 1,
                y: _y + 1
            };

            this.front_door.setPortal({ room_id: room_id, x: x, y: y, facing: 'N', world: this.prop.portal.world, return: { ROOM: -1, X: _x + 1, Y: _y + 1, FACING: 'S', SLUG: this.settings.door } });
        }
    }

    buildRowhouseFront(_x, _y, width, height) {
        this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.CEMENT.FILL_, _x, _y, width, height);
    }

    buildGarden(_x, _y, width, height) {
        this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.GARDEN.BITMAP_, _x, _y, width, height);

        for (var j = 1; j < height - 1; j++) {
            for (var i = 1; i < width - 1; i++) {
                var exists = this.roll([1,2,3,4,4,4,4]);
                if (exists == 1) {
                    var dandelion = this.scene.manager.plantManager.newPlantToWorld(_x + i, _y + j, 'DANDELION', Phaser.Math.RND.between(1, 44));
                }
                else if (exists == 2) {
                    var sorrel = this.scene.manager.plantManager.newPlantToWorld(_x + i, _y + j, 'WOOD_SORREL', Phaser.Math.RND.between(1, 66));
                    
                }
                else if (exists == 3) {
                    var foxtail = this.scene.manager.plantManager.newPlantToWorld(_x + i, _y + j, 'FOXTAIL', Phaser.Math.RND.between(1, 28));
                    
                }
                else if (exists == 4) {
                    var milkweed = this.scene.manager.plantManager.newPlantToWorld(_x + i, _y + j, 'MILKWEED', Phaser.Math.RND.between(20, 52));
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
        var stoop = 1;
        var width = this.settings.stoop.landing.width;
        var stairs = this.settings.stoop.steps.height;


        var landing_material = this.settings.stoop.landing.material;
        var steps_material = this.settings.stoop.steps.material;
        var rail_material = this.settings.stoop.rail.material;

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

    getSaveData() {
        return this.prop;
    }

}