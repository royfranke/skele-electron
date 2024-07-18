/* Announcer Class */

export default class Announcer {
    
    constructor(scene, object) {
        this.scene = scene;
        this.object = object;
        this.state = 'UNFORMED';
    }

    showAnnouncement (show=false) {
        if (this.announce != null && !show) {
            this.hideAnnouncement();
        }
        else if (this.announce == null && show) {
            this.drawAnnouncement();
        }
    }

    setAnnouncement (announcement) {
        this.clearAnnouncement();
        this.announcement = announcement;
        
        var _x =this.object.tile_x;
        var _y = this.object.tile_y;
        this.scene.manager.announce.placeAnnouncer(this,_x,_y);
    }

    drawAnnouncement () {
        if (this.state == 'UNFORMED') {
            var _x = this.object.sprite.x + Math.floor(this.object.sprite.width/2);
            var _y = this.object.sprite.y - 16;
            this.announce =  this.scene.add.dom(_x,_y, 'div', '', this.announcement).setClassName('announcer').setOrigin(0).setDepth(1500);
            this.announce.setPosition(_x - (this.announce.displayWidth/2), _y);
            
            this.bounceAnnouncement();
            this.state = 'FORMED';
        }
    }

    hideAnnouncement () {
        var _y = this.object.sprite.y - 16;
        var tween = this.scene.add.tween({
            targets: this.announce,
            y: _y + 4,
            alpha: 0,
            duration: 500,
            yoyo: false,
            ease: 'Sine.easeIn',
            repeat: 0
        });

        tween.on('complete', () => {
            this.clearAnnouncement();
        });
    }

    bounceAnnouncement () {
        var _y = this.object.sprite.y - 16;
        this.scene.add.tween({
            targets: this.announce,
            y: _y - 4,
            duration: 1000,
            yoyo: true,
            ease: 'Sine.easeOut',
            repeat: -1
        });
    }

    clearAnnouncement () {
        if (this.announce != null) {
            this.announce.destroy();
            this.announce = null;
        }
        this.state = 'UNFORMED';
    }

}