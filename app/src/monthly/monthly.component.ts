import { Component, Input } from '@angular/core';
import {Calendar} from '../calendar';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'monthly-view',
  directives:[<any>Calendar, ROUTER_DIRECTIVES],
  template: `
    <b>Monthly View</b>
    <calendar></calendar>
    `

})
export class MonthlyViewComponent {
}
