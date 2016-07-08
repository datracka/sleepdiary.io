export class Entry {
    
    public uuid:string;
    public date:any;
    public sleepingQuality:string;
    public tirednessFeeling:string;

    constructor(uuid:string, date:any, sleepingQuality:string, tirednessFeeling:string) {
        this.uuid = uuid;
        this.date = date;
        this.sleepingQuality = sleepingQuality;
        this.tirednessFeeling = tirednessFeeling;
    }
}