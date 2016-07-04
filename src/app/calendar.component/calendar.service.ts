import { Injectable, Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class Calendar {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http) {

        this.actionUrl = 'http://localhost:8080';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');

    }

    public GetAll = (): Observable<Response> => {
        return this._http.get(this.actionUrl + "/calendar/year/2016");
    }
}