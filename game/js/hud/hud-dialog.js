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

    arrowRight () {
        if (this.currentReply != false) {
            let next = this.replyBox.dataset[this.selected].next;
            this.clearDialog();
            if (next != 0) {
                this.scene.manager.dialog.triggerDialog(next);
            }
            else {
                this.closeDialog();
            }
        }
    }

    select () {
        if (this.currentReply != false) {
            let next = this.replyBox.dataset[this.selected].next;
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
                var next = 0;
                var trigger = null;
                var court = null;

                if (this.dialogBox != null) {
                    next = this.dialogBox.dialog.next;
                    trigger = this.dialogBox.dialog.trigger;
                    if (trigger == 'COURT') {
                        court = this.dialogBox.dialog.court;
                    }
                    
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
        this.setSelected(1);
    }

    arrowUp () {
        this.setSelected(-1);
    }

    setSelected (selected) {
        if (this.currentReply != false) {
            if (this.content != null) {


                if (selected == 1) {
                    this.content = this.moveFirstToBack(this.content);
                    this.shiftReplies();
                    this.plunge([this.selector.down_arrow], this.reply_y + 18);
                }
                else if (selected == -1) {
                    this.content = this.moveLastToFront(this.content);
                    this.shiftReplies('+=8');
                    this.plunge([this.selector.down_arrow], this.reply_y + 18);
                }

                
            }
        }
    }

    shiftReplies (shift = '-=4') {
        if (this.replyBox != null) {
            let tween = this.scene.add.tween({
                targets: this.replyBox.replies,
                y: shift,
                duration: 500,
                ease: 'Sine.easeOut',
                repeat: 0
            });
            tween.on('complete', () => {
                if (this.replyBox != null) {
                    var drawn = this.drawReplies();
                    var replies = drawn.replies;
                    var dataset = drawn.dataset;
                    this.replyBox.replies = replies;
                    this.replyBox.dataset = dataset;
                }
            });

        }
    }
                

    moveFirstToBack(arr) {
        if (arr.length === 0) {
            return arr;
        }
        const firstItem = arr.shift();
        arr.push(firstItem);
        return arr;
      }

    moveLastToFront(arr) {
        if (arr.length === 0) {
          return arr;
        }
        const lastItem = arr.pop();
        arr.unshift(lastItem);
        return arr;
      }
    

    makeBitmapText (_x,_y, width, text, size, font="SkeleTalk") {
        let bitmap = this.factory.makeBitmapText(_x,_y, width, size, font);
        bitmap.setText(text);
        bitmap.setLineSpacing(8);
        return bitmap;
    }

    tellReplyBox (content=[{'text': 'Yes', 'next': 0},{'text': 'No', 'next': 0}]) {
        if (!this.currentReply && content.length > 0) {
            content.forEach((reply, index) => {
                reply.text = reply.text.replace('’', '\'');
            });
            this.replyBox = this.makeReplyBox(content);
            this.currentReply = true;
        }
        else {
            /// Place an X in the corner of the dialog to indicate close
            let _x = this.dialogBox.block.x + this.dialogBox.block.displayWidth - 32;
            let _y = this.dialogBox.block.y + this.dialogBox.block.displayHeight - 24;

            var close_block = this.makeHUDDownArrow(_x , _y, 'YELLOW');
            
            var close_button = this.makeBitmapText(_x + 5,_y - 6, 32, 'X',8,'SkeleNotebook');
            close_button.setTintFill(0x465e62);
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
        this.scene.events.emit('DIALOG_CLOSE');
        this.scene.manager.setFocus('PLAYER');
    }

    makeDialogBox () {
        let _x = this.view.left + this.view.margin.left + 88;
        let _y = this.view.bottom - (96 + this.view.margin.bottom);
        let block = this.makeBlock(_x,_y, 224, 96, 'BLOCK_MID_BEIGE');
        let portrait_block = this.makeBlock(_x - 40,_y, 32, 32, 'BLOCK_MID_YELLOW_FAT_BORDER');
        let frame = this.makeBlock(_x,_y, 224, 96, 'BLOCK_SHALLOW_YELLOW_FRAME');
        let dialog = this.makeBitmapText(_x + 16,_y + 16, 194, '', 8);
        return {block: block, dialog: dialog, frame: frame, portrait_block: portrait_block};
    }

    makeReplyBox (content=[{'text': 'Yes', 'next': 0},{'text': 'No', 'next': 0}]) {
        let _x = this.view.right - (132 + this.view.margin.right);
        let _y = this.view.bottom - (104 + this.view.margin.bottom);
       let container = this.makeBlock(_x,_y, 136, 96, 'BLOCK_MID_LILAC_FAT_BORDER');

        let blocks = [container];

        var next_y = _y + 12;

        var selector_arrow = this.makeHUDRightArrow(_x,next_y - 4, 'YELLOW');
        var down_arrow = this.makeHUDDownArrow(_x, next_y + 18, 'SHADOW');  
        this.flutter([down_arrow], 1000);
        this.selector = {selector_arrow, down_arrow};
        this.reply_y = next_y;
        this.content = content;
        var drawn = this.drawReplies();
        
        var replies = drawn.replies;
        var dataset = drawn.dataset;
        return {blocks: blocks, replies: replies, dataset: dataset};
    }

    drawReplies () {
        this.clearReplies();
        let _x = this.view.right - (132 + this.view.margin.right);
        let _y = this.reply_y;
        let replies = [];
        let dataset = [];
        let content = this.content;
        
        content.forEach((answer, index) => {
            let reply = this.makeBitmapText(_x + 20,_y, 88, answer.text, 8);
            let reply_height = reply.displayHeight + 16;
            
            dataset.push(answer);
            replies.push(reply);
            _y += reply_height;
        });
        return {replies, dataset};
    }

    addButtonIndicator(_x,_y, button="X") {
        let stack = this.makeStackIndicator(_x,_y);
        stack.text.setText(button);
        return stack;
    }

    clearDialog () {
        this.clearDialogBox();
        this.clearReplyBox();
        this.scene.manager.dialog.destroyListeners();
    }

    clearSelector () {
       this.selector.selector_arrow.destroy();
       this.selector.down_arrow.destroy();
       this.selector = null;
    }

    clearDialogBox () {
        if (this.currentDialog) {
            this.currentDialog = false;
            if (this.dialogBox != null) {
                if (this.dialogBox.block != undefined) {
                    this.dialogBox.block.destroy();
                }
                if (this.dialogBox.portrait_block != undefined) {
                    this.dialogBox.portrait_block.destroy();
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

    clearReplies () {
        if (this.replyBox != null) {
            this.replyBox.replies.forEach(reply => {
                reply.destroy();
            });
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
            this.clearSelector();
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