import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';


console.log(ROUTER_DIRECTIVES);
@Component({
  selector: 'my-app',
  directives:[ROUTER_DIRECTIVES],
  template: `
    <h1>Sleep Diary</h1>
    <ul>
      <li><a [routerLink]="['/monthly']">Monthly View</a></li>
      <li><a [routerLink]="['/yearly']">Yearly View</a></li>
    </ul>
    <router-outlet></router-outlet>
    `,
  styles: [``]

})
export class AppComponent {
}

