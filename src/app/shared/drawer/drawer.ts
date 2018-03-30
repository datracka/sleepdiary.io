import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ROUTE_LOGIN
} from '../../app.constants';

const template = require('./drawer.html');
@Component({
  selector: 'drawer-comp',
  template: template
})
export class Drawer {

  constructor(public router: Router) { }

  navigateToCalendar(event) {
    this.router.navigate(['calendar/monthly', { actionRef: 'login' }]);
  }

  logOut() {
    // remove items
    localStorage.removeItem('user');
    localStorage.removeItem('id_token');
    this.router.navigate([ROUTE_LOGIN]);
  }
}
