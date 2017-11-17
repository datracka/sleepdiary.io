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
import {MonthRender} from '../../services/calendar/month.render';
import {CalendarService} from '../../services/calendar/calendar.service'
import {ActivatedRoute, Router} from "@angular/router";
import {WeekRender} from "../../services/calendar/week.render";
import {DayRender} from "../../services/calendar/day.render";
import {MetricsIndicators} from "../../services/common/metrics-indicators";
import {Metric} from "../../services/common/metrics";
import {MdlSnackbarService} from "angular2-mdl";
import {Entry} from "../../services/common/entry";
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

    totalDays: any = new Map(); //data structure for interpolating styles
    entries: Array<Entry>;
    sub: any;
    form: any;
    public params: any = {
        day: null,
    }

    years: any = [
        {value: '2016', name: '2016'},
        {value: '2017', name: '2017'},
        {value: '2018', name: '2018'}
    ];

    year: Array<MonthRender> = [
        new MonthRender('January'),
        new MonthRender('February'),
        new MonthRender('March'),
        new MonthRender('April'),
        new MonthRender('May'),
        new MonthRender('June'),
        new MonthRender('July'),
        new MonthRender('August'),
        new MonthRender('September'),
        new MonthRender('October'),
        new MonthRender('November'),
        new MonthRender('December'),
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
    }

    showSnackbar(message) {
        this.mdlSnackbarService.showSnackbar({
            message: message,
        });
    }


    ngOnInit() {

        this.sub = this.route
            .params
            .subscribe(params => {
                this.params.day = params['day'];
            });

        this.form = {
            yearSelected: '2016',
            metricSelected:  MetricsIndicators.SLEEPING_QUALITY
        };

        let currentYearSelected = moment().format('YYYY');
        //if param day is fullfilled we use this information for building the calendar
        if (typeof this.params.day !== 'undefined' && this.params.day !== null) {
            currentYearSelected = moment(this.params.day).format("YYYY");
        }
        this.buildMonths('en', currentYearSelected);
        this.form.yearSelected = currentYearSelected;
    }

    ngAfterViewInit() {

        this.calendarService.getAll(this.form.yearSelected).subscribe(
            response => {
              this.processResponse(response)
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

    processResponse(response) {
      this.entries = response.json();
      let dayMatches = [];
      for (var entry in this.entries) {
        if (this.entries.hasOwnProperty(entry)) {
          let e: Entry = this.entries[entry];
          let entryKey = e.date.substr(0, 10);
          let intermediateObject: DayRender = {...this.totalDays.get(entryKey)};
          let dayMatch: DayRender = new DayRender(
            intermediateObject.name,
            intermediateObject.number,
            intermediateObject.isCurrentMonth,
            intermediateObject.isToday,
            intermediateObject.date
          );
          dayMatch.sleepingQuality = 'sleeping-quality--' + e.sleepingQuality;
          dayMatch.tirednessFeeling = 'tiredness-feeling--' + e.tirednessFeeling;

          this.totalDays.set(entryKey, dayMatch as Day);
        }
      }
    }

    paintInitialDayBackground(dayMatches) {
        dayMatches.forEach(function (day) {
            day.sleepingQuality = 'sleeping-quality--' + day.sleepingQuality;
            day.tirednessFeeling = 'tiredness-feeling--' + day.tirednessFeeling;

        });
    }

    decorateDay(day) {
        let a = [];
        let key = day.date.format('YYYY-MM-DD');

        if (day.isCurrentMonth) {
            a.push('calendar__day--current-month');
            a.push(this.totalDays.get(key).sleepingQuality);
            a.push(this.totalDays.get(key).tirednessFeeling);

            if (day.isToday) {
                a.push('calendar__day--today')
            }
        }

        return a;
    }

    setYear(year) {

        this.form.yearSelected = year;
        //build new year
        this.buildMonths('en', year);
        //get values for given year
        this.calendarService.getAll(this.form.yearSelected).subscribe(
            response => {
              this.processResponse(response)
            }
        );
    }



    /**
     * FIX: DRY onSelectCurrentDay / onSelect
     */
    onSelectCurrentDay() {

        let current = moment();

        let entry = this.entries.filter((entry) => {
            //cos date is a ISODate we get 10 firsts characters. Ugly but works
            if (current.isSame(entry.date.substring(0, 10), 'day'))
                return entry;
        });

        let uuid = 'new';

        if (typeof entry[0] !== 'undefined') {
            uuid = entry[0].uuid;
        }
        this.router.navigate(['/home/entry', uuid, {day: current.format("YYYY-MM-DD")}]);
    }

    onSelect(day: any) {

        let dayMoment = day.date;
        let entry = this.entries.filter((entry) => {
            //cos date is a ISODate we get 10 firsts characters. Ugly but works
            if (dayMoment.isSame(entry.date.substring(0, 10), 'day'))
                return entry;
        });
        let uuid = 'new';

        if (!day.isCurrentMonth) {
            return false;
        }

        if (typeof entry[0] !== 'undefined') {
            uuid = entry[0].uuid;
        }
        this.router.navigate(['/home/entry', uuid, {day: day.date.format("YYYY-MM-DD")}]);
    }

    //** #####  RENDER METHODS ################## **/

    getMonthDateRange(year: String, month: number, isStartOnMonday: boolean) {

        let monthStartDate: any = moment([year, month]).isoWeekday(1);

        let startDateOfWeek = monthStartDate.clone();
        if (isStartOnMonday) {
            startDateOfWeek.startOf('isoWeek');
        } else {
            startDateOfWeek.startOf('week');
        }

        return startDateOfWeek;

    }

    //** FIX: Should return months and not modify inside the function **/
    buildMonths(lang: String, year: String) {

        for (var i = 0; i < 12; i++) {
            let startDateOfWeek: any = this.getMonthDateRange(year, i, true);
            let weeks: Array<WeekRender> = this.buildWeeks(startDateOfWeek, i);
            this.year[i].setWeeks(weeks);
        }
    }

    buildWeeks(startDateOfWeek: any, currentMonth: number): any {

        let days: Array<WeekRender> = [],
            currentDate: any = startDateOfWeek.clone(),
            nextMonth: number = 0;

        if (currentMonth == 11) {
            nextMonth = 0;
        } else {
            nextMonth = currentMonth + 1;
        }

        while ((currentDate.month() !== nextMonth)) {
            let week: WeekRender = new WeekRender(
                this.buildDays(currentDate.clone(), currentMonth));
            days.push(week);
            currentDate.add(1, "w");
        }
        return days;
    }

    buildDays(date: any, month: any) {
        var days: Array<DayRender> = [];
        for (var i = 0; i < 7; i++) {
            let day: DayRender = new DayRender(
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
