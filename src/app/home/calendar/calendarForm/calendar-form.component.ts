import {
  Input,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { MetricsIndicators } from "../../../services/common/metrics-indicators";
let template = require('./calendar-form.html');

@Component({
  selector: 'calendar-form',
  template: template,
  styleUrls: ['./calendar-form.scss']
})
export class CalendarForm implements OnInit {

  @Input() currentYearSelected: String;
  @Output() onSetYear = new EventEmitter<String>();
  form: any;

  ngOnInit() {

    this.form = {
      yearSelected: this.currentYearSelected,
      metricSelected: MetricsIndicators.SLEEPING_QUALITY
    };
  }

  setYear(year) {
    this.onSetYear.emit(year);
    this.form.yearSelected = year;
  }

}
