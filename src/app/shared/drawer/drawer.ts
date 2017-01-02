import { Component } from '@angular/core';
import {MdlLayoutComponent} from "angular2-mdl";
import {Router} from "@angular/router";

const template = require('./drawer.html');
@Component({
    selector: 'drawer-comp',
    template: template,
    providers: [
        MdlLayoutComponent
    ]

})
export class Drawer {

    constructor(public router: Router) {

    }

    logOut() {
        //remove items
        localStorage.removeItem('user');
        localStorage.removeItem('id_token');
        this.router.navigate(['/login']);
    }
}