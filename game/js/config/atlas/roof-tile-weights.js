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
},
  METAL: {
},
  FLAT: {
},
  PITCHED: {
    METAL_NORTH_: {
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
    METAL_SOUTH_: {
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
    SHINGLES_WEST_: {
                  MID_:
          [{
            index: [91, 93, 94, 95, 97, 98],
            weight: 1
          }],
                    REPEAT_1_NORTH_:
          [{
            index: [89],
            weight: 1
          }],
        REPEAT_2_NORTH_:
          [{
            index: [90],
            weight: 1
          }],
        PEAK_1_NORTH_:
          [{
            index: [87],
            weight: 1
          }],
        PEAK_2_NORTH_:
          [{
            index: [88],
            weight: 1
          }],
        REPEAT_1_SOUTH_:
          [{
            index: [101],
            weight: 1
          }],
        REPEAT_2_SOUTH_:
          [{
            index: [102],
            weight: 1
          }],
        REPEAT_3_SOUTH_:
          [{
            index: [103],
            weight: 1
          }],
          PEAK_1_SOUTH_:
          [{
            index: [99],
            weight: 1
          }],
        PEAK_2_SOUTH_:
          [{
            index: [100],
            weight: 1
          }],
        PEAK_EDGE_:
          [{
            index: [92, 96],
            weight: 1
          }],
      },
    SHINGLES_EAST_: {
                  MID_:
          [{
            index: [110, 114, 115, 116, 119, 120],
            weight: 1
          }],
                    REPEAT_1_NORTH_:
          [{
            index: [112],
            weight: 1
          }],
        REPEAT_2_NORTH_:
          [{
            index: [111],
            weight: 1
          }],
        PEAK_1_NORTH_:
          [{
            index: [106],
            weight: 1
          }],
        PEAK_2_NORTH_:
          [{
            index: [105],
            weight: 1
          }],
        REPEAT_1_SOUTH_:
          [{
            index: [124],
            weight: 1
          }],
        REPEAT_2_SOUTH_:
          [{
            index: [123],
            weight: 1
          }],
        REPEAT_3_SOUTH_:
          [{
            index: [122],
            weight: 1
          }],
          PEAK_1_SOUTH_:
          [{
            index: [118],
            weight: 1
          }],
        PEAK_2_SOUTH_:
          [{
            index: [117],
            weight: 1
          }],
        PEAK_EDGE_:
          [{
            index: [109, 113],
            weight: 1
          }],
      },
},

};

export default TILE_WEIGHTS;
