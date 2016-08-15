import {Component} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { LoginService } from '../shared/login/login.service';

const styles   = require('./login.css');
const template = require('./login.html');

// http://stackoverflow.com/questions/38907089/forms-deprecated-error-with-rc5
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
        let body:any = JSON.stringify({ username, password });

        this.loginService.login(body).subscribe(
            response => {
                localStorage.setItem('id_token', response.json().token_key);
                this.router.navigate(['/yearly']);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
    }
    
}