
/* global Phaser */
/*
 *  HUD sound effects
 */

export default class HudSound {

    constructor(scene) {
        this.scene = scene;

    }

    play (sound_key) {
        var sound = this.scene.sound.add(sound_key);
       sound.play();
    }
    
}