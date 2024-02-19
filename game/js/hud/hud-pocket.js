import POCKET_CONFIG from "../config/pocket-states.js";
/**
 * 	Manage inventory UI
 *	
 */
 export default class HudPocket {
    
    constructor(scene) {
        this.scene = scene;
        this.pockets = POCKET_CONFIG.POCKETS;
        this.states = POCKET_CONFIG.STATES;
        this.types = POCKET_CONFIG.TYPES;
        this.allowed = POCKET_CONFIG.ALLOWED;
    }

    setPocket (pocketIndex, pocket_state, value=null) {
        if (this.getPocketAllowed(pocketIndex, pocket_state)) {
            if (pocket_state == 'EMPTY') {
                this.pockets[pocketIndex].WEARS = null;
                this.pockets[pocketIndex].EQUIPT = null;
                this.pockets[pocketIndex].HOLDS = null;
            }
            else {
                this.pockets[pocketIndex][pocket_state] = value;
            }
            this.pockets[pocketIndex].STATE = pocket_state;
        }
    }

    availablePocket (item) {
        var result = false;
        for (var i=0;i<3;i++) {
            if (this.getPocketState(i) == 'EMPTY') {
                if (this.getPocketAllowed(i, item.info.use)) {
                    this.setPocket(i, item.info.use, item);
                    i = 4; // Break loop
                    this.scene.manager.hud.refreshDisplay();
                    result = true;
                }
            }
        }
        return result;
    }

    availableBag (item,exclude=null) {
        var result = false;
        for (var i=0;i<3;i++) {
            if (i != exclude) {
                var state = this.getPocketState(i);
                if (state != 'EMPTY') {
                    var pocket = this.getPocket(i);
                    
                    if (pocket[state].info.type == 'BAG') {
                        var bag = pocket[state];
                        if (bag.addItem(item)) {
                            i = 4; // Break loop
                            result = true;
                        }
                    }
                }
            }
            
        }
        return result;
    }
    

    getPocket (pocketIndex) {
        return this.pockets[pocketIndex];
    }

    getPocketType (pocketIndex) {
        return this.pockets[pocketIndex].TYPE;
    }

    getPocketState (pocketIndex) {
        return this.pockets[pocketIndex].STATE;
    }

    getPocketAllows (pocketIndex) {
        let pocketType =  this.getPocketType(pocketIndex);
        return this.allowed[pocketType];
    }
    

    getPocketAllowed (pocketIndex, pocket_state) {
        const pocketAllowed = this.getPocketAllows(pocketIndex);
        for (var i=0;i<pocketAllowed.length;i++) {  
            if (pocketAllowed[i] == pocket_state) { return true;}
        }
        return false;
    }


    doAction (pocketIndex, action_string) {

        var _x = this.scene.player.action.actionTile.x;
        var _y = this.scene.player.action.actionTile.y;

        var action_result = false;
        var pocket = this.getPocket(pocketIndex);
        if (action_string == 'DROP' && pocket.STATE != 'EMPTY') {
            var item = pocket[pocket.STATE];

            var placed = this.scene.manager.itemManager.putItemInWorld(item,_x,_y);
            if (placed) {
                this.setPocket(pocketIndex,'EMPTY');
            }

        }
        else if (action_string == 'PUT AWAY' && pocket.STATE != 'EMPTY') {
            var item = pocket[pocket.STATE];
            /// Check for bags
            /// Check bags for space
            /// If there's space, move the item into the bag
            var inBag = this.availableBag(item,pocketIndex);
            if (inBag) {    
                /// Remove from this pocket
                /// Tween; when tween done empty pocket
                this.setPocket(pocketIndex, 'EMPTY');
                var sound_var = Phaser.Math.RND.between(1,3);
                this.scene.manager.hud.hudSound.play('ITEM_PUT_AWAY_'+sound_var);
                action_result = true;
                this.scene.manager.hud.hudDisplay.addFX(pocketIndex,0);
            }
        }
        else if (pocket.STATE != 'EMPTY') {
            var item = pocket[pocket.STATE];
            var self = this;
            if (action_string == 'EAT' && this.scene.player.state.name != 'EAT') {
                self.scene.player.setState('EAT');
                setTimeout(() => {
                    self.scene.player.setState('IDLE');
                }, 2000);
            }
            item.info.actions.forEach(function (item_action) {
                if (action_string == item_action.name) {
                    if (item_action.consume) {
                        self.setPocket(pocketIndex, 'EMPTY');
                    }
                    if (item_action.transition != false) {
                        self.setPocket(pocketIndex, 'EMPTY');
                        self.scene.manager.itemManager.newItemToPockets(item_action.transition);
                    }
                }
            });
        }
        return action_result;
    }

}