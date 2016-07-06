import { Injectable, Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from '../common/headers';

declare var ENV: any;

@Injectable()
export class LoginService {

    private actionUrl: string;

    constructor(private _http: Http) {
        this.actionUrl = ENV().fakeBaseUrl + ENV().apiPath;
    }

    public login = (body): Observable<Response> => {
        return this._http.post(this.actionUrl + '/login', body, { headers: contentHeaders });
    }
}