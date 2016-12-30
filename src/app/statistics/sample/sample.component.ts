import {Component} from "@angular/core";
import {CalendarService} from "../../services/calendar/calendar.service";


const template = require('./sample.html');

@Component({
    selector: 'sample-view',
    template: template
})
export class SampleComponent {

    constructor() {
    }
}