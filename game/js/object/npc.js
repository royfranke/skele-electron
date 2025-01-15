import NpcState from "../npc/npc-state.js";
import NpcSprite from "../npc/npc-sprite.js";

/* Npc Class */

export default class Npc {
  constructor(scene, npc) {
    this.scene = scene;
    this.registered = false;
    this.world_actions = [
      { action: 'GREET', object: this }
    ];
    this.app = this.scene.app;
    this.manager = this.scene.manager;
    this.destinations = [];
    this.greeting = false;
    this.following = null;
    this.info = npc;

    this.npcState = new NpcState();
    this.state = this.getState();

    this.top = false;
    this.right = false;
    this.left = false;
    this.down = false;

    this.locale = this.scene[this.scene.place];

    this.underfoot = null;
  }

  create(x_, y_, facing = 's') {
    this.facing = facing;
    this.sprite = new NpcSprite(this.scene, this, x_ * 16, y_ * 16);
    this.sprite.createFooting();
    this.standingTile = { x: x_, y: y_ };
    //this.goTo(x_ - 7, y_ + 12);
  }

  update() {
    this.state = this.getState();
    this.speed = this.getSpeed();
    this.sprite.facing = this.facing;
    this.sprite.update();
    this.checkItinerary();
    this.updateActiveTile();
    if (this.following != null) {
      this.follow(this.following.follow, this.following.distance);
    }
    if (this.greeting && this.following == null) {
      this.world_actions = [
        { action: 'TEST PSYCHIC ABILITIES', object: this },
        { action: 'MATCH SOCKS', object: this },
        { action: 'FOLLOW ME', object: this },
        { action: 'FOLLOW ME AT A DISTANCE', object: this }
      ];
    }
  }

  addActions() { //Add actions to world
    var player_action = this.scene.player.action;
    this.world_actions.forEach(function (action) {
      player_action.addAction(action);
    });
  }


  givePlayerItem(item_slug, items_slugs = []) {
    if (this.state.name != 'EXCHANGE') {
      this.setState('EXCHANGE');
      this.scene.time.addEvent({
        delay: 500,
        loop: false,
        callback: () => {
          this.setState('IDLE');
          var items = [];
          var item_manager = this.scene.manager.itemManager;
          items_slugs.forEach(function (enclosed_item_slug) {
            var enclosed_item = item_manager.newItem(enclosed_item_slug);
            items.push(enclosed_item);
          });
          var result = item_manager.newItemToPockets(item_slug, items);
          if (result != false) {
            this.scene.manager.hud.think('You got a new ' + item_slug + '.');

            
            this.greeting = true;
          }
          else {
            this.scene.manager.hud.think('Your pockets are too full.');
            return false;
          }
        }
      });
    }


  }

  givePlayerQuest(quest_slug, options = {}) {
    //// Stub
  }

  doAction(action) {
    this.scene.player.action.clearActions();
    if (action == 'GREET') {
      if (!this.greeting) {
        this.scene.manager.hud.think('??');
        //this.greeting = this.givePlayerItem('LUNCH_BAG_USED', ['BANANA', 'APPLE']);
        this.scene.manager.dialog.triggerDialog(12);
        this.greeting = true;
      }

    }
    if (action == 'FOLLOW ME') {
      this.following = { follow: this.scene.player, distance: 1 };
      this.world_actions = [
        { action: 'STOP FOLLOWING ME', object: this },
        { action: 'FOLLOW ME AT A DISTANCE', object: this }
      ];
    }
    if (action == 'FOLLOW ME AT A DISTANCE') {
      this.following = { follow: this.scene.player, distance: 3 };
      this.world_actions = [
        { action: 'STOP FOLLOWING ME', object: this },
        { action: 'FOLLOW ME', object: this }
      ];
    }

    if (action == 'STOP FOLLOWING ME') {
      this.following = null;
      this.clearDestinations();
      this.scene.manager.hud.think('?!');
      this.givePlayerItem('APPLE');
    }

    if (action == 'MATCH SOCKS') {
      this.following = null;
      this.clearDestinations();
      this.scene.manager.setFocus('SOCKS');
    }

    if (action == 'TEST PSYCHIC ABILITIES') {
      this.following = null;
      this.clearDestinations();
      this.scene.manager.setFocus('ZENER');
    }
  }

  destroySprite() {
    this.sprite.destroy();
    this.sprite_shadow.destroy();
    this.sprite = null;
    this.sprite_shadow = null;
  }

  getState() {
    return this.npcState.getState();
  }

  setState(state_string) {
    return this.npcState.setState(state_string);
  }

  getLastState() {
    return this.npcState.getLastState();
  }

  getSpeed() {
    if (this.state.name == 'IDLE') {
      return 0;
    }
    if (this.state.name == 'EXCHANGE') {
      return 0;
    }
    if (this.state.name == 'PICKUP') {
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

    this.standingTile = groundLayer.worldToTileXY(this.sprite.sprite.x, this.sprite.sprite.y + 8);
    this.snappedStanding = groundLayer.tileToWorldXY(this.standingTile.x, this.standingTile.y);

    //this.debugUnderfootTile.setPosition(this.snappedStanding.x, this.snappedStanding.y);
    this.underfootLast = this.underfoot;
    this.underfoot = locale.ground.getGround(this.standingTile.x, this.standingTile.y, groundLayer);

    if (this.standingTile.x == this.scene.player.action.actionTile.x && this.standingTile.y == this.scene.player.action.actionTile.y) {
      this.addActions();
    }
  }

  goTo(_x, _y) {
    if (this.destinations.length == 0) {
      this.destinations.push({ x: _x, y: _y });
    }
    else {
      var last_spot = this.destinations[(this.destinations.length - 1)];
      if (last_spot.x != _x && last_spot.y != _y) {
        this.destinations.push({ x: _x, y: _y });
        console.log(this.destinations);
      }
    }
  }

  clearDestinations() {
    this.destinations = [];
    this.setState('IDLE');
  }

  follow(object, distance = 1) { /// Could be player, NPC, or other moving target, must having facing and standingTile.x standingTile.y properties
    var x_distance = this.standingTile.x - object.standingTile.x;
    var y_distance = this.standingTile.y - object.standingTile.y;

    if ((x_distance > distance || x_distance < -distance) || (y_distance > distance || y_distance < -distance)) {
      this.goTo(object.standingTile.x, object.standingTile.y);
    }
    else {
      this.setState('IDLE');
    }
  }


  moveToward(_x, _y) {
    this.setState('WALK');
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
    this.sprite.move({ up: up, right: right, down: down, left: left }, this.speed);
  }

  getFacing(facing, up, right, down, left) {
    return this.scene.manager.utilities.getFacing(facing, up, right, down, left);
  }

  checkItinerary() {
    if (this.destinations.length > 0) {
      /// Move toward the next location
      if (this.standingTile.x == this.destinations[0].x && this.standingTile.y == this.destinations[0].y) { // Arrived at the destination TILE!
        this.destinations.shift();
        this.setState('IDLE');
      }
      else {
        this.moveToward(this.destinations[0].x, this.destinations[0].y);
      }
    }
    else { /// No locations queued.
      if (this.state.name != 'EXCHANGE' && this.state.name != 'PICKUP' && this.state.name != 'EAT' && this.state.name != 'DIG' && this.state.name != 'HOP' && this.state.name != 'PUSH' && this.state.name != 'PULL') {
        this.setState('IDLE');
      }
    }
  }
}


