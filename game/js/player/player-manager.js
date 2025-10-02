import PlayerState from "./player-state.js";
import PlayerSprite from "./player-sprite.js";
import PlayerInput from "./player-input.js";
import PlayerAction from "./player-action.js";
import PlayerCoinpurse from "./player-coinpurse.js";
/* global Phaser */
/*
 */

export default class PlayerManager {

  state = null;
  last_state = null;
  input = null;


  constructor(scene) {
    this.scene = scene;
    this.app = this.scene.app;
    this.manager = this.scene.manager;
    this.playerState = new PlayerState();
    this.state = this.getState();
    this.playerInput = new PlayerInput(this.scene);
    //// Get player position from save
    this.playerSprite = new PlayerSprite(this.scene);
    this.coinpurse = new PlayerCoinpurse();
    this.action = new PlayerAction(this.scene);
    this.app.camera.follow(this.playerSprite.sprite);
    this.locale = this.scene[this.scene.place];
    this.underfoot = null;
    this.hopping = false;
    this.running_hop = false;
    this.tripping = false;
    this.player_focus = false;
    this.audio = false;
  }



  getFocus() {
    return this.manager.gameFocus.getFocus();
  }

  getLastFocus() {
    return this.manager.gameFocus.getLastFocus();
  }

  getFocusChange() {
    return this.manager.gameFocus.getChanged();
  }

  getState() {
    return this.playerState.getState();
  }

  setState(state_string='IDLE') {
    if (this.state.name == state_string) {
      return;
    }
    this.scene.events.emit('PLAYER_STATE_CHANGE_'+state_string.toUpperCase());
    return this.playerState.setState(state_string);
  }

  resetInputs() {
    return this.playerInput.resetInputs();
  }

  getLastState() {
    return this.playerState.getLastState();
  }

  stateChanged() {
    /// Stub
    //var last = this.getLastState();
    //var now = this.getState();

  }

  hop() {
    if (this.hopping) {
      return;
    }
    var state = this.getState();
    if (state.name == 'RUN') {
      this.running_hop = true;
    }
    else if (state.name == 'WALK') {
      this.running_hop = false;
    }
    this.hopping = true;
    this.setState('HOP');
    this.scene.time.addEvent({
        delay: 500,
        loop: false,
        callback: () => {
            this.endHop();
        }
    });
  }

  endHop () {
    this.hopping = false;
    //// Pick a random number to see if we trip
    var trip_chance = Phaser.Math.Between(1,100);
    var trip_threshold = 3; // 5% chance to trip
    // Check if we were running or walking before the hop
    if (this.running_hop) {
      this.running_hop = false;
      trip_threshold = 40;
    }
    
    if (trip_chance <= trip_threshold) {
      this.trip();
      return;
    }
    this.setState('IDLE');
  }

  trip() {
    if (this.tripping) {
      return;
    }
    this.tripping = true;
    this.setState('TRIP');
    /// Set the current frame to 0
    this.playerSprite.sprite.anims.setCurrentFrame(this.playerSprite.sprite.anims.currentAnim.frames[0]);

    this.scene.time.addEvent({
        delay: 1625,
        loop: false,
        callback: () => {
            this.setState('IDLE');
            this.tripping = false;
        }
    });
  }

  setFacing(facing) {
    if (facing == undefined) {facing = 's';}
    this.playerSprite.facing = facing.toLowerCase();
  }

  getFacing(facing) {
    var focus = this.getFocus();
    if (focus.name == 'PLAYER') {
      return this.playerInput.getFacing(facing);
    }
    else {
      return facing;
    }
  }

  setPositionTile(x_, y_) {
    console.log("Setting player position to tile: " + x_ + ", " + y_);
    this.playerSprite.sprite.setPosition(x_ * 16, y_ * 16);
  }

