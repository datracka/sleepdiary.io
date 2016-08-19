export class Entry {

    public uuid: string;
    public date: any;
    public sleepingQuality: string;
    public tirednessFeeling: string;

    constructor(uuid: string, date: string, sleepingQuality: string, tirednessFeeling: string) {
        this.uuid = uuid;
        this.date = date;
        this.sleepingQuality = sleepingQuality;
        this.tirednessFeeling = tirednessFeeling;
    }

    toString() {
        return JSON.stringify(this);
    }

}