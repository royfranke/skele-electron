  const QUESTS = {
    LATCHKEY_KID: {
      slug: "LATCHKEY_KID",
      name: "Latchkey Kid",
      headline: "Latchkey Kid",
      notebook: "I got a keychain and I made a copy of Auntie’s key.",
      summary: "Make a copy of Auntie’s house key. The locksmith is just beyond the Bonedega and the psychic.",
      timed: 0,
      dayStart: 2,
      dayEnd: 4,
      prerequisite_quest: 'NULL',
      givers: [
                      {slug: 'SKELE_AUNTIE'}
                ],
      giver_items: [
                      {slug: 'KEY_4'}
                ],
      goto: 'LOCKSMITH',
      goto_room: 'NULL',
      goto_household: 'NULL',
      use_service: 'COPY_KEY',
      return_to_giver: 'TRUE',
      completion: {
                group_16: {
                req_group: 16,
                req_group_name: 'Copied Auntie’s Key',
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
                    type: 'ITEM',
                    result: 'DEPLETED',
                    ITEM: 'KEY_4'
                    }
                                ]

            },      },
      empty_hand_message: "Oh, you need an empty hand. Set something down, dear.",
      hint_messages: "The locksmith is just beyond the Bonedega and the psychic.",
      }, 
      LETTER_CARRIER: {
      slug: "LETTER_CARRIER",
      name: "Mail Letter",
      headline: "PONY EXPRESS",
      notebook: "I mailed a letter for Auntie.",
      summary: "Mail this letter at any blue postbox. They are usually on the south side of the street.",
      timed: 0,
      dayStart: 3,
      dayEnd: 5,
      prerequisite_quest: 'NULL',
      givers: [
                      {slug: 'SKELE_AUNTIE'}
                ],
      giver_items: [
                      {slug: 'ENVELOPE_BACK_1'}
                ],
      goto: 'NULL',
      goto_room: 'NULL',
      goto_household: 'NULL',
      use_service: 'NULL',
      return_to_giver: 'FALSE',
      completion: {
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

            },      },
      empty_hand_message: "Oh-- come back when you have a free hand.",
      hint_messages: "",
      }, 
      SECOND_BREAKFAST: {
      slug: "SECOND_BREAKFAST",
      name: "Second Breakfast",
      headline: "Second Breakfast",
      notebook: "",
      summary: "",
      timed: 0,
      dayStart: 1,
      dayEnd: 1,
      prerequisite_quest: 'NULL',
      givers: [
                      {slug: 'SKELE_AUNTIE'}
                ],
      giver_items: [
                      {slug: 'PAPER_5_'}
                ],
      goto: 'BONEDEGA',
      goto_room: 'NULL',
      goto_household: 'NULL',
      use_service: 'NULL',
      return_to_giver: 'TRUE',
      completion: {
                group_37: {
                req_group: 37,
                req_group_name: 'Second Breakfast Quest',
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
                    slot_type: 'IN_HAND_OR_BAG',
                    type: 'ITEM_KIND',
                    result: 'UNTOUCHED',
                    ITEM_KIND: 'CEREAL_BOX',
                    },
                  {
                    slot_type: 'IN_HAND_OR_BAG',
                    type: 'ITEM',
                    result: 'UNTOUCHED',
                    ITEM: 'MILK_BODEGA'
                    }
                                ]

            },      },
      empty_hand_message: "",
      hint_messages: "",
      }, 
      TAKE_BACKPACK: {
      slug: "TAKE_BACKPACK",
      name: "Take Backpack",
      headline: "Loaded Up",
      notebook: "",
      summary: "Grab your backpack and go upstairs for breakfast.",
      timed: 0,
      dayStart: 0,
      dayEnd: 0,
      prerequisite_quest: 'NULL',
      givers: [
                      {slug: 'GILLY_MOM'}
                ],
      giver_items: [
                ],
      goto: 'NULL',
      goto_room: '19',
      goto_household: 'NULL',
      use_service: 'NULL',
      return_to_giver: 'TRUE',
      completion: {
                group_39: {
                req_group: 39,
                req_group_name: 'Wearing Purple Backpack',
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
                    type: 'ITEM',
                    result: 'UNTOUCHED',
                    ITEM: 'BACKPACK_PURPLE'
                    }
                                ]

            },      },
      empty_hand_message: "",
      hint_messages: "Skele, you are missing your backpack. Is it too heavy? Get right next to it when you put it on.",
      }
        };
  export default QUESTS;

                    