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
        this.replyBox = null;
        this.dialogBox = null;
        this.closure = null;
        this.last_selected = -1;
        this.selected = 0;
        this.talking = null;
    }

    select () {
        if (this.currentReply != false) {
            let next = this.replyBox.dataset[this.selected].next;
            console.log('----------'+next);
            this.clearDialog();
            if (next != 0) {
                this.scene.manager.dialog.triggerDialog(next);
            }
            else {
                this.closeDialog();
            }
        }
        else {
            /// First change the frame of the button to indicate selection
            // then time out the close dialog
            if (this.replyBox != null) {
                var selectors = this.replyBox.selectors;
                
                this.setSelectorSelected(selectors[this.selected]);

                this.scene.time.addEvent({
                    callback: () => {
                        this.closeDialog();
                    },
                    delay: 1000
                });
            }
            else {
                let next = this.dialogBox.dialog.next;
                let trigger = this.dialogBox.dialog.trigger;
                var court = null;
                if (trigger == 'COURT') {
                    court = this.dialogBox.dialog.court;
                }
                this.clearDialog();
                if (next != 0) {
                    this.scene.manager.dialog.triggerDialog(next);
                }
                else {
                            
                    this.closeDialog();
                    if (court != null) {
                        this.scene.manager.setFocus(court);
                    }
                }
            }
        }
        return null;
    }

    arrowDown () {
        this.setSelected(this.selected + 1);
    }

    arrowUp () {
        this.setSelected(this.selected - 1);
    }

    makeBitmapText (_x,_y, width, text, size, font="SkeleTalk") {
        let bitmap = this.factory.makeBitmapText(_x,_y, width, size, font);
        bitmap.setText(text);
        bitmap.setLineSpacing(8);
        return bitmap;
    }

    tellReplyBox (content=[{'text': 'Yes', 'next': 0},{'text': 'No', 'next': 0}]) {
        if (!this.currentReply && content.length > 0) {
            this.replyBox = this.makeReplyBox(content);
            this.currentReply = true;
        }
        else {
            /// Place an X in the corner of the dialog to indicate close
            let _x = this.view.left + 304;
            let _y = this.view.bottom - (32 + this.view.margin.bottom);
            var close_block = this.makeBlock(_x , _y, 24, 24, 'BLOCK_DEEP_ORANGE');
            var close_button = this.makeBitmapText(_x + 8,_y + 4, 32, 'X', 16,'SkeleButton');
            this.closure = {block:close_block,button:close_button};
            this.flutter([close_block,close_button], 1000);
        }
    }

    focusDialog() {
        console.log("Focusing dialog");
    }

    tellDialogBox (content, next=0, trigger=null, court=null) {
        if (!this.currentDialog) {
            this.currentDialog = true;
            this.scene.manager.setFocus('DIALOG');
            this.dialogBox = this.makeDialogBox();
            this.dialogBox.dialog.next = next;
            this.dialogBox.dialog.trigger = trigger;
            this.dialogBox.dialog.court = court;
            // replace ’ with \'
            content = content.replace('’', '\'');
            /// Break the dialog up by word
            let words = content.split(' ');
            
            const length = words.length;
            let i = 0;
            let dialog = this.dialogBox.dialog;
            this.talking = this.scene.time.addEvent({
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
                delay: 75
            });
        
        }
    }

    closeDialog () {
        this.clearDialog();
        this.scene.manager.setFocus('PLAYER');
    }

    makeDialogBox () {
        let _x = this.view.left + 112;
        let _y = this.view.bottom - (96 + this.view.margin.bottom);
        let block = this.makeBlock(_x,_y, 224, 96, 'BLOCK_MID_BEIGE');
        let frame = this.makeBlock(_x,_y, 224, 96, 'BLOCK_SHALLOW_YELLOW_FRAME');
        let dialog = this.makeBitmapText(_x + 16,_y + 16, 194, '', 8);
        return {block: block, dialog: dialog, frame: frame};
    }

    makeReplyBox (content=[{'text': 'Yes', 'next': 0},{'text': 'No', 'next': 0}]) {
        let _x = this.view.left + 352;
        let _y = this.view.bottom - (104 + this.view.margin.bottom);
        //let block = this.makeBlock(_x,_y, 120, 96, 'BLOCK_MID_YELLOW_BORDER');
        let replies = [];
        let blocks = [];
        let selectors = [];
        let dataset = [];
        content.forEach((answer, index) => {
            let reply = this.makeBitmapText(_x + 16,_y + 8 + (index * 32), 88, answer.text, 8);
            dataset.push(answer);
            replies.push(reply);
            blocks.push(this.makeBlock(_x,_y + (index * 32), 120, reply.displayHeight + 16, 'BLOCK_MID_DARK_BLUE'));
            var selector_block = this.makeBlock(_x - 24,_y + (index * 32), 24, reply.displayHeight + 16, 'BLOCK_DEEP_ORANGE_LEFT');
            var selector_button = this.makeBitmapText(_x - 16,_y + 4 + (index * 32), 32, 'X', 16,'SkeleButton');
            var selector_frame = this.makeBlock(_x,_y + (index * 32), 120, reply.displayHeight + 16, 'BLOCK_MID_MOONSTONE_RIGHT');
            
            
            var selector = {selector_block, selector_button, selector_frame};

            if (index > 0) {
                this.setSelectorVisible(selector,false);
            }

            selectors.push(selector);


        });
        return {blocks: blocks, replies: replies, selectors: selectors, dataset: dataset};
    }

    setSelectorVisible (selector, visible) {
        selector.selector_block.setVisible(visible);
        selector.selector_button.setVisible(visible);
        selector.selector_frame.setVisible(visible);
    }

    setSelectorSelected (selector) {
        //selector.selector_block.setTexture('UI', 'BLOCK_MID_LILAC');
        let visible = false;
        selector.selector_button.setVisible(visible);
        selector.selector_frame.setVisible(visible);
    }

    setSelected (selected=0) {
        if (this.replyBox != null) {
            if (selected >= this.replyBox.replies.length) {
                selected = 0;
            }
            if (selected < 0) {
                selected = this.replyBox.replies.length - 1;
            }
            this.last_selected = this.selected;
            this.selected = selected;
        
            var selectors = this.replyBox.selectors;
            for (let i = 0; i < selectors.length; i++) {
                if (i == selected) {
                    this.setSelectorVisible(selectors[i],true);
                }
                else {
                    this.setSelectorVisible(selectors[i],false);
                }
            }
        }
    }

    clearDialog () {
        this.clearDialogBox();
        this.clearReplyBox();
        this.scene.manager.dialog.destroyListeners();
    }

    clearSelector (selector) {
        selector.selector_block.destroy();
        selector.selector_button.destroy();
        selector.selector_frame.destroy();
    }

    clearDialogBox () {
        if (this.currentDialog) {
            this.currentDialog = false;
            if (this.dialogBox != null) {
                if (this.dialogBox.block != undefined) {
                    this.dialogBox.block.destroy();
                }
                if (this.dialogBox.dialog != undefined) {
                    this.dialogBox.dialog.destroy();
                }
                if (this.dialogBox.frame != undefined) {
                    this.dialogBox.frame.destroy();
                }
                this.dialogBox = null;
            }
            this.talking.remove();
        }
    }

    clearReplyBox () {
        if (this.currentReply) {
            this.currentReply = false;
            this.replyBox.blocks.forEach(block=> {
                block.destroy();
            });
            this.replyBox.replies.forEach(reply => {
                reply.destroy();
            });
            this.replyBox.selectors.forEach(selector => {
                this.clearSelector(selector);
            });
            this.replyBox = null;
        }
        else {
            if (this.closure != null) {
                this.closure.block.destroy();
                this.closure.button.destroy();
                this.closure = null;
            }
        }
    }

}