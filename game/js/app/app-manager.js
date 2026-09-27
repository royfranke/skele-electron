import AppState from "./app-state.js";
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
         this.sceneStarted = false;
       this.appState = new AppState(state_name);   
       this.create();
    }

    create () {
        
        this.state = this.appState.getStateConfig();
        this.camera = new AppCamera(this.scene, this.state);
        this.appView = new AppView(this.scene, this.getView(),this.state.name);
        this.initializeInput();
        this.initializeSaveManager();
        this.startScene();

        this.scene.events.on(Phaser.Scenes.Events.WAKE, function ()
        {
            this.camera.wake();
        }, this);
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

    initializeNpcScheduleFromSlot () {
        const npcSchedule = this.scene?.manager?.npcSchedule;
        const slot = this.scene?.slot;
        if (!npcSchedule || slot == undefined || typeof npcSchedule.fromSaveData !== 'function') {
            return;
        }

        const now = this.scene?.manager?.time?.now;
        const hasSavedNpcs = slot.NPCS != null && typeof slot.NPCS === 'object';

        // Migration path: old saves without NPCS should prime schedule state from current time.
        npcSchedule.fromSaveData(hasSavedNpcs ? slot.NPCS : null, now);

        // Persist migrated runtime state immediately so subsequent scene transitions
        // use deterministic NPC data.
        if (!hasSavedNpcs && typeof npcSchedule.toSaveData === 'function') {
            slot.NPCS = npcSchedule.toSaveData();
        }
    }

    initializeSave () {
        if (this.saveManager != null && this.scene.slot != undefined) {
            this.saveManager.initializeSave();
            this.initializeNpcScheduleFromSlot();
        }
    }

    initializeRoomSave () {
        if (this.saveManager != null && this.scene.slot != undefined) {
            this.saveManager.initializeRoomSave();
            this.initializeNpcScheduleFromSlot();
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
        if (this.input != null && this.state.name == 'LOAD') {
            for (const [key, value] of Object.entries(this.input.INPUT)) {
                if (value.TAP) {
                    this.appView.handleLoadInput(key);
                }
            }
        }
        if (this.input != null && this.state.name == 'SETTINGS') {
            for (const [key, value] of Object.entries(this.input.INPUT)) {
                if (value.TAP) {
                    this.appView.handleSettingsInput(key);
                }
            }
        }
    }

    startScene () {
        if (this.sceneStarted) {
            return;
        }

        if (this.scene?.deferSceneStart === true) {
            return;
        }

        const state = this.state;
        this.camera.start();
        this.sceneStarted = true;
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

    startDeferredSceneStart () {
        if (this.sceneStarted) {
            return;
        }
        this.startScene();
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