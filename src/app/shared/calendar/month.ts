import {Week} from './week'

export class Month {

    public weeks: Array<Week>;
    public name: string;

    constructor(name: string) {
        this.weeks = [];
        this.name = name;
    }

    setWeeks(weeks: Array<Week>) {
        this.weeks = weeks;
    }
}
