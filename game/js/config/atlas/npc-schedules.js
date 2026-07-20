const NPC_SCHEDULES = {
  AUNTIE: {
  slug: 'AUNTIE',
  transitDistanceThreshold: 1000, // tiles; trips longer than this → consider bus
  schedule: [
    {
      id: 'morning_home',
      timeStart: { hour: 6, minute: 0 },
      timeEnd:   { hour: 9, minute: 43 },
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
    }]},
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
        dir: 'W', number: '105', street: 'Belly Button Street'
      },
      arrivalAction: 'IDLE',
      arrivalFacing: 's',
      indoors: false,        // expects to be in exterior
    },
    {
      id: 'walking_to_store',
      timeStart: { hour: 9, minute: 44 },
      timeEnd:   { hour: 11, minute: 45 },
      priority: 10,
      conditions: [],        // always active
      destination: {
        type: 'ADDRESS',     // ADDRESS | TILE | SLUG | INTERIOR
        dir: 'W', number: '101', street: 'Belly Button Street'
      },
      arrivalAction: 'IDLE',
      arrivalFacing: 's',
      indoors: false,        // expects to be in exterior
    },
    {
      id: 'evening_walk',
      timeStart: { hour: 16, minute: 0 },
      timeEnd:   { hour: 18, minute: 0 },
      priority: 10,
      conditions: [],        // always active
      destination: {
        type: 'ADDRESS',     // ADDRESS | TILE | SLUG | INTERIOR
        dir: 'W', number: '105', street: 'Belly Button Street'
      },
      arrivalAction: 'IDLE',
      arrivalFacing: 's',
      indoors: false,        // expects to be in exterior
    }
  ]
  },
  
  
};
export default NPC_SCHEDULES;