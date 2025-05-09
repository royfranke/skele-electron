import TILES from "./tile-weights.js";
// Our custom tile mapping with:
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const GROUND_RECIPES = {
CROSSWALK_1WAY_1LANE_E_: {
  WIDTH: 4,
  HEIGHT: 6,
  TILES: [ TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_ ]
},
CROSSWALK_1WAY_1LANE_N_: {
  WIDTH: 6,
  HEIGHT: 4,
  TILES: [ TILES.CURB.WEST_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.CURB.EAST_ ]
},
CROSSWALK_1WAY_1LANE_S_: {
  WIDTH: 6,
  HEIGHT: 4,
  TILES: [ TILES.CURB.WEST_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.CURB.EAST_ ]
},
CROSSWALK_1WAY_1LANE_W_: {
  WIDTH: 4,
  HEIGHT: 6,
  TILES: [ TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_ ]
},
CROSSWALK_2WAY_1LANE_EW_E_: {
  WIDTH: 4,
  HEIGHT: 8,
  TILES: [ TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_ ]
},
CROSSWALK_2WAY_1LANE_EW_W_: {
  WIDTH: 4,
  HEIGHT: 8,
  TILES: [ TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_ ]
},
CROSSWALK_2WAY_1LANE_NS_N_: {
  WIDTH: 8,
  HEIGHT: 4,
  TILES: [ TILES.CURB.WEST_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.CURB.EAST_ ]
},
CROSSWALK_2WAY_1LANE_NS_S_: {
  WIDTH: 8,
  HEIGHT: 4,
  TILES: [ TILES.CURB.WEST_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.CURB.EAST_ ]
},
CROSSWALK_2WAY_2LANE_EW_E_: {
  WIDTH: 4,
  HEIGHT: 14,
  TILES: [ TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_ ]
},
CROSSWALK_2WAY_2LANE_EW_W_: {
  WIDTH: 4,
  HEIGHT: 14,
  TILES: [ TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.CURB.NORTH_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_SOLIDWHITE_, TILES.CROSSWALK.EAST_, TILES.CROSSWALK.EAST_, TILES.ASPHALT.FILL_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_, TILES.CURB.SOUTH_ ]
},
CROSSWALK_2WAY_2LANE_NS_N_: {
  WIDTH: 14,
  HEIGHT: 4,
  TILES: [ TILES.CURB.WEST_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.CURB.EAST_ ]
},
CROSSWALK_2WAY_2LANE_NS_S_: {
  WIDTH: 14,
  HEIGHT: 4,
  TILES: [ TILES.CURB.WEST_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CROSSWALK.SOUTH_, TILES.CURB.EAST_, TILES.CURB.WEST_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.STREET.EASTWEST_SOLIDWHITE_, TILES.CURB.EAST_ ]
},
SIDEWALK_2X2: {
  WIDTH: 2,
  HEIGHT: 2,
  TILES: [ TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_ ]
},
SIDEWALK_EW_N_TREES: {
  WIDTH: 8,
  HEIGHT: 3,
  TILES: [ TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.DIRT.FILL_, TILES.DIRT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_ ]
},
SIDEWALK_EW_S_TREES: {
  WIDTH: 8,
  HEIGHT: 3,
  TILES: [ TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.DIRT.FILL_, TILES.DIRT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_, TILES.CEMENT.FILL_ ]
},
STREET_1WAY_1LANE_E_: {
  WIDTH: 1,
  HEIGHT: 6,
  TILES: [ TILES.CURB.NORTH_, TILES.STREET.NORTH_EASTWEST_SOLIDWHITE_, TILES.STREET.TOP_EAST_ARROW_, TILES.STREET.BOTTOM_EAST_ARROW_, TILES.STREET.SOUTH_EASTWEST_SOLIDWHITE_, TILES.CURB.SOUTH_ ]
},
STREET_1WAY_1LANE_EW_: {
  WIDTH: 1,
  HEIGHT: 6,
  TILES: [ TILES.CURB.NORTH_, TILES.STREET.NORTH_EASTWEST_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.STREET.SOUTH_EASTWEST_SOLIDWHITE_, TILES.CURB.SOUTH_ ]
},
STREET_1WAY_1LANE_N_: {
  WIDTH: 6,
  HEIGHT: 1,
  TILES: [ TILES.CURB.WEST_, TILES.STREET.WEST_NORTHSOUTH_SOLIDWHITE_, TILES.STREET.NORTH_LEFT_ARROW_, TILES.STREET.RIGHT_NORTH_ARROW_, TILES.STREET.EAST_NORTHSOUTH_SOLIDWHITE_, TILES.CURB.EAST_ ]
},
STREET_1WAY_1LANE_NS_: {
  WIDTH: 6,
  HEIGHT: 1,
  TILES: [ TILES.CURB.WEST_, TILES.STREET.WEST_NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.STREET.EAST_NORTHSOUTH_SOLIDWHITE_, TILES.CURB.EAST_ ]
},
STREET_1WAY_1LANE_S_: {
  WIDTH: 6,
  HEIGHT: 1,
  TILES: [ TILES.CURB.WEST_, TILES.STREET.WEST_NORTHSOUTH_SOLIDWHITE_, TILES.STREET.SOUTH_LEFT_ARROW_, TILES.STREET.SOUTH_RIGHT_ARROW_, TILES.STREET.EAST_NORTHSOUTH_SOLIDWHITE_, TILES.CURB.EAST_ ]
},
STREET_1WAY_1LANE_W_: {
  WIDTH: 1,
  HEIGHT: 6,
  TILES: [ TILES.CURB.NORTH_, TILES.STREET.NORTH_EASTWEST_SOLIDWHITE_, TILES.STREET.TOP_WEST_ARROW_, TILES.STREET.BOTTOM_WEST_ARROW_, TILES.STREET.SOUTH_EASTWEST_SOLIDWHITE_, TILES.CURB.SOUTH_ ]
},
STREET_2WAY_1LANE_EW_: {
  WIDTH: 1,
  HEIGHT: 8,
  TILES: [ TILES.CURB.NORTH_, TILES.STREET.NORTH_EASTWEST_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.STREET.EASTWEST_DOUBLEYELLOW_, TILES.ASPHALT.FILL_, TILES.STREET.SOUTH_EASTWEST_SOLIDWHITE_, TILES.CURB.SOUTH_ ]
},
STREET_2WAY_1LANE_NS_: {
  WIDTH: 8,
  HEIGHT: 1,
  TILES: [ TILES.CURB.WEST_, TILES.STREET.WEST_NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_DOUBLEYELLOW_, TILES.ASPHALT.FILL_, TILES.STREET.EAST_NORTHSOUTH_SOLIDWHITE_, TILES.CURB.EAST_ ]
},
STREET_2WAY_2LANE_EW_: {
  WIDTH: 1,
  HEIGHT: 14,
  TILES: [ TILES.CURB.NORTH_, TILES.STREET.NORTH_EASTWEST_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.STREET.EASTWEST_DASHEDWHITE_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.STREET.EASTWEST_DOUBLEYELLOW_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.STREET.EASTWEST_DASHEDWHITE_, TILES.ASPHALT.FILL_, TILES.STREET.SOUTH_EASTWEST_SOLIDWHITE_, TILES.CURB.SOUTH_ ]
},
STREET_2WAY_2LANE_NS_: {
  WIDTH: 14,
  HEIGHT: 1,
  TILES: [ TILES.CURB.WEST_, TILES.STREET.WEST_NORTHSOUTH_SOLIDWHITE_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_DASHEDWHITE_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_DOUBLEYELLOW_, TILES.ASPHALT.FILL_, TILES.ASPHALT.FILL_, TILES.STREET.NORTHSOUTH_DASHEDWHITE_, TILES.ASPHALT.FILL_, TILES.STREET.EAST_NORTHSOUTH_SOLIDWHITE_, TILES.CURB.EAST_ ]
}
};

export default GROUND_RECIPES;
