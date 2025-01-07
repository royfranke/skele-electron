  const ROOMS = {
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
    roomData: { 
                featureList: [{"x":"0","y":"3","slug":"BODEGA_STORE_COUNTER"},{"x":"5","y":"3","slug":"BEADED_CURTAIN_BODEGA"},{"x":"8","y":"3","slug":"INT_DOOR_GREEN_SIGN"},{"x":"1","y":"9","slug":"CARDBOARD_FLOOR_MAT"},{"x":"0","y":"7","slug":"CARDBOARD_DOWN_ARROW"},{"x":"10","y":"4","slug":"COMMERCIAL_FREEZER"},{"x":"0","y":"8","slug":"BASKET_RACK"},{"x":"4","y":"7","slug":"SHOP_SHELVES_MOTTLED"},{"x":"6","y":"7","slug":"SHOP_SHELVES_MOTTLED"},{"x":"8","y":"7","slug":"MILK_CRATE"},{"x":"0","y":"10","slug":"CONE_UPRIGHT"},{"x":"1","y":"11","slug":"FRONTDOOR"}],
                recipeList: [],
                removalList: [{"x":"7","y":"0"},{"x":"8","y":"0"},{"x":"9","y":"0"},{"x":"10","y":"0"},{"x":"11","y":"0"},{"x":"7","y":"1"},{"x":"8","y":"1"},{"x":"9","y":"1"},{"x":"10","y":"1"},{"x":"11","y":"1"},{"x":"7","y":"2"},{"x":"8","y":"2"},{"x":"9","y":"2"},{"x":"10","y":"2"},{"x":"11","y":"2"},{"x":"7","y":"3"},{"x":"8","y":"3"},{"x":"9","y":"3"},{"x":"10","y":"3"},{"x":"11","y":"3"},{"x":"0","y":"11"},{"x":"3","y":"11"},{"x":"4","y":"11"},{"x":"5","y":"11"},{"x":"6","y":"11"},{"x":"7","y":"11"},{"x":"8","y":"11"},{"x":"9","y":"11"},{"x":"10","y":"11"},{"x":"11","y":"11"}]
         }
}
, room_3: { 
    id: 3,
    name: "Gilly Basement",
    floorWidth: 13,
    floorHeight: 8,
    wallHeight: 3,
    overallHeight: 10,
    overallWidth: 15,
    floorSlug: "CARPET.WHITE_",
    wallSlug: "PAINT.GRAY_WORN_",
    roomData: { 
                featureList: [{"x":"8","y":"4","slug":"SOFA_SHLUBBY_1"},{"x":"12","y":"5","slug":"WOOD_SIDE_TABLE"},{"x":"7","y":"4","slug":"OUTLET_SINGLE"},{"x":"7","y":"4","slug":"NIGHT_LIGHT"},{"x":"0","y":"6","slug":"HOT_WATER_HEATER"},{"x":"2","y":"6","slug":"FURNACE"},{"x":"5","y":"-1","slug":"INT_DOOR_RED_BROWN"}],
                recipeList: [{"x":"5","y":"0","slug":"PLANK.BROWN_"},{"x":"6","y":"0","slug":"PLANK.BROWN_"},{"x":"5","y":"1","slug":"STAIRS.CEMENT_"},{"x":"6","y":"1","slug":"STAIRS.CEMENT_"},{"x":"5","y":"2","slug":"STAIRS.CEMENT_"},{"x":"6","y":"2","slug":"STAIRS.CEMENT_"},{"x":"5","y":"3","slug":"STAIRS.CEMENT_"},{"x":"6","y":"3","slug":"STAIRS.CEMENT_"},{"x":"5","y":"4","slug":"STAIRS.CEMENT_"},{"x":"6","y":"4","slug":"STAIRS.CEMENT_"},{"x":"0","y":"6","slug":"TILE.GREEN_CHECKERED_"},{"x":"1","y":"6","slug":"TILE.GREEN_CHECKERED_"},{"x":"2","y":"6","slug":"TILE.GREEN_CHECKERED_"},{"x":"3","y":"6","slug":"TILE.GREEN_CHECKERED_"},{"x":"4","y":"6","slug":"TILE.GREEN_CHECKERED_"},{"x":"0","y":"7","slug":"TILE.GREEN_CHECKERED_"},{"x":"1","y":"7","slug":"TILE.GREEN_CHECKERED_"},{"x":"2","y":"7","slug":"TILE.GREEN_CHECKERED_"},{"x":"3","y":"7","slug":"TILE.GREEN_CHECKERED_"},{"x":"4","y":"7","slug":"TILE.GREEN_CHECKERED_"}],
                removalList: [{"x":"0","y":"0"},{"x":"1","y":"0"},{"x":"2","y":"0"},{"x":"3","y":"0"},{"x":"4","y":"0"},{"x":"7","y":"0"},{"x":"8","y":"0"},{"x":"9","y":"0"},{"x":"10","y":"0"},{"x":"11","y":"0"},{"x":"12","y":"0"},{"x":"0","y":"1"},{"x":"1","y":"1"},{"x":"2","y":"1"},{"x":"3","y":"1"},{"x":"4","y":"1"},{"x":"7","y":"1"},{"x":"8","y":"1"},{"x":"9","y":"1"},{"x":"10","y":"1"},{"x":"11","y":"1"},{"x":"12","y":"1"},{"x":"0","y":"2"},{"x":"1","y":"2"},{"x":"2","y":"2"},{"x":"3","y":"2"},{"x":"4","y":"2"},{"x":"7","y":"2"},{"x":"8","y":"2"},{"x":"9","y":"2"},{"x":"10","y":"2"},{"x":"11","y":"2"},{"x":"12","y":"2"},{"x":"0","y":"3"},{"x":"1","y":"3"},{"x":"2","y":"3"},{"x":"3","y":"3"},{"x":"4","y":"3"},{"x":"7","y":"3"},{"x":"8","y":"3"},{"x":"9","y":"3"},{"x":"10","y":"3"},{"x":"11","y":"3"},{"x":"12","y":"3"},{"x":"0","y":"4"},{"x":"1","y":"4"},{"x":"2","y":"4"},{"x":"3","y":"4"},{"x":"4","y":"4"},{"x":"7","y":"4"},{"x":"8","y":"4"},{"x":"9","y":"4"},{"x":"10","y":"4"},{"x":"11","y":"4"},{"x":"12","y":"4"},{"x":"0","y":"5"},{"x":"1","y":"5"},{"x":"2","y":"5"},{"x":"3","y":"5"},{"x":"4","y":"5"}]
         }
}
, room_6: { 
    id: 6,
    name: "Auntie Room 1",
    floorWidth: 10,
    floorHeight: 10,
    wallHeight: 3,
    overallHeight: 12,
    overallWidth: 12,
    floorSlug: "PLANK.FILL_",
    wallSlug: "PAINT.PURPLE_WORN_LIGHT_",
    roomData: { 
                featureList: [{"x":"1","y":"0","slug":"OVEN_1"},{"x":"6","y":"2","slug":"INT_DOOR_WHITE"},{"x":"0","y":"3","slug":"TABLE_WOOD_SIMPLE"},{"x":"6","y":"5","slug":"SOFA_PLAID_1"},{"x":"9","y":"3","slug":"WOOD_SIDE_TABLE"},{"x":"3","y":"-1","slug":"COUNTERTOP_CORNER_GREEN"},{"x":"2","y":"-1","slug":"COUNTERTOP_S_GREEN"},{"x":"2","y":"0","slug":"UNDERCOUNTER_CABINET_S_PEELING_WOOD"},{"x":"3","y":"0","slug":"UNDERCOUNTER_CABINET_S_PEELING_WOOD"},{"x":"4","y":"1","slug":"UNDERCOUNTER_CABINET_W_PEELING_WOOD"},{"x":"5","y":"2","slug":"OUTLET_SINGLE"},{"x":"5","y":"2","slug":"NIGHT_LIGHT"},{"x":"1","y":"8","slug":"FRONTDOOR"}],
                recipeList: [{"x":"0","y":"0","slug":"TILE.CHECKERED_GREEN_BLUE_PURPLE_BLACK_"},{"x":"1","y":"0","slug":"TILE.CHECKERED_WHITE_BROWN_"},{"x":"2","y":"0","slug":"TILE.CHECKERED_BLUE_WHITE_"},{"x":"3","y":"0","slug":"TILE.CHECKERED_BLUE_WHITE_"},{"x":"4","y":"0","slug":"TILE.CHECKERED_GREEN_BLUE_PURPLE_BLACK_"},{"x":"0","y":"1","slug":"TILE.CHECKERED_WHITE_BROWN_"},{"x":"1","y":"1","slug":"TILE.CHECKERED_GREEN_BLUE_PURPLE_BLACK_"},{"x":"2","y":"1","slug":"TILE.CHECKERED_WHITE_BROWN_"},{"x":"3","y":"1","slug":"TILE.CHECKERED_BLUE_WHITE_"},{"x":"4","y":"1","slug":"TILE.CHECKERED_WHITE_BROWN_"},{"x":"0","y":"2","slug":"TILE.CHECKERED_GREEN_BLUE_PURPLE_BLACK_"},{"x":"1","y":"2","slug":"TILE.CHECKERED_WHITE_BROWN_"},{"x":"2","y":"2","slug":"TILE.CHECKERED_GREEN_BLUE_PURPLE_BLACK_"},{"x":"3","y":"2","slug":"TILE.CHECKERED_WHITE_BROWN_"},{"x":"4","y":"2","slug":"TILE.CHECKERED_WHITE_BROWN_"}],
                removalList: [{"x":"5","y":"0"},{"x":"6","y":"0"},{"x":"7","y":"0"},{"x":"8","y":"0"},{"x":"9","y":"0"},{"x":"5","y":"1"},{"x":"6","y":"1"},{"x":"7","y":"1"},{"x":"8","y":"1"},{"x":"9","y":"1"},{"x":"5","y":"2"},{"x":"6","y":"2"},{"x":"7","y":"2"},{"x":"8","y":"2"},{"x":"9","y":"2"},{"x":"0","y":"8"},{"x":"3","y":"8"},{"x":"0","y":"9"},{"x":"1","y":"9"},{"x":"2","y":"9"},{"x":"3","y":"9"}]
         }
}
, room_10: { 
    id: 10,
    name: "Tutorial",
    floorWidth: 72,
    floorHeight: 72,
    wallHeight: 0,
    overallHeight: 74,
    overallWidth: 74,
    floorSlug: "VOID.FILL_",
    wallSlug: "",
    roomData: { 
                featureList: [],
                removalList: []
         }
}
, room_11: { 
    id: 11,
    name: "Coin Laundry",
    floorWidth: 10,
    floorHeight: 12,
    wallHeight: 3,
    overallHeight: 14,
    overallWidth: 12,
    floorSlug: "TILE.CHECKERED_GREEN_BLUE_PURPLE_BLACK_",
    wallSlug: "GRAY_WORN_",
    roomData: { 
                featureList: [{"x":"3","y":"1","slug":"LAUNDRY_COMMERCIAL_DRYER"},{"x":"5","y":"1","slug":"LAUNDRY_COMMERCIAL_DRYER"},{"x":"7","y":"1","slug":"LAUNDRY_COMMERCIAL_DRYER"},{"x":"5","y":"5","slug":"TABLE_WOOD_FOLDING_JAMMED"},{"x":"1","y":"11","slug":"FRONTDOOR"}],
                recipeList: [],
                removalList: [{"x":"3","y":"0"},{"x":"4","y":"0"},{"x":"5","y":"0"},{"x":"6","y":"0"},{"x":"7","y":"0"},{"x":"8","y":"0"},{"x":"2","y":"11"},{"x":"3","y":"11"},{"x":"4","y":"11"},{"x":"5","y":"11"},{"x":"6","y":"11"},{"x":"7","y":"11"},{"x":"8","y":"11"},{"x":"9","y":"11"}]
         }
}
, room_12: { 
    id: 12,
    name: "Locksmith",
    floorWidth: 6,
    floorHeight: 7,
    wallHeight: 4,
    overallHeight: 9,
    overallWidth: 8,
    floorSlug: "TILE.GREEN_CHECKERED_",
    wallSlug: "PAINT.GREEN_PURPLE_",
    roomData: { 
                featureList: [{"x":"3","y":"3","slug":"STORE_WINDOW_COUNTER_3"},{"x":"0","y":"3","slug":"INT_DOOR_RED_BROWN_SIGN"},{"x":"3","y":"3","slug":"ADDING_MACHINE"},{"x":"2","y":"2","slug":"CORKBOARD"},{"x":"0","y":"6","slug":"FRONTDOOR"}],
                recipeList: [{"x":"3","y":"0","slug":"PLANK.BROWN_"},{"x":"4","y":"0","slug":"PLANK.BROWN_"},{"x":"5","y":"0","slug":"PLANK.BROWN_"},{"x":"3","y":"1","slug":"PLANK.BROWN_"},{"x":"4","y":"1","slug":"PLANK.BROWN_"},{"x":"5","y":"1","slug":"PLANK.BROWN_"},{"x":"3","y":"2","slug":"PLANK.BROWN_"},{"x":"4","y":"2","slug":"PLANK.BROWN_"},{"x":"5","y":"2","slug":"PLANK.BROWN_"},{"x":"3","y":"3","slug":"PLANK.BROWN_"},{"x":"4","y":"3","slug":"PLANK.BROWN_"},{"x":"5","y":"3","slug":"PLANK.BROWN_"}],
                removalList: [{"x":"0","y":"0"},{"x":"1","y":"0"},{"x":"2","y":"0"},{"x":"0","y":"1"},{"x":"1","y":"1"},{"x":"2","y":"1"},{"x":"0","y":"2"},{"x":"1","y":"2"},{"x":"2","y":"2"},{"x":"0","y":"3"},{"x":"1","y":"3"},{"x":"2","y":"3"},{"x":"2","y":"6"},{"x":"3","y":"6"},{"x":"4","y":"6"},{"x":"5","y":"6"}]
         }
}
, room_13: { 
    id: 13,
    name: "Pawn Shop",
    floorWidth: 6,
    floorHeight: 9,
    wallHeight: 4,
    overallHeight: 11,
    overallWidth: 8,
    floorSlug: "PLANK.BROWN_",
    wallSlug: "PAINT.DARK_GREEN_WORN_",
    roomData: { 
                featureList: [{"x":"1","y":"-1","slug":"COUNTERTOP_CORNER_BROWN"},{"x":"0","y":"-1","slug":"COUNTERTOP_S_BROWN"},{"x":"0","y":"0","slug":"UNDERCOUNTER_CABINET_S_DARK_WOOD"},{"x":"1","y":"0","slug":"UNDERCOUNTER_CABINET_S_DARK_WOOD"},{"x":"2","y":"1","slug":"UNDERCOUNTER_CABINET_W_DARK_WOOD"},{"x":"0","y":"4","slug":"STORE_WINDOW_COUNTER_4"},{"x":"4","y":"4","slug":"INT_DOOR_GREEN_SIGN"},{"x":"0","y":"8","slug":"FRONTDOOR"}],
                recipeList: [],
                removalList: [{"x":"3","y":"0"},{"x":"4","y":"0"},{"x":"5","y":"0"},{"x":"3","y":"1"},{"x":"4","y":"1"},{"x":"5","y":"1"},{"x":"4","y":"2"},{"x":"5","y":"2"},{"x":"4","y":"3"},{"x":"5","y":"3"},{"x":"4","y":"4"},{"x":"5","y":"4"},{"x":"2","y":"8"},{"x":"3","y":"8"},{"x":"4","y":"8"},{"x":"5","y":"8"}]
         }
}
  };
  export default ROOMS;

                    