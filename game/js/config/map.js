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
            ground: "grass",
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
            ground: "dirt",
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
                            }
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
                            }
        },
                {
            lines: {
                x: 27,
                y: 3,
                width: 11,
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
                            }
        },
                {
            lines: {
                x: 38,
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
                            }
        },
                {
            lines: {
                x: 31,
                y: 3,
                width: 12,
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
rooms: {
    }                            }
        },
                {
            lines: {
                x: 23,
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
                facing: "S",
                dir: "W",
                number: "103",
                street: "Belly Button Street",
            },
            structure: {
                type: "TAKEOUT-WINDOW",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "LOCKSMITH",
name: "Locksmith",
listingName: "Keys Made While You Wait",
schedule: {
    monday: {
        closed: "FALSE",
        open: "00:00",
        close: "00:00"
            },
    tuesday: {
        closed: "FALSE",
        open: "00:00",
        close: "00:00"
            }, 
    wednesday: {
        closed: "FALSE",
        open: "00:00",
        close: "00:00"
            },
    thursday: {
        closed: "FALSE",
        open: "00:00",
        close: "00:00"
            },
    friday: {
        closed: "FALSE",
        open: "00:00",
        close: "00:00"
            },
    saturday: {
        closed: "FALSE",
        open: "00:00",
        close: "00:00"
            },
    sunday: {
        closed: "FALSE",
        open: "00:00",
        close: "00:00"
            }
},
rooms: {
    }                            }
        },
                {
            lines: {
                x: 13,
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
                number: "105",
                street: "Belly Button Street",
            },
            structure: {
                type: "STOREFRONT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "PAWN SHOP",
name: "Pawn Shop",
listingName: "Pawn Shop TBA",
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
rooms: {
    }                            }
        },
                {
            lines: {
                x: 41,
                y: 3,
                width: 13,
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
                            }
        },
                {
            lines: {
                x: 28,
                y: 3,
                width: 13,
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
                            }
        },
                {
            lines: {
                x: 15,
                y: 3,
                width: 13,
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
                            }
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
                            }
        },
                {
            lines: {
                x: 3,
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
                facing: "W",
                dir: "W",
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
rooms: {
    }                            }
        },
                {
            lines: {
                x: 43,
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
                dir: "W",
                number: "101",
                street: "Midline Ave",
            },
            structure: {
                type: "CORNER-STORE-RIGHT",
                zoning: "COMMERCIAL",
            },
            listing: {
                slug: "CHINESE_FOOD",
name: "Chinese Food",
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
rooms: {
    }                            }
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
rooms: {
    }                            }
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
                            }
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
                            }
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
                            }
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
                            }
        },
            ]
    
};
export default MAP_CONFIG;