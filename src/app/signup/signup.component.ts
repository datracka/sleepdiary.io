import {Component, style, state, animate, transition, trigger} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

import {SignupService} from "../services/signup/signup.service";
import {SignUpModel} from "./signupModel";
import {
  ROUTE_CALENDAR_MONTHLY_PAGE
} from '../app.constants';

const styles   = require('./signup.css');
const template = require('./signup.html');

// TODO: move constans to external file
const ERROR_FIELD_VALIDATION = 'error_field_validation';
const IS_REQUIRED = 'required';
const IS_NOT_EMAIL = 'email';
const LENGTH_MIN_6 = 'min_length_6';
const ERROR_USER_ALREADY_EXISTS = 'error_user_already_exists';
const ERROR_MISCELLANEOUS = 'error_miscellaneous';

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
    public signUpForm: FormGroup;
    public userNotExists: boolean;
    public miscellaneousError: boolean

    constructor(public router: Router, public signUpService: SignupService, private fb: FormBuilder) {
      this.signUpModel = new SignUpModel('','','',);
      this.userNotExists = false;
      this.miscellaneousError = false;
      this.createForm();
    }

    createForm() {
      this.signUpForm = this.fb.group({
        name: '',
        email: '',
        password: ''
      })
    }

    signUp() {

      if (this.signUpForm.valid) {

        let name: any = this.signUpForm.get('name').value;
        let email: any = this.signUpForm.get('email').value;
        let password: any = this.signUpForm.get('password').value;
        let body: any = JSON.stringify({name, email, password});

        this.signUpService.signup(body).subscribe(
          response => {
            localStorage.setItem('id_token', response.json().token_key);
            localStorage.setItem('user', JSON.stringify(response.json()));
            this.router.navigate([ROUTE_CALENDAR_MONTHLY_PAGE]);
          },
          error => {
            let e = JSON.parse(error.text());

            if (e.error === ERROR_FIELD_VALIDATION) {

              if (e.fields.name === IS_REQUIRED) {
                this.signUpForm.get('name').setErrors({required: true});
                this.signUpForm.get('name').markAsTouched();
              }

              if (e.fields.email === IS_REQUIRED) {
                this.signUpForm.get('email').setErrors({required: true});
                this.signUpForm.get('email').markAsTouched();
              }

              if (e.fields.email === IS_NOT_EMAIL) {
                this.signUpForm.get('email').setErrors({pattern: {}});
                this.signUpForm.get('email').markAsTouched();
              }

              if (e.fields.password === IS_REQUIRED) {
                this.signUpForm.get('password').setErrors({required: true});
                this.signUpForm.get('password').markAsTouched();
              }

              if (e.fields.password === LENGTH_MIN_6) {
                this.signUpForm.get('password').setErrors({minlength: {}});
                this.signUpForm.get('password').markAsTouched();
              }

            }

            if (e.error === ERROR_USER_ALREADY_EXISTS) {
              this.userNotExists = true;
              this.signUpForm.get('name').markAsTouched();
              this.signUpForm.get('email').markAsTouched();
              this.signUpForm.get('password').markAsTouched();
            }

            if (e.error === ERROR_MISCELLANEOUS) {
              this.miscellaneousError = true;
              this.signUpForm.get('name').markAsTouched();
              this.signUpForm.get('email').markAsTouched();
              this.signUpForm.get('password').markAsTouched();
            }

          }
        )
      }
    }
}
