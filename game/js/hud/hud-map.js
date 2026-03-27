import HudSide from './hud-side.js';
import MapManager from '../map/map-manager.js';
/*
 * Controls the map display on the HUD
 */

export default class HudMap extends HudSide {

    constructor(scene) {
        super(scene);
    }

        setVariables() {
        if (this.scene.slot.MAPS.length == 0) {
            return;
        }
        this.keytip = 'MAP';
        this.colors = {
            selected: 'ITEM_FOCUSED',
            normal: 'BAG_UNFOCUSED',
            frame:'BLOCK_SHALLOW_YELLOW_FRAME'
        };

        this.icon = 'KEY_RING_1';

        this.position = {
            unfocused: {
                slot: {
                    x: (this.view.left + this.view.margin.left),
                    y: this.view.bottom - (this.view.margin.bottom + 72 + 40 + 40)
                },
                icon: {
                    x: (this.view.left + this.view.margin.left) + 8,
                    y: this.view.bottom - (this.view.margin.bottom + 72 + 40 + 40) + 8
                },

                board: {
                    x: this.view.right - (this.view.margin.right*10),
                    y: this.view.top + (this.view.margin.top*3.5),
                    width: 144,
                    height: this.view.height - (this.view.margin.top*3.5 + this.view.margin.bottom + 40)
                },
                map: {
                    x: this.view.left + (this.view.margin.left*7.5),
                    y: this.view.top + (this.view.margin.top*3.5),
                    width: 344,
                    height: this.view.height - (this.view.margin.top*3.5 + this.view.margin.bottom + 40)
                },
                back_button: {
                    x: this.view.left + (this.view.margin.left*7),
                    y: this.view.top + 56
                }
            },
            focused: {

            }
        };

        this.board = null;
        this.frame = null;
        this.map_title = null;
        this.manager = new MapManager(this.scene);
        this.manager.map.initialize();

        this.side = {icon: null}
        this.side.icon = this.scene.manager.fx.handleHudFX('MAP_ICON', this.position.unfocused.icon.x, this.position.unfocused.icon.y);
    }



    openManager() {
        this.side.icon.destroy();
        this.side.icon = this.scene.manager.fx.handleHudFX('MAP_ICON', this.position.unfocused.icon.x, this.position.unfocused.icon.y);
        //this.side.block.setFrame(this.colors.selected);
        this.drawMap();
        this.manager.listen();
    }



    closeManager() {
        this.eraseMap();
        this.manager.destroyListeners();
    }

    drawMap() {
        this.map_title = this.makeBitmapText(this.position.unfocused.map.x + 12, this.position.unfocused.map.y + 12, this.position.unfocused.map.width - 16,  16,'SkeleStreetSigns');
        let title = this.scene.slot.MAPS[0].NAME;
        if (title != null && title != undefined && title != '') {
            this.map_title.setText(title);
        }
        this.map_title.setTintFill(0xa82b2d);
        this.map_area = this.makeBlock(this.position.unfocused.map.x, this.position.unfocused.map.y, this.position.unfocused.map.width, this.position.unfocused.map.height,'BLOCK_MID_CREAM');
        this.map_area_frame = this.makeBlock(this.position.unfocused.map.x, this.position.unfocused.map.y, this.position.unfocused.map.width, this.position.unfocused.map.height,'BLOCK_SHALLOW_SHAMROCK_FRAME');
        this.map_area_frame.setDepth(3000010);
        
        var self = this;
        var MAP_CONFIG = this.manager.map.config;
        var map_components = [];
        var block_width = MAP_CONFIG.blockWidth/4;
        var block_height = MAP_CONFIG.blockHeight/4;
        var margin_top = 48;
        MAP_CONFIG.nodes.forEach(function (node, index) {

            if (node.streets.e.connect > -1) {
                var _x_1 = node.x*block_width + self.position.unfocused.map.x + 16;
                var _y_1 = node.y*block_height + self.position.unfocused.map.y + margin_top;
                var _x_2 = node.streets.e.connect*block_width + self.position.unfocused.map.x + 16;
                var street_width = _x_2 - _x_1;
                if (node.streets.e.dir.length == 1) {
                    var street_height = 1;
                }
                else {
                    var street_height = 3;
                }
                var street = self.scene.add.rectangle(_x_1, _y_1,street_width,street_height,0x838897, 1);
                street.setOrigin(0,.5).setScrollFactor(0).setDepth(3000000);
                map_components.push(street);
            }

            if (node.streets.s.connect > -1) {
                var _x_1 = node.x*block_width + self.position.unfocused.map.x + 16;
                var _y_1 = node.y*block_height + self.position.unfocused.map.y + margin_top;
                var _y_2 = node.streets.s.connect*block_height + self.position.unfocused.map.y + margin_top;
                var street_height = _y_2 - _y_1;
                if (node.streets.s.dir.length == 1) {
                    var street_width = 1;
                }
                else {
                    var street_width = 3;
                }
                
                var street = self.scene.add.rectangle(_x_1, _y_1,street_width,street_height,0x838897, 1);
                street.setOrigin(.5,0).setScrollFactor(0).setDepth(3000000);
                map_components.push(street);
            }

            //var marker = self.scene.add.circle(node.x*block_width + self.position.unfocused.map.x + 16, node.y*block_height + self.position.unfocused.map.y + margin_top, 2, 0x416095, 1);
            //marker.setScrollFactor(0);
            //marker.setDepth(3000001);
            //map_components.push(marker);
        });
        this.back_button = this.makeBackButton(this.position.unfocused.back_button.x, this.position.unfocused.back_button.y);


        

        this.map_components = map_components;
        this.makePlayerMarker();
        this.mask();
    }

    makePlayerMarker() {
        if (this.scene.slot.POSITION.ROOM > 0) {
            return false;
        }
        var self = this;
        var margin_top = 48;

        var player_marker = self.scene.add.circle(self.scene.player.action.actionTile.x/4 + self.position.unfocused.map.x + 16, self.scene.player.action.actionTile.y/4 + self.position.unfocused.map.y + margin_top, 3, 0xe63f38, 1);
        player_marker.setScrollFactor(0).setDepth(3000002);
        this.map_components.push(player_marker);
    }

    eraseMap() {
        this.map_title.destroy();
        this.map_components.forEach(function (component) {
            component.destroy();
        });
        this.map_area.destroy();
        this.map_area_frame.destroy();
        this.back_button = this.destroyButton(this.back_button);
        this.map_components = [];
        this.map_title = null;
    }

    move (dir='DOWN', increment=4) {
        this.map_components.forEach(function (component) {
            switch (dir) {
                case 'UP':
                    component.y += increment;
                    break;
                case 'DOWN':
                    component.y -= increment;
                    break;
                case 'LEFT':
                    component.x -= increment;
                    break;
                case 'RIGHT':
                    component.x += increment;
                    break;
            }
        });
        this.mask();
    }

    mask () {
        var self = this;
        this.map_components.forEach(function (component) {
            if (component.x < self.position.unfocused.map.x || component.x > self.position.unfocused.map.x + self.position.unfocused.map.width ||
                component.y < self.position.unfocused.map.y || component.y > self.position.unfocused.map.y + self.position.unfocused.map.height) {
                    component.setVisible(false);
            }
            else {
                component.setVisible(true);
            }
        });
    }

}