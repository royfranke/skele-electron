import PRELOAD_IMAGE from "./preload-image.js";
import PRELOAD_SOUND from "./preload-sound.js";
import PRELOAD_ATLAS from "./preload-atlas.js";
import SPRITE_DIR from "../config/sprite-dir.js";
import PreloadAnim from "./preload-anim.js";

export default class Preloader{
  constructor(scene) {
    this.scene = scene;
    var self = this.scene;

    PRELOAD_IMAGE.forEach(function (image, index) {
      self.load.image(image.NAME, '../game/assets/'+image.PATH);
    });

    PRELOAD_SOUND.forEach(function (sound, index) {
      self.load.audio(sound.NAME, [ '../game/assets/'+sound.PATH ]);
    });

    PRELOAD_ATLAS.forEach(function (atlas, index) {
      self.load.atlas(atlas.NAME, '../game/assets/'+atlas.PATH.SPRITE, '../game/assets/'+atlas.PATH.JSON);
    });

    this.preloadStateSprites();
    this.preloadInventorySprites();
  

    this.scene.load.spritesheet(
      "dust",
      "../game/assets/spritesheets/dust_1-sheet.png",
      {
        frameWidth: 32,
        frameHeight: 12
      }
    );

    this.scene.load.spritesheet(
      "fx_item",
      "../game/assets/spritesheets/fx_item_1.png",
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );

    this.scene.load.spritesheet(
      "fx_sparkle",
      "../game/assets/spritesheets/sparkle.png",
      {
        frameWidth: 32,
        frameHeight: 32
      }
    );


    this.scene.load.spritesheet(
      "coin",
      "../game/assets/spritesheets/COINS-sheet.png",
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );

    this.scene.load.spritesheet(
      "action-marker",
      "../game/assets/spritesheets/action-marker.png",
      {
        frameWidth: 32,
        frameHeight: 32
      }
    );

    //this.preloadAnim = new PreloadAnim(this.scene);
  }

  preloadAnim () {
    console.log('preloading animations')
    this.anim = new PreloadAnim(this.scene);
  }



  preloadInventorySprites () {
    const loading = this.scene.load;
    loading.spritesheet(
      "coins",
      "../game/assets/spritesheets/COINS-sheet.png",
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );
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
