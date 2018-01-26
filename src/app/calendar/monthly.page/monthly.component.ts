import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarService } from '../../services/calendar/calendar.service';
import { Store } from '@ngrx/store';
import * as fromCalendar from '../calendar.reducer';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';
import { Entry } from '../../services/common/entry';
import { Router } from '@angular/router';


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
    Architectural problem!

    Backend is not Source of Truth. Client checks entries in Redux state and switch if 'ner' or 'existing'
    entry-form receives 'new' or 'uuid' and retrieve whole information from state

    This is stupid and a lost of resources. We are gathering all the information for mantaining the state between views.

    Better approach ask Backend if exists or not current day...
  */
  clickOnAdd() {
    console.log('clickOnAdd!');
    this.entries$.subscribe(
      entries => {
        const arr = Object.keys(entries).map((k) => entries[k]);
        const entry: Array<Entry> = arr.filter(
          entry => moment().isSame(entry.date.substring(0, 10), 'day')
        );
        console.log('there is day', entry);
        const uuid = (entry.length > 0) ? entry[0].uuid : 'new';
        this.router.navigate(['/entry', uuid, { day: moment().format('YYYY-MM-DD') }]);
      }
    )
  }
}
