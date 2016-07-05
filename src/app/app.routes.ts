import {provideRouter, RouterConfig} from '@angular/router';
import {MonthlyViewComponent} from "./monthly";
import {YearlyViewComponent} from "./yearly";
import {Login} from "./login";
import {Signup} from "./signup";
import { AuthGuard } from './common/auth-guard';

declare var ENV: any;

export const routes:RouterConfig = <any>[
    {path: 'monthly', component: MonthlyViewComponent, canActivate: [AuthGuard]},
    {path: 'yearly', component: YearlyViewComponent, canActivate: [AuthGuard]},
    {path: '', component: Login},
    {path: 'login', component: Login},
    {path: 'signup', component: Signup},
    {path: '**', component: Login},
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
