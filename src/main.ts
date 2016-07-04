import 'reflect-metadata';
require('zone.js/dist/zone');
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app/app.component';
import {APP_ROUTER_PROVIDERS} from './app/app.routes';


bootstrap(<any> AppComponent, [
    APP_ROUTER_PROVIDERS
]).catch(err => console.error(err));

