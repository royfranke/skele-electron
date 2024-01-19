export default class AppInput {

  constructor(scene) {
    this.scene = scene;
    this.INPUT = {};
    this.initialized_app = false;
    this.initialized_prog = false;
  }

  initializeAppKeys () {
    const { KeyCodes } = Phaser.Input.Keyboard;
    this.APP_KEYS = this.scene.input.keyboard.addKeys({
        UP:          KeyCodes.UP,
        RIGHT:       KeyCodes.RIGHT,
        LEFT:        KeyCodes.LEFT,
        DOWN:        KeyCodes.DOWN,
        SELECT:      KeyCodes.X,
        BACK:        KeyCodes.Z,
    });
    for (const [key, value] of Object.entries(this.APP_KEYS)) {
        this.INPUT[key] = {TAP: false, HOLD: false};
    }
    this.initialized_app = true;
  }
/* TODO: Make programable keys set from settings file */
  initializeProgKeys () {
    const { KeyCodes } = Phaser.Input.Keyboard;
    this.PROG_KEYS = this.scene.input.keyboard.addKeys({
        PAUSE:       KeyCodes.SPACE,
        INVENTORY:   KeyCodes.I,
        MAP:         KeyCodes.M,
        MORE:        KeyCodes.C,
        RUN:         KeyCodes.SHIFT,
        HOP:         KeyCodes.V
    });
    for (const [key, value] of Object.entries(this.PROG_KEYS)) {
        this.INPUT[key] = {TAP: false, HOLD: false};
    }
    this.initialized_prog = true;
  }

  update() {
    if (this.initialized_app) {
        for (const [key, value] of Object.entries(this.APP_KEYS)) {
            this.INPUT[key].TAP = Phaser.Input.Keyboard.JustDown(value);
            this.INPUT[key].HOLD = value.isDown;
        }
    }
    if (this.initialized_prog) {
        for (const [key, value] of Object.entries(this.PROG_KEYS)) {
            this.INPUT[key].TAP = Phaser.Input.Keyboard.JustDown(value);
            this.INPUT[key].HOLD = value.isDown;
        }
    }
  }

  tap (key) {
    return this.INPUT[key].TAP;
  }

  hold (key) {
    return this.INPUT[key].HOLD;
  }

}
