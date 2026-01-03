
import SPRITE_DIR from "../config/sprite-dir.js";
import OBJECTS from "../config/atlas/objects.js";
import FXS from "../config/atlas/fxs.js";
import VEHICLES from "../config/atlas/vehicles.js";


export default class PreloadAnim {

  constructor(scene) {
    this.scene = scene;
  }

  initialize() {
    const anims = this.scene.anims;
    const states = SPRITE_DIR.STATES;
    const faces = SPRITE_DIR.FACES;

    const objects = OBJECTS;
    var used_keys = [];
    for (const [key, object] of Object.entries(objects)) {
      for (const [key, state] of Object.entries(object.states)) {
        if (state.frames.length > 0) {
          let state_frames = [];
          state.frames.forEach(function (frame) {
            state_frames.push({ key: 'OBJECTS', frame: frame });
          });
          var keyname = object.slug + "-" + state.name;
          if (!used_keys.includes(keyname)) {
            anims.create({
              key: keyname,
              frames: state_frames,
              frameRate: 8,
              repeat: 0,
            });
            used_keys.push(keyname);
          }
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

    /*
CAR_SEDAN_1: {
                  name: 'Sedan 1',
                  slug: 'CAR_SEDAN_1',
                  frames: {
                    n: ['CAR_SEDAN_1-6'],
                    ne: ['CAR_SEDAN_1-4'],
                    e: ['CAR_SEDAN_1-2'],
                    se: ['CAR_SEDAN_1-3'],
                    s: ['CAR_SEDAN_1-5'],
                  },
                  repeat: -1
              }
    */

    const vehicles = VEHICLES;
    for (const [key, vehicle] of Object.entries(vehicles)) {
      let state_frames = { n: [], ne: [], e: [], se: [], s: [] };
      for (const [key_dir, dir] of Object.entries(vehicle.frames)) {
        for (const frame of dir) {
          state_frames[key_dir].push({ key: 'VEHICLES', frame: frame });
        }

        anims.create({
          key: vehicle.slug + "-" + key_dir,
          frames: state_frames[key_dir],
          frameRate: 8,
          repeat: vehicle.repeat,
        });
      };

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
