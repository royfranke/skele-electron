const SPRITE_DIR = {
    STATES: [
        'IDLE',
        'WALK',
        'RUN',
        'DIG',
        'EAT',
        'HOP',
        'EXCHANGE',
        'TRIP',
        'PICKUP',
        'PUSH',
        'PULL',
        'SLEEP',
        'CURL_UP'
    ],
    FACES: [
        'N',
        'N_SIDE',
        'SIDE',
        'S',
        'S_SIDE',
    ],
    DIR: [
        'n',
        'ne',
        'e',
        'se',
        's',
        'sw',
        'w',
        'nw'
    ],
    DIR_TILE: {
        n: {
            x: 0,
            y: -1,
            mx: 2,
            my: 0,
        },
        ne: {
            x: 1,
            y: -1,
            mx: 1,
            my: -1
        },
        e: {
            x:1,
            y:0,
            mx:2,
            my:0
        },
        s: {
            x: 0,
            y: 1,
            mx: 0,
            my: 2
        },
        se: {
            x: 1,
            y: 1,
            mx: 0,
            my: 2
        },
        sw: {
            x: -1,
            y: 1,
            mx: 0,
            my: 2
        },
        w: {
            x: -1,
            y: 0,
            mx: -1,
            my: 2
        },
        nw: {
            x: -1,
            y: -1,
            mx: -2,
            my: -1
        },
    },
    DIR_FACES: {
        n: 'N',
        ne: 'N_SIDE',
        e: 'SIDE',
        se: 'S_SIDE',
        s: 'S',
        sw: 'S_SIDE',
        w: 'SIDE',
        nw: 'N_SIDE'
    },
    IDLE: {
        ANIM: {
            N: {
                START: 0,
                END: 15,
            },
            N_SIDE: {
                START: 16,
                END: 31,
            },
            SIDE: {
                START: 32,
                END: 47,
            },
            S_SIDE: {
                START: 48,
                END: 63,
            },
            S: {
                START: 64,
                END: 79,
            }
        },
    },
    WALK: {
        ANIM: {
            N: {
                START: 0,
                END: 7,
            },
            N_SIDE: {
                START: 8,
                END: 15,
            },
            SIDE: {
                START: 16,
                END: 23,
            },
            S_SIDE: {
                START: 24,
                END: 31,
            },
            S: {
                START: 32,
                END: 39,
            }
        },
    },
    RUN: {
        ANIM: {
            N: {
                START: 0,
                END: 7,
            },
            N_SIDE: {
                START: 8,
                END: 15,
            },
            SIDE: {
                START: 16,
                END: 23,
            },
            S_SIDE: {
                START: 24,
                END: 31,
            },
            S: {
                START: 32,
                END: 39,
            }
        },
    },
    DIG: {
        ANIM: {
            N: {
                START: 0,
                END: 9,
            },
            N_SIDE: {
                START: 0,
                END: 9,
            },
            SIDE: {
                START: 0,
                END: 9,
            },
            S_SIDE: {
                START: 0,
                END: 9,
            },
            S: {
                START: 0,
                END: 9,
            }
        },
    },
    EAT: {
        ANIM: {
            N: {
                START: 0,
                END: 10,
            },
            N_SIDE: {
                START: 0,
                END: 10,
            },
            SIDE: {
                START: 0,
                END: 10,
            },
            S_SIDE: {
                START: 0,
                END: 10,
            },
            S: {
                START: 0,
                END: 10,
            }
        },
    },
    PICKUP: {
        ANIM: {
            N: {
                START: 0,
                END: 8,
            },
            N_SIDE: {
                START: 0,
                END: 8,
            },
            SIDE: {
                START: 0,
                END: 8,
            },
            S_SIDE: {
                START: 0,
                END: 8,
            },
            S: {
                START: 0,
                END: 8,
            }
        },
    },
    EXCHANGE: {
        ANIM: {
            N: {
                START: 0,
                END: 3,
            },
            N_SIDE: {
                START: 0,
                END: 3,
            },
            SIDE: {
                START: 0,
                END: 3,
            },
            S_SIDE: {
                START: 0,
                END: 3,
            },
            S: {
                START: 0,
                END: 3,
            }
        },
    },
    HOP: {
        ANIM: {
            N: {
                START: 0,
                END: 7,
            },
            N_SIDE: {
                START: 8,
                END: 15,
            },
            SIDE: {
                START: 16,
                END: 23,
            },
            S_SIDE: {
                START: 24,
                END: 31,
            },
            S: {
                START: 32,
                END: 39,
            }
        },
    },
    PULL: {
        ANIM: {
            N: {
                START: 0,
                END: 7,
            },
            N_SIDE: {
                START: 8,
                END: 15,
            },
            SIDE: {
                START: 16,
                END: 23,
            },
            S_SIDE: {
                START: 24,
                END: 31,
            },
            S: {
                START: 32,
                END: 39,
            }
        },
    },
    PUSH: {
        ANIM: {
            N: {
                START: 0,
                END: 7,
            },
            N_SIDE: {
                START: 8,
                END: 15,
            },
            SIDE: {
                START: 16,
                END: 23,
            },
            S_SIDE: {
                START: 24,
                END: 31,
            },
            S: {
                START: 32,
                END: 39,
            }
        },
    },
    TRIP: {
        ANIM: {
            N: {
                START: 0,
                END: 12,
            },
            N_SIDE: {
                START: 0,
                END: 12,
            },
            SIDE: {
                START: 0,
                END: 12,
            },
            S_SIDE: {
                START: 0,
                END: 12,
            },
            S: {
                START: 0,
                END: 12,
            }
        }
    },
    CURL_UP: {
        ANIM: {
            N: {
                START: 0,
                END: 10,
            },
            N_SIDE: {
                START: 0,
                END: 10,
            },
            SIDE: {
                START: 0,
                END: 10,
            },
            S_SIDE: {
                START: 0,
                END: 10,
            },
            S: {
                START: 0,
                END: 10,
            }
        }
    },
    SLEEP: {
        ANIM: {
            N: {
                START: 0,
                END: 9,
            },
            N_SIDE: {
                START: 0,
                END: 9,
            },
            SIDE: {
                START: 0,
                END: 9,
            },
            S_SIDE: {
                START: 0,
                END: 9,
            },
            S: {
                START: 0,
                END: 9,
            }
        },
    }
}

export default SPRITE_DIR;
