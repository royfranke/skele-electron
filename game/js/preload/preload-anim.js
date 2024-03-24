
import SPRITE_DIR from "../config/sprite-dir.js";
import MONEY from "../reference/money.js";

export default class PreloadAnim {
  constructor(scene) {

    this.scene = scene;

    const anims = this.scene.anims;

    const states = SPRITE_DIR.STATES;
    const faces = SPRITE_DIR.FACES;
    
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

    const moneyAnims = MONEY.ANIM;
    const coins = MONEY.COINS;

    coins.forEach(function (coin, index) {
      anims.create({
        key: "COIN-"+coin,
        frames: anims.generateFrameNumbers("coins", 
          { start: moneyAnims[coin].START, end: moneyAnims[coin].END }
        ),
        frameRate: 8,
        repeat: -1,
      });
      anims.create({
        key: "COIN-"+coin+"-HEADS",
        frames: anims.generateFrameNumbers("coins", 
          { start: moneyAnims[coin].HEADS.START, end: moneyAnims[coin].HEADS.END }
        ),
        frameRate: 8,
        repeat: -1,
      });
      anims.create({
        key: "COIN-"+coin+"-TAILS",
        frames: anims.generateFrameNumbers("coins", 
          { start: moneyAnims[coin].TAILS.START, end: moneyAnims[coin].TAILS.END }
        ),
        frameRate: 8,
        repeat: -1,
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
  
    anims.create({
      key: "dust_cloud",
      frames: anims.generateFrameNumbers("dust", 
       { start: 0, end: 4 }
      ),
      frameRate: 8,
      repeat: 0,
    });

    anims.create({
      key: "fx_woosh",
      frames: anims.generateFrameNumbers("fx_item", 
       { start: 0, end: 8 }
      ),
      frameRate: 8,
      repeat: 0,
    });

    anims.create({
      key: "sparkle",
      frames: anims.generateFrameNumbers("fx_sparkle", 
       { start: 0, end: 8 }
      ),
      frameRate: 8,
      repeat: 0,
    });

  }


}
