///<reference path="../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS, Http} from '@angular/http';

const template = require('./app.html');

@Component({
  selector: 'my-app',
  template: template,
  directives:[ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS],

})
export class AppComponent {
  constructor(public router: Router) {}
}


