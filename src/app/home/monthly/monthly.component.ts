import {Component} from "@angular/core";
import {Calendar} from "../calendar";
import {CalendarService} from "../../shared/calendar/calendar.service";
import {Header} from "../../header/header";
import {Footer} from "../../footer/footer";


const template = require('./monthly.html');

@Component({
    selector: 'monthly-view',
    providers: [
        Header,
        Footer,
        Calendar,
        CalendarService
    ],
    template: template
})
export class MonthlyViewComponent {

    constructor() {
    }
}
