import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {

        return true;
        //until we use jwt we deactivate it.
        //if (tokenNotExpired()) {
        //    return true;
        //}

        //this.router.navigate(['/login']);
        //return false;
    }
}