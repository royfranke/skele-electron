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
        depth: 16,
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
        loot: [
                  ],
        actions: [ {
            name: 'CHECK OUT', stateTrigger: 'PRINTING_RECEIPT', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [                {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['ADDING_MACHINE-1',]},                {
              name: 'PRINTING_RECEIPT',
              transition: 'DEFAULT',
              frames: ['ADDING_MACHINE-1','ADDING_MACHINE-2','ADDING_MACHINE-3','ADDING_MACHINE-4','ADDING_MACHINE-5','ADDING_MACHINE-6',]},                           ],

          interactions: {
                                  },
    },
          ANSWERING_MACHINE: {
        name: 'Answering Machine',
        slug: 'ANSWERING_MACHINE', 
        type: 'ELECTRONICS',
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
        depth: 17,
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:6, 
          w:14
        },
        offset: {
          x:1, 
          y:7
        },
        varieties: 2,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [                {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['ANSWERING_MACHINE-1',]},                {
              name: 'NEW_MESSAGES',
              transition: 'false',
              frames: ['ANSWERING_MACHINE-2','ANSWERING_MACHINE-2','ANSWERING_MACHINE-2','ANSWERING_MACHINE-1','ANSWERING_MACHINE-1','ANSWERING_MACHINE-2','ANSWERING_MACHINE-2','ANSWERING_MACHINE-2','ANSWERING_MACHINE-1','ANSWERING_MACHINE-1',]},],

          interactions: {
                                  },
    },
          ASH_TRAY: {
        name: 'Ash Tray',
        slug: 'ASH_TRAY', 
        type: 'ASH_TRAY',
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
        depth: 17,
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
        varieties: 3,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'HALF_FULL',        states: [                {
              name: 'FULL',
              transition: 'false',
              frames: ['ASH_TRAY-3',]},                {
              name: 'EMPTY',
              transition: 'false',
              frames: ['ASH_TRAY-1',]},                {
              name: 'HALF_FULL',
              transition: 'false',
              frames: ['ASH_TRAY-2',]},],

          interactions: {
                                  },
    },
          BARBER_POLE: {
        name: 'Barber Pole Sign',
        slug: 'BARBER_POLE', 
        type: 'LIT_SIGN',
        bounding: {
          h:3, 
          w:2
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:4
        },
        depth: 0,
        sprite: {
          h:48, 
          w:24,
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
        varieties: 16,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'ON',        states: [                {
              name: 'OFF',
              transition: 'false',
              frames: ['BARBER_POLE-16',]},                {
              name: 'ON',
              transition: 'false',
              frames: ['BARBER_POLE-1','BARBER_POLE-2','BARBER_POLE-3','BARBER_POLE-4','BARBER_POLE-5','BARBER_POLE-6','BARBER_POLE-7','BARBER_POLE-8','BARBER_POLE-9','BARBER_POLE-10','BARBER_POLE-11','BARBER_POLE-12','BARBER_POLE-13','BARBER_POLE-14','BARBER_POLE-15','BARBER_POLE-16',]},                {
              name: 'FLICKERING',
              transition: 'false',
              frames: ['BARBER_POLE-1','BARBER_POLE-2','BARBER_POLE-3','BARBER_POLE-4','BARBER_POLE-5','BARBER_POLE-6','BARBER_POLE-7','BARBER_POLE-8','BARBER_POLE-9','BARBER_POLE-10','BARBER_POLE-11','BARBER_POLE-12','BARBER_POLE-13','BARBER_POLE-14','BARBER_POLE-15','BARBER_POLE-16',]},],

          interactions: {
                                  },
    },
          BASEMENT_WINDOW: {
        name: 'Basement Window',
        slug: 'BASEMENT_WINDOW', 
        type: 'BASEMENT_WINDOW',
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
          h:12, 
          w:28
        },
        offset: {
          x:2, 
          y:2
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        depth: -4,
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
        loot: [
                  ],
        actions: [],
        default_state: 'FULL',        states: [                {
              name: 'FULL',
              transition: 'false',
              frames: ['BASKET_RACK-6',]},                {
              name: 'EMPTY',
              transition: 'false',
              frames: ['BASKET_RACK-1',]},],

          interactions: {
                                  },
    },
          BED_1: {
        name: 'Bed 1',
        slug: 'BED_1', 
        type: 'BED',
        bounding: {
          h:6, 
          w:3
        },
        base: {
          h:4, 
          w:3,
          x:0, 
          y:2
        },
        depth: -12,
        sprite: {
          h:96, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:60, 
          w:48
        },
        offset: {
          x:0, 
          y:24
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          SIGN_BACK_BLUE_10: {
        name: 'Blue Storefront Sign Background',
        slug: 'SIGN_BACK_BLUE_10', 
        type: 'STOREFRONT_SIGN_BACKGROUND',
        bounding: {
          h:2, 
          w:10
        },
        base: {
          h:2, 
          w:10,
          x:0, 
          y:0
        },
        depth: -1,
        sprite: {
          h:27, 
          w:160,
          x:0, 
          y:0
        },
        size: {
          h:27, 
          w:160
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          LAMP_BLUE_TABLE: {
        name: 'Blue Table Lamp',
        slug: 'LAMP_BLUE_TABLE', 
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
        loot: [
                  ],
        actions: [ {
            name: 'TURN ON', stateTrigger: 'TURNING_ON', validStates: ['OFF']
          }, {
            name: 'TURN OFF', stateTrigger: 'TURNING_OFF', validStates: ['ON']
          }],
        default_state: 'ON',        states: [            {
              name: 'OFF',
              transition: 'false',
              frames: ['LAMP_BLUE_TABLE-5',]
              },               {
              name: 'TURNING_ON',
              transition: 'ON',
              frames: ['LAMP_BLUE_TABLE-5', 'LAMP_BLUE_TABLE-4', ]
              },            {
              name: 'ON',
              transition: 'false',
              frames: ['LAMP_BLUE_TABLE-4',]
              },               {
              name: 'TURNING_OFF',
              transition: 'OFF',
              frames: ['LAMP_BLUE_TABLE-4', 'LAMP_BLUE_TABLE-5', ]
              },],

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
        loot: [
                  ],
        actions: [],
        default_state: 'SWAYING',        states: [                {
              name: 'SWAYING',
              transition: 'false',
              frames: ['BEADED_CURTAIN_BODEGA-1','BEADED_CURTAIN_BODEGA-2','BEADED_CURTAIN_BODEGA-3','BEADED_CURTAIN_BODEGA-4','BEADED_CURTAIN_BODEGA-5','BEADED_CURTAIN_BODEGA-3','BEADED_CURTAIN_BODEGA-4','BEADED_CURTAIN_BODEGA-2',]},                {
              name: 'BISECTED',
              transition: 'false',
              frames: ['BEADED_CURTAIN_BODEGA-6','BEADED_CURTAIN_BODEGA-7','BEADED_CURTAIN_BODEGA-8',]},                {
              name: 'CLOSE_BISECT',
              transition: 'false',
              frames: ['BEADED_CURTAIN_BODEGA-7','BEADED_CURTAIN_BODEGA-8','BEADED_CURTAIN_BODEGA-9','BEADED_CURTAIN_BODEGA-7','BEADED_CURTAIN_BODEGA-6','BEADED_CURTAIN_BODEGA-5',]},                {
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
        depth: -4,
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'ON',        states: [                {
              name: 'OFF',
              transition: 'false',
              frames: ['LIT_SIGN_BONEDEGA-1',]},                {
              name: 'ON',
              transition: 'false',
              frames: ['LIT_SIGN_BONEDEGA-2',]},                {
              name: 'FLICKERING',
              transition: 'false',
              frames: ['LIT_SIGN_BONEDEGA-1','LIT_SIGN_BONEDEGA-2','LIT_SIGN_BONEDEGA-2','LIT_SIGN_BONEDEGA-1','LIT_SIGN_BONEDEGA-2',]},],

          interactions: {
                                  },
    },
          STORE_COUNTER_BONEDEGA_1: {
        name: 'Bonedega Store Counter 1',
        slug: 'STORE_COUNTER_BONEDEGA_1', 
        type: 'STORE_COUNTER',
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
        depth: -8,
        sprite: {
          h:64, 
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
          y:48
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          STORE_COUNTER_BONEDEGA_3: {
        name: 'Bonedega Store Counter 3',
        slug: 'STORE_COUNTER_BONEDEGA_3', 
        type: 'STORE_COUNTER',
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
        depth: -8,
        sprite: {
          h:64, 
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
          y:48
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          BRANCH_3X1: {
        name: 'Branch 3x1',
        slug: 'BRANCH_3X1', 
        type: 'BRANCH',
        bounding: {
          h:1, 
          w:3
        },
        base: {
          h:1, 
          w:3,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:16, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:6, 
          w:40
        },
        offset: {
          x:4, 
          y:5
        },
        varieties: 3,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          BRANCH_5X2: {
        name: 'Branch 5x2',
        slug: 'BRANCH_5X2', 
        type: 'BRANCH',
        bounding: {
          h:2, 
          w:5
        },
        base: {
          h:2, 
          w:5,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:32, 
          w:80,
          x:0, 
          y:0
        },
        size: {
          h:6, 
          w:48
        },
        offset: {
          x:20, 
          y:12
        },
        varieties: 2,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          CURTAIN_SINGLE_BROWN: {
        name: 'Brown Single Window Curtains',
        slug: 'CURTAIN_SINGLE_BROWN', 
        type: 'WINDOW_COVERING',
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          CHAINLINK_S_5_OPEN: {
        name: 'Chainlink 5 Open',
        slug: 'CHAINLINK_S_5_OPEN', 
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          CHAINLINK_S_4_VERTICAL_COMPLETE: {
        name: 'Chainlink Fence 4 Vertical',
        slug: 'CHAINLINK_S_4_VERTICAL_COMPLETE', 
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [ {
            name: 'INSERT COIN', stateTrigger: 'COIN_DISPENSING', validStates: ['COIN_LOCKED']
          }],
        default_state: 'COIN_LOCKED',        states: [                {
              name: 'COIN_LOCKED',
              transition: 'false',
              frames: ['SPECIAL_NEWS_BOX_-1',]},                {
              name: 'COIN_DISPENSING',
              transition: 'COIN_RETRACTING',
              frames: ['SPECIAL_NEWS_BOX_-2','SPECIAL_NEWS_BOX_-3','SPECIAL_NEWS_BOX_-4','SPECIAL_NEWS_BOX_-5','SPECIAL_NEWS_BOX_-6',]},                {
              name: 'COIN_RETRACTING',
              transition: 'COIN_LOCKED',
              frames: ['SPECIAL_NEWS_BOX_-6','SPECIAL_NEWS_BOX_-5','SPECIAL_NEWS_BOX_-4','SPECIAL_NEWS_BOX_-3','SPECIAL_NEWS_BOX_-2','SPECIAL_NEWS_BOX_-1',]},                           ],

          interactions: {
                                            group_29: {
                req_group: 29,
                req_group_name: 'Newspaper Box Town',
                req_pocket_action: '',
                req_world_action: 'INSERT COIN',
                req_state: 'coin_locked',
                req_result_item: 'NEWSPAPER',
                req_result_data_key: '',
                req_result_data_set: '',
                req_result_data_modify: '',
                req_result_texture: '',
                req_result_fx: '',
                req_result_ground: '',
                requires: [
                  {
                    slot_type: 'IN_COINPURSE',
                    type: 'MONEY',
                    result: 'CONSUMED',
                    MONEY: '25',
                    },
                  {
                    slot_type: 'ON_ACTIVE',
                    type: 'OBJ_TYPE',
                    result: 'UNTOUCHED',
                    OBJ_TYPE: 'NEWSPAPER_BOX_'
                    }
                                ]

            },                      },
    },
          COIN_WASH_SIGN: {
        name: 'Coin Wash',
        slug: 'COIN_WASH_SIGN', 
        type: 'STOREFRONT_FRAME_SIGN',
        bounding: {
          h:2, 
          w:9
        },
        base: {
          h:2, 
          w:9,
          x:0, 
          y:0
        },
        depth: 0,
        sprite: {
          h:26, 
          w:139,
          x:0, 
          y:0
        },
        size: {
          h:26, 
          w:139
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['LAUNDRY_COMMERCIAL_DRYER-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['LAUNDRY_COMMERCIAL_DRYER-1', 'LAUNDRY_COMMERCIAL_DRYER-2', 'LAUNDRY_COMMERCIAL_DRYER-3', 'LAUNDRY_COMMERCIAL_DRYER-4', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['LAUNDRY_COMMERCIAL_DRYER-4',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['LAUNDRY_COMMERCIAL_DRYER-4', 'LAUNDRY_COMMERCIAL_DRYER-3', 'LAUNDRY_COMMERCIAL_DRYER-2', 'LAUNDRY_COMMERCIAL_DRYER-1', ]
              },                           {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['LAUNDRY_COMMERCIAL_DRYER-3', ]
              },],            slots: 0,
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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [                {
              name: 'SHELL',
              transition: 'false',
              frames: ['COMMERCIAL_FREEZER-1',]},            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['COMMERCIAL_FREEZER-2',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['COMMERCIAL_FREEZER-2', 'COMMERCIAL_FREEZER-3', 'COMMERCIAL_FREEZER-4', 'COMMERCIAL_FREEZER-5', 'COMMERCIAL_FREEZER-6', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['COMMERCIAL_FREEZER-6',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['COMMERCIAL_FREEZER-6', 'COMMERCIAL_FREEZER-5', 'COMMERCIAL_FREEZER-4', 'COMMERCIAL_FREEZER-3', 'COMMERCIAL_FREEZER-2', ]
              },],

          interactions: {
                                  },
    },
          CONE_FALLEN: {
        name: 'Cone Fallen',
        slug: 'CONE_FALLEN', 
        type: 'TRAFFIC_BARRIER',
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          CONE_UPRIGHT: {
        name: 'Cone Upright',
        slug: 'CONE_UPRIGHT', 
        type: 'TRAFFIC_BARRIER',
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          COUNTER_BELL: {
        name: 'Counter Bell',
        slug: 'COUNTER_BELL', 
        type: 'COUNTER_BELL',
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
          h:9, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:4, 
          w:6
        },
        offset: {
          x:8, 
          y:2
        },
        varieties: 2,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [ {
            name: 'RING', stateTrigger: 'RINGING', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [                {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['COUNTER_BELL-1',]},                           {
              name: 'RINGING',
              transition: 'DEFAULT',
              frames: ['COUNTER_BELL-2', 'COUNTER_BELL-2', 'COUNTER_BELL-1', ]
              },],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [ {
            name: 'HARVEST', stateTrigger: 'HARVEST', validStates: ['HARVESTABLE']
          }],
        default_state: 'HARVESTABLE',        states: [                {
              name: 'HARVESTED',
              transition: 'false',
              frames: ['CREEK_SEDGE-5',]},                {
              name: 'HARVEST',
              transition: 'HARVESTED',
              frames: ['CREEK_SEDGE-4','CREEK_SEDGE-5',]},                {
              name: 'HARVESTABLE',
              transition: 'false',
              frames: ['CREEK_SEDGE-1','CREEK_SEDGE-2','CREEK_SEDGE-3','CREEK_SEDGE-4',]},                           ],

          interactions: {
                                  },
    },
          WOOD_SIDE_TABLE_NO_DRAWER: {
        name: 'Decorative Wood Side Table',
        slug: 'WOOD_SIDE_TABLE_NO_DRAWER', 
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
        depth: -6,
        sprite: {
          h:32, 
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
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'NO_DRAWER',        states: [                {
              name: 'DEFAULT',
              transition: 'false',
              frames: []},                {
              name: 'NO_DRAWER',
              transition: 'false',
              frames: ['WOOD_SIDE_TABLE_NO_DRAWER-1',]},            {
              name: 'CLOSED',
              transition: 'false',
              frames: []
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: []
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: []
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: []
              },                           {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: []
              },],            slots: 4,
            items: [],

          interactions: {
                                  },
    },
          DINER_TABLE: {
        name: 'Diner Table',
        slug: 'DINER_TABLE', 
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
        depth: -16,
        sprite: {
          h:48, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:24, 
          w:28
        },
        offset: {
          x:2, 
          y:12
        },
        varieties: 3,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        depth: -12,
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
        loot: [
                  ],
        actions: [ {
            name: 'LOOK UNDER', stateTrigger: 'LOOKING_UNDER', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['DOORMAT_1-1',]
              },               {
              name: 'LOOKING_UNDER',
              transition: 'DEFAULT',
              frames: ['DOORMAT_1-1', 'DOORMAT_1-2', 'DOORMAT_1-3', 'DOORMAT_1-2', 'DOORMAT_1-1', ]
              },],

          interactions: {
                                  },
    },
          DOORMAT_2: {
        name: 'Doormat 2',
        slug: 'DOORMAT_2', 
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
        depth: -12,
        sprite: {
          h:16, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:24
        },
        offset: {
          x:4, 
          y:4
        },
        varieties: 3,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [ {
            name: 'LOOK UNDER', stateTrigger: 'LOOKING_UNDER', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['DOORMAT_2-1',]
              },               {
              name: 'LOOKING_UNDER',
              transition: 'DEFAULT',
              frames: ['DOORMAT_2-1', 'DOORMAT_2-2', 'DOORMAT_2-3', 'DOORMAT_2-3', 'DOORMAT_2-2', 'DOORMAT_2-1', ]
              },],

          interactions: {
                                  },
    },
          DOORMAT_3: {
        name: 'Doormat 3',
        slug: 'DOORMAT_3', 
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
        depth: -12,
        sprite: {
          h:16, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:24
        },
        offset: {
          x:4, 
          y:4
        },
        varieties: 3,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [ {
            name: 'LOOK UNDER', stateTrigger: 'LOOKING_UNDER', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['DOORMAT_3-1',]
              },               {
              name: 'LOOKING_UNDER',
              transition: 'DEFAULT',
              frames: ['DOORMAT_3-1', 'DOORMAT_3-2', 'DOORMAT_3-3', 'DOORMAT_3-3', 'DOORMAT_3-2', 'DOORMAT_3-1', ]
              },],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          DRESSER_1: {
        name: 'Dresser 1',
        slug: 'DRESSER_1', 
        type: 'DRESSER',
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
        depth: -4,
        sprite: {
          h:32, 
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
          y:12
        },
        varieties: 4,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['DRESSER_1-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['DRESSER_1-1', 'DRESSER_1-2', 'DRESSER_1-3', 'DRESSER_1-4', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['DRESSER_1-4',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['DRESSER_1-4', 'DRESSER_1-3', 'DRESSER_1-2', 'DRESSER_1-1', ]
              },                           {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['DRESSER_1-4', ]
              },],            slots: 4,
            items: [],

          interactions: {
                                  },
    },
          DRESSER_MIRROR: {
        name: 'Dresser Mirror',
        slug: 'DRESSER_MIRROR', 
        type: 'MIRROR',
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
          h:16, 
          w:32
        },
        offset: {
          x:0, 
          y:24
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['CLOSED']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_GRAY-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_WINDOWS_GRAY-2', 'EXT_DOOR_WINDOWS_GRAY-3', 'EXT_DOOR_WINDOWS_GRAY-4', 'EXT_DOOR_WINDOWS_GRAY-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_GRAY-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_WINDOWS_GRAY-4', 'EXT_DOOR_WINDOWS_GRAY-3', 'EXT_DOOR_WINDOWS_GRAY-2', 'EXT_DOOR_WINDOWS_GRAY-1', ]
              },                           {
              name: 'KNOCKING',
              transition: 'CLOSED',
              frames: []
              },],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['CLOSED']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_GREEN-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_WINDOWS_GREEN-2', 'EXT_DOOR_WINDOWS_GREEN-3', 'EXT_DOOR_WINDOWS_GREEN-4', 'EXT_DOOR_WINDOWS_GREEN-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_GREEN-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_WINDOWS_GREEN-4', 'EXT_DOOR_WINDOWS_GREEN-3', 'EXT_DOOR_WINDOWS_GREEN-2', 'EXT_DOOR_WINDOWS_GREEN-1', ]
              },                           {
              name: 'KNOCKING',
              transition: 'CLOSED',
              frames: []
              },],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['CLOSED']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_WHITE-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_WINDOWS_WHITE-2', 'EXT_DOOR_WINDOWS_WHITE-3', 'EXT_DOOR_WINDOWS_WHITE-4', 'EXT_DOOR_WINDOWS_WHITE-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_WHITE-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_WINDOWS_WHITE-4', 'EXT_DOOR_WINDOWS_WHITE-3', 'EXT_DOOR_WINDOWS_WHITE-2', 'EXT_DOOR_WINDOWS_WHITE-1', ]
              },                           {
              name: 'KNOCKING',
              transition: 'CLOSED',
              frames: []
              },],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'KNOCK', stateTrigger: 'KNOCKING', validStates: ['CLOSED']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_YELLOW-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_WINDOWS_YELLOW-2', 'EXT_DOOR_WINDOWS_YELLOW-3', 'EXT_DOOR_WINDOWS_YELLOW-4', 'EXT_DOOR_WINDOWS_YELLOW-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_WINDOWS_YELLOW-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_WINDOWS_YELLOW-4', 'EXT_DOOR_WINDOWS_YELLOW-3', 'EXT_DOOR_WINDOWS_YELLOW-2', 'EXT_DOOR_WINDOWS_YELLOW-1', ]
              },                           {
              name: 'KNOCKING',
              transition: 'CLOSED',
              frames: []
              },],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_STOOP_1-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_STORE_STOOP_1-1', 'EXT_DOOR_STORE_STOOP_1-2', 'EXT_DOOR_STORE_STOOP_1-3', 'EXT_DOOR_STORE_STOOP_1-4', 'EXT_DOOR_STORE_STOOP_1-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_STOOP_1-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_STORE_STOOP_1-5', 'EXT_DOOR_STORE_STOOP_1-4', 'EXT_DOOR_STORE_STOOP_1-3', 'EXT_DOOR_STORE_STOOP_1-2', 'EXT_DOOR_STORE_STOOP_1-1', ]
              },],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_BLACK-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_STORE_BLACK-2', 'EXT_DOOR_STORE_BLACK-3', 'EXT_DOOR_STORE_BLACK-4', 'EXT_DOOR_STORE_BLACK-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_BLACK-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_STORE_BLACK-4', 'EXT_DOOR_STORE_BLACK-3', 'EXT_DOOR_STORE_BLACK-2', 'EXT_DOOR_STORE_BLACK-1', ]
              },],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_METAL-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_STORE_METAL-2', 'EXT_DOOR_STORE_METAL-3', 'EXT_DOOR_STORE_METAL-4', 'EXT_DOOR_STORE_METAL-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_METAL-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_STORE_METAL-4', 'EXT_DOOR_STORE_METAL-3', 'EXT_DOOR_STORE_METAL-2', 'EXT_DOOR_STORE_METAL-1', ]
              },],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_WHITE-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['EXT_DOOR_STORE_WHITE-2', 'EXT_DOOR_STORE_WHITE-3', 'EXT_DOOR_STORE_WHITE-4', 'EXT_DOOR_STORE_WHITE-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['EXT_DOOR_STORE_WHITE-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['EXT_DOOR_STORE_WHITE-4', 'EXT_DOOR_STORE_WHITE-3', 'EXT_DOOR_STORE_WHITE-2', 'EXT_DOOR_STORE_WHITE-1', ]
              },],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_2_GRAND_GREEN: {
        name: 'Ext Window 2 Grand Green',
        slug: 'EXT_WINDOW_2_GRAND_GREEN', 
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
          h:28, 
          w:26
        },
        offset: {
          x:3, 
          y:10
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_2_GRAND_WHITE: {
        name: 'Ext Window 2 Grand White',
        slug: 'EXT_WINDOW_2_GRAND_WHITE', 
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
          h:28, 
          w:26
        },
        offset: {
          x:3, 
          y:10
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_2_GRAND_WOOD: {
        name: 'Ext Window 2 Grand Wood',
        slug: 'EXT_WINDOW_2_GRAND_WOOD', 
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
          h:28, 
          w:26
        },
        offset: {
          x:3, 
          y:10
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_2_SINGLE_BLUE: {
        name: 'Ext Window 2 Single Blue',
        slug: 'EXT_WINDOW_2_SINGLE_BLUE', 
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
          h:39, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:22, 
          w:17
        },
        offset: {
          x:8, 
          y:15
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_2_SINGLE_BROWN: {
        name: 'Ext Window 2 Single Brown',
        slug: 'EXT_WINDOW_2_SINGLE_BROWN', 
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
          h:39, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:22, 
          w:17
        },
        offset: {
          x:8, 
          y:15
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_2_SINGLE_CREAM: {
        name: 'Ext Window 2 Single Cream',
        slug: 'EXT_WINDOW_2_SINGLE_CREAM', 
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
          h:39, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:22, 
          w:17
        },
        offset: {
          x:8, 
          y:15
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_2_SINGLE_GREEN: {
        name: 'Ext Window 2 Single Green',
        slug: 'EXT_WINDOW_2_SINGLE_GREEN', 
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
          h:39, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:22, 
          w:17
        },
        offset: {
          x:8, 
          y:15
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_2_SINGLE_RED: {
        name: 'Ext Window 2 Single Red',
        slug: 'EXT_WINDOW_2_SINGLE_RED', 
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
          h:39, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:22, 
          w:17
        },
        offset: {
          x:8, 
          y:15
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_2_SINGLE_WEATHERED: {
        name: 'Ext Window 2 Single Weathered',
        slug: 'EXT_WINDOW_2_SINGLE_WEATHERED', 
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
          h:39, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:22, 
          w:17
        },
        offset: {
          x:8, 
          y:15
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          EXT_WINDOW_2_SINGLE_YELLOW: {
        name: 'Ext Window 2 Single Yellow',
        slug: 'EXT_WINDOW_2_SINGLE_YELLOW', 
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
          h:39, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:22, 
          w:17
        },
        offset: {
          x:8, 
          y:15
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          EXT_STORE_WALL_LIGHT: {
        name: 'Exterior Store Wall Light',
        slug: 'EXT_STORE_WALL_LIGHT', 
        type: 'EXT_STORE_LIGHT',
        bounding: {
          h:1, 
          w:2
        },
        base: {
          h:1, 
          w:1,
          x:1, 
          y:0
        },
        depth: 0,
        sprite: {
          h:17, 
          w:23,
          x:0, 
          y:0
        },
        size: {
          h:4, 
          w:4
        },
        offset: {
          x:4, 
          y:10
        },
        varieties: 2,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          DECOR_FRAME_1: {
        name: 'Framed Picture 1',
        slug: 'DECOR_FRAME_1', 
        type: 'DECOR_ART',
        bounding: {
          h:1, 
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          DECOR_FRAME_GROUP_1: {
        name: 'Framed Picture Group 1',
        slug: 'DECOR_FRAME_GROUP_1', 
        type: 'DECOR_ART',
        bounding: {
          h:1, 
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          FRIDGE: {
        name: 'Fridge 1',
        slug: 'FRIDGE', 
        type: 'FRIDGE',
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
          h:16, 
          w:24
        },
        offset: {
          x:8, 
          y:28
        },
        varieties: 4,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['FRIDGE-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['FRIDGE-1', 'FRIDGE-2', 'FRIDGE-3', 'FRIDGE-4', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['FRIDGE-4',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['FRIDGE-4', 'FRIDGE-3', 'FRIDGE-2', 'FRIDGE-1', ]
              },],            slots: 0,
            items: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [ {
            name: 'READ', stateTrigger: 'READING', validStates: ['DEFAULT']
          }, {
            name: 'GUST', stateTrigger: 'GUSTING', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_GRAY-1',]
              },               {
              name: 'READING',
              transition: 'DEFAULT',
              frames: []
              },                           {
              name: 'GUSTING',
              transition: 'DEFAULT',
              frames: ['OBJ_FLYER_GRAY-1', 'OBJ_FLYER_GRAY-2', 'OBJ_FLYER_GRAY-3', 'OBJ_FLYER_GRAY-4', 'OBJ_FLYER_GRAY-5', 'OBJ_FLYER_GRAY-6', 'OBJ_FLYER_GRAY-7', 'OBJ_FLYER_GRAY-8', ]
              },],

          interactions: {
                                  },
    },
          DINER_BOOTH_GREEN_N: {
        name: 'Green Diner Booth North',
        slug: 'DINER_BOOTH_GREEN_N', 
        type: 'BOOTH_SEAT',
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
          h:2, 
          w:32
        },
        offset: {
          x:0, 
          y:30
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          DINER_BOOTH_GREEN_S: {
        name: 'Green Diner Booth South',
        slug: 'DINER_BOOTH_GREEN_S', 
        type: 'BOOTH_SEAT',
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
        depth: 1,
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:2, 
          w:32
        },
        offset: {
          x:0, 
          y:8
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          CURTAIN_SINGLE_GREEN: {
        name: 'Green Single Window Curtains',
        slug: 'CURTAIN_SINGLE_GREEN', 
        type: 'WINDOW_COVERING',
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          SIGN_BACK_GREEN_10: {
        name: 'Green Storefront Sign Background',
        slug: 'SIGN_BACK_GREEN_10', 
        type: 'STOREFRONT_SIGN_BACKGROUND',
        bounding: {
          h:2, 
          w:10
        },
        base: {
          h:2, 
          w:10,
          x:0, 
          y:0
        },
        depth: -1,
        sprite: {
          h:27, 
          w:160,
          x:0, 
          y:0
        },
        size: {
          h:27, 
          w:160
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          HOME_PHONE_WALL_MOUNTED: {
        name: 'Home Phone Wall Mounted',
        slug: 'HOME_PHONE_WALL_MOUNTED', 
        type: 'PHONE',
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
          y:0
        },
        varieties: 4,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [ {
            name: 'ANSWER', stateTrigger: 'ANSWERING', validStates: ['RINGING']
          }, {
            name: 'HANG UP', stateTrigger: 'HANGING_UP', validStates: ['AWAITING_DIAL','AWAITING_PAYMENT','CALLING','DIALING','ON_PHONE']
          }, {
            name: 'DIAL', stateTrigger: 'DIALING', validStates: ['AWAITING_DIAL']
          }, {
            name: 'USE PHONE', stateTrigger: 'AWAITING_DIAL', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [                {
              name: 'ON_PHONE',
              transition: 'false',
              frames: ['HOME_PHONE_WALL_MOUNTED-1',]},            {
              name: 'RINGING',
              transition: 'DEFAULT',
              frames: ['HOME_PHONE_WALL_MOUNTED-2','HOME_PHONE_WALL_MOUNTED-4','HOME_PHONE_WALL_MOUNTED-3','HOME_PHONE_WALL_MOUNTED-4','HOME_PHONE_WALL_MOUNTED-3','HOME_PHONE_WALL_MOUNTED-4','HOME_PHONE_WALL_MOUNTED-3','HOME_PHONE_WALL_MOUNTED-4','HOME_PHONE_WALL_MOUNTED-2','HOME_PHONE_WALL_MOUNTED-2',]
              },               {
              name: 'ANSWERING',
              transition: 'DEFAULT',
              frames: ['HOME_PHONE_WALL_MOUNTED-1', ]
              },            {
              name: 'AWAITING_DIAL',
              transition: 'false',
              frames: []
              }, {
              name: 'AWAITING_PAYMENT',
              transition: 'false',
              frames: []
              }, {
              name: 'CALLING',
              transition: 'false',
              frames: ['HOME_PHONE_WALL_MOUNTED-1',]
              }, {
              name: 'DIALING',
              transition: 'CALLING',
              frames: ['HOME_PHONE_WALL_MOUNTED-1',]
              },                {
              name: 'HANGING_UP',
              transition: 'DEFAULT',
              frames: ['HOME_PHONE_WALL_MOUNTED-4', 'HOME_PHONE_WALL_MOUNTED-3', 'HOME_PHONE_WALL_MOUNTED-2', ]
              },                                       {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['HOME_PHONE_WALL_MOUNTED-2',]
              },               ],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['INT_DOOR_GREEN-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['INT_DOOR_GREEN-2', 'INT_DOOR_GREEN-3', 'INT_DOOR_GREEN-4', 'INT_DOOR_GREEN-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['INT_DOOR_GREEN-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['INT_DOOR_GREEN-4', 'INT_DOOR_GREEN-3', 'INT_DOOR_GREEN-2', 'INT_DOOR_GREEN-1', ]
              },],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['INT_DOOR_GREEN_SIGN-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['INT_DOOR_GREEN_SIGN-2', 'INT_DOOR_GREEN_SIGN-3', 'INT_DOOR_GREEN_SIGN-4', 'INT_DOOR_GREEN_SIGN-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['INT_DOOR_GREEN_SIGN-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['INT_DOOR_GREEN_SIGN-4', 'INT_DOOR_GREEN_SIGN-3', 'INT_DOOR_GREEN_SIGN-2', 'INT_DOOR_GREEN_SIGN-1', ]
              },],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['INT_DOOR_RED_BROWN-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['INT_DOOR_RED_BROWN-2', 'INT_DOOR_RED_BROWN-3', 'INT_DOOR_RED_BROWN-4', 'INT_DOOR_RED_BROWN-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['INT_DOOR_RED_BROWN-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['INT_DOOR_RED_BROWN-4', 'INT_DOOR_RED_BROWN-3', 'INT_DOOR_RED_BROWN-2', 'INT_DOOR_RED_BROWN-1', ]
              },],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['INT_DOOR_RED_BROWN_SIGN-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['INT_DOOR_RED_BROWN_SIGN-2', 'INT_DOOR_RED_BROWN_SIGN-3', 'INT_DOOR_RED_BROWN_SIGN-4', 'INT_DOOR_RED_BROWN_SIGN-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['INT_DOOR_RED_BROWN_SIGN-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['INT_DOOR_RED_BROWN_SIGN-4', 'INT_DOOR_RED_BROWN_SIGN-3', 'INT_DOOR_RED_BROWN_SIGN-2', 'INT_DOOR_RED_BROWN_SIGN-1', ]
              },],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['INT_DOOR_WHITE-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['INT_DOOR_WHITE-2', 'INT_DOOR_WHITE-3', 'INT_DOOR_WHITE-4', 'INT_DOOR_WHITE-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['INT_DOOR_WHITE-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['INT_DOOR_WHITE-4', 'INT_DOOR_WHITE-3', 'INT_DOOR_WHITE-2', 'INT_DOOR_WHITE-1', ]
              },],

          interactions: {
                                  },
    },
          INT_DOOR_SIDE_WHITE: {
        name: 'Int Side Door White',
        slug: 'INT_DOOR_SIDE_WHITE', 
        type: 'INT_DOOR_',
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
          h:64, 
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
        varieties: 7,
        solid: 0,
        portal: 1,
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        default_state: 'DEFAULT',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['INT_DOOR_SIDE_WHITE-7',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['INT_DOOR_SIDE_WHITE-7', 'INT_DOOR_SIDE_WHITE-6', 'INT_DOOR_SIDE_WHITE-5', 'INT_DOOR_SIDE_WHITE-4', 'INT_DOOR_SIDE_WHITE-3', 'INT_DOOR_SIDE_WHITE-2', 'INT_DOOR_SIDE_WHITE-1', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['INT_DOOR_SIDE_WHITE-1',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['INT_DOOR_SIDE_WHITE-1', 'INT_DOOR_SIDE_WHITE-2', 'INT_DOOR_SIDE_WHITE-3', 'INT_DOOR_SIDE_WHITE-4', 'INT_DOOR_SIDE_WHITE-5', 'INT_DOOR_SIDE_WHITE-6', 'INT_DOOR_SIDE_WHITE-7', ]
              },],

          interactions: {
                                  },
    },
          DECOR_VENT: {
        name: 'Interior Vent',
        slug: 'DECOR_VENT', 
        type: 'DECOR_ART',
        bounding: {
          h:1, 
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          KITCHEN_SINK: {
        name: 'Kitchen Sink',
        slug: 'KITCHEN_SINK', 
        type: 'SINK',
        bounding: {
          h:1, 
          w:1
        },
        base: {
          h:1, 
          w:1,
          x:0, 
          y:1
        },
        depth: 33,
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
        loot: [
                  ],
        actions: [ {
            name: 'TURN ON', stateTrigger: 'TURNING_ON', validStates: ['OFF']
          }, {
            name: 'TURN OFF', stateTrigger: 'TURNING_OFF', validStates: ['ON']
          }],
        default_state: 'OFF',        states: [            {
              name: 'OFF',
              transition: 'false',
              frames: ['KITCHEN_SINK-1',]
              },               {
              name: 'TURNING_ON',
              transition: 'ON',
              frames: ['KITCHEN_SINK-1', 'KITCHEN_SINK-2', 'KITCHEN_SINK-3', 'KITCHEN_SINK-4', ]
              },            {
              name: 'ON',
              transition: 'false',
              frames: ['KITCHEN_SINK-2','KITCHEN_SINK-3','KITCHEN_SINK-4',]
              },               {
              name: 'TURNING_OFF',
              transition: 'OFF',
              frames: ['KITCHEN_SINK-3', 'KITCHEN_SINK-2', 'KITCHEN_SINK-1', ]
              },],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'ON',        states: [                {
              name: 'OFF',
              transition: 'false',
              frames: ['NEON_KEY-1',]},                {
              name: 'ON',
              transition: 'false',
              frames: ['NEON_KEY-2','NEON_KEY-2','NEON_KEY-2','NEON_KEY-2','NEON_KEY-3','NEON_KEY-3','NEON_KEY-3','NEON_KEY-4','NEON_KEY-4','NEON_KEY-4','NEON_KEY-5','NEON_KEY-5','NEON_KEY-5','NEON_KEY-6','NEON_KEY-6','NEON_KEY-6',]},                {
              name: 'FLICKERING',
              transition: 'false',
              frames: ['NEON_KEY-2','NEON_KEY-2','NEON_KEY-1','NEON_KEY-2','NEON_KEY-3','NEON_KEY-3','NEON_KEY-1','NEON_KEY-1','NEON_KEY-4','NEON_KEY-4','NEON_KEY-5','NEON_KEY-5','NEON_KEY-5','NEON_KEY-6','NEON_KEY-1','NEON_KEY-6',]},],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [                {
              name: 'DEFAULT',
              transition: 'false',
              frames: []},                {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['MAILBOX_SHINY-5',]},            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['MAILBOX_SHINY-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['MAILBOX_SHINY-1', 'MAILBOX_SHINY-2', 'MAILBOX_SHINY-3', 'MAILBOX_SHINY-4', 'MAILBOX_SHINY-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_SHINY-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['MAILBOX_SHINY-5', 'MAILBOX_SHINY-4', 'MAILBOX_SHINY-3', 'MAILBOX_SHINY-2', 'MAILBOX_SHINY-1', ]
              },                           ],            slots: 4,
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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [                {
              name: 'DEFAULT',
              transition: 'false',
              frames: []},                {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['MAILBOX_SLEEK-5',]},            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['MAILBOX_SLEEK-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['MAILBOX_SLEEK-1', 'MAILBOX_SLEEK-2', 'MAILBOX_SLEEK-3', 'MAILBOX_SLEEK-4', 'MAILBOX_SLEEK-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_SLEEK-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['MAILBOX_SLEEK-5', 'MAILBOX_SLEEK-4', 'MAILBOX_SLEEK-3', 'MAILBOX_SLEEK-2', 'MAILBOX_SLEEK-1', ]
              },                           ],            slots: 4,
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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [                {
              name: 'DEFAULT',
              transition: 'false',
              frames: []},                {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['MAILBOX_WEATHERED-5',]},            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['MAILBOX_WEATHERED-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['MAILBOX_WEATHERED-1', 'MAILBOX_WEATHERED-2', 'MAILBOX_WEATHERED-3', 'MAILBOX_WEATHERED-4', 'MAILBOX_WEATHERED-5', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['MAILBOX_WEATHERED-5',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['MAILBOX_WEATHERED-5', 'MAILBOX_WEATHERED-4', 'MAILBOX_WEATHERED-3', 'MAILBOX_WEATHERED-2', 'MAILBOX_WEATHERED-1', ]
              },                           ],            slots: 4,
            items: [],

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
        depth: -8,
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
        loot: [
                  ],
        actions: [ {
            name: 'TURN EAST', stateTrigger: 'FACING_EAST', validStates: ['FACING_NORTH','FACING_SOUTH','FACING_WEST']
          }, {
            name: 'TURN WEST', stateTrigger: 'FACING_WEST', validStates: ['FACING_EAST','FACING_NORTH','FACING_SOUTH']
          }, {
            name: 'TURN NORTH', stateTrigger: 'FACING_NORTH', validStates: ['FACING_EAST','FACING_SOUTH','FACING_WEST']
          }, {
            name: 'TURN SOUTH', stateTrigger: 'FACING_SOUTH', validStates: ['FACING_EAST','FACING_NORTH','FACING_WEST']
          }],
        default_state: 'FACING_SOUTH',        states: [            {
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
              },               {
              name: 'FACING_EAST',
              transition: 'false',
              frames: ['DINER_CHAIR_MAROON-1', ]
              },                                                                                       ],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [ {
            name: 'FLIP ONTO BOTTOM', stateTrigger: 'FLIPPING_ONTO_BOTTOM', validStates: ['FLIPPED_ONTO_TOP']
          }, {
            name: 'FLIP ONTO TOP', stateTrigger: 'FLIPPING_ONTO_TOP', validStates: ['FLIPPED_ONTO_BOTTOM']
          }],
        default_state: 'FLIPPED_ONTO_BOTTOM',        states: [            {
              name: 'FLIPPED_ONTO_TOP',
              transition: 'false',
              frames: ['MILK_CRATE-2',]
              },               {
              name: 'FLIPPING_ONTO_BOTTOM',
              transition: 'FLIPPED_ONTO_BOTTOM',
              frames: ['MILK_CRATE-2', 'MILK_CRATE-1', ]
              },            {
              name: 'FLIPPED_ONTO_BOTTOM',
              transition: 'false',
              frames: ['MILK_CRATE-1',]
              },               {
              name: 'FLIPPING_ONTO_TOP',
              transition: 'FLIPPED_ONTO_TOP',
              frames: ['MILK_CRATE-1', 'MILK_CRATE-2', ]
              },],            slots: 3,
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
        loot: [
                  ],
        actions: [ {
            name: 'READ', stateTrigger: 'READING', validStates: ['DEFAULT']
          }, {
            name: 'GUST', stateTrigger: 'GUSTING', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_MISSING-8',]
              },               {
              name: 'READING',
              transition: 'DEFAULT',
              frames: ['OBJ_FLYER_MISSING-1', ]
              },                           {
              name: 'GUSTING',
              transition: 'DEFAULT',
              frames: ['OBJ_FLYER_MISSING-1', 'OBJ_FLYER_MISSING-2', 'OBJ_FLYER_MISSING-3', 'OBJ_FLYER_MISSING-4', 'OBJ_FLYER_MISSING-5', 'OBJ_FLYER_MISSING-6', 'OBJ_FLYER_MISSING-7', 'OBJ_FLYER_MISSING-8', ]
              },],

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
        loot: [
                  ],
        actions: [],
        default_state: 'FLICKERING',        states: [                {
              name: 'OFF',
              transition: 'false',
              frames: ['NEON_LOTTO_SIGN-2',]},                {
              name: 'ON',
              transition: 'false',
              frames: ['NEON_LOTTO_SIGN-1',]},                {
              name: 'FLICKERING',
              transition: 'false',
              frames: ['NEON_LOTTO_SIGN-1','NEON_LOTTO_SIGN-1','NEON_LOTTO_SIGN-2','NEON_LOTTO_SIGN-1','NEON_LOTTO_SIGN-1','NEON_LOTTO_SIGN-1','NEON_LOTTO_SIGN-2',]},],

          interactions: {
                                  },
    },
          NEON_OPEN_SIGN: {
        name: 'Neon Open Sign',
        slug: 'NEON_OPEN_SIGN', 
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
        loot: [
                  ],
        actions: [],
        default_state: 'ON',        states: [                {
              name: 'OFF',
              transition: 'false',
              frames: ['NEON_OPEN_SIGN-2',]},                {
              name: 'ON',
              transition: 'false',
              frames: ['NEON_OPEN_SIGN-1',]},                {
              name: 'FLICKERING',
              transition: 'false',
              frames: ['NEON_OPEN_SIGN-1','NEON_OPEN_SIGN-1','NEON_OPEN_SIGN-1','NEON_OPEN_SIGN-1','NEON_OPEN_SIGN-1','NEON_OPEN_SIGN-2','NEON_OPEN_SIGN-1','NEON_OPEN_SIGN-1','NEON_OPEN_SIGN-1','NEON_OPEN_SIGN-2','NEON_OPEN_SIGN-1',]},],

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
        loot: [
                  ],
        actions: [ {
            name: 'TURN ON', stateTrigger: 'TURNING_ON', validStates: ['OFF']
          }, {
            name: 'TURN OFF', stateTrigger: 'TURNING_OFF', validStates: ['ON']
          }],
        default_state: 'ON',        states: [                {
              name: 'OFF',
              transition: 'false',
              frames: ['NIGHT_LIGHT-1',]},                {
              name: 'TURNING_OFF',
              transition: 'OFF',
              frames: ['NIGHT_LIGHT-2','NIGHT_LIGHT-1',]},                {
              name: 'ON',
              transition: 'false',
              frames: ['NIGHT_LIGHT-2',]},                {
              name: 'TURNING_ON',
              transition: 'ON',
              frames: ['NIGHT_LIGHT-1','NIGHT_LIGHT-2',]},                                                      ],

          interactions: {
                                            group_11: {
                req_group: 11,
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

            },                      },
    },
          NO_SMOKING_PAPER: {
        name: 'No Smoking Paper Sign',
        slug: 'NO_SMOKING_PAPER', 
        type: 'PAPER_SIGN',
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
          h:14, 
          w:14,
          x:0, 
          y:0
        },
        size: {
          h:14, 
          w:14
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          FAN_OSCILLATING: {
        name: 'Oscillating Fan',
        slug: 'FAN_OSCILLATING', 
        type: 'FAN',
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
          h:8, 
          w:8
        },
        offset: {
          x:4, 
          y:20
        },
        varieties: 8,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                            group_11: {
                req_group: 11,
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

            },                      },
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                            group_11: {
                req_group: 11,
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

            },                      },
    },
          DECOR_OVAL_FRAME: {
        name: 'Oval Framed Picture',
        slug: 'DECOR_OVAL_FRAME', 
        type: 'DECOR_ART',
        bounding: {
          h:1, 
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
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
        loot: [
                  ],
        actions: [ {
            name: 'TURN ON', stateTrigger: 'TURNING_ON', validStates: ['OFF']
          }, {
            name: 'TURN OFF', stateTrigger: 'TURNING_OFF', validStates: ['ON']
          }, {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }],
        default_state: 'OFF',        states: [            {
              name: 'OFF',
              transition: 'false',
              frames: ['OVEN_1-1',]
              },               {
              name: 'TURNING_ON',
              transition: 'ON',
              frames: []
              },            {
              name: 'ON',
              transition: 'false',
              frames: ['OVEN_1-5',]
              },               {
              name: 'TURNING_OFF',
              transition: 'OFF',
              frames: []
              },            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['OVEN_1-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['OVEN_1-2', 'OVEN_1-3', 'OVEN_1-4', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['OVEN_1-4',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['OVEN_1-3', 'OVEN_1-2', 'OVEN_1-1', ]
              },],

          interactions: {
                                  },
    },
          OVERCOUNTER_CABINET_S_DARK_WOOD: {
        name: 'Overcounter Cabinet S Dark Wood',
        slug: 'OVERCOUNTER_CABINET_S_DARK_WOOD', 
        type: 'CABINET',
        bounding: {
          h:2, 
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
          h:32, 
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
          y:12
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: []
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: []
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: []
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: []
              },                           {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: []
              },],            slots: 0,
            items: [],

          interactions: {
                                  },
    },
          PAPER_SIGN_POSTED: {
        name: 'Paper Posted Sign',
        slug: 'PAPER_SIGN_POSTED', 
        type: 'PAPER_SIGN',
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
        depth: 32,
        sprite: {
          h:16, 
          w:13,
          x:0, 
          y:0
        },
        size: {
          h:16, 
          w:13
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          PAPER_SIGN_ARROW: {
        name: 'Paper Sign Arrow',
        slug: 'PAPER_SIGN_ARROW', 
        type: 'PAPER_SIGN',
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
        depth: 18,
        sprite: {
          h:14, 
          w:11,
          x:0, 
          y:0
        },
        size: {
          h:14, 
          w:11
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          PAWN_STOREFRONT_SIGN: {
        name: 'Pawn Storefront Sign',
        slug: 'PAWN_STOREFRONT_SIGN', 
        type: 'STOREFRONT_FRAME_SIGN',
        bounding: {
          h:2, 
          w:5
        },
        base: {
          h:1, 
          w:5,
          x:0, 
          y:1
        },
        depth: 0,
        sprite: {
          h:20, 
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                    {
            id: 1,
            name: 'Payphone Coin Return',
            slug: 'PAYPHONE_RETURN',
            odds: 0.25,
            money: 25,
            actionTrigger: 'check coin return',
            items: [],
            occurrences: 1,
            occurrencePeriod: 'HOUR',
            occurrencePer: 'OBJ_INSTANCE'
          }
                  ],
        actions: [ {
            name: 'ANSWER', stateTrigger: 'ANSWERING', validStates: ['RINGING']
          }, {
            name: 'HANG UP', stateTrigger: 'HANGING_UP', validStates: ['AWAITING_DIAL','AWAITING_PAYMENT','CALLING','DIALING','ON_PHONE']
          }, {
            name: 'CHECK COIN RETURN', stateTrigger: 'CHECKING_COIN_RETURN', validStates: ['DEFAULT']
          }, {
            name: 'LIFT RECEIVER', stateTrigger: 'AWAITING_PAYMENT', validStates: ['DEFAULT']
          }, {
            name: 'DIAL', stateTrigger: 'DIALING', validStates: ['AWAITING_DIAL']
          }, {
            name: 'INSERT COIN INTO PAYPHONE', stateTrigger: 'AWAITING_DIAL', validStates: ['AWAITING_PAYMENT']
          }],
        default_state: 'DEFAULT',        states: [                {
              name: 'CHECKING_COIN_RETURN',
              transition: 'DEFAULT',
              frames: ['PAYPHONE-1',]},                {
              name: 'AWAITING_DIAL',
              transition: 'false',
              frames: ['PAYPHONE-4',]},                {
              name: 'DIALING',
              transition: 'CALLING',
              frames: ['PAYPHONE-4',]},                {
              name: 'AWAITING_PAYMENT',
              transition: 'false',
              frames: ['PAYPHONE-4',]},            {
              name: 'RINGING',
              transition: 'DEFAULT',
              frames: ['PAYPHONE-1','PAYPHONE-2',]
              },               {
              name: 'ANSWERING',
              transition: 'DEFAULT',
              frames: ['PAYPHONE-4', ]
              },              {
              name: 'CALLING',
              transition: 'false',
              frames: ['PAYPHONE-4',]
              },  {
              name: 'ON_PHONE',
              transition: 'false',
              frames: ['PAYPHONE-4',]
              },               {
              name: 'HANGING_UP',
              transition: 'DEFAULT',
              frames: ['PAYPHONE-4', 'PAYPHONE-2', 'PAYPHONE-1', ]
              },            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['PAYPHONE-1',]
              },                                                                                                ],

          interactions: {
                                  },
    },
          AREA_RUG_PINK: {
        name: 'Pink Area Rug',
        slug: 'AREA_RUG_PINK', 
        type: 'RUG',
        bounding: {
          h:4, 
          w:5
        },
        base: {
          h:4, 
          w:5,
          x:0, 
          y:0
        },
        depth: -80,
        sprite: {
          h:64, 
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [ {
            name: 'READ', stateTrigger: 'READING', validStates: ['DEFAULT']
          }, {
            name: 'GUST', stateTrigger: 'GUSTING', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_PINK-8',]
              },               {
              name: 'READING',
              transition: 'DEFAULT',
              frames: []
              },                           {
              name: 'GUSTING',
              transition: 'DEFAULT',
              frames: ['OBJ_FLYER_PINK-1', 'OBJ_FLYER_PINK-2', 'OBJ_FLYER_PINK-3', 'OBJ_FLYER_PINK-4', 'OBJ_FLYER_PINK-5', 'OBJ_FLYER_PINK-6', 'OBJ_FLYER_PINK-7', 'OBJ_FLYER_PINK-8', ]
              },],

          interactions: {
                                  },
    },
          PITCHED_ROOF_BROWN_E_5_2: {
        name: 'Pitched Roof Brown E 5w-2s',
        slug: 'PITCHED_ROOF_BROWN_E_5_2', 
        type: 'PITCHED_ROOF',
        bounding: {
          h:8, 
          w:6
        },
        base: {
          h:5, 
          w:5,
          x:0, 
          y:2
        },
        depth: 0,
        sprite: {
          h:121, 
          w:96,
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
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          PITCHED_ROOF_BROWN_W_5_2: {
        name: 'Pitched Roof Brown W 5w-2s',
        slug: 'PITCHED_ROOF_BROWN_W_5_2', 
        type: 'PITCHED_ROOF',
        bounding: {
          h:8, 
          w:6
        },
        base: {
          h:5, 
          w:5,
          x:1, 
          y:2
        },
        depth: 0,
        sprite: {
          h:121, 
          w:96,
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
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
          h:1, 
          w:4,
          x:0, 
          y:2
        },
        depth: -16,
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
        loot: [
                  ],
        actions: [ {
            name: 'SIT', stateTrigger: 'SITTING', validStates: ['DEFAULT']
          }, {
            name: 'CURL UP ON', stateTrigger: 'CURL_UP', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: []
              },               {
              name: 'SITTING',
              transition: 'false',
              frames: []
              },                           {
              name: 'CURL_UP',
              transition: 'SLEEPING',
              frames: []
              },],

          interactions: {
                                  },
    },
          POOP: {
        name: 'Poop',
        slug: 'POOP', 
        type: 'POOP',
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
          h:8, 
          w:8
        },
        offset: {
          x:4, 
          y:4
        },
        varieties: 3,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [                {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['POOP-1',]},                {
              name: 'TRAMPLED',
              transition: 'false',
              frames: ['POOP-2',]},                {
              name: 'DESICCATED',
              transition: 'false',
              frames: ['POOP-3',]},],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          PORCH_STAIR_RAIL_LEFT_MED: {
        name: 'Porch Stair Rail Left Medium',
        slug: 'PORCH_STAIR_RAIL_LEFT_MED', 
        type: 'STAIR_RAIL',
        bounding: {
          h:5, 
          w:7
        },
        base: {
          h:1, 
          w:1,
          x:5, 
          y:3
        },
        depth: 0,
        sprite: {
          h:68, 
          w:112,
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_DARK: {
        name: 'Porch Stair Rail Left Ornamental Dark',
        slug: 'PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_DARK', 
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_GREEN: {
        name: 'Porch Stair Rail Left Ornamental Green',
        slug: 'PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_GREEN', 
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_WHITE: {
        name: 'Porch Stair Rail Left Ornamental White',
        slug: 'PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_WHITE', 
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_WOOD: {
        name: 'Porch Stair Rail Left Ornamental Wood',
        slug: 'PORCH_STAIR_RAIL_LEFT_ORNAMENTAL_WOOD', 
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                            group_2: {
                req_group: 2,
                req_group_name: 'Mail Letter',
                req_pocket_action: 'MAIL',
                req_world_action: 'MAIL',
                req_state: '',
                req_result_item: '',
                req_result_data_key: 'MAILED_LETTERS',
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

            },                      },
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                            group_2: {
                req_group: 2,
                req_group_name: 'Mail Letter',
                req_pocket_action: 'MAIL',
                req_world_action: 'MAIL',
                req_state: '',
                req_result_item: '',
                req_result_data_key: 'MAILED_LETTERS',
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

            },                      },
    },
          SIGN_POUR_YORICK: {
        name: 'Pour Yorick Sign',
        slug: 'SIGN_POUR_YORICK', 
        type: 'STOREFRONT_FRAME_SIGN',
        bounding: {
          h:2, 
          w:10
        },
        base: {
          h:1, 
          w:10,
          x:0, 
          y:1
        },
        depth: -32,
        sprite: {
          h:32, 
          w:160,
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          DINER_BOOTH_RED_N: {
        name: 'Red Diner Booth North',
        slug: 'DINER_BOOTH_RED_N', 
        type: 'BOOTH_SEAT',
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
          h:2, 
          w:32
        },
        offset: {
          x:0, 
          y:30
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          DINER_BOOTH_RED_S: {
        name: 'Red Diner Booth South',
        slug: 'DINER_BOOTH_RED_S', 
        type: 'BOOTH_SEAT',
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
        depth: 1,
        sprite: {
          h:32, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:2, 
          w:32
        },
        offset: {
          x:0, 
          y:8
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        depth: -8,
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
        loot: [
                  ],
        actions: [ {
            name: 'TURN EAST', stateTrigger: 'FACING_EAST', validStates: ['FACING_NORTH','FACING_SOUTH','FACING_WEST']
          }, {
            name: 'TURN WEST', stateTrigger: 'FACING_WEST', validStates: ['FACING_EAST','FACING_NORTH','FACING_SOUTH']
          }, {
            name: 'TURN NORTH', stateTrigger: 'FACING_NORTH', validStates: ['FACING_EAST','FACING_SOUTH','FACING_WEST']
          }, {
            name: 'TURN SOUTH', stateTrigger: 'FACING_SOUTH', validStates: ['FACING_EAST','FACING_NORTH','FACING_WEST']
          }],
        default_state: 'FACING_WEST',        states: [            {
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
              },               {
              name: 'FACING_EAST',
              transition: 'false',
              frames: ['DINER_CHAIR_RED-1', ]
              },                                                                                       ],

          interactions: {
                                  },
    },
          CURTAIN_SINGLE_RED: {
        name: 'Red Single Window Curtains',
        slug: 'CURTAIN_SINGLE_RED', 
        type: 'WINDOW_COVERING',
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          SIGN_BACK_RED_10: {
        name: 'Red Storefront Sign Background',
        slug: 'SIGN_BACK_RED_10', 
        type: 'STOREFRONT_SIGN_BACKGROUND',
        bounding: {
          h:2, 
          w:10
        },
        base: {
          h:2, 
          w:10,
          x:0, 
          y:0
        },
        depth: -1,
        sprite: {
          h:27, 
          w:160,
          x:0, 
          y:0
        },
        size: {
          h:27, 
          w:160
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 1,
        solid: 0,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          ROCK_SMALL: {
        name: 'Rock Small',
        slug: 'ROCK_SMALL', 
        type: 'ROCK',
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
        depth: -4,
        sprite: {
          h:16, 
          w:16,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:10
        },
        offset: {
          x:3, 
          y:2
        },
        varieties: 3,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'CLOSED',        states: [                {
              name: 'OPEN',
              transition: 'false',
              frames: ['ROLLING_GATE_DOOR-16',]},                {
              name: 'CLOSED',
              transition: 'false',
              frames: ['ROLLING_GATE_DOOR-1',]},                {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['ROLLING_GATE_DOOR-2','ROLLING_GATE_DOOR-3','ROLLING_GATE_DOOR-4','ROLLING_GATE_DOOR-5','ROLLING_GATE_DOOR-6','ROLLING_GATE_DOOR-7','ROLLING_GATE_DOOR-8','ROLLING_GATE_DOOR-9','ROLLING_GATE_DOOR-10','ROLLING_GATE_DOOR-11','ROLLING_GATE_DOOR-12','ROLLING_GATE_DOOR-13','ROLLING_GATE_DOOR-14','ROLLING_GATE_DOOR-15','ROLLING_GATE_DOOR-16',]},                {
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
        loot: [
                  ],
        actions: [],
        default_state: 'CLOSED',        states: [                {
              name: 'OPEN',
              transition: 'false',
              frames: ['ROLLING_GATE_WIDE-16',]},                {
              name: 'CLOSED',
              transition: 'false',
              frames: ['ROLLING_GATE_WIDE-1',]},                {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['ROLLING_GATE_WIDE-2','ROLLING_GATE_WIDE-3','ROLLING_GATE_WIDE-4','ROLLING_GATE_WIDE-5','ROLLING_GATE_WIDE-6','ROLLING_GATE_WIDE-7','ROLLING_GATE_WIDE-8','ROLLING_GATE_WIDE-9','ROLLING_GATE_WIDE-10','ROLLING_GATE_WIDE-11','ROLLING_GATE_WIDE-12','ROLLING_GATE_WIDE-13','ROLLING_GATE_WIDE-14','ROLLING_GATE_WIDE-15','ROLLING_GATE_WIDE-16',]},                {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['ROLLING_GATE_WIDE-15','ROLLING_GATE_WIDE-14','ROLLING_GATE_WIDE-13','ROLLING_GATE_WIDE-12','ROLLING_GATE_WIDE-11','ROLLING_GATE_WIDE-10','ROLLING_GATE_WIDE-9','ROLLING_GATE_WIDE-8','ROLLING_GATE_WIDE-7','ROLLING_GATE_WIDE-6','ROLLING_GATE_WIDE-5','ROLLING_GATE_WIDE-4','ROLLING_GATE_WIDE-3','ROLLING_GATE_WIDE-2','ROLLING_GATE_WIDE-1',]},],

          interactions: {
                                  },
    },
          DECOR_SAMPLER: {
        name: 'Sampler',
        slug: 'DECOR_SAMPLER', 
        type: 'DECOR_ART',
        bounding: {
          h:1, 
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        depth: -16,
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
        loot: [
                  ],
        actions: [ {
            name: 'SIT', stateTrigger: 'SITTING', validStates: ['DEFAULT']
          }, {
            name: 'CURL UP ON', stateTrigger: 'CURL_UP', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: []
              },               {
              name: 'SITTING',
              transition: 'false',
              frames: []
              },                           {
              name: 'CURL_UP',
              transition: 'SLEEPING',
              frames: []
              },],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          BLINDS_SINGLE: {
        name: 'Single Window Blinds',
        slug: 'BLINDS_SINGLE', 
        type: 'WINDOW_COVERING',
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          STUMP_SEAT: {
        name: 'Sitting Stump',
        slug: 'STUMP_SEAT', 
        type: 'SEAT',
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
        depth: -5,
        sprite: {
          h:27, 
          w:32,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:18
        },
        offset: {
          x:7, 
          y:12
        },
        varieties: 3,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [ {
            name: 'SIT', stateTrigger: 'SITTING', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: []
              },               {
              name: 'SITTING',
              transition: 'false',
              frames: []
              },],

          interactions: {
                                  },
    },
          TRAFFIC_BARRIER_SMALL: {
        name: 'Small Traffic Barrier',
        slug: 'TRAFFIC_BARRIER_SMALL', 
        type: 'TRAFFIC_BARRIER',
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
          h:12, 
          w:16
        },
        offset: {
          x:0, 
          y:16
        },
        varieties: 3,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          SPEED_LIMIT_E_25: {
        name: 'Speed Limit East 25',
        slug: 'SPEED_LIMIT_E_25', 
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
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          SPEED_LIMIT_E_30: {
        name: 'Speed Limit East 30',
        slug: 'SPEED_LIMIT_E_30', 
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
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          SPEED_LIMIT_E_50: {
        name: 'Speed Limit East 50',
        slug: 'SPEED_LIMIT_E_50', 
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
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          SPEED_LIMIT_N: {
        name: 'Speed Limit North Sign Only',
        slug: 'SPEED_LIMIT_N', 
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
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          SPEED_LIMIT_S_25: {
        name: 'Speed Limit South 25',
        slug: 'SPEED_LIMIT_S_25', 
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
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          SPEED_LIMIT_S_30: {
        name: 'Speed Limit South 30',
        slug: 'SPEED_LIMIT_S_30', 
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
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          SPEED_LIMIT_S_50: {
        name: 'Speed Limit South 50',
        slug: 'SPEED_LIMIT_S_50', 
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
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          SPEED_LIMIT_W_25: {
        name: 'Speed Limit West 25',
        slug: 'SPEED_LIMIT_W_25', 
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
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          SPEED_LIMIT_W_30: {
        name: 'Speed Limit West 30',
        slug: 'SPEED_LIMIT_W_30', 
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
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          SPEED_LIMIT_W_50: {
        name: 'Speed Limit West 50',
        slug: 'SPEED_LIMIT_W_50', 
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
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          STAFFED_COUNTER_BONEDEGA: {
        name: 'Staffed Bonedega Counter',
        slug: 'STAFFED_COUNTER_BONEDEGA', 
        type: 'STAFFED_COUNTER',
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
        depth: -8,
        sprite: {
          h:64, 
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
          y:48
        },
        varieties: 23,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [ {
            name: 'CHECK OUT', stateTrigger: 'PRINTING_RECEIPT', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [                {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['STAFFED_COUNTER_BONEDEGA-11','STAFFED_COUNTER_BONEDEGA-12','STAFFED_COUNTER_BONEDEGA-13','STAFFED_COUNTER_BONEDEGA-14','STAFFED_COUNTER_BONEDEGA-15','STAFFED_COUNTER_BONEDEGA-16','STAFFED_COUNTER_BONEDEGA-16','STAFFED_COUNTER_BONEDEGA-15','STAFFED_COUNTER_BONEDEGA-14','STAFFED_COUNTER_BONEDEGA-15','STAFFED_COUNTER_BONEDEGA-16','STAFFED_COUNTER_BONEDEGA-15','STAFFED_COUNTER_BONEDEGA-14','STAFFED_COUNTER_BONEDEGA-15','STAFFED_COUNTER_BONEDEGA-16','STAFFED_COUNTER_BONEDEGA-17','STAFFED_COUNTER_BONEDEGA-18','STAFFED_COUNTER_BONEDEGA-19',]},                           {
              name: 'PRINTING_RECEIPT',
              transition: 'DEFAULT',
              frames: ['STAFFED_COUNTER_BONEDEGA-17', 'STAFFED_COUNTER_BONEDEGA-18', 'STAFFED_COUNTER_BONEDEGA-19', 'STAFFED_COUNTER_BONEDEGA-20', 'STAFFED_COUNTER_BONEDEGA-21', 'STAFFED_COUNTER_BONEDEGA-22', 'STAFFED_COUNTER_BONEDEGA-23', 'STAFFED_COUNTER_BONEDEGA-22', 'STAFFED_COUNTER_BONEDEGA-21', 'STAFFED_COUNTER_BONEDEGA-20', 'STAFFED_COUNTER_BONEDEGA-21', 'STAFFED_COUNTER_BONEDEGA-22', 'STAFFED_COUNTER_BONEDEGA-23', 'STAFFED_COUNTER_BONEDEGA-22', 'STAFFED_COUNTER_BONEDEGA-21', 'STAFFED_COUNTER_BONEDEGA-20', 'STAFFED_COUNTER_BONEDEGA-21', 'STAFFED_COUNTER_BONEDEGA-22', 'STAFFED_COUNTER_BONEDEGA-23', 'STAFFED_COUNTER_BONEDEGA-22', 'STAFFED_COUNTER_BONEDEGA-21', 'STAFFED_COUNTER_BONEDEGA-20', 'STAFFED_COUNTER_BONEDEGA-19', ]
              },],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        depth: -4,
        sprite: {
          h:68, 
          w:48,
          x:0, 
          y:0
        },
        size: {
          h:12, 
          w:48
        },
        offset: {
          x:0, 
          y:48
        },
        varieties: 1,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        depth: -4,
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
          y:2
        },
        depth: 33,
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
        loot: [
                  ],
        actions: [ {
            name: 'TURN ON', stateTrigger: 'TURNING_ON', validStates: ['OFF']
          }, {
            name: 'TURN OFF', stateTrigger: 'TURNING_OFF', validStates: ['ON']
          }, {
            name: 'TOAST', stateTrigger: 'TOASTING', validStates: ['ON']
          }, {
            name: 'GRAB TOAST', stateTrigger: 'RETRIEVING_TOAST', validStates: ['EJECTING_TOAST','TOAST_BURNING','TOASTED','TOASTED_DARK']
          }],
        default_state: 'OFF',        states: [                {
              name: 'TOAST_BURNING',
              transition: 'false',
              frames: ['TOASTER-12','TOASTER-12','TOASTER-12','TOASTER-12','TOASTER-12',]},            {
              name: 'OFF',
              transition: 'false',
              frames: ['TOASTER-1',]
              },               {
              name: 'TURNING_ON',
              transition: 'ON',
              frames: ['TOASTER-1', 'TOASTER-13', 'TOASTER-13', 'TOASTER-5', ]
              },            {
              name: 'ON',
              transition: 'false',
              frames: ['TOASTER-5',]
              },               {
              name: 'TURNING_OFF',
              transition: 'OFF',
              frames: []
              },                           {
              name: 'TOASTING',
              transition: 'EJECTING_TOAST',
              frames: ['TOASTER-2', 'TOASTER-2', 'TOASTER-3', 'TOASTER-3', 'TOASTER-3', 'TOASTER-4', 'TOASTER-4', 'TOASTER-4', 'TOASTER-5', 'TOASTER-5', 'TOASTER-5', 'TOASTER-5', ]
              },            {
              name: 'EJECTING_TOAST',
              transition: 'TOASTED',
              frames: ['TOASTER-5','TOASTER-6','TOASTER-7','TOASTER-8','TOASTER-9','TOASTER-10',]
              },  {
              name: 'TOASTED',
              transition: 'TOASTED_DARK',
              frames: ['TOASTER-10','TOASTER-10','TOASTER-10','TOASTER-10','TOASTER-10','TOASTER-10','TOASTER-10','TOASTER-10','TOASTER-10','TOASTER-10','TOASTER-10','TOASTER-10','TOASTER-10','TOASTER-10','TOASTER-10',]
              }, {
              name: 'TOASTED_DARK',
              transition: 'TOAST_BURNING',
              frames: ['TOASTER-11','TOASTER-11','TOASTER-11','TOASTER-11','TOASTER-11','TOASTER-11','TOASTER-11','TOASTER-11','TOASTER-11','TOASTER-11',]
              },               {
              name: 'RETRIEVING_TOAST',
              transition: 'OFF',
              frames: ['TOASTER-9', 'TOASTER-13', 'TOASTER-13', 'TOASTER-13', 'TOASTER-1', ]
              },],

          interactions: {
                                group_32: {
                req_group: 32,
                req_group_name: 'Grab Toast from Toaster',
                req_pocket_action: '',
                req_world_action: 'GRAB TOAST',
                req_state: '',
                req_result_item: 'TOAST',
                req_result_data_key: '',
                req_result_data_set: '',
                req_result_data_modify: '',
                req_result_texture: '',
                req_result_fx: '',
                req_result_ground: '',
                requires: [
                  {
                    slot_type: 'ON_ACTIVE',
                    type: 'OBJ_KIND',
                    result: 'UNTOUCHED',
                    OBJ_KIND: 'TOASTER'
                    }
                                ]

            },                                  },
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
        loot: [
                  ],
        actions: [ {
            name: 'INSERT COIN', stateTrigger: 'COIN_DISPENSING', validStates: ['COIN_LOCKED']
          }],
        default_state: 'COIN_LOCKED',        states: [                {
              name: 'COIN_LOCKED',
              transition: 'false',
              frames: ['DAILY_NEWS_BOX_-1',]},                {
              name: 'COIN_DISPENSING',
              transition: 'COIN_RETRACTING',
              frames: ['DAILY_NEWS_BOX_-2','DAILY_NEWS_BOX_-3','DAILY_NEWS_BOX_-4','DAILY_NEWS_BOX_-5','DAILY_NEWS_BOX_-6',]},                {
              name: 'COIN_RETRACTING',
              transition: 'COIN_LOCKED',
              frames: ['DAILY_NEWS_BOX_-6','DAILY_NEWS_BOX_-5','DAILY_NEWS_BOX_-4','DAILY_NEWS_BOX_-3','DAILY_NEWS_BOX_-2',]},                           ],

          interactions: {
                                            group_29: {
                req_group: 29,
                req_group_name: 'Newspaper Box Town',
                req_pocket_action: '',
                req_world_action: 'INSERT COIN',
                req_state: 'coin_locked',
                req_result_item: 'NEWSPAPER',
                req_result_data_key: '',
                req_result_data_set: '',
                req_result_data_modify: '',
                req_result_texture: '',
                req_result_fx: '',
                req_result_ground: '',
                requires: [
                  {
                    slot_type: 'IN_COINPURSE',
                    type: 'MONEY',
                    result: 'CONSUMED',
                    MONEY: '25',
                    },
                  {
                    slot_type: 'ON_ACTIVE',
                    type: 'OBJ_TYPE',
                    result: 'UNTOUCHED',
                    OBJ_TYPE: 'NEWSPAPER_BOX_'
                    }
                                ]

            },                      },
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'RED',        states: [                {
              name: 'OFF',
              transition: 'false',
              frames: ['TRAFFIC_LIGHT_EAST-1',]},                {
              name: 'GREEN',
              transition: 'false',
              frames: ['TRAFFIC_LIGHT_EAST-4',]},                {
              name: 'YELLOW',
              transition: 'false',
              frames: ['TRAFFIC_LIGHT_EAST-3',]},                {
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
        loot: [
                  ],
        actions: [],
        default_state: 'GREEN',        states: [                {
              name: 'OFF',
              transition: 'false',
              frames: []},                {
              name: 'GREEN',
              transition: 'false',
              frames: []},                {
              name: 'YELLOW',
              transition: 'false',
              frames: []},                {
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
        loot: [
                  ],
        actions: [],
        default_state: 'GREEN',        states: [                {
              name: 'OFF',
              transition: 'false',
              frames: ['TRAFFIC_LIGHT_SOUTH-1',]},                {
              name: 'GREEN',
              transition: 'false',
              frames: ['TRAFFIC_LIGHT_SOUTH-4',]},                {
              name: 'YELLOW',
              transition: 'false',
              frames: ['TRAFFIC_LIGHT_SOUTH-3',]},                {
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
        loot: [
                    {
            id: 2,
            name: 'Rummage in Trash Drum',
            slug: 'RUMMAGE_TRASH_DRUM',
            odds: 0.5,
            money: 0,
            actionTrigger: 'rummage',
            items: ['APPLE_TRASH','BANANA_TRASH','PLASTIC_BAG_1','PLASTIC_BAG_2','SODA_RED_TRASH','BUS_TICKET_PUNCH','PAPER_2O_','SPRAY_PAINT_EMPTY','POPSICLE_STICK','SODA_GREEN_TRASH','SODA_BLUE_TRASH','BEER_TRASH','GLASS_BOTTLE_3','GREEN_GLASS_BOTTLE_3','GLASS_TRIANGLE','GREEN_GLASS_TRIANGLE','GREEN_GLASS_HEART','EMPTY_SODA_F_CUP','EMPTY_PUDDING_CUP','EMPTY_NOODLE_CUP','WISHBONE'],
            occurrences: 3,
            occurrencePeriod: 'HOUR',
            occurrencePer: 'OBJ_INSTANCE'
          }
                  ],
        actions: [ {
            name: 'RUMMAGE', stateTrigger: 'RUMMAGING', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [                {
              name: 'MISSING_TRASH_BAG',
              transition: 'false',
              frames: ['TRASH_DRUM-1',]},                {
              name: 'TRASH_BAG_EMPTY',
              transition: 'false',
              frames: ['TRASH_DRUM-2',]},                {
              name: 'TRASH_BAG_FULL',
              transition: 'false',
              frames: ['TRASH_DRUM-6',]},            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['TRASH_DRUM-5',]
              },               {
              name: 'RUMMAGING',
              transition: 'DEFAULT',
              frames: ['TRASH_DRUM-5', 'TRASH_DRUM-6', 'TRASH_DRUM-7', 'TRASH_DRUM-6', ]
              },],

          interactions: {
                                            group_17: {
                req_group: 17,
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

            },                      },
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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_DARK_WOOD-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_DARK_WOOD-1', 'UNDERCOUNTER_CABINET_S_DARK_WOOD-2', 'UNDERCOUNTER_CABINET_S_DARK_WOOD-3', 'UNDERCOUNTER_CABINET_S_DARK_WOOD-4', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_DARK_WOOD-4',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_S_DARK_WOOD-4', 'UNDERCOUNTER_CABINET_S_DARK_WOOD-3', 'UNDERCOUNTER_CABINET_S_DARK_WOOD-2', 'UNDERCOUNTER_CABINET_S_DARK_WOOD-1', ]
              },                           {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_DARK_WOOD-4', ]
              },],            slots: 3,
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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_LIGHT_WOOD-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_LIGHT_WOOD-1', 'UNDERCOUNTER_CABINET_S_LIGHT_WOOD-2', 'UNDERCOUNTER_CABINET_S_LIGHT_WOOD-3', 'UNDERCOUNTER_CABINET_S_LIGHT_WOOD-4', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_LIGHT_WOOD-4',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_S_LIGHT_WOOD-4', 'UNDERCOUNTER_CABINET_S_LIGHT_WOOD-3', 'UNDERCOUNTER_CABINET_S_LIGHT_WOOD-2', 'UNDERCOUNTER_CABINET_S_LIGHT_WOOD-1', ]
              },                           {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_LIGHT_WOOD-4', ]
              },],            slots: 3,
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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_PEELING_WOOD-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_PEELING_WOOD-1', 'UNDERCOUNTER_CABINET_S_PEELING_WOOD-2', 'UNDERCOUNTER_CABINET_S_PEELING_WOOD-3', 'UNDERCOUNTER_CABINET_S_PEELING_WOOD-4', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_PEELING_WOOD-4',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_S_PEELING_WOOD-4', 'UNDERCOUNTER_CABINET_S_PEELING_WOOD-3', 'UNDERCOUNTER_CABINET_S_PEELING_WOOD-2', 'UNDERCOUNTER_CABINET_S_PEELING_WOOD-1', ]
              },                           {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_PEELING_WOOD-4', ]
              },],            slots: 0,
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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_YELLOW-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_YELLOW-1', 'UNDERCOUNTER_CABINET_S_YELLOW-2', 'UNDERCOUNTER_CABINET_S_YELLOW-3', 'UNDERCOUNTER_CABINET_S_YELLOW-4', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_S_YELLOW-4',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_S_YELLOW-4', 'UNDERCOUNTER_CABINET_S_YELLOW-3', 'UNDERCOUNTER_CABINET_S_YELLOW-2', 'UNDERCOUNTER_CABINET_S_YELLOW-1', ]
              },                           {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_S_YELLOW-4', ]
              },],            slots: 3,
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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_DARK_WOOD-4',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_DARK_WOOD-4', 'UNDERCOUNTER_CABINET_W_DARK_WOOD-3', 'UNDERCOUNTER_CABINET_W_DARK_WOOD-2', 'UNDERCOUNTER_CABINET_W_DARK_WOOD-1', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_DARK_WOOD-1',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_W_DARK_WOOD-1', 'UNDERCOUNTER_CABINET_W_DARK_WOOD-2', 'UNDERCOUNTER_CABINET_W_DARK_WOOD-3', 'UNDERCOUNTER_CABINET_W_DARK_WOOD-4', ]
              },                           {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_DARK_WOOD-1', ]
              },],            slots: 3,
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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_LIGHT_WOOD-4',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_LIGHT_WOOD-4', 'UNDERCOUNTER_CABINET_W_LIGHT_WOOD-3', 'UNDERCOUNTER_CABINET_W_LIGHT_WOOD-2', 'UNDERCOUNTER_CABINET_W_LIGHT_WOOD-1', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_LIGHT_WOOD-1',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_W_LIGHT_WOOD-1', 'UNDERCOUNTER_CABINET_W_LIGHT_WOOD-2', 'UNDERCOUNTER_CABINET_W_LIGHT_WOOD-3', 'UNDERCOUNTER_CABINET_W_LIGHT_WOOD-4', ]
              },                           {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_LIGHT_WOOD-1', ]
              },],            slots: 3,
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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_PEELING_WOOD-4',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_PEELING_WOOD-4', 'UNDERCOUNTER_CABINET_W_PEELING_WOOD-3', 'UNDERCOUNTER_CABINET_W_PEELING_WOOD-2', 'UNDERCOUNTER_CABINET_W_PEELING_WOOD-1', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_PEELING_WOOD-1',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_W_PEELING_WOOD-1', 'UNDERCOUNTER_CABINET_W_PEELING_WOOD-2', 'UNDERCOUNTER_CABINET_W_PEELING_WOOD-3', 'UNDERCOUNTER_CABINET_W_PEELING_WOOD-4', ]
              },                           {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_PEELING_WOOD-1', ]
              },],            slots: 3,
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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_YELLOW-4',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_YELLOW-4', 'UNDERCOUNTER_CABINET_W_YELLOW-3', 'UNDERCOUNTER_CABINET_W_YELLOW-2', 'UNDERCOUNTER_CABINET_W_YELLOW-1', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['UNDERCOUNTER_CABINET_W_YELLOW-1',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['UNDERCOUNTER_CABINET_W_YELLOW-1', 'UNDERCOUNTER_CABINET_W_YELLOW-2', 'UNDERCOUNTER_CABINET_W_YELLOW-3', 'UNDERCOUNTER_CABINET_W_YELLOW-4', ]
              },                           {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: ['UNDERCOUNTER_CABINET_W_YELLOW-1', ]
              },],            slots: 3,
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
        loot: [
                  ],
        actions: [],
        default_state: 'SIGNAL_HAND_WALK',        states: [                {
              name: 'SIGNAL_WALK_HAND',
              transition: 'false',
              frames: ['WALK_SIGNAL_SE_-5',]},                {
              name: 'SIGNAL_HAND_WALK',
              transition: 'false',
              frames: ['WALK_SIGNAL_SE_-3',]},                {
              name: 'SIGNAL_WARNING_HAND',
              transition: 'false',
              frames: ['WALK_SIGNAL_SE_-2','WALK_SIGNAL_SE_-4','WALK_SIGNAL_SE_-4','WALK_SIGNAL_SE_-4','WALK_SIGNAL_SE_-2','WALK_SIGNAL_SE_-2',]},                {
              name: 'SIGNAL_HAND_WARNING',
              transition: 'false',
              frames: ['WALK_SIGNAL_SE_-2','WALK_SIGNAL_SE_-1','WALK_SIGNAL_SE_-1','WALK_SIGNAL_SE_-1','WALK_SIGNAL_SE_-2','WALK_SIGNAL_SE_-2',]},],

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
        loot: [
                  ],
        actions: [],
        default_state: 'SIGNAL_WARNING_HAND',        states: [                {
              name: 'SIGNAL_WALK_HAND',
              transition: 'false',
              frames: ['WALK_SIGNAL_W_-2',]},                {
              name: 'SIGNAL_HAND_WALK',
              transition: 'false',
              frames: ['WALK_SIGNAL_W_-3',]},                {
              name: 'SIGNAL_WARNING_HAND',
              transition: 'false',
              frames: ['WALK_SIGNAL_W_-2',]},                {
              name: 'SIGNAL_HAND_WARNING',
              transition: 'false',
              frames: ['WALK_SIGNAL_W_-2','WALK_SIGNAL_W_-1','WALK_SIGNAL_W_-1','WALK_SIGNAL_W_-1','WALK_SIGNAL_W_-2','WALK_SIGNAL_W_-2',]},],

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
        depth: 8,
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
        loot: [
                  ],
        actions: [],
        default_state: 'JUNE',        states: [                {
              name: 'JUNE',
              transition: 'false',
              frames: ['WALL_CALENDAR-1',]},                {
              name: 'JULY',
              transition: 'false',
              frames: ['WALL_CALENDAR-2',]},                {
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          WATTLE_FENCE: {
        name: 'Wattle Fence',
        slug: 'WATTLE_FENCE', 
        type: 'FENCE',
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
          w:16
        },
        offset: {
          x:0, 
          y:10
        },
        varieties: 2,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

          interactions: {
                                  },
    },
          AC_WINDOW_UNIT: {
        name: 'Window Unit',
        slug: 'AC_WINDOW_UNIT', 
        type: 'AC_UNIT',
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
          x:16, 
          y:16
        },
        size: {
          h:16, 
          w:16
        },
        offset: {
          x:0, 
          y:0
        },
        varieties: 2,
        solid: 1,
        portal: 0,
        loot: [
                  ],
        actions: [],
        default_state: 'ON',        states: [                {
              name: 'OFF',
              transition: 'false',
              frames: ['AC_WINDOW_UNIT-1',]},                {
              name: 'ON',
              transition: 'false',
              frames: ['AC_WINDOW_UNIT-1','AC_WINDOW_UNIT-2',]},],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [ {
            name: 'OPEN', stateTrigger: 'OPENING', validStates: ['CLOSED']
          }, {
            name: 'CLOSE', stateTrigger: 'CLOSING', validStates: ['OPEN']
          }, {
            name: 'LOOK INSIDE', stateTrigger: 'LOOKING_INSIDE', validStates: ['OPEN']
          }],
        default_state: 'CLOSED',        states: [                {
              name: 'DEFAULT',
              transition: 'false',
              frames: []},                {
              name: 'NO_DRAWER',
              transition: 'false',
              frames: []},            {
              name: 'CLOSED',
              transition: 'false',
              frames: ['WOOD_SIDE_TABLE-1',]
              },               {
              name: 'OPENING',
              transition: 'OPEN',
              frames: ['WOOD_SIDE_TABLE-4', 'WOOD_SIDE_TABLE-3', 'WOOD_SIDE_TABLE-2', ]
              },            {
              name: 'OPEN',
              transition: 'false',
              frames: ['WOOD_SIDE_TABLE-2',]
              },               {
              name: 'CLOSING',
              transition: 'CLOSED',
              frames: ['WOOD_SIDE_TABLE-3', 'WOOD_SIDE_TABLE-4', 'WOOD_SIDE_TABLE-1', ]
              },                           {
              name: 'LOOKING_INSIDE',
              transition: 'OPEN',
              frames: []
              },],            slots: 4,
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [ {
            name: 'READ', stateTrigger: 'READING', validStates: ['DEFAULT']
          }, {
            name: 'GUST', stateTrigger: 'GUSTING', validStates: ['DEFAULT']
          }],
        default_state: 'DEFAULT',        states: [            {
              name: 'DEFAULT',
              transition: 'false',
              frames: ['OBJ_FLYER_YELLOW-8',]
              },               {
              name: 'READING',
              transition: 'DEFAULT',
              frames: []
              },                           {
              name: 'GUSTING',
              transition: 'DEFAULT',
              frames: ['OBJ_FLYER_YELLOW-1', 'OBJ_FLYER_YELLOW-2', 'OBJ_FLYER_YELLOW-3', 'OBJ_FLYER_YELLOW-4', 'OBJ_FLYER_YELLOW-5', 'OBJ_FLYER_YELLOW-6', 'OBJ_FLYER_YELLOW-7', 'OBJ_FLYER_YELLOW-8', ]
              },],

          interactions: {
                                  },
    },
          CURTAIN_SINGLE_YELLOW: {
        name: 'Yellow Single Window Curtains',
        slug: 'CURTAIN_SINGLE_YELLOW', 
        type: 'WINDOW_COVERING',
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
        loot: [
                  ],
        actions: [],
        default_state: 'DEFAULT',        states: [],

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
        loot: [
                  ],
        actions: [ {
            name: 'TURN ON', stateTrigger: 'TURNING_ON', validStates: ['OFF']
          }, {
            name: 'TURN OFF', stateTrigger: 'TURNING_OFF', validStates: ['ON']
          }],
        default_state: 'ON',        states: [            {
              name: 'OFF',
              transition: 'false',
              frames: ['LAMP_YELLOW_TABLE-5',]
              },               {
              name: 'TURNING_ON',
              transition: 'ON',
              frames: ['LAMP_YELLOW_TABLE-5', 'LAMP_YELLOW_TABLE-4', ]
              },            {
              name: 'ON',
              transition: 'false',
              frames: ['LAMP_YELLOW_TABLE-4',]
              },               {
              name: 'TURNING_OFF',
              transition: 'OFF',
              frames: ['LAMP_YELLOW_TABLE-4', 'LAMP_YELLOW_TABLE-5', ]
              },],

          interactions: {
                                  },
    }
  };
export default OBJECTS;
