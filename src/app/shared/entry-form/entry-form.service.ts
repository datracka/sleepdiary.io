import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {contentHeaders} from '../common/headers';
import {Entry} from "../common/entry";
import {AuthHttp} from "angular2-jwt";


@Injectable()
export class EntryFormService {

    private actionUrl: string;
    private options = new RequestOptions({
        body: '',
        headers: contentHeaders,
    });

    constructor(private _http: Http, private _authHttp: AuthHttp) {
        this.actionUrl = process.env.BASE_URL + process.env.API_PATH;
    }

    getEntry(uuid: string): Observable<Response> {
        return this._authHttp
            .get(this.actionUrl + 'calendar/uuid/' + uuid, this.options);
    }

    newEntry(entry: Entry): Observable<Response> {
        return this._authHttp
            .post(this.actionUrl + 'calendar', JSON.stringify(entry));
    }

    updateEntry(entry: Entry): Observable<Response> {
        return this._authHttp
            .put(this.actionUrl + 'calendar', JSON.stringify(entry));
    }

    deleteEntry(uuid: String): Observable<Response> {
        return this._authHttp
            .delete(this.actionUrl + 'calendar/uuid/' + uuid, this.options)
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}