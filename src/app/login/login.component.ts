import {Component, style, state, animate, transition, trigger} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../services/login/login.service';

const template = require('./login.html');

@Component({
    selector: 'login',
    providers: [LoginService],
    template: template,
    styleUrls: ['./login.scss'],
    animations: [
        trigger('flyInOut', [
            state('in', style({opacity: 1})),
            transition('void => *', [
                style({opacity: 0}),
                animate(300)
            ])
        ])
    ]

})
export class Login {

    constructor(public router: Router, public loginService: LoginService) {
    }

    login(event, email, password) {
        event.preventDefault();
        let body: any = JSON.stringify({email, password});
        this.loginService.login(body).subscribe(
            response => {
                localStorage.setItem('id_token', response.json().token_key);
                localStorage.setItem('user', JSON.stringify(response.json()));
                this.router.navigate(['/home/monthly', {actionRef: 'login'}]);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
    }

}