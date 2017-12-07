import { WeekRender } from './week.render';
import {
  Input,
  Component,
  OnInit
} from '@angular/core';
let template = require('./week.html');

@Component({
  selector: 'week',
  template: template,
  styleUrls: ['./week.scss']
})
export class Week implements OnInit {

  @Input() weekRender: WeekRender;

  ngOnInit() {
  }

}
