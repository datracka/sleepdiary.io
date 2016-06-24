import {Week} from './week'

export class Month {

  weeks:Array<Week>;
  name:string;

  constructor(name: string) {
    this.weeks = [];
    this.name = name;
  }
  
  setWeeks(weeks: Array<Week>) {
    this.weeks = weeks;
  }
}
