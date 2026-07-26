const NPC_SCHEDULES = {
  AUNTIE: {
  slug: 'AUNTIE',
  transitDistanceThreshold: 1000, // tiles; trips longer than this → consider bus
  schedule: [
    {
      id: 'in_bedroom',
      timeStart: { hour: 6, minute: 0 },
      timeEnd:   { hour: 9, minute: 44 },
      priority: 10,
      conditions: [],        // always active
      destination: {
        type: 'INTERIOR',     // ADDRESS | TILE | SLUG | INTERIOR
        room_id: '15',
        x: 2,
        y: 8
      },
      arrivalAction: 'IDLE',
      arrivalFacing: 's',
      indoors: true,        // expects to be in interior
    },
  {
      id: 'morning_home',
      timeStart: { hour: 9, minute: 45 },
      timeEnd:   { hour: 9, minute: 59 },
      priority: 10,
      conditions: [],        // always active
      destination: {
        type: 'INTERIOR',     // ADDRESS | TILE | SLUG | INTERIOR
        room_id: '6',
        x: 4,
        y: 5
      },
      arrivalAction: 'IDLE',
      arrivalFacing: 's',
      indoors: true,        // expects to be in interior
    },
      {
      id: 'inside_bonedega',
      timeStart: { hour: 10, minute: 0 },
      timeEnd:   { hour: 10, minute: 44 },
      priority: 10,
      conditions: [],        // always active
      destination: {
        type: 'INTERIOR',     // ADDRESS | TILE | SLUG | INTERIOR
        room_id: '1',
        x: 3,
        y: 12
      },
      arrivalAction: 'IDLE',
      arrivalFacing: 's',
      indoors: true,        // expects to be in interior
    },]},
  PATRICE: {
  slug: 'PATRICE',
  transitDistanceThreshold: 1000, // tiles; trips longer than this → consider bus
  schedule: [
    {
      id: 'morning_home',
      timeStart: { hour: 6, minute: 0 },
      timeEnd:   { hour: 9, minute: 43 },
      priority: 10,
      conditions: [],        // always active   
      destination: {
        type: 'ADDRESS',     // ADDRESS | TILE | SLUG | INTERIOR
        // For ADDRESS, optional x/y act as offsets from the resolved portal tile.
        dir: 'W', number: '105', street: 'Belly Button Street'
      },
      // Optional movement area relative to resolved destination.
      // Example: { startX: -1, startY: 0, endX: 1, endY: 2 }
      arrivalZone: null,
      arrivalAction: 'IDLE',
      arrivalFacing: 's',
      indoors: false,        // expects to be in exterior
    },

    {
      id: 'inside_bonedega',
      timeStart: { hour: 9, minute: 44 },
      timeEnd:   { hour: 10, minute: 44 },
      priority: 10,
      conditions: [],        // always active
      destination: {
        type: 'INTERIOR',     // ADDRESS | TILE | SLUG | INTERIOR
        room_id: '1',
        x: 5,
        y: 10
      },
      arrivalAction: 'IDLE',
      arrivalFacing: 's',
      indoors: true,        // expects to be in interior
    },
    {
      id: 'evening_walk',
      timeStart: { hour: 16, minute: 0 },
      timeEnd:   { hour: 18, minute: 0 },
      priority: 10,
      conditions: [],        // always active
      destination: {
        type: 'ADDRESS',     // ADDRESS | TILE | SLUG | INTERIOR
        // For ADDRESS, optional x/y act as offsets from the resolved portal tile.
        dir: 'W', number: '105', street: 'Belly Button Street'
      },
      // Optional movement area relative to resolved destination.
      // Example: { startX: -1, startY: 0, endX: 1, endY: 2 }
      arrivalZone: null,
      arrivalAction: 'IDLE',
      arrivalFacing: 's',
      indoors: false,        // expects to be in exterior
    }
  ]
  },
  
  
};
export default NPC_SCHEDULES;