const PLAYER_STATES = {
    CURL_UP: {
        name: 'CURL_UP',
        input: false,
        speed: 0
    },
    DIG: {
        name: 'DIG',
        input: false,
        speed: 0
    },
    EAT: {
        name: 'EAT',
        input: false,
        speed: 0
    },
    EXCHANGE: {
        name: 'EXCHANGE',
        speed: 0
    },
    HOP: {
        name: 'HOP',
        input: true,
        speed: 80
    },
    IDLE: {
        name: 'IDLE',
        input: true,
        speed: 0
    },
    PICKUP: {
        name: 'PICKUP',
        speed: 0
    },
    PULL: {
        name: 'PULL',
        input: true,
        speed: -20
    },
    PUSH: {
        name: 'PUSH',
        input: true,
        speed: 20
    },
    RUN: {
        name: 'RUN',
        input: true,
        speed: 140
    },
    SLEEP: {
        name: 'SLEEP',
        speed: 0
    },
    TRIP: {
        name: 'TRIP',
        speed: 0
    },
    WALK: {
        name: 'WALK',
        input: true,
        speed: 70
    },
};

export default PLAYER_STATES;
