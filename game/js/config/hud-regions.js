const HUD_REGIONS = {
    POCKETS: {
        SLOTS: [{
            TYPE: 'SHOULDERS',
            STATE: 'EMPTY',
            EMPTY: {NAME:'shoulders', ICON:'shoulders'},
            HOLDS: 'DISALLOWED',
            EQUIPT: 'DISALLOWED',
            WEARS: null,
        },
        {
            TYPE: 'HAND',
            STATE: 'EMPTY',
            EMPTY: {NAME:'right', ICON:'rightHand'},
            HOLDS: null,
            EQUIPT: null,
            WEARS: 'DISALLOWED'
        },
        {
            TYPE: 'HAND',
            STATE: 'EMPTY',
            EMPTY: {NAME:'left', ICON:'leftHand'},
            HOLDS: null,
            EQUIPT: null,
            WEARS: 'DISALLOWED'
        }],
    },
    
};

export default HUD_REGIONS;
