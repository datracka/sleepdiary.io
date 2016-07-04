import { Component, Input, OnInit } from '@angular/core';
import {CalendarComponent} from './calendar.component';
import {Calendar} from "./calendar.component/calendar.service";

@Component({
  selector: 'yearly-view',
  directives:[<any>CalendarComponent],
  providers: [Calendar],
  template: `
    <b>Yearly view</b>
    <calendar></calendar>
    `
})
export class YearlyViewComponent implements OnInit {

  constructor(private calendar: Calendar) {

  }

  ngOnInit() {
    this.calendar.GetAll().subscribe(
        response => {
          console.log(response);
        }
    );
  }
}
