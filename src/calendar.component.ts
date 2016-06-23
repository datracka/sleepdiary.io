import {Component, Input} from '@angular/core';
import {Month} from './month'

@Component({
  selector: 'calendar',
  template: '<b>Calendar component</b>'
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
      //fix 2016 is hardcoded - parametrize
      let monthDateRange = this.getMonthDateRange(year, i, true);
      // let months[i].weeks = this.buildMonth(monthDateRange.startDateOfWeek, i);
    }

  }

  getMonthDateRange(year:number, i:number, flag:boolean) {

  }

  buildMonth(startDateOfWeek:number, i:number) {

  }

  constructor() {
    this.initArrayMonth('en', '2016');
  }
}
