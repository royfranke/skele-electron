import GameState from "./game-state.js";
import GameFocus from "./game-focus.js";
import FXManager from "../fx/fx-manager.js";
import GameUtilities from "./game-utilities.js";
import HudManager from "../hud/hud-manager.js";
import ItemManager from "../items/item-manager.js";
import ObjectManager from "../objects/object-manager.js";
import LootManager from "../loot/loot-manager.js";
import TimeManager from "../time/time-manager.js";

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
        this.objectManager = new ObjectManager(this.scene);
        this.itemManager = new ItemManager(this.scene);
        this.loot = new LootManager(this.scene);
        this.fx = new FXManager(this.scene);

    }

    wake () {
        this.hud.refreshDisplay();
    }
    
    openChest (chest) {
        this.itemManager.openChest(chest);
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
                if (focus.name == 'PLAYER' || focus.name == 'MAP') {
                    this.setFocus('POCKETS');
                }
                else if (focus.name == 'POCKETS' || focus.name == 'CHEST') {
                    this.closeChest();
                    this.setFocus('PLAYER');  
                }
            }
            if (input.NOTEBOOK.TAP) {
                if (focus.name != 'NOTEBOOK') {
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
            }
            if (input.DOWN.TAP) {
                if (focus.name == 'CHEST') {
                    this.hud.chestArrowDown();
                }
            }
            if (input.SELECT.TAP) {
                if (focus.name == 'CHEST') {
                    this.hud.chestHold();
                }
            }
        }
        if (this.state.time) {
            this.time.update();
        }
        if (this.hud != null) {
            this.hud.update();
            var time = this.time.getDigitalTime();
            this.watch.setText(time.hour+':'+time.minute+time.period);
        }
        this.objectManager.update();
    }

    loadGame () {
        if (this.state.name == 'NOT_LOADED') {
            this.scene.app.camera.camera.setBackgroundColor('#4b424a');
            this.setState('LOADING');
            
            this.hud = new HudManager(this.scene);
            this.watch = this.hud.hudWatch.tellWatch('00:00AM','positive');
            

            this.scene[this.scene.place].createItems();
            
            this.setFocus('PLAYER');
            /// After loading functions...

            var postcard = this.itemManager.newItem('POSTCARD_BACK_1');
            var banana = this.itemManager.newItem('BANANA');
            var flyers = this.itemManager.newItem('FLYER_PINK');
            flyers.updateStackCount(12);
            var backpack = this.itemManager.newItemToPockets('BACKPACK_GREEN',[postcard, banana, flyers]);

            this.itemManager.newItemToPockets('RAKE');
            this.itemManager.newItemToPockets('SPADE');
            this.setState('LOADED');
            this.setState('OVERWORLD');
            
        }
    }

}