import {BrowserModule} from "@angular/platform-browser";
import {FormsModule}   from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule, ApplicationRef} from "@angular/core";
import {HttpModule, Http} from '@angular/http';

import {routing} from "./app.routes"
import {Login} from "./login/login.component";
import {SignUp} from "./signup/signup.component";

import {AppComponent} from "./app.component";
import {AuthHttp, AuthConfig} from "angular2-jwt";

import {HomeModule} from "./home/home.module";
import {MdlModule} from "angular2-mdl";
import {StatisticsModule} from "./statistics/statistics.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


/*https://angular.io/docs/ts/latest/cookbook/dependency-injection.html#!#usefactory*/
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    routing,
    HomeModule, //rename to CalendarModule
    StatisticsModule,
    HttpModule,
    MdlModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig({
          headerName: 'Authorization',
          headerPrefix: 'Bearer',
          tokenName: 'id_token',
          tokenGetter: (() => localStorage.getItem('id_token')),
          globalHeaders: [{'Content-Type': 'application/json'}],
          noJwtError: false,
          noTokenScheme: false
        }), http);
      },
      deps: [Http]
    },
  ],
  declarations: [
    AppComponent,
    Login,
    SignUp
  ],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private appRef: ApplicationRef) {
  }

  public ngDoBootstrap() {
    this.appRef.bootstrap(AppComponent);
  }
}
