import {Component, ViewEncapsulation} from '@angular/core';

const template = require('./app.html');

@Component({
    selector: 'sleep-diary',
    template: template,
    styleUrls: [
      '../../node_modules/material-design-lite/dist/material.green-teal.min.css',
      '../../node_modules/material-design-lite/material.min.css',
      '../../node_modules/material-design-icons/iconfont/material-icons.css',
      './app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}