  getPositionTile() {
    var pos = this.playerSprite.sprite.getCenter();
    return {
      ROOM: parseInt(this.scene.room_id),
      X: Math.round(pos.x / 16),
      Y: Math.round(pos.y / 16)
    };
  }

  create() {
    this.playerSprite.setCollider();
    this.playerSprite.createFooting();
  }

  update() {
    var focus = this.getFocus();
    if (focus.name == 'PLAYER') {
      this.player_focus = true;
      this.last_state = this.getLastState();
      this.state = this.getState();

      if (this.state.input) {

        this.updateActiveTile();
        this.playerInput.update();

        if (this.state.name != 'HOP' && this.state.name != 'PICKUP' && this.state.name != 'EXCHANGE' && this.state.name != 'DIG' && this.state.name != 'EAT' && this.state.name != 'PUSH' && this.state.name != 'PULL' && this.state.name != 'TRIP') {
          if (this.playerInput.held) {
            if (this.playerInput.run) {
              this.setState('RUN');
            }
            else {
              this.setState('WALK');
            }
          }
          else {
            this.setState('IDLE');
          }
        }
      }
      else {
        this.resetInputs();
      }


      this.speed = this.getSpeed();
      if (this.last_state.name != this.state.name) {
        this.stateChanged();
      }
      this.action.update();

      if (this.speed > 0 && this.audio == false) {
        /// Get the current frame for the player
        if ( (this.state.name == 'WALK' || this.state.name == 'RUN') && (this.playerSprite.sprite.anims.currentFrame.index == 1 || this.playerSprite.sprite.anims.currentFrame.index == 5)) {
          this.audio = true;
          if (this.underfoot != undefined && (this.underfoot.TYPE == 'ASPHALT' || this.underfoot.TYPE == 'CEMENT' || this.underfoot.TYPE == 'CROSSWALK' || this.underfoot.TYPE == 'PLAZA' || this.underfoot.TYPE == 'STREET')) {
            var step = this.scene.manager.hud.hudSound.play('STEP_HARD');
          }
          else if (this.underfoot != undefined && (this.underfoot.TYPE == 'TILE' || this.underfoot.TYPE == 'LINOLEUM')) {
            var step = this.scene.manager.hud.hudSound.play('STEP_HARD_SQUEAKY');
          }
          else if (this.underfoot != undefined && (this.underfoot.TYPE == 'GRASS' || this.underfoot.TYPE == 'MEADOW' || this.underfoot.TYPE == 'MARSH')) {
            /// Get whether running or walking
            if (this.state.name == 'RUN') {
              var step = this.scene.manager.hud.hudSound.play('STEP_GRASS_RUN');
            }
            else {
              var step = this.scene.manager.hud.hudSound.play('STEP_GRASS_WALK');
            }
          }
          else {
            var step = this.scene.manager.hud.hudSound.play('STEP_SOFT');
          }
          
          this.scene.time.addEvent({
            delay: 250,
            loop: false,
            callback: () => {
                this.audio = false;
            }
          });
        }

        if ( this.state.name == 'HOP' && (this.playerSprite.sprite.anims.currentFrame.index == 4)) {
          this.audio = true;
          var step = this.scene.manager.hud.hudSound.play('STEP_HARD');
          this.scene.time.addEvent({
            delay: 250,
            loop: false,
            callback: () => {
                this.audio = false;
            }
          });
        }

        
      }
      else if (this.audio == false) {
        if ( this.state.name == 'TRIP' && (this.playerSprite.sprite.anims.currentFrame.index == 2)) {
          this.audio = true;
          var step = this.scene.manager.hud.hudSound.play('TRIP');
          this.scene.time.addEvent({
            delay: 250,
            loop: false,
            callback: () => {
                this.audio = false;
            }
          });
        }
      }
    }
    else { // If focus off player
      var last = this.getLastFocus();
      if (last.name == 'PLAYER' && this.player_focus) { //If focus was just changed off the player
        this.speed = 0;
        this.setState('IDLE');
        this.action.clearActions();
        this.player_focus = false;
        //this.resetInputs();
        // TODO: Do an initial state set on switch from player
      }

    }

    this.playerSprite.update();
    
  }

