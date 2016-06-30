import {Component, Input} from '@angular/core';
import * as moment from 'moment';
import {Month} from './month';
import {MomentWrapper} from './moment-wrapper';
let template = require('./calendar.component.html');

@Component({
    selector: 'calendar',
    template: template
})
export class CalendarComponent {

    months:Array<Month> = [
        new Month('January'),
        new Month('February'),
        new Month('March'),
        new Month('April'),
        new Month('May'),
        new Month('June'),
        new Month('July'),
        new Month('August'),
        new Month('September'),
        new Month('October'),
        new Month('November'),
        new Month('December'),
    ];

    initArrayMonth(lang:String, year:String) {

        for (var i = 0; i < 12; i++) {
            let moment:any = this.getMonthDateRange(year, i, true);
            let theWeeks:any = this.buildMonth(moment.startDateOfWeek, i);
            this.months[i].setWeeks(theWeeks);
        }

        console.log(this.months);

    }

    getMonthDateRange(year:String, month:number, isStartOnMonday:boolean) {

        let monthStartDate:any = moment([year, month]).isoWeekday(1);

        let startDateOfWeek = monthStartDate.clone();
        if (isStartOnMonday) {
            startDateOfWeek.startOf('isoWeek');
        } else {
            startDateOfWeek.startOf('week');
        }

        return {
            monthStartDate: monthStartDate,
            startDateOfWeek: startDateOfWeek
        };

    }

    buildMonth(startDateOfWeek:any, currentMonth:number):any {

        let theWeeks:Array<any> = [],
            currentDate:any = startDateOfWeek.clone(),
            nextMonth:number = 0;

        if (currentMonth == 11) {
            nextMonth = 0;
        } else {
            nextMonth = currentMonth + 1;
        }

        while ((currentDate.month() !== nextMonth)) {
            theWeeks.push({days: this.buildWeek(currentDate.clone(), currentMonth)});
            currentDate.add(1, "w");
        }
        return theWeeks;
    }

    buildWeek(date:any, month:any) {
        var days:any = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month,
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }

    constructor() {
        this.initArrayMonth('en', '2016');
    }
}
