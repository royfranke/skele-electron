import DIALOG from "../config/atlas/dialog.js";
import Dialog from "./dialog.js";
import RESPONSES from "../config/atlas/dialog-responses.js";
/* Dialog Factory Class */

export default class DialogFactory {

    constructor(scene) {
        this.scene = scene;
        this.valid_dialog = DIALOG;
    }


    newDialog (slug,responses=[]) {
        if (this.validDialog(slug)) {
            var dialog = new Dialog(this.scene,this.valid_dialog[slug],responses);
            return dialog; /// Returns a non-sprite obj
        }
        return false;
    }

    validDialog (slug) {
        if (this.valid_dialog.hasOwnProperty(slug)) {
            return true;
        }
        else {
            console.warn("Nonvalid dialog slug passed in dialog factory: "+slug);
        }
    }

    discardDialog (dialog) {
        dialog.destroy();
    }

    
}