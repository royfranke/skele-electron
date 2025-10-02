import HudFactory from "./hud-factory.js";

/*
 * Handles common HUD functions, connecting to factory
 * Other hud types extend this class
 */


export default class HudCommon {
    
        constructor(scene) {
            this.scene = scene;
            this.factory = new HudFactory(this.scene);
            this.view = this.scene.app.camera.view;
            this.initialize();
        }

        initialize () {
            
        }

        destroySlip(slip) {
            if (slip != null) {
                slip.block.destroy();
                slip.text.destroy();
                slip.button.destroy();
                slip.button_text.destroy();
                slip = null;
                return slip;
            }
        }

        makeBackButton(_x, _y, text = 'CLOSE') {
            let close_button = 'Z';
            return this.factory.makeSlip(_x, _y, text, close_button);
        }

        makeSlip(_x,_y,text,button) {
            return this.factory.makeSlip(_x, _y, text, button);
        }

        makeButton(_x,_y,text,button) {
            return this.factory.makeButton(_x, _y, text, button);
        }
    
        makeBitmapText (_x,_y, width, size=24, font='SkeleButton') {
            return this.factory.makeBitmapText(_x, _y, width, size, font);
        }

        makeWorldBitmapText (_x,_y, width, size=24, font='SkeleNotebook') {
            return this.factory.makeWorldBitmapText(_x, _y, width, size, font);
        }

        makeBlock(_x, _y, width = 32, height = 32, frameName = 'BLOCK_MID_YELLOW') {
            return this.factory.makeBlock(_x, _y, width, height, frameName);
        }

        makeFocusBlock(_x, _y, width = 32, height = 32, frameName = 'BLOCK_DEEP_SAPPHIRE') {
            return this.factory.makeFocusBlock(_x, _y, width, height, frameName);
        }

        makeFocusBitmapText(_x, _y, width, size = 24, font = 'SkeleButton') {
            return this.factory.makeFocusBitmapText(_x, _y, width, size, font);
        }

        makeWorldBlock(_x, _y, width = 32, height = 32, frameName = 'THOUGHT_CLOUD') {
            return this.factory.makeWorldBlock(_x, _y, width, height, frameName);
        }

        makeHUDRightArrow(_x, _y, color = 'YELLOW') {
            return this.factory.makeHUDRightArrow(_x, _y, color);
        }

        makeHUDLeftArrow(_x, _y, color = 'YELLOW') {
            let arrow = this.factory.makeHUDRightArrow(_x, _y, color);
            arrow.setFlipX(true);
            return arrow;
        }

        makeHUDDownArrow(_x, _y, color = 'YELLOW') {
            return this.factory.makeHUDDownArrow(_x, _y, color);
        }

        makeHUDUpArrow(_x, _y, color = 'YELLOW') {
            let arrow = this.factory.makeHUDDownArrow(_x, _y, color);
            arrow.setFlipY(true);
            return arrow;
        }

        makeFX (fx_slug, _x, _y, delay=0) {
            return this.factory.makeHudFX(fx_slug, _x, _y, delay);
        }


        makeStackIndicator(_x, _y) {
            return this.factory.makeStackIndicator(_x, _y);
        }

        makeIcon (_x,_y, textureName, frameName) {
            return this.factory.makeIcon(_x + 8,_y + 8, textureName, frameName);
        }

        flutter (elements=[], delay=0) {
            this.factory.flutter(elements, delay);
        }

        plunge (elements=[],_y) {
            this.factory.plunge(elements,_y);
        }

        getNumberSymbol (number=0) {
            // Utility that probably shouldn't live here, but here it is
            // For use with SkeleScrawl font
            var display_number = number;
            if (number == 0) {
                display_number = ' ';
            }
            if (number > 5 && number < 11) {
                let helper = number - 5;
                display_number = '5'+helper;
            }
            if (number > 10 && number < 21) {
                let helper = number - 10;
                display_number = '55'+helper;
            }
            return display_number;
        }
    
}