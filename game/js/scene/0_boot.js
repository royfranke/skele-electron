import PreloadManager from '../preload/preload-manager.js';
import { loadSettings } from '../settings/settings-store.js';
/**
 * Boot Scene
 */
export default class BootScene extends Phaser.Scene {
    constructor() {
        super("Boot");
    }

    preload() {
        this.preload = new PreloadManager(this); 
        this.preload.initialize();
        
    }

    create() {
        this.preload.initializeAnim();
        console.log("Boot Scene");

        // Settings must be merged into the cache before any scene reads them.
        loadSettings(this).then(() => {
            this.scene.stop("Boot");
            this.scene.start("Splash");
        });
    }

    update () {

    }
}
