import {Component, Input, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

const styles   = require('./signup.css');
const template = require('./signup.html');

@Component({
    selector: 'signup',
    template: template,
    styles: [ styles ]
})
export class SignUp {
    constructor(public router: Router, public http: Http) {
    }
}