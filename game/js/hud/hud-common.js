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
    
}