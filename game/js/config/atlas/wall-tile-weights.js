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
            index: [103],
            weight: 1
          }],
        TOP_:
          [{
            index: [104, 105],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [106],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [107],
            weight: 1
          }],
        MID_:
          [{
            index: [108, 109],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [110],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [111],
            weight: 1
          }],
        LOWER_:
          [{
            index: [112, 113],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [114],
            weight: 1
          }],
      },
    RED_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [115],
            weight: 1
          }],
        TOP_:
          [{
            index: [116, 117],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [118],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [119],
            weight: 1
          }],
        MID_:
          [{
            index: [120, 121],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [122],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [123],
            weight: 1
          }],
        LOWER_:
          [{
            index: [124, 125],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [126],
            weight: 1
          }],
      },
    WHITE_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [127],
            weight: 1
          }],
        TOP_:
          [{
            index: [128, 129],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [130],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [131],
            weight: 1
          }],
        MID_:
          [{
            index: [132, 133],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [134],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [135],
            weight: 1
          }],
        LOWER_:
          [{
            index: [136, 137],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [138],
            weight: 1
          }],
      },
    GRAY_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [139],
            weight: 1
          }],
        TOP_:
          [{
            index: [140, 141],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [142],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [143],
            weight: 1
          }],
        MID_:
          [{
            index: [144, 145],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [146],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [147],
            weight: 1
          }],
        LOWER_:
          [{
            index: [148, 149],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [150],
            weight: 1
          }],
      },
    CEMENT_STONE_: {
        TOP_LEFT_:
          [{
            index: [151],
            weight: 1
          }],
        TOP_:
          [{
            index: [152, 153],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [154],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [155],
            weight: 1
          }],
        MID_:
          [{
            index: [156, 157],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [158],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [159],
            weight: 1
          }],
        LOWER_:
          [{
            index: [160, 161],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [162],
            weight: 1
          }],
      },
    BROWN_CEMENT_: {
        TOP_LEFT_:
          [{
            index: [163],
            weight: 1
          }],
        TOP_:
          [{
            index: [164, 165],
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
        MID_:
          [{
            index: [168, 169],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [170],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [171],
            weight: 1
          }],
        LOWER_:
          [{
            index: [172, 173],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [174],
            weight: 1
          }],
      },
    RED_WEATHERED_: {
        TOP_LEFT_:
          [{
            index: [193],
            weight: 1
          }],
        TOP_:
          [{
            index: [194, 195, 196, 197],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [198],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [199, 201],
            weight: 1
          }],
        MID_:
          [{
            index: [175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [200, 202],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [289],
            weight: 1
          }],
        LOWER_:
          [{
            index: [290, 291, 292, 293],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [294],
            weight: 1
          }],
      },
    RED_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [218],
            weight: 1
          }],
        TOP_:
          [{
            index: [219, 220, 221],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [222],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [203, 208],
            weight: 1
          }],
        MID_:
          [{
            index: [204, 205, 206, 209, 210, 211],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [207, 212],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [213],
            weight: 1
          }],
        LOWER_:
          [{
            index: [214, 215, 216],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [217],
            weight: 1
          }],
      },
    YELLOW_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [223],
            weight: 1
          }],
        TOP_:
          [{
            index: [224, 225, 226],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [227],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [228, 233],
            weight: 1
          }],
        MID_:
          [{
            index: [229, 230, 231, 234, 235, 236],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [232, 237],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [238],
            weight: 1
          }],
        LOWER_:
          [{
            index: [239, 240, 241],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [242],
            weight: 1
          }],
      },
    BLACK_COMMERCIAL_: {
        TOP_LEFT_:
          [{
            index: [243],
            weight: 1
          }],
        TOP_:
          [{
            index: [244, 245, 246],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [247],
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
    BLUE_COMMERCIAL_: {
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
            index: [268, 273],
            weight: 1
          }],
        MID_:
          [{
            index: [269, 270, 271, 274, 275, 276],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [272, 277],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [278],
            weight: 1
          }],
        LOWER_:
          [{
            index: [279, 280, 281],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [282],
            weight: 1
          }],
      },
    FILL_: {
                            },
    YELLOW_WEATHERED_: {
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
  STONE: {
},
  STUCCO: {
},
  BORDER: {
    SECTIONED_: {
        TOP_LEFT_:
          [{
            index: [306],
            weight: 1
          }],
          TOP_RIGHT_:
          [{
            index: [307],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [308],
            weight: 1
          }],
          MID_RIGHT_:
          [{
            index: [309],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [295],
            weight: 1
          }],
          LOWER_RIGHT_:
          [{
            index: [296],
            weight: 1
          }],
      },
    TOPVIEW_: {
        TOP_LEFT_:
          [{
            index: [297],
            weight: 1
          }],
        TOP_:
          [{
            index: [298, 301, 304],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [299],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [300],
            weight: 1
          }],
          MID_RIGHT_:
          [{
            index: [302],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [303],
            weight: 1
          }],
          LOWER_RIGHT_:
          [{
            index: [305],
            weight: 1
          }],
      },
    SECTIONED_CEMENT_: {
                          LOWER_:
          [{
            index: [310, 311, 312],
            weight: 1
          }],
        },
    SECTIONED_CARPET_: {
                          LOWER_:
          [{
            index: [313, 314, 315],
            weight: 1
          }],
        },
    SECTIONED_TILE_: {
                          LOWER_:
          [{
            index: [316, 317, 318],
            weight: 1
          }],
        },
    SECTIONED_PLANK_: {
                          LOWER_:
          [{
            index: [319, 320, 321],
            weight: 1
          }],
        },
},
  SIDING: {
    BLUE_WOOD_: {
        TOP_LEFT_:
          [{
            index: [322],
            weight: 1
          }],
        TOP_:
          [{
            index: [323, 324, 325, 326],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [327],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [328],
            weight: 1
          }],
        MID_:
          [{
            index: [329, 330, 331, 332],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [333],
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
    GRAY_WOOD_: {
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
    ORANGE_WOOD_: {
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
    PURPLE_WOOD_: {
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
    YELLOW_WOOD_: {
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
    GREEN_DARK_WOOD_: {
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
    WHITE_WOOD_: {
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
    RED_WOOD_: {
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
    GREEN_WEATHERED_WOOD_: {
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
    DARK_BLUE_WOOD_: {
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
},
  SHINGLES: {
    FILL_: {
                            },
},

};

export default TILE_WEIGHTS;
