import { Injectable, Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from '../common/headers';




@Injectable()
export class LoginService {

    private actionUrl: string;
    private ENV = {
        environment: 'dev',
        baseUrl: 'http://localhost:8080',
        fakeBaseUrl: 'http://localhost:8081',
        apiPath: '',
        locationType: 'auto'
    }

    constructor(private _http: Http) {
        this.actionUrl = this.ENV.fakeBaseUrl + this.ENV.apiPath;
    }

    public login = (body): Observable<Response> => {
        return this._http.post(this.actionUrl + '/login', body, { headers: contentHeaders });
    }
}