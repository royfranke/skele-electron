/* Announcer Class */

export default class Announcer {
    
    constructor(scene, object) {
        this.scene = scene;
        this.object = object;
        this.state = 'UNFORMED';
        this.announced = null;
    }

    showAnnouncements (show=false) {
        if (this.announced != null && !show) {
            this.hideAnnouncements();
        }
        else if (this.announced == null && show) {
            this.drawAnnouncements();
        }
    }

    setAnnouncements (announcements) {
        this.clearAnnouncements();
        this.announcements = announcements;
        
        var _x =this.object.tile_x;
        var _y = this.object.tile_y;
        this.scene.manager.objectManager.announce.placeAnnouncer(this,_x,_y);
    }

    drawAnnouncements () {
        if (this.state == 'UNFORMED') {
            var _x = this.object.sprite.x + Math.floor(this.object.sprite.width/2);
            var _y = this.object.sprite.y - 16;
            var self = this.scene;
            var announced = [];
            this.announcements.forEach((announcement, index) => {
                if (announcement.kind == 'DEFAULT') {

                    let announce = self.add.bitmapText(_x, _y + 1, 'SkeleNewsprint', announcement.announcement, 8).setOrigin(.5).setDepth(_y + 16);

                    announced.push(announce);

                    let sign = self.add.nineslice(_x,_y, 'UI', 'BLOCK_MID_YELLOW_BORDER', announce.displayWidth + 12, 20, 8,8,8,8).setOrigin(.5).setDepth(_y + 15);
                    announced.push(sign);
                }
                else if (announcement.kind == 'CALENDAR') {
                    let announce = this.scene.add.sprite(_x + 16,_y - 48, 'UI','CALENDAR_'+announcement.announcement).setOrigin(0).setDepth(10000);

                    announced.push(announce);
                }
                else if (announcement.kind.slice(0, 15) === 'STREET_SIGN_NS_') {

                    let formatted_announcement = this.formatAnnouncement(announcement.announcement, 'STREET_SIGN');
                    
                    switch(announcement.kind.slice(-2)) {
                        case 'NW':
                            _x = this.object.sprite.x + Math.floor(this.object.sprite.width) + 32;
                            _y = this.object.sprite.y + 16;
                        break;
                        case 'NE':
                            _x = this.object.sprite.x - 32;
                            _y = this.object.sprite.y + 16;
                        break;
                        case 'SW':
                            _x = this.object.sprite.x + Math.floor(this.object.sprite.width) + 32;
                            _y = this.object.sprite.y + this.object.sprite.height - 16;
                        break;
                        case 'SE':
                            _x = this.object.sprite.x - 32;
                            _y = this.object.sprite.y + this.object.sprite.height - 16;
                        break;
                    }

                    let announce = self.add.bitmapText(_x, _y + 48, 'SkeleStreetSigns', formatted_announcement, 12).setOrigin(.5).setDepth(2).setRotation(Phaser.Math.DegToRad(90));
                    announced.push(announce);

                    let sign = self.add.nineslice(_x + 2, _y + 48, 'UI', 'STREET_SIGN', announce.displayWidth + 24, 16, 8,8,8,8).setOrigin(.5).setDepth(0).setRotation(Phaser.Math.DegToRad(90));

                    announced.push(sign);
                }
                else if (announcement.kind.slice(0, 15) == 'STREET_SIGN_EW_') {
                    
                    let formatted_announcement = this.formatAnnouncement(announcement.announcement, 'STREET_SIGN');
                    _y = this.object.sprite.y + Math.floor(this.object.sprite.height);

                    switch(announcement.kind.slice(-2)) {
                        case 'NW':
                            _x = this.object.sprite.x - 32;
                            _y = this.object.sprite.y + this.object.sprite.height + 16;
                        break;
                        case 'NE':
                            _x = this.object.sprite.x + this.object.sprite.width + 32;
                            _y = this.object.sprite.y + this.object.sprite.height + 16;
                        break;
                        case 'SW':
                            _x = this.object.sprite.x + Math.floor(this.object.sprite.width) - 32;
                            _y = this.object.sprite.y + this.object.sprite.height - 32;
                        break;
                        case 'SE':
                            _x = this.object.sprite.x + this.object.sprite.width + 32;
                            _y = this.object.sprite.y + this.object.sprite.height - 32;
                        break;
                    }
                    
                    
                    
                    let announce = self.add.bitmapText(_x, _y, 'SkeleStreetSigns', formatted_announcement, 12).setOrigin(.5).setDepth(3);
                    announced.push(announce);
                    
                    let sign = self.add.nineslice(_x,_y - 2, 'UI', 'STREET_SIGN', announce.displayWidth + 24, 16, 8,8,8,8).setOrigin(.5).setDepth(1);

                    announced.push(sign);
                    
                }
                else if (announcement.kind == 'SHOP_HOURS') {
                    let announcement_string = announcement.announcement.name.toLowerCase() + '\n----------\n';
                    for (const [key, value] of Object.entries(announcement.announcement.schedule)) {
                        if (announcement.announcement.schedule[key].closed != 'TRUE') {
                            announcement_string += key.substring(0,3) + '_' + this.formatTime(announcement.announcement.schedule[key].open) + '-' + this.formatTime(announcement.announcement.schedule[key].close) + '\n';
                        }
                        else {
                            announcement_string += key.substring(0,3) + '_closed________\n';
                        }
                    }

                    let announce = self.add.bitmapText(_x, _y + 1, 'SkeleMarquee', announcement_string, 8).setLineSpacing(0).setOrigin(.5).setMaxWidth(144);
                    
                    _x = _x + Math.round(announce.displayWidth/2) + 48;
                    _y = _y + Math.round(announce.displayHeight/2) + 32;
                    let depth = _y + announce.displayHeight + 128;
                    announce.setPosition(_x,_y).setDepth(depth);


                    announced.push(announce);

                    let sign = self.add.nineslice(_x,_y, 'UI', 'BLOCK_MID_DARK_BORDER', announce.displayWidth + 12, announce.displayHeight + 12, 8,8,8,8).setOrigin(.5).setDepth(depth - 1);
                    announced.push(sign);
                }
            });
            this.announced = announced;
            
            this.bounceAnnouncements();
            this.state = 'FORMED';
        }
    }

