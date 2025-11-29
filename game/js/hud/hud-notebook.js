import HudSide from './hud-side.js';
import NotebookManager from '../notebook/notebook-manager.js';
/*
 * Controls the notebook display on the HUD
 */

export default class HudNotebook extends HudSide {

    constructor(scene) {
        super(scene);
    }

    setVariables() {
        this.manager = new NotebookManager(this.scene);
        this.keytip = 'NOTEBOOK';
        this.colors = {
            selected: 'ITEM_FOCUSED',
            normal: 'BAG_UNFOCUSED',
            frame:'BLOCK_SHALLOW_YELLOW_FRAME'
        };

        this.icon = 'NOTEBOOK_CLOSED_RED';
        this.position = {
            unfocused: {
                slot: {
                    x: this.view.left + this.view.margin.left,
                    y: this.view.bottom - (this.view.margin.bottom + 32)
                },
                icon: {
                    x: this.view.left + this.view.margin.left,
                    y: this.view.bottom - (this.view.margin.bottom + 30)
                },
                panel: {
                    x: this.view.left,
                    y: this.view.bottom,
                },
                page: {
                    x: this.view.left + 43,
                    y: this.view.bottom + 16,
                    width: 72,
                    height: 88
                },
                arrow: {
                    left: {
                        x: this.view.left + this.view.margin.left + 32,
                        y: this.view.bottom - (this.view.margin.bottom + 32)
                    },
                    right: {
                        x: this.view.left + this.view.margin.left + 112,
                        y: this.view.bottom - (this.view.margin.bottom + 32)
                    },
                }

            },
            focused: {

            }
        };

        this.position.focused = {
            slot: {
                x: this.position.unfocused.slot.x + 40,
                y: this.view.bottom - (this.view.margin.bottom + 32)
            },
            icon: {
                x: this.position.unfocused.icon.x + 40,
                y: this.view.bottom - (this.view.margin.bottom + 32)
            },
            panel: {
                x: this.position.unfocused.panel.x,
                y: this.position.unfocused.panel.y - 188
            },
            page: {
                x: this.position.unfocused.page.x,
                y: this.position.unfocused.page.y - 188
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

        this.side = {
            block: null,
            icon: null,
            display: null,
            arrow: {
                left: null,
                right: null
            }
        };

        this.side.icon = this.scene.manager.fx.handleHudFX('NOTEBOOK_CLOSE', this.position.unfocused.icon.x, this.position.unfocused.icon.y);

    }


    openManager() {
        
        this.side.panel = this.factory.makeNotebook(this.position.unfocused.panel.x, this.position.unfocused.panel.y);

        this.side.page = this.makeBitmapText(this.position.unfocused.page.x, this.position.unfocused.page.y, this.position.unfocused.page.width, '', 8);

        this.side.arrow.left = this.factory.makeSideArrow(this.position.unfocused.arrow.left.x, this.position.unfocused.arrow.left.y, 'BAG_ARROW_FOCUSED', true);

        this.side.arrow.right = this.factory.makeSideArrow(this.position.unfocused.arrow.right.x, this.position.unfocused.arrow.right.y, 'BAG_ARROW_FOCUSED', false);

        this.side.arrow.left.setVisible(false);
        this.side.arrow.right.setVisible(false);

        this.side.arrow.left.setInteractive();
        this.side.arrow.right.setInteractive();

        this.side.arrow.left.on('pointerdown', () => {
            this.arrowLeft();
        });
        
        this.side.arrow.right.on('pointerdown', () => {
            this.arrowRight();
        });


        this.side.panel.setFrame('NOTEBOOK_OPEN');
        // To redraw page
        this.manager.setSelected(this.manager.selected);
        this.side.icon.anims.play('NOTEBOOK_OPEN');
        this.scene.tweens.add({
            targets: [this.side.block],
            y: this.position.focused.slot.y,
            x: this.position.focused.slot.x,
            duration: 250,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });

        this.scene.tweens.add({
            targets: [this.side.active_frame],
            y: this.position.focused.slot.y - 4,
            x: this.position.focused.slot.x - 4,
            duration: 250,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });

        this.scene.tweens.add({
            targets: [this.side.icon],
            y: this.position.focused.icon.y,
            x: this.position.focused.icon.x,
            duration: 300,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });

        var load_panel = this.scene.tweens.add({
            targets: [this.side.panel],
            y: this.position.focused.panel.y,
            x: this.position.focused.panel.x,
            duration: 350,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });
        load_panel.on('complete', () => {
            this.setState('FOCUSED');
        });

        this.scene.tweens.add({
            targets: [this.side.page],
            y: this.position.focused.page.y,
            x: this.position.focused.page.x,
            duration: 350,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });

        this.side.arrow.left.setVisible(true);
        this.side.arrow.right.setVisible(true);

        this.manager.listen();
    }

    closeManager() {
        this.manager.destroyListeners();
        this.side.arrow.left.setVisible(false);
        this.side.arrow.right.setVisible(false);

        this.scene.tweens.add({
            targets: [this.side.block],
            y: this.position.unfocused.slot.y,
            x: this.position.unfocused.slot.x,
            duration: 250,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });
        this.side.icon.anims.play('NOTEBOOK_CLOSE');
        this.scene.tweens.add({
            targets: [this.side.icon],
            y: this.position.unfocused.icon.y,
            x: this.position.unfocused.icon.x,
            duration: 300,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });

        this.scene.tweens.add({
            targets: [this.side.panel],
            y: this.position.unfocused.panel.y,
            x: this.position.unfocused.panel.x,
            duration: 350,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });

        this.scene.tweens.add({
            targets: [this.side.page],
            y: this.position.unfocused.page.y,
            x: this.position.unfocused.page.x,
            duration: 350,
            ease: 'Sine.easeIn',
            loop: 0,
            yoyo: false,
        });

        this.scene.tweens.add({
            targets: [this.side.arrow.right],
            x: this.position.unfocused.arrow.right.x,
            duration: 350,
            ease: 'Sine.easeOut',
            loop: 0,
            yoyo: false,
        });

        this.scene.tweens.add({
            targets: [this.side.arrow.left],
            x: this.position.unfocused.arrow.left.x,
            duration: 350,
            ease: 'Sine.easeOut',
            loop: 0,
            yoyo: false,
        });
    }

    makeBitmapText(_x, _y, width, text, size) {
        let bitmap = this.factory.makeBitmapText(_x, _y, width, size);
        bitmap.setText(text);
        bitmap.setTintFill(0x465e62);
        bitmap.setLineSpacing(8);
        return bitmap;
    }

    drawPage(page) {
        var draw = this.manager.notebook.getPage(page);
        if (draw == null) {
            return;
        }
        this.side.page.setText(draw.title + '\n' + draw.content);
    }


    arrowRight() {
        if (this.state == 'FOCUSED') {
            this.setState('UNFOCUSED');
            this.side.arrow.right.setFrame('BAG_ARROW_SELECTED');
            this.side.icon.anims.play('NOTEBOOK_NEXT');
            /// Arrow down tween on right arrow
            var tween = this.scene.tweens.add({
                targets: [this.side.arrow.right],
                y: this.position.focused.arrow.right.y,
                x: this.position.focused.arrow.right.x + 8,
                duration: 250,
                ease: 'Sine.easeIn',
                loop: 0,
                yoyo: true,
            });
            this.manager.selectNext();
            tween.on('complete', () => {
                this.setState('FOCUSED');
                this.side.arrow.right.setFrame('BAG_ARROW_FOCUSED');
            });


        }
    }

    arrowLeft() {
        if (this.state == 'FOCUSED') {
            this.setState('UNFOCUSED');
            this.manager.selectPrevious();

            this.side.arrow.left.setFrame('BAG_ARROW_SELECTED');
            this.side.icon.anims.play('NOTEBOOK_PREVIOUS');
            /// Arrow down tween on left arrow
            var tween = this.scene.tweens.add({
                targets: [this.side.arrow.left],
                x: this.position.focused.arrow.left.x - 8,
                duration: 250,
                ease: 'Sine.easeIn',
                loop: 0,
                yoyo: true,
            });

            tween.on('complete', () => {
                this.setState('FOCUSED');
                this.side.arrow.left.setFrame('BAG_ARROW_FOCUSED');
            });
        }
    }
    

}