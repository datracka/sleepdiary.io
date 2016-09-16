import {Component} from '@angular/core';
import {Header} from "../../header/header";
import {Footer} from "../../footer/footer";
import {CalendarService} from "../../shared/calendar/calendar.service";
import {Calendar} from "../calendar/calendar.component";

const template = require('./yearly.html');
@Component({
    selector: 'yearly-view',
    template: template,
    providers: [
    ]

})
export class YearlyViewComponent {
}
