import {Component, Input, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

import {Calendar} from '../calendar';
import {EntryForm} from '../entryForm';
import {CalendarService} from "../shared/calendar/calendar.service";
import {EntryFormService} from "../shared/entry-form/entry-form.service";


const template = require('./yearly.html');

@Component({
    selector: 'yearly-view',
    directives: [<any>Calendar, ROUTER_DIRECTIVES],
    providers: [Calendar, EntryForm, CalendarService, EntryFormService],
    template: template
})
export class YearlyViewComponent {

    constructor() {
    }
}
