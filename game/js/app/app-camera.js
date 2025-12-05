import KEYLIGHTS from "../config/key-light.js";
/*
 * Manages application viewport
 * Including: camera, scale, fade, view, position, follow, bounds
 */

export default class AppCamera {

    constructor(scene, state) {
       this.scene = scene;
       this.state = state;
       this.camera = this.scene.cameras.main;
       this.camera.setZoom(2);
       this.setView();
    }

    getView () {
        return this.view;
    }

    setView () {
        this.view = {
            top: this.camera.displayHeight/2,
            right: this.camera.displayWidth*1.5,
            bottom: this.camera.displayHeight*1.5,
            left: this.camera.displayWidth/2,
            margin: {
                top: 16,
                right: 16,
                bottom: 16,
                left: 16
            }
        }

        this.view.height = this.view.bottom - this.view.top;
        this.view.windowHeight = this.view.height - this.view.margin.top - this.view.margin.bottom;
        this.view.width = this.view.right - this.view.left;
        this.view.center = {
            x: this.view.left + (this.view.width/2),
            y: this.view.top + (this.view.height/2)
        }
    }

    start () {
        this.camera.setBackgroundColor('#4b424a');
        if (this.state.fadeIn) {
            this.camera.fadeIn(this.state.fadeIn, 75, 66, 74);
        }
        if (this.state.irisIn != undefined) {
            this.irisIn(this.state.irisIn);
        }
    }



    wake () {
        this.camera.setBackgroundColor('#4b424a');
        if (this.state.fadeIn) {
            this.camera.fadeIn(this.state.fadeIn, 75, 66, 74);
        }
        else if (this.state.irisIn != undefined) {
            this.irisIn(this.state.irisIn);
        }
        else {
            this.camera.fadeIn(0, 75, 66, 74);
        }
    }

    end () {
        if (this.state.fadeOut) {
            this.camera.fadeOut(this.state.fadeOut, 75, 66, 74);
        }      
    }

    follow (followMe) {
        /// TODO: return to make a smoother follow
        this.camera.startFollow(followMe,true, 1, 1, -32, -16);
        
        this.camera.setDeadzone(80,16);
    }

    setBounds (width, height) {
        this.camera.setBounds(0, 0, width, height);
    }
    
    irisIn (duration=0) {
        // Add rectangle that covers the viewport
        var rect = this.scene.add.rectangle(this.view.left, this.view.top, this.view.width, this.view.height, 0x4b424a, 1).setOrigin(0).setDepth(50000).setScrollFactor(0);

        var circle = this.scene.add.circle(this.view.center.x, this.view.center.y, 20, 0x4b424a).setOrigin(.5).setScrollFactor(0);
        var mask = new Phaser.Display.Masks.BitmapMask(this.scene, circle);
        mask.invertAlpha = true;
        rect.setMask(mask);

        const tween = this.scene.add.tween({
            targets: [rect, circle],
            scale: 16,
            duration: 2000,
            yoyo: false,
            ease: 'Sine.easeIn'
        });
    }

    setKeyLightBackground (keylight) {
        let color = KEYLIGHTS[keylight].reflection_color;
        if (color == null || color == undefined) {
            color = '#4b424a';
        }
        /// if first two characters are "0x", convert to #
        if (color.substring(0,2) == '0x') {
            color = '#' + color.substring(2);
        }
        console.log("Setting keylight background to "+color);
        this.camera.setBackgroundColor(color);
    }

}