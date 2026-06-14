import TILES from "../config/atlas/tile-weights.js";
/* ExteriorBlockNode Class */

export default class ExteriorBlockNode {

    constructor(scene, node) {
        this.scene = scene;
        this.node = node;
        this.traffic_lights = {};
        this.lastTrafficPhaseId = null;
        this.trafficSignalListener = null;
        this.node['name'] = this.getIntersectionName();
        this.drawBox();
        this.stop_sign = {'n':false,'e':false,'s':false,'w':false};
        this.stop_light = {'n':false,'e':false,'s':false,'w':false};
    }

    setStopLight (dir, state) {
        this.stop_light[dir] = state;
    }

    setStopSign (dir, state) {      
        this.stop_sign[dir] = state;
    }

    drawBox () {
        var node = this.node;

        var groundLayer = this.scene[this.scene.locale].groundLayer;
        groundLayer.weightedRandomize(TILES.ASPHALT.FILL_, node.left, node.top, node.width, node.height);
        groundLayer.weightedRandomize(TILES.CURB.NORTH_, node.left, node.top, node.width, 1);
        groundLayer.weightedRandomize(TILES.CURB.SOUTH_, node.left, node.bottom, node.width, 1);
        groundLayer.weightedRandomize(TILES.CURB.EAST_, node.right, node.top,1, node.height);
        groundLayer.weightedRandomize(TILES.CURB.WEST_, node.left, node.top,1, node.height);
        
        groundLayer.weightedRandomize(TILES.CURB.INSET_NORTHWEST_, node.left, node.top,1, 1);
        groundLayer.weightedRandomize(TILES.CURB.NORTHEAST_INSET_, node.right, node.top,1, 1);

        groundLayer.weightedRandomize(TILES.CURB.SOUTHWEST_INSET_, node.left, node.bottom,1, 1);
        groundLayer.weightedRandomize(TILES.CURB.SOUTHEAST_INSET_, node.right, node.bottom ,1, 1);

    }

    getStreetNames () {
        var ew_street = '';
        var ns_street = '';
        var ew_streets = [
            this.node.streets.e.name ?? '',
            this.node.streets.w.name ?? '',
        ];
        var ns_streets = [
            this.node.streets.n.name ?? '',
            this.node.streets.s.name ?? '',
        ];
        /// Limit streets to unique values
        ew_streets = [...new Set(ew_streets)];
        ns_streets = [...new Set(ns_streets)];
        // Remove empty values
        ew_streets = ew_streets.filter(street => street !== '');
        ns_streets = ns_streets.filter(street => street !== '');
        if (ew_streets.length > 0) {
            ew_street = ew_streets[0];
        }
        if (ns_streets.length > 0) {
            ns_street = ns_streets[0];
        }
        return {ew: ew_street, ns: ns_street};
    }

    getIntersectionName () {
        var streets = [
            this.node.streets.e.name ?? '',
            this.node.streets.w.name ?? '',
            this.node.streets.n.name ?? '',
            this.node.streets.s.name ?? ''
        ];
        /// Limit streets to unique values
        streets = [...new Set(streets)];
        // Remove empty values
        streets = streets.filter(street => street !== '');

        return streets.join(' & ');
    }

    startTrafficLights () {
        this.bindTrafficSignalUpdates();
        this.syncTrafficSignals(true);
    }

    bindTrafficSignalUpdates () {
        var signalManager = this.scene?.exterior?.trafficSignals;
        if (signalManager == undefined || signalManager.subscribe == undefined) {
            return;
        }

        if (this.trafficSignalListener != null) {
            return;
        }

        this.trafficSignalListener = () => {
            this.syncTrafficSignals();
        };

        signalManager.subscribe(this.trafficSignalListener);
    }

    syncTrafficSignals (force=false) {
        var signalManager = this.scene?.exterior?.trafficSignals;
        if (signalManager == undefined || signalManager.getIntersectionPhase == undefined) {
            return;
        }

        var phase = signalManager.getIntersectionPhase(this.node.name);
        if (phase == undefined) {
            return;
        }

        if (!force && this.lastTrafficPhaseId == phase.id) {
            return;
        }

        this.lastTrafficPhaseId = phase.id;
        this.setTrafficLights('EW', phase.ew.vehicle, phase.ew.ped);
        this.setTrafficLights('NS', phase.ns.vehicle, phase.ns.ped);
    }

    setTrafficLights (dir='EW',state='GREEN',ped_state='SIGNAL_WALK_HAND') {
        var ns_corners = ['NE','SW'];
        var ew_corners = ['NW','SE'];
        var corners = dir == 'EW' ? ew_corners : ns_corners;
        corners.forEach(corner => {
            if (this.traffic_lights[corner] != undefined) {
                var traffic_light = this.traffic_lights[corner].traffic_light;
                var walk_signal = this.traffic_lights[corner].walk_signal;
                
                if (traffic_light != undefined) {
                    traffic_light.setState(state);
                }
                if (walk_signal != undefined) {
                    walk_signal.setState(ped_state);
                }
            }
        });

        /* Debug
        this.drawConeBox(
            this.node.left,
            this.node.top,
            this.node.width,
            this.node.height,
            true
        );
        */
    }

