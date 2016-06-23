import {Component, Input} from '@angular/core';
import { Month } from './month'

@Component({
  selector: 'calendar',
  template: '<b>Calendar component</b>'
})
export class CalendarComponent {

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
}
