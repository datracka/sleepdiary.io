import {
    Component,
    Input,
    style,
    state,
    animate,
    transition,
    trigger,
    OnInit,
    AfterViewInit, ViewContainerRef
} from '@angular/core';
import * as moment from 'moment';
import {Month} from '../../shared/calendar/month';
import {CalendarService} from '../../shared/calendar/calendar.service'
import {ActivatedRoute, Router} from "@angular/router";
import {Week} from "../../shared/calendar/week";
import {Day} from "../../shared/calendar/day";
import {MetricsIndicators} from "../../shared/common/metrics-indicators";
import {Metric} from "../../shared/common/metrics";
import {MdlSnackbarService} from "angular2-mdl";
import {Entry} from "../../shared/common/entry";
let template = require('./calendar.html');


//todo:
@Component({
    selector: 'calendar',
    template: template,
    styleUrls: ['./calendar.scss'],
    providers: [CalendarService],
    animations: [
        trigger('flyInOut', [
            state('in', style({opacity: 1})),
            transition('void => *', [
                style({opacity: 0}),
                animate(300)
            ])
        ])
    ]
})
export class Calendar implements OnInit, AfterViewInit {

    totalDays: any; //data structure for interpolating styles
    entries: Array<Entry>;
    sub: any;
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
    public metric: Metric;
    public metrics = [
        {value: MetricsIndicators.SLEEPING_QUALITY, display: 'Sleeping Quality'},
        {value: MetricsIndicators.TIREDNESS_FEELING, display: 'Tiredness Feeling'},
    ];

    constructor(
                private mdlSnackbarService: MdlSnackbarService,
                private router: Router,
                public route: ActivatedRoute,
                public calendarService: CalendarService) {
        this.totalDays = new Map();
        this.buildMonths('en', '2016');
        this.metric = {
            metricSelected: MetricsIndicators.SLEEPING_QUALITY
        }
    }

    showSnackbar(message) {
        this.mdlSnackbarService.showSnackbar({
            message: message,
        });
    }


    ngOnInit() {
        //nothing happens here.
    }

    ngAfterViewInit() {

        this.calendarService.getAll().subscribe(
            response => {
                this.entries = response.json();
                let dayMatches = [];
                for (var key in this.entries) {
                    if (this.entries.hasOwnProperty(key)) {
                        let entry: Entry = this.entries[key];
                        let dayMatch: Day = this.totalDays.get(entry.date.substr(0, 10));
                        dayMatch.sleepingQuality = entry.sleepingQuality;
                        dayMatch.tirednessFeeling = entry.tirednessFeeling;
                        dayMatches.push(dayMatch);
                    }
                }
                this.paintInitialDayBackground(dayMatches);
            }
        );

        this.sub = this.route
            .params
            .subscribe(params => {
                let text = "";
                switch (params['actionRef']) {
                    case 'login':
                        let user = JSON.parse(localStorage.getItem('user'));
                        text = "Hi, " + user.name;
                        break;
                    case 'insert':
                        text = "New entry added!";
                        break;
                    case 'update':
                        text = "Entry updated!";
                        break;
                    case 'delete':
                        text = "Entry deleted!";
                        break;
                }
                if (text !== '') {
                    this.showSnackbar(text);
                }
            });
    }

    paintInitialDayBackground(dayMatches) {
        dayMatches.forEach(function (day) {
            day.sleepingQuality = 'sleeping-quality--' + day.sleepingQuality;
            day.tirednessFeeling = 'tiredness-feeling--' + day.tirednessFeeling;

        });
    }

    decorateDay(day) {
        let a = [];

        if (day.isCurrentMonth) {
            a.push('calendar__day--current-month');
            a.push(day.sleepingQuality);
            a.push(day.tirednessFeeling);

            if (day.isToday) {
                a.push('calendar__day--today')
            }
        }

        return a;
    }

    onSelect(day: any) {

        let dayMoment = day.date;
        let entry = this.entries.filter((entry) => {
            //cos date is a ISODate we get 10 firsts characters. Ugly but works
            if (dayMoment.isSame(entry.date.substring(0, 10), 'day'))
                return entry;
        });
        console.log(entry[0]);
        let uuid = 'new';

        if (!day.isCurrentMonth) {
            return false;
        }

        if (typeof entry[0] !== 'undefined') {
            uuid = entry[0].uuid;
        }
        this.router.navigate(['/home/entry', uuid, {day: day.date.format("YYYY-MM-DD")}]);
    }

    //** #####  render methods **/

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

    buildMonths(lang: String, year: String) {

        for (var i = 0; i < 12; i++) {
            let moment: any = this.getMonthDateRange(year, i, true);
            let weeks: Array<Week> = this.buildWeeks(moment.startDateOfWeek, i);
            this.months[i].setWeeks(weeks);
        }
    }

    buildWeeks(startDateOfWeek: any, currentMonth: number): any {

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
                this.buildDays(currentDate.clone(), currentMonth));
            days.push(week);
            currentDate.add(1, "w");
        }
        return days;
    }

    buildDays(date: any, month: any) {
        var days: Array<Day> = [];
        for (var i = 0; i < 7; i++) {
            let day: Day = new Day(
                date.format("dd").substring(0, 1),
                date.date(),
                date.month() === month,
                date.isSame(new Date(), "day"),
                date);

            days.push(day);
            this.totalDays.set(date.format('YYYY-MM-DD'), day);
            //increase "counter"
            date = date.clone();
            date.add(1, "d");

        }

        return days;
    }

    /** ## end render methods **/

}
