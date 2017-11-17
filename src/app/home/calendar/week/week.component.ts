import {
  Input,
  Component,
  OnInit
} from '@angular/core';
import { Day } from '../types';
let template = require('./week.html');

@Component({
  selector: 'week',
  template: template,
  styleUrls: ['./week.scss']
})
export class Week implements OnInit {

  @Input() week: Array<Days>;
  days: Array<Day>;

  ngOnInit() {

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

  }
}
