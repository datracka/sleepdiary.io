import { StoreModule } from '@ngrx/store';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, ApplicationRef } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { routing } from './app.routes';
import { Login } from './login/login.component';
import { SignUp } from './signup/signup.component';
import { AppComponent } from './app.component';
import { StatisticsModule } from './statistics/statistics.module';
import { reducers, metaReducers } from './app.reducer';
// import { CustomRouterStateSerializer } from './utils/custom-router-serializer';

/*https://angular.io/docs/ts/latest/cookbook/dependency-injection.html#!#usefactory*/
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    routing,
    StatisticsModule,
    HttpModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    // makes everything super slow!
    /*     StoreDevtoolsModule.instrument({
          maxAge: 25 // Retains last 25 states
        }) */
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
          globalHeaders: [{ 'Content-Type': 'application/json' }],
          noJwtError: false,
          noTokenScheme: false
        }), http);
      },
      deps: [Http]
    },
    { provide: APP_BASE_HREF, useValue: '/' }
    /* { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }, */
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
