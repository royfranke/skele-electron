const APP_STATES = {
    SPLASH: {
        name: 'SPLASH',
        super: 'Splash',
        fadeIn: 500,
        fadeOut: 500,
        autoEnd: 1500,
        next: 'MAIN',
        menu: false,
        input: false,
        save: false
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
        prog_input: false,
        save: false
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
        prog_input: true,
        save: false
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
        prog_input: false,
        save: true
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
        prog_input: false,
        save: true
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
        prog_input: true,
        save: false
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
        prog_input: true,
        save: true
    },
};

export default APP_STATES;
