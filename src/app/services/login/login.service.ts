import { Injectable, Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from '../common/headers';



@Injectable()
export class LoginService {

    private actionUrl: string;

    constructor(private _http: Http) {
        this.actionUrl = process.env.API_PATH;
    }

    public login = (body): Observable<Response> => {
        return this._http.post(this.actionUrl + 'accounts/session', body, { headers: contentHeaders });
    }
}