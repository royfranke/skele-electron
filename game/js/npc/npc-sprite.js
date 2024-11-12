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
    this.scene.physics.add.collider(this.sprite, this.scene.exterior.groundLayer);
    this.scene.physics.add.collider(this.sprite, this.scene.exterior.wallLayer);
    this.scene.exterior.wallLayer.setCollisionByExclusion([-1]);
    this.sprite.setCollideWorldBounds(true);
    var others = this.scene.npcs.npcs.getChildren();
    this.scene.physics.add.collider(this.sprite, others);
    this.scene.npcs.npcs.add(this.sprite);
  }

  createFooting() {

    this.footShadow = this.scene.add.ellipse(0, 0, 12, 6, 0x465e62).setBlendMode(Phaser.BlendModes.MULTIPLY);
    this.footShadow.setAlpha(.5);
    this.footMask = this.scene.add.circle(0, 0, 16, 0x6666ff);
    this.footMask.setVisible(false);
    this.sprite.setMask(new Phaser.Display.Masks.BitmapMask(this.scene, this.footMask));
    //this.shadow = this.scene.add.sprite(0,0, "player-IDLE", 0).setFlipY(true).setTintFill(0x465e62).setBlendMode(Phaser.BlendModes.MULTIPLY).setAlpha(.5).setAngle(45);
  }

  update() {
    var state = this.npc.getState();
    var speed = this.npc.getSpeed();
    
    this.sprite.anims.play("player-" + state.name + "-" + this.dir_faces[this.facing], true); 
    
    if (state.name == 'WALK' || state.name == 'IDLE') {
      this.sprite.body.setVelocity(0);
    }

    this.updateFlip();
    this.updateFooting();

    /*
    this.shadow.anims.play("player-" + state.name + "-" + this.dir_faces[this.facing], true);
    this.shadow.setPosition(this.sprite.x-10, this.sprite.y+18);
    this.shadow.setFlipX(flip).setDepth(this.sprite.depth - 1);
    */
  }

  updateFlip () {
    // Horizontal movement
    var flip = (this.facing == 'nw' || this.facing == 'w' || this.facing == 'sw') ? true : false;
    this.sprite.setFlipX(flip);
  }

  move (dir={up: false, right: false, down: false, left: false}, speed) {
    if (dir.up) {
      this.sprite.body.setVelocityY(-speed);
    } else if (dir.down) {
      this.sprite.body.setVelocityY(speed);
    }

    if (dir.left) {
      this.sprite.body.setVelocityX(-speed);
    } else if (dir.right) {
      this.sprite.body.setVelocityX(speed);
    }

    this.sprite.body.velocity.normalize().scale(speed);
  }

  updateFooting () {
    let underfoot = this.npc.underfoot;
    this.updateFootMask(underfoot);
    this.updateFootShadow(underfoot);
    this.sprite.setDepth(this.sprite.y + 8);
  }

  updateFootMask(underfoot) {
    var _y = this.sprite.y;
    if (underfoot != undefined) {
      if (underfoot.USEMASK) {
          _y = _y - underfoot.ZINDEX;
      }
    }
    this.footMask.setPosition(this.sprite.x, _y);
    this.footMask.setDepth(this.sprite.depth + 1);
    return;
  }

  updateFootShadow(underfoot) {
    var _y = this.sprite.y + 12;
    var scale = 1;
    if (underfoot != undefined) {
      if (underfoot.USEMASK && underfoot.ZINDEX > 0) {
          _y = Math.floor(_y - (underfoot.ZINDEX / 2));
          scale = (underfoot.ZINDEX / 25) + scale;
      }
    }
    this.footShadow.setPosition(this.sprite.x, _y);
    this.footShadow.setScale(scale);
    this.footShadow.setDepth(this.sprite.depth - 1);
    return;
  }

  freeze() {
    this.sprite.anims.stop();
    this.sprite.body.setVelocity(0);
  }
}