const PLANTS = {
      
DANDELION: {
  name: 'Dandelion',
  scientific_name: 'Taraxacum officinale',
  slug: 'DANDELION',
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
  stages: {
    
                                      
            stage_11:{
  stage_id: 11,
  start: 0,
  end: 12,
  next_stage_id: 19,
  name: 'germination',
  day_length: 12,
  frames: [
        {
      id: 657,
      filename: 'DANDELION_11_657',
      width: 16,
      height: 16,
      tags: []
    }
      ]
},            
                                                
            stage_19:{
  stage_id: 19,
  start: 13,
  end: 15,
  next_stage_id: 12,
  name: 'sprouts',
  day_length: 2,
  frames: [
        {
      id: 658,
      filename: 'DANDELION_19_658',
      width: 16,
      height: 16,
      tags: []
    }
      ]
},                                                                        
            stage_12:{
  stage_id: 12,
  start: 16,
  end: 19,
  next_stage_id: 13,
  name: 'tap root and leaves',
  day_length: 3,
  frames: [
        {
      id: 659,
      filename: 'DANDELION_12_659',
      width: 16,
      height: 16,
      tags: []
    }
      ]
},                                                                        
            stage_13:{
  stage_id: 13,
  start: 20,
  end: 22,
  next_stage_id: 14,
  name: 'buds appear',
  day_length: 2,
  frames: [
        {
      id: 660,
      filename: 'DANDELION_13_660',
      width: 16,
      height: 16,
      tags: []
    }
      ]
},                                                                        
            stage_14:{
  stage_id: 14,
  start: 23,
  end: 25,
  next_stage_id: 15,
  name: 'flowers begin to open',
  day_length: 2,
  frames: [
        {
      id: 661,
      filename: 'DANDELION_14_661',
      width: 16,
      height: 16,
      tags: []
    },
        {
      id: 672,
      filename: 'DANDELION_14_672',
      width: 8,
      height: 16,
      tags: ["flower"]
    }
      ]
},                                                                        
            stage_15:{
  stage_id: 15,
  start: 26,
  end: 30,
  next_stage_id: 16,
  name: 'mature flower',
  day_length: 4,
  frames: [
        {
      id: 662,
      filename: 'DANDELION_15_662',
      width: 16,
      height: 16,
      tags: []
    },
        {
      id: 671,
      filename: 'DANDELION_15_671',
      width: 8,
      height: 16,
      tags: ["flower"]
    }
      ]
},                                                                        
            stage_16:{
  stage_id: 16,
  start: 31,
  end: 39,
  next_stage_id: 17,
  name: 'flower closes',
  day_length: 8,
  frames: [
        {
      id: 663,
      filename: 'DANDELION_16_663',
      width: 16,
      height: 16,
      tags: []
    },
        {
      id: 670,
      filename: 'DANDELION_16_670',
      width: 8,
      height: 16,
      tags: ["flower"]
    }
      ]
},                                                                        
            stage_17:{
  stage_id: 17,
  start: 40,
  end: 49,
  next_stage_id: 18,
  name: 'flower opens seed heads',
  day_length: 9,
  frames: [
        {
      id: 664,
      filename: 'DANDELION_17_664',
      width: 16,
      height: 16,
      tags: []
    },
        {
      id: 667,
      filename: 'DANDELION_17_667',
      width: 8,
      height: 16,
      tags: ["flower"]
    }
      ]
},                                                                        
            stage_18:{
  stage_id: 18,
  start: 50,
  end: 57,
  next_stage_id: 0,
  name: 'wind dispersed seeds',
  day_length: 7,
  frames: [
        {
      id: 665,
      filename: 'DANDELION_18_665',
      width: 16,
      height: 16,
      tags: []
    },
        {
      id: 666,
      filename: 'DANDELION_18_666',
      width: 8,
      height: 16,
      tags: ["flower","flower","flower"]
    }
      ]
},                                                   }
}
  };
export default PLANTS;
