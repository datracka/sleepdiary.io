import {Component, style, state, animate, transition, trigger} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../services/login/login.service';
import {LoginModel} from "./LoginModel";

const template = require('./login.html');

// TODO: move constans to external file
const ERROR_USER_NOT_FOUND = "error_user_not_found";
const ERROR_FIELD_VALIDATION = 'error_field_validation';
const ERROR_NOT_ACTIVE = 'error_not_active';
const IS_REQUIRED = 'required';
const IS_NOT_EMAIL = 'email';
const LENGTH_MIN_6 = 'min_length_6'


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

  //FIX loginModel is not used!
  public loginModel: LoginModel;
  public loginForm: FormGroup;
  public userNotExists: boolean;
  public userIsNotActive: boolean

  constructor(public router: Router, public loginService: LoginService, private fb: FormBuilder) {
    this.loginModel = new LoginModel('', '');
    this.userNotExists = false;
    this.userIsNotActive = false;
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    })
  }

  login() {

    if (this.loginForm.valid) {

      let email: any = this.loginForm.get('email').value;
      let password: any = this.loginForm.get('password').value;
      let body: any = JSON.stringify({email, password});

      this.loginService.login(body).subscribe(
        response => {

          localStorage.setItem('id_token', response.json().token_key);
          localStorage.setItem('user', JSON.stringify(response.json()));
          this.router.navigate(['/home/monthly', {actionRef: 'login'}]);
        },
        error => {

          let e = JSON.parse(error.text());

          if (e.error === ERROR_FIELD_VALIDATION) {

            if (e.fields.email === IS_REQUIRED) {
              this.loginForm.get('email').setErrors({required: true});
              this.loginForm.get('email').markAsTouched();
            }

            if (e.fields.email === IS_NOT_EMAIL) {
              this.loginForm.get('email').setErrors({pattern: {}});
              this.loginForm.get('email').markAsTouched();
            }

            if (e.fields.password === IS_REQUIRED) {
              this.loginForm.get('password').setErrors({required: true});
              this.loginForm.get('password').markAsTouched();
            }

            if (e.fields.password === LENGTH_MIN_6) {
              this.loginForm.get('password').setErrors({minlength: {}});
              this.loginForm.get('password').markAsTouched();
            }
          }

          if (e.error === ERROR_USER_NOT_FOUND) {
            this.userNotExists = true;
            this.loginForm.get('email').markAsTouched();
            this.loginForm.get('password').markAsTouched();
          }

          if (e.error === ERROR_NOT_ACTIVE) {
            this.userIsNotActive = true;
            this.loginForm.get('email').markAsTouched();
            this.loginForm.get('password').markAsTouched();
          }
        }
      );
    }
  }
}

/*
 inspiration:

 https://angular.io/docs/ts/latest/cookbook/form-validation.html
 https://plnkr.co/edit/?p=preview
 https://angular.io/docs/ts/latest/guide/forms.html
 https://www.puzzle.ch/blog/articles/2017/01/18/server-side-validations-with-angular-2

 ## Building a form with formBuilder && setting server validation.

 http://www.carlrippon.com/?p=720

 */
