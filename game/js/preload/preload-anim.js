
import SPRITE_DIR from "../config/sprite-dir.js";
import OBJECTS from "../config/atlas/objects.js";
import FXS from "../config/atlas/fxs.js";

export default class PreloadAnim {
  constructor(scene) {

    this.scene = scene;

    const anims = this.scene.anims;

    const states = SPRITE_DIR.STATES;
    const faces = SPRITE_DIR.FACES;
    
    const objects = OBJECTS;
    for (const [key, object] of Object.entries(objects)) {
      for (const [key, state] of Object.entries(object.states)) {
        if (state.frames.length > 0) {
          let frames = [];
          state.frames.forEach(function (frame) {
            frames.push({ key: 'OBJECTS', frame: frame });
          });
            anims.create({
              key: object.slug+"-"+state.name,
              frames: frames,
              frameRate: 8,
              repeat: 0,
            });
            console.log('Created animation for '+object.slug+'-'+state.name);
          }
        }
    }


    const fxs = FXS;
    for (const [key, fx] of Object.entries(fxs)) {
        if (fx.frames.length > 0) {
          let frames = [];
          fx.frames.forEach(function (frame) {
            frames.push({ key: 'FX', frame: frame });
          });
            anims.create({
              key: fx.slug,
              frames: frames,
              frameRate: 8,
              repeat: fx.repeat,
            });
          } 
    }

    states.forEach(function (state, index) {
      faces.forEach(function (face, index) {
        anims.create({
          key: "player-"+state+"-"+face,
          frames: anims.generateFrameNumbers("player-"+state, 
           { start: SPRITE_DIR[state].ANIM[face].START, end: SPRITE_DIR[state].ANIM[face].END }
          ),
          frameRate: 8,
          repeat: -1,
        });
      });
    });

    anims.create({
      key: "action-marker",
      frames: anims.generateFrameNumbers("action-marker", 
       { start: 0, end: 3}
      ),
      frameRate: 8,
      repeat: -1,
    });

  }


}
