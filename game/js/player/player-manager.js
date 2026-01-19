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
    this.destinations = [];
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

  setState(state_string = 'IDLE') {
    if (this.state.name == state_string) {
      return;
    }
    this.scene.events.emit('PLAYER_STATE_CHANGE_' + state_string.toUpperCase());
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

  endHop() {
    this.hopping = false;
    //// Pick a random number to see if we trip
    var trip_chance = Phaser.Math.Between(1, 100);
    var trip_threshold = 3; // 3% chance to trip
    // Check if we were running or walking before the hop
    if (this.running_hop) {
      this.running_hop = false;
      trip_threshold = 40; // 40% chance to trip if running
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
    this.scene.manager.hud.hudHealth.modifyHealth(-0.25);
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
    if (facing == undefined) { facing = 's'; }
    this.playerSprite.facing = facing.toLowerCase();
  }

  getFacing(facing, up = false, right = false, down = false, left = false) {
    var focus = this.getFocus();
    if (focus.name == 'PLAYER' && this.destinations.length == 0) {
      return this.playerInput.getFacing(facing);
    }
    else if (focus.name == 'PLAYER' && this.destinations.length > 0) {
      return this.scene.manager.utilities.getFacing(facing, up, right, down, left);
    }
    else {
      return facing;
    }
  }

  setPositionTile(x_, y_) {
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

  clearDestinations() {
    this.destinations = [];
    this.setState('IDLE');
  }


  moveToward(_x, _y) {
    var x_distance = this.standingTile.x - _x;
    var y_distance = this.standingTile.y - _y;
    var up = false;
    var right = false;
    var down = false;
    var left = false;

    if (x_distance > 0) {
      left = true;
    }
    else if (x_distance < 0) {
      right = true;
    }
    if (y_distance > 0) {
      up = true;
    }
    else if (y_distance < 0) {
      down = true;
    }
    this.facing = this.getFacing(this.facing, up, right, down, left);
    this.playerSprite.facing = this.facing;
    this.playerSprite.move({ up: up, right: right, down: down, left: left }, this.speed);
  }

  checkItinerary() {
    if (this.destinations.length > 0) {
      /// Move toward the next location
      if (this.standingTile.x == this.destinations[0][0] && this.standingTile.y == this.destinations[0][1]) { // Arrived at the destination TILE!
        this.destinations.shift();
      }
      else {
        this.moveToward(this.destinations[0][0], this.destinations[0][1]);
      }
    }
  }

  create() {
    this.playerSprite.setCollider();
    this.playerSprite.createFooting();
  }

  update() {
    var focus = this.getFocus();
    
    if (focus.name == 'PLAYER') {
      this.updatePlayerFocus();
    } else {
      this.handleFocusLoss();
    }
    
    this.playerSprite.update();
  }

  updatePlayerFocus() {
    this.player_focus = true;
    this.last_state = this.getLastState();
    this.state = this.getState();

    if (this.state.input) {
      this.updateActiveTile();
      this.playerInput.update();
      this.updateMovementState();
    } else {
      this.resetInputs();
    }

    this.checkItinerary();
    this.speed = this.getSpeed();
    
    if (this.last_state.name != this.state.name) {
      this.stateChanged();
    }
    
    this.action.update();
    this.updateFootstepAudio();
  }

  updateMovementState() {
    const actionStates = ['HOP', 'PICKUP', 'EXCHANGE', 'DIG', 'EAT', 'PUSH', 'PULL', 'TRIP'];
    
    if (!actionStates.includes(this.state.name)) {
      if (this.playerInput.held || this.destinations.length > 0) {
        this.setState(this.playerInput.run ? 'RUN' : 'WALK');
      } else {
        this.setState('IDLE');
      }
    }
  }

  updateFootstepAudio() {
    if (this.audio) return;
    
    if (this.speed > 0) {
      this.playMovementSounds();
    } else {
      this.playTripSound();
    }
  }

  playMovementSounds() {
    const isWalkOrRun = this.state.name == 'WALK' || this.state.name == 'RUN';
    const isStepFrame = this.playerSprite.sprite.anims.currentFrame.index == 1 || 
                        this.playerSprite.sprite.anims.currentFrame.index == 5;
    
    if (isWalkOrRun && isStepFrame) {
      this.playFootstepByTerrain();
      this.scheduleAudioReset(250);
    } else if (this.state.name == 'HOP' && this.playerSprite.sprite.anims.currentFrame.index == 4) {
      this.scene.manager.hud.hudSound.play('STEP_HARD');
      this.scheduleAudioReset(250);
    }
  }

  playFootstepByTerrain() {
    if (!this.underfoot) {
      this.scene.manager.hud.hudSound.play('STEP_SOFT');
      return;
    }

    const hardSurfaces = ['ASPHALT', 'CEMENT', 'CROSSWALK', 'PLAZA', 'STREET'];
    const squeakySurfaces = ['TILE', 'LINOLEUM'];
    const grassSurfaces = ['GRASS', 'MEADOW', 'MARSH'];

    if (hardSurfaces.includes(this.underfoot.TYPE)) {
      this.scene.manager.hud.hudSound.play('STEP_HARD');
    } else if (squeakySurfaces.includes(this.underfoot.TYPE)) {
      this.scene.manager.hud.hudSound.play('STEP_HARD_SQUEAKY');
    } else if (grassSurfaces.includes(this.underfoot.TYPE)) {
      const soundName = this.state.name == 'RUN' ? 'STEP_GRASS_RUN' : 'STEP_GRASS_WALK';
      this.scene.manager.hud.hudSound.play(soundName);
    } else {
      this.scene.manager.hud.hudSound.play('STEP_SOFT');
    }
  }

  playTripSound() {
    if (this.state.name == 'TRIP' && this.playerSprite.sprite.anims.currentFrame.index == 2) {
      this.scene.manager.hud.hudSound.play('TRIP');
      this.scheduleAudioReset(250);
    }
  }

  scheduleAudioReset(delay) {
    this.audio = true;
    this.scene.time.addEvent({
      delay: delay,
      loop: false,
      callback: () => { this.audio = false; }
    });
  }

  handleFocusLoss() {
    var last = this.getLastFocus();
    if (last.name == 'PLAYER' && this.player_focus) {
      this.speed = 0;
      this.setState('IDLE');
      this.action.clearActions();
      this.player_focus = false;
      this.resetInputs();
    }
  }

  moveToTile(x_, y_) {
    this.clearDestinations();
    this.playerSprite.moveToTile(x_, y_);
  }

  getSpeed() {
    // Fixed speed states
    const stateSpeed = {
      'IDLE': 0,
      'DIG': 0,
      'TRIP': 0,
      'SLEEP': 0,
      'EAT': 0,
      'PUSH': 20,
      'PULL': -20,
      'HOP': 35
    };

    if (stateSpeed.hasOwnProperty(this.state.name)) {
      return stateSpeed[this.state.name];
    }

    // Check for obstacles that trigger hopping
    this.checkHopTriggers();

    // Default speed when no terrain info
    if (!this.underfoot) {
      return 60;
    }

    // Calculate speed based on terrain
    return this.interpretSpeed(this.underfoot.SPEED);
  }

  checkHopTriggers() {
    const hopTriggers = ['CURB', 'STAIRS'];
    if (this.underfoot && hopTriggers.includes(this.underfoot.TYPE) && this.state.name != 'HOP') {
      this.hop();
    }
  }

  interpretSpeed(terrainSpeed) {
    const speedMap = {
      'BASE_SPEED':  { RUN: 180, WALK: 72 },
      'CRISP':       { RUN: 195, WALK: 85 },
      'QUICKENED':   { RUN: 210, WALK: 100 },
      'SLOWED':      { RUN: 120, WALK: 60 },
      'SLOG':        { RUN: 80,  WALK: 45 },
      'MOLASSES':    { RUN: 80,  WALK: 30 }
    };

    const speeds = speedMap[terrainSpeed];
    if (!speeds) {
      return 0;
    }

    return speeds[this.state.name] || 0;
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

  goToSleep(x_, y_) {
    this.scene.player.playerSprite.footShadow.setVisible(false);
    this.scene.player.setPositionTile(x_, y_ + .5);
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