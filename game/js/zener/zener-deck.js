/* Zener Deck Class */

export default class ZenerDeck {

    /*
    Here is an outline of a turn:
    1. Start Turn
    2. If a deck hasn't been assembled, do so (NOT LOADED)
    3. Shuffle Deck (DECK BUILT)
    4. Await Guess (AWAITING GUESS)
    5. Reveal Results (REVEAL)
    5. Record Guess (TURN OVER) 
    */

    constructor() {
        /*
        Valid states: NOT LOADED, DECK BUILT, AWAITING GUESS, REVEAL, TURN OVER, GAME OVER
        */
        this.setState('NOT LOADED');
    }

    setState (state) {
        console.log("Setting state to: "+state);
        this.state = state;
    }


    startTurn () {
        if (this.state != 'NOT LOADED' && this.deck.length == 0) {
            this.setState('GAME OVER');
        }
        if (this.state == 'NOT LOADED') {
            this.newGame();
        }
        if (this.state == 'DECK BUILT') {
            this.setState('AWAITING GUESS');
        }
    }


    newGame () {
        /// Reset guesses
        this.guesses = {
            'circle': [],
            'plus': [],
            'waves': [],
            'square': [],
            'star': []
        };
        /// Reset what cards are in deck
        this.config = {
            'circle': 2,
            'plus': 2,
            'waves': 2,
            'square': 2,
            'star': 2
        };

        this.streak = 0;
        this.streak_best = 0;
        this.buildDeck();
    }

    buildDeck () {
        this.deck = [];
        for (let card in this.config) {
            for (let i=0; i < this.config[card]; i++) {
                this.deck.push(card);
            }
        }
        this.setState('DECK BUILT');
        this.shuffle();
        this.startTurn();
    }


    shuffle () {
        var rnd = new Phaser.Math.RandomDataGenerator(15);
        this.deck = rnd.shuffle(this.deck);
    }

    recordGuess (card) {
        this.guesses[card].push(this.draw());

        this.setState('TURN OVER');
        this.startTurn();
    }

    guess (card) {
        if (this.state == 'AWAITING GUESS') {
            var result = (this.deck[0] == card) ? true : false;
            this.setState('REVEAL');
            return {result: result, card: this.deck[0], guess: card};
        }
        else {
            console.log("Cannot guess at this time: "+this.state);
        }
    }

    reveal (result) {
        if (this.state == 'REVEAL') {

            if (result.result) {
                this.streak++;
                if (this.streak > this.streak_best) {
                    this.streak_best = this.streak;
                }
            }
            else {
                /// Streak is broken
                this.streak = 0;
            }
            this.recordGuess(result.guess);
        }
    }

    draw () {
        return this.deck.shift();
    }

    score () {
        var score = {
            streak: this.streak,
            streak_best: this.streak_best,
            correct: 0,
            incorrect: 0
        };

        for (let card in this.guesses) {
            this.guesses[card].forEach(function (guess) {
                if (guess == card) {
                    score.correct++;
                }
                else {
                    score.incorrect++;
                }
            });
        }
        return score;
    }
}