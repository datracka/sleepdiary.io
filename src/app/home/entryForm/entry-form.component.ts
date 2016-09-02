import {Component, AfterViewInit, OnInit} from "@angular/core";
import {Entry} from "../../shared/common/Entry";
import {ActivatedRoute, Router} from "@angular/router";
import {EntryFormService} from "../../shared/entry-form/entry-form.service";

let template = require('./entry-form.html');
let styles = require('./entry-form.css');

@Component({
    selector: 'form-view',
    template: template,
    styles: [styles],
    providers: [EntryFormService]
})
export class EntryForm implements OnInit, AfterViewInit {

    public entry: Entry;
    public submitted = false;
    sub: any;

    //default values
    public sleepingQualityValues = [
        {value: 'good', display: 'Good'},
        {value: 'regular', display: 'Regular'},
        {value: 'bad', display: 'Bad'}
    ];

    //default values
    public tirednessFeelingValues = [
        {value: 'good', display: 'Good'},
        {value: 'regular', display: 'Regular'},
        {value: 'bad', display: 'Bad'}
    ];

    // https://scotch.io/tutorials/how-to-deal-with-different-form-controls-in-angular-2
    // http://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/
    constructor(private router: Router, public route: ActivatedRoute,
                public entryFormService: EntryFormService) {

    }

    ngOnInit() {
        //initialize by default entry (uuid, date of today, 'good', 'good')
        this.entry = new Entry(
            '',
            new Date().toISOString(),
            this.sleepingQualityValues[0].value,
            this.tirednessFeelingValues[0].value
        );
    }

    ngAfterViewInit() {
        this.sub = this.route.params.subscribe(params => {
            let uuid: string = params['uuid'];
            if (params['uuid'] !== 'new') {
                this.sub = this.entryFormService.getEntry(uuid).subscribe(
                    response => {
                        console.log(response.json()[0]);
                        this.entry = new Entry(
                            response.json()[0].uuid,
                            response.json()[0].date,
                            response.json()[0].sleepingQuality,
                            response.json()[0].tirednessFeeling
                        );
                    });
            } else {
                this.sub = this.route
                    .params
                    .subscribe(params => {
                            if(typeof params['day'] !== 'undefined') {
                                this.entry.date = new Date(params['day']).toISOString();
                            }
                        }
                    )
            }

        });
    }

    onSubmit() {
        if (this.entry.uuid != '') {
            this.entryFormService.updateEntry(this.entry).subscribe(
                response => {
                    console.log(response.json());
                    this.router.navigate(['/yearly']);
                }
            );
        } else {
            this.entryFormService.newEntry(this.entry).subscribe(
                response => {
                    // do something!!
                    console.log(response.json());
                    this.router.navigate(['/yearly']);
                }
            );
        }
        this.submitted = true;
    }

    deleteEntry(uuid: string) {
        if (this.entry.uuid != '') {
            this.entryFormService.deleteEntry(uuid).subscribe(
                response => {
                    console.log(response.json());
                    this.router.navigate(['/yearly']);
                }
            );
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
