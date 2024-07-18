import PlayerState from "./player-state.js";
import PlayerSprite from "./player-sprite.js";
import PlayerInput from "./player-input.js";
import PlayerAction from "./player-action.js";
import PlayerCoinpurse from "./player-coinpurse.js";
/* global Phaser */
/*
 * Gets injected into the game scene
 */

export default class PlayerManager {

  state = null;
  last_state = null;
  input = null;


  constructor(scene, x_, y_) {
    this.scene = scene;
    this.app = this.scene.app;
    this.manager = this.scene.manager;
    this.playerState = new PlayerState();
    this.state = this.getState();
    this.playerInput = new PlayerInput(this.scene);
    this.playerSprite = new PlayerSprite(this.scene, x_ * 16, y_ * 16);
    this.coinpurse = new PlayerCoinpurse();
    this.action = new PlayerAction(this.scene);

    this.app.camera.follow(this.playerSprite.sprite);
    this.locale = this.scene[this.scene.place];

    this.underfoot = null;
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

  setState(state_string) {
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

  getFacing(facing) {
    var focus = this.getFocus();
    if (focus.name == 'PLAYER') {
      return this.playerInput.getFacing(facing);
    }
    else {
      return facing;
    }
  }

  setPosition(x_, y_) {
    this.playerSprite.sprite.setPosition(x_ * 16, y_ * 16);
  }

  create() {
    this.playerSprite.setCollider();
    this.playerSprite.createFooting();
  }

  update() {
    var focus = this.getFocus();
    if (focus.name == 'PLAYER') {
      this.last_state = this.getLastState();
      this.state = this.getState();
      if (this.state.input) {
        this.updateActiveTile();
        this.playerInput.update();
        if (this.state.name != 'HOP' || this.state.name != 'PICKUP' || this.state.name != 'EXCHANGE') {
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

    }
    else { // If focus off player
      var last = this.getLastFocus();
      if (last.name == 'PLAYER') { //If focus was just changed off the player
        this.speed = 0;
        //this.setState('IDLE');
        //this.resetInputs();
        // TODO: Do an initial state set on switch from player
      }

    }

    this.playerSprite.update();
    this.action.update();
  }

  loadPlayer() {

  }

  getSpeed() {
    if (this.state.name == 'IDLE') {
      return 0;
    }
    if (this.state.name == 'DIG') {
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
      return 60;
    }
    if (this.underfoot != undefined && this.underfoot.TYPE == 'CURB' && this.state.name != 'HOP') {
      this.setState('HOP');
      setTimeout(() => {
        this.setState('IDLE');
      }, 500);
      return 80;
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
    this.scene.manager.hud.hudCoinpurse.popCoin(`${coin_amount}¢`, 'positive');
  }

}