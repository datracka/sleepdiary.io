import {provideRouter, RouterConfig} from '@angular/router';
import {MonthlyViewComponent} from "./monthy-view.component";
import {YearlyViewComponent} from "./yearly-view.component";
import {Login} from "./login.component";
import {Signup} from "./signup.component";

declare var ENV: any;

export const routes:RouterConfig = <any>[
    {path: 'monthly', component: MonthlyViewComponent},
    {path: 'yearly', component: YearlyViewComponent,},
    {path: '', component: Login},
    {path: 'login', component: Login},
    {path: 'signup', component: Signup},
    {path: '**', component: Login},
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
