import {Component, AfterViewInit} from "@angular/core";
import {Entry} from "../shared/common/Entry";
import {ActivatedRoute} from "@angular/router";
import {EntryFormService} from "../shared/entry-form/entry-form.service";

let template = require('./entry-form.html');
let styles = require('./entry-form.css');

@Component({
    selector: 'form-view',
    template: template,
    styles: [styles],
    providers: [EntryFormService]
})
export class EntryForm implements AfterViewInit{

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
                public entryFormService:EntryFormService) {

        this.entry = new Entry(
            '',
            new Date().toISOString(),
            this.sleepingQualityValues[0].value,
            this.tirednessFeelingValues[0].value
        );

    }

    ngAfterViewInit() {
        this.sub = this.route.params.subscribe(params => {
            let uuid:string = params['uuid'];
            if (params['uuid'] !== 'new') {
                this.entryFormService.getEntry(uuid).subscribe(
                    response => {
                        console.log(response.json()[0]);
                        this.entry = new Entry(
                            response.json()[0].uuid,
                            response.json()[0].date,
                            response.json()[0].sleepingQuality,
                            response.json()[0].tirednessFeeling
                        );
                    });
            }
        });
    }

    onSubmit() {
        if (this.entry.uuid != '') {
            this.entryFormService.updateEntry(this.entry).subscribe(
                response => {
                    // do something!!
                    console.log(response.json());
                }
            );
        } else {
            this.entryFormService.newEntry(this.entry).subscribe(
                response => {
                    // do something!!
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
