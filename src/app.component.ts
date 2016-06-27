///<reference path="../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

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
export class AppComponent implements AfterViewInit, OnInit {

  ngAfterViewInit():any {
    this.router.navigate(['/']);
  }

  ngOnInit():any {
    return undefined;
  }

  publicRoutes: any;
  constructor(public router: Router) {
    this.publicRoutes = {
      '/login': true
    };
  }
}


