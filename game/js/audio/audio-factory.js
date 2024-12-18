import AUDIO from "../config/atlas/audios.js";
/* Audio Factory Class */

export default class AudioFactory {

    constructor(scene) {
        this.scene = scene;
        this.valid_audio = AUDIO;
    }

    // For when you want to return the Audio instead of self destroying
    handleAudio (slug, _x, _y) {
        if (this.validAudio(slug)) {
            
            var audio = this.scene.add.sprite(_x, _y, "Audio", 0);
            audio.setDepth(_y + audio.height);
            audio.anims.play(slug, false);
            
            return audio;
        }
        return false;
    }

    // For when you want to return the Audio instead of self destroying
    handleHudAudio (slug, _x, _y) {
        if (this.validAudio(slug)) {
            
            var audio = this.scene.add.sprite(_x, _y, "Audio", 0);
            audio.setDepth(100300).setOrigin(0).setScrollFactor(0);
            audio.anims.play(slug, false);
            
            return audio;
        }
        return false;
    }

    newAudio (slug, _x, _y) {
        if (this.validAudio(slug)) {
            
            var audio = this.scene.add.sprite(_x, _y, "Audio", 0);
            audio.setDepth(_y + audio.height);
            audio.anims.play(slug, false);
            audio.once('animationcomplete', () => {
                audio.destroy()
            })
            
            return true;
        }
        return false;
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