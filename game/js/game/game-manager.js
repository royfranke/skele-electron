import GameState from "./game-state.js";
import GameFocus from "./game-focus.js";
import GameFX from "./game-fx.js";
import GameUtilities from "./game-utilities.js";
import HudManager from "../hud/hud-manager.js";
import ItemManager from "../items/item-manager.js";
import ObjectManager from "../objects/object-manager.js";
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
        this.fx = new GameFX(this.scene);
    }

    wake () {
        this.hud.refreshDisplay();
    }
    
    openChest (chest) {
        this.itemManager.openChest(chest);
    }

    closeChest () {
        this.itemManager.closeChest();
    }

    getFocus () {
        return this.gameFocus.getFocus();
    }

    setFocus (focus_string) {
        if (focus_string == 'PLAYER' || focus_string == 'MAP' || focus_string == 'PAUSE' || focus_string == 'DIALOG' || focus_string == 'CHEST') {
            this.hud.setState('VISIBLE_UNFOCUSED');
        }
        if (focus_string == 'POCKETS') {
            this.hud.setState('VISIBLE_FOCUSED');
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
            var focus = this.getFocus();
            if (this.scene.app.input.INPUT.INVENTORY.TAP) {
                if (focus.name == 'PLAYER' || focus.name == 'MAP') {
                    this.setFocus('POCKETS');
                }
                else if (focus.name == 'POCKETS' || focus.name == 'CHEST') {
                    this.closeChest();
                    this.setFocus('PLAYER');  
                }
            }
            if (this.scene.app.input.INPUT.BACK.TAP) {
                if (focus.name == 'POCKETS' || focus.name == 'CHEST') {
                    this.closeChest();
                    this.setFocus('PLAYER');  
                }
            }
            if (this.scene.app.input.INPUT.DOWN.TAP) {
                if (focus.name == 'CHEST') {
                    this.hud.chestArrowDown();
                }
            }
            if (this.scene.app.input.INPUT.SELECT.TAP) {
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
    }

    loadGame () {
        if (this.state.name == 'NOT_LOADED') {
            this.scene.app.camera.camera.setBackgroundColor('#4b424a');
            this.setState('LOADING');
            
            this.hud = new HudManager(this.scene);
            this.watch = this.hud.hudDisplay.tellWatch('00:00AM','positive');
            

            this.scene[this.scene.place].createItems();
            
            this.setFocus('PLAYER');
            /// After loading functions...
            this.setState('LOADED');


            //var plastic = this.itemManager.newItemToPockets('PLASTIC_BAG_1');
            //var backpack = this.itemManager.newItemToPockets('BACKPACK_GREEN');


            //var apple = this.itemManager.newItem('POSTCARD_BACK_1');
            //backpack.addItem(apple);
            //var cupcake = this.itemManager.newItem('BANANA');
            //backpack.addItem(cupcake);
            //var bag = this.itemManager.newItem('LUNCH_BAG_USED',[cupcake]);
            //backpack.addItem(bag);

            this.setState('LOADED');
            this.setState('OVERWORLD');
            
        }
    }

}