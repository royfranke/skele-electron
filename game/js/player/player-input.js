export default class PlayerInput {

    paused = false;

    constructor(scene) {
        this.scene = scene;
        this.resetInputs();

    }

    resetInputs ()  {
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
        this.held = false;
        this.run = false;
    }

    update () {
        var input = this.scene.app.input.INPUT;
        this.up = input.UP.HOLD;
        this.down = input.DOWN.HOLD;
        this.right = input.RIGHT.HOLD;
        this.left = input.LEFT.HOLD;

        this.select = input.SELECT.TAP;
        this.more = input.MORE.TAP;

        if (this.up || this.down || this.right || this.left) {
            this.held = true;
        }
        else {
            this.held = false;
        }

        this.run = this.scene.app.input.INPUT.RUN.HOLD;

    }

    getFacing(facing) {
        var up = this.up || this.scene.app.input.INPUT.UP.TAP;
        var right = this.right || this.scene.app.input.INPUT.RIGHT.TAP;
        var down = this.down || this.scene.app.input.INPUT.DOWN.TAP;
        var left = this.left || this.scene.app.input.INPUT.LEFT.TAP;
        return this.scene.manager.utilities.getFacing(facing, up, right, down, left);
    }

}