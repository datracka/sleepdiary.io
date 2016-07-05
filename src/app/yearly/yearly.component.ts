import { Component, Input, OnInit } from '@angular/core';
import {CalendarComponent} from '../calendar';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'yearly-view',
  directives:[<any>CalendarComponent, ROUTER_DIRECTIVES],
  providers: [CalendarComponent],
  template: `
 <h1>Sleep Diary</h1>
     <ul>
      <li><a [routerLink]="['/monthly']">Monthly View</a></li>
      <li><a [routerLink]="['/yearly']">Yearly View</a></li>
    </ul>
    <b>Yearly view</b>
    <calendar></calendar>
    `
})
export class YearlyViewComponent {

}
