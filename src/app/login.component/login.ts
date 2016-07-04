import {Component, Input, ViewEncapsulation} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';

const styles   = require('./login.css');
const template = require('./login.html');

@Component({
    selector: 'login',
    directives: [ ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES ],
    template: template,
    styles: [ styles ]
})
export class Login {

    constructor(public router: Router, public http: Http) {
    }


    
}