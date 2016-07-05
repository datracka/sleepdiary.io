import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        
        //until we use jwt we deactivate the it. 
        //if (tokenNotExpired()) {
        //    return true;
        //}
        
        return true;

        this.router.navigate(['/login']);
        return false;
    }
}