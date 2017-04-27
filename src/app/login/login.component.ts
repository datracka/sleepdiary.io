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

    login(event, form, email, password) {
        event.preventDefault();
        let emailValue = email.value;
        let passwordValue = password.vallue;
        let body: any = JSON.stringify({emailValue, passwordValue});
        this.loginService.login(body).subscribe(
            response => {
                localStorage.setItem('id_token', response.json().token_key);
                localStorage.setItem('user', JSON.stringify(response.json()));
                this.router.navigate(['/home/monthly', {actionRef: 'login'}]);
            },
            error => {
                console.log(form, email, password, error);
            }
        );
    }

}

/*

## Validation Rules:

E-mail: required & e-mail
password: required & more than 6

## Server Side validation:

{
  fields: {
    e-mail: KEY //[ REQUIRED | E-MAIL_NOT_VALID ]
    password: KEY // [ REQUIRED | MIN_LENGTH_6 ]
  },
   error: [FIELDS_UNCOMPLETED | USER_INACTIVE | WRONG_DATA]
}

ERROR: 402

Other errors:



 inspiration:

 https://angular.io/docs/ts/latest/cookbook/form-validation.html
 https://plnkr.co/edit/?p=preview
 https://angular.io/docs/ts/latest/guide/forms.html
 https://www.puzzle.ch/blog/articles/2017/01/18/server-side-validations-with-angular-2

*/
