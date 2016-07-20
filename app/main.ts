import 'reflect-metadata';
require('zone.js/dist/zone');
import {bootstrap}    from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { FORM_PROVIDERS } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthGuard } from './src/common/auth-guard';
import {AppComponent} from './src/app.component';
import { routes } from './src/app.routes';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

bootstrap(<any> AppComponent, [
    disableDeprecatedForms(),
    provideForms(),
    provideRouter(routes),
    FORM_PROVIDERS,
    HTTP_PROVIDERS,
    AUTH_PROVIDERS,
    AuthGuard
]);

