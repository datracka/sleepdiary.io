import {Component, Input, OnInit} from '@angular/core';
import {Calendar} from '../calendar';
import {EntryForm} from '../entryForm';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'yearly-view',
    directives: [<any>Calendar, ROUTER_DIRECTIVES],
    providers: [Calendar, EntryForm],
    template: `
    <h1>Sleep Diary</h1>
     <ul>
      <!-- TODO: Rethink navigation
        <li><a [routerLink]="['/entry/new']">Click here to new Entry</a></li>--> 
      <li><a [routerLink]="['/monthly']">Monthly View</a></li>
      <li><a [routerLink]="['/yearly']">Yearly View</a></li>
      <li><a [routerLink]="['/entry']">New Entry</a></li>
    </ul>
    <b>Yearly view</b>
    <div>
        Only display sleepingQuality
        //TODO: switch to tirednessFeeling
    </div>
    <calendar></calendar>
    `
})
export class YearlyViewComponent {

    constructor() {
    }
}
