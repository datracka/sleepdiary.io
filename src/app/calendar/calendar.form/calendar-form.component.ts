import {
  Input,
  Component,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../app.reducer';
import { getCalendarFilters, Filters } from '../calendar.reducer';
import {
  CALENDAR_ACTIONS
} from '../calendar.constants';
let template = require('./calendar-form.html');

@Component({
  selector: 'calendar-form',
  template: template,
  styleUrls: ['./calendar-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarForm implements OnInit, OnChanges {

  metricSelected: string;
  @Input() metric: string;
  @Input() year: number;
  years: any = [
    { value: '2016', name: '2016' },
    { value: '2017', name: '2017' },
    { value: '2018', name: '2018' },
    { value: '2019', name: '2019' }
  ];

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.metricSelected = this.metric;
  }

  ngOnChanges() {
    this.metricSelected = this.metric;
  }

  setMetric(value) {
    this.store.dispatch({
      type: CALENDAR_ACTIONS.SELECT_METRIC,
      payload: value
    });
  }

  setYear(value) {
    this.store.dispatch({
      type: CALENDAR_ACTIONS.SELECT_YEAR,
      payload: value
    });
  }
}
