import { Component, Input } from '@angular/core';
import {CalendarComponent} from './calendar.component';

@Component({
  selector: 'yearly-view',
  directives:[<any>CalendarComponent],
  template: `
    <b>Yearly view</b>
    <calendar></calendar>
    `
})
export class YearlyViewComponent {
}
