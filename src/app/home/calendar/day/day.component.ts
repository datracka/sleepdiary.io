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

  ngOnInit() {

  }

}
