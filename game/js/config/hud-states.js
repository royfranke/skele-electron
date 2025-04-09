const HUD_STATES = {
    NOT_LOADED: {
        name: 'NOT_LOADED',
        input: false,
        visible: false
    },
    HUD_LOADED: {
        name: 'HUD_LOADED',
        input: false,
        time: false,
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
    POCKETS_FOCUSED: {
        name: 'POCKETS_FOCUSED',
        input: true,
        visible: true
    },
    SOCKS_FOCUSED: {
        name: 'SOCKS_FOCUSED',
        input: true,
        visible: true
    },
    ZENER_FOCUSED: {
        name: 'ZENER_FOCUSED',
        input: true,
        visible: true
    },
   MAP_FOCUSED: {
        name: 'MAP_FOCUSED',
        input: true,
        visible: true
    },
    NOTEBOOK_FOCUSED: {
        name: 'NOTEBOOK_FOCUSED',
        input: true,
        visible: true
    },
    DIALOG_FOCUSED: {
        name: 'DIALOG_FOCUSED',
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
