/* Socks Dryer Class */

export default class SocksDryer {

    /*
    Here is an outline of a turn:
    1. Start Turn
    2. If the board has not been assembled, do so (NOT LOADED)
    3. Shuffle Dryer (DRYER BUILT)
    4. Eject Sock (EJECT SOCK)
    5. Toss out a sock (AWAITING MATCH)
    6. Match (MATCH)
    7. Reveal Results (REVEAL)
    8. Record Match (TURN OVER) 
    */

    constructor() {
        /*
        Valid states: NOT LOADED, DRYER BUILT, EJECT SOCK, AWAITING MATCH, MATCH, REVEAL, TURN OVER, GAME OVER
        */
        this.setState('NOT LOADED');
        this.verbose = true;
    }

    setState (state) {
        if (this.verbose) {console.log("Setting state to: "+state);}
        this.state = state;
    }


    startTurn () {
        if (this.state != 'NOT LOADED' && this.dryer.length == 0) {
            this.setState('GAME OVER');
        }
        if (this.state == 'NOT LOADED') {
            this.newGame();
        }
        if (this.state == 'DRYER BUILT' || this.state == 'TURN OVER') {
            this.setState('EJECT SOCK');
            // Start the countdown timer
            // shoot a sock out of the dryer
        }
    }

    


    newGame () {
        /// Reset matches
        this.matches = {
            'SOCK_1': [],
            'SOCK_2': [],
            'SOCK_3': [],
            'SOCK_4': [],
            'SOCK_5': [],
            'SOCK_6': [],
            'SOCK_7': [],
        };
        /// Reset what socks are in dryer
        this.config = {
            'SOCK_1': 4,
            'SOCK_2': 2,
            'SOCK_3': 2,
            'SOCK_4': 1,
            'SOCK_5': 1,
            'SOCK_6': 1,
            'SOCK_7': 2
        };

        this.streak = 0;
        this.streak_best = 0;
        this.buildDryer();
    }

    buildDryer () {
        this.dryer = [];
        this.choices = [];
        for (let sock in this.config) {
            for (let i=0; i < this.config[sock]; i++) {
                this.dryer.push(sock);
                this.choices.push(sock);
            }
        }
        this.setState('DRYER BUILT');
        this.spin();
        this.startTurn();
    }


    spin () {
        var rnd = new Phaser.Math.RandomDataGenerator(15);
        this.dryer = rnd.shuffle(this.dryer);
    }

    recordMatch (sock) {
        // draw should happen before matching
        this.matches[sock].push(this.draw());

        this.setState('TURN OVER');
        this.startTurn();
    }

    match (sock) {
        if (this.state == 'AWAITING MATCH') {
            var result = (this.dryer[0] == sock) ? true : false;
            this.setState('REVEAL');
            return {result: result, sock: this.dryer[0], match: sock};
        }
        else {
            console.log("Cannot match at this time: "+this.state);
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
            this.recordMatch(result.match);
        }
    }

    draw () {
        return this.dryer.shift();
    }

    score () {
        var score = {
            streak: this.streak,
            streak_best: this.streak_best,
            correct: 0,
            incorrect: 0
        };

        for (let sock in this.matches) {
            this.matches[sock].forEach(function (match) {
                if (match == sock) {
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