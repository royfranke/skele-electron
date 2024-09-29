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
    ROOF_BITMAP_BRICK_: {
                                                    },
    ROOF_BITMAP_BRICK_CEMENT_: {
                                                    },
},
  PITCHED: {
    METAL_NORTH_: {
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
    METAL_SOUTH_: {
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
    SHINGLES_EAST_: {
                  MID_:
          [{
            index: [222, 226, 227, 228, 231, 232],
            weight: 1
          }],
                    REPEAT_1_NORTH_:
          [{
            index: [224],
            weight: 1
          }],
        REPEAT_2_NORTH_:
          [{
            index: [223],
            weight: 1
          }],
        PEAK_1_NORTH_:
          [{
            index: [218],
            weight: 1
          }],
        PEAK_2_NORTH_:
          [{
            index: [217],
            weight: 1
          }],
        REPEAT_1_SOUTH_:
          [{
            index: [236],
            weight: 1
          }],
        REPEAT_2_SOUTH_:
          [{
            index: [235],
            weight: 1
          }],
        REPEAT_3_SOUTH_:
          [{
            index: [234],
            weight: 1
          }],
          PEAK_1_SOUTH_:
          [{
            index: [230],
            weight: 1
          }],
        PEAK_2_SOUTH_:
          [{
            index: [229],
            weight: 1
          }],
        PEAK_EDGE_:
          [{
            index: [221, 225],
            weight: 1
          }],
      },
    SHINGLES_WEST_: {
                  MID_:
          [{
            index: [243, 245, 246, 247, 249, 250],
            weight: 1
          }],
                    REPEAT_1_NORTH_:
          [{
            index: [241],
            weight: 1
          }],
        REPEAT_2_NORTH_:
          [{
            index: [242],
            weight: 1
          }],
        PEAK_1_NORTH_:
          [{
            index: [239],
            weight: 1
          }],
        PEAK_2_NORTH_:
          [{
            index: [240],
            weight: 1
          }],
        REPEAT_1_SOUTH_:
          [{
            index: [253],
            weight: 1
          }],
        REPEAT_2_SOUTH_:
          [{
            index: [254],
            weight: 1
          }],
        REPEAT_3_SOUTH_:
          [{
            index: [255],
            weight: 1
          }],
          PEAK_1_SOUTH_:
          [{
            index: [251],
            weight: 1
          }],
        PEAK_2_SOUTH_:
          [{
            index: [252],
            weight: 1
          }],
        PEAK_EDGE_:
          [{
            index: [244, 248],
            weight: 1
          }],
      },
},

};

export default TILE_WEIGHTS;
