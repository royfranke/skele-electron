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
        this.actionRadius = 1;
        this.actionFacing = 's';
        this.pendingAction = null;
        this.actionTile = {x: 0, y: 0};
        this.actionTileLast = {x: 0, y: 0};
        this.actionTileLookUp = SPRITE_DIR.DIR_TILE;
        this.actionsGroup = this.scene.add.group();
        this.clearActions();
        this.listen();
    }

    clearActions() {
        this.availableActions = [];
        this.actionsMap = new Map;
        this.menu = {x: 0, y: 0};
        this.scene.manager.hud.hudAction.clearActions();
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
        const originalActionTile = {x: this.actionTile.x, y: this.actionTile.y};
        const tiles = this.getActionTilesByDistance(originalActionTile, this.actionRadius, this.actionFacing);

        tiles.forEach((tile) => {
            this.addTileActions(tile);
        });

        this.actionTile = originalActionTile;
        this.updateActionAvailability();
    }

    setActionRadius(radius = 1) {
        let parsedRadius = parseInt(radius);
        if (isNaN(parsedRadius)) {
            parsedRadius = 1;
        }
        this.actionRadius = Math.max(1, parsedRadius);
    }

    getActionTilesByDistance(originTile, radius = 1, facing = this.actionFacing) {
        let tiles = [];
        const direction = this.actionTileLookUp[facing] || this.actionTileLookUp.s;

        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                if (!this.isTileInFacingDirection(dx, dy, direction)) {
                    continue;
                }
                const distance = Math.abs(dx) + Math.abs(dy);
                const linearDistance = Math.sqrt((dx * dx) + (dy * dy));
                tiles.push({
                    x: originTile.x + dx,
                    y: originTile.y + dy,
                    distance,
                    linearDistance
                });
            }
        }

        tiles.sort((a, b) => {
            if (a.distance != b.distance) {
                return a.distance - b.distance;
            }
            if (a.linearDistance != b.linearDistance) {
                return a.linearDistance - b.linearDistance;
            }
            if (a.x != b.x) {
                return a.x - b.x;
            }
            return a.y - b.y;
        });

        return tiles;
    }

    isTileInFacingDirection(dx, dy, direction) {
        const dot = (dx * direction.x) + (dy * direction.y);
        return dot >= 0;
    }

    addTileActions(tile) {
        this.actionTile = {x: tile.x, y: tile.y};

        let ground = (this.locale === this.scene.exterior)
            ? this.scene.exterior.getGroundAt(tile.x, tile.y)
            : this.locale.ground.getGround(tile.x, tile.y);
        if (ground != null) {
            this.getGroundActions(ground, tile);
        }

        this.addItemActions(tile);
        this.addObjectActions(tile);
    }

    updateActionAvailability() {
        var focus = this.scene.player.getFocus();
        if (focus.name == 'PLAYER' && (this.scene.player.state.name == 'IDLE' || this.scene.player.state.name == 'WALK')) {
            this.showMarker(true);
            this.showActions(true);
        }
        else {
            this.showMarker(false);
            this.showActions(false);
        }
    }

    addItemActions (tile = this.actionTile) {
        if (this.scene.manager.itemManager != undefined) {
            var item = this.scene.manager.itemManager.registry.getItem(tile.x,tile.y);
            if (item != null) {
                item.addActions();
            }
        } 
    }

    addObjectActions (tile = this.actionTile) {
        if (this.scene.manager.objectManager != undefined) {
            var objects = this.scene.manager.objectManager.registry.getObjects(tile.x,tile.y);
            if (objects != null && objects.length > 0) {
                objects.forEach(object => {
                    object.addActions();
                });
            }
        }
    }

    updateActionTile(facing) {
        this.actionFacing = facing;
        var mods = this.actionTileLookUp[facing];
        this.actionTile = {
            x: parseInt(this.scene.player.standingTile.x + mods['x']),
            y: parseInt(this.scene.player.standingTile.y + mods['y'])
        };
        this.menu = {
            x: parseInt(this.actionTile.x + mods['mx'])*16,
            y: parseInt(this.actionTile.y + mods['my'])*16
        };
        this.updateMarker();
    }

    getGroundActions (ground, tile = this.actionTile) {
        if (ground != null && Array.isArray(ground.ACTIONS) && this.scene.manager.time != undefined && this.scene.manager.time.time_passing) {
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
                    this.addAction({action: ground.ACTIONS[i].ACTION.toUpperCase(), object: '', ground: ground.ACTIONS[i].GROUND, fx: ground.ACTIONS[i].FX, tile});
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

        if (this.pendingAction != null) {
            this.tryExecutePendingAction();
            return;
        }

        if (this.scene.player.playerInput.select && this.availableActions.length > 0 ) {
            let selectedAction = this.availableActions[0];
            this.queueActionExecution(selectedAction);
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

    listen () {
        var self = this;
        this.scene.events.on('ACTION_CLICKED', function(action) {
            let selectedAction = null;
            self.availableActions.forEach(function (availableAction) {
                if (availableAction.action == action) {
                    selectedAction = availableAction;
                }
            });
            self.queueActionExecution(selectedAction);
        });
    }

    queueActionExecution(selectedAction = null) {
        if (selectedAction == null) {
            return;
        }

        const targetTile = selectedAction.tile || this.actionTile;
        if (targetTile == null || this.scene.player == undefined || this.scene.player.standingTile == undefined) {
            return;
        }

        // Check if player is already on any adjacent tile to the target and facing it (works for all action types)
        const adjacentTiles = this.getAdjacentTiles(targetTile);
        const onAdjacentTile = adjacentTiles.some(tile => this.isPlayerOnTile(tile));
        
        if (onAdjacentTile && this.isPlayerFacingTargetTile(targetTile)) {
            this.executeActionSelection(selectedAction);
            return;
        }

        const approachTile = this.getActionApproachTile(selectedAction, targetTile);

        if (this.isPlayerOnTile(approachTile)) {
            // Player is on the computed approach tile but not facing; queue without walking
            this.pendingAction = {
                selectedAction,
                approachTile
            };
            return;
        }

        // Player needs to walk to the approach tile
        this.pendingAction = {
            selectedAction,
            approachTile
        };
        this.scene.player.moveToTile(approachTile.x, approachTile.y);
    }

    tryExecutePendingAction() {
        if (this.pendingAction == null) {
            return;
        }

        const selectedAction = this.pendingAction.selectedAction;
        const approachTile = this.pendingAction.approachTile;
        if (selectedAction == null || approachTile == null) {
            this.pendingAction = null;
            return;
        }

        if (this.isPlayerOnTile(approachTile) && this.scene.player.destinations.length == 0) {
            const actionToExecute = selectedAction;
            this.pendingAction = null;
            this.executeActionSelection(actionToExecute);
            return;
        }

        if (!this.isPlayerOnTile(approachTile) && this.scene.player.destinations.length == 0) {
            this.pendingAction = null;
        }
    }

    getActionApproachTile(selectedAction, targetTile) {
        if (!this.requiresEdgeApproach(selectedAction)) {
            return targetTile;
        }

        const adjacentTiles = this.getAdjacentTiles(targetTile);
        const playerTile = this.scene.player.standingTile;
        const nav = this.scene.manager.nav;

        let candidates = adjacentTiles.map((tile) => {
            let route = null;
            if (nav != undefined && typeof nav.getFullRoute === 'function') {
                route = nav.getFullRoute(playerTile.x, playerTile.y, tile.x, tile.y, 'simple_tile');
            }

            const onTile = this.isPlayerOnTile(tile);
            const hasRoute = Array.isArray(route) && route.length > 0;

            return {
                tile,
                reachable: onTile || hasRoute,
                routeLength: hasRoute ? route.length : Number.MAX_SAFE_INTEGER,
                distance: Math.abs(playerTile.x - tile.x) + Math.abs(playerTile.y - tile.y)
            };
        });

        candidates.sort((a, b) => {
            if (a.reachable != b.reachable) {
                return a.reachable ? -1 : 1;
            }
            if (a.routeLength != b.routeLength) {
                return a.routeLength - b.routeLength;
            }
            return a.distance - b.distance;
        });

        if (candidates.length > 0 && candidates[0].reachable) {
            return candidates[0].tile;
        }

        return targetTile;
    }

    requiresEdgeApproach(selectedAction) {
        if (selectedAction == null || selectedAction.object == undefined || selectedAction.object == '') {
            return false;
        }

        const objectInfo = selectedAction.object.info;
        if (objectInfo == undefined || objectInfo.solid == undefined) {
            return false;
        }

        return objectInfo.solid === 1 || objectInfo.solid === true;
    }

    getAdjacentTiles(tile) {
        return [
            {x: tile.x, y: tile.y - 1},
            {x: tile.x + 1, y: tile.y},
            {x: tile.x, y: tile.y + 1},
            {x: tile.x - 1, y: tile.y}
        ];
    }

    isPlayerFacingTargetTile(targetTile) {
        const playerTile = this.scene.player.standingTile;
        if (!playerTile || !targetTile) {
            return false;
        }

        const offsetX = targetTile.x - playerTile.x;
        const offsetY = targetTile.y - playerTile.y;

        const facingVector = this.actionTileLookUp[this.actionFacing];
        if (!facingVector) {
            return false;
        }

        return offsetX === facingVector.x && offsetY === facingVector.y;
    }

    isPlayerOnTile(tile) {
        if (tile == null || this.scene.player == undefined || this.scene.player.standingTile == undefined) {
            return false;
        }

        return this.scene.player.standingTile.x == tile.x && this.scene.player.standingTile.y == tile.y;
    }

    executeActionSelection(selectedAction = null) {
        if (selectedAction == null) {
            return;
        }

        const targetTile = selectedAction.tile || this.actionTile;
        this.faceTowardTile(targetTile);

        let obj = selectedAction.object;
        if (obj != '' && obj != undefined) {
            obj.doAction(selectedAction.action);
            return;
        }

        this.doAction(selectedAction);
    }

    faceTowardTile(targetTile) {
        if (targetTile == null || this.scene.player == undefined || this.scene.player.standingTile == undefined) {
            return;
        }

        const offsetX = targetTile.x - this.scene.player.standingTile.x;
        const offsetY = targetTile.y - this.scene.player.standingTile.y;

        const facingDir = this.getFacingDirectionFromOffset(offsetX, offsetY);
        if (facingDir != null) {
            this.scene.player.setFacing(facingDir);
        }
    }

    getFacingDirectionFromOffset(dx, dy) {
        for (const [direction, vector] of Object.entries(this.actionTileLookUp)) {
            if (vector.x === dx && vector.y === dy) {
                return direction;
            }
        }
        return null;
    }


    doAction (selectedAction = null) {
        let action = (selectedAction == null) ? this.availableActions[0] : selectedAction;
        let targetTile = action.tile || this.actionTile;
        if (this.scene.player.state.name == 'IDLE') {
            this.scene.player.setState(action.action.toUpperCase());
            if (action.fx != undefined && action.fx != '') {
                this.scene.manager.fx.playFX(action.fx,this.scene.player.snappedStanding.x+8,this.scene.player.snappedStanding.y+8,500);
            }
            if (action.ground != undefined && action.ground != '') {
                this.clearActions();
                this.scene.time.addEvent({
                    delay: 500,
                    loop: false,
                    callback: () => {
                        this.locale.ground.placeTileType(targetTile.x, targetTile.y, action.ground, true);

                        this.scene.manager.loot.digUp(targetTile.x, targetTile.y);
                    }
                });
                var self = this;
                this.scene.time.addEvent({
                    delay: 1000,
                    loop: false,
                    callback: () => {
                        self.scene.player.setState('IDLE');
                        self.refreshActions();
                    }
                })
            }
        }
    }
    
    addAction(newAction) {
        //action, object
        const actionTile = newAction.tile || {x: this.actionTile.x, y: this.actionTile.y};
        const map = this.actionsMap;
        if(!map.has(newAction.action)){
            map.set(newAction.action, true);    // set any value to Map
            this.availableActions.push({
                action: newAction.action,
                object: newAction.object,
                ground: newAction.ground,
                fx: newAction.fx,
                tile: actionTile
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
            this.scene.manager.hud.hudAction.drawActions(displayActions, this.menu.x, this.menu.y);
            if (displayActions.length == 0) {
                this.actionsGroup.clear(false, true);
                this.showMarker(false);
            }
        }
    }
    

    
    
}