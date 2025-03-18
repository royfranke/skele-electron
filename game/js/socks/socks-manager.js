import SocksDryer from "./socks-dryer.js";
/* Socks Cards Manager Class */

export default class SocksManager {

    constructor(scene) {
        this.scene = scene;
        this.dryer = new SocksDryer();
        this.selected = 0;
    }

    update () {
        if (this.dryer.state == 'EJECT SOCK') {
            this.scene.manager.hud.hudSocks.ejectSock(this.dryer.dryer[0]);
            this.dryer.setState('AWAITING MATCH');
        }
        if (this.dryer.state == 'GAME OVER') {
            this.scene.manager.hud.hudSocks.gameOver();
        }
    }

    selectNext () {
        this.setSelected(this.selected+1);
    }

    selectPrevious () {
        this.setSelected(this.selected-1);
    }

    setSelected (selected=0) {
        if (selected >= this.dryer.choices.length) {
            selected = 0;
        }
        if (selected < 0) {
            selected = this.dryer.choices.length - 1;
        }
        this.last_selected = this.selected;
        this.selected = selected;
        this.scene.manager.hud.hudSound.play('ARROW_BOBBLE_SELECT');
        this.scene.manager.hud.hudSocks.drawSelected(this.dryer.choices[this.selected]);
    }

    resetDryer () {
        this.dryer.setState('NOT LOADED');
        this.startTurn();
    }

    select () {
        if (this.dryer.state == 'AWAITING MATCH' && this.dryer.choices.length > 0 && this.dryer.choices[this.selected] != undefined) {
            /// TODO: Handle Sound variation in hudsound
            var sound_var = Phaser.Math.RND.between(1, 3);
            this.scene.manager.hud.hudSound.play('CARD_CLICK_' + sound_var);
            this.makeMatch();
        }
    }

    back () {
        this.scene.manager.hud.hudSocks.closeSocks();
        this.scene.manager.setFocus('PLAYER');  
    }

    makeMatch () {
        var result = this.match(this.dryer.choices[this.selected]);
        this.dryer.choices.splice(this.selected, 1);
        this.reveal(result);
    }

    reveal (result) {
        this.scene.manager.hud.hudSocks.drawReveal(result);
        this.dryer.reveal(result);
        this.drawScore();
    }

    drawScore () {
        this.scene.manager.hud.hudSocks.drawScore(this.getScore());
    }

    startTurn () {
        this.dryer.startTurn();
        this.update();
    }

    match (card) {
        return this.dryer.match(card);
    }

    getScore () {
       return this.dryer.score();
   }


   listen () {
    var callback_up = function () {
        this.scene.manager.hud.hudSocks.arrowUp();
    }
    var callback_down = function () {
        this.scene.manager.hud.hudSocks.arrowDown();
    }
    var callback_select = function () {
        this.scene.manager.hud.hudSocks.select();
    }
    var callback_back = function () {
        this.back();
    }
    this.scene.events.addListener('INPUT_UP_SOCKS', callback_up, this);
    this.scene.events.addListener('INPUT_DOWN_SOCKS', callback_down, this);
    this.scene.events.addListener('INPUT_SELECT_SOCKS', callback_select, this);
    this.scene.events.addListener('INPUT_BACK_SOCKS', callback_back, this);
    }

destroyListeners () {
    this.scene.events.off('INPUT_UP_SOCKS');
    this.scene.events.off('INPUT_DOWN_SOCKS');
    this.scene.events.off('INPUT_SELECT_SOCKS');
    this.scene.events.off('INPUT_BACK_SOCKS');
}

}
    