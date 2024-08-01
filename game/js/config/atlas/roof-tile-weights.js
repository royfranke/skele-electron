// Our custom tile mapping with:
// - Single index for putTileAt
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const TILE_WEIGHTS = {
  BLANK: 0,
  ASPHALT: {
    ROOF_BITMAP_: {
                                                    },
},
  SHINGLES: {
    FILL_: {
                                                    },
    NORTH_: {
        TOP_LEFT_:
          [{
            index: [49],
            weight: 1
          }],
        TOP_:
          [{
            index: [50, 51, 52, 53],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [54],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [55],
            weight: 1
          }],
        MID_:
          [{
            index: [56, 57, 58, 59],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [60],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [61],
            weight: 1
          }],
        LOWER_:
          [{
            index: [62, 63, 64, 65],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [66],
            weight: 1
          }],
                              },
    SOUTH_: {
        TOP_LEFT_:
          [{
            index: [67],
            weight: 1
          }],
        TOP_:
          [{
            index: [68, 69, 70, 71],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [72],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [73],
            weight: 1
          }],
        MID_:
          [{
            index: [74, 75, 76, 77],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [78],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [79],
            weight: 1
          }],
        LOWER_:
          [{
            index: [80, 81, 82, 83],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [84],
            weight: 1
          }],
                              },
},
  METAL: {
},
  FLAT: {
},
  PITCHED: {
    METAL_NORTH_: {
        TOP_LEFT_:
          [{
            index: [85],
            weight: 1
          }],
        TOP_:
          [{
            index: [86, 87, 88, 89],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [90],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [91],
            weight: 1
          }],
        MID_:
          [{
            index: [92, 93, 94, 95],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [96],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [97],
            weight: 1
          }],
        LOWER_:
          [{
            index: [98, 99, 100, 101],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [102],
            weight: 1
          }],
                              },
    METAL_SOUTH_: {
        TOP_LEFT_:
          [{
            index: [103],
            weight: 1
          }],
        TOP_:
          [{
            index: [104, 105, 106, 107],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [108],
            weight: 1
          }],
          MID_LEFT_:
          [{
            index: [109],
            weight: 1
          }],
        MID_:
          [{
            index: [110, 111, 112, 113],
            weight: 1
          }],
        MID_RIGHT_:
          [{
            index: [114],
            weight: 1
          }],
          LOWER_LEFT_:
          [{
            index: [115],
            weight: 1
          }],
        LOWER_:
          [{
            index: [116, 117, 118, 119],
            weight: 1
          }],
        LOWER_RIGHT_:
          [{
            index: [120],
            weight: 1
          }],
                              },
    SHINGLES_EAST_: {
                  MID_:
          [{
            index: [126, 130, 131, 132, 135, 136],
            weight: 1
          }],
                    REPEAT_1_NORTH_:
          [{
            index: [128],
            weight: 1
          }],
        REPEAT_2_NORTH_:
          [{
            index: [127],
            weight: 1
          }],
        PEAK_1_NORTH_:
          [{
            index: [122],
            weight: 1
          }],
        PEAK_2_NORTH_:
          [{
            index: [121],
            weight: 1
          }],
        REPEAT_1_SOUTH_:
          [{
            index: [140],
            weight: 1
          }],
        REPEAT_2_SOUTH_:
          [{
            index: [139],
            weight: 1
          }],
        REPEAT_3_SOUTH_:
          [{
            index: [138],
            weight: 1
          }],
          PEAK_1_SOUTH_:
          [{
            index: [134],
            weight: 1
          }],
        PEAK_2_SOUTH_:
          [{
            index: [133],
            weight: 1
          }],
        PEAK_EDGE_:
          [{
            index: [125, 129],
            weight: 1
          }],
      },
    SHINGLES_WEST_: {
                  MID_:
          [{
            index: [147, 149, 150, 151, 153, 154],
            weight: 1
          }],
                    REPEAT_1_NORTH_:
          [{
            index: [145],
            weight: 1
          }],
        REPEAT_2_NORTH_:
          [{
            index: [146],
            weight: 1
          }],
        PEAK_1_NORTH_:
          [{
            index: [143],
            weight: 1
          }],
        PEAK_2_NORTH_:
          [{
            index: [144],
            weight: 1
          }],
        REPEAT_1_SOUTH_:
          [{
            index: [157],
            weight: 1
          }],
        REPEAT_2_SOUTH_:
          [{
            index: [158],
            weight: 1
          }],
        REPEAT_3_SOUTH_:
          [{
            index: [159],
            weight: 1
          }],
          PEAK_1_SOUTH_:
          [{
            index: [155],
            weight: 1
          }],
        PEAK_2_SOUTH_:
          [{
            index: [156],
            weight: 1
          }],
        PEAK_EDGE_:
          [{
            index: [148, 152],
            weight: 1
          }],
      },
},

};

export default TILE_WEIGHTS;
