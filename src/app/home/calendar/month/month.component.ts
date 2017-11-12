import {
  Component, Input,
} from '@angular/core';
let template = require('./month.html');

@Component({
  selector: 'month',
  template: template,
  styleUrls: ['./month.scss']
})
export class Month {
  @Input() name;
}
