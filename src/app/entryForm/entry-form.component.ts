import {Component, OnInit} from '@angular/core';
import {NgForm, FORM_DIRECTIVES}    from '@angular/forms';
import {Entry} from '../common/Entry';
import {CORE_DIRECTIVES} from "@angular/common";
import { Router, ActivatedRoute } from '@angular/router';

let template = require('./entry-form.html');
let styles = require('./entry-form.css');

@Component({
    selector: 'form-view',
    template: template,
    styles: [styles],
    directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ]
})
export class EntryForm {

    entry:Entry;
    submitted: boolean;

    constructor() {

    }

    onSubmit() {
        this.submitted = true;
    }
}
