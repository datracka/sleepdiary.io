import { ActivatedRoute, Router } from "@angular/router";
import {
  Component,
  Input,
  style,
  state,
  animate,
  transition,
  trigger,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { MdlSnackbarService } from 'angular2-mdl';
import * as moment from 'moment';
import { DayRender } from './day/day.render';
import { CalendarService } from '../../services/calendar/calendar.service';
import { MonthRender } from './month/month.render';
import { WeekRender } from './week/week.render';
import { Observable } from 'rxjs/Rx';
import { Filters } from '../calendar.reducer';

let template = require('./calendar-render-monthly.html');

@Component({
  selector: 'calendar-render-monthly',
  template: template,
  styleUrls: ['./calendar-render-monthly.scss'],
  providers: [CalendarService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300)
      ])
    ])
  ]
})
export class CalendarRenderMonthly implements OnInit, OnChanges {

  totalDays: any = new Map(); // data structure for interpolating styles
  @Input() entries$: Observable<any[]>;
  @Input() filters: Filters;

  yearRender: Array<MonthRender> = [
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

  constructor(
    private mdlSnackbarService: MdlSnackbarService,
    private router: Router,
    public route: ActivatedRoute,
    public calendarService: CalendarService) {
  }

  ngOnInit() {
    console.log('onInit', this.filters);
    this.buildMonths('en', this.filters.year);
  }

  ngOnChanges() {
    console.log('onChange', this.filters);
    this.buildMonths('en', this.filters.year);
  }

  /* TODO: Should return months and not modify inside the function
  AKA do functional programing way!! */
  buildMonths(lang: String, year: number) {

    for (let i = 0; i < 12; i++) {
      let startDateOfWeek: any = this.getMonthDateRange(year, i, true);
      let weeks: Array<WeekRender> = this.buildWeeks(startDateOfWeek, i);
      this.yearRender[i].setWeeks(weeks);
    }
    // console.log('yearRender', this.yearRender);
  }

  getMonthDateRange(year: number, month: number, isStartOnMonday: boolean) {
    let monthStartDate: any = moment([year, month]).isoWeekday(1);
    let startDateOfWeek = monthStartDate.clone();

    if (isStartOnMonday) {
      startDateOfWeek.startOf('isoWeek');
    } else {
      startDateOfWeek.startOf('week');
    }
    return startDateOfWeek;
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

}