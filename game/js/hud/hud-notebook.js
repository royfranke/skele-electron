import NotebookManager from '../notebook/notebook-manager.js';
/*
 * Controls the notebook display on the HUD
 */

export default class HudNotebook {

    constructor(scene, factory) {
       this.scene = scene;
       this.factory = factory;
       this.manager = new NotebookManager(scene);
       this.view = this.scene.manager.getView();
       this.state = 'UNFOCUSED';
       this.position = {
            unfocused: {
                slot: {
                    x: this.view.left + this.view.margin.left,
                    y: this.view.bottom - (this.view.margin.bottom + 32)
                },
                icon: {
                    x: this.view.left + this.view.margin.left + 8,
                    y: this.view.bottom - (this.view.margin.bottom + 24)
                },
                keytip: {
                    x: (this.view.left + this.view.margin.left),
                    y: this.view.bottom - (this.view.margin.bottom + 56)
                },
                panel: {
                    x: this.view.left,
                    y: this.view.bottom,
                },
                page: {
                    x: this.view.left + (this.view.margin.left*2.5),
                    y: this.view.bottom + 16,
                    width: 72,
                    height: 88
                },
                arrow: {
                    left: {
                        x: this.view.left + this.view.margin.left + 32,
                        y: this.view.bottom - (this.view.margin.bottom + 144)
                    },
                    right: {
                        x: this.view.left + this.view.margin.left + 112,
                        y: this.view.bottom - (this.view.margin.bottom + 144)
                    },
                }

            },
            focused: {

            }
        };

        this.position.focused = {
            slot: {
                x: this.position.unfocused.slot.x + 40,
                y: this.position.unfocused.slot.y - 112
            },
            icon: {
                x: this.position.unfocused.icon.x + 40,
                y: this.position.unfocused.icon.y - 112
            },
            keytip: {
                x: this.position.unfocused.keytip.x - 48,
                y: this.position.unfocused.keytip.y
            },
            panel: {
                x: this.position.unfocused.panel.x,
                y: this.position.unfocused.panel.y - 124
            },
            page: {
                x: this.position.unfocused.page.x,
                y: this.position.unfocused.page.y - 124
            },
            arrow: {
                left: {
                    x: this.view.left + this.view.margin.left + 32,
                    y: this.position.unfocused.arrow.left.y
                },
                right: {
                    x: this.view.left + this.view.margin.left + 112,
                    y: this.position.unfocused.arrow.right.y
                },
            }
        };

        this.notebook = {
            block: null,
            icon: null,
            display: null,
            arrow: {
                left: null,
                right: null
            }
        };

        this.addNotebook();
    }

    makeBlock (_x,_y, width=32, height=32, frameName='HAND_UNFOCUSED') {
        return this.factory.makeBlock(_x,_y,width,height,frameName);
    }

    makeIcon (_x,_y, textureName, frameName) {
        return this.factory.makeIcon(_x,_y, textureName, frameName);
    }

    addFX (fx_slug, _x, _y, delay=0) {
        var fx = this.scene.manager.fx.playFX(fx_slug,_x,_y,delay);
        fx.setDepth(100200).setScrollFactor(0);
    }

    addNotebook () {
        this.notebook.block = this.makeBlock(this.position.unfocused.slot.x,this.position.unfocused.slot.y, 32, 32, 'HAND_UNFOCUSED');
        this.notebook.icon = this.makeIcon(this.position.unfocused.icon.x,this.position.unfocused.icon.y, 'ITEMS', 'NOTEBOOK_RED');

        this.notebook.panel = this.factory.makeNotebook(this.position.unfocused.panel.x,this.position.unfocused.panel.y);

        this.notebook.page = this.makeBitmapText(this.position.focused.page.x, this.position.focused.page.y, this.position.unfocused.page.width, '', 8);

        this.notebook.arrow.left = this.factory.makeSideArrow(this.position.unfocused.arrow.left.x,this.position.unfocused.arrow.left.y, 'BAG_ARROW_FOCUSED',true);

        this.notebook.arrow.right = this.factory.makeSideArrow(this.position.unfocused.arrow.right.x,this.position.unfocused.arrow.right.y, 'BAG_ARROW_FOCUSED',false);
    }

