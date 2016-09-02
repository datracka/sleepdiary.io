///<reference path="../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, ViewEncapsulation} from '@angular/core';

const styles = require('./app.component.css');
const template = require('./app.html');

@Component({
    selector: 'sleep-diary',
    template: template,
    styles: [styles]
})
export class AppComponent {
}


