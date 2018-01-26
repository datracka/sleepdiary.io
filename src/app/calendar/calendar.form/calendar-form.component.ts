import {
  Input,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../app.reducer';
import { getCalendarFilters, Filters } from '../calendar.reducer';
import { MetricsIndicators } from '../../services/common/metrics-indicators';
import {
  CALENDAR_ACTIONS
} from '../calendar.constants';
let template = require('./calendar-form.html');

@Component({
  selector: 'calendar-form',
  template: template,
  styleUrls: ['./calendar-form.scss']
})
export class CalendarForm implements OnInit {

  public form: any;
  filters: Filters;
  @Input() currentYearSelected: String;
  @Input() year: number;
  public metricIndicator: MetricsIndicators = MetricsIndicators.SLEEPING_QUALITY;
  years: any = [
    { value: '2016', name: '2016' },
    { value: '2017', name: '2017' },
    { value: '2018', name: '2018' },
    { value: '2019', name: '2019' }
  ];

  constructor(private store: Store<State>) {
    this.store.select(getCalendarFilters).subscribe(filters => {
      this.filters = filters;
    });
  }

  ngOnInit() {

    this.form = {
      yearSelected: this.currentYearSelected,
      metricSelected: this.metricIndicator
    };
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
