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
        
    
        makeBitmapText (_x,_y, width, size=24, font='SkeleButton') {
            return this.factory.makeBitmapText(_x, _y, width, size, font);
        }

        makeWorldBitmapText (_x,_y, width, size=24, font='SkeleNotebook') {
            return this.factory.makeWorldBitmapText(_x, _y, width, size, font);
        }

        makeBlock(_x, _y, width = 32, height = 32, frameName = 'BLOCK_MID_YELLOW') {
            return this.factory.makeBlock(_x, _y, width, height, frameName);
        }

        makeWorldBlock(_x, _y, width = 32, height = 32, frameName = 'BUBBLE_THINKING') {
            return this.factory.makeWorldBlock(_x, _y, width, height, frameName);
        }

        makeFX (fx_slug, _x, _y, delay=0) {
            this.factory.makeHudFX(fx_slug, _x, _y, delay);
        }

        makeIcon (_x,_y, textureName, frameName) {
            return this.factory.makeIcon(_x + 8,_y + 8, textureName, frameName);
        }

        flutter (elements=[], delay=0) {
            this.factory.flutter(elements, delay);
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