import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Http, Headers, Response} from '@angular/http';
import {contentHeaders } from '../common/headers';
import {Entry} from "../common/Entry";


declare var ENV: any;

@Injectable()
export class EntryFormService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http){

        this.actionUrl = ENV().baseUrl  + ENV().apiPath;
        this.headers = contentHeaders;
    }

    getEntry(uuid: string): Observable<Response> {
        return this._http
            .get(this.actionUrl + "/calendar/uuid/" + uuid, { headers: this.headers });
    }

    newEntry(entry: Entry) {
/*        return this._http
            .post(this.actionUrl + "/calendar")*/
    }

    updateEntry(entr: Entry) {

    }

    deleteEntry(uuid:String) {
        
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}