const NPC_SCHEDULES = {
  PATRICE: {
  slug: 'PATRICE',
  transitDistanceThreshold: 1000, // tiles; trips longer than this → consider bus
  schedule: [
    {
      id: 'morning_home',
      timeStart: { hour: 6, minute: 0 },
      timeEnd:   { hour: 11, minute: 45 },
      priority: 10,
      conditions: [],        // always active
      destination: {
        type: 'ADDRESS',     // ADDRESS | TILE | SLUG | INTERIOR
        dir: 'W', number: '107', street: 'Belly Button Street'
      },
      arrivalAction: 'IDLE',
      arrivalFacing: 's',
      indoors: false,        // expects to be in exterior
    }
  ]
  }};
export default NPC_SCHEDULES;