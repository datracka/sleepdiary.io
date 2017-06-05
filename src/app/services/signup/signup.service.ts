import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {contentHeaders} from "../common/headers";
import {AngularFireAuth} from "angularfire2/auth";
import * as promise from 'firebase';


@Injectable()
export class SignupService {

  private actionUrl: string;

  constructor(private _http: Http, private afAuth: AngularFireAuth) {
    this.actionUrl = process.env.API_PATH;
  }

  public signup = (body): Observable<Response> => {
    console.log(body, body.email);
    return Observable.fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(body.email, body.password) as Promise<any>);
    //return this._http.post(this.actionUrl + 'accounts/user', body, { headers: contentHeaders });
  }
}
