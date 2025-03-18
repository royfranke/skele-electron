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
            console.log(quest);
            if (!quest) {
                this.scene.manager.hud.hudDialog.clearDialog();
                //Replace in the future with a hint text found in the quest
                this.scene.manager.hud.hudDialog.tellDialogBox('Ahh-- you have already been given this quest.');
            }
            if (quest == 'CLEAR_SPACE') {
                this.scene.manager.hud.hudDialog.clearDialog();
                this.scene.manager.hud.hudDialog.tellDialogBox('Come back when your hands are not full.');
            }
        }
        this.listen();
    }

    getDialog (id) {
        return this.factory.getDialog(id);
    }

    listen () {
        var callback_up = function () {
            this.scene.manager.hud.hudDialog.arrowUp();
        }
        var callback_down = function () {
            this.scene.manager.hud.hudDialog.arrowDown();
        }
        var callback_select = function () {
            this.scene.manager.hud.hudDialog.select();
        }
        this.scene.events.addListener('INPUT_UP_DIALOG', callback_up, this);
        this.scene.events.addListener('INPUT_DOWN_DIALOG', callback_down, this);
        this.scene.events.addListener('INPUT_SELECT_DIALOG', callback_select, this);
        
   }

   destroyListeners () {
        this.scene.events.off('INPUT_UP_DIALOG');
        this.scene.events.off('INPUT_DOWN_DIALOG');
        this.scene.events.off('INPUT_SELECT_DIALOG');
   }

    
}