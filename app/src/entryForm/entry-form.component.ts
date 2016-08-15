import {Component, OnInit} from '@angular/core';
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
    directives: [CORE_DIRECTIVES]
})
export class EntryForm implements OnInit{

    public entry: Entry;
    sub:any;

    //default values
    public sleepingQualityValues = [
        { value: 'good', display: 'Good' },
        { value: 'regular', display: 'Regular' },
        { value: 'bad', display: 'Bad' }
    ];

    //default values
    public tirednessFeelingValues = [
        { value: 'good', display: 'Good' },
        { value: 'regular', display: 'Regular' },
        { value: 'bad', display: 'Bad' }
    ];

    // https://github.com/angular/angular/pull/9681
    // https://scotch.io/tutorials/how-to-deal-with-different-form-controls-in-angular-2
    // http://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/
    constructor(public route:ActivatedRoute,
                public router:Router,
                public entryFormService:EntryFormService) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let uuid:string = params['uuid'];
            if (params['uuid'] === 'new') {
                //default form initialization
                this.entry =  {
                    uuid: '',
                    date: '',
                    sleepingQuality: this.sleepingQualityValues[0].value,
                    tirednessFeeling: this.tirednessFeelingValues[0].value
                }

            } else {
                this.entryFormService.getEntry(uuid).subscribe(
                    response => {
                      //assign to form from remote!!!
                        console.log( response.json()[0]);
                    });
            }
        });
    }

/*    onSubmit() {
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
    }*/
}
