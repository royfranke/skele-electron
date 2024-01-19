// Our custom tile mapping with:
// - Single index for putTileAt
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const TILE_WEIGHTS = {
  BLANK: 0,
  WALLPAPER: {
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
},
  STONE: {
},
  STUCCO: {
},
  BORDER: {
    SECTIONED_: {
        TOP_LEFT_:
          [{
            index: [39],
            weight: 1
          }],
          TOP_RIGHT_:
          [{
            index: [40],
            weight: 1
          }],
        MID_LEFT_:
          [{
            index: [41],
            weight: 1
          }],
          MID_RIGHT_:
          [{
            index: [42],
            weight: 1
          }],
        LOWER_LEFT_:
          [{
            index: [28],
            weight: 1
          }],
          LOWER_RIGHT_:
          [{
            index: [29],
            weight: 1
          }],
    },
    TOPVIEW_: {
        TOP_LEFT_:
          [{
            index: [30],
            weight: 1
          }],
        TOP_:
          [{
            index: [31, 34, 37],
            weight: 1
          }],
        TOP_RIGHT_:
          [{
            index: [32],
            weight: 1
          }],
        MID_LEFT_:
          [{
            index: [33],
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
          LOWER_RIGHT_:
          [{
            index: [38],
            weight: 1
          }],
    },
    SECTIONED_CEMENT_: {
                      LOWER_:
          [{
            index: [43, 44, 45],
            weight: 1
          }],
      },
    SECTIONED_CARPET_: {
                      LOWER_:
          [{
            index: [46, 47, 48],
            weight: 1
          }],
      },
    SECTIONED_TILE_: {
                      LOWER_:
          [{
            index: [49, 50, 51],
            weight: 1
          }],
      },
    SECTIONED_PLANK_: {
                      LOWER_:
          [{
            index: [52, 53, 54],
            weight: 1
          }],
      },
},

};

export default TILE_WEIGHTS;
