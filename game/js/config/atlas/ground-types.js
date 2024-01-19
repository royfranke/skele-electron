const GROUND_TYPE = {
  DIRT: {
    TYPE: "DIRT",
    SPEED: "SLOWED",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: true,
    CANPLANT: true,
    CANSTAKE: true
  },
  CROSSWALK: {
    TYPE: "CROSSWALK",
    SPEED: "CRISP",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false
  },
  STREET: {
    TYPE: "STREET",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false
  },
  CURB: {
    TYPE: "CURB",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false
  },
  CEMENT: {
    TYPE: "CEMENT",
    SPEED: "CRISP",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false
  },
  GRASS: {
    TYPE: "GRASS",
    SPEED: "SLOWED",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: true,
    CANPLANT: true,
    CANSTAKE: true
  },
  MEADOW: {
    TYPE: "MEADOW",
    SPEED: "SLOG",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: true,
    CANPLANT: false,
    CANSTAKE: true
  },
  LEAVES: {
    TYPE: "LEAVES",
    SPEED: "SLOWED",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: true,
    CANPLANT: false,
    CANSTAKE: true
  },
  HEDGE: {
    TYPE: "HEDGE",
    SPEED: "BASE_SPEED",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false
  },
  ASPHALT: {
    TYPE: "ASPHALT",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false
  },
  PLAZA: {
    TYPE: "PLAZA",
    SPEED: "CRISP",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false
  },
  MARSH: {
    TYPE: "MARSH",
    SPEED: "MOLASSES",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false
  },
  MULCH: {
    TYPE: "MULCH",
    SPEED: "SLOWED",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: true,
    CANPLANT: false,
    CANSTAKE: false
  },
  FOUNDATION: {
    TYPE: "FOUNDATION",
    SPEED: "BASE_SPEED",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false
  },
  GARDEN: {
    TYPE: "GARDEN",
    SPEED: "SLOWED",
    BITMAP: true,
    FILLTILE: true,
    CANDIG: true,
    CANPLANT: true,
    CANSTAKE: true
  },
  TILE: {
    TYPE: "TILE",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false
  },
  PLANK: {
    TYPE: "PLANK",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false
  },
  CARPET: {
    TYPE: "CARPET",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false
  },
  LINOLEUM: {
    TYPE: "LINOLEUM",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false
  },
  EMPTY: {
    TYPE: "EMPTY",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    FILLTILE: true,
    CANDIG: false,
    CANPLANT: false,
    CANSTAKE: false
  }
};

export default GROUND_TYPE;
