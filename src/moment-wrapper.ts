import Moment = moment.Moment;
import moment = require("moment/moment");

export class MomentWrapper {

  start: Moment;
  startDateOfWeek: Moment;

  constructor(start: Moment, startDateOfWeek: Moment) {
    this.start = start;
    this.startDateOfWeek = startDateOfWeek;
  }
  
}
