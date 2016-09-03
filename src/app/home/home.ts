import {Component, Input} from '@angular/core';

const template = require('./home.html');

@Component({
    template: `
        <header-comp></header-comp>
        <router-outlet></router-outlet>
        <footer-comp></footer-comp>
    `
})
export class HomeComponent {
}


