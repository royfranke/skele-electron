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
},
      
FOXTAIL: {
  name: 'Foxtail',
  scientific_name: 'Setaria',
  slug: 'FOXTAIL',
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
    
                                      
            stage_24:{
  stage_id: 24,
  start: 0,
  end: 7,
  next_stage_id: 25,
  name: 'germination',
  day_length: 7,
  frames: [
        {
      id: 1138,
      filename: 'FOXTAIL_24_1138',
      width: 16,
      height: 16,
      tags: []
    }
      ]
},            
                                                
            stage_25:{
  stage_id: 25,
  start: 8,
  end: 11,
  next_stage_id: 26,
  name: 'emergence',
  day_length: 3,
  frames: [
        {
      id: 1139,
      filename: 'FOXTAIL_25_1139',
      width: 16,
      height: 16,
      tags: []
    }
      ]
},                                                                        
            stage_26:{
  stage_id: 26,
  start: 12,
  end: 14,
  next_stage_id: 27,
  name: 'first leaf',
  day_length: 2,
  frames: [
        {
      id: 1140,
      filename: 'FOXTAIL_26_1140',
      width: 16,
      height: 16,
      tags: []
    }
      ]
},                                                                        
            stage_27:{
  stage_id: 27,
  start: 15,
  end: 18,
  next_stage_id: 28,
  name: 'second leaf',
  day_length: 3,
  frames: [
        {
      id: 1141,
      filename: 'FOXTAIL_27_1141',
      width: 16,
      height: 16,
      tags: []
    }
      ]
},                                                                        
            stage_28:{
  stage_id: 28,
  start: 19,
  end: 21,
  next_stage_id: 29,
  name: 'third leaf',
  day_length: 2,
  frames: [
        {
      id: 1142,
      filename: 'FOXTAIL_28_1142',
      width: 16,
      height: 16,
      tags: []
    },
        {
      id: 1145,
      filename: 'FOXTAIL_28_1145',
      width: 8,
      height: 14,
      tags: []
    }
      ]
},                                                                        
            stage_29:{
  stage_id: 29,
  start: 22,
  end: 24,
  next_stage_id: 30,
  name: 'initial tillering',
  day_length: 2,
  frames: [
        {
      id: 1143,
      filename: 'FOXTAIL_29_1143',
      width: 16,
      height: 16,
      tags: []
    },
        {
      id: 1146,
      filename: 'FOXTAIL_29_1146',
      width: 8,
      height: 14,
      tags: []
    }
      ]
},                                                                        
            stage_30:{
  stage_id: 30,
  start: 25,
  end: 28,
  next_stage_id: 0,
  name: 'fourth leaf',
  day_length: 3,
  frames: [
        {
      id: 1144,
      filename: 'FOXTAIL_30_1144',
      width: 16,
      height: 16,
      tags: []
    },
        {
      id: 1147,
      filename: 'FOXTAIL_30_1147',
      width: 8,
      height: 14,
      tags: ["flower"]
    }
      ]
},                                                   }
},
      
WOOD_SORREL: {
  name: 'Wood Sorrel',
  scientific_name: 'Oxalis',
  slug: 'WOOD_SORREL',
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
    h:8, 
    w:8
  },
  offset: {
    x:4, 
    y:4
  },
  stages: {
    
                                      
            stage_20:{
  stage_id: 20,
  start: 0,
  end: 7,
  next_stage_id: 21,
  name: 'germination',
  day_length: 7,
  frames: [
        {
      id: 997,
      filename: 'WOOD_SORREL_20_997',
      width: 16,
      height: 16,
      tags: []
    }
      ]
},            
                                                
            stage_21:{
  stage_id: 21,
  start: 8,
  end: 22,
  next_stage_id: 22,
  name: 'sprouts',
  day_length: 14,
  frames: [
        {
      id: 998,
      filename: 'WOOD_SORREL_21_998',
      width: 16,
      height: 16,
      tags: []
    }
      ]
},                                                                        
            stage_22:{
  stage_id: 22,
  start: 23,
  end: 37,
  next_stage_id: 23,
  name: 'mature flowers',
  day_length: 14,
  frames: [
        {
      id: 999,
      filename: 'WOOD_SORREL_22_999',
      width: 16,
      height: 16,
      tags: []
    }
      ]
},                                                                        
            stage_23:{
  stage_id: 23,
  start: 38,
  end: 66,
  next_stage_id: 0,
  name: 'mature',
  day_length: 28,
  frames: [
        {
      id: 1000,
      filename: 'WOOD_SORREL_23_1000',
      width: 16,
      height: 16,
      tags: []
    }
      ]
},                                                   }
}
  };
export default PLANTS;
