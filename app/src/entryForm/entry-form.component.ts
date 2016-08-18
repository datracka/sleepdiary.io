import {Component, OnInit} from "@angular/core";
import {Entry} from "../shared/common/Entry";
import {Router, ActivatedRoute} from "@angular/router";
import {EntryFormService} from "../shared/entry-form/entry-form.service";

let template = require('./entry-form.html');
let styles = require('./entry-form.css');

@Component({
    selector: 'form-view',
    template: template,
    styles: [styles],
    providers: [EntryFormService]
})
export class EntryForm implements OnInit{

    public entry: Entry;
    public submitted = false;
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
                this.entry = new Entry(
                    Number(JSON.parse(localStorage.getItem('user')).userId),
                    '',
                    new Date().toISOString(),
                    this.sleepingQualityValues[0].value,
                    this.tirednessFeelingValues[0].value
                );

            } else {
                this.entryFormService.getEntry(uuid).subscribe(
                    response => {
                      //assign to form from remote!!!
                        console.log( response.json()[0]);
                    });
            }
        });
    }

    onSubmit() {
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
