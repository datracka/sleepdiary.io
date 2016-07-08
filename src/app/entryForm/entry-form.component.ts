import {Component, OnInit, Input} from '@angular/core';
import {FORM_DIRECTIVES}    from '@angular/forms';
import {Entry} from '../common/Entry';
import {CORE_DIRECTIVES} from "@angular/common";
import {Router, ActivatedRoute}       from '@angular/router';
import {EntryFormService} from "./entry-form.service";

let template = require('./entry-form.html');
let styles = require('./entry-form.css');

@Component({
    selector: 'form-view',
    template: template,
    styles: [styles],
    providers: [EntryFormService],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class EntryForm implements OnInit {

    entry: Entry;
    submitted:boolean;
    sub: any;

    constructor(public route:ActivatedRoute,
                public router:Router,
                public entryFormService:EntryFormService) {
        this.entry = new Entry();

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let uuid:string = params['uuid'];
            this.entryFormService.getEntry(uuid).subscribe(
                response => {
                    this.entry = response.json()[0];
                    console.log(this.entry.sleepingQuality);
                });
        });
    }

    onSubmit() {
        this.submitted = true;
    }
}
