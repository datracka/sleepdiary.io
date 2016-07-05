import { Component, Input } from '@angular/core';
import {CalendarComponent} from '../calendar';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'monthly-view',
  directives:[<any>CalendarComponent, ROUTER_DIRECTIVES],
  template: `
    <b>Monthly View</b>
    <calendar></calendar>
    `

})
export class MonthlyViewComponent {
}
