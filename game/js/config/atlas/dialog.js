const DIALOGS = {
      1: {
        id: 1,
        text: '...Hello? Are you there?',
        next: 0,
                responses: [
                  {
            text: 'I’m here!',
            next: 2
          },
                  {
            text: '????',
            next: 3
          }
              ]
    },
      2: {
        id: 2,
        text: 'Ah, what a cheerful little fellow in the dark! Why don’t you step into the light?',
        next: 0,
                responses: [
              ]
    },
      3: {
        id: 3,
        text: 'You look a bit confused. No matter; you got as far as selecting a non-default option, so we can call you oriented. Now, why don’t you step into the light?',
        next: 0,
                responses: [
              ]
    },
      4: {
        id: 4,
        text: '...',
        next: 0,
                responses: [
              ]
    },
      5: {
        id: 5,
        text: '...Skele? It’s time to wake up.',
        next: 0,
                responses: [
              ]
    },
      6: {
        id: 6,
        text: 'Oh! You’re up, oh good. Grab your backpack and things. You will leave with Mr. Gilly after a little breakfast. No time to come back downstairs, do you hear?',
        next: 0,
                responses: [
                  {
            text: '...',
            next: 4
          },
                  {
            text: 'Yes ma’am.',
            next: 7
          }
              ]
    },
      7: {
        id: 7,
        text: 'Oh-- good.',
        next: 28,
                responses: [
              ]
    },
      8: {
        id: 8,
        text: 'I got these-- these cards. I got one of each and I mix ’em and then you tell me which card is next. Got it?',
        next: 0,
                responses: [
                  {
            text: 'Got it.',
            next: 11
          },
                  {
            text: 'How do I know which card is next?',
            next: 9
          },
                  {
            text: 'Sounds dumb.',
            next: 10
          }
              ]
    },
      9: {
        id: 9,
        text: '(Explain rules)',
        next: 0,
                responses: [
              ]
    },
      10: {
        id: 10,
        text: '(Tiffed response)',
        next: 0,
                responses: [
              ]
    },
      11: {
        id: 11,
        text: 'Step right up!',
        next: 0,
                                trigger: 'COURT',
                court: 'ZENER',
                                                responses: [
              ]
    },
      12: {
        id: 12,
        text: 'Now then, here is the house key-- I need you to make a copy for yourself.',
        next: 13,
                responses: [
              ]
    },
      13: {
        id: 13,
        text: 'The locksmith is just beyond the Bonedega and the psychic. Do you know which way that is?',
        next: 0,
                                trigger: 'QUEST',
                        quest: 'LATCHKEY_KID',
                                        responses: [
                  {
            text: '^',
            next: 14
          },
                  {
            text: ']',
            next: 15
          },
                  {
            text: '\\',
            next: 14
          },
                  {
            text: '[',
            next: 14
          }
              ]
    },
      14: {
        id: 14,
        text: 'Ah, no. It’s this way, dear. ] ] ] Be careful crossing the street.',
        next: 0,
                responses: [
              ]
    },
      15: {
        id: 15,
        text: 'Ah, that’s right. Off you go.',
        next: 0,
                responses: [
              ]
    },
      16: {
        id: 16,
        text: 'Ah, dear-- mail this letter for me. The postboxes around here are usually on the south side of the street.',
        next: 0,
                                trigger: 'QUEST',
                        quest: 'LETTER_CARRIER',
                                        responses: [
              ]
    },
      17: {
        id: 17,
        text: 'Let me get a look at you. How about a little to the left?',
        next: 0,
                responses: [
              ]
    },
      18: {
        id: 18,
        text: 'How about to the right?',
        next: 0,
                responses: [
              ]
    },
      19: {
        id: 19,
        text: 'Fine, fine. Could you give us a little sprint? Hold shift while you move about.',
        next: 0,
                responses: [
              ]
    },
      20: {
        id: 20,
        text: 'That’s the stuff! Now then, run from the pit, yeah?',
        next: 0,
                responses: [
              ]
    },
      21: {
        id: 21,
        text: 'Skele, you are missing your backpack. Is it too heavy? Get right next to it when you put it on.',
        next: 0,
                                                responses: [
              ]
    },
      22: {
        id: 22,
        text: 'You have your bag? There is toast on the table for you.',
        next: 0,
                responses: [
              ]
    },
      23: {
        id: 23,
        text: 'Skele, I have your summer school notebook here. You still need to complete satisfactory work to be promoted to the next grade.',
        next: 24,
                responses: [
              ]
    },
      24: {
        id: 24,
        text: 'DO NOT BLOW THIS OFF. You don’t want to repeat fifth grade, right? Keep on top of it and there won’t be much to do.',
        next: 0,
                responses: [
              ]
    },
      25: {
        id: 25,
        text: 'I have ten dollars for you for emergencies. Where do you keep your money?',
        next: 0,
                responses: [
                  {
            text: 'In my pocket',
            next: 26
          },
                  {
            text: 'In my backpack',
            next: 26
          },
                  {
            text: 'In my hands',
            next: 26
          }
              ]
    },
      26: {
        id: 26,
        text: 'That... that won’t do. Ah, I know!',
        next: 27,
                responses: [
              ]
    },
      27: {
        id: 27,
        text: 'Here, this is a proper coinpurse. Don’t lose this, okay?',
        next: 0,
                responses: [
              ]
    },
      28: {
        id: 28,
        text: 'Don’t take too long.',
        next: 0,
                responses: [
              ]
    }
  };
export default DIALOGS;
