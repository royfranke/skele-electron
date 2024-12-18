import AudioFactory from "./audio-factory.js";

/* Audio Manager Class */

export default class AudioManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new AudioFactory(this.scene);
        //this.scene.textures.get('Audio');
    }

    playAudio (slug,_x,_y,delay=0) {
        return this.scene.time.delayedCall(delay, this.newAudio, [slug,_x,_y], this);
    }

    newAudio (slug,_x,_y) {
        return this.factory.newAudio(slug,_x,_y);
    }

    handleAudio (slug,_x,_y) {
        return this.factory.handleAudio(slug,_x,_y);
    }

}