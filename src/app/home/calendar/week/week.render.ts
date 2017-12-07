import {DayRender} from "../../../services/calendar/day.render";

export class WeekRender {

  public days: Array<DayRender>;

  constructor(days: Array<DayRender>) {
    this.days = days;
  }
}
