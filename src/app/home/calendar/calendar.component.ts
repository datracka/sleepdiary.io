import { CalendarForm } from './calendar-form';
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
import {Month} from './types';
import { CalendarService } from '../../services/calendar/calendar.service'
import { MetricsIndicators } from "../../services/common/metrics-indicators";

let template = require('./calendar.html');

@Component({
  selector: 'calendar',
  template: template,
  styleUrls: ['./calendar.scss'],
  providers: [CalendarService]
})
export class Calendar implements OnInit {

  form: CalendarForm; // TODO: type year and metric
  years: any = [
    { value: '2016', name: '2016' },
    { value: '2017', name: '2017' },
    { value: '2018', name: '2018' }
  ];
  year: Array<Month> = [
    new Month('January', 0),
    new Month('February', 1),
    new Month('March', 2),
    new Month('April', 3),
    new Month('May', 4),
    new Month('June', 5),
    new Month('July', 6),
    new Month('August', 7),
    new Month('September', 8),
    new Month('October', 9),
    new Month('November', 10),
    new Month('December', 11),
  ];

  currentYearSelected = moment().format('YYYY');

  constructor() {
  }

  ngOnInit() {
    this.form = new CalendarForm(this.currentYearSelected, MetricsIndicators.SLEEPING_QUALITY);
    this.buildMonths('en', this.currentYearSelected);
  }

  getMonthDateRange(year: String, month: number, isStartOnMonday: boolean) {

            let monthStartDate: any = moment([year, month]).isoWeekday(1);

            let startDateOfWeek = monthStartDate.clone();
            if (isStartOnMonday) {
                startDateOfWeek.startOf('isoWeek');
            } else {
                startDateOfWeek.startOf('week');
            }

           return startDateOfWeek

        }

        //** FIX: Should return months and not modify inside the function **/
        buildMonths(lang: String, year: String) {

          this.year.forEach ((value: Month, index: number) =>  {

            this.months[i].setWeeks(this.buildWeeks(this.getMonthDateRange(year, i, true), index););
          })



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
}