    buildObjects () {
        var node = this.node;
        var street_names = this.getStreetNames();

        /// South side of intersection
        var stop = node.streets.s.signal == 1 ? 'S' : null;
        if (node.streets.s.signal == 2) {
            this.buildTrafficLight(node.left + node.width, node.top + node.height,'NW',{EW:street_names.ew,NS:street_names.ns});
        }
        else if (node.streets.s.signal == 1) {
            this.buildStreetPole(node.left + node.width, node.top + node.height + 3,{EW:street_names.ew,NS:street_names.ns, STOP:stop, CORNER: 'NE'});
        }

        /// East side of intersection
        stop = node.streets.e.signal == 1 ? 'E' : null;
        if (node.streets.e.signal == 2) {
            this.buildTrafficLight(node.left + node.width, node.top - 1,'SW',{EW:street_names.ew,NS:street_names.ns});
        }
        else if (node.streets.e.signal == 1) {
            this.buildStreetPole(node.left + node.width + 3, node.top - 1,{EW:street_names.ew,NS:street_names.ns, STOP:stop, CORNER: 'SW'});
            this.setStopSign('E', true);
        }

        /// North side of intersection
        stop = node.streets.n.signal == 1 ? 'N' : null;
        if (node.streets.n.signal == 2) {
            this.buildTrafficLight(node.left - 1, node.top - 1,'SE',{EW:street_names.ew,NS:street_names.ns});
        }
        else if (node.streets.n.signal == 1) {
            this.buildStreetPole(node.left - 1, node.top - 3,{EW:street_names.ew,NS:street_names.ns, STOP:stop, CORNER: 'NW'});
            this.setStopSign('N', true);
        }

        /// West side of intersection
        stop = node.streets.w.signal == 1 ? 'W' : null;
        if (node.streets.w.signal == 2) {
            this.buildTrafficLight(node.left - 1, node.top + node.height,'NE',{EW:street_names.ew,NS:street_names.ns});
        }
        else if (node.streets.w.signal == 1) {
            this.buildStreetPole(node.left - 3, node.top + node.height,{EW:street_names.ew,NS:street_names.ns, STOP:stop, CORNER: 'SE'});
            this.setStopSign('W', true);
        }

        this.startTrafficLights();
    }

