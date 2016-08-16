import {BrowserModule} from "@angular/platform-browser";
import {FormsModule}   from '@angular/forms';
import {NgModule, provide} from "@angular/core";
import {HttpModule, Http} from '@angular/http';

import {routing} from "./app.routes"
import {Calendar} from "./calendar/calendar.component";
import {EntryForm} from "./entryForm/entry-form.component";
import {Login} from "./login/login.component";
import {MonthlyViewComponent} from "./monthly/monthly.component";
import {SignUp} from "./signup/signup.component";
import {YearlyViewComponent} from "./yearly/yearly.component";

import {AppComponent} from "./app.component";
import {AuthHttp, AuthConfig} from "angular2-jwt";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule
    ],
    providers: [
        provide(AuthHttp, {
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
        })
    ],
    declarations: [
        AppComponent,
        Calendar,
        Login,
        MonthlyViewComponent,
        SignUp,
        EntryForm,
        YearlyViewComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}