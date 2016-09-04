import {Component} from '@angular/core';
import {Header} from "../../header/header";
import {Footer} from "../../footer/footer";
import {CalendarService} from "../../shared/calendar/calendar.service";
import {Calendar} from "../calendar/calendar.component";

const template = require('./monthly.html');
@Component({
    selector: 'monthly-view',
    template: template,
    providers: [
        Header,
        Footer,
        Calendar,
        CalendarService
    ]

})
export class MonthlyViewComponent {
}
