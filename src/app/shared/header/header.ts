import { Component } from '@angular/core';
import {MdlLayoutComponent} from "angular2-mdl";

const template = require('./header.html');
@Component({
    selector: 'header-comp',
    template: template,
    providers: [
        MdlLayoutComponent
    ]

})
export class Header {
}
