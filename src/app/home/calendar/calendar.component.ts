import { CalendarForm } from './calendar-form';
import {
  Component,
  Input,
  style,
  state,
  animate,
  transition,
  trigger,
  OnInit,
  AfterViewInit, ViewContainerRef
} from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from '../../services/calendar/calendar.service'
import { MetricsIndicators } from "../../services/common/metrics-indicators";

let template = require('./calendar.html');

@Component({
  selector: 'calendar',
  template: template,
  styleUrls: ['./calendar.scss'],
  providers: [CalendarService]
})
export class Calendar implements OnInit {

  form: CalendarForm; // TODO: type year and metric
  years: any = [
    { value: '2016', name: '2016' },
    { value: '2017', name: '2017' },
    { value: '2018', name: '2018' }
  ];
  months: Array<String> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  currentYearSelected = moment().format('YYYY');

  constructor() {
  }

  ngOnInit() {
    this.form = new CalendarForm(this.currentYearSelected, MetricsIndicators.SLEEPING_QUALITY);
  }

  setYear(year) {

    this.form.year = year;
    //TODO get values for given year

  }
}
