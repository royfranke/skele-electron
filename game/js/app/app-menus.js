const app_menus = {
  MAIN: [
    //{ LABEL: 'New Game', TYPE: 'SCENE', LOADER: 'NEW', BUTTON: 'SELECT', BUTTON_STICK: false },
    { LABEL: 'Load Game', TYPE: 'SCENE', LOADER: 'LOAD', BUTTON: 'SELECT', BUTTON_STICK: false },
    { LABEL: 'Settings', TYPE: 'SCENE', LOADER: 'SETTINGS', BUTTON: 'SELECT', BUTTON_STICK: false },
  ],
  PAUSE: [
    { LABEL: 'Save', LOADER: 'saveGame' },
    { LABEL: 'Exit', LOADER: 'exitGame' },
    { LABEL: 'Quit', LOADER: 'quitGame' },
  ],
  LOAD: [
    { LABEL: 'Back to Menu', TYPE: 'SCENE', LOADER: 'MAIN', BUTTON: 'BACK', BUTTON_STICK: true },
    { LABEL: 'Slot 1', TYPE: 'LOADSAVE', LOADER: 'SLOT_0', BUTTON: 'SELECT', BUTTON_STICK: false },
    { LABEL: 'Slot 2', TYPE: 'LOADSAVE', LOADER: 'SLOT_1', BUTTON: 'SELECT', BUTTON_STICK: false },
    { LABEL: 'Slot 3', TYPE: 'LOADSAVE', LOADER: 'SLOT_2', BUTTON: 'SELECT', BUTTON_STICK: false },
  ],
  SETTINGS: [
    { LABEL: 'Back to Menu', TYPE: 'SCENE', LOADER: 'MAIN', BUTTON: 'BACK', BUTTON_STICK: true },
    { LABEL: 'Content', TYPE: 'LOADSETTINGS', LOADER: 'SETTINGS_CONTENT', BUTTON: 'SELECT', BUTTON_STICK: false },
    { LABEL: 'Audio', TYPE: 'LOADSETTINGS', LOADER: 'SETTINGS_AUDIO', BUTTON: 'SELECT', BUTTON_STICK: false },
    { LABEL: 'Controls', TYPE: 'LOADSETTINGS', LOADER: 'SETTINGS_INPUT', BUTTON: 'SELECT', BUTTON_STICK: false },
  ]
};

export default app_menus;
