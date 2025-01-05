import GameState from "./game-state.js";
import GameFocus from "./game-focus.js";
import FXManager from "../fx/fx-manager.js";
import GameUtilities from "./game-utilities.js";
import HudManager from "../hud/hud-manager.js";
import ItemManager from "../items/item-manager.js";
import ObjectManager from "../objects/object-manager.js";
import PlantManager from "../plants/plant-manager.js";
import LootManager from "../loot/loot-manager.js";
import TimeManager from "../time/time-manager.js";
import KnowledgeManager from "../knowledge/knowledge-manager.js";
import DialogManager from "../dialog/dialog-manager.js";

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
        this.objectManager = new ObjectManager(this.scene);
        this.itemManager = new ItemManager(this.scene);
        this.plantManager = new PlantManager(this.scene);
        this.hud = new HudManager(this.scene);
        this.fx = new FXManager(this.scene);
        this.dialog = new DialogManager(this.scene);
        
    }

    initializeGame () {
        /// Use this method to gather managers that are not needed for the tutorial/new game
        this.time = new TimeManager();

        
        this.loot = new LootManager(this.scene);
        this.knowledge = new KnowledgeManager(this.scene);
        this.hud.initializeGameHUD();
    }

    wake () {
        console.log("Waking!");
        if (this.hud != null && this.hud.hudInput != undefined) {
            this.hud.refreshDisplay();
        }
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
        if (this.verbose) {
            console.log("Setting focus to: "+focus_string);
        }
        if (this.getFocus().name == focus_string) {
            if (this.verbose) {
                console.log("Focus is already "+focus_string);
            }
            return;
        }
        if (focus_string == 'PLAYER' || focus_string == 'MAP' || focus_string == 'PAUSE' || focus_string == 'CHEST') {
            this.hud.setState('VISIBLE_UNFOCUSED');
        }
        if (focus_string == 'DIALOG') {
            this.hud.setState('DIALOG_FOCUSED');
        }
        if (focus_string == 'POCKETS') {
            this.hud.setState('POCKETS_FOCUSED');
        }
        if (focus_string == 'NOTEBOOK') {
            this.hud.setState('NOTEBOOK_FOCUSED');
        }
        if (focus_string == 'SOCKS') {
            this.hud.setState('SOCKS_FOCUSED');
        }
        if (focus_string == 'ZENER') {
            this.hud.setState('ZENER_FOCUSED');
        }

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
        if (this.state.name == 'NOT_LOADED') { return this.loadGame(); }
        if (this.state.input) {
            const focus = this.getFocus();
            const input = this.scene.app.input.INPUT;
            if (input.INVENTORY.TAP && focus.name != 'DIALOG' && focus.name != 'QUOTE' && focus.name != 'ZENER' && focus.name != 'SOCKS') {
                if (focus.name == 'PLAYER' || focus.name == 'MAP' || focus.name == 'NOTEBOOK') {
                    this.setFocus('POCKETS');
                }
                else if (focus.name == 'POCKETS' || focus.name == 'CHEST') {
                    this.closeChest();
                    this.setFocus('PLAYER');  
                }
            }
            if (input.NOTEBOOK.TAP && focus.name != 'DIALOG' && focus.name != 'QUOTE' && focus.name != 'ZENER' && focus.name != 'SOCKS') {
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
                if (focus.name == 'SOCKS') {
                    this.setFocus('PLAYER');  
                }
                if (focus.name == 'DIALOG') {
                    this.setFocus('PLAYER');  
                }
                if (focus.name == 'QUOTE') {
                    this.setFocus('QUOTE');  
                }
            }
            if (input.UP.TAP) {
                if (focus.name == 'DIALOG') {
                    this.hud.hudDialog.arrowUp();
                }
                if (focus.name == 'SOCKS') {
                    this.hud.hudSocks.arrowUp();
                }
            }
            if (input.DOWN.TAP) {
                if (focus.name == 'CHEST') {
                    this.hud.chestArrowDown();
                }
                if (focus.name == 'DIALOG') {
                    this.hud.hudDialog.arrowDown();
                }
                if (focus.name == 'SOCKS') {
                    this.hud.hudSocks.arrowDown();
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
                if (focus.name == 'SOCKS') {
                    this.hud.hudSocks.select();
                }
                if (focus.name == 'ZENER') {
                    this.hud.hudZener.select();
                }
                if (focus.name == 'DIALOG') {
                    this.hud.hudDialog.select();
                }
            }
        }
        if (this.state.time && this.time != undefined &&  this.time.time_passing) {
            
            this.time.update();
            if (this.scene.exterior != null) {
                // find whether keylight has changed; if so, update
                this.handleKeylight();

            }

            this.last_hour = this.hour ? this.hour : 0;
            this.hour = this.time.now.hour;
            if (this.last_hour != this.hour) {
                this.scene.events.emit('HOUR_CHANGE', this.time.now, this.time.today);
            }

        }
        if (this.hud != null) {
            this.hud.update();
        }
        if (this.objectManager != null) {
            this.objectManager.update();
        }
        if (this.plantManager != null) {
            this.plantManager.update();
        }

    }

    loadGame () {
        if (this.state.name == 'NOT_LOADED') {
            this.view = this.getView();
            this.scene.app.camera.camera.setBackgroundColor('#4b424a');
            this.setState('LOADING');
            
            if (this.itemManager != undefined) {
                this.scene[this.scene.place].createItems();
            }
            
            this.setFocus('PLAYER');

            this.wake();
            this.setState('LOADED');
            this.setState('OVERWORLD');
        }
    }

    getKeyLight () {
        return this.time.keylight;
    }

    handleKeylight () {
        var keylight = this.getKeyLight();
        if (keylight != null) {
            
            if (keylight != this.scene.exterior.lastKeyLight) {
                this.scene.exterior.setKeyLight(keylight);
                this.objectManager.registry.updateLights(keylight);
                this.plantManager.registry.updateLights(keylight);
            }
        }
    }

}