/* Announcement Registry */
/* Manages announcements in the world */
/* Announcements are mailbox address numbers, street names, and other in world signage */

export default class AnnouncementRegistry {

    constructor() {
        this.registry = {};
        this.last_announcements = [];
        this.current_announcements = [];
    }

    loadAnnouncements (_x, _y) {
        this.last_announcements = this.current_announcements;
        if (this.dirtySlot(_x, _y)) {
            this.current_announcements = this.registry[_x+"_"+_y];
        }
        else {
            this.current_announcements = [];
        }
        for (var i=0; i<this.current_announcements.length; i++) {
            this.current_announcements[i].showAnnouncements(true);
        }
        /// Get the difference between the last announcements and the current announcements and remove the last announcements that don't exist in the current announcements
        for (var i=0; i<this.last_announcements.length; i++) {
            if (!this.current_announcements.includes(this.last_announcements[i])) {
                this.last_announcements[i].showAnnouncements(false);
            }
        }
    }

    dirtySlot (_x, _y) {
        return (_x+"_"+_y in this.registry);
    }

    placeEmpty (_x, _y) {
        if (this.dirtySlot(_x, _y)) {
            return this.registry[_x+"_"+_y] == null;
        }
        else {
            return true;
        }
    }

    placeAnnouncer (announcer, _x, _y) {
        for (var y = _y-1; y <= _y+1; y++) {
            for (var x = _x-1; x <= _x+1; x++) {
                this.addAnnouncer(announcer, x, y);
            }
        }
    }

    addAnnouncer (announcer, _x, _y) {
        // Do not refer to this directly, use placeAnnouncer
        if (this.placeEmpty(_x,_y)) {
            this.registry[_x+"_"+_y] = [announcer];
        }
        else {
            // An announcement is already on this tile
            this.registry[_x+"_"+_y].push(announcer);
        }
    }
    
}