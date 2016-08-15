import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {contentHeaders } from '../common/headers';
import {Entry} from "../common/Entry";

declare let ENV:any

@Injectable()
export class EntryFormService {

    private actionUrl: string;
    private options = new RequestOptions({
        body: '',
        headers: contentHeaders,
    });

    constructor(private _http: Http){
        this.actionUrl = process.env.BASE_URL + process.env.API_PATH;
    }

    getEntry(uuid: string): Observable<Response> {
        return this._http
            .get(this.actionUrl + 'calendar/uuid/' + uuid, this.options);
    }

    newEntry(entry: Entry): Observable<Response> {
        return this._http
            .post(this.actionUrl + 'calendar', JSON.stringify(entry), this.options);
    }

    updateEntry(entry: Entry): Observable<Response> {
        return this._http
            .put(this.actionUrl + 'calendar', JSON.stringify(entry), this.options);
    }

    deleteEntry(uuid:String): Observable<Response> {
        return this._http
            .delete(this.actionUrl + 'calendar/uuid/' + uuid, this.options)
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}