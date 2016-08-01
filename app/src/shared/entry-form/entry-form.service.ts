import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Http, Headers, Response} from '@angular/http';
import {contentHeaders } from '../common/headers';
import {Entry} from "../common/Entry";


@Injectable()
export class EntryFormService {

    private actionUrl: string;
    private headers: Headers;
    public ENV = {
    environment: 'dev',
    baseUrl: 'http://localhost:8080',
    fakeBaseUrl : 'http://localhost:8081',
    apiPath: '',
    locationType: 'auto'
}

    constructor(private _http: Http){

        this.actionUrl = this.ENV.baseUrl  + this.ENV.apiPath;
        this.headers = contentHeaders;
    }

    getEntry(uuid: string): Observable<Response> {
        return this._http
            .get(this.actionUrl + '/calendar/uuid/' + uuid, { headers: this.headers });
    }

    newEntry(entry: Entry): Observable<Response> {
        return this._http
            .post(this.actionUrl + '/calendar', JSON.stringify(entry), { headers: this.headers });
    }

    updateEntry(entry: Entry): Observable<Response> {
        return this._http
            .put(this.actionUrl + '/calendar', JSON.stringify(entry), { headers: this.headers });
    }

    deleteEntry(uuid:String): Observable<Response> {
        return this._http
            .delete(this.actionUrl + '/calendar/uuid/' + uuid, { headers: this.headers })
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}