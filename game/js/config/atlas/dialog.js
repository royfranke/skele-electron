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
        text: 'Oh! You’re up, oh good. Grab your backpack and things— you will leave with Mr. Gilly after a little breakfast. No time to come back downstairs, hear?',
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
        next: 0,
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
    }
  };
export default DIALOGS;
