import { DayRender } from './day.render';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
  Input,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
let template = require('./day.html');

@Component({
  selector: 'day',
  template: template,
  styleUrls: ['./day.scss']
})
export class Day implements OnInit {

  @Input() dayRender: DayRender;
  @Input() entries$: Observable<any[]>;
  sleepingQuality: string;
  tirednessFeeling: string;

  constructor() { }

  ngOnInit() {
    this.entries$.subscribe(
      entry => {
        const arr = Object.keys(entry).map((k) => entry[k]);
        const found = arr.filter(
          entry => this.dayRender.date.isSame(entry.date.substring(0, 10), 'day')
        );
        if (found.length > 0) {
          this.sleepingQuality = found[0].sleepingQuality;
          this.tirednessFeeling = found[0].tirednessFeeling;
          console.log(this.dayRender.date.toString(), this.sleepingQuality, this.tirednessFeeling);
        }
      }
    );
  }
}
