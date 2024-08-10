const HUD_REGIONS = {
    POCKETS: {
        SLOTS: [{
            TYPE: 'SHOULDERS',
            STATE: 'EMPTY',
            EMPTY: {NAME:'shoulders', ICON:'SHOULDERS'},
            HOLDS: 'DISALLOWED',
            USES: 'DISALLOWED',
            WEARS: null,
        },
        {
            TYPE: 'HAND',
            STATE: 'EMPTY',
            EMPTY: {NAME:'right', ICON:'RIGHT_HAND'},
            HOLDS: null,
            USES: null,
            WEARS: 'DISALLOWED'
        },
        {
            TYPE: 'HAND',
            STATE: 'EMPTY',
            EMPTY: {NAME:'left', ICON:'LEFT_HAND'},
            HOLDS: null,
            USES: null,
            WEARS: 'DISALLOWED'
        }],
    },
    
};

export default HUD_REGIONS;
