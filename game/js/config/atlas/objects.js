const OBJECTS = {
      APPLE_TREE: {
        name: 'Apple Tree',
        slug: 'APPLE_TREE', 
        type: 'TREE',
        bounding: {
          h:1, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 0,
        portal: 0,
        actions: [],
        states: [],
    },
      BOXELDER: {
        name: 'Boxelder',
        slug: 'BOXELDER', 
        type: 'TREE',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:12
        },
        offset: {
          x:10, 
          y:38
        },
        varieties: 7,
        portal: 0,
        actions: [],
        states: [],
    },
      BUS_STOP_A_: {
        name: 'Bus Stop A',
        slug: 'BUS_STOP_A_', 
        type: 'BUS_SIGN',
        bounding: {
          h:4, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:3
        },
        sprite: {
          h:64, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:8
        },
        offset: {
          x:4, 
          y:52
        },
        varieties: 3,
        portal: 0,
        actions: [],
        states: [],
    },
      BUS_STOP_B_: {
        name: 'Bus Stop B',
        slug: 'BUS_STOP_B_', 
        type: 'BUS_SIGN',
        bounding: {
          h:4, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:3
        },
        sprite: {
          h:64, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:8
        },
        offset: {
          x:4, 
          y:52
        },
        varieties: 3,
        portal: 0,
        actions: [],
        states: [],
    },
      BUS_STOP_C_: {
        name: 'Bus Stop C',
        slug: 'BUS_STOP_C_', 
        type: 'BUS_SIGN',
        bounding: {
          h:4, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:3
        },
        sprite: {
          h:64, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:8
        },
        offset: {
          x:4, 
          y:52
        },
        varieties: 3,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_L_1_1_: {
        name: 'Cement Stair Rail L 1-1',
        slug: 'CEMENT_STAIR_RAIL_L_1_1_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:3, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:48, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:8
        },
        offset: {
          x:8, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_L_1_2_: {
        name: 'Cement Stair Rail L 1-2',
        slug: 'CEMENT_STAIR_RAIL_L_1_2_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:4, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:64, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:64, 
          w:8
        },
        offset: {
          x:8, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_L_1_3_: {
        name: 'Cement Stair Rail L 1-3',
        slug: 'CEMENT_STAIR_RAIL_L_1_3_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:5, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:80, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:80, 
          w:8
        },
        offset: {
          x:8, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_L_1_4_: {
        name: 'Cement Stair Rail L 1-4',
        slug: 'CEMENT_STAIR_RAIL_L_1_4_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:6, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:96, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:96, 
          w:8
        },
        offset: {
          x:8, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_L_2_1_: {
        name: 'Cement Stair Rail L 2-1',
        slug: 'CEMENT_STAIR_RAIL_L_2_1_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:4, 
          w:1
        },
        base: {
          h:2, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:64, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:64, 
          w:8
        },
        offset: {
          x:8, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_L_2_2_: {
        name: 'Cement Stair Rail L 2-2',
        slug: 'CEMENT_STAIR_RAIL_L_2_2_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:5, 
          w:1
        },
        base: {
          h:2, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:80, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:80, 
          w:8
        },
        offset: {
          x:8, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_L_2_3_: {
        name: 'Cement Stair Rail L 2-3',
        slug: 'CEMENT_STAIR_RAIL_L_2_3_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:6, 
          w:1
        },
        base: {
          h:2, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:96, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:96, 
          w:8
        },
        offset: {
          x:8, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_L_3_1_: {
        name: 'Cement Stair Rail L 3-1',
        slug: 'CEMENT_STAIR_RAIL_L_3_1_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:5, 
          w:1
        },
        base: {
          h:3, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:80, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:80, 
          w:8
        },
        offset: {
          x:8, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_L_3_2_: {
        name: 'Cement Stair Rail L 3-2',
        slug: 'CEMENT_STAIR_RAIL_L_3_2_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:6, 
          w:1
        },
        base: {
          h:3, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:96, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:96, 
          w:8
        },
        offset: {
          x:8, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_R_1_1_: {
        name: 'Cement Stair Rail R 1-1',
        slug: 'CEMENT_STAIR_RAIL_R_1_1_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:3, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:48, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:8
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_R_1_2_: {
        name: 'Cement Stair Rail R 1-2',
        slug: 'CEMENT_STAIR_RAIL_R_1_2_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:4, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:64, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:64, 
          w:8
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_R_1_3_: {
        name: 'Cement Stair Rail R 1-3',
        slug: 'CEMENT_STAIR_RAIL_R_1_3_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:5, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:80, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:80, 
          w:8
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_R_1_4_: {
        name: 'Cement Stair Rail R 1-4',
        slug: 'CEMENT_STAIR_RAIL_R_1_4_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:6, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:96, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:96, 
          w:8
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_R_2_1_: {
        name: 'Cement Stair Rail R 2-1',
        slug: 'CEMENT_STAIR_RAIL_R_2_1_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:4, 
          w:1
        },
        base: {
          h:2, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:64, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:64, 
          w:8
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_R_2_2_: {
        name: 'Cement Stair Rail R 2-2',
        slug: 'CEMENT_STAIR_RAIL_R_2_2_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:5, 
          w:1
        },
        base: {
          h:2, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:80, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:80, 
          w:8
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_R_2_3_: {
        name: 'Cement Stair Rail R 2-3',
        slug: 'CEMENT_STAIR_RAIL_R_2_3_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:6, 
          w:1
        },
        base: {
          h:2, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:96, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:96, 
          w:8
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_R_3_1_: {
        name: 'Cement Stair Rail R 3-1',
        slug: 'CEMENT_STAIR_RAIL_R_3_1_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:5, 
          w:1
        },
        base: {
          h:3, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:80, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:80, 
          w:8
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CEMENT_STAIR_RAIL_R_3_2_: {
        name: 'Cement Stair Rail R 3-2',
        slug: 'CEMENT_STAIR_RAIL_R_3_2_', 
        type: 'STAIR_RAIL',
        bounding: {
          h:6, 
          w:1
        },
        base: {
          h:3, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:96, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:96, 
          w:8
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CHAINLINK_S_1_COMPLETE: {
        name: 'Chainlink 1',
        slug: 'CHAINLINK_S_1_COMPLETE', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:16
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CHAINLINK_S_1_OPEN: {
        name: 'Chainlink 1 Open',
        slug: 'CHAINLINK_S_1_OPEN', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:16
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CHAINLINK_S_2_COMPLETE: {
        name: 'Chainlink 2',
        slug: 'CHAINLINK_S_2_COMPLETE', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:32
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CHAINLINK_S_3_COMPLETE: {
        name: 'Chainlink 3',
        slug: 'CHAINLINK_S_3_COMPLETE', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:3
        },
        base: {
          h:1, 
          w:3,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:48
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CHAINLINK_S_3_OPEN: {
        name: 'Chainlink 3 Open',
        slug: 'CHAINLINK_S_3_OPEN', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:3
        },
        base: {
          h:1, 
          w:3,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:48
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CHAINLINK_S_4_COMPLETE: {
        name: 'Chainlink 4',
        slug: 'CHAINLINK_S_4_COMPLETE', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:64
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CHAINLINK_S_4_OPEN: {
        name: 'Chainlink 4 Open',
        slug: 'CHAINLINK_S_4_OPEN', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:64
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CHAINLINK_S_5_COMPLETE: {
        name: 'Chainlink 5',
        slug: 'CHAINLINK_S_5_COMPLETE', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:5
        },
        base: {
          h:1, 
          w:5,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:80,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:80
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CHAINLINK_S_6_COMPLETE: {
        name: 'Chainlink 6',
        slug: 'CHAINLINK_S_6_COMPLETE', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:6
        },
        base: {
          h:1, 
          w:6,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:96,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:96
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      CHAINLINK_S_6_OPEN: {
        name: 'Chainlink 6 Open',
        slug: 'CHAINLINK_S_6_OPEN', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:6
        },
        base: {
          h:1, 
          w:6,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:96,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:96
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      HYDRANT_CITY_: {
        name: 'City Hydrant',
        slug: 'HYDRANT_CITY_', 
        type: 'HYDRANT',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:0, 
          y:16
        },
        varieties: 12,
        portal: 0,
        actions: [],
        states: [],
    },
      SPECIAL_NEWS_BOX_: {
        name: 'City News Box',
        slug: 'SPECIAL_NEWS_BOX_', 
        type: 'NEWSPAPER_BOX_',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:0, 
          y:16
        },
        varieties: 6,
        portal: 0,
        actions: [ {
            name: 'INSERT COIN', stateTrigger: 'COIN_DISPENSING', validStates: ['COIN_LOCKED',]
          },],
        states: [            {
              name: 'COIN_LOCKED',
              transition: 'false',
              frames: ['SPECIAL_NEWS_BOX_-1', ]
              }, {
              name: 'COIN_DISPENSING',
              transition: 'COIN_RETRACTING',
              frames: ['SPECIAL_NEWS_BOX_-2', 'SPECIAL_NEWS_BOX_-3', 'SPECIAL_NEWS_BOX_-4', 'SPECIAL_NEWS_BOX_-5', 'SPECIAL_NEWS_BOX_-6', ]
              },
          ],
    },
      CONE_FALLEN: {
        name: 'Cone Fallen',
        slug: 'CONE_FALLEN', 
        type: 'CONE',
        bounding: {
          h:1, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 6,
        portal: 0,
        actions: [],
        states: [],
    },
      CONE_UPRIGHT: {
        name: 'Cone Upright',
        slug: 'CONE_UPRIGHT', 
        type: 'CONE',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:0, 
          y:16
        },
        varieties: 6,
        portal: 0,
        actions: [],
        states: [],
    },
      DOOR_WINDOWS_SMALL_: {
        name: 'Door with Small Windows',
        slug: 'DOOR_WINDOWS_SMALL_', 
        type: 'EXT_DOOR_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:36, 
          w:18
        },
        offset: {
          x:7, 
          y:13
        },
        varieties: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED',]
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN',]
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT',]
          },],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: []
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: []
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: []
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: []
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: []
              }, {
              name: 'KNOCKING',
              transition: 'WAITING',
              frames: []
              },
          ],
    },
      DOORMAT_1: {
        name: 'Doormat 1',
        slug: 'DOORMAT_1', 
        type: 'DOORMAT',
        bounding: {
          h:1, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:0
        },
        sprite: {
          h:16, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:0, 
          w:0
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 3,
        portal: 0,
        actions: [ {
            name: 'LOOK UNDER', stateTrigger: 'LOOKING_UNDER', validStates: ['DEFAULT',]
          },],
        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['DOORMAT_1-1', ]
              }, {
              name: 'LOOKING_UNDER',
              transition: 'DEFAULT',
              frames: ['DOORMAT_1-1', 'DOORMAT_1-2', 'DOORMAT_1-3', 'DOORMAT_1-2', 'DOORMAT_1-1', ]
              },
          ],
    },
      WINDOW_DOUBLE_: {
        name: 'Double Window',
        slug: 'WINDOW_DOUBLE_', 
        type: 'WINDOW_EXT_',
        bounding: {
          h:2, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 4,
        portal: 0,
        actions: [],
        states: [],
    },
      WINDOW_2_BLUE_WORN_: {
        name: 'Double Window Blue Worn',
        slug: 'WINDOW_2_BLUE_WORN_', 
        type: 'WINDOW_EXT_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 9,
        portal: 0,
        actions: [],
        states: [],
    },
      WINDOW_2_GREEN_WORN_: {
        name: 'Double Window Green Worn',
        slug: 'WINDOW_2_GREEN_WORN_', 
        type: 'WINDOW_EXT_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 9,
        portal: 0,
        actions: [],
        states: [],
    },
      WINDOW_2_HONEY_WOOD_: {
        name: 'Double Window Honey Wood',
        slug: 'WINDOW_2_HONEY_WOOD_', 
        type: 'WINDOW_EXT_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 0,
        portal: 0,
        actions: [],
        states: [],
    },
      WINDOW_2_Pink_WORN_: {
        name: 'Double Window Pink Worn',
        slug: 'WINDOW_2_Pink_WORN_', 
        type: 'WINDOW_EXT_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 0,
        portal: 0,
        actions: [],
        states: [],
    },
      WINDOW_2_PURPLE_WORN_: {
        name: 'Double Window Purple Worn',
        slug: 'WINDOW_2_PURPLE_WORN_', 
        type: 'WINDOW_EXT_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 9,
        portal: 0,
        actions: [],
        states: [],
    },
      WINDOW_2_Red_WORN_: {
        name: 'Double Window Red Worn',
        slug: 'WINDOW_2_Red_WORN_', 
        type: 'WINDOW_EXT_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 0,
        portal: 0,
        actions: [],
        states: [],
    },
      WINDOW_2_CREAM_WORN_: {
        name: 'Double Window Worn Cream',
        slug: 'WINDOW_2_CREAM_WORN_', 
        type: 'WINDOW_EXT_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 9,
        portal: 0,
        actions: [],
        states: [],
    },
      WINDOW_2_GRAY_WORN_: {
        name: 'Double Window Worn Gray',
        slug: 'WINDOW_2_GRAY_WORN_', 
        type: 'WINDOW_EXT_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 9,
        portal: 0,
        actions: [],
        states: [],
    },
      WINDOW_2_RED_WORN_: {
        name: 'Double Window Worn Red Brown',
        slug: 'WINDOW_2_RED_WORN_', 
        type: 'WINDOW_EXT_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 0,
        portal: 0,
        actions: [],
        states: [],
    },
      WINDOW_2_RED_BROWN_WORN_: {
        name: 'Double Window Worn Red Brown',
        slug: 'WINDOW_2_RED_BROWN_WORN_', 
        type: 'WINDOW_EXT_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 0,
        portal: 0,
        actions: [],
        states: [],
    },
      WINDOW_2_WOOD_WORN_: {
        name: 'Double Window Worn Wood',
        slug: 'WINDOW_2_WOOD_WORN_', 
        type: 'WINDOW_EXT_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 0,
        portal: 0,
        actions: [],
        states: [],
    },
      WINDOW_2_YELLOW_WORN_: {
        name: 'Double Window Worn Yellow',
        slug: 'WINDOW_2_YELLOW_WORN_', 
        type: 'WINDOW_EXT_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:24, 
          w:24
        },
        offset: {
          x:4, 
          y:12
        },
        varieties: 9,
        portal: 0,
        actions: [],
        states: [],
    },
      EXT_DOOR_WINDOWS_GRAY: {
        name: 'Ext Door Windows Gray',
        slug: 'EXT_DOOR_WINDOWS_GRAY', 
        type: 'EXT_DOOR_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:36, 
          w:18
        },
        offset: {
          x:7, 
          y:12
        },
        varieties: 5,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED',]
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN',]
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT',]
          },],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_GRAY-1', ]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_WINDOWS_GRAY-2', 'EXT_DOOR_WINDOWS_GRAY-3', 'EXT_DOOR_WINDOWS_GRAY-4', 'EXT_DOOR_WINDOWS_GRAY-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_GRAY-5', ]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_WINDOWS_GRAY-4', 'EXT_DOOR_WINDOWS_GRAY-3', 'EXT_DOOR_WINDOWS_GRAY-2', 'EXT_DOOR_WINDOWS_GRAY-1', ]
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: []
              }, {
              name: 'KNOCKING',
              transition: 'WAITING',
              frames: []
              },
          ],
    },
      EXT_DOOR_WINDOWS_GREEN: {
        name: 'Ext Door Windows Green',
        slug: 'EXT_DOOR_WINDOWS_GREEN', 
        type: 'EXT_DOOR_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:36, 
          w:18
        },
        offset: {
          x:7, 
          y:12
        },
        varieties: 5,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED',]
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN',]
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT',]
          },],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_GREEN-1', ]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_WINDOWS_GREEN-2', 'EXT_DOOR_WINDOWS_GREEN-3', 'EXT_DOOR_WINDOWS_GREEN-4', 'EXT_DOOR_WINDOWS_GREEN-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_GREEN-5', ]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_WINDOWS_GREEN-4', 'EXT_DOOR_WINDOWS_GREEN-3', 'EXT_DOOR_WINDOWS_GREEN-2', 'EXT_DOOR_WINDOWS_GREEN-1', ]
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: []
              }, {
              name: 'KNOCKING',
              transition: 'WAITING',
              frames: []
              },
          ],
    },
      EXT_DOOR_WINDOWS_ORANGE: {
        name: 'Ext Door Windows Orange',
        slug: 'EXT_DOOR_WINDOWS_ORANGE', 
        type: 'EXT_DOOR_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:36, 
          w:18
        },
        offset: {
          x:7, 
          y:12
        },
        varieties: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED',]
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN',]
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT',]
          },],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: []
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: []
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: []
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: []
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: []
              }, {
              name: 'KNOCKING',
              transition: 'WAITING',
              frames: []
              },
          ],
    },
      EXT_DOOR_WINDOWS_PURPLE: {
        name: 'Ext Door Windows Purple',
        slug: 'EXT_DOOR_WINDOWS_PURPLE', 
        type: 'EXT_DOOR_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:36, 
          w:18
        },
        offset: {
          x:7, 
          y:12
        },
        varieties: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED',]
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN',]
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT',]
          },],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: []
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: []
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: []
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: []
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: []
              }, {
              name: 'KNOCKING',
              transition: 'WAITING',
              frames: []
              },
          ],
    },
      EXT_DOOR_WINDOWS_WHITE: {
        name: 'Ext Door Windows White',
        slug: 'EXT_DOOR_WINDOWS_WHITE', 
        type: 'EXT_DOOR_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:36, 
          w:18
        },
        offset: {
          x:7, 
          y:12
        },
        varieties: 5,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED',]
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN',]
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT',]
          },],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_WHITE-1', ]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_WINDOWS_WHITE-2', 'EXT_DOOR_WINDOWS_WHITE-3', 'EXT_DOOR_WINDOWS_WHITE-4', 'EXT_DOOR_WINDOWS_WHITE-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_WHITE-5', ]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_WINDOWS_WHITE-4', 'EXT_DOOR_WINDOWS_WHITE-3', 'EXT_DOOR_WINDOWS_WHITE-2', 'EXT_DOOR_WINDOWS_WHITE-1', ]
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: []
              }, {
              name: 'KNOCKING',
              transition: 'WAITING',
              frames: []
              },
          ],
    },
      EXT_DOOR_WINDOWS_YELLOW: {
        name: 'Ext Door Windows Yellow',
        slug: 'EXT_DOOR_WINDOWS_YELLOW', 
        type: 'EXT_DOOR_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:36, 
          w:18
        },
        offset: {
          x:7, 
          y:12
        },
        varieties: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED',]
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN',]
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT',]
          },],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: []
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: []
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: []
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: []
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: []
              }, {
              name: 'KNOCKING',
              transition: 'WAITING',
              frames: []
              },
          ],
    },
      EXT_WINDOW_2_OPENS: {
        name: 'Ext Window 2 Opens',
        slug: 'EXT_WINDOW_2_OPENS', 
        type: 'WINDOW_EXT_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:21, 
          w:28
        },
        offset: {
          x:2, 
          y:13
        },
        varieties: 10,
        portal: 0,
        actions: [],
        states: [],
    },
      OBJ_FLYER_GRAY: {
        name: 'Gray Flyer',
        slug: 'OBJ_FLYER_GRAY', 
        type: 'FLYER',
        bounding: {
          h:1, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 8,
        portal: 0,
        actions: [ {
            name: 'READ', stateTrigger: 'READING', validStates: ['DEFAULT',]
          }, {
            name: 'GUST', stateTrigger: 'GUSTING', validStates: ['DEFAULT',]
          },],
        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_GRAY-1', ]
              }, {
              name: 'READING',
              transition: 'DEFAULT',
              frames: []
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_GRAY-1', ]
              }, {
              name: 'GUSTING',
              transition: 'DEFAULT',
              frames: ['OBJ_FLYER_GRAY-1', 'OBJ_FLYER_GRAY-2', 'OBJ_FLYER_GRAY-3', 'OBJ_FLYER_GRAY-4', 'OBJ_FLYER_GRAY-5', 'OBJ_FLYER_GRAY-6', 'OBJ_FLYER_GRAY-7', 'OBJ_FLYER_GRAY-8', ]
              },
          ],
    },
      MAILBOX_1: {
        name: 'Mailbox 1',
        slug: 'MAILBOX_1', 
        type: 'MAILBOX',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:29, 
          w:13,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:12
        },
        offset: {
          x:0, 
          y:14
        },
        varieties: 5,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED',]
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN',]
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN',]
          },],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['MAILBOX_1-1', ]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['MAILBOX_1-2', 'MAILBOX_1-3', 'MAILBOX_1-4', 'MAILBOX_1-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_1-5', ]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['MAILBOX_1-4', 'MAILBOX_1-3', 'MAILBOX_1-2', 'MAILBOX_1-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_1-5', ]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: []
              },
          ],
