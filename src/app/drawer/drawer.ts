import { Component } from '@angular/core';
import {MdlLayoutComponent} from "angular2-mdl";

const template = require('./drawer.html');
@Component({
    selector: 'drawer-comp',
    template: template,
    providers: [
        MdlLayoutComponent
    ]

})
export class Drawer {
}
