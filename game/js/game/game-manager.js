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
        this.hud = new HudManager(this.scene);
        this.fx = new FXManager(this.scene);
        
    }

    initializeGame () {
        /// Use this method to gather managers that are not needed for the tutorial/new game
        this.time = new TimeManager();
        
        this.plantManager = new PlantManager(this.scene);
        
        this.loot = new LootManager(this.scene);
        this.knowledge = new KnowledgeManager(this.scene);
        this.hud.initializeGameHUD();
    }

    wake () {
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
        if (this.state.time && this.time != undefined &&  this.time.time_passing) {
            this.time.update();
            if (this.scene.exterior != null) {
                this.scene.exterior.setKeyLight(this.getKeyLight());
                this.objectManager.registry.updateLights(this.getKeyLight());
                this.plantManager.registry.updateLights(this.getKeyLight());
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

}