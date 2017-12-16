import {
  Input,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { MetricsIndicators } from '../../services/common/metrics-indicators';
let template = require('./calendar-form.html');

@Component({
  selector: 'calendar-form',
  template: template,
  styleUrls: ['./calendar-form.scss']
})
export class CalendarForm implements OnInit {


  @Input() currentYearSelected: String;
  @Output() onSetYear = new EventEmitter<String>();
  @Output() onSetMetric = new EventEmitter<String>();

  public form: any;
  public metricIndicator: MetricsIndicators = MetricsIndicators.SLEEPING_QUALITY;

  years: any = [
    { value: '2016', name: '2016' },
    { value: '2017', name: '2017' },
    { value: '2018', name: '2018' }
  ];

  ngOnInit() {

    this.form = {
      yearSelected: this.currentYearSelected,
      metricSelected: this.metricIndicator
    };
  }

  setYear(year: String) {
    this.onSetYear.emit(year);
    this.form.yearSelected = year;
  }

  setMetric(metric: String) {
    this.onSetMetric.emit(metric);
    this.form.metricSelected = metric;
  }

}
