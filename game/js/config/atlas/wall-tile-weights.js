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
},
  CEMENT: {
    GRAY_: {
        TOP_LEFT_:
          [{
            index: [82],
            weight: 1
          }],
        TOP_:
          [{
            index: [83, 84],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [85],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [86],
            weight: 1
          }],
        MID_:
          [{
            index: [87, 88],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [89],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [90],
            weight: 1
          }],
        LOWER_:
          [{
            index: [91, 92],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [93],
            weight: 1
          }],
      },
},
  STUDS: {
},
  PANELS: {
},
  TILE: {
},
  WAINSCOTING: {
},
  BRICK: {
    YELLOW_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [94],
            weight: 1
          }],
        TOP_:
          [{
            index: [95, 96],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [97],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [98],
            weight: 1
          }],
        MID_:
          [{
            index: [99, 100],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [101],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [102],
            weight: 1
          }],
        LOWER_:
          [{
            index: [103, 104],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [105],
            weight: 1
          }],
      },
    RED_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [106],
            weight: 1
          }],
        TOP_:
          [{
            index: [107, 108],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [109],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [110],
            weight: 1
          }],
        MID_:
          [{
            index: [111, 112],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [113],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [114],
            weight: 1
          }],
        LOWER_:
          [{
            index: [115, 116],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [117],
            weight: 1
          }],
      },
    WHITE_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [118],
            weight: 1
          }],
        TOP_:
          [{
            index: [119, 120],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [121],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [122],
            weight: 1
          }],
        MID_:
          [{
            index: [123, 124],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [125],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [126],
            weight: 1
          }],
        LOWER_:
          [{
            index: [127, 128],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [129],
            weight: 1
          }],
      },
    GRAY_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [130],
            weight: 1
          }],
        TOP_:
          [{
            index: [131, 132],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [133],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [134],
            weight: 1
          }],
        MID_:
          [{
            index: [135, 136],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [137],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [138],
            weight: 1
          }],
        LOWER_:
          [{
            index: [139, 140],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [141],
            weight: 1
          }],
      },
    CEMENT_STONE_: {
        TOP_LEFT_:
          [{
            index: [142],
            weight: 1
          }],
        TOP_:
          [{
            index: [143, 144],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [145],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [146],
            weight: 1
          }],
        MID_:
          [{
            index: [147, 148],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [149],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [150],
            weight: 1
          }],
        LOWER_:
          [{
            index: [151, 152],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [153],
            weight: 1
          }],
      },
    BROWN_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [154],
            weight: 1
          }],
        TOP_:
          [{
            index: [155, 156],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [157],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [158],
            weight: 1
          }],
        MID_:
          [{
            index: [159, 160],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [161],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [162],
            weight: 1
          }],
        LOWER_:
          [{
            index: [163, 164],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [165],
            weight: 1
          }],
      },
    RED_WEATHERED_: {
        TOP_LEFT_:
          [{
            index: [190],
            weight: 1
          }],
        TOP_:
          [{
            index: [191, 192, 193, 194],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [195],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [196, 198],
            weight: 1
          }],
        MID_:
          [{
            index: [166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [197, 199],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [184],
            weight: 1
          }],
        LOWER_:
          [{
            index: [185, 186, 187, 188],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [189],
            weight: 1
          }],
      },
    RED_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [215],
            weight: 1
          }],
        TOP_:
          [{
            index: [216, 217, 218],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [219],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [200, 205],
            weight: 1
          }],
        MID_:
          [{
            index: [201, 202, 203, 206, 207, 208],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [204, 209],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [210],
            weight: 1
          }],
        LOWER_:
          [{
            index: [211, 212, 213],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [214],
            weight: 1
          }],
      },
    YELLOW_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [220],
            weight: 1
          }],
        TOP_:
          [{
            index: [221, 222, 223],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [224],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [225, 230],
            weight: 1
          }],
        MID_:
          [{
            index: [226, 227, 228, 231, 232, 233],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [229, 234],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [235],
            weight: 1
          }],
        LOWER_:
          [{
            index: [236, 237, 238],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [239],
            weight: 1
          }],
      },
    BLACK_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [240],
            weight: 1
          }],
        TOP_:
          [{
            index: [241, 242, 243],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [244],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [245, 250],
            weight: 1
          }],
        MID_:
          [{
            index: [246, 247, 248, 251, 252, 253],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [249, 254],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [255],
            weight: 1
          }],
        LOWER_:
          [{
            index: [256, 257, 258],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [259],
            weight: 1
          }],
      },
    BLUE_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [260],
            weight: 1
          }],
        TOP_:
          [{
            index: [261, 262, 263],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [264],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [265, 270],
            weight: 1
          }],
        MID_:
          [{
            index: [266, 267, 268, 271, 272, 273],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [269, 274],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [275],
            weight: 1
          }],
        LOWER_:
          [{
            index: [276, 277, 278],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [279],
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
            index: [291],
            weight: 1
          }],
          TOP_RIGHT_:
          [{
            index: [292],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [293],
            weight: 1
          }],
          MID_RIGHT_:
          [{
            index: [294],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [280],
            weight: 1
          }],
          LOWER_RIGHT_:
          [{
            index: [281],
            weight: 1
          }],
      },
    TOPVIEW_: {
        TOP_LEFT_:
          [{
            index: [282],
            weight: 1
          }],
        TOP_:
          [{
            index: [283, 286, 289],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [284],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [285],
            weight: 1
          }],
          MID_RIGHT_:
          [{
            index: [287],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [288],
            weight: 1
          }],
          LOWER_RIGHT_:
          [{
            index: [290],
            weight: 1
          }],
      },
    SECTIONED_CEMENT_: {
                          LOWER_:
          [{
            index: [295, 296, 297],
            weight: 1
          }],
        },
    SECTIONED_CARPET_: {
                          LOWER_:
          [{
            index: [298, 299, 300],
            weight: 1
          }],
        },
    SECTIONED_TILE_: {
                          LOWER_:
          [{
            index: [301, 302, 303],
            weight: 1
          }],
        },
    SECTIONED_PLANK_: {
                          LOWER_:
          [{
            index: [304, 305, 306],
            weight: 1
          }],
        },
},
  SIDING: {
    BLUE_WOOD_: {
        TOP_LEFT_:
          [{
            index: [307],
            weight: 1
          }],
        TOP_:
          [{
            index: [308, 309, 310, 311],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [312],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [313],
            weight: 1
          }],
        MID_:
          [{
            index: [314, 315, 316, 317],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [318],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [319],
            weight: 1
          }],
        LOWER_:
          [{
            index: [320, 321, 322, 323],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [324],
            weight: 1
          }],
      },
    GRAY_WOOD_: {
        TOP_LEFT_:
          [{
            index: [325],
            weight: 1
          }],
        TOP_:
          [{
            index: [326, 327, 328, 329],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [330],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [331],
            weight: 1
          }],
        MID_:
          [{
            index: [332, 333, 334, 335],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [336],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [337],
            weight: 1
          }],
        LOWER_:
          [{
            index: [338, 339, 340, 341],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [342],
            weight: 1
          }],
      },
    ORANGE_WOOD_: {
        TOP_LEFT_:
          [{
            index: [343],
            weight: 1
          }],
        TOP_:
          [{
            index: [344, 345, 346, 347],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [348],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [349],
            weight: 1
          }],
        MID_:
          [{
            index: [350, 351, 352, 353],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [354],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [355],
            weight: 1
          }],
        LOWER_:
          [{
            index: [356, 357, 358, 359],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [360],
            weight: 1
          }],
      },
    PURPLE_WOOD_: {
        TOP_LEFT_:
          [{
            index: [361],
            weight: 1
          }],
        TOP_:
          [{
            index: [362, 363, 364, 365],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [366],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [367],
            weight: 1
          }],
        MID_:
          [{
            index: [368, 369, 370, 371],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [372],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [373],
            weight: 1
          }],
        LOWER_:
          [{
            index: [374, 375, 376, 377],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [378],
            weight: 1
          }],
      },
    YELLOW_WOOD_: {
        TOP_LEFT_:
          [{
            index: [379],
            weight: 1
          }],
        TOP_:
          [{
            index: [380, 381, 382, 383],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [384],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [385],
            weight: 1
          }],
        MID_:
          [{
            index: [386, 387, 388, 389],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [390],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [391],
            weight: 1
          }],
        LOWER_:
          [{
            index: [392, 393, 394, 395],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [396],
            weight: 1
          }],
      },
    GREEN_DARK_WOOD_: {
        TOP_LEFT_:
          [{
            index: [397],
            weight: 1
          }],
        TOP_:
          [{
            index: [398, 399, 400, 401],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [402],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [403],
            weight: 1
          }],
        MID_:
          [{
            index: [404, 405, 406, 407],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [408],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [409],
            weight: 1
          }],
        LOWER_:
          [{
            index: [410, 411, 412, 413],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [414],
            weight: 1
          }],
      },
},
  SHINGLES: {
},

};

export default TILE_WEIGHTS;
