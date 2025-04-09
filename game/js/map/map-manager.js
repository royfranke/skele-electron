import Map from "./map.js";
/* Map Manager Class */

export default class MapManager {

    constructor(scene) {
        this.scene = scene;
        this.map = new Map(this.scene);
    }

    listen () {
        var callback_left = function () {
            this.move('LEFT');
        }
        var callback_right = function () {
            this.move('RIGHT');
        }
        var callback_up = function () {
            this.move('UP');
        }
        var callback_down = function () {
            this.move('DOWN');
        }
        var callback_back = function () {
            this.back();
        }
        this.scene.events.addListener('INPUT_LEFT_MAP', callback_left, this);
        this.scene.events.addListener('INPUT_RIGHT_MAP', callback_right, this);
        this.scene.events.addListener('INPUT_UP_MAP', callback_up, this);
        this.scene.events.addListener('INPUT_DOWN_MAP', callback_down, this);
        this.scene.events.addListener('INPUT_BACK_MAP', callback_back, this);
   }

   destroyListeners () {
        this.scene.events.off('INPUT_LEFT_MAP');
        this.scene.events.off('INPUT_RIGHT_MAP');
        this.scene.events.off('INPUT_UP_MAP');
        this.scene.events.off('INPUT_DOWN_MAP');
        this.scene.events.off('INPUT_BACK_MAP');
   }

    move(direction) {
          //this.scene.manager.hud.hudMap.move(direction);
          if (direction == 'DOWN') {
            this.scene.manager.hud.hudMap.arrow_down.setFrame('HUD_ARROW_BLUE_DOWN');

            this.scene.time.delayedCall(250, function () {
                this.scene.manager.hud.hudMap.arrow_down.setFrame('HUD_ARROW_SHADOW_DOWN');
            }
            , [], this);
          }
        
    }

    back () {
        this.scene.manager.setFocus('PLAYER');  
    }
}