    buildStreetPole (_x,_y,signs={NS:null,EW:null,STOP:null,CORNER:'',TELEPHONE:false}, light=true) {

        var pole = this.scene.manager.objectManager.newObjectToWorld(_x, _y,'WOOD_POLE');

        if (light) {
            let sodium = this.scene.manager.objectManager.newObjectToWorld(_x, _y - 6,'SODIUM');
            sodium.sprite.setDepth(pole.sprite.depth+1);
            
        }


        if (signs.NS != null && signs.NS != '') {
            let street_sign_ns = this.scene.manager.objectManager.newObjectToWorld(_x - .5, _y - 4.25, 'STREET_SIGN_NS_');
            street_sign_ns.sprite.setDepth(pole.sprite.depth+1);
            pole.setAnnouncement(signs.NS, 'STREET_SIGN_NS_' + signs.CORNER);
        }

        if (signs.EW != null && signs.EW != '') {
            let street_sign_ew = this.scene.manager.objectManager.newObjectToWorld(_x - .5, _y - 3.75, 'STREET_SIGN_EW_');
            street_sign_ew.sprite.setDepth(pole.sprite.depth+1);
            pole.setAnnouncement(signs.EW, 'STREET_SIGN_EW_' + signs.CORNER);
        }
        
        if (signs.STOP != null) {
            let stop_sign = this.scene.manager.objectManager.newObjectToWorld(_x - .5, _y - 2, 'STOP_SIGN_'+signs.STOP);
            var behind = signs.STOP == 'N' || signs.STOP == 'E' ? true : false;
            if (behind) {
                stop_sign.sprite.setDepth(pole.sprite.depth-1);
            }
            else {
                stop_sign.sprite.setDepth(pole.sprite.depth+1);
            }
        }

        if (signs.TELEPHONE) {
            let telephone = this.scene.manager.objectManager.newObjectToWorld(_x, _y - 7, 'TELEPHONE_POLE_TOP');
            telephone.sprite.setDepth(pole.sprite.depth+1);
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
                let light_north = this.scene.manager.objectManager.newObjectToWorld(_x + 4, _y - 7,'TRAFFIC_LIGHT_NORTH');
                light_north.sprite.setDepth(pole.sprite.depth-2);

                let arm_south = this.scene.manager.objectManager.newObjectToWorld(_x, _y - 6,'TRAFFIC_LIGHT_ARM_SOUTH');
                arm_south.sprite.setDepth(pole.sprite.depth+1);
            break;
            case 'NW':
                corner = 'SE';
                facing = 'W';
                // SE intersection corner
            let light_east = this.scene.manager.objectManager.newObjectToWorld(_x - 1.75, _y - 10.5,'TRAFFIC_LIGHT_EAST');

            light_east.sprite.setDepth(pole.sprite.depth+3);
            light_east.sprite.setFlipX(true);
            
            if (light_east.sprite.body && light_east.info && light_east.info.offset && light_east.info.sprite) {
                const bodyOffsetX = light_east.info.offset.x + (light_east.info.sprite.w/2);
                const newBodyOffsetX = light_east.info.sprite.w - bodyOffsetX;
                light_east.sprite.body.setOffset(newBodyOffsetX, light_east.info.offset.y + (light_east.info.sprite.h/2));
            }
                
            //var arm = this.scene.manager.objectManager.objectInfo('TRAFFIC_LIGHT_ARM_EAST');
            let arm_east = this.scene.manager.objectManager.newObjectToWorld(_x - 1, _y - 5.5,'TRAFFIC_LIGHT_ARM_EAST');
            arm_east.sprite.setDepth(pole.sprite.depth+1);
            arm_east.sprite.setFlipX(true);
                
            break;
            case 'SE':
                corner = 'NW';
                facing = 'SE';
                //  NW intersection corner 

                var traffic_light = this.scene.manager.objectManager.newObjectToWorld(_x - .25, _y - 7.5,'TRAFFIC_LIGHT_EAST');
                traffic_light.sprite.setDepth(pole.sprite.depth+7.5);
                
            break;
            case 'SW':
                corner = 'NE';
                flip = true;
                facing = 'SE';

                // NE intersection corner

                //var arm = this.scene.manager.objectManager.objectInfo('TRAFFIC_LIGHT_ARM_SOUTH');
                let arm_south_2 = this.scene.manager.objectManager.newObjectToWorld(_x - 4, _y - 6,'TRAFFIC_LIGHT_ARM_SOUTH');
                arm_south_2.sprite.setDepth(pole.sprite.depth+1);
                arm_south_2.sprite.setFlipX(true);

                var traffic_light = this.scene.manager.objectManager.newObjectToWorld(_x - 4, _y - 7,'TRAFFIC_LIGHT_SOUTH');
                traffic_light.sprite.setDepth(pole.sprite.depth+7);
            break;
        }
        var walk_signal = this.scene.manager.objectManager.newObjectToWorld(_x, _y - 2,'WALK_SIGNAL_'+facing+'_');
        walk_signal.sprite.setDepth(pole.sprite.depth+3);
        walk_signal.sprite.setFlipX(flip);
        if (flip && walk_signal.sprite.body && walk_signal.info && walk_signal.info.offset && walk_signal.info.sprite) {
            const bodyOffsetX = walk_signal.info.offset.x + (walk_signal.info.sprite.w/2);
            const newBodyOffsetX = walk_signal.info.sprite.w - bodyOffsetX;
            walk_signal.sprite.body.setOffset(newBodyOffsetX, walk_signal.info.offset.y + (walk_signal.info.sprite.h/2));
        }

        var signal_axis = (corner == 'NW' || corner == 'SE') ? 'EW' : 'NS';
        if (traffic_light != undefined) {
            traffic_light.signalAxis = signal_axis;
            traffic_light.signalRole = 'VEHICLE';
        }
        if (walk_signal != undefined) {
            walk_signal.signalAxis = signal_axis;
            walk_signal.signalRole = 'PEDESTRIAN';
        }


        this.traffic_lights[corner] = {traffic_light: traffic_light, walk_signal: walk_signal};

        if (signs.NS != null && signs.NS != '') {
            let street_sign_ns = this.scene.manager.objectManager.newObjectToWorld(_x - .5, _y - 4.25, 'STREET_SIGN_NS_');
            street_sign_ns.sprite.setDepth(pole.sprite.depth+2);
            pole.setAnnouncement(signs.NS, 'STREET_SIGN_NS_'+corner);
        }
        
        if (signs.EW != null && signs.EW != '') {
            let street_sign_ew = this.scene.manager.objectManager.newObjectToWorld(_x - .5, _y - 3.75, 'STREET_SIGN_EW_');
            street_sign_ew.sprite.setDepth(pole.sprite.depth+1);
            pole.setAnnouncement(signs.EW, 'STREET_SIGN_EW_'+corner);
        }
    }

    drawConeBox (_x,_y,width,height,center=false) {
        this.scene.manager.objectManager.newObjectToWorld(_x,_y, 'CONE_UPRIGHT');
        this.scene.manager.objectManager.newObjectToWorld(_x + width, _y, 'CONE_UPRIGHT');
        this.scene.manager.objectManager.newObjectToWorld(_x,_y + height, 'CONE_UPRIGHT');
        this.scene.manager.objectManager.newObjectToWorld(_x + width, _y + height, 'CONE_UPRIGHT');
        
        if (center) 
            {
                this.scene.manager.objectManager.newObjectToWorld(_x + (width / 2), _y + (height / 2), 'TRAFFIC_BARRIER_SMALL');
            }
    }

}