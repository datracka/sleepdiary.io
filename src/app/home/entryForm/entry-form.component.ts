import {Component, AfterViewInit, OnInit, style, state, animate, transition, trigger} from "@angular/core";
import {Entry} from "../../services/common/entry";
import {ActivatedRoute, Router} from "@angular/router";
import {EntryFormService} from "../../services/entry-form/entry-form.service";

let template = require('./entry-form.html');
@Component({
    selector: 'form-view',
    template: template,
    styleUrls: ['./entry-form.scss'],
    providers: [EntryFormService],
    animations: [
        trigger('flyInOut', [
            state('in', style({opacity: 1})),
            transition('void => *', [
                style({opacity: 0}),
                animate(300)
            ])
        ])
    ]
})
export class EntryForm implements OnInit, AfterViewInit {

    public entry: Entry;
    public submitted = false;
    public sub: any;
    public date: any;
    public params: any = {
        day: null,
        uuid: null
    }

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
        //initialize by default entry (uuid, date of today, 'good', 'good')
        this.entry = new Entry(
            '',
            new Date().toISOString(),
            this.sleepingQualityValues[0].value,
            this.tirednessFeelingValues[0].value
        );
    }

    ngOnInit() {
        //get params from URL
        this.sub = this.route
            .params
            .subscribe(params => {
                    this.params.uuid = params['uuid'];
                    if (typeof params['day'] !== 'undefined') {
                        this.params.day = params['day'];
                    }
                }
            )
    }

    ngAfterViewInit() {
        if (this.params.uuid !== 'new') {
            //update existing entry
            let uuid: string = this.params.uuid;
            this.sub = this.entryFormService.getEntry(uuid).subscribe(
                response => {
                    this.entry = new Entry(
                        response.json()[0].uuid,
                        response.json()[0].date,
                        response.json()[0].sleepingQuality,
                        response.json()[0].tirednessFeeling
                    );
                });
        } else {
            this.entry.date = new Date(this.params.day).toISOString();
        }

    }

    onSubmit() {
        if (this.entry.uuid != '') {
            this.entryFormService.updateEntry(this.entry).subscribe(
                response => {
                    this.router.navigate(['/home/monthly', {actionRef: 'update', day: this.params.day}]);
                }
            );
        } else {
            this.entryFormService.newEntry(this.entry).subscribe(
                response => {
                    // do something!!
                    this.router.navigate(['/home/monthly', {actionRef: 'insert', day: this.params.day}]);
                }
            );
        }
        this.submitted = true;
    }

    back() {
        this.router.navigate(['/home/monthly', {day: this.params.day}]);
    }

    deleteEntry(uuid: string) {
        if (this.entry.uuid != '') {
            this.entryFormService.deleteEntry(uuid).subscribe(
                response => {
                    this.router.navigate(['/home/monthly', {actionRef: 'delete', day: this.params.day}]);
                }
            );
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
