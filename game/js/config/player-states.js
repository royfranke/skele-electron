const PLAYER_STATES = {
    IDLE: {
        name: 'IDLE',
        input: true,
        speed: 0
    },
    WALK: {
        name: 'WALK',
        input: true,
        speed: 70
    },
    RUN: {
        name: 'RUN',
        input: true,
        speed: 140
    },
    DIG: {
        name: 'DIG',
        input: false,
        speed: 0
    },
    HOP: {
        name: 'HOP',
        input: true,
        speed: 80
    },
    PUSH: {
        name: 'PUSH',
        input: true,
        speed: 20
    },
    PULL: {
        name: 'PULL',
        input: true,
        speed: -20
    },
};
    
    export default PLAYER_STATES;
    