import GameUtilities from "../game/game-utilities.js";
import TILES from "../config/atlas/tile-weights.js";
import WALLTILES from "../config/atlas/wall-tile-weights.js";
import ROOFTILES from "../config/atlas/roof-tile-weights.js";
import OBJECT_TYPES from "../config/atlas/object-types.js";
/* Exterior House Class */

export default class House {
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

            settings.door = this.roll(OBJECT_TYPES.EXT_DOOR_);
        }
        if (!settings.hasOwnProperty('windows')) {
            settings.windows = this.roll(OBJECT_TYPES.WINDOW_EXT_);
        }
        if (!settings.hasOwnProperty('levels')) {
            settings.levels = [];
            settings.levels.push({ height: this.roll([4, 4, 4, 5]) });
            settings.levels.push({ height: this.roll([4, 4, 4, 5]) });
        }

        this.settings = settings;
    }

    buildHouse() {
        var top = this.prop.lines.top;
        var left = this.prop.lines.left;
        var bottom = this.prop.lines.bottom;
        var right = this.prop.lines.right;
        var width = this.prop.lines.width;
        var height = this.prop.lines.height;
        var facing = this.prop.address.facing;

        var building_width = width;
        var colors = ['YELLOW_COMMERCIAL','RED_COMMERCIAL', 'YELLOW_COMMERCIAL', 'BLUE_COMMERCIAL']; // Weighting the array by repeating more desired colors
        var wallKind = WALLTILES.BRICK[this.roll(colors) + "_"];

        var _x = left;
        var _y = bottom - 1;
        var level_position = _y;


        for (var i = 0; i < this.settings.levels.length; i++) {
            this.buildFacadeSection(_x, level_position, building_width, this.settings.levels[i].height, wallKind);
            level_position = level_position - this.settings.levels[i].height;
            if (i > 0) {
                this.addWindows(_x+1,level_position +  this.settings.levels[i].height, building_width - 2);
            }
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
        this.front_door = this.scene.manager.objectManager.newObjectToWorld(_x, _y, this.settings.door);
        this.front_door.sprite.setDepth(this.front_door.sprite.depth - 4);

        if (this.prop.portal != undefined) {
            let room_id = this.prop.portal.room_id;
            let x = this.prop.portal.x;
            let y = this.prop.portal.y;
            
            this.front_door.setPortal({room_id: room_id, x: x, y: y, facing: 'N', return: {ROOM: -1, X: _x + 1, Y: _y + 1, FACING: 'S', SLUG: this.settings.door}});
        }
    }

    addWindows(_x, _y, width, index=0) {
        let window_width = 3;
        if (width < window_width) {
            return;
        }
        
        this.scene.manager.objectManager.newObjectToWorld(_x + (index*window_width), _y, this.settings.upper_windows);

        var remaining_width = parseInt(width - window_width);
        if (remaining_width >= window_width) {
            index++;
           this.addWindows(_x, _y, remaining_width, index);
        }
    }

}