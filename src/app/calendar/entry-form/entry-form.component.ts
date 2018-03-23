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
      let uuid: string = this.params ? this.params.uuid : null;
      this.store.select(getCalendarDays)
        .subscribe(days => {
          const entry: Entry = days.filter(
            e => e ? e.uuid === uuid : false)[0];
          if (entry) {
            this.entry = entry;
          }
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
      this.router.navigate(['calendar/monthly', { actionRef: 'update', day: this.params.day }]);
    } else {
      this.store.dispatch({
        type: CALENDAR_ACTIONS.PUT_ENTRY,
        payload: this.entry
      });
      this.router.navigate(['calendar/monthly', { actionRef: 'insert', day: this.params.day }]);
    }
    this.submitted = true;
  }

  back() {
    // TODO: we set actionRef to login to force Calendar form to update
    this.router.navigate(['calendar/monthly', { actionRef: 'login', day: this.params.day }]);
  }

  deleteEntry(uuid: string) {
    if (this.entry.uuid !== '') {
      this.store.dispatch({
        type: CALENDAR_ACTIONS.DELETE_ENTRY,
        payload: uuid
      });
      this.router.navigate(['calendar/monthly', { actionRef: 'delete', day: this.params.day }]);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
