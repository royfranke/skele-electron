import AppState from "./app-state.js";
import AppMenu from "./app-menu.js";
import AppInput from "./app-input.js";
import AppCamera from "./app-camera.js";
import AppView from "./app-view.js";
import SaveManager from "../save/save-manager.js";
/* global Phaser */
/*
 * Top level manager
 */
export default class AppManager {

    constructor(scene, state_name) {
       this.scene = scene;
       this.verbose = true;
       this.appState = new AppState(state_name);   
       this.create();
    }

    create () {
        
        this.state = this.appState.getStateConfig();
        this.camera = new AppCamera(this.scene, this.state);
        this.appView = new AppView(this.scene, this.getView(),this.state.name);
        this.initializeMenu();
        this.initializeInput();
        this.initializeSaveManager();
        this.startScene();

        this.scene.events.on(Phaser.Scenes.Events.WAKE, function ()
        {
            this.camera.wake();
        }, this);
    }

    preloadGame (data) {
        this.appView.selectedLoad(this.menu.selected, data);

    }

    initializeMenu () {
        if (this.state.menu) {
            this.menu = new AppMenu(this.scene, this.state.name, this.camera.view);
        }
        else {
            this.menu = null;
        }
    }


    initializeInput () {
        if (this.state.input) {
            this.input = new AppInput(this.scene);
            if (this.state.app_input) {
                this.input.initializeAppKeys();
            }
            if (this.state.avail_input) {
                this.input.initializeAvailableKeys();
            }
       }
       else {
            this.input = null;
       }
    }

    initializeSaveManager () {
        if (this.state.save) {
            this.saveManager = new SaveManager(this.scene);
        }
        else {
            this.saveManager = null;
        }
    }

    initializeSave () {
        if (this.saveManager != null && this.scene.slot != undefined) {
            this.saveManager.initializeSave();
        }
    }

    initializeRoomSave () {
        if (this.saveManager != null && this.scene.slot != undefined) {
            this.saveManager.initializeRoomSave();
        }
    }

    initializeTutorialSave () {
        if (this.saveManager != null && this.scene.slot != undefined) {
            this.saveManager.initializeTutorialSave();
        }
        
        
    }

    softSaveGameData () {
        return this.saveManager.softSaveGameData();
    }

    getView () {
        return this.camera.view;
    }

    update () {
        if (this.input != null) {
            this.input.update();
        }
        if (this.menu != null) {
            for (const [key, value] of Object.entries(this.input.INPUT)) {
                if (this.input.INPUT[key].TAP) {
                    this.menu.input(key);
                }
            }
            if (this.state.name == 'LOAD' && this.menu.selected != this.menu.last_selected) {
                this.menu.setSelected(this.menu.selected);
                this.appView.selectLoad(this.menu.selected);
            }
        }
    }

    startScene () {
        const state = this.state;
        this.camera.start();
        let verbose = this.verbose;
        if (verbose) {console.log("Starting Scene: "+state.name)};

        if (state.autoEnd > 0) {
            this.scene.time.addEvent({
                delay: state.autoEnd,
                loop: false,
                callback: () => {
                    // Fade out
                    this.endScene(state.next);
                }
            })
        }
    }

    endScene (switchToKey) {
        this.camera.end(switchToKey);
        const state = this.state;
        let verbose = this.verbose;
        this.scene.time.addEvent({
            delay: state.fadeOut,
            callback: ()=>{
                if (verbose) { console.log("Ending/Switching Scene: "+state.name+", switch to "+ switchToKey);}
                this.switchTo(switchToKey);
            }
        });
    }

    switchTo (state) {
        if (this.appState.validState(state)) {
            var new_scene = this.appState.valid_states[state].super;
            /// Context from which scene switch is called is important outside of scene
            this.scene.scene.switch(new_scene);
        }
    }
}