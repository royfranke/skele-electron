
import SPRITE_DIR from "../config/sprite-dir.js";
import OBJECTS from "../config/atlas/objects.js";
import FXS from "../config/atlas/fxs.js";

export default class PreloadAnim {

  constructor(scene) {
    this.scene = scene;
  }

  initialize() {
    const anims = this.scene.anims;
    const states = SPRITE_DIR.STATES;
    const faces = SPRITE_DIR.FACES;

    const objects = OBJECTS;
    for (const [key, object] of Object.entries(objects)) {
      for (const [key, state] of Object.entries(object.states)) {
        if (state.frames.length > 0) {
          let state_frames = [];
          state.frames.forEach(function (frame) {
            state_frames.push({ key: 'OBJECTS', frame: frame });
          });
          anims.create({
            key: object.slug + "-" + state.name,
            frames: state_frames,
            frameRate: 8,
            repeat: 0,
          });
        }
      }
    }


    const fxs = FXS;
    for (const [key, fx] of Object.entries(fxs)) {
      if (fx.frames.length > 0) {
        let state_frames = [];
        fx.frames.forEach(function (frame) {
          state_frames.push({ key: 'FX', frame: frame });
        });
        anims.create({
          key: fx.slug,
          frames: state_frames,
          frameRate: 8,
          repeat: fx.repeat,
        });
      }
    }

    states.forEach(function (state, index) {
      faces.forEach(function (face, index) {
        anims.create({
          key: "player-" + state + "-" + face,
          frames: anims.generateFrameNumbers("player-" + state,
            { start: SPRITE_DIR[state].ANIM[face].START, end: SPRITE_DIR[state].ANIM[face].END }
          ),
          frameRate: 8,
          repeat: -1,
        });
      });
    });
  }


}
