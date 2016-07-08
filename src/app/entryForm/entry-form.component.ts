import {Component, OnInit, Input} from '@angular/core';
import {NgForm, FORM_DIRECTIVES}    from '@angular/forms';
import {Entry} from '../common/Entry';
import {CORE_DIRECTIVES} from "@angular/common";
import { Router, ActivatedRoute } from '@angular/router';
import {EntryFormService} from "./entry-form.service";

let template = require('./entry-form.html');
let styles = require('./entry-form.css');

@Component({
    selector: 'form-view',
    template: template,
    styles: [styles],
    providers: [EntryFormService],
    directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ]
})
export class EntryForm implements OnInit {

    /*@Input entry:Entry;*/
    submitted: boolean;

    constructor(public entryFormService: EntryFormService) {

    }

    ngOnInit(){
/*        this.entryFormService.getEntry().subscribe(
            response => {
                this.entry = response.json();
            }
        );*/
    }

    onSubmit() {
        this.submitted = true;
    }
}
