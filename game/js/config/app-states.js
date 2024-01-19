const APP_STATES = {
    SPLASH: {
        name: 'SPLASH',
        super: 'Splash',
        fadeIn: 1000,
        fadeOut: 500,
        autoEnd: 2000,
        next: 'MAIN',
        menu: false,
        input: false
    },
    MAIN: {
        name: 'MAIN',
        super: 'Main Menu',
        fadeIn: 250,
        fadeOut: 500,
        autoEnd: 0,
        menu: true,
        input: true,
        app_input: true,
        prog_input: false
    },
    SETTINGS: {
        name: 'SETTINGS',
        super: 'System Settings',
        fadeIn: 500,
        fadeOut: 1000,
        autoEnd: 0,
        menu: true,
        input: true,
        app_input: true,
        prog_input: true
    },
    NEW: {
        name: 'NEW',
        super: 'New Game',
        fadeIn: 1000,
        fadeOut: 1000,
        autoEnd: 0,
        menu: true,
        input: true,
        app_input: true,
        prog_input: false
    },
    LOAD: {
        name: 'LOAD',
        super: 'Load Game',
        fadeIn: 1000,
        fadeOut: 1000,
        autoEnd: 0,
        menu: true,
        input: true,
        app_input: true,
        prog_input: false
    },
    TUTORIAL: {
        name: 'TUTORIAL',
        super: 'Tutorial',
        fadeIn: 1000,
        fadeOut: 1000,
        autoEnd: 0,
        menu: false,
        input: true,
        app_input: true,
        prog_input: true
    },
    GAME: {
        name: 'GAME',
        super: 'Game Scene',
        fadeIn: 1000,
        fadeOut: 1000,
        autoEnd: 0,
        menu: false,
        input: true,
        app_input: true,
        prog_input: true
    },
};

export default APP_STATES;
