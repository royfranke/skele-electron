//import Courts from "./courts.js";
import HudCourt from "../hud/hud-court.js";
/* Courts Manager Class */
/* Think mini game gallery */

export default class CourtsManager {

    constructor(scene) {
        this.scene = scene;
        this.choices = ['ZENER','SOCKS','A','B'];
        this.selected = 0;
        
    }

    initialize () {
        this.hud = new HudCourt(this.scene);
        this.hud.initialize();
    }

    selectNext () {
        this.setSelected(this.selected+1);
    }

    selectPrevious () {
        this.setSelected(this.selected-1);
    }

    setSelected (selected=0) {
        if (selected >= this.choices.length) {
            selected = 0;
        }
        if (selected < 0) {
            selected = this.choices.length - 1;
        }
        this.last_selected = this.selected;
        this.selected = selected;
        this.hud.update(this.selected);
    }

    select () {

    }

    back () {

    }


}
    