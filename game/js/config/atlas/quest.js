  const QUESTS = {
    LATCHKEY_KID: {
      slug: "LATCHKEY_KID",
      name: "Latchkey Kid",
      summary: "Make a copy of Auntie’s house key. The locksmith is just beyond the Bonedega and the psychic.",
      givers: [
                      {slug: 'SKELE_AUNTIE'}
                ],
      giver_items: [
                      {slug: 'KEY_4'}
                ],
      goto: 'LOCKSMITH',
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
      summary: "Mail this letter at any blue postbox.",
      givers: [
                      {slug: 'SKELE_AUNTIE'}, 
                      {slug: 'SKELE_AUNTIE_BFF'}
                ],
      giver_items: [
                      {slug: 'ENVELOPE_BACK_1'}
                ],
      goto: 'NULL',
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
      summary: "",
      givers: [
                      {slug: 'SKELE_AUNTIE'}
                ],
      giver_items: [
                ],
      goto: 'BONEDEGA',
      use_service: 'NULL',
      return_to_giver: 'FALSE',
      completion: {
                      },
      empty_hand_message: "",
      hint_messages: "",
      }
        };
  export default QUESTS;

                    