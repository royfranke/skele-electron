import Object from "./object.js";

/* Object Glass Class */

export default class ObjectGlass extends Object {

    runSpecial() {
        this.createGlass();
    }

    createGlass() {
        var x_pixels = (this.tile_x - this.info.base.x) * 16;
        var y_pixels = (this.tile_y - this.info.base.y) * 16;

        this.glass = this.scene.add.rectangle(x_pixels + this.info.offset.x, y_pixels + this.info.offset.y, this.info.size.w, this.info.size.h, 0xbad2e0).setOrigin(0).setDepth(y_pixels + (this.info.sprite.h) + this.info.depth - 6);

        this.behind_glass = this.scene.add.rectangle(x_pixels + this.info.offset.x, y_pixels + this.info.offset.y, this.info.size.w, this.info.size.h, 0x4b424a).setOrigin(0).setDepth(y_pixels + (this.info.sprite.h) + this.info.depth - 8);

        //this.setGlass(0x89bcc6,.9);

    }

    setLight (keylight) {
        if (this.sprite != null) {
            this.sprite.setTint(keylight.objects_tint);
            this.setGlass(keylight.reflection_color, keylight.glass_opacity);
        }
    }

    setGlass (color, alpha) {
        if (this.glass != null) {
            this.glass.setFillStyle(color, alpha);
        }
    }

    setBehindGlass (color, alpha=1) {
        if (this.behind_glass != null) {
            this.behind_glass.setFillStyle(color, alpha);
        }
    }

    
    
}


