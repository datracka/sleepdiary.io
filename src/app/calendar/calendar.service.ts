import {Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import {contentHeaders } from '../common/headers';

declare var ENV: any;

@Injectable()
export class CalendarService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http)  {

        this.actionUrl = ENV().baseUrl  + ENV().apiPath;

        this.headers = contentHeaders;
        this.headers.append('Authorization', 'Basic Y2FybG9zOmFzZGY='); //Hardcoded

    }
    
    public getAll() {
        return this._http.get(this.actionUrl + "/calendar/year/2016", { headers: this.headers });
    }
}