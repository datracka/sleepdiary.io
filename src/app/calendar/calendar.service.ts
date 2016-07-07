import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {contentHeaders } from '../common/headers';
import {Observable} from "rxjs/Rx";

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
    
    public getAll(): Observable<Response> {
        console.log('subscribed!');
        return this._http.get(this.actionUrl + "/calendar/year/2016", { headers: this.headers });
    }
}