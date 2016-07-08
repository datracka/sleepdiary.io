import {RouterConfig} from '@angular/router';
import {MonthlyViewComponent} from "./monthly";
import {YearlyViewComponent} from "./yearly";
import {Login} from "./login";
import {Signup} from "./signup";
import {AuthGuard} from './common/auth-guard';
import {NewEntry} from "./newEntry/new-entry.component";

export const routes:RouterConfig = <RouterConfig>[
    {path: '', component: Login},
    {path: 'login', component: Login},
    {path: 'signup', component: Signup},
    {path: 'newEntry/:uuid', component: NewEntry},
    {path: 'monthly', component: MonthlyViewComponent, canActivate: [AuthGuard]},
    {path: 'yearly', component: YearlyViewComponent, canActivate: [AuthGuard]},
    {path: '**', component: Login},
];


