import DATA from "../data/new.js";

/* Time Manager Class */

export default class TimeManager {

    constructor() {
        
        this.now = DATA.TIME;
        this.month = ['June','July','August'];
        this.start_date = 3; // June 3rd, start date
        this.daysOfWeek = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday','Monday'];
    }

    update () {
        this.incrementSecond(.25);
    }

    getTime (current=this.now) {
        var period = (current.hour > 12) ? 'PM' : 'AM';
        var hour = (current.hour > 12) ? current.hour - 12 : current.hour;
        var time = {
            minute: current.minute,
            hour: hour,
            period: period
        }
        return time;
    }

    getDigitalTime (current=this.now) {
        var time = this.getTime(current);
        if (time.hour < 10) {
            time.hour = '0'+time.hour;
        }
        if (time.minute < 10) {
            time.minute = '0'+time.minute;
        }
        return time;
    }

    getDate (elapsed=this.now) {
        var date = {
            day: elapsed.day + this.start_date,
            month: this.month[0],
            year: 1994,
            weekday: 'Monday'
        };
        
        if (elapsed.day > (30 - this.start_date) && elapsed.day <= (61 - this.start_date)) {
            date.month = this.month[1];
            date.day = elapsed.day - (30 - this.start_date);
        }
        else if (elapsed.day > (61 - this.start_date)) {
            date.month = this.month[2];
            date.day = elapsed.day - (61 - this.start_date);
        }

            // Calculate the weekday name
        const weekdayIndex = ( elapsed.day + this.start_date) % 7;
        date.weekday = this.daysOfWeek[weekdayIndex];
        return date;
    }
    
    incrementSecond(increment) {
        this.now.second += increment;

        while (this.now.second >= 60) {
            this.now.second -= 60;
            this.incrementMinute(1);
        }

        while (this.now.second < 0) {
            this.now.second += 60;
            this.incrementMinute(-1);
        }
    }

    incrementMinute(increment) {
        this.now.minute += increment;

        while (this.now.minute >= 60) {
            this.now.minute -= 60;
            this.incrementHour(1);
        }

        while (this.now.minute < 0) {
            this.now.minute += 60;
            this.incrementHour(-1);
        }
    }

    incrementHour(increment) {
        this.now.hour += increment;

        while (this.now.hour >= 24) {
            this.now.hour -= 24;
            this.incrementDay(1);
        }

        while (this.now.hour < 0) {
            this.now.hour += 24;
            this.incrementDay(-1);
        }
    }

    incrementDay(increment) {
        this.now.day += increment;
    }

}
    