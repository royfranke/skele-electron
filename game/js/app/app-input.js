/*
 * Manages application input
 */

export default class AppInput {

  constructor(scene) {
    this.scene = scene;
    this.INPUT = {};
    this.config = {};
    this.available = {};
    this.initialized = false;
    this.available_initialized = false;
    var config = this.scene.cache.json.get('SETTINGSCONFIG');
    this.configJSON = config.INPUT;
    this.bindings = this.configJSON.CUSTOM || this.configJSON.DEFAULT;

  }
  

  initializeAppKeys () {
    const { KeyCodes } = Phaser.Input.Keyboard;

    for (const [key, value] of Object.entries(this.bindings)) {
      this.config[key] = KeyCodes[value];
    }

    this.APP_KEYS = this.scene.input.keyboard.addKeys(this.config);
    for (const [key, value] of Object.entries(this.APP_KEYS)) {
        this.INPUT[key] = {TAP: false, HOLD: false};
    }
    this.initialized = true;
  }

  initializeAvailableKeys () {
    const { KeyCodes } = Phaser.Input.Keyboard;

    for (const [key, value] of Object.entries(this.configJSON.AVAILABLE)) {
      this.available[key] = KeyCodes[value];
    }

    this.AVAIL_KEYS = this.scene.input.keyboard.addKeys(this.available);
    for (const [key, value] of Object.entries(this.AVAIL_KEYS)) {
        this.INPUT[key] = {TAP: false, HOLD: false};
    }
    this.available_initialized = true;
  }

  /* Re-reads bindings so a rebind takes effect without leaving the scene. */
  refreshBindings () {
    const had_app_keys = this.initialized;
    const had_avail_keys = this.available_initialized;

    this.scene.input.keyboard.removeAllKeys(true);
    this.INPUT = {};
    this.config = {};
    this.available = {};
    this.initialized = false;
    this.available_initialized = false;

    const config = this.scene.cache.json.get('SETTINGSCONFIG');
    this.configJSON = config.INPUT;
    this.bindings = this.configJSON.CUSTOM || this.configJSON.DEFAULT;

    if (had_app_keys) {
      this.initializeAppKeys();
    }
    if (had_avail_keys) {
      this.initializeAvailableKeys();
    }
  }

  update() {
    if (this.initialized) {
        for (var [key, value] of Object.entries(this.APP_KEYS)) {
            this.INPUT[key].TAP = Phaser.Input.Keyboard.JustDown(value);
            this.INPUT[key].HOLD = value.isDown;
        }
    }
    if (this.available_initialized) {
      for (var [key, value] of Object.entries(this.AVAIL_KEYS)) {
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
