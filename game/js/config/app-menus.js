const app_menus = {
  MAIN: [
    { LABEL: 'Load Test', TYPE: 'SCENE', LOADER: 'GAME', BUTTON: 'SELECT', BUTTON_STICK: false },
    { LABEL: 'Load Game', TYPE: 'SCENE', LOADER: 'LOAD', BUTTON: 'SELECT', BUTTON_STICK: false },
    { LABEL: 'Settings', TYPE: 'SCENE', LOADER: 'SETTINGS', BUTTON: 'SELECT', BUTTON_STICK: false },
  ],
  PAUSE: [
    { LABEL: 'Save', LOADER: 'saveGame' },
    { LABEL: 'Exit', LOADER: 'exitGame' },
    { LABEL: 'Quit', LOADER: 'quitGame' },
  ],
  SETTINGS: [
    { LABEL: 'Back to Menu', TYPE: 'SCENE', LOADER: 'MAIN', BUTTON: 'BACK', BUTTON_STICK: true },
    { LABEL: 'Controls', TYPE: 'FUNCTION', LOADER: 'settingControls', BUTTON: 'SELECT', BUTTON_STICK: false },
    { LABEL: 'Graphics', TYPE: 'FUNCTION', LOADER: 'settingGraphics', BUTTON: 'SELECT', BUTTON_STICK: false },
    { LABEL: 'Volume', TYPE: 'FUNCTION', LOADER: 'settingVolume', BUTTON: 'SELECT', BUTTON_STICK: false },
    { LABEL: 'Options', TYPE: 'FUNCTION', LOADER: 'settingOptions', BUTTON: 'SELECT', BUTTON_STICK: false }
  ],
  LOAD: [
    { LABEL: 'Back to Menu', TYPE: 'SCENE', LOADER: 'MAIN', BUTTON: 'BACK', BUTTON_STICK: true },
    { LABEL: 'Slot 1', TYPE: 'FUNCTION', LOADER: 'selectSlot1', BUTTON: 'SELECT', BUTTON_STICK: false },
    { LABEL: 'Slot 2', TYPE: 'FUNCTION', LOADER: 'selectSlot2', BUTTON: 'SELECT', BUTTON_STICK: false },
    { LABEL: 'Slot 3', TYPE: 'FUNCTION', LOADER: 'selectSlot3', BUTTON: 'SELECT', BUTTON_STICK: false },
  ]
};

export default app_menus;
