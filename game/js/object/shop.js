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
        if (!settings.hasOwnProperty('windows')) {
            settings.windows = this.roll(OBJECT_TYPES.STORE_WINDOW_EXT);
        }
        if (!settings.hasOwnProperty('upper_windows')) {
            settings.upper_windows = this.roll(OBJECT_TYPES.WINDOW_EXT_);
            
        }

        if (!settings.hasOwnProperty('frame')) {
            settings.frame = this.roll(OBJECT_TYPES.STOREFRONT_FRAME);
        }
        if (!settings.hasOwnProperty('levels')) {
            settings.levels = [];
            settings.levels.push({ height: this.roll([4, 4, 4, 5]) });
            settings.levels.push({ height: this.roll([4, 4, 4, 5]) });
        }
        if (!settings.hasOwnProperty('roof')) {
            settings.roof = {
                height: 12
            };
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

        if (this.prop.structure.type == 'PARKING-LOT') {

            this.drawAsphaltBox(left, top, width, height);

            this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.ASPHALT.FILL_, left + 2, top-6, 5, 7);

            this.drawParkingLot(left + 7, top+1, width - 4, 'SOUTH');
            
            return;
        }

        var building_width = width;
        var colors = ['YELLOW_COMMERCIAL','RED_COMMERCIAL', 'YELLOW_COMMERCIAL', 'BLUE_COMMERCIAL']; // Weighting the array by repeating more desired colors
        var wallKind = WALLTILES.BRICK[this.roll(colors) + "_"];

        var _x = left;
        var _y = bottom - 1;
        var level_position = _y;

        

        if (this.prop.structure.type == 'CORNER-STORE-LEFT') {
            building_width = building_width - 1;
            _x = _x + 1;
            this.settings.windows = 'EXT_WINDOW_STORE_4_CLAD';
        }
        if (this.prop.structure.type == 'CORNER-STORE-RIGHT') {
            building_width = building_width - 1;
        }

        if (this.prop.structure.type == 'STOREFRONT' || this.prop.structure.type == 'TAKEOUT-WINDOW') {
            
            this.settings.levels[0].height = 5;
            this.setFrontDoor(_x, _y);
            this.addStoreWindows(_x+2, _y, building_width - 2);
            if (building_width == 6) {
                this.scene.manager.objectManager.newObjectToWorld(_x, _y, this.settings.frame);
            }

            if (this.prop.listing.slug == 'PAWN SHOP') {
                this.sign = this.scene.manager.objectManager.newObjectToWorld(_x, _y - 3, 'PAWN_STOREFRONT_SIGN');
                this.sign.sprite.setDepth(this.sign.sprite.depth + 130);
            }

            if (this.prop.listing.slug == 'PSYCHIC') {
                this.sign = this.scene.manager.objectManager.newObjectToWorld(_x+1, _y - 3, 'PSYCHIC_STOREFRONT_SIGN');
                this.sign.sprite.setDepth(this.sign.sprite.depth + 130);
                let chair = this.scene.manager.objectManager.newObjectToWorld(_x+4, _y +1, 'DINER_CHAIR_RED');
                chair.setState('FACING_SOUTH');

                this.scene.manager.objectManager.newObjectToWorld(_x + 1, _y + 3, 'BOLLARD_PARKING');
                this.scene.manager.objectManager.newObjectToWorld(_x + 3, _y + 3, 'BOLLARD_PARKING');
                this.scene.manager.objectManager.newObjectToWorld(_x + 5, _y + 3, 'BOLLARD_PARKING');
            }

            if (this.prop.listing.slug == 'LAUNDROMAT') {
                let sign_background = this.scene.manager.objectManager.newObjectToWorld(_x, _y - 4, 'SIGN_BACK_'+this.roll(['BLUE','GREEN','RED'])+'_10');
                sign_background.sprite.setDepth(sign_background.sprite.depth + 130);
                this.sign = this.scene.manager.objectManager.newObjectToWorld(_x, _y - 4, 'COIN_WASH_SIGN');
                this.sign.sprite.setDepth(this.sign.sprite.depth + 130);
            }
        }


        for (var i = 0; i < this.settings.levels.length; i++) {
            this.buildFacadeSection(_x, level_position, building_width, this.settings.levels[i].height, wallKind);
            level_position = level_position - this.settings.levels[i].height;
            if (i > 0) {
                this.addWindows(_x+1,level_position +  this.settings.levels[i].height, building_width - 1);
                if (this.settings.upper_windows.includes('SINGLE')) {
                    this.addWindows(_x+3,level_position +  this.settings.levels[i].height, building_width - 1);
                }
            }
        }



        this.scene[this.scene.locale].groundLayer.weightedRandomize(TILES.ROOF.BITMAP_BRICK_FLAT_, _x, (level_position - this.settings.roof.height) + 1, building_width, this.settings.roof.height);

        

        if (this.prop.structure.type == 'CORNER-STORE-LEFT') {
            this.setFrontDoor(_x, _y);
            this.addStoreWindows(_x + 2, _y, building_width - 2);
            if (this.prop.listing.slug == 'BONEDEGA') {
                this.sign = this.scene.manager.objectManager.newObjectToWorld(_x - 1, _y, 'LIT_SIGN_BONEDEGA');
                this.sign.sprite.setDepth(this.sign.sprite.depth + 32);

                let lotto_sign = this.scene.manager.objectManager.newObjectToWorld(_x + 2.25, _y, 'NEON_LOTTO_SIGN');
                lotto_sign.sprite.setDepth(this.gates[0].sprite.depth - 6);
                lotto_sign.setState('FLICKERING');

                this.scene.manager.objectManager.newObjectToWorld(_x - 4, _y + 1, 'TRASH_DRUM');
                this.scene.manager.objectManager.newObjectToWorld(_x - 3, _y -12, 'POOP');
                this.scene.manager.fx.playFX('STINK_REPEAT',(_x - 4)*16, (_y)*16);
                this.scene.manager.fx.playFX('FLY_8',(_x - 4)*16, (_y)*16);
                
                this.scene.manager.objectManager.newObjectToWorld(_x + 9, _y + 1, 'DAILY_NEWS_BOX_');
                this.scene.manager.objectManager.newObjectToWorld(_x + 10, _y + 1, 'PAYPHONE');
                this.scene.manager.objectManager.newObjectToWorld(_x + 11, _y + 1, 'PAYPHONE');

                this.scene.manager.objectManager.newObjectToWorld(_x + 11, _y + 3, 'BOLLARD_PARKING');
            }

            if (this.prop.listing.slug == 'BARBER') {
                this.sign = this.scene.manager.objectManager.newObjectToWorld(_x-1.5, _y, 'BARBER_POLE');
                this.sign.sprite.setDepth(this.sign.sprite.depth + 130);
            }
            
        }
        if (this.prop.structure.type == 'CORNER-STORE-RIGHT') {
            this.setFrontDoor(_x + building_width - 2, _y);
            this.addStoreWindows(_x, _y, building_width - 2);
        }

        if (this.prop.structure.type == 'TAKEOUT-WINDOW') {
            // Need to make takeout window
        }

        if (this.prop.listing.slug == 'LOCKSMITH') {
            this.sign = this.scene.manager.objectManager.newObjectToWorld(_x, _y - 3, 'LOCKSMITH_STOREFRONT_SIGN');
            this.sign.sprite.setDepth(this.sign.sprite.depth + 130);

            let key_sign = this.scene.manager.objectManager.newObjectToWorld(_x + 3.5, _y - 1.75, 'NEON_KEY');
            key_sign.sprite.setDepth(this.gates[0].sprite.depth - 18);
            key_sign.setState('ON');
        }



        this.buildHours();
        this.setRollingGatesFromHours();
    }

    setRollingGatesFromHours() {
        var self = this;
        var callback = function(now, today) {
            if (self.prop.listing.schedule == undefined) {
                return;
            }
            let schedule = self.prop.listing.schedule[today.weekday.toLowerCase()];
            if (schedule.closed == 'TRUE') {
                this.setRollingGates('CLOSED');
                this.setSign('OFF');
            }
            else {
                let open = parseInt(schedule.open);
                let close = parseInt(schedule.close);
                if (now.hour > open && now.hour < close) {
                    this.setRollingGates('OPEN');
                    this.setSign('ON');
                }
                if (now.hour == open && now.minute < 5) {
                    this.setRollingGates('OPENING');
                    this.setSign('FLICKERING');
                }
                if (now.hour == open && now.minute >= 5) {
                    this.setRollingGates('OPEN');
                    this.setSign('ON');
                }
                if (now.hour > close || now.hour < open) {
                    this.setRollingGates('CLOSED');
                    this.setSign('OFF');
                }
                if (now.hour == close && now.minute >= 5) {
                    this.setRollingGates('CLOSED');
                    this.setSign('OFF');
                }
                if (now.hour == close && now.minute < 5) {
                    this.setRollingGates('CLOSING');
                    this.setSign('FLICKERING');
                }
            }
        }

        this.scene.events.addListener('HOUR_CHANGE', callback, this)
    }


    setRollingGate(gate_index, state_name)  {
        var gate = this.gates[gate_index].state;
        if (gate.name == 'OPEN' && state_name == 'OPENING') {
            return;
        }
        if (gate.name == 'CLOSED' && state_name == 'CLOSING') {
            return;
        }
        this.gates[gate_index].setState(state_name);
    }

    setRollingGates(state_name) {
        var shop_closing_delay = this.roll([500, 1000, 1500, 2000]);
        for (var i = 0; i < this.gates.length; i++) {
            var delay = shop_closing_delay + (500 * i);
            if (state_name == 'OPEN' || state_name == 'CLOSED') {
                delay = 0;
            }
            this.scene.time.addEvent({
                delay: delay, // ms
                callback: this.setRollingGate,
                args: [i, state_name],
                callbackScope: this
            });
        }
    }

    setSign(state_name) {
        if (this.sign != undefined) {
            this.sign.setState(state_name, true);
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
        let door_gate = this.scene.manager.objectManager.newObjectToWorld(_x, _y, 'ROLLING_GATE_DOOR');
        this.gates.push(door_gate);
        door_gate.sprite.setDepth(this.front_door.sprite.depth + 1);
    }

    addStoreWindows(_x, _y, width, index=0, gate=true) {
        let window_width = 4;
        if (width < window_width) {
            return;
        }
        
        this.scene.manager.objectManager.newObjectToWorld(_x + (index*window_width), _y, this.settings.windows);

        if (gate) {
            this.gates.push(this.scene.manager.objectManager.newObjectToWorld(_x + (index*window_width), _y, 'ROLLING_GATE_WIDE'));
            this.gates[index].sprite.setDepth(this.gates[index].sprite.depth + 1);
        }
        

        if (width - window_width >= window_width) {
            //this.addStoreWindows(_x + (index*window_width), _y, width - window_width, index + 1);
        }
    }

    addWindows(_x, _y, width, index=0) {
        let window_width = 3;
        console.log('Add window '+index+' at '+_x+','+_y+' with width '+width);
        if (width < window_width) {
            return;
        }
        
        this.scene.manager.objectManager.newObjectToWorld(_x + (index*window_width), _y, this.settings.upper_windows);
        if (this.settings.upper_windows.includes('SINGLE') && this.roll([0,1]) == 1) {
            let window_unit = this.scene.manager.objectManager.newObjectToWorld(_x + (index*(window_width/2)), _y - .5, 'AC_WINDOW_UNIT');
            window_unit.sprite.setDepth(window_unit.sprite.depth + 16);
            window_unit.sprite.setOrigin(.5,1);
            window_unit.setState('ON');
        }
        
        if (width - window_width >= window_width) {
           //this.addWindows(_x + ((index+1)*window_width), _y, width - window_width, index + 1);
        }
    }


    buildHours() {
        if (this.front_door != undefined) {
            this.front_door.setAnnouncement(this.prop.listing,'SHOP_HOURS');
        }
    }

    drawParkingLot(_x, _y, width, facing) {
        
        let spaces = width / 4;

        for (var i = 0; i < spaces; i++) {
            this.drawParkingSpace(_x + (i*4), _y, facing);
        }
    }

    drawParkingSpace(_x, _y, facing) {
        var groundLayer = this.scene[this.scene.locale].groundLayer;
        groundLayer.weightedRandomize(TILES.STREET.EAST_NORTHSOUTH_SOLIDWHITE_,_x, _y, 1, 5);
        this.scene.manager.objectManager.newObjectToWorld(_x + 2, _y -2, 'BOLLARD_PARKING');
    }

    drawAsphaltBox(_x, _y, width, height) {
            var groundLayer = this.scene[this.scene.locale].groundLayer;
            groundLayer.weightedRandomize(TILES.ASPHALT.FILL_,_x, _y, width, height);
            groundLayer.weightedRandomize(TILES.CURB.NORTH_, _x, _y, width, 1);
            groundLayer.weightedRandomize(TILES.CURB.SOUTH_, _x,_y + height, width, 1);
            groundLayer.weightedRandomize(TILES.CURB.EAST_, _x + width, _y,1, height);
            groundLayer.weightedRandomize(TILES.CURB.WEST_, _x, _y,1, height);
            
            groundLayer.weightedRandomize(TILES.CURB.INSET_NORTHWEST_, _x, _y,1, 1);
            groundLayer.weightedRandomize(TILES.CURB.NORTHEAST_INSET_, _x + width, _y,1, 1);
    
            groundLayer.weightedRandomize(TILES.CURB.SOUTHWEST_INSET_, _x, _y + height,1, 1);
            groundLayer.weightedRandomize(TILES.CURB.SOUTHEAST_INSET_, _x + width,  _y + height,1,1);
        }
        
}