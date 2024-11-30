import DAY_DATA from "../data/days.js";

/* Time Manager Class */

export default class TimeManager {

    constructor(now={hour: 4, minute: 0, second: 0, day: 1, alarm: {set: true, hour: 4, minute: 0}}) {
        this.now = now;
        this.month = ['June','July','August'];
        this.start_date = 3; // June 3rd, start date
        this.daysOfWeek = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday','Monday'];

        this.keyLightOrder = ['astronomicalDawn','nauticalDawn', 'civilDawn', 'sunrise', 'morning', 'solarNoon', 'afternoon', 'sunset', 'civilDusk', 'nauticalDusk', 'astronomicalDusk', 'night'];

        this.second_increment = .5;
        this.time_passing = false;

        this.today = this.getDate();
        
    }

    setSaveFromTime () {
        return {
            HOUR: this.now.hour,
            MINUTE: this.now.minute,
            SECOND: this.now.second,
            DAY: this.now.day,
            ALARM: {
                SET: this.now.alarm.set,
                HOUR: this.now.alarm.hour,
                MINUTE: this.now.alarm.minute
            }
        }
    }

    setTimeFromSave (time) {
        this.now = {
            hour: time.HOUR,
            minute: time.MINUTE,
            second: time.SECOND,
            day: time.DAY,
            alarm: {
                set: time.ALARM.SET,
                hour: time.ALARM.HOUR,
                minute: time.ALARM.MINUTE
            }
        };
        this.setToday();
        this.updateCurrentLightState();

    }

    update () {
        if (this.time_passing) {
            this.incrementSecond(this.second_increment);
            //this.incrementSecond(30);
        }
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

    setToday () {
        this.today = this.getDate();
    }

    updateCurrentLightState () { 
        this.keylight = this.getCurrentLightState();   
    }

    getCurrentLightState () {
        /*
        Get the current hour and minute as a single integer -- stringify the hour and minute and concatenate them to compare to our state times
        */
       var data = this.today.day_data;
       var compare = (this.now.hour * 60) + this.now.minute;
       var state = 'night';
       
       for (var i = 0; i < this.keyLightOrder.length; i++) {
           if (compare >= data[this.keyLightOrder[i]]) {
               state = this.keyLightOrder[i];
           }
       }
       return state;

    }

    getDate (elapsed=this.now) {
        var date = {
            day: elapsed.day + this.start_date,
            month: this.month[0],
            year: 1994,
            weekday: this.getWeekDayName(elapsed),
            day_data: DAY_DATA[elapsed.day]
        };
        
        if (elapsed.day > (30 - this.start_date) && elapsed.day <= (61 - this.start_date)) {
            date.month = this.month[1];
            date.day = elapsed.day - (30 - this.start_date);
        }
        else if (elapsed.day > (61 - this.start_date)) {
            date.month = this.month[2];
            date.day = elapsed.day - (61 - this.start_date);
        }

        return date;
    }

    getWeekDayName (elapsed=this.now) {
        let weekdayIndex = ( elapsed.day + this.start_date) % 7;
        return this.daysOfWeek[weekdayIndex];
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

        this.updateCurrentLightState();
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
        this.setToday();
    }

    getAlarmStatus () {
        if (this.now.alarm.set == 'TRUE') {
            return 'C';
        }
        else {
            return 'B';
        }
    }

}
    