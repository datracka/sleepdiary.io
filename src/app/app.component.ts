///<reference path="../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS, Http} from '@angular/http';

@Component({
  selector: 'my-app',
  directives:[ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS],
  template: `
    <router-outlet></router-outlet>
    `,
  styles: [``]

})
export class AppComponent {
}


