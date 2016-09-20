import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Month} from './month';
import {CalendarService} from '../../shared/calendar/calendar.service'
import {ActivatedRoute, Router} from "@angular/router";
import {Week} from "./week";
import {Day} from "./day";
import {MetricsIndicators} from "../../shared/common/metric-indicators";
let template = require('./calendar.html');
let styles = require('./calendar.css');

@Component({
    selector: 'calendar',
    template: template,
    styles: [styles],
    providers: [CalendarService]
})
export class Calendar implements OnInit {

    metricIndicatorClass: string = MetricsIndicators.SLEEPING_QUALITY; //default value
    entries: any;
    backgroundColor;
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
        this.buildMonths('en', '2016');
    }

    decorateCalendar() {
        if (this.metricIndicatorClass === MetricsIndicators.SLEEPING_QUALITY) {
            this.metricIndicatorClass = MetricsIndicators.TIREDNESS_FEELING;
        } else {
            this.metricIndicatorClass = MetricsIndicators.SLEEPING_QUALITY;
        }
    }

    ngOnInit() {
        this.calendarService.getAll().subscribe(
            response => {
                this.entries = response.json();
                for (var key in this.entries) {
                    if(this.entries.hasOwnProperty(key)) {
                        this.decorateDay(this.entries[key]);
                    }
                }
            }
        );

    }

    decorateDay(entry) {
        this.months.forEach(function (month) {
            month.weeks.forEach(function (week) {
                week.days.forEach(function (day) {
                    if (day.date.isSame(entry.date, "day")) {
                        day.sleepingQuality = entry.sleepingQuality;
                        day.tirednessFeeling = entry.tirednessFeeling;
                    }
                });
            });
        });
    }

    onSelect(day: any) {
        let dayFormatted = day.date.format("YYYY-MM-DD");
        let entry = this.entries[dayFormatted];
        let uuid = 'new';
        if (typeof entry !== 'undefined') {
            uuid = entry.uuid;
        }
        this.router.navigate(['/home/entry', uuid, {day: dayFormatted}]);
    }

    static getMonthDateRange(year: String, month: number, isStartOnMonday: boolean) {

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

    buildMonths(lang: String, year: String) {

        for (var i = 0; i < 12; i++) {
            let moment: any = Calendar.getMonthDateRange(year, i, true);
            let weeks: Array<Week> = Calendar.buildWeeks(moment.startDateOfWeek, i);
            this.months[i].setWeeks(weeks);
        }
    }

    static buildWeeks(startDateOfWeek: any, currentMonth: number): any {

        let days: Array<Week> = [],
            currentDate: any = startDateOfWeek.clone(),
            nextMonth: number = 0;

        if (currentMonth == 11) {
            nextMonth = 0;
        } else {
            nextMonth = currentMonth + 1;
        }

        while ((currentDate.month() !== nextMonth)) {
            let week: Week = new Week(
                Calendar.buildDays(currentDate.clone(), currentMonth));
            days.push(week);
            currentDate.add(1, "w");
        }
        return days;
    }

    static buildDays(date: any, month: any) {
        var days: Array<Day> = [];
        for (var i = 0; i < 7; i++) {
            let day: Day = new Day(
                date.format("dd").substring(0, 1),
                date.date(),
                date.month() === month,
                date.isSame(new Date(), "day"),
                date);
            date = date.clone();
            date.add(1, "d");
            days.push(day);
        }
        return days;
    }

}
