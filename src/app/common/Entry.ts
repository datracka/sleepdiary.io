export class Entry {

    public userId:number;
    public uuid:string;
    public date:any;
    public sleepingQuality:string;
    public tirednessFeeling:string;

    constructor(sleepingQuality:string, tirednessFeeling:string, date:any, userId:number, uuid:string) {
        this.userId = userId;
        this.uuid = uuid;
        this.date = date;
        this.sleepingQuality = sleepingQuality;
        this.tirednessFeeling = tirednessFeeling;
    }

    
}