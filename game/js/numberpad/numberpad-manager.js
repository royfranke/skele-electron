
/* NumberPad Cards Manager Class */

export default class NumberPadManager {

    constructor(scene, keys) {
        this.scene = scene;
        this.keys = keys;
        this.string = '';
        this.calling = false;
    }

    reset () {
        this.string = '';
        this.calling = false;
    }

    pressKey (key) {
        this.scene.events.emit('INPUT_NUMBERPAD', key);
        this.scene.manager.hud.hudSound.play('PHONE_'+key);
        this.string += key;
        if (this.string.length >= 7 && !this.calling) {
            this.calling = true;
            this.scene.events.emit('CALL_PHONE', this.string);
        }
    }

    listen () {

   }

   destroyListeners () {
        this.scene.events.off('INPUT_NUMBERPAD');
   }

}
