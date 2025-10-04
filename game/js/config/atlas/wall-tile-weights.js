// Our custom tile mapping with:
// - Single index for putTileAt
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const TILE_WEIGHTS = {
  BLANK: 0,
  WALLPAPER: {
    FILL_: {
                            },
    BLUE_STRIPED_: {
          TOP_:
          [{
            index: [1, 2, 3],
            weight: 1
          }],
              MID_:
          [{
            index: [4, 5, 6],
            weight: 1
          }],
              LOWER_:
          [{
            index: [7, 8, 9],
            weight: 1
          }],
        },
    STRIPED_GRAY_CREAM_: {
          TOP_:
          [{
            index: [10, 11, 12],
            weight: 1
          }],
              MID_:
          [{
            index: [13, 14, 15],
            weight: 1
          }],
              LOWER_:
          [{
            index: [16, 17, 18],
            weight: 1
          }],
        },
},
  PAINT: {
    GREEN_PURPLE_: {
          TOP_:
          [{
            index: [19, 20, 21],
            weight: 1
          }],
              MID_:
          [{
            index: [22, 23, 24],
            weight: 1
          }],
              LOWER_:
          [{
            index: [25, 26, 27],
            weight: 1
          }],
        },
    GRAY_WORN_: {
          TOP_:
          [{
            index: [28, 29, 30],
            weight: 1
          }],
              MID_:
          [{
            index: [31, 32, 33],
            weight: 1
          }],
              LOWER_:
          [{
            index: [34, 35, 36],
            weight: 1
          }],
        },
    WHITE_WORN_: {
          TOP_:
          [{
            index: [37, 38, 39],
            weight: 1
          }],
              MID_:
          [{
            index: [40, 41, 42],
            weight: 1
          }],
              LOWER_:
          [{
            index: [43, 44, 45],
            weight: 1
          }],
        },
    PURPLE_WORN_LIGHT_: {
          TOP_:
          [{
            index: [46, 47, 48],
            weight: 1
          }],
              MID_:
          [{
            index: [49, 50, 51],
            weight: 1
          }],
              LOWER_:
          [{
            index: [52, 53, 54],
            weight: 1
          }],
        },
    BLUE_WORN_LIGHT_: {
          TOP_:
          [{
            index: [55, 56, 57],
            weight: 1
          }],
              MID_:
          [{
            index: [58, 59, 60],
            weight: 1
          }],
              LOWER_:
          [{
            index: [61, 62, 63],
            weight: 1
          }],
        },
    YELLOW_DINGY_LIGHT_: {
          TOP_:
          [{
            index: [64, 65, 66],
            weight: 1
          }],
              MID_:
          [{
            index: [67, 68, 69],
            weight: 1
          }],
              LOWER_:
          [{
            index: [70, 71, 72],
            weight: 1
          }],
        },
    DARK_GREEN_WORN_: {
          TOP_:
          [{
            index: [73, 74, 75],
            weight: 1
          }],
              MID_:
          [{
            index: [76, 77, 78],
            weight: 1
          }],
              LOWER_:
          [{
            index: [79, 80, 81],
            weight: 1
          }],
        },
    PINK_WORN_: {
          TOP_:
          [{
            index: [82, 83, 84],
            weight: 1
          }],
              MID_:
          [{
            index: [85, 86, 87],
            weight: 1
          }],
              LOWER_:
          [{
            index: [88, 89, 90],
            weight: 1
          }],
        },
},
  CEMENT: {
    GRAY_: {
        TOP_LEFT_:
          [{
            index: [91],
            weight: 1
          }],
        TOP_:
          [{
            index: [92, 93],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [94],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [95],
            weight: 1
          }],
        MID_:
          [{
            index: [96, 97],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [98],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [99],
            weight: 1
          }],
        LOWER_:
          [{
            index: [100, 101],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [102],
            weight: 1
          }],
      },
    FILL_: {
                            },
},
  STUDS: {
},
  PANELS: {
    DARK_WOOD_VERTICAL_: {
          TOP_:
          [{
            index: [103, 104, 105],
            weight: 1
          }],
              MID_:
          [{
            index: [106, 107, 108],
            weight: 1
          }],
              LOWER_:
          [{
            index: [109, 110, 111],
            weight: 1
          }],
        },
    WHITE_WOOD_VERTICAL_: {
          TOP_:
          [{
            index: [112, 113, 114],
            weight: 1
          }],
              MID_:
          [{
            index: [115, 116, 117],
            weight: 1
          }],
              LOWER_:
          [{
            index: [118, 119, 120],
            weight: 1
          }],
        },
},
  TILE: {
    FILL_: {
                            },
},
  WAINSCOTING: {
    FILL_: {
                            },
},
  BRICK: {
    YELLOW_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [121],
            weight: 1
          }],
        TOP_:
          [{
            index: [122, 123],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [124],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [125],
            weight: 1
          }],
        MID_:
          [{
            index: [126, 127],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [128],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [129],
            weight: 1
          }],
        LOWER_:
          [{
            index: [130, 131],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [132],
            weight: 1
          }],
      },
    RED_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [133],
            weight: 1
          }],
        TOP_:
          [{
            index: [134, 135],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [136],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [137],
            weight: 1
          }],
        MID_:
          [{
            index: [138, 139],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [140],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [141],
            weight: 1
          }],
        LOWER_:
          [{
            index: [142, 143],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [144],
            weight: 1
          }],
      },
    WHITE_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [145],
            weight: 1
          }],
        TOP_:
          [{
            index: [146, 147],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [148],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [149],
            weight: 1
          }],
        MID_:
          [{
            index: [150, 151],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [152],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [153],
            weight: 1
          }],
        LOWER_:
          [{
            index: [154, 155],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [156],
            weight: 1
          }],
      },
    GRAY_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [157],
            weight: 1
          }],
        TOP_:
          [{
            index: [158, 159],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [160],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [161],
            weight: 1
          }],
        MID_:
          [{
            index: [162, 163],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [164],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [165],
            weight: 1
          }],
        LOWER_:
          [{
            index: [166, 167],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [168],
            weight: 1
          }],
      },
    CEMENT_STONE_: {
        TOP_LEFT_:
          [{
            index: [169],
            weight: 1
          }],
        TOP_:
          [{
            index: [170, 171],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [172],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [173],
            weight: 1
          }],
        MID_:
          [{
            index: [174, 175],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [176],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [177],
            weight: 1
          }],
        LOWER_:
          [{
            index: [178, 179],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [180],
            weight: 1
          }],
      },
    BROWN_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [181],
            weight: 1
          }],
        TOP_:
          [{
            index: [182, 183],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [184],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [185],
            weight: 1
          }],
        MID_:
          [{
            index: [186, 187],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [188],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [189],
            weight: 1
          }],
        LOWER_:
          [{
            index: [190, 191],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [192],
            weight: 1
          }],
      },
    RED_WEATHERED_: {
        TOP_LEFT_:
          [{
            index: [211],
            weight: 1
          }],
        TOP_:
          [{
            index: [212, 213, 214, 215],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [216],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [217, 219],
            weight: 1
          }],
        MID_:
          [{
            index: [193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [218, 220],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [307],
            weight: 1
          }],
        LOWER_:
          [{
            index: [308, 309, 310, 311],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [312],
            weight: 1
          }],
      },
    RED_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [236],
            weight: 1
          }],
        TOP_:
          [{
            index: [237, 238, 239],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [240],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [221, 226],
            weight: 1
          }],
        MID_:
          [{
            index: [222, 223, 224, 227, 228, 229],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [225, 230],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [231],
            weight: 1
          }],
        LOWER_:
          [{
            index: [232, 233, 234],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [235],
            weight: 1
          }],
      },
    YELLOW_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [241],
            weight: 1
          }],
        TOP_:
          [{
            index: [242, 243, 244],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [245],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [246, 251],
            weight: 1
          }],
        MID_:
          [{
            index: [247, 248, 249, 252, 253, 254],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [250, 255],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [256],
            weight: 1
          }],
        LOWER_:
          [{
            index: [257, 258, 259],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [260],
            weight: 1
          }],
      },
    BLACK_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [261],
            weight: 1
          }],
        TOP_:
          [{
            index: [262, 263, 264],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [265],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [266, 271],
            weight: 1
          }],
        MID_:
          [{
            index: [267, 268, 269, 272, 273, 274],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [270, 275],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [276],
            weight: 1
          }],
        LOWER_:
          [{
            index: [277, 278, 279],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [280],
            weight: 1
          }],
      },
    BLUE_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [281],
            weight: 1
          }],
        TOP_:
          [{
            index: [282, 283, 284],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [285],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [286, 291],
            weight: 1
          }],
        MID_:
          [{
            index: [287, 288, 289, 292, 293, 294],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [290, 295],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [296],
            weight: 1
          }],
        LOWER_:
          [{
            index: [297, 298, 299],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [300],
            weight: 1
          }],
      },
    FILL_: {
                            },
    YELLOW_WEATHERED_: {
                        LOWER_LEFT_:
          [{
            index: [301],
            weight: 1
          }],
        LOWER_:
          [{
            index: [302, 303, 304, 305],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [306],
            weight: 1
          }],
      },
},
  STONE: {
},
  STUCCO: {
},
  BORDER: {
    SECTIONED_: {
        TOP_LEFT_:
          [{
            index: [324],
            weight: 1
          }],
          TOP_RIGHT_:
          [{
            index: [325],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [326],
            weight: 1
          }],
          MID_RIGHT_:
          [{
            index: [327],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [313],
            weight: 1
          }],
          LOWER_RIGHT_:
          [{
            index: [314],
            weight: 1
          }],
      },
    TOPVIEW_: {
        TOP_LEFT_:
          [{
            index: [315],
            weight: 1
          }],
        TOP_:
          [{
            index: [316, 319, 322],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [317],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [318],
            weight: 1
          }],
          MID_RIGHT_:
          [{
            index: [320],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [321],
            weight: 1
          }],
          LOWER_RIGHT_:
          [{
            index: [323],
            weight: 1
          }],
      },
    SECTIONED_CEMENT_: {
                          LOWER_:
          [{
            index: [328, 329, 330],
            weight: 1
          }],
        },
    SECTIONED_CARPET_: {
                          LOWER_:
          [{
            index: [331, 332, 333],
            weight: 1
          }],
        },
    SECTIONED_TILE_: {
                          LOWER_:
          [{
            index: [334, 335, 336],
            weight: 1
          }],
        },
    SECTIONED_PLANK_: {
                          LOWER_:
          [{
            index: [337, 338, 339],
            weight: 1
          }],
        },
},
  SIDING: {
    BLUE_WOOD_: {
        TOP_LEFT_:
          [{
            index: [340],
            weight: 1
          }],
        TOP_:
          [{
            index: [341, 342, 343, 344],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [345],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [346],
            weight: 1
          }],
        MID_:
          [{
            index: [347, 348, 349, 350],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [351],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [352],
            weight: 1
          }],
        LOWER_:
          [{
            index: [353, 354, 355, 356],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [357],
            weight: 1
          }],
      },
    GRAY_WOOD_: {
        TOP_LEFT_:
          [{
            index: [358],
            weight: 1
          }],
        TOP_:
          [{
            index: [359, 360, 361, 362],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [363],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [364],
            weight: 1
          }],
        MID_:
          [{
            index: [365, 366, 367, 368],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [369],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [370],
            weight: 1
          }],
        LOWER_:
          [{
            index: [371, 372, 373, 374],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [375],
            weight: 1
          }],
      },
    ORANGE_WOOD_: {
        TOP_LEFT_:
          [{
            index: [376],
            weight: 1
          }],
        TOP_:
          [{
            index: [377, 378, 379, 380],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [381],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [382],
            weight: 1
          }],
        MID_:
          [{
            index: [383, 384, 385, 386],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [387],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [388],
            weight: 1
          }],
        LOWER_:
          [{
            index: [389, 390, 391, 392],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [393],
            weight: 1
          }],
      },
    PURPLE_WOOD_: {
        TOP_LEFT_:
          [{
            index: [394],
            weight: 1
          }],
        TOP_:
          [{
            index: [395, 396, 397, 398],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [399],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [400],
            weight: 1
          }],
        MID_:
          [{
            index: [401, 402, 403, 404],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [405],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [406],
            weight: 1
          }],
        LOWER_:
          [{
            index: [407, 408, 409, 410],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [411],
            weight: 1
          }],
      },
    YELLOW_WOOD_: {
        TOP_LEFT_:
          [{
            index: [412],
            weight: 1
          }],
        TOP_:
          [{
            index: [413, 414, 415, 416],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [417],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [418],
            weight: 1
          }],
        MID_:
          [{
            index: [419, 420, 421, 422],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [423],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [424],
            weight: 1
          }],
        LOWER_:
          [{
            index: [425, 426, 427, 428],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [429],
            weight: 1
          }],
      },
    GREEN_DARK_WOOD_: {
        TOP_LEFT_:
          [{
            index: [430],
            weight: 1
          }],
        TOP_:
          [{
            index: [431, 432, 433, 434],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [435],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [436],
            weight: 1
          }],
        MID_:
          [{
            index: [437, 438, 439, 440],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [441],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [442],
            weight: 1
          }],
        LOWER_:
          [{
            index: [443, 444, 445, 446],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [447],
            weight: 1
          }],
      },
    WHITE_WOOD_: {
        TOP_LEFT_:
          [{
            index: [448],
            weight: 1
          }],
        TOP_:
          [{
            index: [449, 450, 451, 452],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [453],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [454],
            weight: 1
          }],
        MID_:
          [{
            index: [455, 456, 457, 458],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [459],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [460],
            weight: 1
          }],
        LOWER_:
          [{
            index: [461, 462, 463, 464],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [465],
            weight: 1
          }],
      },
    RED_WOOD_: {
        TOP_LEFT_:
          [{
            index: [466],
            weight: 1
          }],
        TOP_:
          [{
            index: [467, 468, 469, 470],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [471],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [472],
            weight: 1
          }],
        MID_:
          [{
            index: [473, 474, 475, 476],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [477],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [478],
            weight: 1
          }],
        LOWER_:
          [{
            index: [479, 480, 481, 482],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [483],
            weight: 1
          }],
      },
    GREEN_WEATHERED_WOOD_: {
        TOP_LEFT_:
          [{
            index: [484],
            weight: 1
          }],
        TOP_:
          [{
            index: [485, 486, 487, 488],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [489],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [490],
            weight: 1
          }],
        MID_:
          [{
            index: [491, 492, 493, 494],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [495],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [496],
            weight: 1
          }],
        LOWER_:
          [{
            index: [497, 498, 499, 500],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [501],
            weight: 1
          }],
      },
    DARK_BLUE_WOOD_: {
        TOP_LEFT_:
          [{
            index: [502],
            weight: 1
          }],
        TOP_:
          [{
            index: [503, 504, 505, 506],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [507],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [508],
            weight: 1
          }],
        MID_:
          [{
            index: [509, 510, 511, 512],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [513],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [514],
            weight: 1
          }],
        LOWER_:
          [{
            index: [515, 516, 517, 518],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [519],
            weight: 1
          }],
      },
},
  SHINGLES: {
    FILL_: {
                            },
},

};

export default TILE_WEIGHTS;
