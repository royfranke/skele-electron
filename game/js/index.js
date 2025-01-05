import SplashScene from "./scene/0_splash.js";
import MainMenuScene from "./scene/1_main-menu.js";
import SystemSettingsScene from "./scene/2_settings.js";
import NewGameScene from "./scene/3_new-game.js";
import LoadGameScene from "./scene/4_load-game.js";
import TutorialScene from "./scene/5_tutorial.js";
import GameScene from "./scene/6_game.js";
import InteriorScene from "./scene/7_interior.js";

const config = {
  width: 960,
  height: 540,
  seed: 14,
  backgroundColor: "#4b424a",
  parent: "game-container",
  pixelArt: true,
  scene: [
    SplashScene,
    MainMenuScene,
    SystemSettingsScene,
    NewGameScene,
    LoadGameScene,
    TutorialScene,
    GameScene,
    InteriorScene
  ],
  physics: {
    default: "arcade",
    arcade: {
      //debug: true,
      gravity: { y: 0 },
    },
    input: {
      gamepad: true,
    },
  },
  dom: {
    createContainer: true
  },
};

const game = new Phaser.Game(config);
