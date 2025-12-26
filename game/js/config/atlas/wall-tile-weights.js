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
    GREEN_WORN_: {
          TOP_:
          [{
            index: [103, 104, 105, 106],
            weight: 1
          }],
              MID_:
          [{
            index: [107, 108, 109, 110],
            weight: 1
          }],
              LOWER_:
          [{
            index: [111, 112, 113, 114],
            weight: 1
          }],
        },
    RED_YELLOW_WORN_: {
        TOP_LEFT_:
          [{
            index: [115],
            weight: 1
          }],
        TOP_:
          [{
            index: [116, 117, 118],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [119],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [120],
            weight: 1
          }],
        MID_:
          [{
            index: [121, 122, 123],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [124],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [125],
            weight: 1
          }],
        LOWER_:
          [{
            index: [126, 127, 128],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [129],
            weight: 1
          }],
      },
},
  STUDS: {
},
  PANELS: {
    DARK_WOOD_VERTICAL_: {
          TOP_:
          [{
            index: [130, 131, 132],
            weight: 1
          }],
              MID_:
          [{
            index: [133, 134, 135],
            weight: 1
          }],
              LOWER_:
          [{
            index: [136, 137, 138],
            weight: 1
          }],
        },
    WHITE_WOOD_VERTICAL_: {
          TOP_:
          [{
            index: [139, 140, 141],
            weight: 1
          }],
              MID_:
          [{
            index: [142, 143, 144],
            weight: 1
          }],
              LOWER_:
          [{
            index: [145, 146, 147],
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
            index: [148],
            weight: 1
          }],
        TOP_:
          [{
            index: [149, 150],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [151],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [152],
            weight: 1
          }],
        MID_:
          [{
            index: [153, 154],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [155],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [156],
            weight: 1
          }],
        LOWER_:
          [{
            index: [157, 158],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [159],
            weight: 1
          }],
      },
    RED_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [160],
            weight: 1
          }],
        TOP_:
          [{
            index: [161, 162],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [163],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [164],
            weight: 1
          }],
        MID_:
          [{
            index: [165, 166],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [167],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [168],
            weight: 1
          }],
        LOWER_:
          [{
            index: [169, 170],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [171],
            weight: 1
          }],
      },
    WHITE_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [172],
            weight: 1
          }],
        TOP_:
          [{
            index: [173, 174],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [175],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [176],
            weight: 1
          }],
        MID_:
          [{
            index: [177, 178],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [179],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [180],
            weight: 1
          }],
        LOWER_:
          [{
            index: [181, 182],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [183],
            weight: 1
          }],
      },
    GRAY_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [184],
            weight: 1
          }],
        TOP_:
          [{
            index: [185, 186],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [187],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [188],
            weight: 1
          }],
        MID_:
          [{
            index: [189, 190],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [191],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [192],
            weight: 1
          }],
        LOWER_:
          [{
            index: [193, 194],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [195],
            weight: 1
          }],
      },
    CEMENT_STONE_: {
        TOP_LEFT_:
          [{
            index: [196],
            weight: 1
          }],
        TOP_:
          [{
            index: [197, 198],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [199],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [200],
            weight: 1
          }],
        MID_:
          [{
            index: [201, 202],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [203],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [204],
            weight: 1
          }],
        LOWER_:
          [{
            index: [205, 206],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [207],
            weight: 1
          }],
      },
    BROWN_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [208],
            weight: 1
          }],
        TOP_:
          [{
            index: [209, 210],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [211],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [212],
            weight: 1
          }],
        MID_:
          [{
            index: [213, 214],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [215],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [216],
            weight: 1
          }],
        LOWER_:
          [{
            index: [217, 218],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [219],
            weight: 1
          }],
      },
    RED_WEATHERED_: {
        TOP_LEFT_:
          [{
            index: [238],
            weight: 1
          }],
        TOP_:
          [{
            index: [239, 240, 241, 242],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [243],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [244, 246],
            weight: 1
          }],
        MID_:
          [{
            index: [220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [245, 247],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [334],
            weight: 1
          }],
        LOWER_:
          [{
            index: [335, 336, 337, 338],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [339],
            weight: 1
          }],
      },
    RED_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [263],
            weight: 1
          }],
        TOP_:
          [{
            index: [264, 265, 266],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [267],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [248, 253],
            weight: 1
          }],
        MID_:
          [{
            index: [249, 250, 251, 254, 255, 256],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [252, 257],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [258],
            weight: 1
          }],
        LOWER_:
          [{
            index: [259, 260, 261],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [262],
            weight: 1
          }],
      },
    YELLOW_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [268],
            weight: 1
          }],
        TOP_:
          [{
            index: [269, 270, 271],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [272],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [273, 278],
            weight: 1
          }],
        MID_:
          [{
            index: [274, 275, 276, 279, 280, 281],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [277, 282],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [283],
            weight: 1
          }],
        LOWER_:
          [{
            index: [284, 285, 286],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [287],
            weight: 1
          }],
      },
    BLACK_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [288],
            weight: 1
          }],
        TOP_:
          [{
            index: [289, 290, 291],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [292],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [293, 298],
            weight: 1
          }],
        MID_:
          [{
            index: [294, 295, 296, 299, 300, 301],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [297, 302],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [303],
            weight: 1
          }],
        LOWER_:
          [{
            index: [304, 305, 306],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [307],
            weight: 1
          }],
      },
    BLUE_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [308],
            weight: 1
          }],
        TOP_:
          [{
            index: [309, 310, 311],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [312],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [313, 318],
            weight: 1
          }],
        MID_:
          [{
            index: [314, 315, 316, 319, 320, 321],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [317, 322],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [323],
            weight: 1
          }],
        LOWER_:
          [{
            index: [324, 325, 326],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [327],
            weight: 1
          }],
      },
    FILL_: {
                            },
    YELLOW_WEATHERED_: {
                        LOWER_LEFT_:
          [{
            index: [328],
            weight: 1
          }],
        LOWER_:
          [{
            index: [329, 330, 331, 332],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [333],
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
            index: [351],
            weight: 1
          }],
          TOP_RIGHT_:
          [{
            index: [352],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [353],
            weight: 1
          }],
          MID_RIGHT_:
          [{
            index: [354],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [340],
            weight: 1
          }],
          LOWER_RIGHT_:
          [{
            index: [341],
            weight: 1
          }],
      },
    TOPVIEW_: {
        TOP_LEFT_:
          [{
            index: [342],
            weight: 1
          }],
        TOP_:
          [{
            index: [343, 346, 349],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [344],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [345],
            weight: 1
          }],
          MID_RIGHT_:
          [{
            index: [347],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [348],
            weight: 1
          }],
          LOWER_RIGHT_:
          [{
            index: [350],
            weight: 1
          }],
      },
    SECTIONED_CEMENT_: {
                          LOWER_:
          [{
            index: [355, 356, 357],
            weight: 1
          }],
        },
    SECTIONED_CARPET_: {
                          LOWER_:
          [{
            index: [358, 359, 360],
            weight: 1
          }],
        },
    SECTIONED_TILE_: {
                          LOWER_:
          [{
            index: [361, 362, 363],
            weight: 1
          }],
        },
    SECTIONED_PLANK_: {
                          LOWER_:
          [{
            index: [364, 365, 366],
            weight: 1
          }],
        },
},
  SIDING: {
    BLUE_WOOD_: {
        TOP_LEFT_:
          [{
            index: [367],
            weight: 1
          }],
        TOP_:
          [{
            index: [368, 369, 370, 371],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [372],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [373],
            weight: 1
          }],
        MID_:
          [{
            index: [374, 375, 376, 377],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [378],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [379],
            weight: 1
          }],
        LOWER_:
          [{
            index: [380, 381, 382, 383],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [384],
            weight: 1
          }],
      },
    GRAY_WOOD_: {
        TOP_LEFT_:
          [{
            index: [385],
            weight: 1
          }],
        TOP_:
          [{
            index: [386, 387, 388, 389],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [390],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [391],
            weight: 1
          }],
        MID_:
          [{
            index: [392, 393, 394, 395],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [396],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [397],
            weight: 1
          }],
        LOWER_:
          [{
            index: [398, 399, 400, 401],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [402],
            weight: 1
          }],
      },
    ORANGE_WOOD_: {
        TOP_LEFT_:
          [{
            index: [403],
            weight: 1
          }],
        TOP_:
          [{
            index: [404, 405, 406, 407],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [408],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [409],
            weight: 1
          }],
        MID_:
          [{
            index: [410, 411, 412, 413],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [414],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [415],
            weight: 1
          }],
        LOWER_:
          [{
            index: [416, 417, 418, 419],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [420],
            weight: 1
          }],
      },
    PURPLE_WOOD_: {
        TOP_LEFT_:
          [{
            index: [421],
            weight: 1
          }],
        TOP_:
          [{
            index: [422, 423, 424, 425],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [426],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [427],
            weight: 1
          }],
        MID_:
          [{
            index: [428, 429, 430, 431],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [432],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [433],
            weight: 1
          }],
        LOWER_:
          [{
            index: [434, 435, 436, 437],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [438],
            weight: 1
          }],
      },
    YELLOW_WOOD_: {
        TOP_LEFT_:
          [{
            index: [439],
            weight: 1
          }],
        TOP_:
          [{
            index: [440, 441, 442, 443],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [444],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [445],
            weight: 1
          }],
        MID_:
          [{
            index: [446, 447, 448, 449],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [450],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [451],
            weight: 1
          }],
        LOWER_:
          [{
            index: [452, 453, 454, 455],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [456],
            weight: 1
          }],
      },
    GREEN_DARK_WOOD_: {
        TOP_LEFT_:
          [{
            index: [457],
            weight: 1
          }],
        TOP_:
          [{
            index: [458, 459, 460, 461],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [462],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [463],
            weight: 1
          }],
        MID_:
          [{
            index: [464, 465, 466, 467],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [468],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [469],
            weight: 1
          }],
        LOWER_:
          [{
            index: [470, 471, 472, 473],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [474],
            weight: 1
          }],
      },
    WHITE_WOOD_: {
        TOP_LEFT_:
          [{
            index: [475],
            weight: 1
          }],
        TOP_:
          [{
            index: [476, 477, 478, 479],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [480],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [481],
            weight: 1
          }],
        MID_:
          [{
            index: [482, 483, 484, 485],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [486],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [487],
            weight: 1
          }],
        LOWER_:
          [{
            index: [488, 489, 490, 491],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [492],
            weight: 1
          }],
      },
    RED_WOOD_: {
        TOP_LEFT_:
          [{
            index: [493],
            weight: 1
          }],
        TOP_:
          [{
            index: [494, 495, 496, 497],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [498],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [499],
            weight: 1
          }],
        MID_:
          [{
            index: [500, 501, 502, 503],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [504],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [505],
            weight: 1
          }],
        LOWER_:
          [{
            index: [506, 507, 508, 509],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [510],
            weight: 1
          }],
      },
    GREEN_WEATHERED_WOOD_: {
        TOP_LEFT_:
          [{
            index: [511],
            weight: 1
          }],
        TOP_:
          [{
            index: [512, 513, 514, 515],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [516],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [517],
            weight: 1
          }],
        MID_:
          [{
            index: [518, 519, 520, 521],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [522],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [523],
            weight: 1
          }],
        LOWER_:
          [{
            index: [524, 525, 526, 527],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [528],
            weight: 1
          }],
      },
    DARK_BLUE_WOOD_: {
        TOP_LEFT_:
          [{
            index: [529],
            weight: 1
          }],
        TOP_:
          [{
            index: [530, 531, 532, 533],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [534],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [535],
            weight: 1
          }],
        MID_:
          [{
            index: [536, 537, 538, 539],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [540],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [541],
            weight: 1
          }],
        LOWER_:
          [{
            index: [542, 543, 544, 545],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [546],
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
