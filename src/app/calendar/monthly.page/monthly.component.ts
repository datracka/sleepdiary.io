import { Component, ChangeDetectionStrategy } from "@angular/core";
import { CalendarService } from '../../services/calendar/calendar.service';
import { Store } from '@ngrx/store';
import * as fromCalendar from '../calendar.reducer';
import { Observable } from 'rxjs/Rx';
import { Filters } from '../calendar.reducer';


const template = require('./monthly.html');

@Component({
  selector: 'monthly-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CalendarService
  ],
  template: template
})
export class MonthlyPageComponent {

  entries$: Observable<any[]>;
  filters: Filters;

  constructor(private store: Store<fromCalendar.CalendarState>) {
    this.entries$ = this.store.select(fromCalendar.getCalendarDays);
    this.store.select(fromCalendar.getCalendarFilters).subscribe(filters => this.filters = filters);
  }
}
