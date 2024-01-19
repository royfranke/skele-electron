import AppState from "./app-state.js";
import AppMenu from "./app-menu.js";
import AppInput from "./app-input.js";
import AppCamera from "./app-camera.js";
/* global Phaser */
/*
 * Gets injected into every scene
 */

export default class AppManager {

    state=null;
    input=null;
    menu=null;

    constructor(scene, state_name) {
       this.scene = scene;

       this.appState = new AppState(state_name);
       
       this.state = this.appState.valid_states[state_name]; /// State Config Object

       if (this.state.input) {
            this.input = new AppInput(this.scene);

            if (this.state.app_input) {
                this.input.initializeAppKeys();
            }
            if (this.state.prog_input) {
                this.input.initializeProgKeys();
            }
       }

       this.camera = new AppCamera(this.scene, this.state);

       if (this.state.menu) {
        this.menu = new AppMenu(this.scene, this.state.name, this.camera.view);
       }
       
       this.startScene();
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
        }
    }

    startScene () {
        const state = this.state;
        this.camera.start();

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
        setTimeout(() => {
            this.switchTo(switchToKey);
        }, state.fadeOut);
    }

    switchTo (state) {
        if (this.appState.validState(state)) {
            var new_scene = this.appState.valid_states[state].super;
            /// Context from which scene switch is called is important outside of scene
            this.scene.scene.start(new_scene);
        }
    }
}