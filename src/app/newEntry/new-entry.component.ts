import {Component, OnInit} from '@angular/core';
import {NgForm, FORM_DIRECTIVES}    from '@angular/forms';
import {Entry} from '../common/Entry';
import {CORE_DIRECTIVES} from "@angular/common";
import { Router, ActivatedRoute } from '@angular/router';

let template = require('./new-entry.html');
let styles = require('./new-entry.css');

@Component({
    selector: 'form-view',
    template: template,
    styles: [styles],
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
