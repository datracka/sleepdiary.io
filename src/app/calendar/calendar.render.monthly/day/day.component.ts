import { Store } from "@ngrx/store";
import { CalendarState } from '../../calendar.reducer';
import { DayRender } from './day.render';
import {
  Input,
  Component,
  OnInit
} from '@angular/core';
let template = require('./day.html');

@Component({
  selector: 'day',
  template: template,
  styleUrls: ['./day.scss']
})
export class Day implements OnInit {

  @Input() dayRender: DayRender;
  sleepQuality: string;
  tirednessFeeling: string;

  constructor(private store: Store<CalendarState>) {

  }
  ngOnInit() {
    this.store.select('days').subscribe(state => {

      /* const reducer = (accumulator, currentValue) => {
        this.dayRender.date.isSame(currentValue.date.substring(0, 10), 'day');
      }
      const exist = state.days.reduce(reducer);
      console.log('exists', exist); */
    });
  }

}
