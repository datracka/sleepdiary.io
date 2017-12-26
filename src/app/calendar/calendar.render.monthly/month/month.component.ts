import { MonthRender } from './month.render';
import { Observable } from 'rxjs/Rx';
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
  styleUrls: ['./month.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Month implements OnInit {

  @Input() monthRender: MonthRender;
  @Input() entries$: Observable<any[]>;

  ngOnInit() {
  }

}
