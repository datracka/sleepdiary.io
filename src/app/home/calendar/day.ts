// TODO: Don't use it.
// Model has to be inside Component.

export class Day {
    public name: any;
    public number: any;
    public isCurrentMonth: boolean;
    public isToday: boolean;
    public date: any;
    public tirednessFeeling: string;
    public sleepingQuality: string;

    constructor(name?: any, number?: any, isCurrentMonth?: boolean, isToday?: boolean, date?: any) {
        this.name = name;
        this.number = number;
        this.isCurrentMonth = isCurrentMonth;
        this.isToday = isToday;
        this.date = date;
        this.tirednessFeeling = '';
        this.sleepingQuality = '';
    }
}
