const HUD_STATES = {
    NOT_LOADED: {
        name: 'NOT_LOADED',
        input: false,
        visible: false
    },
    LOADING: {
        name: 'LOADING',
        input: false,
        visible: false
    },
    LOADED: {
        name: 'LOADED',
        input: false,
        visible: true
    },
    VISIBLE_FOCUSED: {
        name: 'VISIBLE_FOCUSED',
        input: true,
        visible: true
    },
    VISIBLE_UNFOCUSED: {
        name: 'VISIBLE_UNFOCUSED',
        input: false,
        visible: true
    },
    INVISIBLE: {
        name: 'INVISIBLE',
        input: false,
        visible: false
    }
};

export default HUD_STATES;
