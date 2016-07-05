import { Component, Input, OnInit } from '@angular/core';
import {CalendarComponent} from '../calendar';

@Component({
  selector: 'yearly-view',
  directives:[<any>CalendarComponent],
  providers: [CalendarComponent],
  template: `
    <b>Yearly view</b>
    <calendar></calendar>
    `
})
export class YearlyViewComponent {

}
