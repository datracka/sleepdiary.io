import {Component, style, state, animate, transition, trigger} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../services/login/login.service';
import {LoginModel} from "./LoginModel";

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

    public loginModel: LoginModel;
    public submitted = false;
    public test = "test1";

    constructor(public router: Router, public loginService: LoginService) {
      this.loginModel = new LoginModel('','');
    }

    get diagnostic() { return JSON.stringify(this.loginModel); }

    login(event, values, valid) {
        event.preventDefault();
        console.log("values", values);
        /*let body: any = JSON.stringify({email, password});
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
        );*/
    }

}
