import {Week} from './week'

export class Month {

  weeks:Array<Week>;
  name:String;

  constructor(private name2:String) {
    this.weeks = [];
    this.name = name2;
  }
}
