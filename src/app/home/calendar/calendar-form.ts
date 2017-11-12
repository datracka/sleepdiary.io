export class CalendarForm {

      public year: string;
      public metric: string;

      constructor(year: string, metric: string) {
          this.year = year;
          this.metric = metric;
      }

      toString() {
          return JSON.stringify(this);
      }

  }
