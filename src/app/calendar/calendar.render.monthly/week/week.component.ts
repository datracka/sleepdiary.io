import { WeekRender } from './week.render';
import { Observable } from 'rxjs/Rx';
import {
  Input,
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
let template = require('./week.html');

@Component({
  selector: 'week',
  template: template,
  styleUrls: ['./week.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Week implements OnInit {

  @Input() weekRender: WeekRender;
  @Input() entries$: Observable<any[]>;

  ngOnInit() {
  }

}
