import AUDIO from "../config/atlas/audio.js";
/* Audio Factory Class */

export default class AudioFactory {

    constructor(scene) {
        this.scene = scene;
        this.valid_audio = AUDIO;
    }


    validAudio (slug) {
        if (this.valid_audio.hasOwnProperty(slug)) {
            return true;
        }
        else {
            console.warn("Nonvalid audio slug passed in audio factory: "+slug);
        }
    }
    
}