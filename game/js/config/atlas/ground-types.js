const GROUND_TYPE = {
  DIRT: {
    TYPE: "DIRT",
    SPEED: "SLOWED",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: true,
    CANPLANT: true,
    CANSTAKE: true,
    COLLIDES: false,
    USEMASK: false
  },
  CROSSWALK: {
    TYPE: "CROSSWALK",
    SPEED: "CRISP",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: false,
    USEMASK: false
  },
  STREET: {
    TYPE: "STREET",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: false,
    USEMASK: false
  },
  CURB: {
    TYPE: "CURB",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: false,
    USEMASK: false
  },
  CEMENT: {
    TYPE: "CEMENT",
    SPEED: "CRISP",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: false,
    USEMASK: false
  },
  GRASS: {
    TYPE: "GRASS",
    SPEED: "SLOWED",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: true,
    CANPLANT: true,
    CANSTAKE: true,
    COLLIDES: false,
    USEMASK: true
  },
  MEADOW: {
    TYPE: "MEADOW",
    SPEED: "SLOG",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: true,
    CANPLANT: false,
    CANSTAKE: true,
    COLLIDES: false,
    USEMASK: true
  },
  LEAVES: {
    TYPE: "LEAVES",
    SPEED: "SLOWED",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: true,
    CANPLANT: false,
    CANSTAKE: true,
    COLLIDES: false,
    USEMASK: true
  },
  HEDGE: {
    TYPE: "HEDGE",
    SPEED: "BASE_SPEED",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: true,
    USEMASK: false
  },
  ASPHALT: {
    TYPE: "ASPHALT",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: false,
    USEMASK: false
  },
  PLAZA: {
    TYPE: "PLAZA",
    SPEED: "CRISP",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: false,
    USEMASK: false
  },
  MARSH: {
    TYPE: "MARSH",
    SPEED: "MOLASSES",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: false,
    USEMASK: true
  },
  MULCH: {
    TYPE: "MULCH",
    SPEED: "SLOWED",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: true,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: false,
    USEMASK: true
  },
  FOUNDATION: {
    TYPE: "FOUNDATION",
    SPEED: "BASE_SPEED",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: false,
    USEMASK: false
  },
  GARDEN: {
    TYPE: "GARDEN",
    SPEED: "SLOWED",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: true,
    CANPLANT: true,
    CANSTAKE: true,
    COLLIDES: false,
    USEMASK: true
  },
  TILE: {
    TYPE: "TILE",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: false,
    USEMASK: false
  },
  PLANK: {
    TYPE: "PLANK",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: false,
    USEMASK: false
  },
  CARPET: {
    TYPE: "CARPET",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: false,
    USEMASK: true
  },
  LINOLEUM: {
    TYPE: "LINOLEUM",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: false,
    USEMASK: false
  },
  EMPTY: {
    TYPE: "EMPTY",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: true,
    USEMASK: false
  },
  STAIRS: {
    TYPE: "STAIRS",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false,
    COLLIDES: false,
    USEMASK: false
  }
};

export default GROUND_TYPE;