    formatTime (time='00:00') {
        var hours = time.slice(0,2);
        var minutes = time.slice(3,5);
        var ampm = 'am';
        if (hours >= 12) {
            ampm = 'pm';
            if (hours > 12) {
                hours = hours - 12;
            }
        }
        return hours + ':' + minutes + ampm;

    }

    formatAnnouncement (announcement, rule) {
        if (rule == 'STREET_SIGN') {
            // change the announcement string to uppercase
            announcement = announcement.toUpperCase();
            // split on the last space in the string, and make a var for the last word
            var last_space = announcement.lastIndexOf(' ');
            var last_word = announcement.slice(last_space + 1);
            var street_name = announcement.slice(0, last_space);
            var last_abbr = '';

            switch (last_word) {
                case 'AVENUE':
                    last_abbr = 'ave';
                    break;
                case 'BOULEVARD':
                    last_abbr = 'blvd';
                    break;
                case 'CIRCLE':
                    last_abbr = 'cir';
                    break;
                case 'COURT':
                    last_abbr = 'ct';
                    break;
                case 'CROSSING':
                    last_abbr = 'xing';
                    break;
                case 'DRIVE':
                    last_abbr = 'dr';
                    break;
                case 'LANE':
                    last_abbr = 'ln';
                    break;
                case 'PARKWAY':
                    last_abbr = 'pkwy';
                    break;
                case 'PLAZA':
                    last_abbr = 'plz';
                    break;
                case 'ROAD':
                    last_abbr = 'rd';
                    break;
                case 'STREET':
                    last_abbr = 'st';
                    break;
                case 'TERRACE':
                    last_abbr = 'ter';
                    break;
                case 'TRAIL':
                    last_abbr = 'trl';
                    break;
                case 'WAY':
                    last_abbr = 'way';
                    break;
            }
            announcement = street_name + ' ' + last_abbr;
        }
        return announcement;
    } 

    hideAnnouncements () {
        var last = this.announced.length - 1;
        this.announced.forEach((announce,index) => {
            var tween = this.scene.add.tween({
                targets: announce,
                y: announce.y + 4,
                alpha: 0,
                duration: 500,
                yoyo: false,
                ease: 'Sine.easeIn',
                repeat: 0
            });

            tween.on('complete', () => {
                if (index == last) {
                    this.clearAnnouncements();
                }
            });
        });

        
        
    }

    bounceAnnouncements () {
        var _y = this.object.sprite.y - 16;
        this.announced.forEach((announce) => {
            this.scene.add.tween({
                targets: announce,
                y: announce.y - 4,
                duration: 1000,
                yoyo: true,
                ease: 'Sine.easeOut',
                repeat: -1
            });
        });
    }

    clearAnnouncements () {
        if (this.announced != null) {
            this.announced.forEach((announce) => {
                announce.destroy();
            });
            this.announced = null;
        }
        this.state = 'UNFORMED';
    }

}