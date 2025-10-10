import HudCommon from './hud-common.js';
import NumberPadManager from '../numberpad/numberpad-manager.js';

/*
 * Controls the numberPad display on the HUD
 */

export default class HudNumberPad extends HudCommon {

    constructor(scene) {
        super(scene);
    }

    initialize() {
        this.keys = [1,2,3,4,5,6,7,8,9,'#',0,'*'];
        this.manager = new NumberPadManager(this.scene, this.keys);
        this.state = 'UNFOCUSED';
        this.position = {
            container: {
                x: this.view.center.x + 48,
                y: this.view.center.y - 72
            },
            panel: {
                x: -8,
                y: -6,
                width: 128,
                height: 160,
            },
            key: {
                width: 32,
                height: 32,
                x: this.view.margin.left/4,
                y: this.view.margin.top/4
            }
        };

    }

    checkNumberPad() {
        if (this.container == undefined) {
            this.addNumberPad();
        }
    }

    setNumberPadState(state) {
        /// FOCUSED, UNFOCUSED
        this.state = state;
    }

    addNumberPad() {
        this.container = this.scene.add.container(this.position.container.x, this.position.container.y).setDepth(1000).setScrollFactor(0);


        var panel = this.makeBlock(this.position.panel.x, this.position.panel.y, this.position.panel.width, this.position.panel.height, 'BLOCK_MID_CREAM_BORDER');

        this.container.add(panel);

        for (let i = 0; i < this.keys.length; i++) {
            let key_x = this.position.key.x + ((i % 3) * (this.position.key.width + this.position.key.x));
            let key_y = this.position.key.y + (Math.floor(i / 3) * (this.position.key.height + this.position.key.y));

            let key_block = this.makeBlock(key_x, key_y, this.position.key.width, this.position.key.height, 'BLOCK_DEEP_BEIGE').setDepth(1).setInteractive();

            key_block.on('pointerdown', () => {
                this.manager.pressKey(this.keys[i]);
                key_block.setFrame('BLOCK_SHALLOW_BEIGE');
                this.scene.time.addEvent({
                    delay: 500,
                    callback: ()=>{
                        key_block.setFrame('BLOCK_DEEP_BEIGE');
                    }
                });
            });

            let key_text = this.makeBitmapText(key_x + (this.position.key.width / 2), key_y + (this.position.key.height / 2) + 1,32, 16, 'SkeleNewsprint').setOrigin(0.5).setDepth(2).setText(this.keys[i].toString());

            this.container.add(key_block);
            this.container.add(key_text);

        }

    }

    openNumberPad() {
        this.checkNumberPad();
        //
        this.setNumberPadState('FOCUSED');

        this.manager.listen();
    }

    closeNumberPad() {
        this.manager.destroyListeners();
        this.checkNumberPad();
        this.setNumberPadState('UNFOCUSED');
        this.container.destroy();
    }

}