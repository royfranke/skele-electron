import ZenerDeck from "./zener-deck.js";
/* Zener Cards Manager Class */

export default class ZenerManager {

    constructor(scene) {
        this.scene = scene;
        this.deck = new ZenerDeck();
        this.choices = ['circle','plus','waves','square','star'];
        this.selected = 0;
    }

    selectNext () {
        this.setSelected(this.selected+1);
    }

    selectPrevious () {
        this.setSelected(this.selected-1);
    }

    setSelected (selected=0) {
        if (selected >= this.choices.length) {
            selected = 0;
        }
        if (selected < 0) {
            selected = this.choices.length - 1;
        }
        this.last_selected = this.selected;
        this.selected = selected;
        this.scene.manager.hud.hudZener.drawSelected(this.selected);
    }

    resetDeck () {
        this.deck.setState('NOT LOADED');

        this.destroyListeners();

        this.startTurn();
    }

    select () {
        if (this.deck.state == 'AWAITING GUESS') {
            /// TODO: Handle Sound variation in hudsound
            var sound_var = Phaser.Math.RND.between(1, 3);
            this.scene.manager.hud.hudSound.play('CARD_CLICK_' + sound_var);
            this.scene.manager.hud.hudZener.bobbleArrow();
            this.makeGuess();
        }
    }

    back () {
        //this.deck.setState('GAME OVER');
       //this.gameOver();
       this.scene.manager.hud.hudZener.closeZener();
       this.scene.manager.setFocus('PLAYER');  
    }

    makeGuess () {
        var result = this.guess(this.choices[this.selected]);
        this.reveal(result);
    }

    reveal (result) {
        this.scene.manager.hud.hudZener.drawReveal(result);
        this.deck.reveal(result);
        this.drawScore();
    }

    drawScore () {
        this.scene.manager.hud.hudZener.drawScore(this.getScore());
        this.scene.manager.hud.hudZener.updateDeck(this.deck.deck.length);
    }

    startTurn () {
        this.deck.startTurn();
    }

    guess (card) {
        return this.deck.guess(card);
    }

    getScore () {
       return this.deck.score();
   }

   listen () {
        var callback_left = function () {
            this.selectPrevious();
        }
        var callback_right = function () {
            this.selectNext();
        }
        var callback_select = function () {
            this.select();
        }
        var callback_back = function () {
            this.back();
        }
        this.scene.events.addListener('INPUT_LEFT_ZENER', callback_left, this);
        this.scene.events.addListener('INPUT_RIGHT_ZENER', callback_right, this);
        this.scene.events.addListener('INPUT_SELECT_ZENER', callback_select, this);
        this.scene.events.addListener('INPUT_UP_ZENER', callback_select, this);
        this.scene.events.addListener('INPUT_BACK_ZENER', callback_back, this);
   }

   destroyListeners () {
        this.scene.events.off('INPUT_LEFT_ZENER');
        this.scene.events.off('INPUT_RIGHT_ZENER');
        this.scene.events.off('INPUT_SELECT_ZENER');
        this.scene.events.off('INPUT_BACK_ZENER');
   }

}
    