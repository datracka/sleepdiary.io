export class Entry {
    
    public uuid:string = "1";
    public date:any = "1";
    public sleepingQuality:string;
    public tirednessFeeling:string;

    constructor(uuid:string, date:any, sleepingQuality:string, tirednessFeeling:string) {
        this.uuid = uuid;
        this.date = date;
        this.sleepingQuality = sleepingQuality;
        this.tirednessFeeling = tirednessFeeling;
    }
}