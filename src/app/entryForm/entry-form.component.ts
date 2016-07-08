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

    entry:Entry;
    submitted:boolean;
    sub:any;

    constructor(public route:ActivatedRoute,
                public router:Router,
                public entryFormService:EntryFormService) {
        this.entry = new Entry('', '', 'good', 'good');

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let uuid:string = params['uuid'];
            if (params['uuid'] === 'new') {
                console.log("new");
                this.entry = new Entry('', '', 'good', 'good');
            } else {
                this.entryFormService.getEntry(uuid).subscribe(
                    response => {
                        this.entry = response.json()[0];
                        console.log(this.entry.sleepingQuality);
                    });
            }
        });
    }

    onSubmit() {
        console.log("on Submit", this.entry.uuid);
        if (this.entry.uuid != '') {
            this.entryFormService.updateEntry(this.entry).subscribe(
                response => {
                    console.log(response.json());
                }
            );
        } else {
            this.entryFormService.newEntry(this.entry).subscribe(
                response => {
                    console.log(response.json());
                }
            );
        }
        this.submitted = true;
    }
}
