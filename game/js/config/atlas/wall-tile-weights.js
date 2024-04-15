// Our custom tile mapping with:
// - Single index for putTileAt
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const TILE_WEIGHTS = {
  BLANK: 0,
  WALLPAPER: {
    FILL_: {
                            },
},
  PAINT: {
    GREEN_PURPLE_: {
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
    WHITE_: {
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
    BLUE_WORN_: {
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
},
  CEMENT: {
    GRAY_: {
        TOP_LEFT_:
          [{
            index: [169],
            weight: 1
          }],
        TOP_:
          [{
            index: [170, 171, 172, 173],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [174],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [28, 32, 175],
            weight: 1
          }],
        MID_:
          [{
            index: [29, 30, 33, 34, 176, 177, 178, 179],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [31, 35, 180],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [36, 181],
            weight: 1
          }],
        LOWER_:
          [{
            index: [37, 38, 182, 183, 184, 185],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [39, 186],
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
    RED_BRICK_: {
        TOP_LEFT_:
          [{
            index: [43],
            weight: 1
          }],
        TOP_:
          [{
            index: [44],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [45],
            weight: 1
          }],
        TOP_SINGLE_:
          [{
            index: [40],
            weight: 1
          }],
        MID_LEFT_:
          [{
            index: [46],
            weight: 1
          }],
        MID_:
          [{
            index: [47],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [48],
            weight: 1
          }],
        MID_SINGLE_:
          [{
            index: [41],
            weight: 1
          }],
        LOWER_LEFT_:
          [{
            index: [49],
            weight: 1
          }],
        LOWER_:
          [{
            index: [50],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [51],
            weight: 1
          }],
        LOWER_SINGLE_:
          [{
            index: [42],
            weight: 1
          }],
    },
    YELLOW_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [52],
            weight: 1
          }],
        TOP_:
          [{
            index: [53, 54],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [55],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [56],
            weight: 1
          }],
        MID_:
          [{
            index: [57, 58],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [59],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [60],
            weight: 1
          }],
        LOWER_:
          [{
            index: [61, 62],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [63],
            weight: 1
          }],
      },
    RED_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [64],
            weight: 1
          }],
        TOP_:
          [{
            index: [65, 66],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [67],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [68],
            weight: 1
          }],
        MID_:
          [{
            index: [69, 70],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [71],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [72],
            weight: 1
          }],
        LOWER_:
          [{
            index: [73, 74],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [75],
            weight: 1
          }],
      },
    WHITE_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [76],
            weight: 1
          }],
        TOP_:
          [{
            index: [77, 78],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [79],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [80],
            weight: 1
          }],
        MID_:
          [{
            index: [81, 82],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [83],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [84],
            weight: 1
          }],
        LOWER_:
          [{
            index: [85, 86],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [87],
            weight: 1
          }],
      },
    GRAY_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [88],
            weight: 1
          }],
        TOP_:
          [{
            index: [89, 90],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [91],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [92],
            weight: 1
          }],
        MID_:
          [{
            index: [93, 94],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [95],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [96],
            weight: 1
          }],
        LOWER_:
          [{
            index: [97, 98],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [99],
            weight: 1
          }],
      },
    CEMENT_STONE_: {
        TOP_LEFT_:
          [{
            index: [100],
            weight: 1
          }],
        TOP_:
          [{
            index: [101, 102],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [103],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [104],
            weight: 1
          }],
        MID_:
          [{
            index: [105, 106],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [107],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [108],
            weight: 1
          }],
        LOWER_:
          [{
            index: [109, 110],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [111],
            weight: 1
          }],
      },
    BROWN_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [112],
            weight: 1
          }],
        TOP_:
          [{
            index: [113, 114],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [115],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [116],
            weight: 1
          }],
        MID_:
          [{
            index: [117, 118],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [119],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [120],
            weight: 1
          }],
        LOWER_:
          [{
            index: [121, 122],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [123],
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
            index: [135],
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
          MID_RIGHT_:
          [{
            index: [138],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [124],
            weight: 1
          }],
          LOWER_RIGHT_:
          [{
            index: [125],
            weight: 1
          }],
      },
    TOPVIEW_: {
        TOP_LEFT_:
          [{
            index: [126],
            weight: 1
          }],
        TOP_:
          [{
            index: [127, 130, 133],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [128],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [129],
            weight: 1
          }],
          MID_RIGHT_:
          [{
            index: [131],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [132],
            weight: 1
          }],
          LOWER_RIGHT_:
          [{
            index: [134],
            weight: 1
          }],
      },
    SECTIONED_CEMENT_: {
                          LOWER_:
          [{
            index: [139, 140, 141],
            weight: 1
          }],
        },
    SECTIONED_CARPET_: {
                          LOWER_:
          [{
            index: [142, 143, 144],
            weight: 1
          }],
        },
    SECTIONED_TILE_: {
                          LOWER_:
          [{
            index: [145, 146, 147],
            weight: 1
          }],
        },
    SECTIONED_PLANK_: {
                          LOWER_:
          [{
            index: [148, 149, 150],
            weight: 1
          }],
        },
},
  SIDING: {
    BLUE_: {
        TOP_LEFT_:
          [{
            index: [151],
            weight: 1
          }],
        TOP_:
          [{
            index: [152, 153, 154, 155],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [156],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [157],
            weight: 1
          }],
        MID_:
          [{
            index: [158, 159, 160, 161],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [162],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [163],
            weight: 1
          }],
        LOWER_:
          [{
            index: [164, 165, 166, 167],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [168],
            weight: 1
          }],
      },
    GRAY_: {
        TOP_LEFT_:
          [{
            index: [169],
            weight: 1
          }],
        TOP_:
          [{
            index: [170, 171, 172, 173],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [174],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [28, 32, 175],
            weight: 1
          }],
        MID_:
          [{
            index: [29, 30, 33, 34, 176, 177, 178, 179],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [31, 35, 180],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [36, 181],
            weight: 1
          }],
        LOWER_:
          [{
            index: [37, 38, 182, 183, 184, 185],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [39, 186],
            weight: 1
          }],
      },
    PURPLE_: {
        TOP_LEFT_:
          [{
            index: [187],
            weight: 1
          }],
        TOP_:
          [{
            index: [188, 189, 190, 191],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [192],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [193],
            weight: 1
          }],
        MID_:
          [{
            index: [194, 195, 196, 197],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [198],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [199],
            weight: 1
          }],
        LOWER_:
          [{
            index: [200, 201, 202, 203],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [204],
            weight: 1
          }],
      },
    YELLOW_: {
        TOP_LEFT_:
          [{
            index: [205],
            weight: 1
          }],
        TOP_:
          [{
            index: [206, 207, 208, 209],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [210],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [211],
            weight: 1
          }],
        MID_:
          [{
            index: [212, 213, 214, 215],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [216],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [217],
            weight: 1
          }],
        LOWER_:
          [{
            index: [218, 219, 220, 221],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [222],
            weight: 1
          }],
      },
},
  SHINGLES: {
},

};

export default TILE_WEIGHTS;