slots: '0',
items: []    },
      MAILBOX_SHINY: {
        name: 'Mailbox Shiny',
        slug: 'MAILBOX_SHINY', 
        type: 'MAILBOX',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:10, 
          w:8
        },
        offset: {
          x:4, 
          y:18
        },
        varieties: 5,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED',]
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN',]
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN',]
          },],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['MAILBOX_SHINY-1', ]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['MAILBOX_SHINY-1', 'MAILBOX_SHINY-2', 'MAILBOX_SHINY-3', 'MAILBOX_SHINY-4', 'MAILBOX_SHINY-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_SHINY-5', ]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['MAILBOX_SHINY-5', 'MAILBOX_SHINY-4', 'MAILBOX_SHINY-3', 'MAILBOX_SHINY-2', 'MAILBOX_SHINY-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_SHINY-5', ]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['MAILBOX_SHINY-5', ]
              },
          ],
slots: '0',
items: []    },
      MAILBOX_SLEEK: {
        name: 'Mailbox Sleek',
        slug: 'MAILBOX_SLEEK', 
        type: 'MAILBOX',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:10, 
          w:8
        },
        offset: {
          x:4, 
          y:18
        },
        varieties: 5,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED',]
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN',]
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN',]
          },],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['MAILBOX_SLEEK-1', ]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['MAILBOX_SLEEK-1', 'MAILBOX_SLEEK-2', 'MAILBOX_SLEEK-3', 'MAILBOX_SLEEK-4', 'MAILBOX_SLEEK-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_SLEEK-5', ]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['MAILBOX_SLEEK-5', 'MAILBOX_SLEEK-4', 'MAILBOX_SLEEK-3', 'MAILBOX_SLEEK-2', 'MAILBOX_SLEEK-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_SLEEK-5', ]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['MAILBOX_SLEEK-5', ]
              },
          ],
