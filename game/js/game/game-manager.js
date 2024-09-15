import GameState from "./game-state.js";
import GameFocus from "./game-focus.js";
import FXManager from "../fx/fx-manager.js";
import GameUtilities from "./game-utilities.js";
import HudManager from "../hud/hud-manager.js";
import ItemManager from "../items/item-manager.js";
import ObjectManager from "../objects/object-manager.js";
import LootManager from "../loot/loot-manager.js";
import TimeManager from "../time/time-manager.js";
import AnnouncementRegistry from "../announcements/announcement-registry.js";

/* global Phaser */
/*
 * Game level manager
 */

export default class GameManager {

    constructor(scene) {
       this.scene = scene;
       this.create();
    }

    create () {
        this.gameState = new GameState();
        this.utilities = new GameUtilities();
        this.gameFocus = new GameFocus();
        this.hud = null;
        this.time = new TimeManager();
        this.announce = new AnnouncementRegistry();
        this.objectManager = new ObjectManager(this.scene);
        this.itemManager = new ItemManager(this.scene);
        this.loot = new LootManager(this.scene);
        this.fx = new FXManager(this.scene);

    }

    wake () {
        this.hud.refreshDisplay();
    }

    openBag (bag) {
        this.itemManager.openBag(bag);
    }
    
    openChest (chest) {
        this.objectManager.openChest(chest);
    }

    closeChest () {
        this.hud.closeChest();
    }

    getFocus () {
        return this.gameFocus.getFocus();
    }

    setFocus (focus_string) {
        if (focus_string == 'PLAYER' || focus_string == 'MAP' || focus_string == 'PAUSE' || focus_string == 'DIALOG' || focus_string == 'CHEST') {
            this.hud.setState('VISIBLE_UNFOCUSED');
        }
        if (focus_string == 'POCKETS') {
            this.hud.setState('POCKETS_FOCUSED');
        }
        if (focus_string == 'NOTEBOOK') {
            this.hud.setState('NOTEBOOK_FOCUSED');
        }
        if (focus_string == 'ZENER') {
            this.hud.setState('ZENER_FOCUSED');
        }
        this.hud.refreshDisplay();
        return this.gameFocus.setFocus(focus_string);
    }

    getLastFocus () {
        return this.gameFocus.getLastFocus();
    }

    getFocusChange () {
        return this.gameFocus.getChanged();
    }

    getState () {
        return this.gameState.getStateConfig();
    }

    setState (state_string) {
        return this.gameState.setState(state_string);
    }

    getLastState () {
        return this.gameState.getLastState();
    }

    getView () {
        return this.scene.app.camera.view;
    }

    update () {
        this.state = this.getState();
        if (this.state.name == 'NOT_LOADED') { this.loadGame(); }
        if (this.state.input) {
            const focus = this.getFocus();
            const input = this.scene.app.input.INPUT;
            if (input.INVENTORY.TAP) {
                if (focus.name == 'PLAYER' || focus.name == 'MAP' || focus.name == 'NOTEBOOK') {
                    this.setFocus('POCKETS');
                }
                else if (focus.name == 'POCKETS' || focus.name == 'CHEST') {
                    this.closeChest();
                    this.setFocus('PLAYER');  
                }
            }
            if (input.NOTEBOOK.TAP) {
                if (focus.name != 'NOTEBOOK') {
                    this.closeChest();
                    this.setFocus('NOTEBOOK');
                }
                else {
                    this.setFocus('PLAYER');  
                }
            }
            if (input.BACK.TAP) {
                if (focus.name == 'POCKETS' || focus.name == 'CHEST') {
                    this.closeChest();
                    this.setFocus('PLAYER');  
                }
                if (focus.name == 'NOTEBOOK') {
                    this.setFocus('PLAYER');  
                }
                if (focus.name == 'ZENER') {
                    this.setFocus('PLAYER');  
                }
            }
            if (input.DOWN.TAP) {
                if (focus.name == 'CHEST') {
                    this.hud.chestArrowDown();
                }
            }
            if (input.RIGHT.TAP) {
                if (focus.name == 'ZENER') {
                    this.hud.hudZener.arrowRight();
                }
                if (focus.name == 'NOTEBOOK') {
                    this.hud.hudNotebook.arrowRight();
                }
            }
            if (input.LEFT.TAP) {
                if (focus.name == 'ZENER') {
                    this.hud.hudZener.arrowLeft();
                }
                if (focus.name == 'NOTEBOOK') {
                    this.hud.hudNotebook.arrowLeft();
                }
            }
            if (input.SELECT.TAP) {
                if (focus.name == 'CHEST') {
                    this.hud.chestHold();
                }
                if (focus.name == 'ZENER') {
                    this.hud.hudZener.select();
                }
            }
        }
        if (this.state.time) {
            this.time.update();
            if (this.scene.exterior != null) {
                this.scene.exterior.setKeyLight(this.getKeyLight());
                this.objectManager.registry.updateLights(this.getKeyLight());
            }
        }
        if (this.hud != null) {
            this.hud.update();
            var time = this.time.getDigitalTime();
            this.watch.setText(time.hour+':'+time.minute+"B");
        }
        this.objectManager.update();
    }

    loadGame () {
        if (this.state.name == 'NOT_LOADED') {
            this.scene.app.camera.camera.setBackgroundColor('#4b424a');
            this.setState('LOADING');
            this.hud = new HudManager(this.scene);
            this.scene.player.coinpurse.setHud(this.hud.hudCoinpurse);
            this.watch = this.hud.hudWatch.tellWatch('--:--MB');
            

            this.scene[this.scene.place].createItems();
            
            this.setFocus('PLAYER');
            /// After loading functions...
            //var staple_gun = this.itemManager.newItem('STAPLE_GUN');
            //this.scene.manager.hud.availablePocket(staple_gun);

            //var flyers = this.itemManager.newItem('FLYER_PINK');
            //flyers.updateStackCount(12);
            
            //this.scene.manager.hud.availablePocket(flyers);
            //this.scene.manager.itemManager.newItemToPockets('BACKPACK_PURPLE');
            //let mac = this.itemManager.newItem('CASSEROLE_MAC');
            //this.itemManager.newItemToPockets('RAKE');
            //this.itemManager.newItemToPockets('CASSEROLE_DISH_1',[mac]);
            this.setState('LOADED');
            this.setState('OVERWORLD');
            
        }
    }

    getKeyLight () {
        return this.time.keylight;
    }

}