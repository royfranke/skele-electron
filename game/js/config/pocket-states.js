const POCKET_CONFIG = {
    POCKETS: [
        {
            TYPE: 'SHOULDERS',
            STATE: 'EMPTY',
            EMPTY: {NAME:'shoulders', ICON:'shoulders'},
            COLOR: {
                EMPTY: 'silver',
                SELECTED: 'gold',
                WEARS: 'bronze',
                HOLDS: 'red',
                EQUIPT: 'red',
            },
            WEARS: null,
        },
        {
            TYPE: 'HAND',
            STATE: 'EMPTY',
            EMPTY: {NAME:'right', ICON:'rightHand'},
            COLOR: {
                EMPTY: 'gold',
                SELECTED: 'yellow',
                HOLDS: 'lightBlue',
                EQUIPT: 'bronze',
                WEARS: 'red',
            },
            HOLDS: null,
            EQUIPT: null,
        },
        {
            TYPE: 'HAND',
            STATE: 'EMPTY',
            EMPTY: {NAME:'left', ICON:'leftHand'},
            COLOR: {
                EMPTY: 'gold',
                SELECTED: 'yellow',
                HOLDS: 'lightBlue',
                EQUIPT: 'silver',
                WEARS: 'red',
            },
            HOLDS: null,
            EQUIPT: null,
        },
    ],

    STATES: [
        'EMPTY',
        'HOLDS',
        'WEARS',
        'EQUIPT'
    ],

    TYPES: [
        'HAND',
        'SHOULDERS'
    ],

    ALLOWED: {
        HAND: ['EMPTY','EQUIPT','HOLDS'],
        SHOULDERS: ['EMPTY','WEARS']
    }
};

export default POCKET_CONFIG;
