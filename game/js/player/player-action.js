import SPRITE_DIR from "../config/sprite-dir.js";
/**
 *	Updates available actions
 */
 export default class PlayerAction {

    constructor(scene) {
        this.scene = scene;
        this.debug = false;
        this.initialize();

    }

    initialize() {
        if (this.debug) {this.debugActionTile = this.scene.add.rectangle(0, 0, 16, 16, 0x6666ff).setOrigin(0);}
        this.locale = (this.scene.exterior != null) ? this.scene.exterior : this.scene.interior;
        this.actionTile = {x: 0, y: 0};
        this.actionTileLast = {x: 0, y: 0};
        this.actionTileLookUp = SPRITE_DIR.DIR_TILE;
        this.actionsGroup = this.scene.add.group();
        this.clearActions();
    }

    clearActions() {
        this.availableActions = [];
        this.actionsMap = new Map;
        this.menu = {x: 0, y: 0};
    }

    showActions (showing) {
        this.showMenu = showing;
    }

    addMarker () {
       let marker = this.scene.manager.fx.handleFX('SELECTOR_VALID_',0,0);
       marker.setOrigin(0);
       marker.setVisible(false);
       return marker;
    }

    checkMarker () {
        if (this.actionMarker == undefined) {
            this.actionMarker = this.addMarker();
        }
    }

    showMarker (showing) {
        this.checkMarker();
        this.actionMarker.setVisible(showing);
    }

    updateMarker() {
        this.checkMarker();
        this.snappedWorldPoint = this.locale.groundLayer.tileToWorldXY(this.actionTile.x, this.actionTile.y);

        this.actionMarker.setPosition(this.snappedWorldPoint.x - 8, this.snappedWorldPoint.y - 8);
        
        if (this.actionTileLast.x != this.actionTile.x || this.actionTileLast.y != this.actionTile.y) {

            if (this.debug) {
                this.debugActionTile.setPosition(this.snappedWorldPoint.x, this.snappedWorldPoint.y);
            }

            if (this.scene.manager.objectManager != undefined) {
                this.scene.manager.objectManager.announce.loadAnnouncements(this.actionTile.x, this.actionTile.y);
            }
            this.actionTileLast = this.actionTile;
            this.refreshActions();
        }

    }

    refreshActions() {
        this.clearActions();
        this.addItemActions();
        this.addObjectActions();
    }

    updateActionAvailability() {
        var focus = this.scene.player.getFocus();
        if (focus.name == 'PLAYER' && this.scene.player.state.name == 'IDLE') {
            this.showMarker(true);
            this.showActions(true);
        }
        else {
            this.showMarker(false);
            this.showActions(false);
        }
    }

    addItemActions () {
        if (this.scene.manager.itemManager != undefined) {
            var item = this.scene.manager.itemManager.registry.getItem(this.actionTile.x,this.actionTile.y);
            if (item != null) {
                item.addActions();
            }
        } 
    }

    addObjectActions () {
        if (this.scene.manager.objectManager != undefined) {
            var objects = this.scene.manager.objectManager.registry.getObjects(this.actionTile.x,this.actionTile.y);
            if (objects != null && objects.length > 0) {
                objects.forEach(object => {
                    object.addActions();
                });
            }
        }
    }

    updateActionTile(facing) {
        var mods = this.actionTileLookUp[facing];
        this.actionTile = {
            x: parseInt(this.scene.player.standingTile.x + mods['x']),
            y: parseInt(this.scene.player.standingTile.y + mods['y'])
        };
        this.menu = {
            x: parseInt(this.actionTile.x + mods['mx'])*16,
            y: parseInt(this.actionTile.y + mods['my'])*16
        };
        if (this.scene.player.underAction != null) {
            this.getGroundActions(this.scene.player.underAction);
        }
        

        this.updateMarker();
    }

    getGroundActions (ground) {
        if (ground != null && this.scene.manager.time != undefined && this.scene.manager.time.time_passing) {
            for (var i=0;i<ground.ACTIONS.length;i++) {
                var req_met = false;
                if (ground.ACTIONS[i].ITEM != '') {

                    var found = this.scene.manager.hud.pocket.findInPockets(ground.ACTIONS[i].ITEM);
                    
                    if (found != false) {req_met = true;}
                }
                else { // No items required
                    req_met = true;
                }

                if (req_met) {
                    this.addAction({action: ground.ACTIONS[i].ACTION.toUpperCase(), object: '', ground: ground.ACTIONS[i].GROUND, fx: ground.ACTIONS[i].FX});
                }
            }
        }
    }

    update () {
        var facing = this.scene.player.getFacing();
        this.updateActionAvailability();
        if (facing != null) {
            this.updateActionTile(facing);
        }
        this.actionMenu();

        if (this.scene.player.playerInput.select && this.availableActions.length > 0 ) {
            let obj = this.availableActions[0].object;
            if (obj != '' && obj != undefined) {
                obj.doAction(this.availableActions[0].action);
            }
            else {
                this.doAction();
            }
            /*
            if (obj != '') {
              return 'PULL';
            }
            else {
              //this.sprite.anims.currentAnim.getFrameByProgress(0);
              return this.availableActions[0].action;
            }
            */
          }

        if (this.scene.player.playerInput.more && this.availableActions.length > 1 ) {
            var firstItem = this.availableActions.shift(); // Remove the first item
            this.availableActions.push(firstItem); // Add the first item to the end
        }
    }

    doAction () {
        let action = this.availableActions[0];
        if (this.scene.player.state.name == 'IDLE') {
            this.scene.player.setState(action.action.toUpperCase());
            //this.scene.player.setState("DIG");
            if (action.fx != undefined && action.fx != '') {
                this.scene.manager.fx.playFX(action.fx,this.scene.player.snappedStanding.x+8,this.scene.player.snappedStanding.y+8,500);
            }
            if (action.ground != undefined && action.ground != '') {
                this.scene.time.addEvent({
                    delay: 500,
                    loop: false,
                    callback: () => {
                        // Fade out
                        this.locale.ground.placeTileType(this.actionTile.x, this.actionTile.y, action.ground, true);
                        /// Add loot manager call here
                        this.scene.manager.loot.digUp(this.actionTile.x, this.actionTile.y);
                    }
                })
                this.scene.time.addEvent({
                    delay: 1000,
                    loop: false,
                    callback: () => {
                        // Fade out
                        this.scene.player.setState('IDLE');
                    }
                })
            }
        }
    }
    
    addAction(newAction) {
        //action, object
        const map = this.actionsMap;
        if(!map.has(newAction.action)){
            map.set(newAction.action, true);    // set any value to Map
            this.availableActions.push({
                action: newAction.action,
                object: newAction.object,
                ground: newAction.ground,
                fx: newAction.fx
            });
        }
        this.actionsMap = map;
    }

    actionMenu () {
        if (!this.showMenu) {
            this.actionsGroup.clear(false, true);
            this.displayActions = null;
        }
        else {  
            var displayActions = [];

            this.availableActions.forEach(function (action, index) {
                displayActions.push({
                    action: action.action,
                    object: action.object,
                    ground: action.ground,
                    fx: action.fx
                });
            });

            this.displayActions = displayActions;
            this.drawActions();
            
        }
    }
    

    drawActions () {

        this.actionsGroup.clear(false, true);

        var x = this.menu.x;
        var y = this.menu.y;

        const actionsGroup = this.actionsGroup;

        const scene = this.scene;
        this.displayActions.forEach(function (action, index) {
            var slip_class = 'select-slip-not-selected';
            if (index == 0) {
                var slip_class = 'select-slip';
            }
            if (index == 1) {
                var slip_class = 'more-slip';
            }
            const newAction = scene.add.dom(x, y + (index * 16), 'div', '', action.action).setClassName(slip_class).setOrigin(0);
            //const newAction = scene.add.text(x, y + (index * 24), action.action, style).setDepth(101100);
            actionsGroup.add(newAction);
        });
        this.actionsGroup = actionsGroup;
    }
    
    
}