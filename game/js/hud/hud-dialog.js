/*
Use this class to show, hide, build, and destroy dialog containers and their contents.
A dialog container is a nine slice block with a div containing text that is followed by a temporary div that allows incoming text to be animated/tweened by different effects.

*/

export default class HudDialog {
    constructor(scene, factory) {
        this.scene = scene;
        this.factory = factory;
        this.currentDialog = false;
        this.currentReply = false;
        this.view = this.scene.manager.getView();
    }

    makeBlock(_x, _y, width = 32, height = 32, frameName = 'HAND_UNFOCUSED') {
        return this.factory.makeBlock(_x, _y, width, height, frameName);
    }

    tellReplyBox (content) {
        if (!this.currentReply) {
            let box = this.addReplyBox();
            box.setText(content);
            this.currentReply = true;
        }
    }

    tellDialogBox (content) {
        if (!this.currentDialog) {
            let box = this.addDialogBox();
            box.setText(content);
            this.currentDialog = true;
        }
    }

    addDialogBox () {
        let _x = this.view.left + 112;
        let _y = this.view.bottom - (96 + this.view.margin.bottom);
        this.makeBlock(_x,_y, 224, 96);
        let dialogBox = this.scene.add.dom(_x,_y, 'div','', 'Dialog').setOrigin(0).setScrollFactor(0).setClassName('dialog-text');
        
          this.scene.time.addEvent({
            delay: 3000,
            callback: ()=>{
                //dialogBox.destroy();
                //this.currentDialog = false;
            }
        });
        return dialogBox;
    }

    addReplyBox () {
        let _x = this.view.left + 112 + 232;
        let _y = this.view.bottom - (96 + this.view.margin.bottom);

        this.makeBlock(_x,_y, 120, 96);
        let replyBox = this.scene.add.dom(_x,_y, 'div','', 'Reply').setOrigin(0).setScrollFactor(0).setClassName('reply-text');
        
          this.scene.time.addEvent({
            delay: 3000,
            callback: ()=>{
                //replyBox.destroy();
                //this.currentReply = false;
            }
        });
        return replyBox;
    }

}