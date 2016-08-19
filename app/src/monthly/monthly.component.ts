import { Component, Input } from '@angular/core';
import {Calendar} from '../calendar';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'monthly-view',
  template: `
    <b>Monthly View</b>
    <calendar></calendar>
    `

})
export class MonthlyViewComponent {
}
