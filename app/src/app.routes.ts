import {RouterConfig} from '@angular/router';
import {MonthlyViewComponent} from "./monthly";
import {YearlyViewComponent} from "./yearly";
import {Login} from "./login";
import {Signup} from "./signup";
import {AuthGuard} from './shared/common/auth-guard';
import {EntryForm} from "./entryForm";

export const routes:RouterConfig = <RouterConfig>[
    {path: '', component: Login},
    {path: 'login', component: Login},
    {path: 'signup', component: Signup},
    {path: 'entry/:uuid', component: EntryForm},
    {path: 'monthly', component: MonthlyViewComponent, canActivate: [AuthGuard]},
    {path: 'yearly', component: YearlyViewComponent, canActivate: [AuthGuard]},
    {path: '**', component: Login},
];


