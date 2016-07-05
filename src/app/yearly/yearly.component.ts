import { Component, Input, OnInit } from '@angular/core';
import {CalendarComponent} from '../calendar';

@Component({
  selector: 'yearly-view',
  directives:[<any>CalendarComponent],
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
