import {Component, Input, ViewEncapsulation} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { LoginService } from './login.service';

const styles   = require('./login.css');
const template = require('./login.html');
declare var ENV: any;

@Component({
    selector: 'login',
    directives: [ ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES ],
    providers: [LoginService],
    template: template,
    styles: [ styles ]
})
export class Login {

    constructor(public router: Router, public loginService: LoginService) {
    }

    login(event, username, password) {
        event.preventDefault();
        let body = JSON.stringify({ username, password });

        this.loginService.login().subscribe(
            response => {
                console.log(response.text());
                localStorage.setItem('id_token', response.json().id_token);
                this.router.navigate(['/home']);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
    }


    
}