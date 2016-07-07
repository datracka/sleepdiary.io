import {Component, Input, OnInit} from '@angular/core';
import {Calendar} from '../calendar';
import {NewEntry} from '../newEntry';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'yearly-view',
    directives: [<any>Calendar, ROUTER_DIRECTIVES],
    providers: [Calendar, NewEntry],
    template: `
    <h1>Sleep Diary</h1>
     <ul>
      <li><a [routerLink]="['/newEntry']">Click here to new Entry</a></li>
      <li><a [routerLink]="['/monthly']">Monthly View</a></li>
      <li><a [routerLink]="['/yearly']">Yearly View</a></li>
    </ul>
    <b>Yearly view</b>
    <calendar></calendar>
    `
})
export class YearlyViewComponent {

    constructor() {
        console.log('yearly component');
    }
}
