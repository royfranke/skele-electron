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
},
  STONE: {
},
  STUCCO: {
},
  BORDER: {
    SECTIONED_: {
        TOP_LEFT_:
          [{
            index: [145],
            weight: 1
          }],
          TOP_RIGHT_:
          [{
            index: [146],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [147],
            weight: 1
          }],
          MID_RIGHT_:
          [{
            index: [148],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [134],
            weight: 1
          }],
          LOWER_RIGHT_:
          [{
            index: [135],
            weight: 1
          }],
      },
    TOPVIEW_: {
        TOP_LEFT_:
          [{
            index: [136],
            weight: 1
          }],
        TOP_:
          [{
            index: [137, 140, 143],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [138],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [139],
            weight: 1
          }],
          MID_RIGHT_:
          [{
            index: [141],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [142],
            weight: 1
          }],
          LOWER_RIGHT_:
          [{
            index: [144],
            weight: 1
          }],
      },
    SECTIONED_CEMENT_: {
                          LOWER_:
          [{
            index: [149, 150, 151],
            weight: 1
          }],
        },
    SECTIONED_CARPET_: {
                          LOWER_:
          [{
            index: [152, 153, 154],
            weight: 1
          }],
        },
    SECTIONED_TILE_: {
                          LOWER_:
          [{
            index: [155, 156, 157],
            weight: 1
          }],
        },
    SECTIONED_PLANK_: {
                          LOWER_:
          [{
            index: [158, 159, 160],
            weight: 1
          }],
        },
},
  SIDING: {
    BLUE_: {
        TOP_LEFT_:
          [{
            index: [161],
            weight: 1
          }],
        TOP_:
          [{
            index: [162, 163, 164, 165],
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
            index: [168, 169, 170, 171],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [172],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [173],
            weight: 1
          }],
        LOWER_:
          [{
            index: [174, 175, 176, 177],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [178],
            weight: 1
          }],
      },
    GRAY_: {
        TOP_LEFT_:
          [{
            index: [179],
            weight: 1
          }],
        TOP_:
          [{
            index: [180, 181, 182, 183],
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
            index: [186, 187, 188, 189],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [190],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [191],
            weight: 1
          }],
        LOWER_:
          [{
            index: [192, 193, 194, 195],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [196],
            weight: 1
          }],
      },
    PURPLE_: {
        TOP_LEFT_:
          [{
            index: [197],
            weight: 1
          }],
        TOP_:
          [{
            index: [198, 199, 200, 201],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [202],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [203],
            weight: 1
          }],
        MID_:
          [{
            index: [204, 205, 206, 207],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [208],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [209],
            weight: 1
          }],
        LOWER_:
          [{
            index: [210, 211, 212, 213],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [214],
            weight: 1
          }],
      },
    YELLOW_: {
        TOP_LEFT_:
          [{
            index: [215],
            weight: 1
          }],
        TOP_:
          [{
            index: [216, 217, 218, 219],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [220],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [221],
            weight: 1
          }],
        MID_:
          [{
            index: [222, 223, 224, 225],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [226],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [227],
            weight: 1
          }],
        LOWER_:
          [{
            index: [228, 229, 230, 231],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [232],
            weight: 1
          }],
      },
    ORANGE_: {
        TOP_LEFT_:
          [{
            index: [233],
            weight: 1
          }],
        TOP_:
          [{
            index: [234, 235, 236, 237],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [238],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [239],
            weight: 1
          }],
        MID_:
          [{
            index: [240, 241, 242, 243],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [244],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [245],
            weight: 1
          }],
        LOWER_:
          [{
            index: [246, 247, 248, 249],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [250],
            weight: 1
          }],
      },
    GREEN_: {
        TOP_LEFT_:
          [{
            index: [251],
            weight: 1
          }],
        TOP_:
          [{
            index: [252, 253, 254, 255],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [256],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [257],
            weight: 1
          }],
        MID_:
          [{
            index: [258, 259, 260, 261],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [262],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [263],
            weight: 1
          }],
        LOWER_:
          [{
            index: [264, 265, 266, 267],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [268],
            weight: 1
          }],
      },
},
  SHINGLES: {
},

};

export default TILE_WEIGHTS;
