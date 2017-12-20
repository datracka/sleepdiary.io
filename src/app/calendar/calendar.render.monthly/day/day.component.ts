import { DayRender } from './day.render';
import {
  Input,
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
let template = require('./day.html');

@Component({
  selector: 'day',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: template,
  styleUrls: ['./day.scss']
})
export class Day implements OnInit {

  @Input() dayRender: DayRender;
  @Input() entries: any;
  sleepQuality: string;
  tirednessFeeling: string;


  constructor() { }
  ngOnInit() { }

}
