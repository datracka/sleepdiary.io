import {Component} from "@angular/core";
import {CalendarService} from "../../services/calendar/calendar.service";


const template = require('./monthly.html');

@Component({
    selector: 'monthly-page',
    providers: [
        CalendarService
    ],
    template: template
})
export class MonthlyPageComponent {

    constructor() {
    }
}
