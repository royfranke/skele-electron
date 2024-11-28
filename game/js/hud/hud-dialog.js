import HudCommon from "./hud-common.js";

/*
Use this class to show, hide, build, and destroy dialog containers and their contents.

*/
export default class HudDialog extends HudCommon {
    constructor(scene) {
        super(scene);
    }  

    initialize() {
        this.currentDialog = false;
        this.currentReply = false;
    }

    makeBitmapText (_x,_y, width, text, size, font="SkeleTalk") {
        let bitmap = this.factory.makeBitmapText(_x,_y, width, size, font);
        bitmap.setText(text);
        bitmap.setLineSpacing(8);
        return bitmap;
    }

    tellReplyBox (content) {
        if (!this.currentReply) {
            let box = this.makeReplyBox();
            box.reply.setText(content);
            this.currentReply = true;
        }
    }

    tellDialogBox (content) {
        if (!this.currentDialog) {
            this.currentDialog = true;
            let ui = this.makeDialogBox();

            /// Break the dialog up by word
            let words = content.split(' ');
            const length = words.length;
            let i = 0;
            let dialog = ui.dialog;
            this.scene.time.addEvent({
                callback: () => {
                    // Check if the last character is a period
                    if (dialog.text != '') {
                        if (dialog.text.slice(-1) == '.') {
                            dialog.setText(dialog.text + '\n');
                        }
                        else {
                            dialog.setText(dialog.text + ' ');
                        }
                    }
                    dialog.setText(dialog.text + words[i]);

                    //dialog.setText(content.slice(0,i));
                    ++i
                },
                repeat: length - 1,
                delay: 125
            });
        
        }
    }

    makeDialogBox () {
        let _x = this.view.left + 112;
        let _y = this.view.bottom - (96 + this.view.margin.bottom);
        let block = this.makeBlock(_x,_y, 224, 96);
        let dialog = this.makeBitmapText(_x + 16,_y + 16, 194, '', 8);
        return {block: block, dialog: dialog};
    }

    makeReplyBox () {
        let _x = this.view.left + 112 + 232;
        let _y = this.view.bottom - (96 + this.view.margin.bottom);
        let block = this.makeBlock(_x,_y, 120, 96, 'BLOCK_MID_YELLOW_BORDER');
        let reply = this.makeBitmapText(_x + 16,_y + 16, 88, '', 8); 
        return {block: block, reply: reply};
    }

}