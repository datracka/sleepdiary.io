import {Component} from '@angular/core';
import { CalendarComponent } from './calendar.component';


@Component({
  selector: 'my-app',
  directives: [<any> CalendarComponent],
  template: `
    <h1>My First Angular 2 App</h1>
    <calendar></calendar>
    `,
  styles: [``]

})
export class AppComponent { }

