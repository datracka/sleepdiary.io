import { Injectable, Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

declare var ENV: any;

@Injectable()
export class LoginService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http) {

        this.actionUrl = ENV().fakeBaseUrl + ENV().apiPath;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');

    }

    public login = (): Observable<Response> => {
        return this._http.get(this.actionUrl + "/login");
    }
}