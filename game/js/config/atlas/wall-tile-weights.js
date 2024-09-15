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
            index: [28],
            weight: 1
          }],
        TOP_:
          [{
            index: [29, 30],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [31],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [32],
            weight: 1
          }],
        MID_:
          [{
            index: [33, 34],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [35],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [36],
            weight: 1
          }],
        LOWER_:
          [{
            index: [37, 38],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [39],
            weight: 1
          }],
      },
    RED_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [40],
            weight: 1
          }],
        TOP_:
          [{
            index: [41, 42],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [43],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [44],
            weight: 1
          }],
        MID_:
          [{
            index: [45, 46],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [47],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [48],
            weight: 1
          }],
        LOWER_:
          [{
            index: [49, 50],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [51],
            weight: 1
          }],
      },
    WHITE_CEMENT_: {
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
    GRAY_CEMENT_: {
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
    CEMENT_STONE_: {
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
    BROWN_CEMENT_: {
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
    RED_WEATHERED_: {
        TOP_LEFT_:
          [{
            index: [124],
            weight: 1
          }],
        TOP_:
          [{
            index: [125, 126, 127, 128],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [129],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [130, 132],
            weight: 1
          }],
        MID_:
          [{
            index: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [131, 133],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [118],
            weight: 1
          }],
        LOWER_:
          [{
            index: [119, 120, 121, 122],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [123],
            weight: 1
          }],
      },
    RED_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [149],
            weight: 1
          }],
        TOP_:
          [{
            index: [150, 151, 152],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [153],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [134, 139],
            weight: 1
          }],
        MID_:
          [{
            index: [135, 136, 137, 140, 141, 142],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [138, 143],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [144],
            weight: 1
          }],
        LOWER_:
          [{
            index: [145, 146, 147],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [148],
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
            index: [165],
            weight: 1
          }],
          TOP_RIGHT_:
          [{
            index: [166],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [167],
            weight: 1
          }],
          MID_RIGHT_:
          [{
            index: [168],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [154],
            weight: 1
          }],
          LOWER_RIGHT_:
          [{
            index: [155],
            weight: 1
          }],
      },
    TOPVIEW_: {
        TOP_LEFT_:
          [{
            index: [156],
            weight: 1
          }],
        TOP_:
          [{
            index: [157, 160, 163],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [158],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [159],
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
          LOWER_RIGHT_:
          [{
            index: [164],
            weight: 1
          }],
      },
    SECTIONED_CEMENT_: {
                          LOWER_:
          [{
            index: [169, 170, 171],
            weight: 1
          }],
        },
    SECTIONED_CARPET_: {
                          LOWER_:
          [{
            index: [172, 173, 174],
            weight: 1
          }],
        },
    SECTIONED_TILE_: {
                          LOWER_:
          [{
            index: [175, 176, 177],
            weight: 1
          }],
        },
    SECTIONED_PLANK_: {
                          LOWER_:
          [{
            index: [178, 179, 180],
            weight: 1
          }],
        },
},
  SIDING: {
    BLUE_: {
        TOP_LEFT_:
          [{
            index: [181],
            weight: 1
          }],
        TOP_:
          [{
            index: [182, 183, 184, 185],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [186],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [187],
            weight: 1
          }],
        MID_:
          [{
            index: [188, 189, 190, 191],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [192],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [193],
            weight: 1
          }],
        LOWER_:
          [{
            index: [194, 195, 196, 197],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [198],
            weight: 1
          }],
      },
    GRAY_: {
        TOP_LEFT_:
          [{
            index: [199],
            weight: 1
          }],
        TOP_:
          [{
            index: [200, 201, 202, 203],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [204],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [205],
            weight: 1
          }],
        MID_:
          [{
            index: [206, 207, 208, 209],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [210],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [211],
            weight: 1
          }],
        LOWER_:
          [{
            index: [212, 213, 214, 215],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [216],
            weight: 1
          }],
      },
    PURPLE_: {
        TOP_LEFT_:
          [{
            index: [217],
            weight: 1
          }],
        TOP_:
          [{
            index: [218, 219, 220, 221],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [222],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [223],
            weight: 1
          }],
        MID_:
          [{
            index: [224, 225, 226, 227],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [228],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [229],
            weight: 1
          }],
        LOWER_:
          [{
            index: [230, 231, 232, 233],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [234],
            weight: 1
          }],
      },
    YELLOW_: {
        TOP_LEFT_:
          [{
            index: [235],
            weight: 1
          }],
        TOP_:
          [{
            index: [236, 237, 238, 239],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [240],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [241],
            weight: 1
          }],
        MID_:
          [{
            index: [242, 243, 244, 245],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [246],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [247],
            weight: 1
          }],
        LOWER_:
          [{
            index: [248, 249, 250, 251],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [252],
            weight: 1
          }],
      },
    ORANGE_: {
        TOP_LEFT_:
          [{
            index: [253],
            weight: 1
          }],
        TOP_:
          [{
            index: [254, 255, 256, 257],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [258],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [259],
            weight: 1
          }],
        MID_:
          [{
            index: [260, 261, 262, 263],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [264],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [265],
            weight: 1
          }],
        LOWER_:
          [{
            index: [266, 267, 268, 269],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [270],
            weight: 1
          }],
      },
    GREEN_: {
        TOP_LEFT_:
          [{
            index: [271],
            weight: 1
          }],
        TOP_:
          [{
            index: [272, 273, 274, 275],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [276],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [277],
            weight: 1
          }],
        MID_:
          [{
            index: [278, 279, 280, 281],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [282],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [283],
            weight: 1
          }],
        LOWER_:
          [{
            index: [284, 285, 286, 287],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [288],
            weight: 1
          }],
      },
},
  SHINGLES: {
},

};

export default TILE_WEIGHTS;
