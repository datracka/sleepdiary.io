import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {contentHeaders} from "../common/headers";
import {AngularFireAuth} from "angularfire2/auth";


@Injectable()
export class SignupService {

    private actionUrl: string;

    constructor(private _http: Http, private afAuth: AngularFireAuth) {
        this.actionUrl = process.env.API_PATH;
    }

    public signup = (body): Observable<Response> => {
      return this.afAuth.createUserWithEmailAndPassword(body.email, body.password);
      //return this._http.post(this.actionUrl + 'accounts/user', body, { headers: contentHeaders });
    }
}
