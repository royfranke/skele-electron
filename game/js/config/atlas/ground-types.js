const GROUND_TYPE = {
  DIRT: {
    TYPE: "DIRT",
    SPEED: "SLOWED",
    BITMAP: true,
    EDGE: "SOFT",
    COLLIDES: false,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 4,
    CHILDPREF: 0,
    ANIMALPREF: 1,
    ACTIONS: [
         { ITEM: "SACK_GRASS_SEED",
       ACTION: "plant",
       FX: "CLOUD_DUST_",
       GROUND: "GRASS"
      } ,
         { ITEM: "SACK_MULCH",
       ACTION: "pour out",
       FX: "CLOUD_DUST_",
       GROUND: "MULCH"
      } 
        ]
  },
  CROSSWALK: {
    TYPE: "CROSSWALK",
    SPEED: "CRISP",
    BITMAP: false,
    EDGE: "NONE",
    COLLIDES: false,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 1,
    CHILDPREF: 1,
    ANIMALPREF: 4,
    ACTIONS: [
        ]
  },
  STREET: {
    TYPE: "STREET",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    EDGE: "HARD",
    COLLIDES: false,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 10,
    CHILDPREF: 7,
    ANIMALPREF: 7,
    ACTIONS: [
        ]
  },
  CURB: {
    TYPE: "CURB",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    EDGE: "NONE",
    COLLIDES: false,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 7,
    CHILDPREF: 7,
    ANIMALPREF: 10,
    ACTIONS: [
        ]
  },
  CEMENT: {
    TYPE: "CEMENT",
    SPEED: "CRISP",
    BITMAP: false,
    EDGE: "HARD",
    COLLIDES: false,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 0,
    CHILDPREF: 1,
    ANIMALPREF: 1,
    ACTIONS: [
        ]
  },
  GRASS: {
    TYPE: "GRASS",
    SPEED: "SLOWED",
    BITMAP: false,
    EDGE: "SOFT",
    COLLIDES: false,
    USEMASK: true,
    ZINDEX: 5,
    ADULTPREF: 7,
    CHILDPREF: 1,
    ANIMALPREF: 0,
    ACTIONS: [
         { ITEM: "SPADE",
       ACTION: "dig",
       FX: "CLOUD_DUST_",
       GROUND: "DIRT"
      } ,
         { ITEM: "SHOVEL",
       ACTION: "dig",
       FX: "CLOUD_DUST_",
       GROUND: "DIRT"
      } 
        ]
  },
  MEADOW: {
    TYPE: "MEADOW",
    SPEED: "SLOWED",
    BITMAP: false,
    EDGE: "SOFT",
    COLLIDES: false,
    USEMASK: true,
    ZINDEX: 0,
    ADULTPREF: 10,
    CHILDPREF: 4,
    ANIMALPREF: 1,
    ACTIONS: [
        ]
  },
  LEAVES: {
    TYPE: "LEAVES",
    SPEED: "SLOWED",
    BITMAP: false,
    EDGE: "FEATHER",
    COLLIDES: false,
    USEMASK: true,
    ZINDEX: 8,
    ADULTPREF: 7,
    CHILDPREF: 4,
    ANIMALPREF: 1,
    ACTIONS: [
         { ITEM: "RAKE",
       ACTION: "rake",
       FX: "CLOUD_DUST_",
       GROUND: "MULCH"
      } ,
         { ITEM: "SHOVEL",
       ACTION: "dig",
       FX: "CLOUD_DUST_",
       GROUND: "MULCH"
      } ,
         { ITEM: "SPADE",
       ACTION: "dig",
       FX: "CLOUD_DUST_",
       GROUND: "MULCH"
      } 
        ]
  },
  HEDGE: {
    TYPE: "HEDGE",
    SPEED: "BASE_SPEED",
    BITMAP: true,
    EDGE: "NONE",
    COLLIDES: true,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 0,
    CHILDPREF: 0,
    ANIMALPREF: 0,
    ACTIONS: [
        ]
  },
  ASPHALT: {
    TYPE: "ASPHALT",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    EDGE: "HARD",
    COLLIDES: false,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 7,
    CHILDPREF: 7,
    ANIMALPREF: 4,
    ACTIONS: [
        ]
  },
  PLAZA: {
    TYPE: "PLAZA",
    SPEED: "CRISP",
    BITMAP: false,
    EDGE: "HARD",
    COLLIDES: false,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 1,
    CHILDPREF: 1,
    ANIMALPREF: 4,
    ACTIONS: [
        ]
  },
  MARSH: {
    TYPE: "MARSH",
    SPEED: "MOLASSES",
    BITMAP: false,
    EDGE: "SOFT",
    COLLIDES: false,
    USEMASK: true,
    ZINDEX: 0,
    ADULTPREF: 10,
    CHILDPREF: 7,
    ANIMALPREF: 4,
    ACTIONS: [
        ]
  },
  MULCH: {
    TYPE: "MULCH",
    SPEED: "SLOWED",
    BITMAP: true,
    EDGE: "FEATHER",
    COLLIDES: false,
    USEMASK: true,
    ZINDEX: 3,
    ADULTPREF: 7,
    CHILDPREF: 4,
    ANIMALPREF: 1,
    ACTIONS: [
         { ITEM: "",
       ACTION: "dig",
       FX: "CLOUD_DUST_",
       GROUND: "DIRT"
      } 
        ]
  },
  FOUNDATION: {
    TYPE: "FOUNDATION",
    SPEED: "BASE_SPEED",
    BITMAP: true,
    EDGE: "NONE",
    COLLIDES: true,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 100,
    CHILDPREF: 100,
    ANIMALPREF: 100,
    ACTIONS: [
        ]
  },
  GARDEN: {
    TYPE: "GARDEN",
    SPEED: "SLOWED",
    BITMAP: true,
    EDGE: "NONE",
    COLLIDES: false,
    USEMASK: true,
    ZINDEX: 0,
    ADULTPREF: 7,
    CHILDPREF: 4,
    ANIMALPREF: 1,
    ACTIONS: [
        ]
  },
  TILE: {
    TYPE: "TILE",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    EDGE: "HARD",
    COLLIDES: false,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 0,
    CHILDPREF: 0,
    ANIMALPREF: 0,
    ACTIONS: [
        ]
  },
  PLANK: {
    TYPE: "PLANK",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    EDGE: "HARD",
    COLLIDES: false,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 1,
    CHILDPREF: 1,
    ANIMALPREF: 4,
    ACTIONS: [
        ]
  },
  CARPET: {
    TYPE: "CARPET",
    SPEED: "SLOWED",
    BITMAP: false,
    EDGE: "NONE",
    COLLIDES: false,
    USEMASK: true,
    ZINDEX: 1,
    ADULTPREF: 0,
    CHILDPREF: 0,
    ANIMALPREF: 0,
    ACTIONS: [
        ]
  },
  LINOLEUM: {
    TYPE: "LINOLEUM",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    EDGE: "NONE",
    COLLIDES: false,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 1,
    CHILDPREF: 1,
    ANIMALPREF: 4,
    ACTIONS: [
        ]
  },
  EMPTY: {
    TYPE: "EMPTY",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    EDGE: "NONE",
    COLLIDES: true,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 0,
    CHILDPREF: 0,
    ANIMALPREF: 0,
    ACTIONS: [
        ]
  },
  STAIRS: {
    TYPE: "STAIRS",
    SPEED: "BASE_SPEED",
    BITMAP: false,
    EDGE: "NONE",
    COLLIDES: false,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 1,
    CHILDPREF: 1,
    ANIMALPREF: 7,
    ACTIONS: [
        ]
  },
  ROOF: {
    TYPE: "ROOF",
    SPEED: "BASE_SPEED",
    BITMAP: true,
    EDGE: "NONE",
    COLLIDES: false,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 7,
    CHILDPREF: 4,
    ANIMALPREF: 1,
    ACTIONS: [
        ]
  },
  EDGE: {
    TYPE: "EDGE",
    SPEED: "BASE_SPEED",
    BITMAP: true,
    EDGE: "NONE",
    COLLIDES: false,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 0,
    CHILDPREF: 0,
    ANIMALPREF: 0,
    ACTIONS: [
        ]
  },
  VOID: {
    TYPE: "VOID",
    SPEED: "SLOWED",
    BITMAP: false,
    EDGE: "NONE",
    COLLIDES: false,
    USEMASK: false,
    ZINDEX: 0,
    ADULTPREF: 0,
    CHILDPREF: 0,
    ANIMALPREF: 0,
    ACTIONS: [
        ]
  }
};

export default GROUND_TYPE;
