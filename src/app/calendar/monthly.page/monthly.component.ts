import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarService } from '../../services/calendar/calendar.service';
import { Store } from '@ngrx/store';
import * as fromCalendar from '../calendar.reducer';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';
import { Entry } from '../../services/common/entry';
import { Router } from '@angular/router';
import { ROUTE_ENTRY_FORM } from '../calendar.constants';


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
  year: number;

  constructor(private store: Store<fromCalendar.CalendarState>, private router: Router) {
    this.entries$ = this.store.select(fromCalendar.getCalendarDays);
    this.store.select(fromCalendar.getFilterYear).subscribe(year => this.year = year);
  }
  /*
    We check if the current day is already filled and if so we retrieve the uuid to send to entry-form
    Entry-form will use it to retrieve the day from backend
  */
  clickOnAdd() {
    this.entries$.subscribe(
      entries => {
        const arr = Object.keys(entries).map((k) => entries[k]);
        const entry: Array<Entry> = arr.filter(
          e => moment().isSame(e.date.substring(0, 10), 'day')
        );
        const uuid = (entry.length > 0) ? entry[0].uuid : 'new';
        // TODO '/calendar/entry' should be a CONSTANT
        this.router.navigate(['/calendar/entry', uuid, { day: moment().format('YYYY-MM-DD') }]);
      }
    );
  }
}
