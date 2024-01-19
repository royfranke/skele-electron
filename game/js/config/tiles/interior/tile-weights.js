// Our custom tile mapping with:
// - Single index for putTileAt
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const TILE_WEIGHTS = {
  BLANK: 0,
  BORDER: {
    WALL_TOP: {
      TOP_LEFT_: [
        {
          index: [8],
          weight: 1
        }
      ],
      TOP_: [
        {
          index: [9],
          weight: 1
        }
      ],
      TOP_RIGHT_: [
        {
          index: [10],
          weight: 1
        }
      ],
      LEFT_: [
        {
          index: [16],
          weight: 1
        }
      ],
      RIGHT_: [
        {
          index: [18],
          weight: 1
        }
      ],
      BOTTOM_LEFT_: [
        {
          index: [24],
          weight: 1
        }
      ],
      BOTTOM_RIGHT_: [
        {
          index: [26],
          weight: 1
        }
      ],
    },
    WALL_SIDE: {
      LEFT_: [
        {
          index: [32],
          weight: 1
        }
      ],
      RIGHT_: [
        {
          index: [34],
          weight: 1
        }
      ],
      LEFT_BOTTOM_: [
        {
          index: [40],
          weight: 1
        }
      ],
      RIGHT_BOTTOM_: [
        {
          index: [42],
          weight: 1
        }
      ],
    },
    FLOOR: {
      LEFT_: [
        {
          index: [48],
          weight: 1
        }
      ],
      FILL_: [
        {
          index: [49],
          weight: 1
        }
      ],
      RIGHT_: [
        {
          index: [50],
          weight: 1
        }
      ],
    }
  },
  FLOOR: {
    WOOD_H_: [
      {
        index: [2, 3],
        weight: 1
      }
    ],
    WOOD_V_: [
      {
        index: [0, 1],
        weight: 1
      }
    ],
    TILE_: [
      {
        index: [4],
        weight: 1
      }
    ],
  },
  WALL: {
    WALLPAPER_TOP_: [
      {
        index: [17],
        weight: 1
      }
    ],
    WALLPAPER_: [
      {
        index: [25],
        weight: 1
      }
    ],
    WALLPAPER_BOTTOM_: [
      {
        index: [33],
        weight: 1
      }
    ],
  },
  STAIRS: {
    WOOD_LEFT_TOP_: [
      {
        index: [5],
        weight: 1
      }
    ],
    WOOD_RIGHT_TOP_: [
      {
        index: [6],
        weight: 1
      }
    ],
    WOOD_: [
      {
        index: [7],
        weight: 1
      }
    ],
    WOOD_LEFT_: [
      {
        index: [13],
        weight: 1
      }
    ],
    WOOD_RIGHT_: [
      {
        index: [14],
        weight: 1
      }
    ],
    WOOD_RUNNER_: [
      {
        index: [15],
        weight: 1
      }
    ],
    WOOD_LEFT_BOTTOM_: [
      {
        index: [21],
        weight: 1
      }
    ],
    WOOD_RIGHT_BOTTOM_: [
      {
        index: [22],
        weight: 1
      }
    ],
    CARPET_: [
      {
        index: [23],
        weight: 1
      }
    ],
  },
};

export default TILE_WEIGHTS;
