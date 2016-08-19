import {Component, Input, ViewEncapsulation, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Month} from './month';
import {CalendarService} from '../shared/calendar/calendar.service'
import {ActivatedRoute, Router} from "@angular/router";
let template = require('./calendar.html');
let styles = require('./calendar.css');

@Component({
    selector: 'calendar',
    template: template,
    styles: [styles],
    providers: [CalendarService],
    encapsulation: ViewEncapsulation.Native
})
export class Calendar implements OnInit {

    cssDiaryPointer: any = 'sleeping-quality';
    entries: any;
    months: Array<Month> = [
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

    constructor(private router: Router, public route: ActivatedRoute, public calendarService: CalendarService) {
        this.initArrayMonth('en', '2016');
    }

    decorateCalendar() {
        let cssClass = [];
        cssClass.push(this.cssDiaryPointer);
        return cssClass;
    }
    decorateDay(day: any) {

        let cssClasses = [];
        let dayFormatted = day.date.format("YYYY-MM-DD");

        if (!day.isCurrentMonth) {
            cssClasses.push('inactive');
        }

        //when observable was resolved
        if (typeof this.entries !== 'undefined') {
            let data = this.entries[dayFormatted];
            if (typeof data !== 'undefined') {
                //if it is an filled entry highlight it.
                cssClasses.push("sleeping-quality-" + data.sleepingQuality);
                cssClasses.push("tiredness-feeling-" + data.tirednessFeeling);
            }
        }

        return cssClasses;
    }

    ngOnInit() {
        this.calendarService.getAll().subscribe(
            response => {
                this.entries = response.json();
            }
        );
    }

    onSelect(day: any) {
        let dayFormatted = day.date.format("YYYY-MM-DD");
        let entry = this.entries[dayFormatted];
        let uuid = 'new';
        if (typeof entry !== 'undefined') {
            uuid = entry.uuid;
        }
        this.router.navigate(['/entry', uuid, {day: dayFormatted}]);
    }

    initArrayMonth(lang: String, year: String) {

        for (var i = 0; i < 12; i++) {
            let moment: any = this.getMonthDateRange(year, i, true);
            let theWeeks: any = this.buildMonth(moment.startDateOfWeek, i);
            this.months[i].setWeeks(theWeeks);
        }
    }

    getMonthDateRange(year: String, month: number, isStartOnMonday: boolean) {

        let monthStartDate: any = moment([year, month]).isoWeekday(1);

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

    buildMonth(startDateOfWeek: any, currentMonth: number): any {

        let theWeeks: Array<any> = [],
            currentDate: any = startDateOfWeek.clone(),
            nextMonth: number = 0;

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

    buildWeek(date: any, month: any) {
        var days: any = [];
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

}
