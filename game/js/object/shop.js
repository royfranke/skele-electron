import GameUtilities from "../game/game-utilities.js";
import TILES from "../config/atlas/tile-weights.js";
import WALLTILES from "../config/atlas/wall-tile-weights.js";
import ROOFTILES from "../config/atlas/roof-tile-weights.js";
import OBJECT_TYPES from "../config/atlas/object-types.js";
/* Exterior Shop Class */

export default class Shop {
    constructor(scene, propertyLine, settings) {
        this.scene = scene;
        this.prop = propertyLine;
        this.setMaterials(settings);
        this.utilities = new GameUtilities();
        this.gates = [];
        this.buildShop();
    }

    setMaterials(settings = {}) {

        if (!settings.hasOwnProperty('door')) {

            settings.door = this.roll(OBJECT_TYPES.STORE_DOOR_);
        }
        if (!settings.hasOwnProperty('levels')) {
            settings.levels = [];
            settings.levels.push({ height: this.roll([4, 4, 4, 5]) });
            settings.levels.push({ height: this.roll([4, 4, 4, 5]) });
        }

        this.settings = settings;
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
        var colors = ['RED_COMMERCIAL', 'YELLOW_COMMERCIAL','RED_COMMERCIAL', 'YELLOW_COMMERCIAL', 'BLUE_COMMERCIAL', 'BLACK_COMMERCIAL']; // Weighting the array by repeating more desired colors
        var wallKind = WALLTILES.BRICK[this.roll(colors) + "_"];

        var _x = left;
        var _y = bottom - 1;
        var level_position = _y;

        if (this.prop.structure.type == 'CORNER-STORE-LEFT') {
            building_width = building_width - 1;
            _x = _x + 1;
        }
        if (this.prop.structure.type == 'CORNER-STORE-RIGHT') {
            building_width = building_width - 1;
        }

        for (var i = 0; i < this.settings.levels.length; i++) {
            this.buildFacadeSection(_x, level_position, building_width, this.settings.levels[i].height, wallKind);
            level_position = level_position - this.settings.levels[i].height;
        }

        this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.ROOF.BITMAP_BRICK_FLAT_, _x, (level_position - this.settings.roof.height) + 1, building_width, this.settings.roof.height);

        if (this.prop.structure.type == 'STOREFRONT') {
            this.addStoreWindows(_x, _y, 4);
            this.setFrontDoor(_x + 4, _y);
            this.addStoreWindows(_x + 6, _y, building_width - 6);
        }

        if (this.prop.structure.type == 'CORNER-STORE-LEFT') {
            this.setFrontDoor(_x, _y);
            this.addStoreWindows(_x + 2, _y, building_width - 2);
            if (this.prop.listing.slug == 'BONEDEGA') {
                this.sign = this.scene.manager.objectManager.newObjectToWorld(_x - 1, _y, 'LIT_SIGN_BONEDEGA');
                this.sign.sprite.setDepth(this.sign.sprite.depth + 32);

                this.scene.manager.objectManager.newObjectToWorld(_x + 6, _y + 1, 'PAYPHONE');
                this.scene.manager.objectManager.newObjectToWorld(_x + 7, _y + 1, 'PAYPHONE');
            }
        }
        if (this.prop.structure.type == 'CORNER-STORE-RIGHT') {
            this.setFrontDoor(_x + building_width - 2, _y);
            this.addStoreWindows(_x, _y, building_width - 2);
        }

        if (this.prop.structure.type == 'TAKEOUT-WINDOW') {
            // Need to make takeout window
        }


        /*this.scene.manager.objectManager.newObjectToWorld(_x + 2, _y, 'EXT_WINDOW_STORE_4_CLAD');
        this.gates.push(this.scene.manager.objectManager.newObjectToWorld(_x + 2, _y, 'ROLLING_GATE_WIDE'));
        this.gates[1].sprite.setDepth(this.gates[1].sprite.depth + 1);

        this.scene.manager.objectManager.newObjectToWorld(_x + 6, _y, 'EXT_WINDOW_STORE_4_CLAD');
        this.gates.push(this.scene.manager.objectManager.newObjectToWorld(_x + 6, _y, 'ROLLING_GATE_WIDE'));
        this.gates[2].sprite.setDepth(this.gates[2].sprite.depth + 1);
*/
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

    buildFacadeSection(_x, _y, width, height, material) {
        /// Lower left is _x, _y
        this.utilities.buildFacadeSection(_x, _y, width, height, material, this.scene[this.scene.locale].wallLayer);
    }

    roll(array) {
        return array[Phaser.Math.RND.between(0, array.length - 1)];
    }

    setFrontDoor(_x, _y) {
        this.gates.push(this.scene.manager.objectManager.newObjectToWorld(_x, _y, 'ROLLING_GATE_DOOR'));
        this.gates[0].sprite.setDepth(this.gates[0].sprite.depth + 1);
        this.front_door = this.scene.manager.objectManager.newObjectToWorld(_x, _y, this.settings.door);
        this.front_door.setPortal({room_id: '1', x:3, y: 15, facing: 'N'});
    }

    addStoreWindows(_x, _y, width, index=0) {
        let window_width = 4;
        if (width < window_width) {
            return;
        }
        
        this.scene.manager.objectManager.newObjectToWorld(_x + (index*window_width), _y, 'EXT_WINDOW_STORE_4_CLAD');
        this.gates.push(this.scene.manager.objectManager.newObjectToWorld(_x + (index*window_width), _y, 'ROLLING_GATE_WIDE'));
        this.gates[index].sprite.setDepth(this.gates[index].sprite.depth + 1);

        if (width - window_width >= window_width) {
            this.addStoreWindows(_x + (index*window_width), _y, width - window_width, index + 1);
        }
    }
}