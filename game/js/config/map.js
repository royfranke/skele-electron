const MAP_CONFIG = {
    tileSize: 16,
    width:320,
    height:200,
    sectionsWidth: 5,
    sectionsHeight: 5,
    blockWidth: 64,
    blockHeight: 40,
    blocks: [ 
            {
            x: 0,
            y: 0,
            block_tile_x:0,
            block_tile_y:0,
            tile_x:0,
            tile_y:0,
            width: 64,
            height: 40,
            top: 0,
            right: 64,
            bottom: 40,
            left: 0,
            center: {
                x: 32,
                y: 20
            },
            ground: "grass",
            offset: {
                n: 0,
                e: 0,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "",
                e: "",
                s: "",
                w: "",
            }
        },
            {
            x: 3,
            y: 3,
            block_tile_x:192,
            block_tile_y:120,
            tile_x:199,
            tile_y:123,
            width: 53,
            height: 33,
            top: 123,
            right: 252,
            bottom: 156,
            left: 199,
            center: {
                x: 225.5,
                y: 139.5
            },
            ground: "grass",
            offset: {
                n: 3,
                e: 4,
                s: 4,
                w: 7,
            },
            bounds: {
                n: "Belly Button Street",
                e: "Milton Street",
                s: "Lower Field Street",
                w: "Midline Ave",
            }
        },
            {
            x: 1,
            y: 1,
            block_tile_x:64,
            block_tile_y:40,
            tile_x:68,
            tile_y:44,
            width: 60,
            height: 32,
            top: 44,
            right: 128,
            bottom: 76,
            left: 68,
            center: {
                x: 98,
                y: 60
            },
            ground: "grass",
            offset: {
                n: 4,
                e: 0,
                s: 4,
                w: 4,
            },
            bounds: {
                n: "Ridge Road",
                e: "",
                s: "Sundown Lane",
                w: "Angel Food Cake Street",
            }
        },
            {
            x: 2,
            y: 1,
            block_tile_x:128,
            block_tile_y:40,
            tile_x:128,
            tile_y:44,
            width: 57,
            height: 32,
            top: 44,
            right: 185,
            bottom: 76,
            left: 128,
            center: {
                x: 156.5,
                y: 60
            },
            ground: "grass",
            offset: {
                n: 4,
                e: 7,
                s: 4,
                w: 0,
            },
            bounds: {
                n: "Ridge Road",
                e: "Midline Ave",
                s: "Sundown Lane",
                w: "",
            }
        },
            {
            x: 1,
            y: 3,
            block_tile_x:64,
            block_tile_y:120,
            tile_x:68,
            tile_y:124,
            width: 60,
            height: 32,
            top: 124,
            right: 128,
            bottom: 156,
            left: 68,
            center: {
                x: 98,
                y: 140
            },
            ground: "grass",
            offset: {
                n: 4,
                e: 0,
                s: 4,
                w: 4,
            },
            bounds: {
                n: "Belly Button Street",
                e: "",
                s: "Lower Field Street",
                w: "Angel Food Cake Street",
            }
        },
            {
            x: 0,
            y: 1,
            block_tile_x:0,
            block_tile_y:40,
            tile_x:0,
            tile_y:40,
            width: 60,
            height: 36,
            top: 40,
            right: 60,
            bottom: 76,
            left: 0,
            center: {
                x: 30,
                y: 58
            },
            ground: "dirt",
            offset: {
                n: 0,
                e: 4,
                s: 4,
                w: 0,
            },
            bounds: {
                n: "",
                e: "Angel Food Cake Street",
                s: "Sundown Lane",
                w: "",
            }
        },
            {
            x: 1,
            y: 0,
            block_tile_x:64,
            block_tile_y:0,
            tile_x:64,
            tile_y:0,
            width: 64,
            height: 36,
            top: 0,
            right: 128,
            bottom: 36,
            left: 64,
            center: {
                x: 96,
                y: 18
            },
            ground: "forest",
            offset: {
                n: 0,
                e: 0,
                s: 4,
                w: 0,
            },
            bounds: {
                n: "",
                e: "",
                s: "Ridge Road",
                w: "",
            }
        },
            {
            x: 2,
            y: 0,
            block_tile_x:128,
            block_tile_y:0,
            tile_x:128,
            tile_y:0,
            width: 57,
            height: 36,
            top: 0,
            right: 185,
            bottom: 36,
            left: 128,
            center: {
                x: 156.5,
                y: 18
            },
            ground: "forest",
            offset: {
                n: 0,
                e: 7,
                s: 4,
                w: 0,
            },
            bounds: {
                n: "",
                e: "Midline Ave",
                s: "Ridge Road",
                w: "",
            }
        },
            {
            x: 4,
            y: 0,
            block_tile_x:256,
            block_tile_y:0,
            tile_x:256,
            tile_y:0,
            width: 64,
            height: 40,
            top: 0,
            right: 320,
            bottom: 40,
            left: 256,
            center: {
                x: 288,
                y: 20
            },
            ground: "forest",
            offset: {
                n: 0,
                e: 0,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "",
                e: "",
                s: "",
                w: "",
            }
        },
            {
            x: 4,
            y: 4,
            block_tile_x:256,
            block_tile_y:160,
            tile_x:256,
            tile_y:160,
            width: 64,
            height: 40,
            top: 160,
            right: 320,
            bottom: 200,
            left: 256,
            center: {
                x: 288,
                y: 180
            },
            ground: "forest",
            offset: {
                n: 0,
                e: 0,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "",
                e: "",
                s: "",
                w: "",
            }
        },
            {
            x: 0,
            y: 4,
            block_tile_x:0,
            block_tile_y:160,
            tile_x:0,
            tile_y:160,
            width: 64,
            height: 40,
            top: 160,
            right: 64,
            bottom: 200,
            left: 0,
            center: {
                x: 32,
                y: 180
            },
            ground: "forest",
            offset: {
                n: 0,
                e: 0,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "",
                e: "",
                s: "",
                w: "",
            }
        },
            {
            x: 0,
            y: 3,
            block_tile_x:0,
            block_tile_y:120,
            tile_x:0,
            tile_y:120,
            width: 60,
            height: 40,
            top: 120,
            right: 60,
            bottom: 160,
            left: 0,
            center: {
                x: 30,
                y: 140
            },
            ground: "grass",
            offset: {
                n: 0,
                e: 4,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "",
                e: "Angel Food Cake Street",
                s: "",
                w: "",
            }
        },
            {
            x: 2,
            y: 2,
            block_tile_x:128,
            block_tile_y:80,
            tile_x:131,
            tile_y:84,
            width: 54,
            height: 32,
            top: 84,
            right: 185,
            bottom: 116,
            left: 131,
            center: {
                x: 158,
                y: 100
            },
            ground: "cement",
            offset: {
                n: 4,
                e: 7,
                s: 4,
                w: 3,
            },
            bounds: {
                n: "Sundown Lane",
                e: "Midline Ave",
                s: "Belly Button Street",
                w: "Brambleberry Street",
            }
        },
            {
            x: 2,
            y: 3,
            block_tile_x:128,
            block_tile_y:120,
            tile_x:128,
            tile_y:124,
            width: 57,
            height: 32,
            top: 124,
            right: 185,
            bottom: 156,
            left: 128,
            center: {
                x: 156.5,
                y: 140
            },
            ground: "cement",
            offset: {
                n: 4,
                e: 7,
                s: 4,
                w: 0,
            },
            bounds: {
                n: "Belly Button Street",
                e: "Midline Ave",
                s: "Lower Field Street",
                w: "",
            }
        },
            {
            x: 3,
            y: 2,
            block_tile_x:192,
            block_tile_y:80,
            tile_x:199,
            tile_y:84,
            width: 53,
            height: 33,
            top: 84,
            right: 252,
            bottom: 117,
            left: 199,
            center: {
                x: 225.5,
                y: 100.5
            },
            ground: "grass",
            offset: {
                n: 4,
                e: 4,
                s: 3,
                w: 7,
            },
            bounds: {
                n: "Sundown Lane",
                e: "Milton Street",
                s: "Belly Button Street",
                w: "Midline Ave",
            }
        },
            {
            x: 4,
            y: 1,
            block_tile_x:256,
            block_tile_y:40,
            tile_x:256,
            tile_y:40,
            width: 64,
            height: 40,
            top: 40,
            right: 320,
            bottom: 80,
            left: 256,
            center: {
                x: 288,
                y: 60
            },
            ground: "grass",
            offset: {
                n: 0,
                e: 0,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "",
                e: "",
                s: "",
                w: "",
            }
        },
            {
            x: 3,
            y: 0,
            block_tile_x:192,
            block_tile_y:0,
            tile_x:199,
            tile_y:0,
            width: 57,
            height: 40,
            top: 0,
            right: 256,
            bottom: 40,
            left: 199,
            center: {
                x: 227.5,
                y: 20
            },
            ground: "grass",
            offset: {
                n: 0,
                e: 0,
                s: 0,
                w: 7,
            },
            bounds: {
                n: "",
                e: "",
                s: "",
                w: "Midline Ave",
            }
        },
            {
            x: 4,
            y: 3,
            block_tile_x:256,
            block_tile_y:120,
            tile_x:260,
            tile_y:120,
            width: 60,
            height: 40,
            top: 120,
            right: 320,
            bottom: 160,
            left: 260,
            center: {
                x: 290,
                y: 140
            },
            ground: "grass",
            offset: {
                n: 0,
                e: 0,
                s: 0,
                w: 4,
            },
            bounds: {
                n: "",
                e: "",
                s: "",
                w: "Milton Street",
            }
        },
            {
            x: 3,
            y: 4,
            block_tile_x:192,
            block_tile_y:160,
            tile_x:199,
            tile_y:164,
            width: 57,
            height: 36,
            top: 164,
            right: 256,
            bottom: 200,
            left: 199,
            center: {
                x: 227.5,
                y: 182
            },
            ground: "grass",
            offset: {
                n: 4,
                e: 0,
                s: 0,
                w: 7,
            },
            bounds: {
                n: "Lower Field Street",
                e: "",
                s: "",
                w: "Midline Ave",
            }
        },
            {
            x: 1,
            y: 4,
            block_tile_x:64,
            block_tile_y:160,
            tile_x:64,
            tile_y:164,
            width: 64,
            height: 36,
            top: 164,
            right: 128,
            bottom: 200,
            left: 64,
            center: {
                x: 96,
                y: 182
            },
            ground: "grass",
            offset: {
                n: 4,
                e: 0,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "Lower Field Street",
                e: "",
                s: "",
                w: "",
            }
        },
            {
            x: 3,
            y: 1,
            block_tile_x:192,
            block_tile_y:40,
            tile_x:199,
            tile_y:40,
            width: 57,
            height: 36,
            top: 40,
            right: 256,
            bottom: 76,
            left: 199,
            center: {
                x: 227.5,
                y: 58
            },
            ground: "dirt",
            offset: {
                n: 0,
                e: 0,
                s: 4,
                w: 7,
            },
            bounds: {
                n: "",
                e: "",
                s: "Sundown Lane",
                w: "Midline Ave",
            }
        },
            {
            x: 0,
            y: 2,
            block_tile_x:0,
            block_tile_y:80,
            tile_x:0,
            tile_y:84,
            width: 60,
            height: 36,
            top: 84,
            right: 60,
            bottom: 120,
            left: 0,
            center: {
                x: 30,
                y: 102
            },
            ground: "dirt",
            offset: {
                n: 4,
                e: 4,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "Sundown Lane",
                e: "Angel Food Cake Street",
                s: "",
                w: "",
            }
        },
            {
            x: 1,
            y: 2,
            block_tile_x:64,
            block_tile_y:80,
            tile_x:68,
            tile_y:84,
            width: 57,
            height: 32,
            top: 84,
            right: 125,
            bottom: 116,
            left: 68,
            center: {
                x: 96.5,
                y: 100
            },
            ground: "grass",
            offset: {
                n: 4,
                e: 3,
                s: 4,
                w: 4,
            },
            bounds: {
                n: "Sundown Lane",
                e: "Brambleberry Street",
                s: "Belly Button Street",
                w: "Angel Food Cake Street",
            }
        },
            {
            x: 4,
            y: 2,
            block_tile_x:256,
            block_tile_y:80,
            tile_x:260,
            tile_y:80,
            width: 60,
            height: 40,
            top: 80,
            right: 320,
            bottom: 120,
            left: 260,
            center: {
                x: 290,
                y: 100
            },
            ground: "dirt",
            offset: {
                n: 0,
                e: 0,
                s: 0,
                w: 4,
            },
            bounds: {
                n: "",
                e: "",
                s: "",
                w: "Milton Street",
            }
        },
            {
            x: 2,
            y: 4,
            block_tile_x:128,
            block_tile_y:160,
            tile_x:128,
            tile_y:164,
            width: 57,
            height: 36,
            top: 164,
            right: 185,
            bottom: 200,
            left: 128,
            center: {
                x: 156.5,
                y: 182
            },
            ground: "dirt",
            offset: {
                n: 4,
                e: 7,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "Lower Field Street",
                e: "Midline Ave",
                s: "",
                w: "",
            }
        },
        ],
    nodes: [   
            {
            x: 3,
            y: 3,
            center_x: 192,
            center_y: 120,
            tile_x: 185,
            tile_y: 116,
            top: 116,
            right: 199,
            bottom: 124,
            left: 185,
            width: 14,
            height: 8,

            streets: {  
                n: {
                                        lanes: 2,
                    name: "Midline Ave",
                    dir: "ns",
                    connect: 2,
                    sidewalk: 1,
                    parking: 0,
                    signal: 2,
                                        found: 1
                },
                e: {
                                        lanes: 1,
                    name: "Belly Button Street",
                    dir: "e",
                    connect: 4,
                    sidewalk: 1,
                    signal: 2,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 2,
                    name: "Midline Ave",
                    dir: "ns",
                    connect: 4,
                    sidewalk: 1,
                    signal: 2,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                    lanes: 1,
                    name: "Belly Button Street",
                    dir: "ew",
                    connect: 2,
                    sidewalk: 1,
                    parking: 0,
                    signal: 2,                                                                                                                                                                                                                                                                                                            found: 1
                },
            },
        },
            {
            x: 2,
            y: 3,
            center_x: 128,
            center_y: 120,
            tile_x: 125,
            tile_y: 116,
            top: 116,
            right: 131,
            bottom: 124,
            left: 125,
            width: 6,
            height: 8,

            streets: {  
                n: {
                                        lanes: 1,
                    name: "Brambleberry Street",
                    dir: "s",
                    connect: 2,
                    sidewalk: 1,
                    parking: 0,
                    signal: 1,
                                        found: 1
                },
                e: {
                                        lanes: 1,
                    name: "Belly Button Street",
                    dir: "ew",
                    connect: 3,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 1,
                    name: "Brambleberry Street",
                    dir: "ns",
                    connect: -1,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                                            lanes: 1,
                    name: "Belly Button Street",
                    dir: "ew",
                    connect: 1,
                    sidewalk: 1,
                    parking: 0,
                    signal: 0,                                                                                                                                                                                                                                                                    found: 1
                },
            },
        },
            {
            x: 2,
            y: 2,
            center_x: 128,
            center_y: 80,
            tile_x: 125,
            tile_y: 76,
            top: 76,
            right: 131,
            bottom: 84,
            left: 125,
            width: 6,
            height: 8,

            streets: {  
                n: {
                                        found: 0
                },
                e: {
                                        lanes: 1,
                    name: "Sundown Lane",
                    dir: "ew",
                    connect: 3,
                    sidewalk: 1,
                    signal: 1,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 1,
                    name: "Brambleberry Street",
                    dir: "s",
                    connect: 3,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                                                                                    lanes: 1,
                    name: "Sundown Lane",
                    dir: "ew",
                    connect: 1,
                    sidewalk: 1,
                    parking: 0,
                    signal: 1,                                                                                                                                                                                                                            found: 1
                },
            },
        },
            {
            x: 1,
            y: 3,
            center_x: 64,
            center_y: 120,
            tile_x: 60,
            tile_y: 116,
            top: 116,
            right: 68,
            bottom: 124,
            left: 60,
            width: 8,
            height: 8,

            streets: {  
                n: {
                                        lanes: 1,
                    name: "Angel Food Cake Street",
                    dir: "ns",
                    connect: 2,
                    sidewalk: 1,
                    parking: 0,
                    signal: 2,
                                        found: 1
                },
                e: {
                                        lanes: 1,
                    name: "Belly Button Street",
                    dir: "ew",
                    connect: 2,
                    sidewalk: 1,
                    signal: 2,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 1,
                    name: "Angel Food Cake Street",
                    dir: "ns",
                    connect: 4,
                    sidewalk: 1,
                    signal: 2,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                                                                                                                                                                                                                                                                                            found: 0
                },
            },
        },
            {
            x: 4,
            y: 2,
            center_x: 256,
            center_y: 80,
            tile_x: 252,
            tile_y: 76,
            top: 76,
            right: 260,
            bottom: 84,
            left: 252,
            width: 8,
            height: 8,

            streets: {  
                n: {
                                        found: 0
                },
                e: {
                                        lanes: 1,
                    name: "Sundown Lane",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 1,
                    name: "Milton Street",
                    dir: "ns",
                    connect: 3,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                                                                                                                                                                    lanes: 1,
                    name: "Sundown Lane",
                    dir: "ew",
                    connect: 3,
                    sidewalk: 1,
                    parking: 0,
                    signal: 0,                                                                                                                                            found: 1
                },
            },
        },
            {
            x: 1,
            y: 2,
            center_x: 64,
            center_y: 80,
            tile_x: 60,
            tile_y: 76,
            top: 76,
            right: 68,
            bottom: 84,
            left: 60,
            width: 8,
            height: 8,

            streets: {  
                n: {
                                        lanes: 1,
                    name: "Angel Food Cake Street",
                    dir: "ns",
                    connect: 1,
                    sidewalk: 1,
                    parking: 0,
                    signal: 2,
                                        found: 1
                },
                e: {
                                        lanes: 1,
                    name: "Sundown Lane",
                    dir: "ew",
                    connect: 2,
                    sidewalk: 1,
                    signal: 2,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 1,
                    name: "Angel Food Cake Street",
                    dir: "ns",
                    connect: 3,
                    sidewalk: 1,
                    signal: 2,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                                                                                                                                                                                                                                                    lanes: 1,
                    name: "Sundown Lane",
                    dir: "ew",
                    connect: 0,
                    sidewalk: 1,
                    parking: 0,
                    signal: 2,                                                            found: 1
                },
            },
        },
            {
            x: 3,
            y: 4,
            center_x: 192,
            center_y: 160,
            tile_x: 185,
            tile_y: 156,
            top: 156,
            right: 199,
            bottom: 164,
            left: 185,
            width: 14,
            height: 8,

            streets: {  
                n: {
                                        lanes: 2,
                    name: "Midline Ave",
                    dir: "ns",
                    connect: 3,
                    sidewalk: 1,
                    parking: 0,
                    signal: 2,
                                        found: 1
                },
                e: {
                                        lanes: 1,
                    name: "Lower Field Street",
                    dir: "ew",
                    connect: 4,
                    sidewalk: 1,
                    signal: 2,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 2,
                    name: "Midline Ave",
                    dir: "ns",
                    connect: 5,
                    sidewalk: 1,
                    signal: 2,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                                                                                                                                                                                                                                lanes: 1,
                    name: "Lower Field Street",
                    dir: "ew",
                    connect: 1,
                    sidewalk: 1,
                    parking: 0,
                    signal: 2,                                                                                found: 1
                },
            },
        },
            {
            x: 3,
            y: 5,
            center_x: 192,
            center_y: 200,
            tile_x: 185,
            tile_y: 197,
            top: 197,
            right: 199,
            bottom: 204,
            left: 185,
            width: 14,
            height: 7,

            streets: {  
                n: {
                                        lanes: 2,
                    name: "Midline Ave",
                    dir: "ns",
                    connect: 4,
                    sidewalk: 1,
                    parking: 0,
                    signal: 0,
                                        found: 1
                },
                e: {
                                        lanes: 1,
                    name: "",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 1,
                    name: "Midline Ave",
                    dir: "ns",
                    connect: -1,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                                                                                                                                                                                                                                                                                            found: 0
                },
            },
        },
            {
            x: 3,
            y: 0,
            center_x: 192,
            center_y: 0,
            tile_x: 185,
            tile_y: -3,
            top: -3,
            right: 199,
            bottom: 4,
            left: 185,
            width: 14,
            height: 7,

            streets: {  
                n: {
                                        found: 0
                },
                e: {
                                        lanes: 1,
                    name: "",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 2,
                    name: "Midline Ave",
                    dir: "ns",
                    connect: 1,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                                                                                                                                                                                                                                                                                            found: 0
                },
            },
        },
            {
            x: 3,
            y: 2,
            center_x: 192,
            center_y: 80,
            tile_x: 185,
            tile_y: 76,
            top: 76,
            right: 199,
            bottom: 84,
            left: 185,
            width: 14,
            height: 8,

            streets: {  
                n: {
                                        lanes: 2,
                    name: "Midline Ave",
                    dir: "ns",
                    connect: 1,
                    sidewalk: 1,
                    parking: 0,
                    signal: 2,
                                        found: 1
                },
                e: {
                                        lanes: 1,
                    name: "Sundown Lane",
                    dir: "ew",
                    connect: 4,
                    sidewalk: 1,
                    signal: 2,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 2,
                    name: "Midline Ave",
                    dir: "ns",
                    connect: 3,
                    sidewalk: 1,
                    signal: 2,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                        lanes: 1,
                    name: "Sundown Lane",
                    dir: "ew",
                    connect: 2,
                    sidewalk: 1,
                    parking: 0,
                    signal: 2,                                                                                                                                                                                                                                                                                        found: 1
                },
            },
        },
            {
            x: 4,
            y: 3,
            center_x: 256,
            center_y: 120,
            tile_x: 252,
            tile_y: 117,
            top: 117,
            right: 260,
            bottom: 123,
            left: 252,
            width: 8,
            height: 6,

            streets: {  
                n: {
                                        lanes: 1,
                    name: "Milton Street",
                    dir: "ns",
                    connect: 2,
                    sidewalk: 1,
                    parking: 0,
                    signal: 1,
                                        found: 1
                },
                e: {
                                        lanes: 1,
                    name: "Belly Button Street",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 1,
                    name: "Milton Street",
                    dir: "ns",
                    connect: 4,
                    sidewalk: 1,
                    signal: 1,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                lanes: 1,
                    name: "Belly Button Street",
                    dir: "e",
                    connect: 3,
                    sidewalk: 1,
                    parking: 0,
                    signal: 1,                                                                                                                                                                                                                                                                                                                                found: 1
                },
            },
        },
            {
            x: 4,
            y: 4,
            center_x: 256,
            center_y: 160,
            tile_x: 252,
            tile_y: 156,
            top: 156,
            right: 260,
            bottom: 164,
            left: 252,
            width: 8,
            height: 8,

            streets: {  
                n: {
                                        lanes: 1,
                    name: "Milton Street",
                    dir: "ns",
                    connect: 3,
                    sidewalk: 1,
                    parking: 0,
                    signal: 0,
                                        found: 1
                },
                e: {
                                        lanes: 1,
                    name: "Lower Field Street",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 1,
                    name: "Milton Street",
                    dir: "ns",
                    connect: -1,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                                                                                                        lanes: 1,
                    name: "Lower Field Street",
                    dir: "ew",
                    connect: 3,
                    sidewalk: 1,
                    parking: 0,
                    signal: 0,                                                                                                                                                                                                        found: 1
                },
            },
        },
            {
            x: 1,
            y: 4,
            center_x: 64,
            center_y: 160,
            tile_x: 60,
            tile_y: 156,
            top: 156,
            right: 68,
            bottom: 164,
            left: 60,
            width: 8,
            height: 8,

            streets: {  
                n: {
                                        lanes: 1,
                    name: "Angel Food Cake Street",
                    dir: "ns",
                    connect: 3,
                    sidewalk: 1,
                    parking: 0,
                    signal: 0,
                                        found: 1
                },
                e: {
                                        lanes: 1,
                    name: "Lower Field Street",
                    dir: "ew",
                    connect: 3,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 1,
                    name: "Angel Food Cake Street",
                    dir: "ns",
                    connect: -1,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                                                                                                                                                                                                                                                                                            found: 0
                },
            },
        },
            {
            x: 0,
            y: 2,
            center_x: 0,
            center_y: 80,
            tile_x: -3,
            tile_y: 76,
            top: 76,
            right: 4,
            bottom: 84,
            left: -3,
            width: 7,
            height: 8,

            streets: {  
                n: {
                                        found: 0
                },
                e: {
                                        lanes: 1,
                    name: "Sundown Lane",
                    dir: "ew",
                    connect: 1,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 1,
                    name: "",
                    dir: "ns",
                    connect: -1,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                                                                                                                                                                                                                                                                                            found: 0
                },
            },
        },
            {
            x: 1,
            y: 1,
            center_x: 64,
            center_y: 40,
            tile_x: 60,
            tile_y: 36,
            top: 36,
            right: 68,
            bottom: 44,
            left: 60,
            width: 8,
            height: 8,

            streets: {  
                n: {
                                        found: 0
                },
                e: {
                                        lanes: 1,
                    name: "Ridge Road",
                    dir: "ew",
                    connect: 3,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 1,
                    name: "Angel Food Cake Street",
                    dir: "ns",
                    connect: 2,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                                                                                                                                                                                                                                                                                            found: 0
                },
            },
        },
            {
            x: 3,
            y: 1,
            center_x: 192,
            center_y: 40,
            tile_x: 185,
            tile_y: 36,
            top: 36,
            right: 199,
            bottom: 44,
            left: 185,
            width: 14,
            height: 8,

            streets: {  
                n: {
                                        lanes: 2,
                    name: "Midline Ave",
                    dir: "ns",
                    connect: 0,
                    sidewalk: 1,
                    parking: 0,
                    signal: 2,
                                        found: 1
                },
                e: {
                                        lanes: 1,
                    name: "Ridge Road",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    signal: 0,
                    parking: 0,                    found: 1
                },
                s: {
                                        lanes: 2,
                    name: "Midline Ave",
                    dir: "ns",
                    connect: 2,
                    sidewalk: 1,
                    signal: 2,
                    parking: 0,                    found: 1
                },
                w: {
                                                                                                                                                                                                                                                                                                                                                                        lanes: 1,
                    name: "Ridge Road",
                    dir: "ew",
                    connect: 1,
                    sidewalk: 1,
                    parking: 0,
                    signal: 2,                                        found: 1
                },
            },
        },
        ],
    propertyLines: [
                {
            lines: {
                x: 3,
                y: 3,
                width: 12,
                height: 27
            },
            block: {
                x: 3,
                y: 2
            },
            address: {
                name: "",
                facing: "S",
                dir: "E",
                number: "101",
                street: "Belly Button Street",
            },
            structure: {
                type: "DUPLEX-LEFT",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 15,
                y: 3,
                width: 12,
                height: 27
            },
            block: {
                x: 3,
                y: 2
            },
            address: {
                name: "",
                facing: "S",
                dir: "E",
                number: "103",
                street: "Belly Button Street",
            },
            structure: {
                type: "DUPLEX-RIGHT",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 27,
                y: 3,
                width: 12,
                height: 27
            },
            block: {
                x: 3,
                y: 2
            },
            address: {
                name: "",
                facing: "S",
                dir: "E",
                number: "105",
                street: "Belly Button Street",
            },
            structure: {
                type: "DUPLEX-LEFT",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 39,
                y: 3,
                width: 12,
                height: 27
            },
            block: {
                x: 3,
                y: 2
            },
            address: {
                name: "",
                facing: "S",
                dir: "E",
                number: "107",
                street: "Belly Button Street",
            },
            structure: {
                type: "DUPLEX-RIGHT",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 3,
                y: 3,
                width: 20,
                height: 11
            },
            block: {
                x: 2,
                y: 3
            },
            address: {
                name: "",
                facing: "N",
                dir: "W",
                number: "100",
                street: "Belly Button Street",
            },
            structure: {
                type: "CORNER-STORE-LEFT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "CORPORATION",
name: "Ossifcorp",
listingName: "Ossifcorp Industries",
schedule: {
    monday: {
        closed: "FALSE",
        open: "09:00",
        close: "17:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "09:00",
        close: "17:00"
            }, 
    wednesday: {
        closed: "FALSE",
        open: "09:00",
        close: "17:00"
            },
    thursday: {
        closed: "FALSE",
        open: "09:00",
        close: "17:00"
            },
    friday: {
        closed: "FALSE",
        open: "09:00",
        close: "17:00"
            },
    saturday: {
        closed: "TRUE",    },
    sunday: {
        closed: "TRUE",    }
},
                rooms: {
    }
                
            },
                                                                                            },
                {
            lines: {
                x: 38,
                y: 3,
                width: 6,
                height: 26
            },
            block: {
                x: 2,
                y: 2
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "101",
                street: "Belly Button Street",
            },
            structure: {
                type: "STOREFRONT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "PAWN SHOP",
name: "Pawn Shop",
listingName: "Break of Pawn - Pawn Shop",
schedule: {
    monday: {
        closed: "FALSE",
        open: "10:00",
        close: "19:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "10:00",
        close: "19:00"
            }, 
    wednesday: {
        closed: "TRUE",    },
    thursday: {
        closed: "FALSE",
        open: "10:00",
        close: "19:00"
            },
    friday: {
        closed: "FALSE",
        open: "10:00",
        close: "20:00"
            },
    saturday: {
        closed: "FALSE",
        open: "10:00",
        close: "20:00"
            },
    sunday: {
        closed: "FALSE",
        open: "11:00",
        close: "16:00"
            }
},
sells: [
            "POCKET_KNIFE", 
                        "BACKPACK_BROWN", 
                "DIGITAL_WATCH"
        ],
buys: [
                    "POCKET_KNIFE", 
                        ],
                front_room: 13,rooms: {
        room_13: { 
    id: 13,
    name: "Pawn Shop",
    floorWidth: 6,
    floorHeight: 9,
    wallHeight: 4,
    overallHeight: 11,
    overallWidth: 8,
    floorSlug: "PLANK.BROWN_",
    wallSlug: "PAINT.DARK_GREEN_WORN_",
        listing: { slug: "PAWN SHOP",
name: "Pawn Shop",
listingName: "Break of Pawn - Pawn Shop",
schedule: {
    monday: {
        closed: "FALSE",
        open: "10:00",
        close: "19:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "10:00",
        close: "19:00"
            }, 
    wednesday: {
        closed: "TRUE",    },
    thursday: {
        closed: "FALSE",
        open: "10:00",
        close: "19:00"
            },
    friday: {
        closed: "FALSE",
        open: "10:00",
        close: "20:00"
            },
    saturday: {
        closed: "FALSE",
        open: "10:00",
        close: "20:00"
            },
    sunday: {
        closed: "FALSE",
        open: "11:00",
        close: "16:00"
            }
},
sells: [
            "POCKET_KNIFE", 
                        "BACKPACK_BROWN", 
                "DIGITAL_WATCH"
        ],
buys: [
                    "POCKET_KNIFE", 
                        ],
 },
        roomData: { 
                featureList: [{"x":"1","y":"-1","slug":"COUNTERTOP_CORNER_BROWN"},{"x":"0","y":"-1","slug":"COUNTERTOP_S_BROWN"},{"x":"0","y":"0","slug":"UNDERCOUNTER_CABINET_S_DARK_WOOD"},{"x":"1","y":"0","slug":"UNDERCOUNTER_CABINET_S_DARK_WOOD"},{"x":"2","y":"1","slug":"UNDERCOUNTER_CABINET_W_DARK_WOOD"},{"x":"0","y":"4","slug":"STORE_WINDOW_COUNTER_4"},{"x":"4","y":"4","slug":"INT_DOOR_GREEN_SIGN"},{"x":"1","y":"4","slug":"ADDING_MACHINE"},{"x":"0","y":"8","slug":"FRONTDOOR"}],
                recipeList: [],
                removalList: [{"x":"3","y":"0"},{"x":"4","y":"0"},{"x":"5","y":"0"},{"x":"3","y":"1"},{"x":"4","y":"1"},{"x":"5","y":"1"},{"x":"4","y":"2"},{"x":"5","y":"2"},{"x":"4","y":"3"},{"x":"5","y":"3"},{"x":"4","y":"4"},{"x":"5","y":"4"},{"x":"2","y":"8"},{"x":"3","y":"8"},{"x":"4","y":"8"},{"x":"5","y":"8"}]
         }
}

    }
                
            },
                                                                                                            portal: {
                room_id: 13,
                x: 1,
                y: 11
            }
                    },
                {
            lines: {
                x: 28,
                y: 3,
                width: 10,
                height: 26
            },
            block: {
                x: 2,
                y: 2
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "103",
                street: "Belly Button Street",
            },
            structure: {
                type: "STOREFRONT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "LAUNDROMAT",
name: "Coin Wash",
listingName: "Coin Wash Laundry Laundromat",
schedule: {
    monday: {
        closed: "FALSE",
        open: "08:00",
        close: "21:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "08:00",
        close: "21:00"
            }, 
    wednesday: {
        closed: "FALSE",
        open: "08:00",
        close: "21:00"
            },
    thursday: {
        closed: "FALSE",
        open: "08:00",
        close: "21:00"
            },
    friday: {
        closed: "FALSE",
        open: "08:00",
        close: "21:00"
            },
    saturday: {
        closed: "FALSE",
        open: "08:00",
        close: "21:00"
            },
    sunday: {
        closed: "FALSE",
        open: "08:00",
        close: "21:00"
            }
},
services: [
    ],
sells: [
            "LAUNDRY_POWDER", 
                "LAUNDRY_LIQUID", 
                "LAUNDRY_BASKET_PINK", 
                "LAUNDRY_BASKET_BLUE", 
                "SODA_RED", 
                "SODA_GREEN"
        ],
                front_room: 11,rooms: {
        room_11: { 
    id: 11,
    name: "Coin Laundry",
    floorWidth: 10,
    floorHeight: 12,
    wallHeight: 3,
    overallHeight: 14,
    overallWidth: 12,
    floorSlug: "TILE.CHECKERED_GREEN_BLUE_PURPLE_BLACK_",
    wallSlug: "PAINT.GRAY_WORN_",
        listing: { slug: "LAUNDROMAT",
name: "Coin Wash",
listingName: "Coin Wash Laundry Laundromat",
schedule: {
    monday: {
        closed: "FALSE",
        open: "08:00",
        close: "21:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "08:00",
        close: "21:00"
            }, 
    wednesday: {
        closed: "FALSE",
        open: "08:00",
        close: "21:00"
            },
    thursday: {
        closed: "FALSE",
        open: "08:00",
        close: "21:00"
            },
    friday: {
        closed: "FALSE",
        open: "08:00",
        close: "21:00"
            },
    saturday: {
        closed: "FALSE",
        open: "08:00",
        close: "21:00"
            },
    sunday: {
        closed: "FALSE",
        open: "08:00",
        close: "21:00"
            }
},
services: [
    ],
sells: [
            "LAUNDRY_POWDER", 
                "LAUNDRY_LIQUID", 
                "LAUNDRY_BASKET_PINK", 
                "LAUNDRY_BASKET_BLUE", 
                "SODA_RED", 
                "SODA_GREEN"
        ],
 },
        roomData: { 
                featureList: [{"x":"3","y":"1","slug":"LAUNDRY_COMMERCIAL_DRYER"},{"x":"5","y":"1","slug":"LAUNDRY_COMMERCIAL_DRYER"},{"x":"7","y":"1","slug":"LAUNDRY_COMMERCIAL_DRYER"},{"x":"5","y":"5","slug":"TABLE_WOOD_FOLDING_JAMMED"},{"x":"1","y":"11","slug":"FRONTDOOR"}],
                recipeList: [],
                removalList: [{"x":"3","y":"0"},{"x":"4","y":"0"},{"x":"5","y":"0"},{"x":"6","y":"0"},{"x":"7","y":"0"},{"x":"8","y":"0"},{"x":"2","y":"11"},{"x":"3","y":"11"},{"x":"4","y":"11"},{"x":"5","y":"11"},{"x":"6","y":"11"},{"x":"7","y":"11"},{"x":"8","y":"11"},{"x":"9","y":"11"}]
         }
}

    }
                
            },
                                                                                                            portal: {
                room_id: 11,
                x: 2,
                y: 14
            }
                    },
                {
            lines: {
                x: 22,
                y: 3,
                width: 6,
                height: 26
            },
            block: {
                x: 2,
                y: 2
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "105",
                street: "Belly Button Street",
            },
            structure: {
                type: "STOREFRONT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "LOCKSMITH",
name: "Locksmith",
listingName: "Keys Cut Locks Opened",
schedule: {
    monday: {
        closed: "FALSE",
        open: "10:00",
        close: "19:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "10:00",
        close: "19:00"
            }, 
    wednesday: {
        closed: "FALSE",
        open: "10:00",
        close: "19:00"
            },
    thursday: {
        closed: "FALSE",
        open: "10:00",
        close: "19:00"
            },
    friday: {
        closed: "FALSE",
        open: "10:00",
        close: "18:00"
            },
    saturday: {
        closed: "FALSE",
        open: "10:00",
        close: "14:00"
            },
    sunday: {
        closed: "TRUE",    }
},
services: [
        {
        slug: "COPY_KEY",
        name: "Copy key",
        requirements: 
        {
            
req_group_name: 'Copy Key',
req_pocket_action: '',
req_world_action: '',
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
    result: 'DUPLICATED',
    ITEM_KIND: 'KEY',
    },
  {
    slot_type: 'IN_COINPURSE',
    type: 'MONEY',
    result: 'CONSUMED',
    MONEY: '200'
    }
]
          },
        
    }    
        
    ],
sells: [
            "COMBO_LOCK_RED", 
                "COMBO_LOCK_BLUE", 
                "PADLOCK"
        ],
                front_room: 12,rooms: {
        room_12: { 
    id: 12,
    name: "Locksmith",
    floorWidth: 6,
    floorHeight: 7,
    wallHeight: 4,
    overallHeight: 9,
    overallWidth: 8,
    floorSlug: "TILE.GREEN_CHECKERED_",
    wallSlug: "PAINT.GREEN_PURPLE_",
        listing: { slug: "LOCKSMITH",
name: "Locksmith",
listingName: "Keys Cut Locks Opened",
schedule: {
    monday: {
        closed: "FALSE",
        open: "10:00",
        close: "19:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "10:00",
        close: "19:00"
            }, 
    wednesday: {
        closed: "FALSE",
        open: "10:00",
        close: "19:00"
            },
    thursday: {
        closed: "FALSE",
        open: "10:00",
        close: "19:00"
            },
    friday: {
        closed: "FALSE",
        open: "10:00",
        close: "18:00"
            },
    saturday: {
        closed: "FALSE",
        open: "10:00",
        close: "14:00"
            },
    sunday: {
        closed: "TRUE",    }
},
services: [
        {
        slug: "COPY_KEY",
        name: "Copy key",
        requirements: 
        {
            
req_group_name: 'Copy Key',
req_pocket_action: '',
req_world_action: '',
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
    result: 'DUPLICATED',
    ITEM_KIND: 'KEY',
    },
  {
    slot_type: 'IN_COINPURSE',
    type: 'MONEY',
    result: 'CONSUMED',
    MONEY: '200'
    }
]
          },
        
    }    
        
    ],
sells: [
            "COMBO_LOCK_RED", 
                "COMBO_LOCK_BLUE", 
                "PADLOCK"
        ],
 },
        roomData: { 
                featureList: [{"x":"3","y":"3","slug":"STORE_WINDOW_COUNTER_3"},{"x":"0","y":"3","slug":"INT_DOOR_RED_BROWN_SIGN"},{"x":"2","y":"2","slug":"WALL_CALENDAR"},{"x":"4","y":"3","slug":"ADDING_MACHINE"},{"x":"3","y":"3","slug":"COUNTER_BELL"},{"x":"2","y":"1","slug":"NO_SMOKING_PAPER"},{"x":"3","y":"2","slug":"PAPER_SIGN_ARROW"},{"x":"0","y":"6","slug":"FRONTDOOR"}],
                recipeList: [{"x":"3","y":"0","slug":"PLANK.BROWN_"},{"x":"4","y":"0","slug":"PLANK.BROWN_"},{"x":"5","y":"0","slug":"PLANK.BROWN_"},{"x":"3","y":"1","slug":"PLANK.BROWN_"},{"x":"4","y":"1","slug":"PLANK.BROWN_"},{"x":"5","y":"1","slug":"PLANK.BROWN_"},{"x":"3","y":"2","slug":"PLANK.BROWN_"},{"x":"4","y":"2","slug":"PLANK.BROWN_"},{"x":"5","y":"2","slug":"PLANK.BROWN_"},{"x":"3","y":"3","slug":"PLANK.BROWN_"},{"x":"4","y":"3","slug":"PLANK.BROWN_"},{"x":"5","y":"3","slug":"PLANK.BROWN_"}],
                removalList: [{"x":"0","y":"0"},{"x":"1","y":"0"},{"x":"2","y":"0"},{"x":"0","y":"1"},{"x":"1","y":"1"},{"x":"2","y":"1"},{"x":"0","y":"2"},{"x":"1","y":"2"},{"x":"2","y":"2"},{"x":"0","y":"3"},{"x":"1","y":"3"},{"x":"2","y":"3"},{"x":"2","y":"6"},{"x":"3","y":"6"},{"x":"4","y":"6"},{"x":"5","y":"6"}]
         }
}

    }
                
            },
                                                                                                            portal: {
                room_id: 12,
                x: 1,
                y: 9
            }
                    },
                {
            lines: {
                x: 16,
                y: 3,
                width: 6,
                height: 26
            },
            block: {
                x: 2,
                y: 2
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "107",
                street: "Belly Button Street",
            },
            structure: {
                type: "STOREFRONT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "PSYCHIC",
name: "Past Present Future",
listingName: "PSYCHIC - PAST PRESENT FUTURE - Fortunes Told",
schedule: {
    monday: {
        closed: "TRUE",    },
    tuesday: {
        closed: "TRUE",    }, 
    wednesday: {
        closed: "FALSE",
        open: "12:00",
        close: "19:00"
            },
    thursday: {
        closed: "FALSE",
        open: "12:00",
        close: "19:00"
            },
    friday: {
        closed: "FALSE",
        open: "12:00",
        close: "19:00"
            },
    saturday: {
        closed: "FALSE",
        open: "13:00",
        close: "21:00"
            },
    sunday: {
        closed: "FALSE",
        open: "13:00",
        close: "18:00"
            }
},
services: [
    ],
                front_room: 14,rooms: {
        room_14: { 
    id: 14,
    name: "Psychic",
    floorWidth: 6,
    floorHeight: 4,
    wallHeight: 3,
    overallHeight: 6,
    overallWidth: 8,
    floorSlug: "PLANK.BROWN_",
    wallSlug: "PAINT.DARK_GREEN_WORN_",
        listing: { slug: "PSYCHIC",
name: "Past Present Future",
listingName: "PSYCHIC - PAST PRESENT FUTURE - Fortunes Told",
schedule: {
    monday: {
        closed: "TRUE",    },
    tuesday: {
        closed: "TRUE",    }, 
    wednesday: {
        closed: "FALSE",
        open: "12:00",
        close: "19:00"
            },
    thursday: {
        closed: "FALSE",
        open: "12:00",
        close: "19:00"
            },
    friday: {
        closed: "FALSE",
        open: "12:00",
        close: "19:00"
            },
    saturday: {
        closed: "FALSE",
        open: "13:00",
        close: "21:00"
            },
    sunday: {
        closed: "FALSE",
        open: "13:00",
        close: "18:00"
            }
},
services: [
    ],
 },
        roomData: { 
                featureList: [{"x":"4","y":"2","slug":"DINER_CHAIR_MAROON"},{"x":"0","y":"3","slug":"FRONTDOOR"}],
                recipeList: [],
                removalList: [{"x":"2","y":"3"},{"x":"3","y":"3"},{"x":"4","y":"3"},{"x":"5","y":"3"}]
         }
}

    }
                
            },
                                                                                                            portal: {
                room_id: 14,
                x: 1,
                y: 6
            }
                    },
                {
            lines: {
                x: 42,
                y: 3,
                width: 12,
                height: 26
            },
            block: {
                x: 1,
                y: 2
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "201",
                street: "Belly Button Street",
            },
            structure: {
                type: "BUNGALOW",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 29,
                y: 3,
                width: 12,
                height: 26
            },
            block: {
                x: 1,
                y: 2
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "203",
                street: "Belly Button Street",
            },
            structure: {
                type: "BUNGALOW",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 16,
                y: 3,
                width: 12,
                height: 26
            },
            block: {
                x: 1,
                y: 2
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "205",
                street: "Belly Button Street",
            },
            structure: {
                type: "BUNGALOW",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 3,
                y: 3,
                width: 12,
                height: 26
            },
            block: {
                x: 1,
                y: 2
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "207",
                street: "Belly Button Street",
            },
            structure: {
                type: "BUNGALOW",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 3,
                y: 3,
                width: 13,
                height: 26
            },
            block: {
                x: 2,
                y: 2
            },
            address: {
                name: "",
                facing: "W",
                dir: "N",
                number: "100",
                street: "Brambleberry Street",
            },
            structure: {
                type: "CORNER-STORE-LEFT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "BONEDEGA",
name: "Bonedega",
listingName: "Bonedega - Bodega Corner Store",
schedule: {
    monday: {
        closed: "FALSE",
        open: "07:00",
        close: "20:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "07:00",
        close: "20:00"
            }, 
    wednesday: {
        closed: "FALSE",
        open: "07:00",
        close: "20:00"
            },
    thursday: {
        closed: "FALSE",
        open: "07:00",
        close: "20:00"
            },
    friday: {
        closed: "FALSE",
        open: "07:00",
        close: "20:00"
            },
    saturday: {
        closed: "FALSE",
        open: "07:00",
        close: "20:00"
            },
    sunday: {
        closed: "TRUE",    }
},
sells: [
            "SODA_RED", 
                "SODA_BLUE", 
                "BANANA_BRUISED", 
                "BEER", 
                "CIGARETTE_SLIM", 
                "MUFFIN_BERRY", 
                "INSTANT_NOODLES_RED", 
                "INSTANT_NOODLES_ORANGE", 
                "CIGARETTE_MENTHOL", 
                "BREAKFAST_TART_PINK", 
                "LOTTO", 
                "BUS_TICKET", 
                "MILK_BODEGA", 
                "CEREAL_BOX_2", 
                "CEREAL_BOX_3", 
                "LIGHTER", 
                "SARDINES_PRODUCT", 
                                "JELLY_RASPBERRY"
        ],
delivers: [
                                                                                                                                                                    ],
                front_room: 1,rooms: {
        room_1: { 
    id: 1,
    name: "Bonedega",
    floorWidth: 12,
    floorHeight: 12,
    wallHeight: 4,
    overallHeight: 14,
    overallWidth: 14,
    floorSlug: "TILE.GREEN_CHECKERED_",
    wallSlug: "PAINT.GREEN_PURPLE_",
        listing: { slug: "BONEDEGA",
name: "Bonedega",
listingName: "Bonedega - Bodega Corner Store",
schedule: {
    monday: {
        closed: "FALSE",
        open: "07:00",
        close: "20:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "07:00",
        close: "20:00"
            }, 
    wednesday: {
        closed: "FALSE",
        open: "07:00",
        close: "20:00"
            },
    thursday: {
        closed: "FALSE",
        open: "07:00",
        close: "20:00"
            },
    friday: {
        closed: "FALSE",
        open: "07:00",
        close: "20:00"
            },
    saturday: {
        closed: "FALSE",
        open: "07:00",
        close: "20:00"
            },
    sunday: {
        closed: "TRUE",    }
},
sells: [
            "SODA_RED", 
                "SODA_BLUE", 
                "BANANA_BRUISED", 
                "BEER", 
                "CIGARETTE_SLIM", 
                "MUFFIN_BERRY", 
                "INSTANT_NOODLES_RED", 
                "INSTANT_NOODLES_ORANGE", 
                "CIGARETTE_MENTHOL", 
                "BREAKFAST_TART_PINK", 
                "LOTTO", 
                "BUS_TICKET", 
                "MILK_BODEGA", 
                "CEREAL_BOX_2", 
                "CEREAL_BOX_3", 
                "LIGHTER", 
                "SARDINES_PRODUCT", 
                                "JELLY_RASPBERRY"
        ],
delivers: [
                                                                                                                                                                    ],
 },
        roomData: { 
                featureList: [{"x":"0","y":"3","slug":"BODEGA_STORE_COUNTER"},{"x":"5","y":"3","slug":"BEADED_CURTAIN_BODEGA"},{"x":"8","y":"3","slug":"INT_DOOR_GREEN_SIGN"},{"x":"1","y":"9","slug":"CARDBOARD_FLOOR_MAT"},{"x":"0","y":"7","slug":"CARDBOARD_DOWN_ARROW"},{"x":"10","y":"4","slug":"COMMERCIAL_FREEZER"},{"x":"0","y":"8","slug":"BASKET_RACK"},{"x":"4","y":"7","slug":"SHOP_SHELVES_MOTTLED"},{"x":"6","y":"7","slug":"SHOP_SHELVES_MOTTLED"},{"x":"8","y":"7","slug":"MILK_CRATE"},{"x":"0","y":"10","slug":"CONE_UPRIGHT"},{"x":"1","y":"11","slug":"FRONTDOOR"}],
                recipeList: [],
                removalList: [{"x":"7","y":"0"},{"x":"8","y":"0"},{"x":"9","y":"0"},{"x":"10","y":"0"},{"x":"11","y":"0"},{"x":"7","y":"1"},{"x":"8","y":"1"},{"x":"9","y":"1"},{"x":"10","y":"1"},{"x":"11","y":"1"},{"x":"7","y":"2"},{"x":"8","y":"2"},{"x":"9","y":"2"},{"x":"10","y":"2"},{"x":"11","y":"2"},{"x":"7","y":"3"},{"x":"8","y":"3"},{"x":"9","y":"3"},{"x":"10","y":"3"},{"x":"11","y":"3"},{"x":"0","y":"11"},{"x":"3","y":"11"},{"x":"4","y":"11"},{"x":"5","y":"11"},{"x":"6","y":"11"},{"x":"7","y":"11"},{"x":"8","y":"11"},{"x":"9","y":"11"},{"x":"10","y":"11"},{"x":"11","y":"11"}]
         }
}

    }
                
            },
                                                                                                            portal: {
                room_id: 1,
                x: 2,
                y: 14
            }
                    },
                {
            lines: {
                x: 3,
                y: 0,
                width: 11,
                height: 33
            },
            block: {
                x: 3,
                y: 3
            },
            address: {
                name: "",
                facing: "S",
                dir: "E",
                number: "101",
                street: "Lower Field Street",
            },
            structure: {
                type: "DUPLEX-LEFT",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 14,
                y: 0,
                width: 11,
                height: 33
            },
            block: {
                x: 3,
                y: 3
            },
            address: {
                name: "",
                facing: "S",
                dir: "E",
                number: "103",
                street: "Lower Field Street",
            },
            structure: {
                type: "DUPLEX-RIGHT",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 25,
                y: 0,
                width: 12,
                height: 33
            },
            block: {
                x: 3,
                y: 3
            },
            address: {
                name: "",
                facing: "S",
                dir: "E",
                number: "105",
                street: "Lower Field Street",
            },
            structure: {
                type: "DUPLEX-LEFT",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 37,
                y: 0,
                width: 12,
                height: 33
            },
            block: {
                x: 3,
                y: 3
            },
            address: {
                name: "",
                facing: "S",
                dir: "E",
                number: "107",
                street: "Lower Field Street",
            },
            structure: {
                type: "DUPLEX-RIGHT",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 33,
                y: 14,
                width: 21,
                height: 15
            },
            block: {
                x: 2,
                y: 3
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "101",
                street: "Lower Field Street",
            },
            structure: {
                type: "CORNER-STORE-LEFT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "HARDWARE",
name: "Bits and Nuts Hardware Store",
listingName: "Bits &amp; Nuts Hardware Store",
schedule: {
    monday: {
        closed: "FALSE",
        open: "08:00",
        close: "19:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "08:00",
        close: "19:00"
            }, 
    wednesday: {
        closed: "TRUE",    },
    thursday: {
        closed: "FALSE",
        open: "08:00",
        close: "19:00"
            },
    friday: {
        closed: "FALSE",
        open: "08:00",
        close: "19:00"
            },
    saturday: {
        closed: "FALSE",
        open: "09:00",
        close: "17:00"
            },
    sunday: {
        closed: "FALSE",
        open: "09:00",
        close: "14:00"
            }
},
sells: [
            "STAPLE_GUN", 
                "STAPLES", 
                "SIDEWALK_CHALK_", 
                "SPADE", 
                "SPRAY_PAINT", 
                "RAKE", 
                "SHOVEL", 
                "WATERING_CAN", 
                "HEDGE_TRIMMERS", 
                "SCISSORS", 
                "SACK_GRASS_SEED", 
                "SACK_MULCH", 
                "BIRD_SEED_BAG", 
                "BROOM", 
                "MOP", 
                "COMBO_LOCK_RED"
        ],
                rooms: {
    }
                
            },
                                                                                            },
                {
            lines: {
                x: 23,
                y: 14,
                width: 10,
                height: 15
            },
            block: {
                x: 2,
                y: 3
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "103",
                street: "Lower Field Street",
            },
            structure: {
                type: "STOREFRONT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "BUTCHER",
name: "Butcher",
listingName: "Flesh and Bone Butcher",
schedule: {
    monday: {
        closed: "FALSE",
        open: "08:00",
        close: "17:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "08:00",
        close: "17:00"
            }, 
    wednesday: {
        closed: "TRUE",    },
    thursday: {
        closed: "FALSE",
        open: "08:00",
        close: "17:00"
            },
    friday: {
        closed: "FALSE",
        open: "08:00",
        close: "17:00"
            },
    saturday: {
        closed: "FALSE",
        open: "09:00",
        close: "16:00"
            },
    sunday: {
        closed: "TRUE",    }
},
                rooms: {
    }
                
            },
                                                                                            },
                {
            lines: {
                x: 13,
                y: 14,
                width: 10,
                height: 15
            },
            block: {
                x: 2,
                y: 3
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "105",
                street: "Lower Field Street",
            },
            structure: {
                type: "STOREFRONT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "BARBER",
name: "Barber",
listingName: "Barber TBA",
schedule: {
    monday: {
        closed: "FALSE",
        open: "09:00",
        close: "18:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "09:00",
        close: "18:00"
            }, 
    wednesday: {
        closed: "TRUE",    },
    thursday: {
        closed: "FALSE",
        open: "09:00",
        close: "18:00"
            },
    friday: {
        closed: "FALSE",
        open: "09:00",
        close: "18:00"
            },
    saturday: {
        closed: "FALSE",
        open: "10:00",
        close: "18:00"
            },
    sunday: {
        closed: "TRUE",    }
},
services: [
    ],
                rooms: {
    }
                
            },
                                                                                            },
                {
            lines: {
                x: 3,
                y: 14,
                width: 10,
                height: 15
            },
            block: {
                x: 2,
                y: 3
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "107",
                street: "Lower Field Street",
            },
            structure: {
                type: "CORNER-STORE-LEFT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "BAR",
name: "Pour Yorick",
listingName: "Pour Yorick",
schedule: {
    monday: {
        closed: "FALSE",
        open: "17:00",
        close: "22:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "17:00",
        close: "22:00"
            }, 
    wednesday: {
        closed: "FALSE",
        open: "17:00",
        close: "22:00"
            },
    thursday: {
        closed: "FALSE",
        open: "17:00",
        close: "22:00"
            },
    friday: {
        closed: "FALSE",
        open: "17:00",
        close: "22:00"
            },
    saturday: {
        closed: "FALSE",
        open: "17:00",
        close: "23:00"
            },
    sunday: {
        closed: "TRUE",    }
},
serves: [
            "BEER"
        ],
                rooms: {
    }
                
            },
                                                                                            },
                {
            lines: {
                x: 44,
                y: 3,
                width: 8,
                height: 26
            },
            block: {
                x: 2,
                y: 2
            },
            address: {
                name: "",
                facing: "E",
                dir: "N",
                number: "101",
                street: "Midline Ave",
            },
            structure: {
                type: "CORNER-STORE-RIGHT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "CHINESE_FOOD",
name: "Lucky Dragon II",
listingName: "Lucky Dragon II",
schedule: {
    monday: {
        closed: "TRUE",    },
    tuesday: {
        closed: "FALSE",
        open: "11:00",
        close: "20:00"
            }, 
    wednesday: {
        closed: "FALSE",
        open: "11:00",
        close: "20:00"
            },
    thursday: {
        closed: "FALSE",
        open: "11:00",
        close: "20:00"
            },
    friday: {
        closed: "FALSE",
        open: "11:00",
        close: "20:00"
            },
    saturday: {
        closed: "FALSE",
        open: "11:00",
        close: "21:00"
            },
    sunday: {
        closed: "FALSE",
        open: "12:00",
        close: "18:00"
            }
},
sells: [
            "CHINESE_FOOD", 
                "CHINESE_FOOD_MARKED", 
                "SOUP_CONTAINER_LARGE", 
                "SOUP_CONTAINER_SMALL", 
                                                        ],
serves: [
                                                                                    ],
delivers: [
                                                            "CHINESE_FOOD", 
                "CHINESE_FOOD_MARKED", 
                "SOUP_CONTAINER_LARGE", 
                "SOUP_CONTAINER_SMALL"
        ],
                front_room: 17,rooms: {
        room_17: { 
    id: 17,
    name: "Diner Test",
    floorWidth: 10,
    floorHeight: 12,
    wallHeight: 3,
    overallHeight: 14,
    overallWidth: 12,
    floorSlug: "TILE.CHECKERED_WHITE_BROWN_",
    wallSlug: "",
        listing: { slug: "CHINESE_FOOD",
name: "Lucky Dragon II",
listingName: "Lucky Dragon II",
schedule: {
    monday: {
        closed: "TRUE",    },
    tuesday: {
        closed: "FALSE",
        open: "11:00",
        close: "20:00"
            }, 
    wednesday: {
        closed: "FALSE",
        open: "11:00",
        close: "20:00"
            },
    thursday: {
        closed: "FALSE",
        open: "11:00",
        close: "20:00"
            },
    friday: {
        closed: "FALSE",
        open: "11:00",
        close: "20:00"
            },
    saturday: {
        closed: "FALSE",
        open: "11:00",
        close: "21:00"
            },
    sunday: {
        closed: "FALSE",
        open: "12:00",
        close: "18:00"
            }
},
sells: [
            "CHINESE_FOOD", 
                "CHINESE_FOOD_MARKED", 
                "SOUP_CONTAINER_LARGE", 
                "SOUP_CONTAINER_SMALL", 
                                                        ],
serves: [
                                                                                    ],
delivers: [
                                                            "CHINESE_FOOD", 
                "CHINESE_FOOD_MARKED", 
                "SOUP_CONTAINER_LARGE", 
                "SOUP_CONTAINER_SMALL"
        ],
 },
        roomData: { 
                featureList: [{"x":"0","y":"2","slug":"DINER_BOOTH_GREEN_S"},{"x":"0","y":"3","slug":"DINER_TABLE"},{"x":"0","y":"5","slug":"DINER_BOOTH_GREEN_N"},{"x":"0","y":"5","slug":"DINER_BOOTH_RED_S"},{"x":"0","y":"6","slug":"DINER_TABLE"},{"x":"0","y":"8","slug":"DINER_BOOTH_RED_N"},{"x":"0","y":"8","slug":"DINER_BOOTH_GREEN_S"},{"x":"0","y":"9","slug":"DINER_TABLE"},{"x":"0","y":"11","slug":"DINER_BOOTH_GREEN_N"},{"x":"5","y":"5","slug":"DINER_TABLE"},{"x":"4","y":"5","slug":"DINER_CHAIR_MAROON"},{"x":"8","y":"11","slug":"FRONTDOOR"}],
                recipeList: [{"x":"0","y":"0"},{"x":"1","y":"0"},{"x":"2","y":"0"},{"x":"3","y":"0"},{"x":"0","y":"1"},{"x":"1","y":"1"},{"x":"2","y":"1"},{"x":"3","y":"1"}],
                removalList: []
         }
}

    }
                
            },
                                                                                                            portal: {
                room_id: 17,
                x: 9,
                y: 14
            }
                    },
                {
            lines: {
                x: 26,
                y: 3,
                width: 28,
                height: 11
            },
            block: {
                x: 2,
                y: 3
            },
            address: {
                name: "",
                facing: "E",
                dir: "S",
                number: "101",
                street: "Midline Ave",
            },
            structure: {
                type: "PARKING-LOT",
                zoning: "COMMERCIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 44,
                y: 3,
                width: 11,
                height: 26
            },
            block: {
                x: 2,
                y: 1
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "101",
                street: "Sundown Lane",
            },
            structure: {
                type: "CORNER-STORE-RIGHT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "PHARMACY",
name: "Pharmacy",
listingName: "Pharmacy TBA",
schedule: {
    monday: {
        closed: "FALSE",
        open: "09:00",
        close: "18:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "09:00",
        close: "18:00"
            }, 
    wednesday: {
        closed: "FALSE",
        open: "09:00",
        close: "18:00"
            },
    thursday: {
        closed: "FALSE",
        open: "09:00",
        close: "18:00"
            },
    friday: {
        closed: "FALSE",
        open: "09:00",
        close: "18:00"
            },
    saturday: {
        closed: "TRUE",    },
    sunday: {
        closed: "TRUE",    }
},
sells: [
            "TOOTHBRUSH_RED", 
                "TOOTHPASTE", 
                "TOOTHBRUSH_BLUE"
        ],
delivers: [
                            ],
                rooms: {
    }
                
            },
                                                                                            },
                {
            lines: {
                x: 33,
                y: 3,
                width: 11,
                height: 26
            },
            block: {
                x: 2,
                y: 1
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "103",
                street: "Sundown Lane",
            },
            structure: {
                type: "DUPLEX-RIGHT",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 22,
                y: 3,
                width: 11,
                height: 26
            },
            block: {
                x: 2,
                y: 1
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "105",
                street: "Sundown Lane",
            },
            structure: {
                type: "DUPLEX-LEFT",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 11,
                y: 3,
                width: 11,
                height: 26
            },
            block: {
                x: 2,
                y: 1
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "107",
                street: "Sundown Lane",
            },
            structure: {
                type: "BUNGALOW",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 0,
                y: 3,
                width: 11,
                height: 26
            },
            block: {
                x: 2,
                y: 1
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "109",
                street: "Sundown Lane",
            },
            structure: {
                type: "BUNGALOW",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 48,
                y: 3,
                width: 10,
                height: 26
            },
            block: {
                x: 1,
                y: 1
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "201",
                street: "Sundown Lane",
            },
            structure: {
                type: "CORNER-STORE-RIGHT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "BAKERY",
name: "Bakery",
listingName: "Bakery TBA",
schedule: {
    monday: {
        closed: "FALSE",
        open: "07:00",
        close: "14:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "07:00",
        close: "14:00"
            }, 
    wednesday: {
        closed: "FALSE",
        open: "07:00",
        close: "14:00"
            },
    thursday: {
        closed: "FALSE",
        open: "07:00",
        close: "14:00"
            },
    friday: {
        closed: "FALSE",
        open: "07:00",
        close: "14:00"
            },
    saturday: {
        closed: "FALSE",
        open: "08:00",
        close: "13:00"
            },
    sunday: {
        closed: "TRUE",    }
},
sells: [
            "PRETZEL", 
                "MUFFIN", 
                "CUPCAKE_PINK", 
                "CUPCAKE_YELLOW", 
                "CUPCAKE_WHITE", 
                "CUPCAKE_CHOCOLATE", 
                "COOKIE", 
                "MUFFIN_BERRY", 
                "STORE_BREAD"
        ],
serves: [
                                                                            ],
                rooms: {
    }
                
            },
                                                                                            },
                {
            lines: {
                x: 38,
                y: 3,
                width: 10,
                height: 26
            },
            block: {
                x: 1,
                y: 1
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "203",
                street: "Sundown Lane",
            },
            structure: {
                type: "STOREFRONT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "FLORIST",
name: "Florist",
listingName: "Florist TBA",
schedule: {
    monday: {
        closed: "TRUE",    },
    tuesday: {
        closed: "TRUE",    }, 
    wednesday: {
        closed: "FALSE",
        open: "10:00",
        close: "18:00"
            },
    thursday: {
        closed: "FALSE",
        open: "10:00",
        close: "18:00"
            },
    friday: {
        closed: "FALSE",
        open: "10:00",
        close: "18:00"
            },
    saturday: {
        closed: "FALSE",
        open: "10:00",
        close: "18:00"
            },
    sunday: {
        closed: "FALSE",
        open: "10:00",
        close: "17:00"
            }
},
sells: [
    ],
                rooms: {
    }
                
            },
                                                                                            },
                {
            lines: {
                x: 24,
                y: 3,
                width: 12,
                height: 26
            },
            block: {
                x: 1,
                y: 1
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "205",
                street: "Sundown Lane",
            },
            structure: {
                type: "BUNGALOW",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 12,
                y: 3,
                width: 12,
                height: 26
            },
            block: {
                x: 1,
                y: 1
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "207",
                street: "Sundown Lane",
            },
            structure: {
                type: "BUNGALOW",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
                {
            lines: {
                x: 0,
                y: 3,
                width: 12,
                height: 26
            },
            block: {
                x: 1,
                y: 1
            },
            address: {
                name: "",
                facing: "S",
                dir: "W",
                number: "209",
                street: "Sundown Lane",
            },
            structure: {
                type: "BUNGALOW",
                zoning: "RESIDENTIAL",
            },
            listing: {
                
            },
                                                                    },
            ]
    
};
export default MAP_CONFIG;