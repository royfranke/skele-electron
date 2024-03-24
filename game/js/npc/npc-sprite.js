import SPRITE_DIR from "../config/sprite-dir.js";
/* global Phaser */
/*
 * Gets injected into game scene
 */

export default class NpcSprite {

  constructor(scene, npc, _x, _y) {
    this.scene = scene;
    this.npc = npc;
    this.facing = 's';
    this.dir_faces = SPRITE_DIR.DIR_FACES;
    this.sprite = this.scene.physics.add.sprite(_x, _y, "player-IDLE", 0).setSize(16, 12).setOffset(8, 16);
    this.setCollider();
  }

  setCollider () {
    this.scene.physics.add.collider(this.sprite, this.scene.player.playerSprite.sprite);
  }


  createShadow() {
    
    this.footShadow = this.scene.add.ellipse(0, 0, 12, 6, 0x465e62).setBlendMode(Phaser.BlendModes.MULTIPLY);
    this.footShadow.setAlpha(.5);
    this.footMask = this.scene.add.circle(0,0, 16, 0x6666ff);
    this.footMask.setVisible(false);
    this.sprite.setMask(new Phaser.Display.Masks.BitmapMask(this.scene, this.footMask));
    

    //this.shadow = this.scene.add.sprite(0,0, "player-IDLE", 0).setFlipY(true).setTintFill(0x465e62).setBlendMode(Phaser.BlendModes.MULTIPLY).setAlpha(.5).setAngle(45);
  }

  update() {
    var state = this.npc.getState();
    var speed = this.npc.getSpeed();
    
    this.sprite.anims.play("player-" + state.name + "-" + this.dir_faces[this.facing], true);

    var flip = (this.facing == 'nw' || this.facing == 'w' || this.facing == 'sw') ? true : false;
    this.sprite.setFlipX(flip); 
    
    if (state.name == 'WALK' || state.name == 'IDLE') {
      this.sprite.body.setVelocity(0);
    }

    if (state.name == 'WALK' || state.name == 'RUN') {
      // Horizontal movement
      if (this.facing == 'w' || this.facing == 'nw' || this.facing == 'sw') {
        this.sprite.body.setVelocityX(-speed);
      } else if (this.facing == 'e' || this.facing == 'ne' || this.facing == 'se') {
        this.sprite.body.setVelocityX(speed);
      }
    
      // Vertical movement
      if (this.facing == 'n' || this.facing == 'nw' || this.facing == 'ne') {
        this.sprite.body.setVelocityY(-speed);
      } else if (this.facing == 's' || this.facing == 'sw' || this.facing == 'se') {
        this.sprite.body.setVelocityY(speed);
      }

      // Normalize and scale the velocity so that sprite can't move faster along a diagonal
      this.sprite.body.velocity.normalize().scale(speed);
    }

    const underfoot = this.npc.underfoot;
    if (underfoot != undefined) {
      if (underfoot.TYPE == 'LEAVES') {
          this.footMask.setPosition(this.sprite.x, this.sprite.y - 7);
          //this.footShadow.setVisible(false);
          this.footShadow.setVisible(true);
          this.footShadow.setScale(1.25);
          this.footShadow.setPosition(this.sprite.x, this.sprite.y + 8);
        }
        else if (underfoot.TYPE == 'MULCH') {
          this.footMask.setPosition(this.sprite.x, this.sprite.y - 6);
          this.footShadow.setVisible(true);
          this.footShadow.setScale(1.25);
          this.footShadow.setPosition(this.sprite.x, this.sprite.y + 9);
        }
        else if (underfoot.TYPE == 'GRASS') {
          this.footMask.setPosition(this.sprite.x, this.sprite.y - 6);
          this.footShadow.setVisible(true);
          this.footShadow.setScale(1);
          this.footShadow.setPosition(this.sprite.x, this.sprite.y + 9);
        }
        else {
          this.footMask.setPosition(this.sprite.x, this.sprite.y);
          this.footShadow.setVisible(true);
          this.footShadow.setScale(1);
          this.footShadow.setPosition(this.sprite.x, this.sprite.y+10);
        }
  }
  else {
    this.footShadow.setVisible(true);
    this.footShadow.setScale(1);
    this.footShadow.setPosition(this.sprite.x, this.sprite.y + 12);
  }
    this.sprite.setDepth(this.sprite.y + 8);
    this.footShadow.setDepth(this.sprite.depth - 1);
    this.footMask.setDepth(this.sprite.depth + 1);

    /*
    this.shadow.anims.play("player-" + state.name + "-" + this.dir_faces[this.facing], true);
    this.shadow.setPosition(this.sprite.x-10, this.sprite.y+18);
    this.shadow.setFlipX(flip).setDepth(this.sprite.depth - 1);
    */
  }

  freeze() {
    this.sprite.anims.stop();
    this.sprite.body.setVelocity(0);
  }
}