import {
  Input,
  Component,
} from '@angular/core';
let template = require('./day.html');

@Component({
  selector: 'day',
  template: template,
  styleUrls: ['./day.scss']
})
export class Day {

  public name: any;
  public number: any;
  public isCurrentMonth: boolean;
  public isToday: boolean;
  public date: any;
  public tirednessFeeling: string;
  public sleepingQuality: string;

}