    openNotebook() {
        this.scene.manager.hud.hudFocusHints.setKeyTip('NOTEBOOK', true);
        var keytip = this.scene.manager.hud.hudFocusHints.getKeyTip('NOTEBOOK');

        this.scene.tweens.add({
            targets: [keytip],
            y: this.position.focused.keytip.y,
            x: this.position.focused.keytip.x,
            duration: 200,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });
        
        this.scene.tweens.add({
            targets: [this.notebook.block],
            y: this.position.focused.slot.y,
            x: this.position.focused.slot.x,
            duration: 250,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });

        this.scene.tweens.add({
            targets: [this.notebook.icon],
            y: this.position.focused.icon.y,
            x: this.position.focused.icon.x,
            duration: 300,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });
//
    this.notebook.block.setFrame('HAND_FOCUSED');
        var load_panel = this.scene.tweens.add({
            targets: [this.notebook.panel],
            y: this.position.focused.panel.y,
            x: this.position.focused.panel.x,
            duration: 350,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });
        load_panel.on('complete', () => {
            this.state = 'FOCUSED';
        });

        this.scene.tweens.add({
            targets: [this.notebook.page],
            y: this.position.focused.page.y,
            x: this.position.focused.page.x,
            duration: 350,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });

        this.notebook.arrow.left.setVisible(true);
        this.notebook.arrow.right.setVisible(true);

    }

    closeNotebook() {
        this.notebook.arrow.left.setVisible(false);
        this.notebook.arrow.right.setVisible(false);
        this.notebook.block.setFrame('HAND_UNFOCUSED');
        this.state = 'UNFOCUSED';
        this.scene.manager.hud.hudFocusHints.setKeyTip('NOTEBOOK', false);
        var keytip = this.scene.manager.hud.hudFocusHints.getKeyTip('NOTEBOOK');

        this.scene.tweens.add({
            targets: [keytip],
            y: this.position.unfocused.keytip.y,
            x: this.position.unfocused.keytip.x,
            duration: 200,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });
        
        this.scene.tweens.add({
            targets: [this.notebook.block],
            y: this.position.unfocused.slot.y,
            x: this.position.unfocused.slot.x,
            duration: 250,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });

        this.scene.tweens.add({
            targets: [this.notebook.icon],
            y: this.position.unfocused.icon.y,
            x: this.position.unfocused.icon.x,
            duration: 300,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });

        this.scene.tweens.add({
            targets: [this.notebook.panel],
            y: this.position.unfocused.panel.y,
            x: this.position.unfocused.panel.x,
            duration: 350,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });

        this.scene.tweens.add({
            targets: [this.notebook.page],
            y: this.position.unfocused.page.y,
            x: this.position.unfocused.page.x,
            duration: 350,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });

        this.scene.tweens.add({
            targets: [this.notebook.arrow.right],
            x: this.position.unfocused.arrow.right.x,
            duration: 350,
            ease: 'Sine.easeOut',
            loop: 0,
            yoyo: false,
        });

        this.scene.tweens.add({
            targets: [this.notebook.arrow.left],
            x: this.position.unfocused.arrow.left.x,
            duration: 350,
            ease: 'Sine.easeOut',
            loop: 0,
            yoyo: false,
        });
    }

    makeBitmapText (_x,_y, width, text, size) {
        let bitmap = this.factory.makeBitmapText(_x,_y, width, size);
        bitmap.setText(text);
        bitmap.setLineSpacing(8);
        return bitmap;
    }

    drawPage (page) {
        var draw = this.manager.notebook.getPage(page);
        this.notebook.page.setText(draw.title + '\n' + draw.content);
    }


    arrowRight () {
        if (this.state == 'FOCUSED') {
            this.state = 'UNFOCUSED'; 
            this.notebook.arrow.right.setFrame('BAG_ARROW_SELECTED');
/// Arrow down tween on right arrow
            var tween = this.scene.tweens.add({
                targets: [this.notebook.arrow.right],
                y: this.position.focused.arrow.right.y,
                x: this.position.focused.arrow.right.x + 8,
                duration: 250,
                ease: 'Sine.easeIn',
                loop: 0,
                yoyo:true,
            });
            this.manager.selectNext();
            tween.on('complete', () => {
                this.state = 'FOCUSED';
                this.notebook.arrow.right.setFrame('BAG_ARROW_FOCUSED');
            });
            

        }
    }

    arrowLeft () {
        if (this.state == 'FOCUSED') {
            this.state = 'UNFOCUSED';
            this.manager.selectPrevious();
            
            this.notebook.arrow.left.setFrame('BAG_ARROW_SELECTED');
/// Arrow down tween on left arrow
            var tween = this.scene.tweens.add({
                targets: [this.notebook.arrow.left],
                x: this.position.focused.arrow.left.x - 8,
                duration: 250,
                ease: 'Sine.easeIn',
                loop: 0,
                yoyo: true,
            });

            tween.on('complete', () => {
                this.state = 'FOCUSED';
                this.notebook.arrow.left.setFrame('BAG_ARROW_FOCUSED');
            });
        }
    }
    
}