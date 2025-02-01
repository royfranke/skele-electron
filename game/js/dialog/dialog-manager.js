import DialogFactory from "./dialog-factory.js";

/* Dialog Manager Class */

export default class DialogManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new DialogFactory(this.scene);
    }

    triggerDialog (id) {
        var dialog = this.getDialog(id);
        this.scene.manager.hud.hudDialog.tellDialogBox(dialog.text, dialog.next, dialog.trigger, dialog.court);
        this.scene.manager.hud.hudDialog.tellReplyBox(dialog.responses);

        if (dialog.trigger == 'QUEST') {
            var quest = this.scene.manager.quest.triggerQuest(dialog.quest);
            if (!quest) {
                this.scene.manager.hud.hudDialog.clearDialog();
                //Replace in the future with a hint text found in the quest
                this.scene.manager.hud.hudDialog.tellDialogBox('Ahh-- you have already been given this quest.');
                
                console.warn('Quest already given or completed');
            }
        }
    }

    getDialog (id) {
        return this.factory.getDialog(id);
    }

    

    
}