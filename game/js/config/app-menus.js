const app_menus = {
  MAIN: [
    { LABEL: 'Load Test', TYPE: 'SCENE', LOADER: 'GAME' },
    { LABEL: 'Load Game', TYPE: 'SCENE', LOADER: 'LOAD' },
    { LABEL: 'New Game', TYPE: 'SCENE', LOADER: 'NEW' },
    { LABEL: 'Settings', TYPE: 'SCENE', LOADER: 'SETTINGS' },
  ],
  PAUSE: [
    { LABEL: 'Save', LOADER: 'saveGame' },
    { LABEL: 'Exit', LOADER: 'exitGame' },
    { LABEL: 'Quit', LOADER: 'quitGame' },
  ],
  SETTINGS: [
    { LABEL: 'Back to Menu', TYPE: 'SCENE', LOADER: 'MAIN' },
    { LABEL: 'Controls', TYPE: 'FUNCTION', LOADER: 'settingControls' },
    { LABEL: 'Graphics', TYPE: 'FUNCTION', LOADER: 'settingGraphics' },
    { LABEL: 'Volume', TYPE: 'FUNCTION', LOADER: 'settingVolume' },
    { LABEL: 'Options', TYPE: 'FUNCTION', LOADER: 'settingOptions' }
  ],
  NEW: [
    { LABEL: 'Back to Menu', TYPE: 'SCENE', LOADER: 'MAIN' },
  ],
  LOAD: [
    { LABEL: 'Back to Menu', TYPE: 'SCENE', LOADER: 'MAIN' },
  ]
};

export default app_menus;
