import {WeekRender} from './week.render'

export class MonthRender {

    public weeks: Array<WeekRender>;
    public name: string;

    constructor(name: string) {
        this.weeks = [];
        this.name = name;
    }

    setWeeks(weeks: Array<WeekRender>) {
        this.weeks = weeks;
    }
}
