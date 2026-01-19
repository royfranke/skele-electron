const GAME_STATES = {
    NOT_LOADED: {
        name: 'NOT_LOADED',
        input: false,
        time: false,
        hud: 'INVISIBLE'
    },
    LOADING: {
        name: 'LOADING',
        input: false,
        time: false,
        hud: 'INVISIBLE'
    },
    LOADED: {
        name: 'LOADED',
        input: true,
        time: false,
        hud: 'INVISIBLE'
    },
    TUTORIAL: {
        name: 'TUTORIAL',
        input: true,
        time: false,
        hud: 'INVISIBLE'
    },
    OVERWORLD: {
        name: 'OVERWORLD',
        input: true,
        time: true,
        hud: 'VISIBLE_UNFOCUSED'
    },
    INTERIOR: {
        name: 'INTERIOR',
        input: true,
        time: true,
        hud: 'VISIBLE_UNFOCUSED'
    },
    DREAM: {
        name: 'DREAM',
        input: true,
        time: false,
        hud: 'VISIBLE_UNFOCUSED'
    }
};

export default GAME_STATES;
