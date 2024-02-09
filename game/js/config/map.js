const MAP_CONFIG = {
    tileSize: 16,
    width: 200,
    height: 150,
    sectionsWidth: 5,
    sectionsHeight: 5,
    blockWidth: 40,
    blockHeight: 30,
    blocks: [
        {
            x: 0,
            y: 0,
            block_tile_x: 0,
            block_tile_y: 0,
            tile_x: 0,
            tile_y: 0,
            width: 40,
            height: 30,
            top: 0,
            right: 40,
            bottom: 30,
            left: 0,
            center: {
                x: 20,
                y: 15
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
            x: 1,
            y: 0,
            block_tile_x: 40,
            block_tile_y: 0,
            tile_x: 40,
            tile_y: 0,
            width: 40,
            height: 28,
            top: 0,
            right: 80,
            bottom: 28,
            left: 40,
            center: {
                x: 60,
                y: 14
            },
            ground: "forest",
            offset: {
                n: 0,
                e: 0,
                s: 2,
                w: 0,
            },
            bounds: {
                n: "",
                e: "",
                s: "Lore Drive",
                w: "",
            }
        },
        {
            x: 1,
            y: 1,
            block_tile_x: 40,
            block_tile_y: 30,
            tile_x: 43,
            tile_y: 33,
            width: 35,
            height: 25,
            top: 33,
            right: 78,
            bottom: 58,
            left: 43,
            center: {
                x: 60.5,
                y: 45.5
            },
            ground: "grass",
            offset: {
                n: 3,
                e: 2,
                s: 2,
                w: 3,
            },
            bounds: {
                n: "Lore Drive",
                e: "Yew Street",
                s: "Pilgrim Street",
                w: "Farmer Street",
            }
        },
        {
            x: 0,
            y: 1,
            block_tile_x: 0,
            block_tile_y: 30,
            tile_x: 0,
            tile_y: 30,
            width: 38,
            height: 30,
            top: 30,
            right: 38,
            bottom: 60,
            left: 0,
            center: {
                x: 19,
                y: 45
            },
            ground: "forest",
            offset: {
                n: 0,
                e: 2,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "",
                e: "Farmer Street",
                s: "",
                w: "",
            }
        },
        {
            x: 4,
            y: 0,
            block_tile_x: 160,
            block_tile_y: 0,
            tile_x: 160,
            tile_y: 0,
            width: 40,
            height: 30,
            top: 0,
            right: 200,
            bottom: 30,
            left: 160,
            center: {
                x: 180,
                y: 15
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
            block_tile_x: 160,
            block_tile_y: 120,
            tile_x: 164,
            tile_y: 120,
            width: 36,
            height: 30,
            top: 120,
            right: 200,
            bottom: 150,
            left: 164,
            center: {
                x: 182,
                y: 135
            },
            ground: "forest",
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
                w: "Wood Street",
            }
        },
        {
            x: 0,
            y: 4,
            block_tile_x: 0,
            block_tile_y: 120,
            tile_x: 0,
            tile_y: 120,
            width: 37,
            height: 30,
            top: 120,
            right: 37,
            bottom: 150,
            left: 0,
            center: {
                x: 18.5,
                y: 135
            },
            ground: "forest",
            offset: {
                n: 0,
                e: 3,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "",
                e: "Farmer Street",
                s: "",
                w: "",
            }
        },
        {
            x: 1,
            y: 4,
            block_tile_x: 40,
            block_tile_y: 120,
            tile_x: 44,
            tile_y: 124,
            width: 36,
            height: 26,
            top: 124,
            right: 80,
            bottom: 150,
            left: 44,
            center: {
                x: 62,
                y: 137
            },
            ground: "forest",
            offset: {
                n: 4,
                e: 0,
                s: 0,
                w: 4,
            },
            bounds: {
                n: "Shadow Drive",
                e: "",
                s: "",
                w: "Farmer Street",
            }
        },
        {
            x: 0,
            y: 3,
            block_tile_x: 0,
            block_tile_y: 90,
            tile_x: 0,
            tile_y: 97,
            width: 40,
            height: 23,
            top: 97,
            right: 40,
            bottom: 120,
            left: 0,
            center: {
                x: 20,
                y: 108.5
            },
            ground: "forest",
            offset: {
                n: 7,
                e: 0,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "Lowland Street",
                e: "",
                s: "",
                w: "",
            }
        },
        {
            x: 4,
            y: 3,
            block_tile_x: 160,
            block_tile_y: 90,
            tile_x: 164,
            tile_y: 90,
            width: 36,
            height: 30,
            top: 90,
            right: 200,
            bottom: 120,
            left: 164,
            center: {
                x: 182,
                y: 105
            },
            ground: "forest",
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
                w: "Wood Street",
            }
        },
        {
            x: 3,
            y: 4,
            block_tile_x: 120,
            block_tile_y: 120,
            tile_x: 120,
            tile_y: 123,
            width: 37,
            height: 27,
            top: 123,
            right: 157,
            bottom: 150,
            left: 120,
            center: {
                x: 138.5,
                y: 136.5
            },
            ground: "forest",
            offset: {
                n: 3,
                e: 3,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "Shadow Drive",
                e: "Wood Street",
                s: "",
                w: "",
            }
        },
        {
            x: 2,
            y: 2,
            block_tile_x: 80,
            block_tile_y: 60,
            tile_x: 84,
            tile_y: 64,
            width: 30,
            height: 23,
            top: 64,
            right: 114,
            bottom: 87,
            left: 84,
            center: {
                x: 99,
                y: 75.5
            },
            ground: "cement",
            offset: {
                n: 4,
                e: 6,
                s: 3,
                w: 4,
            },
            bounds: {
                n: "Pilgrim Street",
                e: "Index Street",
                s: "Lowland Street",
                w: "Yew Street",
            }
        },
        {
            x: 4,
            y: 1,
            block_tile_x: 160,
            block_tile_y: 30,
            tile_x: 160,
            tile_y: 30,
            width: 40,
            height: 24,
            top: 30,
            right: 200,
            bottom: 54,
            left: 160,
            center: {
                x: 180,
                y: 42
            },
            ground: "meadow",
            offset: {
                n: 0,
                e: 0,
                s: 6,
                w: 0,
            },
            bounds: {
                n: "",
                e: "",
                s: "Pilgrim Street",
                w: "",
            }
        },
        {
            x: 4,
            y: 2,
            block_tile_x: 160,
            block_tile_y: 60,
            tile_x: 160,
            tile_y: 67,
            width: 40,
            height: 23,
            top: 67,
            right: 200,
            bottom: 90,
            left: 160,
            center: {
                x: 180,
                y: 78.5
            },
            ground: "meadow",
            offset: {
                n: 7,
                e: 0,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "Pilgrim Street",
                e: "",
                s: "",
                w: "",
            }
        },
        {
            x: 3,
            y: 2,
            block_tile_x: 120,
            block_tile_y: 60,
            tile_x: 127,
            tile_y: 67,
            width: 33,
            height: 20,
            top: 67,
            right: 160,
            bottom: 87,
            left: 127,
            center: {
                x: 143.5,
                y: 77
            },
            ground: "cement",
            offset: {
                n: 7,
                e: 0,
                s: 3,
                w: 7,
            },
            bounds: {
                n: "Pilgrim Street",
                e: "",
                s: "Lowland Street",
                w: "Index Street",
            }
        },
        {
            x: 3,
            y: 1,
            block_tile_x: 120,
            block_tile_y: 30,
            tile_x: 127,
            tile_y: 34,
            width: 33,
            height: 20,
            top: 34,
            right: 160,
            bottom: 54,
            left: 127,
            center: {
                x: 143.5,
                y: 44
            },
            ground: "cement",
            offset: {
                n: 4,
                e: 0,
                s: 6,
                w: 7,
            },
            bounds: {
                n: "Lore Drive",
                e: "",
                s: "Pilgrim Street",
                w: "Index Street",
            }
        },
        {
            x: 3,
            y: 0,
            block_tile_x: 120,
            block_tile_y: 0,
            tile_x: 127,
            tile_y: 0,
            width: 33,
            height: 27,
            top: 0,
            right: 160,
            bottom: 27,
            left: 127,
            center: {
                x: 143.5,
                y: 13.5
            },
            ground: "grass",
            offset: {
                n: 0,
                e: 0,
                s: 3,
                w: 7,
            },
            bounds: {
                n: "",
                e: "",
                s: "Lore Drive",
                w: "Index Street",
            }
        },
        {
            x: 2,
            y: 4,
            block_tile_x: 80,
            block_tile_y: 120,
            tile_x: 80,
            tile_y: 120,
            width: 40,
            height: 30,
            top: 120,
            right: 120,
            bottom: 150,
            left: 80,
            center: {
                x: 100,
                y: 135
            },
            ground: "marsh",
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
            block_tile_x: 120,
            block_tile_y: 90,
            tile_x: 123,
            tile_y: 94,
            width: 34,
            height: 24,
            top: 94,
            right: 157,
            bottom: 118,
            left: 123,
            center: {
                x: 140,
                y: 106
            },
            ground: "marsh",
            offset: {
                n: 4,
                e: 3,
                s: 2,
                w: 3,
            },
            bounds: {
                n: "Lowland Street",
                e: "Wood Street",
                s: "Shadow Drive",
                w: "Index Street",
            }
        },
        {
            x: 0,
            y: 2,
            block_tile_x: 0,
            block_tile_y: 60,
            tile_x: 0,
            tile_y: 60,
            width: 40,
            height: 24,
            top: 60,
            right: 40,
            bottom: 84,
            left: 0,
            center: {
                x: 20,
                y: 72
            },
            ground: "marsh",
            offset: {
                n: 0,
                e: 0,
                s: 6,
                w: 0,
            },
            bounds: {
                n: "",
                e: "",
                s: "Lowland Street",
                w: "",
            }
        },
        {
            x: 1,
            y: 2,
            block_tile_x: 40,
            block_tile_y: 60,
            tile_x: 40,
            tile_y: 63,
            width: 37,
            height: 21,
            top: 63,
            right: 77,
            bottom: 84,
            left: 40,
            center: {
                x: 58.5,
                y: 73.5
            },
            ground: "grass",
            offset: {
                n: 3,
                e: 3,
                s: 6,
                w: 0,
            },
            bounds: {
                n: "Pilgrim Street",
                e: "Yew Street",
                s: "Lowland Street",
                w: "",
            }
        },
        {
            x: 2,
            y: 0,
            block_tile_x: 80,
            block_tile_y: 0,
            tile_x: 80,
            tile_y: 0,
            width: 34,
            height: 30,
            top: 0,
            right: 114,
            bottom: 30,
            left: 80,
            center: {
                x: 97,
                y: 15
            },
            ground: "grass",
            offset: {
                n: 0,
                e: 6,
                s: 0,
                w: 0,
            },
            bounds: {
                n: "",
                e: "Index Street",
                s: "",
                w: "",
            }
        },
        {
            x: 2,
            y: 1,
            block_tile_x: 80,
            block_tile_y: 30,
            tile_x: 83,
            tile_y: 30,
            width: 31,
            height: 27,
            top: 30,
            right: 114,
            bottom: 57,
            left: 83,
            center: {
                x: 98.5,
                y: 43.5
            },
            ground: "dirt",
            offset: {
                n: 0,
                e: 6,
                s: 3,
                w: 3,
            },
            bounds: {
                n: "",
                e: "Index Street",
                s: "Pilgrim Street",
                w: "Yew Street",
            }
        },
        {
            x: 2,
            y: 3,
            block_tile_x: 80,
            block_tile_y: 90,
            tile_x: 84,
            tile_y: 94,
            width: 34,
            height: 26,
            top: 94,
            right: 118,
            bottom: 120,
            left: 84,
            center: {
                x: 101,
                y: 107
            },
            ground: "grass",
            offset: {
                n: 4,
                e: 2,
                s: 0,
                w: 4,
            },
            bounds: {
                n: "Lowland Street",
                e: "Index Street",
                s: "",
                w: "Yew Street",
            }
        },
        {
            x: 1,
            y: 3,
            block_tile_x: 40,
            block_tile_y: 90,
            tile_x: 40,
            tile_y: 97,
            width: 37,
            height: 20,
            top: 97,
            right: 77,
            bottom: 117,
            left: 40,
            center: {
                x: 58.5,
                y: 107
            },
            ground: "grass",
            offset: {
                n: 7,
                e: 3,
                s: 3,
                w: 0,
            },
            bounds: {
                n: "Lowland Street",
                e: "Yew Street",
                s: "Shadow Drive",
                w: "",
            }
        },
    ],
    nodes: [
        {
            x: 3,
            y: 0,
            center_x: 120,
            center_y: 0,
            tile_x: 114,
            tile_y: -3,
            top: -3,
            right: 127,
            bottom: 4,
            left: 114,
            width: 13,
            height: 7,

            streets: {
                n: {
                    found: 0
                },
                e: {
                    lanes: 1,
                    name: "Northern Boundary",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 2,
                    name: "Index Street",
                    dir: "ns",
                    connect: 1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    found: 0
                },
            },
        },
        {
            x: 5,
            y: 2,
            center_x: 200,
            center_y: 60,
            tile_x: 197,
            tile_y: 54,
            top: 54,
            right: 204,
            bottom: 67,
            left: 197,
            width: 7,
            height: 13,

            streets: {
                n: {
                    found: 0
                },
                e: {
                    lanes: 1,
                    name: "Pilgrim Street",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Eastern Boundary",
                    dir: "ns",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    lanes: 2,
                    name: "Pilgrim Street",
                    dir: "ew",
                    connect: 3,
                    sidewalk: 2,
                    parking: 0, found: 1
                },
            },
        },
        {
            x: 4,
            y: 5,
            center_x: 160,
            center_y: 150,
            tile_x: 157,
            tile_y: 147,
            top: 147,
            right: 164,
            bottom: 154,
            left: 157,
            width: 7,
            height: 7,

            streets: {
                n: {
                    lanes: 1,
                    name: "Wood Street",
                    dir: "ns",
                    connect: 4,
                    sidewalk: 1,
                    parking: 0,
                    found: 1
                },
                e: {
                    lanes: 1,
                    name: "Southern Boundary",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Wood Street",
                    dir: "ns",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    found: 0
                },
            },
        },
        {
            x: 0,
            y: 3,
            center_x: 0,
            center_y: 90,
            tile_x: -3,
            tile_y: 84,
            top: 84,
            right: 4,
            bottom: 97,
            left: -3,
            width: 7,
            height: 13,

            streets: {
                n: {
                    found: 0
                },
                e: {
                    lanes: 2,
                    name: "Lowland Street",
                    dir: "ew",
                    connect: 2,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Western Boundary",
                    dir: "ns",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    found: 0
                },
            },
        },
        {
            x: 1,
            y: 5,
            center_x: 40,
            center_y: 150,
            tile_x: 37,
            tile_y: 147,
            top: 147,
            right: 44,
            bottom: 154,
            left: 37,
            width: 7,
            height: 7,

            streets: {
                n: {
                    lanes: 1,
                    name: "Farmer Street",
                    dir: "ns",
                    connect: 4,
                    sidewalk: 1,
                    parking: 0,
                    found: 1
                },
                e: {
                    lanes: 1,
                    name: "Southern Boundary",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Farmer Street",
                    dir: "ns",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    found: 0
                },
            },
        },
        {
            x: 3,
            y: 2,
            center_x: 120,
            center_y: 60,
            tile_x: 114,
            tile_y: 54,
            top: 54,
            right: 127,
            bottom: 67,
            left: 114,
            width: 13,
            height: 13,

            streets: {
                n: {
                    lanes: 2,
                    name: "Index Street",
                    dir: "ns",
                    connect: 1,
                    sidewalk: 2,
                    parking: 0,
                    found: 1
                },
                e: {
                    lanes: 2,
                    name: "Pilgrim Street",
                    dir: "ew",
                    connect: 5,
                    sidewalk: 2,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 2,
                    name: "Index Street",
                    dir: "ns",
                    connect: 3,
                    sidewalk: 2,
                    parking: 0, found: 1
                },
                w: {
                    lanes: 1,
                    name: "Pilgrim Street",
                    dir: "ew",
                    connect: 2,
                    sidewalk: 2,
                    parking: 0, found: 1
                },
            },
        },
        {
            x: 3,
            y: 3,
            center_x: 120,
            center_y: 90,
            tile_x: 114,
            tile_y: 87,
            top: 87,
            right: 127,
            bottom: 94,
            left: 114,
            width: 13,
            height: 7,

            streets: {
                n: {
                    lanes: 2,
                    name: "Index Street",
                    dir: "ns",
                    connect: 2,
                    sidewalk: 2,
                    parking: 0,
                    found: 1
                },
                e: {
                    lanes: 1,
                    name: "Lowland Street",
                    dir: "ew",
                    connect: 4,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Index Street",
                    dir: "n",
                    connect: 4,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    lanes: 1,
                    name: "Lowland Street",
                    dir: "ew",
                    connect: 2,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
            },
        },
        {
            x: 4,
            y: 3,
            center_x: 160,
            center_y: 90,
            tile_x: 157,
            tile_y: 87,
            top: 87,
            right: 164,
            bottom: 94,
            left: 157,
            width: 7,
            height: 7,

            streets: {
                n: {
                    found: 0
                },
                e: {
                    lanes: 1,
                    name: "Lowland Street",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Wood Street",
                    dir: "ns",
                    connect: 4,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    lanes: 1,
                    name: "Lowland Street",
                    dir: "ew",
                    connect: 3,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
            },
        },
        {
            x: 2,
            y: 3,
            center_x: 80,
            center_y: 90,
            tile_x: 77,
            tile_y: 84,
            top: 84,
            right: 84,
            bottom: 97,
            left: 77,
            width: 7,
            height: 13,

            streets: {
                n: {
                    lanes: 1,
                    name: "Yew Street",
                    dir: "ns",
                    connect: 2,
                    sidewalk: 1,
                    parking: 0,
                    found: 1
                },
                e: {
                    lanes: 1,
                    name: "Lowland Street",
                    dir: "ew",
                    connect: 3,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Yew Street",
                    dir: "ns",
                    connect: 4,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    lanes: 2,
                    name: "Lowland Street",
                    dir: "ew",
                    connect: 0,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
            },
        },
        {
            x: 2,
            y: 4,
            center_x: 80,
            center_y: 120,
            tile_x: 77,
            tile_y: 117,
            top: 117,
            right: 84,
            bottom: 124,
            left: 77,
            width: 7,
            height: 7,

            streets: {
                n: {
                    lanes: 1,
                    name: "Yew Street",
                    dir: "ns",
                    connect: 3,
                    sidewalk: 1,
                    parking: 0,
                    found: 1
                },
                e: {
                    lanes: 1,
                    name: "Shadow Drive",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Yew Street",
                    dir: "ns",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    lanes: 1,
                    name: "Shadow Drive",
                    dir: "ew",
                    connect: 1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
            },
        },
        {
            x: 1,
            y: 4,
            center_x: 40,
            center_y: 120,
            tile_x: 37,
            tile_y: 117,
            top: 117,
            right: 44,
            bottom: 124,
            left: 37,
            width: 7,
            height: 7,

            streets: {
                n: {
                    found: 0
                },
                e: {
                    lanes: 1,
                    name: "Shadow Drive",
                    dir: "ew",
                    connect: 2,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Farmer Street",
                    dir: "ns",
                    connect: 5,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    found: 0
                },
            },
        },
        {
            x: 2,
            y: 2,
            center_x: 80,
            center_y: 60,
            tile_x: 77,
            tile_y: 57,
            top: 57,
            right: 84,
            bottom: 64,
            left: 77,
            width: 7,
            height: 7,

            streets: {
                n: {
                    lanes: 1,
                    name: "Yew Street",
                    dir: "n",
                    connect: 1,
                    sidewalk: 1,
                    parking: 0,
                    found: 1
                },
                e: {
                    lanes: 1,
                    name: "Pilgrim Street",
                    dir: "ew",
                    connect: 3,
                    sidewalk: 2,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Yew Street",
                    dir: "ns",
                    connect: 3,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    lanes: 1,
                    name: "Pilgrim Street",
                    dir: "e",
                    connect: 1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
            },
        },
        {
            x: 1,
            y: 2,
            center_x: 40,
            center_y: 60,
            tile_x: 38,
            tile_y: 58,
            top: 58,
            right: 43,
            bottom: 63,
            left: 38,
            width: 5,
            height: 5,

            streets: {
                n: {
                    lanes: 1,
                    name: "Farmer Street",
                    dir: "s",
                    connect: 1,
                    sidewalk: 1,
                    parking: 0,
                    found: 1
                },
                e: {
                    lanes: 1,
                    name: "Pilgrim Street",
                    dir: "e",
                    connect: 2,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Farmer Street",
                    dir: "ns",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    found: 0
                },
            },
        },
        {
            x: 1,
            y: 1,
            center_x: 40,
            center_y: 30,
            tile_x: 38,
            tile_y: 28,
            top: 28,
            right: 43,
            bottom: 33,
            left: 38,
            width: 5,
            height: 5,

            streets: {
                n: {
                    found: 0
                },
                e: {
                    lanes: 1,
                    name: "Lore Drive",
                    dir: "w",
                    connect: 2,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Farmer Street",
                    dir: "s",
                    connect: 2,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    found: 0
                },
            },
        },
        {
            x: 2,
            y: 1,
            center_x: 80,
            center_y: 30,
            tile_x: 78,
            tile_y: 28,
            top: 28,
            right: 83,
            bottom: 33,
            left: 78,
            width: 5,
            height: 5,

            streets: {
                n: {
                    found: 0
                },
                e: {
                    lanes: 1,
                    name: "Lore Drive",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Yew Street",
                    dir: "n",
                    connect: 2,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    lanes: 1,
                    name: "Lore Drive",
                    dir: "w",
                    connect: 1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
            },
        },
        {
            x: 3,
            y: 4,
            center_x: 120,
            center_y: 120,
            tile_x: 118,
            tile_y: 118,
            top: 118,
            right: 123,
            bottom: 123,
            left: 118,
            width: 5,
            height: 5,

            streets: {
                n: {
                    lanes: 1,
                    name: "Index Street",
                    dir: "n",
                    connect: 3,
                    sidewalk: 1,
                    parking: 0,
                    found: 1
                },
                e: {
                    lanes: 1,
                    name: "Shadow Drive",
                    dir: "w",
                    connect: 4,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Index Street",
                    dir: "ns",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    found: 0
                },
            },
        },
        {
            x: 4,
            y: 4,
            center_x: 160,
            center_y: 120,
            tile_x: 157,
            tile_y: 118,
            top: 118,
            right: 164,
            bottom: 123,
            left: 157,
            width: 7,
            height: 5,

            streets: {
                n: {
                    lanes: 1,
                    name: "Wood Street",
                    dir: "ns",
                    connect: 3,
                    sidewalk: 1,
                    parking: 0,
                    found: 1
                },
                e: {
                    lanes: 1,
                    name: "Shadow Drive",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Wood Street",
                    dir: "ns",
                    connect: 5,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    lanes: 1,
                    name: "Shadow Drive",
                    dir: "w",
                    connect: 3,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
            },
        },
        {
            x: 4,
            y: 1,
            center_x: 160,
            center_y: 30,
            tile_x: 157,
            tile_y: 27,
            top: 27,
            right: 164,
            bottom: 34,
            left: 157,
            width: 7,
            height: 7,

            streets: {
                n: {
                    found: 0
                },
                e: {
                    lanes: 1,
                    name: "Lore Drive",
                    dir: "ew",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 1,
                    name: "Wood Street",
                    dir: "ns",
                    connect: -1,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                w: {
                    lanes: 1,
                    name: "Lore Drive",
                    dir: "ew",
                    connect: 3,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
            },
        },
        {
            x: 3,
            y: 1,
            center_x: 120,
            center_y: 30,
            tile_x: 114,
            tile_y: 27,
            top: 27,
            right: 127,
            bottom: 34,
            left: 114,
            width: 13,
            height: 7,

            streets: {
                n: {
                    lanes: 2,
                    name: "Index Street",
                    dir: "ns",
                    connect: 0,
                    sidewalk: 1,
                    parking: 0,
                    found: 1
                },
                e: {
                    lanes: 1,
                    name: "Lore Drive",
                    dir: "ew",
                    connect: 4,
                    sidewalk: 1,
                    parking: 0, found: 1
                },
                s: {
                    lanes: 2,
                    name: "Index Street",
                    dir: "ns",
                    connect: 2,
                    sidewalk: 2,
                    parking: 0, found: 1
                },
                w: {
                    found: 0
                },
            },
        },
    ],
    propertyLines: [
        {
            lines: {
                x: 15,
                y: 2,
                width: 13,
                height: 21
            },
            block: {
                x: 2,
                y: 1
            },
            address: {
                name: "",
                facing: "S",
                number: "101",
                street: "Pilgrim Street",
            }
        },

        {
            lines: {
                x: 2,
                y: 0,
                width: 13,
                height: 23
            },
            block: {
                x: 2,
                y: 1
            },
            address: {
                name: "",
                facing: "S",
                number: "103",
                street: "Pilgrim Street",
            }
        },

        {
            lines: {
                x: 12,
                y: 2,
                width: 11,
                height: 20
            },
            block: {
                x: 1,
                y: 1
            },
            address: {
                name: "",
                facing: "S",
                number: "201",
                street: "Pilgrim Street",
            }
        },

        {
            lines: {
                x: 2,
                y: 2,
                width: 10,
                height: 20
            },
            block: {
                x: 1,
                y: 1
            },
            address: {
                name: "",
                facing: "S",
                number: "203",
                street: "Pilgrim Street",
            }
        },

        {
            lines: {
                x: 23,
                y: 2,
                width: 10,
                height: 20
            },
            block: {
                x: 1,
                y: 1
            },
            address: {
                name: "",
                facing: "E",
                number: "101",
                street: "Yew Street",
            }
        }

    ]

};
export default MAP_CONFIG;