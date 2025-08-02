
import PRELOAD_SOUND from "../config/atlas/audio.js";
/* global Phaser */
/*
 *  HUD sound effects
 */

export default class HudSound {

    constructor(scene) {
        this.scene = scene;

    }

    play (sound_slug, repeat=0, repeat_delay=0) {
        //var volume = this.scene.manager.settings.getSetting('volume_ui');
        var volume = 1;
        var self = this;
        PRELOAD_SOUND.forEach(function (sound, index) {
            if (sound.NAME === sound_slug) {
                let available = sound.FILES.length;
                let random = Phaser.Math.Between(0, available-1);
                let sound_key = sound.NAME+'_'+random;
                let new_sound = self.scene.sound.add(sound_key, {volume: volume});

                if (repeat > 0) {
                    let timeline = self.scene.add.timeline([

                        {
                    
                            at: repeat_delay,
                    
                            run: () => { new_sound.play(); },
                        },
                    ]);
                    timeline.repeat(repeat).play();
                    return timeline;
                }
                else {
                    new_sound.play();
                }
                return new_sound;
                
            }
        });
       
    }
    
}