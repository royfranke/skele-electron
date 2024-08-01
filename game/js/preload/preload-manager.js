import PRELOAD_IMAGE from "./preload-image.js";
import PRELOAD_SOUND from "./preload-sound.js";
import PRELOAD_ATLAS from "./preload-atlas.js";
import PRELOAD_JSON from "./preload-json.js";
import SPRITE_DIR from "../config/sprite-dir.js";
import PreloadAnim from "./preload-anim.js";

export default class PreloadManager{
  constructor(scene) {
    this.scene = scene;
    var self = this.scene;

    self.load.bitmapFont('SkeleNotebook', '../game/assets/fonts/SkeleNotebook16.png', '../game/assets/fonts/SkeleNotebook16.xml');
    self.load.bitmapFont('SkeleStreetSigns', '../game/assets/fonts/SkeleStreetSigns.png', '../game/assets/fonts/SkeleStreetSigns.xml');
    self.load.bitmapFont('SkeleWatch', '../game/assets/fonts/SkeleWatch.png', '../game/assets/fonts/SkeleWatch.xml');

    PRELOAD_IMAGE.forEach(function (image, index) {
      self.load.image(image.NAME, '../game/assets/'+image.PATH);
    });

    PRELOAD_SOUND.forEach(function (sound, index) {
      self.load.audio(sound.NAME, [ '../game/assets/'+sound.PATH ]);
    });

    PRELOAD_ATLAS.forEach(function (atlas, index) {
      self.load.atlas(atlas.NAME, '../game/assets/'+atlas.PATH.SPRITE, '../game/assets/'+atlas.PATH.JSON);
    });

    PRELOAD_JSON.forEach(function (record, index) {
      self.load.json(record.NAME, '../game/'+record.PATH.JSON);
    });

    this.preloadStateSprites();

  }

  preloadAnim () {
    this.anim = new PreloadAnim(this.scene);
  }


  preloadStateSprites () {
    const loading = this.scene.load;
    const states = SPRITE_DIR.STATES;
    states.forEach(function (state, index) {

      loading.spritesheet(
        "player-"+state,
        "../game/assets/spritesheets/skele_"+state+"-sheet.png",
        {
          frameWidth: 32,
          frameHeight: 32
        }
      );
    });
  }

}
