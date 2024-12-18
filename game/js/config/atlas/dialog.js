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
        text: '...Skele? It\'s time to wake up.',
        next: 0,
        responses: [
              ]
    },
      6: {
        id: 6,
        text: 'Oh! You\'re up, oh good. Grab your backpack and things— you will leave with Mr. Gilly after a little breakfast. No time to come back downstairs, hear?',
        next: 0,
        responses: [
                  {
            text: '...',
            next: 4
          },
                  {
            text: 'Yes ma\'am.',
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
        text: 'I got these-- these cards. I got one of each and I mix \'em and then you tell me which card is next. Got it?',
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
        responses: [
              ]
    }
  };
export default DIALOGS;
