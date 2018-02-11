import { DayRender } from './day.render';
import { OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
  Input,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { Router } from '@angular/router';
import { Entry } from '../../../services/common/entry';
import { ROUTE_ENTRY_FORM } from '../../calendar.constants';
let template = require('./day.html');

@Component({
  selector: 'day',
  template: template,
  styleUrls: ['./day.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Day implements OnInit {

  @Input() dayRender: DayRender;
  @Input() entries$: Observable<any[]>;
  sleepingQuality: string;
  tirednessFeeling: string;
  entry: Array<Entry>;

  constructor(private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.entries$.subscribe(
      entries => {
        const arr = Object.keys(entries).map((k) => entries[k]);
        this.entry = arr.filter(
          entry => this.dayRender.date.isSame(entry.date.substring(0, 10), 'day')
        );
        if (this.entry.length > 0) {
          this.sleepingQuality = this.entry[0].sleepingQuality;
          this.tirednessFeeling = this.entry[0].tirednessFeeling;
          this.cdr.markForCheck();
        }
      }
    );
  }

  handleClick() {
    if (!this.dayRender.isCurrentMonth) { return false; }
    const uuid = (this.entry.length > 0) ? this.entry[0].uuid : 'new';
    // TODO '/calendar/entry' should be a CONSTANT
    this.router.navigate(['/calendar/entry', uuid, { day: this.dayRender.date.format('YYYY-MM-DD') }]);
  }
}

