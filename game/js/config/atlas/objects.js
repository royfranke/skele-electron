const OBJECTS = {
          ADDING_MACHINE: {
        name: 'Adding Machine',
        slug: 'ADDING_MACHINE', 
        type: 'ADDING_MACHINE',
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
        depth: 8,
        sprite: {
          h:16, 
          w:32,
          x:0, 
          y:-4
        },
        size: {
          h:0, 
          w:0
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 6,
        solid: 0,
        portal: 0,
        actions: [ {
            name: 'CHECK OUT', stateTrigger: 'PRINTING_RECEIPT', validStates: ['DEFAULT']
          }],
        states: [{
              name: 'DEFAULT',
              transition: 'false',
              frames: ['ADDING_MACHINE-1',]},{
              name: 'PRINTING_RECEIPT',
              transition: 'DEFAULT',
              frames: ['ADDING_MACHINE-1','ADDING_MACHINE-2','ADDING_MACHINE-3','ADDING_MACHINE-4','ADDING_MACHINE-5','ADDING_MACHINE-6',]},            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['ADDING_MACHINE-1',]
              }, {
              name: 'PRINTING_RECEIPT',
              transition: 'DEFAULT',
              frames: ['ADDING_MACHINE-1', 'ADDING_MACHINE-2', 'ADDING_MACHINE-3', 'ADDING_MACHINE-4', 'ADDING_MACHINE-5', 'ADDING_MACHINE-6', ]
              },
          ],

          interactions: {
                                  },
    },
          BASKET_RACK: {
        name: 'Basket Rack',
        slug: 'BASKET_RACK', 
        type: 'BASKET_RACK',
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
        depth: 0,
        sprite: {
          h:25, 
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
          y:18
        },
        varieties: 6,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],            slots: 5,
            items: [],

          interactions: {
                                  },
    },
          BEADED_CURTAIN_BODEGA: {
        name: 'Bodega Beaded Curtain',
        slug: 'BEADED_CURTAIN_BODEGA', 
        type: 'BEADED_CURTAIN',
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
        depth: 0,
        sprite: {
          h:64, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:6
        },
        offset: {
          x:26, 
          y:48
        },
        varieties: 9,
        solid: 1,
        portal: 0,
        actions: [],
        states: [{
              name: 'SWAYING',
              transition: 'false',
              frames: ['BEADED_CURTAIN_BODEGA-1','BEADED_CURTAIN_BODEGA-2','BEADED_CURTAIN_BODEGA-3','BEADED_CURTAIN_BODEGA-4','BEADED_CURTAIN_BODEGA-5','BEADED_CURTAIN_BODEGA-3','BEADED_CURTAIN_BODEGA-4','BEADED_CURTAIN_BODEGA-2',]},{
              name: 'BISECTED',
              transition: 'false',
              frames: ['BEADED_CURTAIN_BODEGA-6','BEADED_CURTAIN_BODEGA-7','BEADED_CURTAIN_BODEGA-8',]},{
              name: 'CLOSE_BISECT',
              transition: 'false',
              frames: ['BEADED_CURTAIN_BODEGA-7','BEADED_CURTAIN_BODEGA-8','BEADED_CURTAIN_BODEGA-9','BEADED_CURTAIN_BODEGA-7','BEADED_CURTAIN_BODEGA-6','BEADED_CURTAIN_BODEGA-5',]},{
              name: 'STILL',
              transition: 'false',
              frames: ['BEADED_CURTAIN_BODEGA-1',]},],

          interactions: {
                                  },
    },
          BODEGA_STORE_COUNTER: {
        name: 'Bodega Counter',
        slug: 'BODEGA_STORE_COUNTER', 
        type: 'STORE_COUNTER',
        bounding: {
          h:4, 
          w:5
        },
        base: {
          h:1, 
          w:5,
          x:0, 
          y:3
        },
        depth: 0,
        sprite: {
          h:64, 
          w:80,
          x:0, 
          y:0
        },
        size: {
          h:8, 
          w:74
        },
        offset: {
          x:0, 
          y:48
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          LIT_SIGN_BONEDEGA: {
        name: 'Bone-Dega Sign',
        slug: 'LIT_SIGN_BONEDEGA', 
        type: 'LIT_SIGN',
        bounding: {
          h:7, 
          w:3
        },
        base: {
          h:1, 
          w:1,
          x:2, 
          y:6
        },
        depth: 0,
        sprite: {
          h:56, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [{
              name: 'OFF',
              transition: 'false',
              frames: ['LIT_SIGN_BONEDEGA-1',]},{
              name: 'ON',
              transition: 'false',
              frames: ['LIT_SIGN_BONEDEGA-2',]},{
              name: 'FLICKERING',
              transition: 'false',
              frames: ['LIT_SIGN_BONEDEGA-1','LIT_SIGN_BONEDEGA-2','LIT_SIGN_BONEDEGA-2','LIT_SIGN_BONEDEGA-1','LIT_SIGN_BONEDEGA-2',]},],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          CARDBOARD_DOWN_ARROW: {
        name: 'Cardboard Down Arrow Sign',
        slug: 'CARDBOARD_DOWN_ARROW', 
        type: 'CARDBOARD',
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
        depth: 0,
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
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          CARDBOARD_FLOOR_MAT: {
        name: 'Cardboard Floor Mat',
        slug: 'CARDBOARD_FLOOR_MAT', 
        type: 'CARDBOARD',
        bounding: {
          h:2, 
          w:2
        },
        base: {
          h:2, 
          w:2,
          x:0, 
          y:0
        },
        depth: -32,
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
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          CINDERBLOCK: {
        name: 'Cinderblock',
        slug: 'CINDERBLOCK', 
        type: 'BLOCK',
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
        depth: 0,
        sprite: {
          h:16, 
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
        varieties: 5,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'INSERT COIN', stateTrigger: 'COIN_DISPENSING', validStates: ['COIN_LOCKED']
          }],
        states: [            {
              name: 'COIN_LOCKED',
              transition: 'false',
              frames: ['SPECIAL_NEWS_BOX_-1',]
              }, {
              name: 'COIN_DISPENSING',
              transition: 'COIN_RETRACTING',
              frames: ['SPECIAL_NEWS_BOX_-2', 'SPECIAL_NEWS_BOX_-3', 'SPECIAL_NEWS_BOX_-4', 'SPECIAL_NEWS_BOX_-5', 'SPECIAL_NEWS_BOX_-6', ]
              },
          ],

          interactions: {
                                  },
    },
          LAUNDRY_COMMERCIAL_DRYER: {
        name: 'Commercial Clothes Dryer',
        slug: 'LAUNDRY_COMMERCIAL_DRYER', 
        type: 'DRYER',
        bounding: {
          h:4, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:55, 
          w:38,
          x:0, 
          y:0
        },
        size: {
          h:55, 
          w:38
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 4,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['LAUNDRY_COMMERCIAL_DRYER-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['LAUNDRY_COMMERCIAL_DRYER-1', 'LAUNDRY_COMMERCIAL_DRYER-2', 'LAUNDRY_COMMERCIAL_DRYER-3', 'LAUNDRY_COMMERCIAL_DRYER-4', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['LAUNDRY_COMMERCIAL_DRYER-4',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['LAUNDRY_COMMERCIAL_DRYER-4', 'LAUNDRY_COMMERCIAL_DRYER-3', 'LAUNDRY_COMMERCIAL_DRYER-2', 'LAUNDRY_COMMERCIAL_DRYER-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['LAUNDRY_COMMERCIAL_DRYER-4',]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['LAUNDRY_COMMERCIAL_DRYER-3', ]
              },
          ],            slots: 0,
            items: [],

          interactions: {
                                  },
    },
          COMMERCIAL_FREEZER: {
        name: 'Commercial Freezer',
        slug: 'COMMERCIAL_FREEZER', 
        type: 'COMMERCIAL_FREEZER',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:1
        },
        depth: -10,
        sprite: {
          h:38, 
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
          y:20
        },
        varieties: 6,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        states: [{
              name: 'SHELL',
              transition: 'false',
              frames: ['COMMERCIAL_FREEZER-1',]},            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['COMMERCIAL_FREEZER-2',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['COMMERCIAL_FREEZER-2', 'COMMERCIAL_FREEZER-3', 'COMMERCIAL_FREEZER-4', 'COMMERCIAL_FREEZER-5', 'COMMERCIAL_FREEZER-6', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['COMMERCIAL_FREEZER-6',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['COMMERCIAL_FREEZER-6', 'COMMERCIAL_FREEZER-5', 'COMMERCIAL_FREEZER-4', 'COMMERCIAL_FREEZER-3', 'COMMERCIAL_FREEZER-2', ]
              },
          ],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          CORKBOARD: {
        name: 'Corkboard',
        slug: 'CORKBOARD', 
        type: 'CORKBOARD',
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
        depth: 0,
        sprite: {
          h:26, 
          w:15,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_CORNER_BEIGE: {
        name: 'Countertop Corner Beige',
        slug: 'COUNTERTOP_CORNER_BEIGE', 
        type: 'COUNTERTOP',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:2, 
          w:2,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:36, 
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
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_CORNER_BROWN: {
        name: 'Countertop Corner Brown',
        slug: 'COUNTERTOP_CORNER_BROWN', 
        type: 'COUNTERTOP',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:2, 
          w:2,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:36, 
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
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_CORNER_GREEN: {
        name: 'Countertop Corner Green',
        slug: 'COUNTERTOP_CORNER_GREEN', 
        type: 'COUNTERTOP',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:2, 
          w:2,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:36, 
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
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_CORNER_PEACH: {
        name: 'Countertop Corner Peach',
        slug: 'COUNTERTOP_CORNER_PEACH', 
        type: 'COUNTERTOP',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:2, 
          w:2,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:36, 
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
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_CORNER_PURPLE: {
        name: 'Countertop Corner Purple',
        slug: 'COUNTERTOP_CORNER_PURPLE', 
        type: 'COUNTERTOP',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:2, 
          w:2,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:36, 
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
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_S_BEIGE: {
        name: 'Countertop S Beige',
        slug: 'COUNTERTOP_S_BEIGE', 
        type: 'COUNTERTOP',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:32, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_S_BROWN: {
        name: 'Countertop S Brown',
        slug: 'COUNTERTOP_S_BROWN', 
        type: 'COUNTERTOP',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:32, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_S_GREEN: {
        name: 'Countertop S Green',
        slug: 'COUNTERTOP_S_GREEN', 
        type: 'COUNTERTOP',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:32, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_S_PEACH: {
        name: 'Countertop S Peach',
        slug: 'COUNTERTOP_S_PEACH', 
        type: 'COUNTERTOP',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:32, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_S_PURPLE: {
        name: 'Countertop S Purple',
        slug: 'COUNTERTOP_S_PURPLE', 
        type: 'COUNTERTOP',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:32, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_W_BEIGE: {
        name: 'Countertop W Beige',
        slug: 'COUNTERTOP_W_BEIGE', 
        type: 'COUNTERTOP',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:32, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_W_BROWN: {
        name: 'Countertop W Brown',
        slug: 'COUNTERTOP_W_BROWN', 
        type: 'COUNTERTOP',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:32, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_W_GREEN: {
        name: 'Countertop W Green',
        slug: 'COUNTERTOP_W_GREEN', 
        type: 'COUNTERTOP',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:32, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_W_PEACH: {
        name: 'Countertop W Peach',
        slug: 'COUNTERTOP_W_PEACH', 
        type: 'COUNTERTOP',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:32, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          COUNTERTOP_W_PURPLE: {
        name: 'Countertop W Purple',
        slug: 'COUNTERTOP_W_PURPLE', 
        type: 'COUNTERTOP',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:32, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          CREEK_SEDGE: {
        name: 'Creek Sedge',
        slug: 'CREEK_SEDGE', 
        type: 'SIMPLE_PLANT',
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
        depth: -4,
        sprite: {
          h:32, 
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
          y:16
        },
        varieties: 5,
        solid: 0,
        portal: 0,
        actions: [ {
            name: 'HARVEST', stateTrigger: 'HARVEST', validStates: ['HARVESTABLE']
          }],
        states: [{
              name: 'HARVESTED',
              transition: 'false',
              frames: ['CREEK_SEDGE-5',]},{
              name: 'HARVEST',
              transition: 'HARVESTED',
              frames: ['CREEK_SEDGE-4','CREEK_SEDGE-5',]},{
              name: 'HARVESTABLE',
              transition: 'false',
              frames: ['CREEK_SEDGE-1','CREEK_SEDGE-2','CREEK_SEDGE-3','CREEK_SEDGE-4',]},            {
              name: 'HARVESTABLE',
              transition: 'false',
              frames: ['CREEK_SEDGE-1','CREEK_SEDGE-2','CREEK_SEDGE-3','CREEK_SEDGE-4',]
              }, {
              name: 'HARVEST',
              transition: 'HARVESTED',
              frames: ['CREEK_SEDGE-4', 'CREEK_SEDGE-5', ]
              },
          ],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT']
          }],
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

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 0,
        actions: [ {
            name: 'LOOK UNDER', stateTrigger: 'LOOKING_UNDER', validStates: ['DEFAULT']
          }],
        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['DOORMAT_1-1',]
              }, {
              name: 'LOOKING_UNDER',
              transition: 'DEFAULT',
              frames: ['DOORMAT_1-1', 'DOORMAT_1-2', 'DOORMAT_1-3', 'DOORMAT_1-2', 'DOORMAT_1-1', ]
              },
          ],

          interactions: {
                                  },
    },
          DOWNSPOUT_4_E: {
        name: 'Downspout 4 E',
        slug: 'DOWNSPOUT_4_E', 
        type: 'GUTTER',
        bounding: {
          h:5, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:4
        },
        depth: 0,
        sprite: {
          h:73, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          DOWNSPOUT_4_W: {
        name: 'Downspout 4 W',
        slug: 'DOWNSPOUT_4_W', 
        type: 'GUTTER',
        bounding: {
          h:5, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:4
        },
        depth: 0,
        sprite: {
          h:73, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          DOWNSPOUT_5_E: {
        name: 'Downspout 5 E',
        slug: 'DOWNSPOUT_5_E', 
        type: 'GUTTER',
        bounding: {
          h:6, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:5
        },
        depth: 0,
        sprite: {
          h:89, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          DOWNSPOUT_5_W: {
        name: 'Downspout 5 W',
        slug: 'DOWNSPOUT_5_W', 
        type: 'GUTTER',
        bounding: {
          h:6, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:5
        },
        depth: 0,
        sprite: {
          h:89, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_GRAY-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_WINDOWS_GRAY-2', 'EXT_DOOR_WINDOWS_GRAY-3', 'EXT_DOOR_WINDOWS_GRAY-4', 'EXT_DOOR_WINDOWS_GRAY-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_GRAY-5',]
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

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_GREEN-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_WINDOWS_GREEN-2', 'EXT_DOOR_WINDOWS_GREEN-3', 'EXT_DOOR_WINDOWS_GREEN-4', 'EXT_DOOR_WINDOWS_GREEN-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_GREEN-5',]
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

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT']
          }],
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

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT']
          }],
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

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_WHITE-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_WINDOWS_WHITE-2', 'EXT_DOOR_WINDOWS_WHITE-3', 'EXT_DOOR_WINDOWS_WHITE-4', 'EXT_DOOR_WINDOWS_WHITE-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_WHITE-5',]
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

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_YELLOW-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_WINDOWS_YELLOW-2', 'EXT_DOOR_WINDOWS_YELLOW-3', 'EXT_DOOR_WINDOWS_YELLOW-4', 'EXT_DOOR_WINDOWS_YELLOW-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_YELLOW-5',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_WINDOWS_YELLOW-4', 'EXT_DOOR_WINDOWS_YELLOW-3', 'EXT_DOOR_WINDOWS_YELLOW-2', 'EXT_DOOR_WINDOWS_YELLOW-1', ]
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

          interactions: {
                                  },
    },
          EXT_DOOR_STORE_STOOP_1: {
        name: 'Ext Stoor Door Stoop 1',
        slug: 'EXT_DOOR_STORE_STOOP_1', 
        type: 'STORE_DOOR_',
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
        depth: 0,
        sprite: {
          h:64, 
          w:34,
          x:0, 
          y:0
        },
        size: {
          h:51, 
          w:26
        },
        offset: {
          x:8, 
          y:7
        },
        varieties: 5,
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_STOOP_1-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_STORE_STOOP_1-1', 'EXT_DOOR_STORE_STOOP_1-2', 'EXT_DOOR_STORE_STOOP_1-3', 'EXT_DOOR_STORE_STOOP_1-4', 'EXT_DOOR_STORE_STOOP_1-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_STOOP_1-5',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_STORE_STOOP_1-5', 'EXT_DOOR_STORE_STOOP_1-4', 'EXT_DOOR_STORE_STOOP_1-3', 'EXT_DOOR_STORE_STOOP_1-2', 'EXT_DOOR_STORE_STOOP_1-1', ]
              },
          ],

          interactions: {
                                  },
    },
          EXT_DOOR_STORE_BLACK: {
        name: 'Ext Store Door Black',
        slug: 'EXT_DOOR_STORE_BLACK', 
        type: 'STORE_DOOR_',
        bounding: {
          h:4, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:56, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:26
        },
        offset: {
          x:3, 
          y:0
        },
        varieties: 5,
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_BLACK-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_STORE_BLACK-2', 'EXT_DOOR_STORE_BLACK-3', 'EXT_DOOR_STORE_BLACK-4', 'EXT_DOOR_STORE_BLACK-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_BLACK-5',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_STORE_BLACK-4', 'EXT_DOOR_STORE_BLACK-3', 'EXT_DOOR_STORE_BLACK-2', 'EXT_DOOR_STORE_BLACK-1', ]
              },
          ],

          interactions: {
                                  },
    },
          EXT_DOOR_STORE_METAL: {
        name: 'Ext Store Door Metal',
        slug: 'EXT_DOOR_STORE_METAL', 
        type: 'STORE_DOOR_',
        bounding: {
          h:4, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:56, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:26
        },
        offset: {
          x:3, 
          y:0
        },
        varieties: 5,
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_METAL-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_STORE_METAL-2', 'EXT_DOOR_STORE_METAL-3', 'EXT_DOOR_STORE_METAL-4', 'EXT_DOOR_STORE_METAL-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_METAL-5',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_STORE_METAL-4', 'EXT_DOOR_STORE_METAL-3', 'EXT_DOOR_STORE_METAL-2', 'EXT_DOOR_STORE_METAL-1', ]
              },
          ],

          interactions: {
                                  },
    },
          EXT_DOOR_STORE_WHITE: {
        name: 'Ext Store Door White',
        slug: 'EXT_DOOR_STORE_WHITE', 
        type: 'STORE_DOOR_',
        bounding: {
          h:4, 
          w:2
        },
        base: {
          h:1, 
          w:2,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:56, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:48, 
          w:26
        },
        offset: {
          x:3, 
          y:0
        },
        varieties: 5,
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_WHITE-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_STORE_WHITE-2', 'EXT_DOOR_STORE_WHITE-3', 'EXT_DOOR_STORE_WHITE-4', 'EXT_DOOR_STORE_WHITE-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_WHITE-5',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_STORE_WHITE-4', 'EXT_DOOR_STORE_WHITE-3', 'EXT_DOOR_STORE_WHITE-2', 'EXT_DOOR_STORE_WHITE-1', ]
              },
          ],

          interactions: {
                                  },
    },
          EXT_WINDOW_2_BLUE_BRICK_T_: {
        name: 'Ext Window 2 Blue Brick Topped',
        slug: 'EXT_WINDOW_2_BLUE_BRICK_T_', 
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
        depth: 0,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:30, 
          w:26
        },
        offset: {
          x:3, 
          y:6
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_2_GRAY_BRICK_T_: {
        name: 'Ext Window 2 Gray Brick Topped',
        slug: 'EXT_WINDOW_2_GRAY_BRICK_T_', 
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
        depth: 0,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:30, 
          w:26
        },
        offset: {
          x:3, 
          y:6
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_2_GREEN_BRICK_T_: {
        name: 'Ext Window 2 Green Brick Topped',
        slug: 'EXT_WINDOW_2_GREEN_BRICK_T_', 
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
        depth: 0,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:30, 
          w:26
        },
        offset: {
          x:3, 
          y:6
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_2_YELLOW_BRICK_T_: {
        name: 'Ext Window 2 Yellow Brick Topped',
        slug: 'EXT_WINDOW_2_YELLOW_BRICK_T_', 
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
        depth: 0,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:30, 
          w:26
        },
        offset: {
          x:3, 
          y:6
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          FURNACE: {
        name: 'Furnace',
        slug: 'FURNACE', 
        type: 'HVAC',
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
        depth: 0,
        sprite: {
          h:64, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:15, 
          w:16
        },
        offset: {
          x:4, 
          y:46
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          BUSH: {
        name: 'Generic Bush',
        slug: 'BUSH', 
        type: 'BUSH',
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
        depth: 0,
        sprite: {
          h:32, 
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
          y:22
        },
        varieties: 3,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 0,
        actions: [ {
            name: 'READ', stateTrigger: 'READING', validStates: ['DEFAULT']
          }, {
            name: 'GUST', stateTrigger: 'GUSTING', validStates: ['DEFAULT']
          }],
        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_GRAY-1',]
              }, {
              name: 'READING',
              transition: 'DEFAULT',
              frames: []
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_GRAY-1',]
              }, {
              name: 'GUSTING',
              transition: 'DEFAULT',
              frames: ['OBJ_FLYER_GRAY-1', 'OBJ_FLYER_GRAY-2', 'OBJ_FLYER_GRAY-3', 'OBJ_FLYER_GRAY-4', 'OBJ_FLYER_GRAY-5', 'OBJ_FLYER_GRAY-6', 'OBJ_FLYER_GRAY-7', 'OBJ_FLYER_GRAY-8', ]
              },
          ],

          interactions: {
                                  },
    },
          GUTTER_DOWNSPOUT_4_E: {
        name: 'Gutter and Downspout 4 E',
        slug: 'GUTTER_DOWNSPOUT_4_E', 
        type: 'GUTTER',
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
        depth: 0,
        sprite: {
          h:105, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          GUTTER_DOWNSPOUT_4_W: {
        name: 'Gutter and Downspout 4 W',
        slug: 'GUTTER_DOWNSPOUT_4_W', 
        type: 'GUTTER',
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
        depth: 0,
        sprite: {
          h:105, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          GUTTER_DOWNSPOUT_5_E: {
        name: 'Gutter and Downspout 5 E',
        slug: 'GUTTER_DOWNSPOUT_5_E', 
        type: 'GUTTER',
        bounding: {
          h:8, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:7
        },
        depth: 0,
        sprite: {
          h:121, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          GUTTER_DOWNSPOUT_5_W: {
        name: 'Gutter and Downspout 5 W',
        slug: 'GUTTER_DOWNSPOUT_5_W', 
        type: 'GUTTER',
        bounding: {
          h:8, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:7
        },
        depth: 0,
        sprite: {
          h:121, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          GUTTER_SECTION: {
        name: 'Gutter Section',
        slug: 'GUTTER_SECTION', 
        type: 'GUTTER',
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
        depth: 0,
        sprite: {
          h:52, 
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
        varieties: 0,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          GUTTER_SECTION_E: {
        name: 'Gutter Section E',
        slug: 'GUTTER_SECTION_E', 
        type: 'GUTTER',
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
        depth: 0,
        sprite: {
          h:52, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          GUTTER_SECTION_E_N_CAP: {
        name: 'Gutter Section E N Cap',
        slug: 'GUTTER_SECTION_E_N_CAP', 
        type: 'GUTTER',
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
        depth: 0,
        sprite: {
          h:52, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          GUTTER_SECTION_E_S_CAP: {
        name: 'Gutter Section E S Cap',
        slug: 'GUTTER_SECTION_E_S_CAP', 
        type: 'GUTTER',
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
        depth: 0,
        sprite: {
          h:52, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          GUTTER_SECTION_W: {
        name: 'Gutter Section W',
        slug: 'GUTTER_SECTION_W', 
        type: 'GUTTER',
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
        depth: 0,
        sprite: {
          h:52, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          GUTTER_SECTION_W_N_CAP: {
        name: 'Gutter Section W N Cap',
        slug: 'GUTTER_SECTION_W_N_CAP', 
        type: 'GUTTER',
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
        depth: 0,
        sprite: {
          h:52, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          GUTTER_SECTION_W_S_CAP: {
        name: 'Gutter Section W S Cap',
        slug: 'GUTTER_SECTION_W_S_CAP', 
        type: 'GUTTER',
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
        depth: 0,
        sprite: {
          h:52, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          HOT_WATER_HEATER: {
        name: 'Hot Water Heater',
        slug: 'HOT_WATER_HEATER', 
        type: 'HVAC',
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
        depth: 0,
        sprite: {
          h:64, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:15, 
          w:16
        },
        offset: {
          x:8, 
          y:44
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          INT_DOOR_GREEN: {
        name: 'Int Door Green',
        slug: 'INT_DOOR_GREEN', 
        type: 'INT_DOOR_',
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
        depth: 0,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:36, 
          w:20
        },
        offset: {
          x:6, 
          y:12
        },
        varieties: 5,
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['INT_DOOR_GREEN-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['INT_DOOR_GREEN-2', 'INT_DOOR_GREEN-3', 'INT_DOOR_GREEN-4', 'INT_DOOR_GREEN-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['INT_DOOR_GREEN-5',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['INT_DOOR_GREEN-4', 'INT_DOOR_GREEN-3', 'INT_DOOR_GREEN-2', 'INT_DOOR_GREEN-1', ]
              },
          ],

          interactions: {
                                  },
    },
          INT_DOOR_GREEN_SIGN: {
        name: 'Int Door Green with Sign',
        slug: 'INT_DOOR_GREEN_SIGN', 
        type: 'INT_DOOR_',
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
        depth: 0,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:36, 
          w:20
        },
        offset: {
          x:6, 
          y:12
        },
        varieties: 5,
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['INT_DOOR_GREEN_SIGN-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['INT_DOOR_GREEN_SIGN-2', 'INT_DOOR_GREEN_SIGN-3', 'INT_DOOR_GREEN_SIGN-4', 'INT_DOOR_GREEN_SIGN-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['INT_DOOR_GREEN_SIGN-5',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['INT_DOOR_GREEN_SIGN-4', 'INT_DOOR_GREEN_SIGN-3', 'INT_DOOR_GREEN_SIGN-2', 'INT_DOOR_GREEN_SIGN-1', ]
              },
          ],

          interactions: {
                                  },
    },
          INT_DOOR_RED_BROWN: {
        name: 'Int Door Red Brown',
        slug: 'INT_DOOR_RED_BROWN', 
        type: 'INT_DOOR_',
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
        depth: 0,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:36, 
          w:20
        },
        offset: {
          x:6, 
          y:12
        },
        varieties: 5,
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['INT_DOOR_RED_BROWN-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['INT_DOOR_RED_BROWN-2', 'INT_DOOR_RED_BROWN-3', 'INT_DOOR_RED_BROWN-4', 'INT_DOOR_RED_BROWN-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['INT_DOOR_RED_BROWN-5',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['INT_DOOR_RED_BROWN-4', 'INT_DOOR_RED_BROWN-3', 'INT_DOOR_RED_BROWN-2', 'INT_DOOR_RED_BROWN-1', ]
              },
          ],

          interactions: {
                                  },
    },
          INT_DOOR_RED_BROWN_SIGN: {
        name: 'Int Door Red Brown with Sign',
        slug: 'INT_DOOR_RED_BROWN_SIGN', 
        type: 'INT_DOOR_',
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
        depth: 0,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:36, 
          w:20
        },
        offset: {
          x:6, 
          y:12
        },
        varieties: 5,
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['INT_DOOR_RED_BROWN_SIGN-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['INT_DOOR_RED_BROWN_SIGN-2', 'INT_DOOR_RED_BROWN_SIGN-3', 'INT_DOOR_RED_BROWN_SIGN-4', 'INT_DOOR_RED_BROWN_SIGN-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['INT_DOOR_RED_BROWN_SIGN-5',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['INT_DOOR_RED_BROWN_SIGN-4', 'INT_DOOR_RED_BROWN_SIGN-3', 'INT_DOOR_RED_BROWN_SIGN-2', 'INT_DOOR_RED_BROWN_SIGN-1', ]
              },
          ],

          interactions: {
                                  },
    },
          INT_DOOR_WHITE: {
        name: 'Int Door White',
        slug: 'INT_DOOR_WHITE', 
        type: 'INT_DOOR_',
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
        depth: 0,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:36, 
          w:20
        },
        offset: {
          x:6, 
          y:12
        },
        varieties: 5,
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['INT_DOOR_WHITE-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['INT_DOOR_WHITE-2', 'INT_DOOR_WHITE-3', 'INT_DOOR_WHITE-4', 'INT_DOOR_WHITE-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['INT_DOOR_WHITE-5',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['INT_DOOR_WHITE-4', 'INT_DOOR_WHITE-3', 'INT_DOOR_WHITE-2', 'INT_DOOR_WHITE-1', ]
              },
          ],

          interactions: {
                                  },
    },
          TABLE_WOOD_FOLDING_JAMMED: {
        name: 'Jammed Folding Wood Table',
        slug: 'TABLE_WOOD_FOLDING_JAMMED', 
        type: 'TABLE',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:2, 
          w:2,
          x:0, 
          y:1
        },
        depth: -2,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:20, 
          w:18
        },
        offset: {
          x:7, 
          y:20
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          TABLE_WOOD_DECOR: {
        name: 'Lightly Decorative Wood Table',
        slug: 'TABLE_WOOD_DECOR', 
        type: 'TABLE',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:2, 
          w:2,
          x:0, 
          y:1
        },
        depth: -2,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:20, 
          w:18
        },
        offset: {
          x:7, 
          y:20
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          NEON_KEY: {
        name: 'Locksmith Neon Key',
        slug: 'NEON_KEY', 
        type: 'LIT_SIGN',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:21, 
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
        varieties: 6,
        solid: 0,
        portal: 0,
        actions: [],
        states: [{
              name: 'OFF',
              transition: 'false',
              frames: ['NEON_KEY-1',]},{
              name: 'ON',
              transition: 'false',
              frames: ['NEON_KEY-2','NEON_KEY-3','NEON_KEY-4','NEON_KEY-5','NEON_KEY-6','NEON_KEY-2','NEON_KEY-6','NEON_KEY-2','NEON_KEY-6',]},{
              name: 'FLICKERING',
              transition: 'false',
              frames: ['NEON_KEY-2','NEON_KEY-3','NEON_KEY-4','NEON_KEY-5','NEON_KEY-1','NEON_KEY-1','NEON_KEY-6','NEON_KEY-2','NEON_KEY-6',]},],

          interactions: {
                                  },
    },
          LOCKSMITH_STOREFRONT_SIGN: {
        name: 'Locksmith Storefront Sign',
        slug: 'LOCKSMITH_STOREFRONT_SIGN', 
        type: 'STOREFRONT_FRAME_SIGN',
        bounding: {
          h:2, 
          w:6
        },
        base: {
          h:1, 
          w:6,
          x:0, 
          y:1
        },
        depth: 0,
        sprite: {
          h:20, 
          w:86,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['MAILBOX_SHINY-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['MAILBOX_SHINY-1', 'MAILBOX_SHINY-2', 'MAILBOX_SHINY-3', 'MAILBOX_SHINY-4', 'MAILBOX_SHINY-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_SHINY-5',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['MAILBOX_SHINY-5', 'MAILBOX_SHINY-4', 'MAILBOX_SHINY-3', 'MAILBOX_SHINY-2', 'MAILBOX_SHINY-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_SHINY-5',]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['MAILBOX_SHINY-5', ]
              },
          ],            slots: 4,
            items: [],

          interactions: {
                                  },
    },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['MAILBOX_SLEEK-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['MAILBOX_SLEEK-1', 'MAILBOX_SLEEK-2', 'MAILBOX_SLEEK-3', 'MAILBOX_SLEEK-4', 'MAILBOX_SLEEK-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_SLEEK-5',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['MAILBOX_SLEEK-5', 'MAILBOX_SLEEK-4', 'MAILBOX_SLEEK-3', 'MAILBOX_SLEEK-2', 'MAILBOX_SLEEK-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_SLEEK-5',]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['MAILBOX_SLEEK-5', ]
              },
          ],            slots: 4,
            items: [],

          interactions: {
                                  },
    },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['MAILBOX_WEATHERED-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['MAILBOX_WEATHERED-1', 'MAILBOX_WEATHERED-2', 'MAILBOX_WEATHERED-3', 'MAILBOX_WEATHERED-4', 'MAILBOX_WEATHERED-5', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_WEATHERED-5',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['MAILBOX_WEATHERED-5', 'MAILBOX_WEATHERED-4', 'MAILBOX_WEATHERED-3', 'MAILBOX_WEATHERED-2', 'MAILBOX_WEATHERED-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_WEATHERED-5',]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['MAILBOX_WEATHERED-5', ]
              },
          ],            slots: 4,
            items: [],

          interactions: {
                                  },
    },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          DINER_CHAIR_MAROON: {
        name: 'Maroon Diner Chair',
        slug: 'DINER_CHAIR_MAROON', 
        type: 'CHAIR',
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
        depth: 0,
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:12
        },
        offset: {
          x:10, 
          y:16
        },
        varieties: 4,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'TURN EAST', stateTrigger: 'FACING_EAST', validStates: ['FACING_NORTH','FACING_SOUTH','FACING_WEST']
          }, {
            name: 'TURN WEST', stateTrigger: 'FACING_WEST', validStates: ['FACING_EAST','FACING_NORTH','FACING_SOUTH']
          }, {
            name: 'TURN NORTH', stateTrigger: 'FACING_NORTH', validStates: ['FACING_EAST','FACING_SOUTH','FACING_WEST']
          }, {
            name: 'TURN SOUTH', stateTrigger: 'FACING_SOUTH', validStates: ['FACING_EAST','FACING_NORTH','FACING_WEST']
          }],
        states: [            {
              name: 'FACING_NORTH',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-4',]
              }, {
              name: 'FACING_SOUTH',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-2',]
              }, {
              name: 'FACING_WEST',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-3',]
              }, {
              name: 'FACING_EAST',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-1', ]
              },
                      {
              name: 'FACING_EAST',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-1',]
              }, {
              name: 'FACING_NORTH',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-4',]
              }, {
              name: 'FACING_SOUTH',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-2',]
              }, {
              name: 'FACING_WEST',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-3', ]
              },
                      {
              name: 'FACING_EAST',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-1',]
              }, {
              name: 'FACING_SOUTH',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-2',]
              }, {
              name: 'FACING_WEST',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-3',]
              }, {
              name: 'FACING_NORTH',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-4', ]
              },
                      {
              name: 'FACING_EAST',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-1',]
              }, {
              name: 'FACING_NORTH',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-4',]
              }, {
              name: 'FACING_WEST',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-3',]
              }, {
              name: 'FACING_SOUTH',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-2', ]
              },
          ],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          MILK_CRATE: {
        name: 'Milk Crate',
        slug: 'MILK_CRATE', 
        type: 'CRATE',
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
        depth: 0,
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:6, 
          w:12
        },
        offset: {
          x:2, 
          y:7
        },
        varieties: 2,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'FLIP ONTO BOTTOM', stateTrigger: 'FLIPPING_ONTO_BOTTOM', validStates: ['FLIPPED_ONTO_TOP']
          }, {
            name: 'FLIP ONTO TOP', stateTrigger: 'FLIPPING_ONTO_TOP', validStates: ['FLIPPED_ONTO_BOTTOM']
          }],
        states: [            {
              name: 'FLIPPED_ONTO_TOP',
              transition: 'false',
              frames: ['MILK_CRATE-2',]
              }, {
              name: 'FLIPPING_ONTO_BOTTOM',
              transition: 'FLIPPED_ONTO_BOTTOM',
              frames: ['MILK_CRATE-2', 'MILK_CRATE-1', ]
              },
                      {
              name: 'FLIPPED_ONTO_BOTTOM',
              transition: 'false',
              frames: ['MILK_CRATE-1',]
              }, {
              name: 'FLIPPING_ONTO_TOP',
              transition: 'FLIPPED_ONTO_TOP',
              frames: ['MILK_CRATE-1', 'MILK_CRATE-2', ]
              },
          ],            slots: 3,
            items: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 0,
        actions: [ {
            name: 'READ', stateTrigger: 'READING', validStates: ['DEFAULT']
          }, {
            name: 'GUST', stateTrigger: 'GUSTING', validStates: ['DEFAULT']
          }],
        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_MISSING-8',]
              }, {
              name: 'READING',
              transition: 'DEFAULT',
              frames: ['OBJ_FLYER_MISSING-1', ]
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_MISSING-8',]
              }, {
              name: 'GUSTING',
              transition: 'DEFAULT',
              frames: ['OBJ_FLYER_MISSING-1', 'OBJ_FLYER_MISSING-2', 'OBJ_FLYER_MISSING-3', 'OBJ_FLYER_MISSING-4', 'OBJ_FLYER_MISSING-5', 'OBJ_FLYER_MISSING-6', 'OBJ_FLYER_MISSING-7', 'OBJ_FLYER_MISSING-8', ]
              },
          ],

          interactions: {
                                  },
    },
          NEON_LOTTO_SIGN: {
        name: 'Neon Lotto Sign',
        slug: 'NEON_LOTTO_SIGN', 
        type: 'LIT_SIGN',
        bounding: {
          h:1, 
          w:2
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:8, 
          w:21,
          x:0, 
          y:4
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [{
              name: 'OFF',
              transition: 'false',
              frames: ['NEON_LOTTO_SIGN-2',]},{
              name: 'ON',
              transition: 'false',
              frames: ['NEON_LOTTO_SIGN-1',]},{
              name: 'FLICKERING',
              transition: 'false',
              frames: ['NEON_LOTTO_SIGN-1','NEON_LOTTO_SIGN-1','NEON_LOTTO_SIGN-2','NEON_LOTTO_SIGN-1','NEON_LOTTO_SIGN-1','NEON_LOTTO_SIGN-1','NEON_LOTTO_SIGN-2',]},],

          interactions: {
                                  },
    },
          NIGHT_LIGHT: {
        name: 'Night Light',
        slug: 'NIGHT_LIGHT', 
        type: 'NIGHT_LIGHT',
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
        depth: 0,
        sprite: {
          h:10, 
          w:11,
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
        solid: 0,
        portal: 0,
        actions: [ {
            name: 'TURN ON', stateTrigger: 'TURNING_ON', validStates: ['OFF']
          }, {
            name: 'TURN OFF', stateTrigger: 'TURNING_OFF', validStates: ['ON']
          }],
        states: [{
              name: 'OFF',
              transition: 'false',
              frames: ['NIGHT_LIGHT-1',]},{
              name: 'TURNING_OFF',
              transition: 'OFF',
              frames: ['NIGHT_LIGHT-2','NIGHT_LIGHT-1',]},{
              name: 'ON',
              transition: 'false',
              frames: ['NIGHT_LIGHT-2',]},{
              name: 'TURNING_ON',
              transition: 'ON',
              frames: ['NIGHT_LIGHT-1','NIGHT_LIGHT-2',]},            {
              name: 'OFF',
              transition: 'false',
              frames: ['NIGHT_LIGHT-1',]
              }, {
              name: 'TURNING_ON',
              transition: 'ON',
              frames: ['NIGHT_LIGHT-1', 'NIGHT_LIGHT-2', ]
              },
                      {
              name: 'ON',
              transition: 'false',
              frames: ['NIGHT_LIGHT-2',]
              }, {
              name: 'TURNING_OFF',
              transition: 'OFF',
              frames: ['NIGHT_LIGHT-2', 'NIGHT_LIGHT-1', ]
              },
          ],

          interactions: {
                                                group_11: {
                req_group_name: 'Night light',
                req_pocket_action: '',
                req_world_action: 'TURN ON',
                req_state: '',
                req_result_item: '',
                req_result_data_key: '',
                req_result_data_set: '',
                req_result_data_modify: '',
                req_result_texture: '',
                req_result_fx: '',
                req_result_ground: '',
                requires: [
                  {
                    slot_type: 'ON_ACTIVE',
                    type: 'OBJ_TYPE',
                    result: 'UNTOUCHED',
                    OBJ_TYPE: 'OUTLET',
                    },
                  {
                    slot_type: 'ON_ACTIVE',
                    type: 'OBJ_TYPE',
                    result: 'UNTOUCHED',
                    OBJ_TYPE: 'NIGHT_LIGHT'
                    }
                                ]

            }                      },
    },
          OUTLET_DOUBLE: {
        name: 'Outlet Double',
        slug: 'OUTLET_DOUBLE', 
        type: 'OUTLET',
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
        depth: -6,
        sprite: {
          h:16, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                                group_11: {
                req_group_name: 'Night light',
                req_pocket_action: '',
                req_world_action: 'TURN ON',
                req_state: '',
                req_result_item: '',
                req_result_data_key: '',
                req_result_data_set: '',
                req_result_data_modify: '',
                req_result_texture: '',
                req_result_fx: '',
                req_result_ground: '',
                requires: [
                  {
                    slot_type: 'ON_ACTIVE',
                    type: 'OBJ_TYPE',
                    result: 'UNTOUCHED',
                    OBJ_TYPE: 'OUTLET',
                    },
                  {
                    slot_type: 'ON_ACTIVE',
                    type: 'OBJ_TYPE',
                    result: 'UNTOUCHED',
                    OBJ_TYPE: 'NIGHT_LIGHT'
                    }
                                ]

            }                      },
    },
          OUTLET_SINGLE: {
        name: 'Outlet Single',
        slug: 'OUTLET_SINGLE', 
        type: 'OUTLET',
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
        depth: -6,
        sprite: {
          h:16, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                                group_11: {
                req_group_name: 'Night light',
                req_pocket_action: '',
                req_world_action: 'TURN ON',
                req_state: '',
                req_result_item: '',
                req_result_data_key: '',
                req_result_data_set: '',
                req_result_data_modify: '',
                req_result_texture: '',
                req_result_fx: '',
                req_result_ground: '',
                requires: [
                  {
                    slot_type: 'ON_ACTIVE',
                    type: 'OBJ_TYPE',
                    result: 'UNTOUCHED',
                    OBJ_TYPE: 'OUTLET',
                    },
                  {
                    slot_type: 'ON_ACTIVE',
                    type: 'OBJ_TYPE',
                    result: 'UNTOUCHED',
                    OBJ_TYPE: 'NIGHT_LIGHT'
                    }
                                ]

            }                      },
    },
          OVEN_1: {
        name: 'Oven 1',
        slug: 'OVEN_1', 
        type: 'OVEN',
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
        depth: 0,
        sprite: {
          h:32, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:14, 
          w:16
        },
        offset: {
          x:0, 
          y:12
        },
        varieties: 5,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'TURN ON', stateTrigger: 'TURNING_ON', validStates: ['OFF']
          }, {
            name: 'TURN OFF', stateTrigger: 'TURNING_OFF', validStates: ['ON']
          }, {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        states: [            {
              name: 'OFF',
              transition: 'false',
              frames: ['OVEN_1-1',]
              }, {
              name: 'TURNING_ON',
              transition: 'ON',
              frames: []
              },
                      {
              name: 'ON',
              transition: 'false',
              frames: ['OVEN_1-5',]
              }, {
              name: 'TURNING_OFF',
              transition: 'OFF',
              frames: []
              },
                      {
              name: 'CLOSED',
              transition: 'false',
              frames: ['OVEN_1-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['OVEN_1-2', 'OVEN_1-3', 'OVEN_1-4', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['OVEN_1-4',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['OVEN_1-3', 'OVEN_1-2', 'OVEN_1-1', ]
              },
          ],

          interactions: {
                                  },
    },
          BOLLARD_PARKING: {
        name: 'Parking Bollard',
        slug: 'BOLLARD_PARKING', 
        type: 'BOLLARD',
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
        depth: -4,
        sprite: {
          h:32, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:6, 
          w:4
        },
        offset: {
          x:6, 
          y:22
        },
        varieties: 2,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'CALL', stateTrigger: 'CALLING', validStates: ['DEFAULT']
          }, {
            name: 'ANSWER', stateTrigger: 'ANSWERING', validStates: ['RINGING']
          }, {
            name: 'HANG UP', stateTrigger: 'HANGING_UP', validStates: ['ON_PHONE']
          }],
        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['PAYPHONE-1',]
              }, {
              name: 'CALLING',
              transition: 'ON_PHONE',
              frames: ['PAYPHONE-4', ]
              },
                      {
              name: 'RINGING',
              transition: 'DEFAULT',
              frames: ['PAYPHONE-1','PAYPHONE-2',]
              }, {
              name: 'ANSWERING',
              transition: 'DEFAULT',
              frames: ['PAYPHONE-4', ]
              },
                      {
              name: 'ON_PHONE',
              transition: 'false',
              frames: ['PAYPHONE-4',]
              }, {
              name: 'HANGING_UP',
              transition: 'DEFAULT',
              frames: ['PAYPHONE-4', 'PAYPHONE-2', 'PAYPHONE-1', ]
              },
          ],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 0,
        actions: [ {
            name: 'READ', stateTrigger: 'READING', validStates: ['DEFAULT']
          }, {
            name: 'GUST', stateTrigger: 'GUSTING', validStates: ['DEFAULT']
          }],
        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_PINK-8',]
              }, {
              name: 'READING',
              transition: 'DEFAULT',
              frames: []
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_PINK-8',]
              }, {
              name: 'GUSTING',
              transition: 'DEFAULT',
              frames: ['OBJ_FLYER_PINK-1', 'OBJ_FLYER_PINK-2', 'OBJ_FLYER_PINK-3', 'OBJ_FLYER_PINK-4', 'OBJ_FLYER_PINK-5', 'OBJ_FLYER_PINK-6', 'OBJ_FLYER_PINK-7', 'OBJ_FLYER_PINK-8', ]
              },
          ],

          interactions: {
                                  },
    },
          SOFA_PLAID_1: {
        name: 'Plaid Sofa',
        slug: 'SOFA_PLAID_1', 
        type: 'SOFA',
        bounding: {
          h:3, 
          w:4
        },
        base: {
          h:2, 
          w:4,
          x:0, 
          y:1
        },
        depth: 0,
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:20, 
          w:60
        },
        offset: {
          x:0, 
          y:22
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'SLEEP', stateTrigger: 'SLEEPING', validStates: ['CURLED_UP']
          }, {
            name: 'CURL UP ON', stateTrigger: 'CURLED_UP', validStates: ['DEFAULT']
          }],
        states: [            {
              name: 'CURLED_UP',
              transition: 'false',
              frames: []
              }, {
              name: 'SLEEPING',
              transition: 'false',
              frames: []
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: []
              }, {
              name: 'CURLED_UP',
              transition: 'false',
              frames: []
              },
          ],

          interactions: {
                                  },
    },
          PORCH_ROOF_4x2_BROWN: {
        name: 'Porch Roof 4x2 Brown',
        slug: 'PORCH_ROOF_4x2_BROWN', 
        type: 'PORCH_ROOF',
        bounding: {
          h:4, 
          w:6
        },
        base: {
          h:2, 
          w:4,
          x:1, 
          y:4
        },
        depth: 0,
        sprite: {
          h:55, 
          w:81,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          PORCH_ROOF_4x2_GREEN: {
        name: 'Porch Roof 4x2 Green',
        slug: 'PORCH_ROOF_4x2_GREEN', 
        type: 'PORCH_ROOF',
        bounding: {
          h:4, 
          w:6
        },
        base: {
          h:2, 
          w:4,
          x:1, 
          y:4
        },
        depth: 0,
        sprite: {
          h:55, 
          w:81,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          PORCH_ROOF_4x2_PURPLE: {
        name: 'Porch Roof 4x2 Purple',
        slug: 'PORCH_ROOF_4x2_PURPLE', 
        type: 'PORCH_ROOF',
        bounding: {
          h:4, 
          w:6
        },
        base: {
          h:2, 
          w:4,
          x:1, 
          y:4
        },
        depth: 0,
        sprite: {
          h:55, 
          w:81,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          PORCH_ROOF_4x2_TAN: {
        name: 'Porch Roof 4x2 Tan',
        slug: 'PORCH_ROOF_4x2_TAN', 
        type: 'PORCH_ROOF',
        bounding: {
          h:4, 
          w:6
        },
        base: {
          h:2, 
          w:4,
          x:1, 
          y:4
        },
        depth: 0,
        sprite: {
          h:55, 
          w:81,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          PORCH_STAIR_RAIL_LEFT: {
        name: 'Porch Stair Rail Left',
        slug: 'PORCH_STAIR_RAIL_LEFT', 
        type: 'STAIR_RAIL',
        bounding: {
          h:5, 
          w:4
        },
        base: {
          h:1, 
          w:1,
          x:2, 
          y:3
        },
        depth: 0,
        sprite: {
          h:68, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:4
        },
        offset: {
          x:15, 
          y:12
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          POSTBOX_E: {
        name: 'Postbox East',
        slug: 'POSTBOX_E', 
        type: 'POSTBOX',
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
        depth: 0,
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:14
        },
        offset: {
          x:9, 
          y:16
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                                group_2: {
                req_group_name: 'Mail Letter',
                req_pocket_action: 'MAIL',
                req_world_action: 'MAIL',
                req_state: '',
                req_result_item: '',
                req_result_data_key: 'LETTERS',
                req_result_data_set: '',
                req_result_data_modify: '1',
                req_result_texture: '',
                req_result_fx: '',
                req_result_ground: '',
                requires: [
                  {
                    slot_type: 'IN_HAND',
                    type: 'ITEM_KIND',
                    result: 'MAILED',
                    ITEM_KIND: 'MAIL',
                    },
                  {
                    slot_type: 'ON_ACTIVE',
                    type: 'OBJ_TYPE',
                    result: 'UNTOUCHED',
                    OBJ_TYPE: 'POSTBOX'
                    }
                                ]

            }                      },
    },
          POSTBOX_S: {
        name: 'Postbox South',
        slug: 'POSTBOX_S', 
        type: 'POSTBOX',
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
        depth: 0,
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:14
        },
        offset: {
          x:12, 
          y:16
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                                group_2: {
                req_group_name: 'Mail Letter',
                req_pocket_action: 'MAIL',
                req_world_action: 'MAIL',
                req_state: '',
                req_result_item: '',
                req_result_data_key: 'LETTERS',
                req_result_data_set: '',
                req_result_data_modify: '1',
                req_result_texture: '',
                req_result_fx: '',
                req_result_ground: '',
                requires: [
                  {
                    slot_type: 'IN_HAND',
                    type: 'ITEM_KIND',
                    result: 'MAILED',
                    ITEM_KIND: 'MAIL',
                    },
                  {
                    slot_type: 'ON_ACTIVE',
                    type: 'OBJ_TYPE',
                    result: 'UNTOUCHED',
                    OBJ_TYPE: 'POSTBOX'
                    }
                                ]

            }                      },
    },
          PSYCHIC_STOREFRONT_SIGN: {
        name: 'Psychic Storefront Sign',
        slug: 'PSYCHIC_STOREFRONT_SIGN', 
        type: 'STOREFRONT_FRAME_SIGN',
        bounding: {
          h:2, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:1
        },
        depth: 0,
        sprite: {
          h:20, 
          w:64,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          DINER_CHAIR_RED: {
        name: 'Red Diner Chair',
        slug: 'DINER_CHAIR_RED', 
        type: 'CHAIR',
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
        depth: 0,
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:12
        },
        offset: {
          x:10, 
          y:16
        },
        varieties: 4,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'TURN EAST', stateTrigger: 'FACING_EAST', validStates: ['FACING_NORTH','FACING_SOUTH','FACING_WEST']
          }, {
            name: 'TURN WEST', stateTrigger: 'FACING_WEST', validStates: ['FACING_EAST','FACING_NORTH','FACING_SOUTH']
          }, {
            name: 'TURN NORTH', stateTrigger: 'FACING_NORTH', validStates: ['FACING_EAST','FACING_SOUTH','FACING_WEST']
          }, {
            name: 'TURN SOUTH', stateTrigger: 'FACING_SOUTH', validStates: ['FACING_EAST','FACING_NORTH','FACING_WEST']
          }],
        states: [            {
              name: 'FACING_NORTH',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-4',]
              }, {
              name: 'FACING_SOUTH',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-2',]
              }, {
              name: 'FACING_WEST',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-3',]
              }, {
              name: 'FACING_EAST',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-1', ]
              },
                      {
              name: 'FACING_EAST',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-1',]
              }, {
              name: 'FACING_NORTH',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-4',]
              }, {
              name: 'FACING_SOUTH',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-2',]
              }, {
              name: 'FACING_WEST',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-3', ]
              },
                      {
              name: 'FACING_EAST',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-1',]
              }, {
              name: 'FACING_SOUTH',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-2',]
              }, {
              name: 'FACING_WEST',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-3',]
              }, {
              name: 'FACING_NORTH',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-4', ]
              },
                      {
              name: 'FACING_EAST',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-1',]
              }, {
              name: 'FACING_NORTH',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-4',]
              }, {
              name: 'FACING_WEST',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-3',]
              }, {
              name: 'FACING_SOUTH',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-2', ]
              },
          ],

          interactions: {
                                  },
    },
          ROLLING_GATE_DOOR: {
        name: 'Rolling Security Door Gate',
        slug: 'ROLLING_GATE_DOOR', 
        type: 'ROLLING_GATE',
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
        depth: 0,
        sprite: {
          h:58, 
          w:32,
          x:0, 
          y:6
        },
        size: {
          h:48, 
          w:32
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 16,
        solid: 0,
        portal: 0,
        actions: [],
        states: [{
              name: 'OPEN',
              transition: 'false',
              frames: ['ROLLING_GATE_DOOR-16',]},{
              name: 'CLOSED',
              transition: 'false',
              frames: ['ROLLING_GATE_DOOR-1',]},{
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['ROLLING_GATE_DOOR-2','ROLLING_GATE_DOOR-3','ROLLING_GATE_DOOR-4','ROLLING_GATE_DOOR-5','ROLLING_GATE_DOOR-6','ROLLING_GATE_DOOR-7','ROLLING_GATE_DOOR-8','ROLLING_GATE_DOOR-9','ROLLING_GATE_DOOR-10','ROLLING_GATE_DOOR-11','ROLLING_GATE_DOOR-12','ROLLING_GATE_DOOR-13','ROLLING_GATE_DOOR-14','ROLLING_GATE_DOOR-15','ROLLING_GATE_DOOR-16',]},{
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['ROLLING_GATE_DOOR-15','ROLLING_GATE_DOOR-14','ROLLING_GATE_DOOR-13','ROLLING_GATE_DOOR-12','ROLLING_GATE_DOOR-11','ROLLING_GATE_DOOR-10','ROLLING_GATE_DOOR-9','ROLLING_GATE_DOOR-8','ROLLING_GATE_DOOR-7','ROLLING_GATE_DOOR-6','ROLLING_GATE_DOOR-5','ROLLING_GATE_DOOR-4','ROLLING_GATE_DOOR-3','ROLLING_GATE_DOOR-2','ROLLING_GATE_DOOR-1',]},],

          interactions: {
                                  },
    },
          ROLLING_GATE_WIDE: {
        name: 'Rolling Security Wide Gate',
        slug: 'ROLLING_GATE_WIDE', 
        type: 'ROLLING_GATE',
        bounding: {
          h:4, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:3
        },
        depth: 0,
        sprite: {
          h:58, 
          w:64,
          x:0, 
          y:6
        },
        size: {
          h:48, 
          w:64
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 16,
        solid: 0,
        portal: 0,
        actions: [],
        states: [{
              name: 'OPEN',
              transition: 'false',
              frames: ['ROLLING_GATE_WIDE-16',]},{
              name: 'CLOSED',
              transition: 'false',
              frames: ['ROLLING_GATE_WIDE-1',]},{
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['ROLLING_GATE_WIDE-2','ROLLING_GATE_WIDE-3','ROLLING_GATE_WIDE-4','ROLLING_GATE_WIDE-5','ROLLING_GATE_WIDE-6','ROLLING_GATE_WIDE-7','ROLLING_GATE_WIDE-8','ROLLING_GATE_WIDE-9','ROLLING_GATE_WIDE-10','ROLLING_GATE_WIDE-11','ROLLING_GATE_WIDE-12','ROLLING_GATE_WIDE-13','ROLLING_GATE_WIDE-14','ROLLING_GATE_WIDE-15','ROLLING_GATE_WIDE-16',]},{
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['ROLLING_GATE_WIDE-15','ROLLING_GATE_WIDE-14','ROLLING_GATE_WIDE-13','ROLLING_GATE_WIDE-12','ROLLING_GATE_WIDE-11','ROLLING_GATE_WIDE-10','ROLLING_GATE_WIDE-9','ROLLING_GATE_WIDE-8','ROLLING_GATE_WIDE-7','ROLLING_GATE_WIDE-6','ROLLING_GATE_WIDE-5','ROLLING_GATE_WIDE-4','ROLLING_GATE_WIDE-3','ROLLING_GATE_WIDE-2','ROLLING_GATE_WIDE-1',]},],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 1,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['DEFAULT']
          }],
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

          interactions: {
                                  },
    },
          SOFA_SHLUBBY_1: {
        name: 'Shlubby Sofa',
        slug: 'SOFA_SHLUBBY_1', 
        type: 'SOFA',
        bounding: {
          h:3, 
          w:4
        },
        base: {
          h:2, 
          w:4,
          x:0, 
          y:1
        },
        depth: 0,
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:20, 
          w:60
        },
        offset: {
          x:0, 
          y:22
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'SLEEP', stateTrigger: 'SLEEPING', validStates: ['CURLED_UP']
          }, {
            name: 'CURL UP ON', stateTrigger: 'CURLED_UP', validStates: ['DEFAULT']
          }],
        states: [            {
              name: 'CURLED_UP',
              transition: 'false',
              frames: []
              }, {
              name: 'SLEEPING',
              transition: 'false',
              frames: []
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: []
              }, {
              name: 'CURLED_UP',
              transition: 'false',
              frames: []
              },
          ],

          interactions: {
                                  },
    },
          SHOP_SHELVES_BLUE: {
        name: 'Shop Shelves Blue',
        slug: 'SHOP_SHELVES_BLUE', 
        type: 'SHOP_SHELVES',
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
        depth: 0,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:32
        },
        offset: {
          x:0, 
          y:24
        },
        varieties: 2,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          SHOP_SHELVES_MOTTLED: {
        name: 'Shop Shelves Mottled',
        slug: 'SHOP_SHELVES_MOTTLED', 
        type: 'SHOP_SHELVES',
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
        depth: -12,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:32
        },
        offset: {
          x:0, 
          y:24
        },
        varieties: 2,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          TABLE_WOOD_SIMPLE: {
        name: 'Simple Wood Table',
        slug: 'TABLE_WOOD_SIMPLE', 
        type: 'TABLE',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:2, 
          w:2,
          x:0, 
          y:1
        },
        depth: -2,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:20, 
          w:18
        },
        offset: {
          x:7, 
          y:20
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          SODIUM: {
        name: 'Sodium Light',
        slug: 'SODIUM', 
        type: 'STREETLAMP',
        bounding: {
          h:2, 
          w:3
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:32, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:4, 
          w:8
        },
        offset: {
          x:40, 
          y:16
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_STORE_4_CLAD_GREEN: {
        name: 'Store Half Windows Green Clad',
        slug: 'EXT_WINDOW_STORE_4_CLAD_GREEN', 
        type: 'STORE_WINDOW_EXT',
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
        depth: 0,
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:64
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_STORE_4_CLAD_RED: {
        name: 'Store Half Windows Red Clad',
        slug: 'EXT_WINDOW_STORE_4_CLAD_RED', 
        type: 'STORE_WINDOW_EXT',
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
        depth: 0,
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:24, 
          w:64
        },
        offset: {
          x:0, 
          y:12
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_STORE_4_CLAD_WEATHERED: {
        name: 'Store Half Windows Weathered Clad',
        slug: 'EXT_WINDOW_STORE_4_CLAD_WEATHERED', 
        type: 'STORE_WINDOW_EXT',
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
        depth: 0,
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:64
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_STORE_4_CLAD_WEATHERED_STAINED_GLASS: {
        name: 'Store Half Windows Weathered Clad Stained Glass',
        slug: 'EXT_WINDOW_STORE_4_CLAD_WEATHERED_STAINED_GLASS', 
        type: 'STORE_WINDOW_EXT',
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
        depth: 0,
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:64
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_STORE_4_CLAD: {
        name: 'Store Half Windows Wood Clad',
        slug: 'EXT_WINDOW_STORE_4_CLAD', 
        type: 'STORE_WINDOW_EXT',
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
        depth: 0,
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:64
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_STORE_4_CLAD_YELLOW: {
        name: 'Store Half Windows Yellow Clad',
        slug: 'EXT_WINDOW_STORE_4_CLAD_YELLOW', 
        type: 'STORE_WINDOW_EXT',
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
        depth: 0,
        sprite: {
          h:48, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:64
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          STORE_WINDOW_COUNTER_3: {
        name: 'Store Window Counter 3',
        slug: 'STORE_WINDOW_COUNTER_3', 
        type: 'STORE_COUNTER',
        bounding: {
          h:4, 
          w:3
        },
        base: {
          h:1, 
          w:3,
          x:0, 
          y:3
        },
        depth: 0,
        sprite: {
          h:68, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:48
        },
        offset: {
          x:0, 
          y:48
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          STORE_WINDOW_COUNTER_4: {
        name: 'Store Window Counter 4',
        slug: 'STORE_WINDOW_COUNTER_4', 
        type: 'STORE_COUNTER',
        bounding: {
          h:4, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:3
        },
        depth: 0,
        sprite: {
          h:68, 
          w:64,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:64
        },
        offset: {
          x:0, 
          y:48
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          STORE_FRONT_FRAME_1: {
        name: 'Storefront Frame 1',
        slug: 'STORE_FRONT_FRAME_1', 
        type: 'STOREFRONT_FRAME',
        bounding: {
          h:5, 
          w:6
        },
        base: {
          h:1, 
          w:6,
          x:0, 
          y:4
        },
        depth: 0,
        sprite: {
          h:80, 
          w:96,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          STORE_FRONT_FRAME_2: {
        name: 'Storefront Frame 2',
        slug: 'STORE_FRONT_FRAME_2', 
        type: 'STOREFRONT_FRAME',
        bounding: {
          h:5, 
          w:6
        },
        base: {
          h:1, 
          w:6,
          x:0, 
          y:4
        },
        depth: 0,
        sprite: {
          h:80, 
          w:96,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          STORE_FRONT_FRAME_3: {
        name: 'Storefront Frame 3',
        slug: 'STORE_FRONT_FRAME_3', 
        type: 'STOREFRONT_FRAME',
        bounding: {
          h:5, 
          w:6
        },
        base: {
          h:1, 
          w:6,
          x:0, 
          y:4
        },
        depth: 0,
        sprite: {
          h:80, 
          w:96,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          STORE_FRONT_FRAME_4: {
        name: 'Storefront Frame 4',
        slug: 'STORE_FRONT_FRAME_4', 
        type: 'STOREFRONT_FRAME',
        bounding: {
          h:5, 
          w:6
        },
        base: {
          h:1, 
          w:6,
          x:0, 
          y:4
        },
        depth: 0,
        sprite: {
          h:80, 
          w:96,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          STORE_FRONT_WINDOW_BLUE: {
        name: 'Storefront Window Blue',
        slug: 'STORE_FRONT_WINDOW_BLUE', 
        type: 'STORE_WINDOW_EXT',
        bounding: {
          h:4, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:3
        },
        depth: 0,
        sprite: {
          h:51, 
          w:57,
          x:0, 
          y:0
        },
        size: {
          h:34, 
          w:47
        },
        offset: {
          x:6, 
          y:9
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          STORE_FRONT_WINDOW_GREEN: {
        name: 'Storefront Window Green',
        slug: 'STORE_FRONT_WINDOW_GREEN', 
        type: 'STORE_WINDOW_EXT',
        bounding: {
          h:4, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:3
        },
        depth: 0,
        sprite: {
          h:51, 
          w:57,
          x:0, 
          y:0
        },
        size: {
          h:34, 
          w:47
        },
        offset: {
          x:6, 
          y:9
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          STORE_FRONT_WINDOW_RED: {
        name: 'Storefront Window Red',
        slug: 'STORE_FRONT_WINDOW_RED', 
        type: 'STORE_WINDOW_EXT',
        bounding: {
          h:4, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:3
        },
        depth: 0,
        sprite: {
          h:51, 
          w:57,
          x:0, 
          y:0
        },
        size: {
          h:34, 
          w:47
        },
        offset: {
          x:6, 
          y:9
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          STORE_FRONT_WINDOW_YELLOW: {
        name: 'Storefront Window Yellow',
        slug: 'STORE_FRONT_WINDOW_YELLOW', 
        type: 'STORE_WINDOW_EXT',
        bounding: {
          h:4, 
          w:4
        },
        base: {
          h:1, 
          w:4,
          x:0, 
          y:3
        },
        depth: 0,
        sprite: {
          h:51, 
          w:57,
          x:0, 
          y:0
        },
        size: {
          h:34, 
          w:47
        },
        offset: {
          x:6, 
          y:9
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          TOASTER: {
        name: 'Toaster',
        slug: 'TOASTER', 
        type: 'TOASTER',
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
        depth: 0,
        sprite: {
          h:32, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:4, 
          w:8
        },
        offset: {
          x:4, 
          y:20
        },
        varieties: 13,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'TURN ON', stateTrigger: 'TURNING_ON', validStates: ['OFF']
          }, {
            name: 'TURN OFF', stateTrigger: 'TURNING_OFF', validStates: ['ON']
          }, {
            name: 'TOAST', stateTrigger: 'TOASTING', validStates: ['ON']
          }],
        states: [            {
              name: 'OFF',
              transition: 'false',
              frames: ['TOASTER-1',]
              }, {
              name: 'TURNING_ON',
              transition: 'ON',
              frames: []
              },
                      {
              name: 'ON',
              transition: 'false',
              frames: []
              }, {
              name: 'TURNING_OFF',
              transition: 'OFF',
              frames: []
              },
                      {
              name: 'ON',
              transition: 'false',
              frames: []
              }, {
              name: 'TOASTING',
              transition: 'EJECTING_TOAST',
              frames: []
              },
          ],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'INSERT COIN', stateTrigger: 'COIN_DISPENSING', validStates: ['COIN_LOCKED']
          }],
        states: [            {
              name: 'COIN_LOCKED',
              transition: 'false',
              frames: ['DAILY_NEWS_BOX_-1',]
              }, {
              name: 'COIN_DISPENSING',
              transition: 'COIN_RETRACTING',
              frames: ['DAILY_NEWS_BOX_-2', 'DAILY_NEWS_BOX_-3', 'DAILY_NEWS_BOX_-4', 'DAILY_NEWS_BOX_-5', 'DAILY_NEWS_BOX_-6', ]
              },
          ],

          interactions: {
                                  },
    },
          TRAFFIC_LIGHT_ARM_EAST: {
        name: 'Traffic Light Arm East',
        slug: 'TRAFFIC_LIGHT_ARM_EAST', 
        type: 'TRAFFIC_LIGHT_ARM',
        bounding: {
          h:6, 
          w:2
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:5
        },
        depth: 0,
        sprite: {
          h:96, 
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
        varieties: 1,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          TRAFFIC_LIGHT_ARM_SOUTH: {
        name: 'Traffic Light Arm South',
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
        depth: 0,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [{
              name: 'OFF',
              transition: 'false',
              frames: ['TRAFFIC_LIGHT_EAST-1',]},{
              name: 'GREEN',
              transition: 'false',
              frames: ['TRAFFIC_LIGHT_EAST-4',]},{
              name: 'YELLOW',
              transition: 'false',
              frames: ['TRAFFIC_LIGHT_EAST-3',]},{
              name: 'RED',
              transition: 'false',
              frames: ['TRAFFIC_LIGHT_EAST-2',]},],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [{
              name: 'OFF',
              transition: 'false',
              frames: []},{
              name: 'GREEN',
              transition: 'false',
              frames: []},{
              name: 'YELLOW',
              transition: 'false',
              frames: []},{
              name: 'RED',
              transition: 'false',
              frames: []},],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [{
              name: 'OFF',
              transition: 'false',
              frames: ['TRAFFIC_LIGHT_SOUTH-1',]},{
              name: 'GREEN',
              transition: 'false',
              frames: ['TRAFFIC_LIGHT_SOUTH-4',]},{
              name: 'YELLOW',
              transition: 'false',
              frames: ['TRAFFIC_LIGHT_SOUTH-3',]},{
              name: 'RED',
              transition: 'false',
              frames: ['TRAFFIC_LIGHT_SOUTH-2',]},],

          interactions: {
                                  },
    },
          TRASH_DRUM: {
        name: 'Trash Drum',
        slug: 'TRASH_DRUM', 
        type: 'TRASH_CAN',
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
        depth: 0,
        sprite: {
          h:32, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:14, 
          w:12
        },
        offset: {
          x:2, 
          y:14
        },
        varieties: 7,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                                group_17: {
                req_group_name: 'Throw Away Trash',
                req_pocket_action: 'THROW AWAY',
                req_world_action: 'THROW AWAY',
                req_state: '',
                req_result_item: '',
                req_result_data_key: '',
                req_result_data_set: '',
                req_result_data_modify: '',
                req_result_texture: '',
                req_result_fx: '',
                req_result_ground: '',
                requires: [
                  {
                    slot_type: 'IN_HAND',
                    type: 'ITEM_KIND',
                    result: 'CONSUMED',
                    ITEM_KIND: 'TRASH',
                    },
                  {
                    slot_type: 'ON_ACTIVE',
                    type: 'OBJ_TYPE',
                    result: 'FILLED',
                    OBJ_TYPE: 'TRASH_CAN'
                    }
                                ]

            }                      },
    },
          UNDERCOUNTER_CABINET_S_DARK_WOOD: {
        name: 'Undercounter Cabinet S Dark Wood',
        slug: 'UNDERCOUNTER_CABINET_S_DARK_WOOD', 
        type: 'CABINET',
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
        depth: 0,
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:16
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 4,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_DARK_WOOD-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_DARK_WOOD-1', 'UNDERCOUNTER_CABINET_S_DARK_WOOD-2', 'UNDERCOUNTER_CABINET_S_DARK_WOOD-3', 'UNDERCOUNTER_CABINET_S_DARK_WOOD-4', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_DARK_WOOD-4',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_S_DARK_WOOD-4', 'UNDERCOUNTER_CABINET_S_DARK_WOOD-3', 'UNDERCOUNTER_CABINET_S_DARK_WOOD-2', 'UNDERCOUNTER_CABINET_S_DARK_WOOD-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_DARK_WOOD-4',]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_DARK_WOOD-4', ]
              },
          ],            slots: 0,
            items: [],

          interactions: {
                                  },
    },
          UNDERCOUNTER_CABINET_S_LIGHT_WOOD: {
        name: 'Undercounter Cabinet S Light Wood',
        slug: 'UNDERCOUNTER_CABINET_S_LIGHT_WOOD', 
        type: 'CABINET',
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
        depth: 0,
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:16
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 4,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_LIGHT_WOOD-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_LIGHT_WOOD-1', 'UNDERCOUNTER_CABINET_S_LIGHT_WOOD-2', 'UNDERCOUNTER_CABINET_S_LIGHT_WOOD-3', 'UNDERCOUNTER_CABINET_S_LIGHT_WOOD-4', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_LIGHT_WOOD-4',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_S_LIGHT_WOOD-4', 'UNDERCOUNTER_CABINET_S_LIGHT_WOOD-3', 'UNDERCOUNTER_CABINET_S_LIGHT_WOOD-2', 'UNDERCOUNTER_CABINET_S_LIGHT_WOOD-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_LIGHT_WOOD-4',]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_LIGHT_WOOD-4', ]
              },
          ],            slots: 0,
            items: [],

          interactions: {
                                  },
    },
          UNDERCOUNTER_CABINET_S_PEELING_WOOD: {
        name: 'Undercounter Cabinet S Peeling Wood',
        slug: 'UNDERCOUNTER_CABINET_S_PEELING_WOOD', 
        type: 'CABINET',
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
        depth: 0,
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:16
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 4,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_PEELING_WOOD-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_PEELING_WOOD-1', 'UNDERCOUNTER_CABINET_S_PEELING_WOOD-2', 'UNDERCOUNTER_CABINET_S_PEELING_WOOD-3', 'UNDERCOUNTER_CABINET_S_PEELING_WOOD-4', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_PEELING_WOOD-4',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_S_PEELING_WOOD-4', 'UNDERCOUNTER_CABINET_S_PEELING_WOOD-3', 'UNDERCOUNTER_CABINET_S_PEELING_WOOD-2', 'UNDERCOUNTER_CABINET_S_PEELING_WOOD-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_PEELING_WOOD-4',]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_PEELING_WOOD-4', ]
              },
          ],            slots: 0,
            items: [],

          interactions: {
                                  },
    },
          UNDERCOUNTER_CABINET_S_YELLOW: {
        name: 'Undercounter Cabinet S Yellow',
        slug: 'UNDERCOUNTER_CABINET_S_YELLOW', 
        type: 'CABINET',
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
        depth: 0,
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:16
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 4,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_YELLOW-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_YELLOW-1', 'UNDERCOUNTER_CABINET_S_YELLOW-2', 'UNDERCOUNTER_CABINET_S_YELLOW-3', 'UNDERCOUNTER_CABINET_S_YELLOW-4', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_YELLOW-4',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_S_YELLOW-4', 'UNDERCOUNTER_CABINET_S_YELLOW-3', 'UNDERCOUNTER_CABINET_S_YELLOW-2', 'UNDERCOUNTER_CABINET_S_YELLOW-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_YELLOW-4',]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_YELLOW-4', ]
              },
          ],            slots: 0,
            items: [],

          interactions: {
                                  },
    },
          UNDERCOUNTER_CABINET_W_DARK_WOOD: {
        name: 'Undercounter Cabinet W Dark Wood',
        slug: 'UNDERCOUNTER_CABINET_W_DARK_WOOD', 
        type: 'CABINET',
        bounding: {
          h:2, 
          w:2
        },
        base: {
          h:1, 
          w:1,
          x:1, 
          y:1
        },
        depth: 0,
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:12
        },
        offset: {
          x:20, 
          y:16
        },
        varieties: 4,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_DARK_WOOD-4',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_DARK_WOOD-4', 'UNDERCOUNTER_CABINET_W_DARK_WOOD-3', 'UNDERCOUNTER_CABINET_W_DARK_WOOD-2', 'UNDERCOUNTER_CABINET_W_DARK_WOOD-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_DARK_WOOD-1',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_W_DARK_WOOD-1', 'UNDERCOUNTER_CABINET_W_DARK_WOOD-2', 'UNDERCOUNTER_CABINET_W_DARK_WOOD-3', 'UNDERCOUNTER_CABINET_W_DARK_WOOD-4', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_DARK_WOOD-1',]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_DARK_WOOD-1', ]
              },
          ],            slots: 0,
            items: [],

          interactions: {
                                  },
    },
          UNDERCOUNTER_CABINET_W_LIGHT_WOOD: {
        name: 'Undercounter Cabinet W Light Wood',
        slug: 'UNDERCOUNTER_CABINET_W_LIGHT_WOOD', 
        type: 'CABINET',
        bounding: {
          h:2, 
          w:2
        },
        base: {
          h:1, 
          w:1,
          x:1, 
          y:1
        },
        depth: 0,
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:12
        },
        offset: {
          x:20, 
          y:16
        },
        varieties: 4,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_LIGHT_WOOD-4',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_LIGHT_WOOD-4', 'UNDERCOUNTER_CABINET_W_LIGHT_WOOD-3', 'UNDERCOUNTER_CABINET_W_LIGHT_WOOD-2', 'UNDERCOUNTER_CABINET_W_LIGHT_WOOD-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_LIGHT_WOOD-1',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_W_LIGHT_WOOD-1', 'UNDERCOUNTER_CABINET_W_LIGHT_WOOD-2', 'UNDERCOUNTER_CABINET_W_LIGHT_WOOD-3', 'UNDERCOUNTER_CABINET_W_LIGHT_WOOD-4', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_LIGHT_WOOD-1',]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_LIGHT_WOOD-1', ]
              },
          ],            slots: 0,
            items: [],

          interactions: {
                                  },
    },
          UNDERCOUNTER_CABINET_W_PEELING_WOOD: {
        name: 'Undercounter Cabinet W Peeling Wood',
        slug: 'UNDERCOUNTER_CABINET_W_PEELING_WOOD', 
        type: 'CABINET',
        bounding: {
          h:2, 
          w:2
        },
        base: {
          h:1, 
          w:1,
          x:1, 
          y:1
        },
        depth: 0,
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:12
        },
        offset: {
          x:20, 
          y:16
        },
        varieties: 4,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_PEELING_WOOD-4',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_PEELING_WOOD-4', 'UNDERCOUNTER_CABINET_W_PEELING_WOOD-3', 'UNDERCOUNTER_CABINET_W_PEELING_WOOD-2', 'UNDERCOUNTER_CABINET_W_PEELING_WOOD-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_PEELING_WOOD-1',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_W_PEELING_WOOD-1', 'UNDERCOUNTER_CABINET_W_PEELING_WOOD-2', 'UNDERCOUNTER_CABINET_W_PEELING_WOOD-3', 'UNDERCOUNTER_CABINET_W_PEELING_WOOD-4', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_PEELING_WOOD-1',]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_PEELING_WOOD-1', ]
              },
          ],            slots: 0,
            items: [],

          interactions: {
                                  },
    },
          UNDERCOUNTER_CABINET_W_YELLOW: {
        name: 'Undercounter Cabinet W Yellow',
        slug: 'UNDERCOUNTER_CABINET_W_YELLOW', 
        type: 'CABINET',
        bounding: {
          h:2, 
          w:2
        },
        base: {
          h:1, 
          w:1,
          x:1, 
          y:1
        },
        depth: 0,
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:12
        },
        offset: {
          x:20, 
          y:16
        },
        varieties: 4,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_YELLOW-4',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_YELLOW-4', 'UNDERCOUNTER_CABINET_W_YELLOW-3', 'UNDERCOUNTER_CABINET_W_YELLOW-2', 'UNDERCOUNTER_CABINET_W_YELLOW-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_YELLOW-1',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_W_YELLOW-1', 'UNDERCOUNTER_CABINET_W_YELLOW-2', 'UNDERCOUNTER_CABINET_W_YELLOW-3', 'UNDERCOUNTER_CABINET_W_YELLOW-4', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_YELLOW-1',]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_YELLOW-1', ]
              },
          ],            slots: 0,
            items: [],

          interactions: {
                                  },
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
        depth: 0,
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
        varieties: 5,
        solid: 0,
        portal: 0,
        actions: [],
        states: [{
              name: 'SIGNAL_WALK_HAND',
              transition: 'false',
              frames: ['WALK_SIGNAL_SE_-5',]},{
              name: 'SIGNAL_HAND_WALK',
              transition: 'false',
              frames: ['WALK_SIGNAL_SE_-3',]},{
              name: 'SIGNAL_WARNING_HAND',
              transition: 'false',
              frames: ['WALK_SIGNAL_SE_-4','WALK_SIGNAL_SE_-2',]},{
              name: 'SIGNAL_HAND_WARNING',
              transition: 'false',
              frames: ['WALK_SIGNAL_SE_-1','WALK_SIGNAL_SE_-2','WALK_SIGNAL_SE_-2','WALK_SIGNAL_SE_-2','WALK_SIGNAL_SE_-1','WALK_SIGNAL_SE_-1',]},],

          interactions: {
                                  },
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
        depth: 0,
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
        varieties: 3,
        solid: 0,
        portal: 0,
        actions: [],
        states: [{
              name: 'SIGNAL_WALK_HAND',
              transition: 'false',
              frames: ['WALK_SIGNAL_W_-2',]},{
              name: 'SIGNAL_HAND_WALK',
              transition: 'false',
              frames: ['WALK_SIGNAL_W_-3',]},{
              name: 'SIGNAL_WARNING_HAND',
              transition: 'false',
              frames: ['WALK_SIGNAL_W_-2',]},{
              name: 'SIGNAL_HAND_WARNING',
              transition: 'false',
              frames: ['WALK_SIGNAL_W_-1','WALK_SIGNAL_W_-2',]},],

          interactions: {
                                  },
    },
          WALL_CALENDAR: {
        name: 'Wall Calendar',
        slug: 'WALL_CALENDAR', 
        type: 'CALENDAR',
        bounding: {
          h:2, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:23, 
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
        varieties: 3,
        solid: 0,
        portal: 0,
        actions: [],
        states: [{
              name: 'JUNE',
              transition: 'false',
              frames: ['WALL_CALENDAR-1',]},{
              name: 'JULY',
              transition: 'false',
              frames: ['WALL_CALENDAR-2',]},{
              name: 'AUGUST',
              transition: 'false',
              frames: ['WALL_CALENDAR-3',]},],

          interactions: {
                                  },
    },
          WALL_SWITCH_DOUBLE: {
        name: 'Wall Switch Double',
        slug: 'WALL_SWITCH_DOUBLE', 
        type: 'LIGHT_SWITCH',
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
        depth: 0,
        sprite: {
          h:16, 
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
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          WALL_SWITCH_SINGLE: {
        name: 'Wall Switch Single',
        slug: 'WALL_SWITCH_SINGLE', 
        type: 'LIGHT_SWITCH',
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
        depth: 0,
        sprite: {
          h:16, 
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
        varieties: 2,
        solid: 0,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          WOOD_FENCE_2_VERTICAL_BROWN: {
        name: 'Wood Fence 2 Brown Vertical',
        slug: 'WOOD_FENCE_2_VERTICAL_BROWN', 
        type: 'FENCE',
        bounding: {
          h:4, 
          w:1
        },
        base: {
          h:2, 
          w:1,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:64, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:8
        },
        offset: {
          x:8, 
          y:32
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          WOOD_FENCE_2_VERTICAL_HONEY: {
        name: 'Wood Fence 2 Honey Vertical',
        slug: 'WOOD_FENCE_2_VERTICAL_HONEY', 
        type: 'FENCE',
        bounding: {
          h:4, 
          w:1
        },
        base: {
          h:2, 
          w:1,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:64, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:8
        },
        offset: {
          x:8, 
          y:32
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          WOOD_FENCE_2_VERTICAL_WEATHERED: {
        name: 'Wood Fence 2 Weathered Vertical',
        slug: 'WOOD_FENCE_2_VERTICAL_WEATHERED', 
        type: 'FENCE',
        bounding: {
          h:4, 
          w:1
        },
        base: {
          h:2, 
          w:1,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:64, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:32, 
          w:8
        },
        offset: {
          x:8, 
          y:32
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          WOOD_FENCE_3_VERTICAL_BROWN: {
        name: 'Wood Fence 3 Brown Vertical',
        slug: 'WOOD_FENCE_3_VERTICAL_BROWN', 
        type: 'FENCE',
        bounding: {
          h:5, 
          w:1
        },
        base: {
          h:3, 
          w:1,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:80, 
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
          y:32
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          WOOD_FENCE_3_VERTICAL_HONEY: {
        name: 'Wood Fence 3 Honey Vertical',
        slug: 'WOOD_FENCE_3_VERTICAL_HONEY', 
        type: 'FENCE',
        bounding: {
          h:5, 
          w:1
        },
        base: {
          h:3, 
          w:1,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:80, 
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
          y:32
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          WOOD_FENCE_3_VERTICAL_WEATHERED: {
        name: 'Wood Fence 3 Weathered Vertical',
        slug: 'WOOD_FENCE_3_VERTICAL_WEATHERED', 
        type: 'FENCE',
        bounding: {
          h:5, 
          w:1
        },
        base: {
          h:3, 
          w:1,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:80, 
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
          y:32
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          WOOD_FENCE_4_VERTICAL_BROWN: {
        name: 'Wood Fence 4 Brown Vertical',
        slug: 'WOOD_FENCE_4_VERTICAL_BROWN', 
        type: 'FENCE',
        bounding: {
          h:6, 
          w:1
        },
        base: {
          h:4, 
          w:1,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:96, 
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
          y:32
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          WOOD_FENCE_4_VERTICAL_HONEY: {
        name: 'Wood Fence 4 Honey Vertical',
        slug: 'WOOD_FENCE_4_VERTICAL_HONEY', 
        type: 'FENCE',
        bounding: {
          h:6, 
          w:1
        },
        base: {
          h:4, 
          w:1,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:96, 
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
          y:32
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
    },
          WOOD_FENCE_4_VERTICAL_WEATHERED: {
        name: 'Wood Fence 4 Weathered Vertical',
        slug: 'WOOD_FENCE_4_VERTICAL_WEATHERED', 
        type: 'FENCE',
        bounding: {
          h:6, 
          w:1
        },
        base: {
          h:4, 
          w:1,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:96, 
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
          y:32
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['WOOD_SIDE_TABLE-1',]
              }, {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['WOOD_SIDE_TABLE-4', 'WOOD_SIDE_TABLE-3', 'WOOD_SIDE_TABLE-2', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['WOOD_SIDE_TABLE-2',]
              }, {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['WOOD_SIDE_TABLE-3', 'WOOD_SIDE_TABLE-4', 'WOOD_SIDE_TABLE-1', ]
              },
                      {
              name: 'OPEN',
              transition: 'false',
              frames: ['WOOD_SIDE_TABLE-2',]
              }, {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: []
              },
          ],            slots: 4,
            items: [],

          interactions: {
                                  },
    },
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
        depth: 0,
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
        solid: 1,
        portal: 0,
        actions: [],
        states: [],

          interactions: {
                                  },
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
        depth: 0,
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
        solid: 0,
        portal: 0,
        actions: [ {
            name: 'READ', stateTrigger: 'READING', validStates: ['DEFAULT']
          }, {
            name: 'GUST', stateTrigger: 'GUSTING', validStates: ['DEFAULT']
          }],
        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_YELLOW-8',]
              }, {
              name: 'READING',
              transition: 'DEFAULT',
              frames: []
              },
                      {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_YELLOW-8',]
              }, {
              name: 'GUSTING',
              transition: 'DEFAULT',
              frames: ['OBJ_FLYER_YELLOW-1', 'OBJ_FLYER_YELLOW-2', 'OBJ_FLYER_YELLOW-3', 'OBJ_FLYER_YELLOW-4', 'OBJ_FLYER_YELLOW-5', 'OBJ_FLYER_YELLOW-6', 'OBJ_FLYER_YELLOW-7', 'OBJ_FLYER_YELLOW-8', ]
              },
          ],

          interactions: {
                                  },
    },
          LAMP_YELLOW_TABLE: {
        name: 'Yellow Table Lamp',
        slug: 'LAMP_YELLOW_TABLE', 
        type: 'LAMP',
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
        depth: 8,
        sprite: {
          h:18, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:4, 
          w:6
        },
        offset: {
          x:4, 
          y:10
        },
        varieties: 5,
        solid: 1,
        portal: 0,
        actions: [ {
            name: 'TURN ON', stateTrigger: 'TURNING_ON', validStates: ['OFF']
          }, {
            name: 'TURN OFF', stateTrigger: 'TURNING_OFF', validStates: ['ON']
          }],
        states: [            {
              name: 'OFF',
              transition: 'false',
              frames: ['LAMP_YELLOW_TABLE-5',]
              }, {
              name: 'TURNING_ON',
              transition: 'ON',
              frames: ['LAMP_YELLOW_TABLE-5', 'LAMP_YELLOW_TABLE-4', ]
              },
                      {
              name: 'ON',
              transition: 'false',
              frames: ['LAMP_YELLOW_TABLE-4',]
              }, {
              name: 'TURNING_OFF',
              transition: 'OFF',
              frames: ['LAMP_YELLOW_TABLE-4', 'LAMP_YELLOW_TABLE-5', ]
              },
          ],

          interactions: {
                                  },
    }
  };
export default OBJECTS;
