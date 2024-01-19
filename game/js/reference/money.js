const MONEY = {
    COIN: {
        1: 'PENNY',
        5: 'NICKEL',
        10: 'DIME',
        25: 'QUARTER',
        PENNY: 1,
        NICKEL: 5,
        DIME: 10,
        QUARTER: 25
    },
    PAPER: {
        100: 'ONE',
        200: 'TWO',
        500: 'FIVE',
        1000: 'TEN',
        2000: 'TWENTY',
        5000: 'FIFTY',
        10000: 'HUNDRED',
        ONE:100,
        TWO:200,
        FIVE:500,
        TEN:1000,
        TWENTY:2000,
        FIFTY:5000,
        HUNDRED:10000,
    },
    COINS: [
        'PENNY',
        'NICKEL',
        'DIME',
        'QUARTER',
    ],
    PAPERS: [
        'ONE',
        'TWO',
        'FIVE',
        'TEN',
        'TWENTY',
        'FIFTY',
        'HUNDRED',
    ],
    ANIM: {
        QUARTER: {
            START: 0,
            END: 7,
            HEADS: {
                START: 4,
                END: 7,
            },
            TAILS: {
                START: 0,
                END: 3,
            }
        },
        NICKEL: {
            START: 8,
            END: 15,
            HEADS: {
                START: 12,
                END: 15,
            },
            TAILS: {
                START: 8,
                END: 11,
            }
        },
        DIME: {
            START: 16,
            END: 23,
            HEADS: {
                START: 16,
                END: 19,
            },
            TAILS: {
                START: 20,
                END: 23,
            }
        },
        PENNY: {
            START: 24,
            END: 31,
            HEADS: {
                START: 24,
                END: 27,
            },
            TAILS: {
                START: 28,
                END: 31,
            }
        }
    },
};

export default MONEY;