slots: '0',
items: []    },
      MAILBOX_WEATHERED: {
        name: 'Mailbox Weathered',
        slug: 'MAILBOX_WEATHERED', 
        type: 'MAILBOX',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:10, 
          w:8
        },
        offset: {
          x:4, 
          y:18
        },
        varieties: 5,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED',]
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN',]
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN',]
          },],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['MAILBOX_WEATHERED-1', ]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['MAILBOX_WEATHERED-1', 'MAILBOX_WEATHERED-2', 'MAILBOX_WEATHERED-3', 'MAILBOX_WEATHERED-4', 'MAILBOX_WEATHERED-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_WEATHERED-5', ]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['MAILBOX_WEATHERED-5', 'MAILBOX_WEATHERED-4', 'MAILBOX_WEATHERED-3', 'MAILBOX_WEATHERED-2', 'MAILBOX_WEATHERED-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_WEATHERED-5', ]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['MAILBOX_WEATHERED-5', ]
              },
          ],
slots: '0',
items: []    },
      MAPLE_5X7: {
        name: 'Maple 5x7',
        slug: 'MAPLE_5X7', 
        type: 'TREE',
        bounding: {
          h:7, 
          w:5
        },
        base: {
          h:1, 
          w:1,
          x:2, 
          y:6
        },
        sprite: {
          h:112, 
          w:80,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:12
        },
        offset: {
          x:34, 
          y:96
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      MAPLE_7X7: {
        name: 'Maple 7x7',
        slug: 'MAPLE_7X7', 
        type: 'TREE',
        bounding: {
          h:7, 
          w:7
        },
        base: {
          h:1, 
          w:1,
          x:3, 
          y:6
        },
        sprite: {
          h:112, 
          w:112,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:48, 
          y:96
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      METAL_POLE: {
        name: 'Metal Utility Pole',
        slug: 'METAL_POLE', 
        type: 'UTILITY_POLE',
        bounding: {
          h:7, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:6
        },
        sprite: {
          h:112, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:12
        },
        offset: {
          x:2, 
          y:96
        },
        varieties: 16,
        portal: 0,
        actions: [],
        states: [],
    },
      OBJ_FLYER_MISSING: {
        name: 'Missing Person Flyer',
        slug: 'OBJ_FLYER_MISSING', 
        type: 'FLYER',
        bounding: {
          h:1, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 8,
        portal: 0,
        actions: [ {
            name: 'READ', stateTrigger: 'READING', validStates: ['DEFAULT',]
          }, {
            name: 'GUST', stateTrigger: 'GUSTING', validStates: ['DEFAULT',]
          },],
        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_MISSING-8', ]
              }, {
              name: 'READING',
              transition: 'DEFAULT',
              frames: []
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_MISSING-8', ]
              }, {
              name: 'GUSTING',
              transition: 'DEFAULT',
              frames: ['OBJ_FLYER_MISSING-1', 'OBJ_FLYER_MISSING-2', 'OBJ_FLYER_MISSING-3', 'OBJ_FLYER_MISSING-4', 'OBJ_FLYER_MISSING-5', 'OBJ_FLYER_MISSING-6', 'OBJ_FLYER_MISSING-7', 'OBJ_FLYER_MISSING-8', ]
              },
          ],
    },
      PAYPHONE: {
        name: 'Payphone',
        slug: 'PAYPHONE', 
        type: 'PAY_PHONE',
        bounding: {
          h:3, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:10
        },
        offset: {
          x:3, 
          y:32
        },
        varieties: 4,
        portal: 0,
        actions: [ {
            name: 'CALL', stateTrigger: 'CALLING', validStates: ['DEFAULT',]
          }, {
            name: 'ANSWER', stateTrigger: 'ANSWERING', validStates: ['RINGING',]
          },],
        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['PAYPHONE-1', ]
              }, {
              name: 'CALLING',
              transition: 'DEFAULT',
              frames: ['PAYPHONE-4', ]
              },
                      {
              name: 'RINGING',
              transition: 'DEFAULT',
              frames: ['PAYPHONE-1', 'PAYPHONE-2', ]
              }, {
              name: 'ANSWERING',
              transition: 'DEFAULT',
              frames: ['PAYPHONE-4', ]
              },
          ],
    },
      OBJ_FLYER_PINK: {
        name: 'Pink Flyer',
        slug: 'OBJ_FLYER_PINK', 
        type: 'FLYER',
        bounding: {
          h:1, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 8,
        portal: 0,
        actions: [ {
            name: 'READ', stateTrigger: 'READING', validStates: ['DEFAULT',]
          }, {
            name: 'GUST', stateTrigger: 'GUSTING', validStates: ['DEFAULT',]
          },],
        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_PINK-8', ]
              }, {
              name: 'READING',
              transition: 'DEFAULT',
              frames: []
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_PINK-8', ]
              }, {
              name: 'GUSTING',
              transition: 'DEFAULT',
              frames: ['OBJ_FLYER_PINK-1', 'OBJ_FLYER_PINK-2', 'OBJ_FLYER_PINK-3', 'OBJ_FLYER_PINK-4', 'OBJ_FLYER_PINK-5', 'OBJ_FLYER_PINK-6', 'OBJ_FLYER_PINK-7', 'OBJ_FLYER_PINK-8', ]
              },
          ],
    },
      PLACEHOLDER: {
        name: 'PLACEHOLDER',
        slug: 'PLACEHOLDER', 
        type: 'TREE',
        bounding: {
          h:7, 
          w:7
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        sprite: {
          h:112, 
          w:112,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:48, 
          y:80
        },
        varieties: 0,
        portal: 0,
        actions: [],
        states: [],
    },
      POSTBOX_S: {
        name: 'Postal Service Box',
        slug: 'POSTBOX_S', 
        type: 'POSTBOX',
        bounding: {
          h:2, 
          w:2
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:21,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:19
        },
        offset: {
          x:1, 
          y:16
        },
        varieties: 2,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED',]
          },],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['POSTBOX_S-1', ]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['POSTBOX_S-2', ]
              },
          ],
    },
      SCREEN_DOOR_: {
        name: 'Screen Door',
        slug: 'SCREEN_DOOR_', 
        type: 'EXT_DOOR_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED',]
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN',]
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT',]
          },],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: []
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: []
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: []
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: []
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: []
              }, {
              name: 'KNOCKING',
              transition: 'WAITING',
              frames: []
              },
          ],
    },
      SODIUM: {
        name: 'Sodium Light',
        slug: 'SODIUM', 
        type: 'STREETLAMP',
        bounding: {
          h:1, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 0,
        portal: 0,
        actions: [],
        states: [],
    },
      STOP_E: {
        name: 'Stop Sign East',
        slug: 'STOP_E', 
        type: 'TRAFFIC_SIGN',
        bounding: {
          h:4, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:3
        },
        sprite: {
          h:64, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:8
        },
        offset: {
          x:12, 
          y:52
        },
        varieties: 2,
        portal: 0,
        actions: [],
        states: [],
    },
      STOP_SIGN_E: {
        name: 'Stop Sign East Sign Only',
        slug: 'STOP_SIGN_E', 
        type: 'TRAFFIC_SIGN',
        bounding: {
          h:2, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 3,
        portal: 0,
        actions: [],
        states: [],
    },
      STOP_N: {
        name: 'Stop Sign North',
        slug: 'STOP_N', 
        type: 'TRAFFIC_SIGN',
        bounding: {
          h:4, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:3
        },
        sprite: {
          h:64, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:8
        },
        offset: {
          x:12, 
          y:52
        },
        varieties: 3,
        portal: 0,
        actions: [],
        states: [],
    },
      STOP_SIGN_N: {
        name: 'Stop Sign North Sign Only',
        slug: 'STOP_SIGN_N', 
        type: 'TRAFFIC_SIGN',
        bounding: {
          h:2, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 3,
        portal: 0,
        actions: [],
        states: [],
    },
      STOP_S: {
        name: 'Stop Sign South',
        slug: 'STOP_S', 
        type: 'TRAFFIC_SIGN',
        bounding: {
          h:4, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:3
        },
        sprite: {
          h:64, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:8
        },
        offset: {
          x:12, 
          y:52
        },
        varieties: 3,
        portal: 0,
        actions: [],
        states: [],
    },
      STOP_SIGN_S: {
        name: 'Stop Sign South Sign Only',
        slug: 'STOP_SIGN_S', 
        type: 'TRAFFIC_SIGN',
        bounding: {
          h:2, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 3,
        portal: 0,
        actions: [],
        states: [],
    },
      STOP_W: {
        name: 'Stop Sign West',
        slug: 'STOP_W', 
        type: 'TRAFFIC_SIGN',
        bounding: {
          h:4, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:3
        },
        sprite: {
          h:64, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:8
        },
        offset: {
          x:12, 
          y:52
        },
        varieties: 3,
        portal: 0,
        actions: [],
        states: [],
    },
      STOP_SIGN_W: {
        name: 'Stop Sign West Sign Only',
        slug: 'STOP_SIGN_W', 
        type: 'TRAFFIC_SIGN',
        bounding: {
          h:2, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 3,
        portal: 0,
        actions: [],
        states: [],
    },
      STREET_SIGN_EW_: {
        name: 'Street Sign East West',
        slug: 'STREET_SIGN_EW_', 
        type: 'STREET_SIGN',
        bounding: {
          h:1, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:0
        },
        sprite: {
          h:16, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 6,
        portal: 0,
        actions: [],
        states: [],
    },
      STREET_SIGN_NS_: {
        name: 'Street Sign North South',
        slug: 'STREET_SIGN_NS_', 
        type: 'STREET_SIGN',
        bounding: {
          h:2, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 3,
        portal: 0,
        actions: [],
        states: [],
    },
      TELEPHONE_POLE_TOP: {
        name: 'Telephone Pole Top',
        slug: 'TELEPHONE_POLE_TOP', 
        type: 'UTILITY_POLE_TOP',
        bounding: {
          h:2, 
          w:3
        },
        base: {
          h:1, 
          w:1,
          x:1, 
          y:1
        },
        sprite: {
          h:32, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:0, 
          w:0
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 2,
        portal: 0,
        actions: [],
        states: [],
    },
      DAILY_NEWS_BOX_: {
        name: 'Town Daily Box',
        slug: 'DAILY_NEWS_BOX_', 
        type: 'NEWSPAPER_BOX_',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:0, 
          y:16
        },
        varieties: 6,
        portal: 0,
        actions: [ {
            name: 'INSERT COIN', stateTrigger: 'COIN_DISPENSING', validStates: ['COIN_LOCKED',]
          },],
        states: [            {
              name: 'COIN_LOCKED',
              transition: 'false',
              frames: ['DAILY_NEWS_BOX_-1', ]
              }, {
              name: 'COIN_DISPENSING',
              transition: 'COIN_RETRACTING',
              frames: ['DAILY_NEWS_BOX_-2', 'DAILY_NEWS_BOX_-3', 'DAILY_NEWS_BOX_-4', 'DAILY_NEWS_BOX_-5', 'DAILY_NEWS_BOX_-6', ]
              },
          ],
    },
      TRAFFIC_LIGHT_ARM_SOUTH: {
        name: 'Traffic Light Arm',
        slug: 'TRAFFIC_LIGHT_ARM_SOUTH', 
        type: 'TRAFFIC_LIGHT_ARM',
        bounding: {
          h:2, 
          w:5
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:80,
          x:0, 
          y:0
        },
        size: {
          h:0, 
          w:0
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      TRAFFIC_LIGHT_EAST: {
        name: 'Traffic Light East',
        slug: 'TRAFFIC_LIGHT_EAST', 
        type: 'TRAFFIC_LIGHT_',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:0
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:0, 
          w:0
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 4,
        portal: 0,
        actions: [],
        states: [],
    },
      TRAFFIC_LIGHT_NORTH: {
        name: 'Traffic Light North',
        slug: 'TRAFFIC_LIGHT_NORTH', 
        type: 'TRAFFIC_LIGHT_',
        bounding: {
          h:3, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        sprite: {
          h:48, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:0, 
          w:0
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      TRAFFIC_LIGHT_SOUTH: {
        name: 'Traffic Light South',
        slug: 'TRAFFIC_LIGHT_SOUTH', 
        type: 'TRAFFIC_LIGHT_',
        bounding: {
          h:4, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        sprite: {
          h:64, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:0, 
          w:0
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 4,
        portal: 0,
        actions: [],
        states: [],
    },
      WALK_SIGNAL_SE_: {
        name: 'Walk Signal SE',
        slug: 'WALK_SIGNAL_SE_', 
        type: 'TRAFFIC_LIGHT_PED_',
        bounding: {
          h:2, 
          w:3
        },
        base: {
          h:1, 
          w:1,
          x:1, 
          y:1
        },
        sprite: {
          h:32, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:48
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 5,
        portal: 0,
        actions: [],
        states: [],
    },
      WALK_SIGNAL_W_: {
        name: 'Walk Signal W',
        slug: 'WALK_SIGNAL_W_', 
        type: 'TRAFFIC_LIGHT_PED_',
        bounding: {
          h:2, 
          w:3
        },
        base: {
          h:1, 
          w:1,
          x:1, 
          y:1
        },
        sprite: {
          h:32, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:48
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 3,
        portal: 0,
        actions: [],
        states: [],
    },
      WICKET_NS: {
        name: 'Wicket Horizontal',
        slug: 'WICKET_NS', 
        type: 'WICKET',
        bounding: {
          h:1, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:4, 
          w:16
        },
        offset: {
          x:0, 
          y:12
        },
        varieties: 3,
        portal: 0,
        actions: [],
        states: [],
    },
      WICKET_E: {
        name: 'Wicket Vertical East',
        slug: 'WICKET_E', 
        type: 'WICKET',
        bounding: {
          h:1, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:4
        },
        offset: {
          x:12, 
          y:0
        },
        varieties: 2,
        portal: 0,
        actions: [],
        states: [],
    },
      WICKET_W: {
        name: 'Wicket Vertical West',
        slug: 'WICKET_W', 
        type: 'WICKET',
        bounding: {
          h:1, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:4
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 2,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_2_BROWN: {
        name: 'Wood Fence 2 Brown',
        slug: 'WOOD_FENCE_2_BROWN', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:32
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_2_HONEY: {
        name: 'Wood Fence 2 Honey',
        slug: 'WOOD_FENCE_2_HONEY', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:32
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_2_WEATHERED: {
        name: 'Wood Fence 2 Weathered',
        slug: 'WOOD_FENCE_2_WEATHERED', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:32
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_3_BROWN: {
        name: 'Wood Fence 3 Brown',
        slug: 'WOOD_FENCE_3_BROWN', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:3
        },
        base: {
          h:1, 
          w:3,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:48
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_3_BROWN_OPEN: {
        name: 'Wood Fence 3 Brown Open',
        slug: 'WOOD_FENCE_3_BROWN_OPEN', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:3
        },
        base: {
          h:1, 
          w:3,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:48
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_3_HONEY: {
        name: 'Wood Fence 3 Honey',
        slug: 'WOOD_FENCE_3_HONEY', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:3
        },
        base: {
          h:1, 
          w:3,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:48
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_3_HONEY_OPEN: {
        name: 'Wood Fence 3 Honey Open',
        slug: 'WOOD_FENCE_3_HONEY_OPEN', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:3
        },
        base: {
          h:1, 
          w:3,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:48
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_3_WEATHERED: {
        name: 'Wood Fence 3 Weathered',
        slug: 'WOOD_FENCE_3_WEATHERED', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:3
        },
        base: {
          h:1, 
          w:3,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:48
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_3_WEATHERED_OPEN: {
        name: 'Wood Fence 3 Weathered Open',
        slug: 'WOOD_FENCE_3_WEATHERED_OPEN', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:3
        },
        base: {
          h:1, 
          w:3,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:48
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_4_BROWN: {
        name: 'Wood Fence 4 Brown',
        slug: 'WOOD_FENCE_4_BROWN', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:64
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_4_BROWN_OPEN: {
        name: 'Wood Fence 4 Brown Open',
        slug: 'WOOD_FENCE_4_BROWN_OPEN', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:64
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_4_HONEY: {
        name: 'Wood Fence 4 Honey',
        slug: 'WOOD_FENCE_4_HONEY', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:64
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_4_HONEY_OPEN: {
        name: 'Wood Fence 4 Honey Open',
        slug: 'WOOD_FENCE_4_HONEY_OPEN', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:64
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_4_WEATHERED: {
        name: 'Wood Fence 4 Weathered',
        slug: 'WOOD_FENCE_4_WEATHERED', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:64
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_4_WEATHERED_OPEN: {
        name: 'Wood Fence 4 Weathered Open',
        slug: 'WOOD_FENCE_4_WEATHERED_OPEN', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:64
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_5_BROWN: {
        name: 'Wood Fence 5 Brown',
        slug: 'WOOD_FENCE_5_BROWN', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:5
        },
        base: {
          h:1, 
          w:5,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:80,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:80
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_5_HONEY: {
        name: 'Wood Fence 5 Honey',
        slug: 'WOOD_FENCE_5_HONEY', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:5
        },
        base: {
          h:1, 
          w:5,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:80,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:80
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_FENCE_5_WEATHERED: {
        name: 'Wood Fence 5 Weathered',
        slug: 'WOOD_FENCE_5_WEATHERED', 
        type: 'FENCE',
        bounding: {
          h:3, 
          w:5
        },
        base: {
          h:1, 
          w:5,
          x:0, 
          y:2
        },
        sprite: {
          h:48, 
          w:80,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:80
        },
        offset: {
          x:0, 
          y:40
        },
        varieties: 1,
        portal: 0,
        actions: [],
        states: [],
    },
      WOOD_SIDE_TABLE: {
        name: 'Wood Side Table',
        slug: 'WOOD_SIDE_TABLE', 
        type: 'SIDE_TABLE',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        sprite: {
          h:32, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:0, 
          y:16
        },
        varieties: 4,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED',]
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN',]
          },],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: []
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: []
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: []
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: []
              },
          ],
slots: '0',
items: []    },
      WOOD_POLE: {
        name: 'Wood Utility Pole',
        slug: 'WOOD_POLE', 
        type: 'UTILITY_POLE',
        bounding: {
          h:7, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:6
        },
        sprite: {
          h:112, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:8
        },
        offset: {
          x:4, 
          y:96
        },
        varieties: 20,
        portal: 0,
        actions: [],
        states: [],
    },
      OBJ_FLYER_YELLOW: {
        name: 'Yellow Flyer',
        slug: 'OBJ_FLYER_YELLOW', 
        type: 'FLYER',
        bounding: {
          h:1, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 8,
        portal: 0,
        actions: [ {
            name: 'READ', stateTrigger: 'READING', validStates: ['DEFAULT',]
          }, {
            name: 'GUST', stateTrigger: 'GUSTING', validStates: ['DEFAULT',]
          },],
        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_YELLOW-8', ]
              }, {
              name: 'READING',
              transition: 'DEFAULT',
              frames: []
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_YELLOW-8', ]
              }, {
              name: 'GUSTING',
              transition: 'DEFAULT',
              frames: ['OBJ_FLYER_YELLOW-1', 'OBJ_FLYER_YELLOW-2', 'OBJ_FLYER_YELLOW-3', 'OBJ_FLYER_YELLOW-4', 'OBJ_FLYER_YELLOW-5', 'OBJ_FLYER_YELLOW-6', 'OBJ_FLYER_YELLOW-7', 'OBJ_FLYER_YELLOW-8', ]
              },
          ],
    },
  };
export default OBJECTS;
