import { MonthRender } from './month.render';
import {
  Input,
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
let template = require('./month.html');

@Component({
  selector: 'month',
  template: template,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./month.scss']
})
export class Month implements OnInit {

  @Input() monthRender: MonthRender;
  @Input() entries: any;

  ngOnInit() {
  }

}
