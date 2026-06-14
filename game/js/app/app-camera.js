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
         this.irisCoverRect = null;
         this.irisCoverCircle = null;

         // If this state uses iris-in, immediately place a full cover so
         // world assembly and save-position corrections are never visible.
         if (this.state.irisIn != undefined) {
                this.prepareIrisCover();
         }
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
        const irisDelay = (this.scene?.place === 'exterior')
            ? (Number(this.scene?.irisInDelayMs ?? this.state?.irisDelay ?? 0) || 0)
            : 0;
        if (this.state.fadeIn) {
            this.camera.fadeIn(this.state.fadeIn, 75, 66, 74);
        }
        if (this.state.irisIn != undefined) {
            this.irisIn(this.state.irisIn, irisDelay);
        }
    }



    wake () {
        const irisDelay = (this.scene?.place === 'exterior')
            ? (Number(this.scene?.irisInDelayMs ?? this.state?.irisDelay ?? 0) || 0)
            : 0;
        if (this.state.fadeIn) {
            this.camera.fadeIn(this.state.fadeIn, 75, 66, 74);
        }
        else if (this.state.irisIn != undefined) {
            this.irisIn(this.state.irisIn, irisDelay);
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
    
    prepareIrisCover () {
        if (this.irisCoverRect && this.irisCoverCircle) {
            return;
        }

        const rect = this.scene.add.rectangle(this.view.left, this.view.top, this.view.width, this.view.height, 0x4b424a, 1)
            .setOrigin(0)
            .setDepth(50000)
            .setScrollFactor(0);

        const circle = this.scene.add.circle(this.view.center.x, this.view.center.y, 20, 0x4b424a)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setScale(0.0001);

        const mask = new Phaser.Display.Masks.BitmapMask(this.scene, circle);
        mask.invertAlpha = true;
        rect.setMask(mask);

        this.irisCoverRect = rect;
        this.irisCoverCircle = circle;
    }

    irisIn (duration=0, delay=0) {
        this.prepareIrisCover();
        const rect = this.irisCoverRect;
        const circle = this.irisCoverCircle;

        if (!rect || !circle) {
            return;
        }

        circle.setScale(0.0001);

        this.scene.add.tween({
            targets: circle,
            scale: 16,
            duration: duration > 0 ? duration : 2000,
            delay: delay > 0 ? delay : 0,
            yoyo: false,
            ease: 'Sine.easeIn',
            onComplete: () => {
                try { rect.destroy(); } catch (e) {}
                try { circle.destroy(); } catch (e) {}
                this.irisCoverRect = null;
                this.irisCoverCircle = null;
            }
        });
    }

    setKeyLightBackground (color, opacity=0.25) {
        if (color == null || color == undefined) {
            color = '0x4b424a';
        }

        console.log("Setting keylight background to "+color);
        //this.camera.setBackgroundColor(color);
        if (this.background != null) {
            this.background.destroy();
        }
        this.background = this.scene.add.rectangle(this.view.left, this.view.top, this.view.width, this.view.height, color, opacity).setOrigin(0).setDepth(0).setScrollFactor(0);
    }

}