import {Component} from "@angular/core";
import {Calendar} from "../calendar";
import {CalendarService} from "../../shared/calendar/calendar.service";


const template = require('./monthly.html');

@Component({
    selector: 'monthly-view',
    providers: [Calendar, CalendarService],
    template: template
})
export class MonthlyViewComponent {

    constructor() {
    }
}
