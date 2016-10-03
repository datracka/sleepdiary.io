import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {SignupService} from "../shared/signup/signup.service";

const styles   = require('./signup.css');
const template = require('./signup.html');

@Component({
    selector: 'signup',
    providers: [SignupService],
    template: template,
    styles: [ styles ]
})
export class SignUp {

    constructor(public router: Router, public signUpService: SignupService) {
    }

    signUp(event, username, email, password) {
        event.preventDefault();
        let body: any = JSON.stringify({username, email, password});

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