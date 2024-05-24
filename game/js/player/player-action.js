import SPRITE_DIR from "../config/sprite-dir.js";
/**
 *	Updates available actions
 */
 export default class PlayerAction {
    
    allowed;
    showActive;
    showMenu;
    
    selected;
    committed;

    actionTile;
    actionTileLast;
    actionTileFresh;
    actionTileLookUp;


    // Set in clearActions
    actionsMap;
    availableActions;
    menu;

    constructor(scene) {
        this.scene = scene;
        this.locale = (this.scene.exterior != null) ? this.scene.exterior : this.scene.court;
        this.actionTile = {x: 0, y: 0};
        this.actionTileLast = {x: 0, y: 0};
        this.actionTileFresh = true;
        this.actionTileLookUp = SPRITE_DIR.DIR_TILE;
        this.actionsGroup = this.scene.add.group();

        this.clearActions();

        this.actionMarker = this.createMarker();
        //this.debugActionTile = this.scene.add.rectangle(0, 0, 16, 16, 0x6666ff).setOrigin(0);
    }

    clearActions() {
        this.availableActions = [];
        this.actionsMap = new Map;
        this.menu = {x: 0, y: 0};
    }

    createMarker () {
        /*
        const marker = this.scene.add.sprite(0,0, "action-marker", 0).setOrigin(0);
        marker.anims.play("action-marker", false);
        marker.setVisible(false);
        */
       let marker = this.scene.manager.fx.handleFX('SELECTOR_VALID_',0,0);
       marker.setOrigin(0);
       marker.setVisible(false);
       return marker;
    }

    showMarker (showing) {
        this.actionMarker.setVisible(showing);
    }

    showActions (showing) {
        this.showMenu = showing;
    }

    updateMarker() {
        this.snappedWorldPoint = this.locale.groundLayer.tileToWorldXY(this.actionTile.x, this.actionTile.y);

        this.actionMarker.setPosition(this.snappedWorldPoint.x - 8, this.snappedWorldPoint.y - 8);

        
        if (this.actionTileLast.x != this.actionTile.x || this.actionTileLast.y != this.actionTile.y) {
            //this.debugActionTile.setPosition(this.snappedWorldPoint.x, this.snappedWorldPoint.y);
            this.actionTileFresh = true;
            this.clearActions();
            this.actionTileLast = this.actionTile;

            this.refreshActions();
        }
        else {
            this.actionTileFresh = false;
        }
    }

    refreshActions() {
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
        var item = this.scene.manager.itemManager.registry.getItem(this.actionTile.x,this.actionTile.y);
        if (item != null) {
            item.addActions();
        }
    }

    addObjectActions () {
        var object = this.scene.manager.objectManager.registry.getObject(this.actionTile.x,this.actionTile.y);
        if (object != null) {
            object.addActions();
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
            if (this.scene.player.underAction.CANDIG) {
                this.addAction({action: 'DIG', object: ''});
            }
        }
        

        this.updateMarker();
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
            if (obj != '') {
              obj.doAction(this.availableActions[0].action);
              return 'PULL';
            }
            else {
              this.doAction(this.availableActions[0].action);
              //this.sprite.anims.currentAnim.getFrameByProgress(0);
              return this.availableActions[0].action;
            }
          }

        if (this.scene.player.playerInput.more && this.availableActions.length > 1 ) {
            var firstItem = this.availableActions.shift(); // Remove the first item
            this.availableActions.push(firstItem); // Add the first item to the end
        }
    }

    doAction (action_string) {
        
        if (action_string == 'DIG' && this.scene.player.state.name != 'DIG') {
            this.scene.player.setState('DIG');
            
            this.digUp(this.scene.player.snappedStanding.x, this.scene.player.snappedStanding.y);
            setTimeout(() => {
                this.locale.ground.placeTileType(this.actionTile.x, this.actionTile.y, 'DIRT', true);
            }, 500);
            this.digUp(this.scene.player.snappedStanding.x, this.scene.player.snappedStanding.y);
            setTimeout(() => {
                this.scene.player.setState('IDLE');
            }, 1000);
        }
    }
    
    digUp(_x,_y) {
        this.scene.manager.fx.playFX('CLOUD_DUST_',_x+8,_y+8,500);
        /// Get odds on this tile from somewhere
        const yielded = [1,1,1,1,5,5,10,10,25,25];
        var empties = Phaser.Math.RND.between(4, 20);
        
        for (var i=0;i<empties;i++) {
          yielded.push(0)
        }
        
        Phaser.Utils.Array.Shuffle(yielded);
        if (yielded[0] > 0) {
            setTimeout(() => {
                this.scene.player.addCoin(yielded[0]);
                this.scene.manager.fx.coinUp(_x,_y,yielded[0],'');
            }, 250);
        }
    }

    addAction(newAction) {
        //action, object
        const map = this.actionsMap;
        if(!map.has(newAction.action)){
            map.set(newAction.action, true);    // set any value to Map
            this.availableActions.push({
                action: newAction.action,
                object: newAction.object
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
                    object: action.object
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