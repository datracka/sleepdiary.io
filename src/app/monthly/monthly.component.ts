import { Component, Input } from '@angular/core';
import {CalendarComponent} from '../calendar';

@Component({
  selector: 'monthly-view',
  directives:[<any>CalendarComponent],
  template: `
    <b>Monthly View</b>
    <calendar></calendar>
    `

})
export class MonthlyViewComponent {
}
