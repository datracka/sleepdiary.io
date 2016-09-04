import {Component} from "@angular/core";
import {Calendar} from "../calendar";
import {CalendarService} from "../../shared/calendar/calendar.service";


const template = require('./yearly.html');

@Component({
    selector: 'yearly-view',
    providers: [Calendar, CalendarService],
    template: template
})
export class YearlyViewComponent {

    constructor() {
    }
}
