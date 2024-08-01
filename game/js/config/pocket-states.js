const POCKET_CONFIG = {
    POCKETS: {
        SLOTS: [{
            TYPE: 'SHOULDERS',
            STATE: 'EMPTY',
            EMPTY: {NAME:'shoulders', ICON:'shoulders'},
            HOLDS: 'DISALLOWED',
            USES: 'DISALLOWED',
            WEARS: null,
        },
        {
            TYPE: 'HAND',
            STATE: 'EMPTY',
            EMPTY: {NAME:'right', ICON:'rightHand'},
            HOLDS: null,
            USES: null,
            WEARS: 'DISALLOWED'
        },
        {
            TYPE: 'HAND',
            STATE: 'EMPTY',
            EMPTY: {NAME:'left', ICON:'leftHand'},
            HOLDS: null,
            USES: null,
            WEARS: 'DISALLOWED'
        }],
        STATES: [
            'EMPTY',
            'HOLDS',
            'WEARS',
            'USES'
        ],
    }
};

export default POCKET_CONFIG;
