export class Entry {

    public userId: number;
    public uuid: string;
    public date: any;
    public sleepingQuality: string;
    public tirednessFeeling: string;

    constructor(userId: number, uuid: string, date: string, sleepingQuality: string, tirednessFeeling: string) {
        this.userId = userId;
        this.uuid = uuid;
        this.date = date;
        this.sleepingQuality = sleepingQuality;
        this.tirednessFeeling = tirednessFeeling;
    }

    toString() {
        return JSON.stringify(this);
    }

}