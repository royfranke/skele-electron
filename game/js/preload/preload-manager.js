import PRELOAD_IMAGE from "./preload-image.js";
import PRELOAD_SOUND from "./preload-sound.js";
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

    this.preloadStateSprites();
    this.preloadInventorySprites();
  
    
   
    this.scene.load.atlas('BLOCK', '../game/assets/spritesheets/a_BLOCK.png', '../game/assets/atlas/BLOCK.json');
    this.scene.load.atlas('BLOCK_ARROW', '../game/assets/spritesheets/a_ARROW.png', '../game/assets/atlas/BLOCK_ARROW.json');
    this.scene.load.atlas('EQUIPT', '../game/assets/spritesheets/a_TOOL.png', '../game/assets/atlas/TOOL.json');
    this.scene.load.atlas('WEARS', '../game/assets/spritesheets/a_BAG.png', '../game/assets/atlas/BAG.json');
    this.scene.load.atlas('ITEMS', '../game/assets/spritesheets/a_ITEM.png', '../game/assets/atlas/ITEM.json');
    this.scene.load.atlas('EMPTY', '../game/assets/spritesheets/a_EMPTY.png', '../game/assets/atlas/EMPTY.json');
    this.scene.load.atlas('COINPURSE', '../game/assets/spritesheets/a_COINPURSE.png', '../game/assets/atlas/COINPURSE.json');
    
    this.scene.load.spritesheet(
      "dust",
      "../game/assets/spritesheets/dust_1-sheet.png",
      {
        frameWidth: 32,
        frameHeight: 12
      }
    );

    this.scene.load.spritesheet(
      "int_window",
      "../game/assets/spritesheets/a_INT_WINDOW.png",
      {
        frameWidth: 32,
        frameHeight: 32
      }
    );

    this.scene.load.spritesheet(
      "int_door",
      "../game/assets/spritesheets/a_INT_DOOR.png",
      {
        frameWidth: 32,
        frameHeight: 48
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
