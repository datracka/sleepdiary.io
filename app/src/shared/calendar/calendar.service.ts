import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {contentHeaders} from '../common/headers';
import {Observable} from "rxjs/Rx";

@Injectable()
export class CalendarService {

    private actionUrl: string;

    private options = new RequestOptions({
        body: '',
        headers: contentHeaders,
    });

    constructor(private _http: Http) {
        this.actionUrl = process.env.BASE_URL + process.env.API_PATH;
    }

    public getAll(): Observable<Response> {
        return this._http.get(this.actionUrl + "calendar/year/2016", this.options);
    }
}