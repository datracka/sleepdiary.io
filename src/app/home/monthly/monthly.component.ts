import {Component} from "@angular/core";
import {CalendarService} from "../../shared/calendar/calendar.service";


const template = require('./monthly.html');

@Component({
    selector: 'monthly-view',
    providers: [
        CalendarService
    ],
    template: template
})
export class MonthlyViewComponent {

    constructor() {
    }
}