  getSpeed() {
    if (this.state.name == 'IDLE') {
      return 0;
    }
    if (this.state.name == 'DIG') {
      return 0;
    }
    if (this.state.name == 'TRIP') {
      return 0;
    }
    if (this.state.name == 'SLEEP') {
      return 0;
    }
    if (this.state.name == 'EAT') {
      return 0;
    }
    if (this.state.name == 'PUSH') {
      return 20;
    }
    if (this.state.name == 'PULL') {
      return -20;
    }
    if (this.state.name == 'HOP') {
      return 35;
    }
    /// TODO: Separate curb/hop handling from getspeed
    
    if (this.underfoot != undefined && (this.underfoot.TYPE == 'CURB' || this.underfoot.TYPE == 'STAIRS') && this.state.name != 'HOP') {
      this.hop();

    }
  
    if (this.underfoot == undefined) {
      return 60;
    }
    return this.interpretSpeed(this.underfoot.SPEED);
  }

  interpretSpeed(speed) {
    var interpretted = 0;
    switch (speed) {
      case 'BASE_SPEED':
        if (this.state.name == 'RUN') {
          interpretted = 180;
        }
        if (this.state.name == 'WALK') {
          interpretted = 72;
        }
        break;
      case 'CRISP':
        if (this.state.name == 'RUN') {
          interpretted = 195;
        }
        if (this.state.name == 'WALK') {
          interpretted = 85;
        }
        break;
      case 'QUICKENED':
        if (this.state.name == 'RUN') {
          interpretted = 210;
        }
        if (this.state.name == 'WALK') {
          interpretted = 100;
        }
        break;
      case 'SLOWED':
        if (this.state.name == 'RUN') {
          interpretted = 120;
        }
        if (this.state.name == 'WALK') {
          interpretted = 60;
        }
        break;
      case 'SLOG':
        if (this.state.name == 'RUN') {
          interpretted = 80;
        }
        if (this.state.name == 'WALK') {
          interpretted = 45;
        }
        break;
      case 'MOLASSES':
        if (this.state.name == 'RUN') {
          interpretted = 80;
        }
        if (this.state.name == 'WALK') {
          interpretted = 30;
        }
        break;
    }
    return interpretted;
  }

  updateActiveTile() {
    const groundLayer = this.locale.groundLayer;
    const locale = this.locale;

    this.standingTile = groundLayer.worldToTileXY(this.playerSprite.sprite.x, this.playerSprite.sprite.y + 8);
    this.snappedStanding = groundLayer.tileToWorldXY(this.standingTile.x, this.standingTile.y);

    //this.debugUnderfootTile.setPosition(this.snappedStanding.x, this.snappedStanding.y);
    this.underfootLast = this.underfoot;
    this.underfoot = locale.ground.getGround(this.standingTile.x, this.standingTile.y);
    this.underAction = locale.ground.getGround(this.action.actionTile.x, this.action.actionTile.y);

  }

  addCoin(coin_amount) {
    this.coinpurse.addCoin(coin_amount);
  }

  addDollar(dollar_amount) {
    this.coinpurse.addDollar(dollar_amount);
  }

  goToSleep (x_,y_) {
    this.scene.player.playerSprite.footShadow.setVisible(false);
    this.scene.player.setPositionTile(x_,y_ + .5);
    this.scene.player.setState('CURL_UP');
    this.scene.time.addEvent({
        delay: 1250,
        loop: false,
        callback: () => {
            this.scene.player.setState('SLEEP');
            this.scene.time.addEvent({
              delay: 2500,
              loop: false,
              callback: () => {
                  this.scene.save();
              }
          });
        }
    });
    
    //this.scene.app.camera.wake();
    return;
  }

}