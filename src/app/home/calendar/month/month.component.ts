import {
  Input,
  Component,
  OnInit
} from '@angular/core';
let template = require('./month.html');

@Component({
  selector: 'month',
  template: template,
  styleUrls: ['./month.scss']
})
export class Month implements OnInit {

  @Input() month: any;

  ngOnInit() {

  }

}
