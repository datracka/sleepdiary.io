import {Component, Input} from '@angular/core';
import {NgForm, FORM_DIRECTIVES}    from '@angular/forms';
import {Entry} from '../common/Entry';
import {CORE_DIRECTIVES} from "@angular/common";

let template = require('./new-entry.html');
let styles = require('./new-entry.css');

@Component({
    selector: 'form-view',
    template: '<b>Form View</b>',
    directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ]
})
export class NewEntry {

    entry:Entry;
    submitted: boolean;

    constructor() {
    }

    onSubmit() {
        this.submitted = true;
    }
}
