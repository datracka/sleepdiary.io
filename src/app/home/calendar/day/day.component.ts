import { Store } from "@ngrx/store";

import { DayRender } from './day.render';
import {
  Input,
  Component,
  OnInit
} from '@angular/core';
let template = require('./day.html');

@Component({
  selector: 'day',
  template: template,
  styleUrls: ['./day.scss']
})
export class Day implements OnInit {

  @Input() dayRender: DayRender;

  constructor(private store: Store<State>) {

  }
  ngOnInit() {
  }

}
