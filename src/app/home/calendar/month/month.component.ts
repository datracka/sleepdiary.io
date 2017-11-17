import { OnInit } from '@angular/core';
import * as moment from 'moment';
import { Week } from '../types';
import {
  Component, Input,
} from '@angular/core';
let template = require('./month.html');

@Component({
  selector: 'month',
  template: template,
  styleUrls: ['./month.scss']
})
export class Month implements OnInit {
  @Input() renderData: any; //TODO better name.
  public month: Array<Week> = [];
  public startDateOfWeek: any;

  ngOnInit() {

  }

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

  buildWeeks(startDateOfWeek: any, currentMonth: number): any {

    let currentDate: any = startDateOfWeek.clone();
    let nextMonth: number = (currentMonth < 11) ? currentMonth + 1 : 0;
    while ((currentDate.month() !== nextMonth)) {
      let week: Week = new Week(null); /* fullfil with days */
      this.month.push(week);
      currentDate.add(1, "w");
    }
  }
}
