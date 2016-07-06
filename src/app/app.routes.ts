import {RouterConfig} from '@angular/router';
import {MonthlyViewComponent} from "./monthly";
import {YearlyViewComponent} from "./yearly";
import {Login} from "./login";
import {Signup} from "./signup";
import {AuthGuard} from './common/auth-guard';

export const routes:RouterConfig = <any>[
    {path: '',          component: Login},
    {path: 'login',     component: Login},
    {path: 'signup',    component: Signup},
    {path: 'monthly',   component: MonthlyViewComponent, canActivate: [AuthGuard]},
    {path: 'yearly',    component: YearlyViewComponent, canActivate: [AuthGuard]},
    {path: '**',        component: Login},
];


