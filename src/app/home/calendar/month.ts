export class Month {

  private name: string;
  private order: number;
  private weeks: Array<Week> = [];

  constructor(name: string, order: number) {
    this.name = name;
    this.order = order;
  }

  getName() {
    return this.name;
  }

  setWeeks(weeks: Array<Week>) {
      this.weeks = weeks;
  }

}
