import STATES from "../config/hud-states.js";
/* global Phaser */
/*
 * Gets injected into the game scene
 */

export default class HudDisplay {

    constructor(scene, factory) {
       this.scene = scene;
       this.factory = factory;
       this.scene.textures.get('POCKET_BLOCK');
       this.scene.textures.get('POCKET_ARROW');
       this.scene.textures.get('EMPTY');

       this.view = this.scene.manager.getView();
       this.valid_states = STATES;

       this.currentDialog = false;

       this.margin = {
            top: 16,
            right: 16,
            bottom: 16,
            left:16,
       };

    }

    newPocketTip (message,duration=0) {
        var tip = this.addPocketTip(message);
        
        if (duration > 0) {
            setTimeout(() => {
                tip.destroy();
            }, duration);
        }
        return tip;
    }


    addPocketTip (message) {
        const tip =  this.scene.add.dom(this.view.right + 32, this.view.top, 'div', '', message).setClassName('pocket-tip').setOrigin(1,0).setScrollFactor(0).setDepth(150000);
        return tip;
    }


    tellBrain (content,timing=0,status='default') {
        var _x = this.scene.player.snappedStanding.x
        var _y = this.scene.player.snappedStanding.y - 32;
        var thought = this.scene.add.dom(_x,_y, 'div','', content).setOrigin(0);
        thought.setClassName('thought-'+status);
        if (timing > 0) {
            if (status != 'default') {
                let tween_to_y = status == 'positive' ? _y - this.margin.top : _y - this.margin.top/2;
                let tween_to_x = status == 'missing' ? _x + this.margin.left : _x - this.margin.left/2;
                this.scene.tweens.add({
                    targets: [ thought ],
                    y: tween_to_y,
                    x: tween_to_x,
                    duration: timing,
                    ease: 'Sine.easeInOut',
                    loop: -1,
                    yoyo: true
                });
            }
            setTimeout(() => {
                thought.destroy();
            }, timing);
        }
        else {
            return thought;
        }
    }

    drawDirections (directions) {
        if (this.directionsFrame != null) {
            this.directionsFrame.destroy();
        }
            var _x = this.view.left + this.margin.left;
            var _y = this.view.bottom - (96 + this.margin.bottom);

            this.directionsFrame = this.scene.add.dom(_x,_y, 'div','', directions).setOrigin(0).setScrollFactor(0).setClassName('hud-directions');
        
    }

}