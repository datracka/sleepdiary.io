import {Component, style, state, animate, transition, trigger} from "@angular/core";
import {Router} from "@angular/router";
import {SignupService} from "../services/signup/signup.service";
import {SignUpModel} from "./signupModel";

const styles   = require('./signup.css');
const template = require('./signup.html');

@Component({
    selector: 'signup',
    providers: [SignupService],
    template: template,
    styles: [ styles ],
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
export class SignUp {

    public signUpModel: SignUpModel;

    constructor(public router: Router, public signUpService: SignupService) {
      this.signUpModel = new SignUpModel('','','',);
    }

    signUp(event, name, email, password) {
        event.preventDefault();
        let body: any = JSON.stringify({name, email, password});
        console.log(body);
        this.signUpService.signup(body).subscribe(
            response => {
                localStorage.setItem('id_token', response.json().token_key);
                localStorage.setItem('user', JSON.stringify(response.json()));
                this.router.navigate(['/home/monthly']);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
    }
}
