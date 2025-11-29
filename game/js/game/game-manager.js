import GameState from "./game-state.js";
import GameFocus from "./game-focus.js";
import FXManager from "../fx/fx-manager.js";
import GameUtilities from "./game-utilities.js";
import HudManager from "../hud/hud-manager.js";
import DataManager from "../data/data-manager.js";
import ItemManager from "../items/item-manager.js";
import NavigatorManager from "../navigator/navigator-manager.js";
import ObjectManager from "../objects/object-manager.js";
import PlantManager from "../plants/plant-manager.js";
import LootManager from "../loot/loot-manager.js";
import TimeManager from "../time/time-manager.js";
import TreeManager from "../trees/tree-manager.js";
import VehicleManager from "../vehicles/vehicle-manager.js";
import KnowledgeManager from "../knowledge/knowledge-manager.js";
import DialogManager from "../dialog/dialog-manager.js";
import QuestManager from "../quest/quest-manager.js";
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
        this.treeManager = new TreeManager(this.scene);
        this.nav = new NavigatorManager(this.scene);
        this.vehicleManager = new VehicleManager(this.scene);
        this.dataManager = new DataManager(this.scene);
        this.hud = new HudManager(this.scene);
        this.fx = new FXManager(this.scene);
        this.dialog = new DialogManager(this.scene);
        this.quest = new QuestManager(this.scene);
    }

    initializeGame () {
        /// Use this method to gather managers that are not needed for the tutorial/new game
        this.time = new TimeManager();
        this.verbose = true;
        
        this.loot = new LootManager(this.scene);
        this.knowledge = new KnowledgeManager(this.scene);
        this.hud.initializeGameHUD();
    }

    wake () {
        console.log("Waking!");
        if (this.hud != null && this.hud.hudInput != undefined) {
            this.hud.pocket.setPocketsFromSave();
            this.hud.refreshDisplay();
        }

        if (this.scene.tutorial != undefined) {
            this.scene.tutorial.wake();
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
        if (focus_string == 'PLAYER' || focus_string == 'PAUSE' || focus_string == 'CHEST') {
            this.hud.setState('VISIBLE_UNFOCUSED');
        }
        if (focus_string == 'COINPURSE') {
            this.hud.setState('COINPURSE_FOCUSED');
        }
        if (focus_string == 'DIALOG') {
            this.hud.setState('DIALOG_FOCUSED');
        }
        if (focus_string == 'POCKETS') {
            this.hud.setState('POCKETS_FOCUSED');
        }
        if (focus_string == 'KEYCHAIN') {
            this.hud.setState('KEYCHAIN_FOCUSED');
        }
        if (focus_string == 'MAP') {
            this.hud.setState('MAP_FOCUSED');
        }
        if (focus_string == 'NOTEBOOK') {
            this.hud.setState('NOTEBOOK_FOCUSED');
        }
        if (focus_string == 'NUMBERPAD') {
            this.hud.setState('NUMBERPAD_FOCUSED');
        }
        if (focus_string == 'PAYMENT') {
            this.hud.setState('PAYMENT_FOCUSED');
        }
        if (focus_string == 'SOCKS') {
            this.hud.setState('SOCKS_FOCUSED');
        }
        if (focus_string == 'STORE') {
            this.hud.setState('STORE_FOCUSED');
        }
        if (focus_string == 'WATCH') {
            this.hud.setState('WATCH_FOCUSED');
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
            var focus = this.getFocus();
            const input = this.scene.app.input.INPUT;
            if (input.INVENTORY.TAP && focus.name != 'DIALOG' && focus.name != 'QUOTE' && focus.name != 'ZENER' && focus.name != 'SOCKS') {
                if (focus.name == 'PLAYER' || focus.name == 'MAP' || focus.name == 'NOTEBOOK' || focus.name == 'KEYCHAIN' || focus.name == 'COINPURSE' || focus.name == 'WATCH') {
                    this.setFocus('POCKETS');
                }
                else if (focus.name == 'POCKETS') {
                    this.closeChest();
                    this.setFocus('PLAYER');  
                }
            }
            if (input.KEYCHAIN.TAP && focus.name != 'DIALOG' && focus.name != 'QUOTE' && focus.name != 'ZENER' && focus.name != 'SOCKS') {
                if (focus.name != 'KEYCHAIN') {
                    this.closeChest();
                    this.setFocus('KEYCHAIN');
                }
                else {
                    this.setFocus('PLAYER');  
                }
            }
            if (input.COINPURSE.TAP && focus.name != 'DIALOG' && focus.name != 'QUOTE' && focus.name != 'ZENER' && focus.name != 'SOCKS') {
                if (focus.name != 'COINPURSE') {
                    this.closeChest();
                    this.setFocus('COINPURSE');
                }
                else {
                    this.setFocus('PLAYER');  
                }   
            }
            if (input.WATCH.TAP && focus.name != 'DIALOG' && focus.name != 'QUOTE' && focus.name != 'ZENER' && focus.name != 'SOCKS') {
                if (focus.name != 'WATCH') {
                    this.closeChest();
                    this.setFocus('WATCH');
                }
                else {
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
            if (input.MAP.TAP && focus.name != 'DIALOG' && focus.name != 'QUOTE' && focus.name != 'ZENER' && focus.name != 'SOCKS') {
                if (focus.name != 'MAP') {
                    this.closeChest();
                    this.setFocus('MAP');
                }
                else {
                    this.setFocus('PLAYER');  
                }
            }
            if (input.BACK.TAP && focus.name != 'PLAYER') {
                this.scene.events.emit('INPUT_BACK_'+focus.name);
                if (focus.name == 'POCKETS') {
                    this.setFocus('PLAYER');   
                }
                if (focus.name == 'COINPURSE') {
                    this.setFocus('PLAYER');  
                }
                if (focus.name == 'KEYCHAIN') {
                    this.setFocus('PLAYER');  
                }
                if (focus.name == 'NOTEBOOK') {
                    this.setFocus('PLAYER');  
                }
                if (focus.name == 'MAP') {
                    this.setFocus('PLAYER');  
                }
                if (focus.name == 'PAYMENT') {
                    this.setFocus('PLAYER');  
                }
                if (focus.name == 'DIALOG') {
                    this.setFocus('PLAYER');  
                }
                if (focus.name == 'STORE') {
                    this.setFocus('PLAYER');  
                }
                if (focus.name == 'QUOTE') {
                    this.setFocus('QUOTE');  
                }
                if (focus.name == 'NUMBERPAD') {
                    this.setFocus('PLAYER');  
                }
                if (focus.name == 'WATCH') {
                    this.setFocus('PLAYER');  
                }

                this.hud.hudSound.play('BACK_BUTTON');
            }

            if (input.UP.TAP) {
                this.scene.events.emit('INPUT_UP_'+focus.name);
            }
            if (input.DOWN.TAP) {
                this.scene.events.emit('INPUT_DOWN_'+focus.name);
            }
            if (input.RIGHT.TAP) {
                this.scene.events.emit('INPUT_RIGHT_'+focus.name);
            }
            if (input.LEFT.TAP) {
                this.scene.events.emit('INPUT_LEFT_'+focus.name);
            }
            if (input.SELECT.TAP) {
                this.scene.events.emit('INPUT_SELECT_'+focus.name);
            }
        }
        if (this.state.time && this.time != undefined &&  this.time.time_passing) {
            
            this.time.update();
            this.handleKeylight();

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

        if (this.vehicleManager != null) {
            this.vehicleManager.update();
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

    handleKeylight (select=null) {
        var keylight = this.getKeyLight();
        if (keylight != null) {
            if (keylight != this.scene[this.scene.locale].lastKeyLight) {
                this.scene[this.scene.locale].setKeyLight(keylight);
                this.objectManager.registry.updateLights(keylight);
                this.plantManager.registry.updateLights(keylight);
                this.treeManager.registry.updateLights(keylight);
                this.itemManager.registry.updateLights(keylight);
            }
            if (select != null) {
                switch (select) {
                    case 'OBJECTS':
                        this.objectManager.registry.updateLights(keylight);
                        break;
                    case 'PLANTS':
                        this.plantManager.registry.updateLights(keylight);
                        break;
                    case 'TREES':
                        this.treeManager.registry.updateLights(keylight);
                        break;
                    case 'ITEMS':
                        this.itemManager.registry.updateLights(keylight);
                        break;
                }
            }
        }
    }

}