import DialogFactory from "./dialog-factory.js";

/* Dialog Manager Class */

export default class DialogManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new DialogFactory(this.scene);
    }

    triggerDialog (id) {
        var dialog = this.getDialog(id);
        this.scene.manager.hud.hudDialog.tellDialogBox(dialog.text, dialog.next);
        this.scene.manager.hud.hudDialog.tellReplyBox(dialog.responses);

        if (dialog.trigger == 'QUEST') {
            this.scene.manager.quest.triggerQuest(dialog.quest);
        }
    }

    getDialog (id) {
        return this.factory.getDialog(id);
    }

    

    
}