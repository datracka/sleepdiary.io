import 'reflect-metadata';
require('zone.js/dist/zone');
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app/app.component';
import {APP_ROUTER_PROVIDERS} from './app/app.routes';
import { AuthGuard } from './app/common/auth-guard';


bootstrap(<any> AppComponent, [
    APP_ROUTER_PROVIDERS,
    AuthGuard
]).catch(err => console.error(err));

