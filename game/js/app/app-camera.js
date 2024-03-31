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
        this.view.width = this.view.right - this.view.left;
    }

    start () {
        this.camera.setBackgroundColor('#4b424a');
        this.camera.fadeIn(this.state.fadeIn, 0, 0, 0);
    }

    end () {
        this.camera.fadeOut(this.state.fadeOut, 0, 0, 0);        
    }

    follow (followMe) {
        /// TODO: return to make a smoother follow
        this.camera.startFollow(followMe,true, 1, 1, -32, -32);
        this.camera.setDeadzone(96,16);
    }

    setBounds (width, height) {
        this.camera.setBounds(0, 0, width, height);
    }

    //create transition iris open and close effects for between scenes/rooms

}