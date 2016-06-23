import {Week} from './week'

export class Month {

  weeks:Array<Week>;
  name:string;

  constructor(public name:String) {
    this.weeks = [];
    this.name = name;
  }
}
