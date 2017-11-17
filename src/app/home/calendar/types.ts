
export class Month {

  public name: string;
  public order: number;

  constructor(name: string, order: number) {
    this.name = name;
    this.order = order;
  }

  getName() {
    return this.name;
  }
}

export class Week {

  public days: Array<Day>;

  constructor(days: Array<Day>) {
    this.days = days;
  }
}


