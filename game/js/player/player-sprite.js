import SPRITE_DIR from "../config/sprite-dir.js";
import KEYLIGHTS from "../config/key-light.js";
/* global Phaser */
/*
 * Gets injected into game scene
 */

export default class PlayerSprite {

  constructor(scene) {
    this.scene = scene;
    this.facing = 's';
    this.dir_faces = SPRITE_DIR.DIR_FACES;
    this.sprite = this.scene.physics.add.sprite(0,0, "player-IDLE", 0).setSize(16, 12).setOffset(8, 16);
  }

  setCollider() {
    if (this.scene.place == 'exterior') {
      this.setExteriorCollider();
      this.scene.manager.plantManager.setCollider();
    }
    if (this.scene.place == 'interior') {
      this.setInteriorCollider();
    }
  }

  setInteriorCollider() {
    this.scene.physics.add.collider(this.sprite, this.scene.interior.groundLayer);
    this.scene.physics.add.collider(this.sprite, this.scene.interior.wallLayer);
    this.scene.interior.wallLayer.setCollisionByExclusion([-1]);
    this.sprite.setCollideWorldBounds(true);

  }

  setExteriorCollider() {
    this.scene.physics.add.collider(this.sprite, this.scene.exterior.groundLayer);
    this.scene.physics.add.collider(this.sprite, this.scene.exterior.wallLayer);
    this.scene.exterior.wallLayer.setCollisionByExclusion([-1]);
    this.sprite.setCollideWorldBounds(true);
    this.setExteriorZones();
  }

  setExteriorZones () {
    //const nodes = this.scene.exterior.nodes;
    const zones = [];
    var self = this;
    this.scene.exterior.overMap.nodes.forEach(function (node, index) {
      var zone = self.scene.add.zone(node.center_x * 16, node.center_y * 16, node.width * 16, node.height * 16);

      // Static body
      self.scene.physics.add.existing(zone, true); 
      self.scene.physics.add.overlap(zone, [self.sprite], (_zone, player) =>
      {
          self.scene.manager.knowledge.learn('INTERSECTIONS', {name: node.name, x: node.x, y: node.y});
          //console.log("Overlap with zone: " + index);
          //console.log(node);
      });
    });

    
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
    var state = this.scene.player.getState();
    this.facing = this.scene.player.getFacing(this.facing);
    this.sprite.anims.play("player-" + state.name + "-" + this.dir_faces[this.facing], true);

    if (state.name == 'WALK') {
      this.sprite.body.setVelocity(0);
    }

    this.updateVelocity();
    this.updateFooting();
    this.updateKeyLight();

    /*
    this.shadow.anims.play("player-" + state.name + "-" + this.dir_faces[this.facing], true);
    this.shadow.setPosition(this.sprite.x-10, this.sprite.y+18);
    this.shadow.setFlipX(flip).setDepth(this.sprite.depth - 1);
    */
  }

  updateVelocity () {
    const speed = this.scene.player.speed;
    let input = this.scene.player.playerInput;
    
    // Horizontal movement
    var flip = (this.facing == 'nw' || this.facing == 'w' || this.facing == 'sw') ? true : false;
    this.sprite.setFlipX(flip);

    this.move({up: input.up, right: input.right, down: input.down, left: input.left}, speed);
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

  updateKeyLight () {
    let keylight = this.scene.manager.time.keylight;
    if (KEYLIGHTS[keylight] != undefined) {
      this.sprite.setTint(KEYLIGHTS[keylight].skeles_tint);
    }
  }

  updateFooting () {
    let underfoot = this.scene.player.underfoot;
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
    this.action.showMenu = false;
  }
}