///<reference path="../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

const template = require('./app.html');

@Component({
    selector: 'my-app',
    template: template,
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
    constructor(public router:Router) {
    }
}


