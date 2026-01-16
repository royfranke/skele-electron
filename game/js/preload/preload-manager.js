import PRELOAD_IMAGE from "./preload-image.js";
import PRELOAD_SOUND from "../config/atlas/audio.js";
import PRELOAD_ATLAS from "./preload-atlas.js";
import PRELOAD_FONT from "./preload-font.js";
import PRELOAD_JSON from "./preload-json.js";
import SPRITE_DIR from "../config/sprite-dir.js";
import PreloadAnim from "./preload-anim.js";

export default class PreloadManager{
  constructor(scene) {
    this.scene = scene;
    this.verbose = false;
  }


  initialize() {
    var path = './assets/';
    var sound_path = './assets/sound/';
    var data_path = './';
    

    this.initializeSoundAssets(sound_path);
    this.initializeImageAssets(path);
    this.initializeFontAssets(path);
    this.initializeAtlasAssets(path);
    this.initializeJsonAssets(data_path);
    this.preloadStateSprites(path);
    
  }

  initializeImageAssets(path) {
    var self = this.scene;
    let count = 0;
    if (this.verbose) console.log('Preloading image assets...');
    PRELOAD_IMAGE.forEach(function (image, index) {
      self.load.image(image.NAME, path+image.PATH);
      count++;
    });
    if (this.verbose) console.log('Preloaded '+count+' image assets');
  }

  initializeSoundAssets(path) {
    var self = this.scene;
    let count = 0;
    if (this.verbose) console.log('Preloading sounds...');
    PRELOAD_SOUND.forEach(function (sound, index) {
      sound.FILES.forEach(function (file, index) {
      self.load.audio(sound.NAME+'_'+index,  path+file );
      count++;
      });
      
    });
    if (this.verbose) console.log('Preloaded '+count+' sounds');
  }

  initializeFontAssets(path) {
    var self = this.scene;
    let verbose = this.verbose;
    let count = 0;
    if (this.verbose) console.log('Preloading fonts...');
    PRELOAD_FONT.forEach(function (font, index) { 
      if (verbose) console.log("Loading font: "+font.NAME);
      self.load.bitmapFont(font.NAME, path+'fonts/'+font.NAME+'.png', path+'fonts/'+font.NAME+'.xml');
      if (verbose) console.log("Loaded font: "+font.NAME);
      count++;
    });
    if (this.verbose) console.log('Preloaded '+count+' fonts');
  }

  initializeAtlasAssets(path) {
    var self = this.scene;
    let count = 0;
    if (this.verbose) console.log('Preloading atlases...');
    PRELOAD_ATLAS.forEach(function (atlas, index) {
      self.load.atlas(atlas.NAME, path+atlas.PATH.SPRITE, path+atlas.PATH.JSON);
      count++;
    });
    if (this.verbose) console.log('Preloaded '+count+' atlases');
  }

  initializeJsonAssets(path) {
    var self = this.scene;
    let count = 0;
    let verbose = this.verbose;
    if (verbose) console.log('Preloading json...');
    PRELOAD_JSON.forEach(function (record, index) {
      self.load.json(record.NAME, path+record.PATH.JSON);
      if (verbose) console.log('Loaded json: '+record.NAME+' ('+path+record.PATH.JSON+')');
      count++;
    });
    if (this.verbose) console.log('Preloaded '+count+' json files');
  }

  initializeAnim() {
    this.preloadAnim = new PreloadAnim(this.scene);
    this.preloadAnim.initialize();
  }


  preloadStateSprites (path) {
    var self = this.scene;
    let count = 0;
    let verbose = this.verbose;
    const states = SPRITE_DIR.STATES;
    const adult_states = SPRITE_DIR.ADULT_STATES;
    const adults = SPRITE_DIR.ADULTS;
    const kid_states = SPRITE_DIR.KID_STATES;
    const kids = SPRITE_DIR.KIDS;

    kid_states.forEach(function (state, index) {
      kids.forEach(function (kid, index) {
        if (verbose) console.log("Loading kid state: "+state+" for "+kid);
        var frameWidth = 32;
        var frameHeight = 32;
        if (state == 'SLEEP' || state == 'CURL_UP') {
          frameWidth = 48;
        }
        self.load.spritesheet(
          kid.toLowerCase()+"-"+state,
          path+"spritesheets/"+kid.toLowerCase()+"_"+state+"-sheet.png",
          {
            frameWidth: frameWidth,
            frameHeight: frameHeight
          }
        );
        count++;
        if (verbose) console.log("Loaded kid state: "+state+" for "+kid);
      });
    });

    adult_states.forEach(function (state, index) {
      adults.forEach(function (adult, index) {
        if (verbose) console.log("Loading adult state: "+state+" for "+adult);
        var frameWidth = 32;
        var frameHeight = 32;
        if (state == 'SLEEP' || state == 'CURL_UP') {
          frameWidth = 48;
        }
        self.load.spritesheet(
          adult.toLowerCase()+"-"+state,
          path+"spritesheets/"+adult.toLowerCase()+"_"+state+"-sheet.png",
          {
            frameWidth: frameWidth,
            frameHeight: frameHeight
          }
        );
        count++;
        if (verbose) console.log("Loaded adult state: "+state+" for "+adult);
      });
    });

    states.forEach(function (state, index) {
      if (verbose) console.log("Loading state: "+state);
      var frameWidth = 32;
      var frameHeight = 32;
      if (state == 'SLEEP' || state == 'CURL_UP') {
        frameWidth = 48;
      }
      self.load.spritesheet(
        "player-"+state,
        path+"spritesheets/skele_"+state+"-sheet.png",
        {
          frameWidth: frameWidth,
          frameHeight: frameHeight
        }
      );
      count++;
      if (verbose) console.log("Loaded state: "+state);
    });
    if (this.verbose) console.log('Preloaded '+count+' state sprites');
  }

}
