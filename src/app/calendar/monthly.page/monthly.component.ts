import { Component } from "@angular/core";
import { CalendarService } from '../../services/calendar/calendar.service';
import { Store } from '@ngrx/store';
import * as fromCalendar from '../calendar.reducer';
import { Observable } from 'rxjs/Rx';


const template = require('./monthly.html');

@Component({
  selector: 'monthly-page',
  providers: [
    CalendarService
  ],
  template: template
})
export class MonthlyPageComponent {

  entries$: Observable<any[]>;

  constructor(private store: Store<fromCalendar.CalendarState>) {
    this.entries$ = this.store.select(fromCalendar.getCalendarDays);
    this.entries$.subscribe(values => console.log('###', values));
  }
}
