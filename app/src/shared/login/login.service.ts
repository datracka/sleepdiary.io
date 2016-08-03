import { Injectable, Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from '../common/headers';

declare let ENV:any;


@Injectable()
export class LoginService {

    private actionUrl: string;

    constructor(private _http: Http) {
        this.actionUrl = process.env.FAKE_BASE_URL + process.env.API_PATH;
    }

    public login = (body): Observable<Response> => {
        return this._http.post(this.actionUrl + 'login', body, { headers: contentHeaders });
    }
}