import PreloadManager from '../preload/preload-manager.js';
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
        this.scene.stop("Boot");
        this.scene.start("Splash");
    }

    update () {

    }
}
