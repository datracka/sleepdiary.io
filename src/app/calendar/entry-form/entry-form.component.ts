import { Component, AfterViewInit, OnInit, style, state, animate, transition, trigger } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Entry } from '../../services/common/entry';
import { EntryFormService } from '../../services/entry-form/entry-form.service';
import { ROUTE_CALENDAR_MONTHLY_PAGE } from '../../calendar/calendar.constants';
import { Store } from '@ngrx/store';
import { State } from '../../app.reducer';
import { getCalendarDays } from '../calendar.reducer';
import {
  CALENDAR_ACTIONS
} from '../calendar.constants';

let template = require('./entry-form.html');
@Component({
  selector: 'form-view',
  template: template,
  styleUrls: ['./entry-form.scss'],
  providers: [EntryFormService],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
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

  // default values
  public sleepingQualityValues = [
    { value: 'good', display: 'Good' },
    { value: 'regular', display: 'Regular' },
    { value: 'bad', display: 'Bad' }
  ];

  // default values
  public tirednessFeelingValues = [
    { value: 'good', display: 'Good' },
    { value: 'regular', display: 'Regular' },
    { value: 'bad', display: 'Bad' }
  ];

  // https://scotch.io/tutorials/how-to-deal-with-different-form-controls-in-angular-2
  // http://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/
  constructor(private router: Router,
    public route: ActivatedRoute,
    private store: Store<State>,
    public entryFormService: EntryFormService) {
    // initialize by default entry (uuid, date of today, 'good', 'good')
    this.entry = new Entry(
      '',
      new Date().toISOString(),
      this.sleepingQualityValues[0].value,
      this.tirednessFeelingValues[0].value
    );
  }

  ngOnInit() {
    // get params from URL
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
      // update existing entry
      let uuid: string = this.params.uuid;
      this.store.select(getCalendarDays)
        .subscribe(entries => {
          const arrEntries = Object.keys(entries).map((k) => entries[k]);
          const entry: Array<Entry> = arrEntries.filter(
            e => {
              return e.uuid === uuid;
            });
          this.entry = entry[0];
        });
    } else {
      this.entry.date = new Date(this.params.day).toISOString();
    }

  }

  onSubmit() {
    if (this.entry.uuid !== '') {
      this.store.dispatch({
        type: CALENDAR_ACTIONS.POST_ENTRY,
        payload: this.entry
      });
      /*  this.entryFormService.updateEntry(this.entry).subscribe(
         response => {
           this.router.navigate([ROUTE_CALENDAR_MONTHLY_PAGE, { actionRef: 'update', day: this.params.day }]);
         }
       ); */
    } else {
      this.store.dispatch({
        type: CALENDAR_ACTIONS.PUT_ENTRY,
        payload: this.entry
      });
      /* this.entryFormService.newEntry(this.entry).subscribe(
        response => {
          // do something!!
          this.router.navigate([ROUTE_CALENDAR_MONTHLY_PAGE, { actionRef: 'insert', day: this.params.day }]);
        }
      ); */
    }
    this.submitted = true;
  }

  back() {
    this.router.navigate([ROUTE_CALENDAR_MONTHLY_PAGE, { day: this.params.day }]);
  }

  deleteEntry(uuid: string) {
    if (this.entry.uuid !== '') {
      this.store.dispatch({
        type: CALENDAR_ACTIONS.DELETE_ENTRY,
        payload: uuid
      });
      /* this.entryFormService.deleteEntry(uuid).subscribe(
        response => {
          this.router.navigate([ROUTE_CALENDAR_MONTHLY_PAGE, { actionRef: 'delete', day: this.params.day }]);
        }
      ); */
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
