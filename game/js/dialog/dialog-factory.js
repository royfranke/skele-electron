import DIALOGS from "../config/atlas/dialog.js";

/* Dialog Factory Class */

export default class DialogFactory {

    constructor() {
        this.valid_dialog = DIALOGS;
    }
    /// In the future I could add a logger for this that saves the dialog IDs that have already occurred

    getDialog (id) {
        if (this.validDialog(id)) {
            return this.valid_dialog[id];
        }
        return false;
    }

    validDialog (id) {
        if (this.valid_dialog.hasOwnProperty(id)) {
            return true;
        }
        else {
            console.warn("Nonvalid dialog id passed in dialog factory: "+id);
        }
    }

    discardDialog (dialog) {
        dialog.destroy();
    }

    
}