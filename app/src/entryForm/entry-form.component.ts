import {Component, OnInit, Input} from '@angular/core';
import {FORM_DIRECTIVES}    from '@angular/forms';
import {Entry} from '../shared/common/Entry';
import {CORE_DIRECTIVES} from "@angular/common";
import {Router, ActivatedRoute}       from '@angular/router';
import {EntryFormService} from "../shared/entry-form/entry-form.service";

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
        //this.entry = new Entry('', '', 'good', 'good');

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let uuid:string = params['uuid'];
            if (params['uuid'] === 'new') {
               // this.entry = new Entry('', '', 'bad', 'bad');
            } else {
                this.entryFormService.getEntry(uuid).subscribe(
                    response => {
                        this.entry = response.json()[0];
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

    deleteEntry(uuid:string) {
        if (this.entry.uuid != '') {
            this.entryFormService.deleteEntry(uuid).subscribe(
                response => {
                    console.log(response.json());
                }
            );
        }
    }
}
