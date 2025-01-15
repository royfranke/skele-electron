  const QUESTS = {
    LATCHKEY_KID: {
      slug: "LATCHKEY_KID",
      name: "Latchkey Kid",
      summary: "Make a copy of Auntie’s house key. The locksmith is just beyond the Bonedega and the psychic."},
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

            }      }
        };
  export default QUESTS;

                    