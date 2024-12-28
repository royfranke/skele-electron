import AudioFactory from "./audio-factory.js";

/* Audio Manager Class */

export default class AudioManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new AudioFactory(this.scene);

    }

    play (sound_key) {
        //var volume = this.scene.manager.settings.getSetting('volume_ui');
        var volume = 1;
        var sound = this.scene.sound.add(sound_key, {volume: volume});
        sound.play();
    }

}