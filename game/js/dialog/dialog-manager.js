import DialogFactory from "./dialog-factory.js";

/* Dialog Manager Class */

export default class DialogManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new DialogFactory(this.scene);
    }

    triggerDialog (id) {
        var dialog = this.getDialog(id);
        this.scene.manager.hud.hudDialog.tellDialogBox(dialog.text);
        this.scene.manager.hud.hudDialog.tellReplyBox(dialog.responses);
    }

    getDialog (id) {
        return this.factory.getDialog(id);
    }

    

    
}