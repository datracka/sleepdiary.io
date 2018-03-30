import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import {
  ROUTE_LOGIN
} from '../../app.constants';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    console.log(tokenNotExpired());
    if (tokenNotExpired('id_token')) {
      return true;
    }

    this.router.navigate([ROUTE_LOGIN]);
    return false;
  }
}
