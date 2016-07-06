import 'reflect-metadata';
require('zone.js/dist/zone');
import {bootstrap}    from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { FORM_PROVIDERS } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthGuard } from './app/common/auth-guard';
import {AppComponent} from './app/app.component';
import { routes } from './app/app.routes';

bootstrap(<any> AppComponent, [
    provideRouter(routes),
    FORM_PROVIDERS,
    HTTP_PROVIDERS,
    AUTH_PROVIDERS,
    AuthGuard
]);

