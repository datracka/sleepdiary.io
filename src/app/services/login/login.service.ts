import { Injectable, Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from '../common/headers';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class LoginService {

    private actionUrl: string;
    private user: any;

    constructor(private _http: Http, afAuth: AngularFireAuth) {
        this.actionUrl = process.env.API_PATH;
        this.user = afAuth;
    }

    public login = (body): Observable<Response> => {
        return this._http.post(this.actionUrl + 'accounts/session', body, { headers: contentHeaders });
    }
}
