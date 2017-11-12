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
import {CalendarService} from '../../services/calendar/calendar.service'

let template = require('./calendar.html');
@Component({
  selector: 'calendar',
  template: template,
  styleUrls: ['./calendar.scss'],
  providers: [CalendarService]
})
export class Calendar {
  constructor() {
  }

  test ='Hello World';
}
