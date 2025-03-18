const APP_STATES = {
    SPLASH: {
        name: 'SPLASH',
        super: 'Splash',
        fadeIn: 500,
        fadeOut: 300,
        autoEnd: 2000,
        next: 'MAIN',
        menu: false,
        input: false,
        save: false
    },
    MAIN: {
        name: 'MAIN',
        super: 'Main Menu',
        fadeIn: 250,
        irisIn: 1000,
        fadeOut: 250,
        autoEnd: 0,
        menu: true,
        input: true,
        app_input: true,
        avail_input: false,
        save: false
    },
    SETTINGS: {
        name: 'SETTINGS',
        super: 'System Settings',
        fadeIn: 250,
        fadeOut: 250,
        autoEnd: 0,
        menu: true,
        input: true,
        app_input: true,
        avail_input: false,
        save: false
    },
    NEW: {
        name: 'NEW',
        super: 'New Game',
        fadeIn: 1000,
        fadeOut: 1000,
        autoEnd: 0,
        menu: false,
        input: false,
        app_input: false,
        avail_input: false,
        save: true
    },
    LOAD: {
        name: 'LOAD',
        super: 'Load Game',
        fadeIn: 250,
        fadeOut: 250,
        autoEnd: 0,
        menu: true,
        input: true,
        app_input: true,
        avail_input: false,
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
        avail_input: true,
        save: false
    },
    GAME: {
        name: 'GAME',
        super: 'Game Scene',
        fadeIn: 0,
        irisIn: 1000,
        fadeOut: 1000,
        autoEnd: 0,
        menu: false,
        input: true,
        app_input: true,
        avail_input: false,
        save: true
    },
    COURTS: {
        name: 'COURTS',
        super: 'Courts Scene',
        fadeIn: 500,
        irisIn: 0,
        fadeOut: 500,
        autoEnd: 0,
        menu: false,
        input: true,
        app_input: true,
        avail_input: false,
        save: false
    },
};

export default APP_STATES;
