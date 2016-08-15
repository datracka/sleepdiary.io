import { Routes, RouterModule } from '@angular/router';

import {MonthlyViewComponent} from "./monthly";
import {YearlyViewComponent} from "./yearly";
import {Login} from "./login";
import {SignUp} from "./signup";
import {AuthGuard} from './shared/common/auth-guard';
import {EntryForm} from "./entryForm";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'signup',
        component: SignUp
    },
    {
        path: 'entry',
        component: EntryForm
    },
    {
        path: 'entry/:uuid',
        component: EntryForm
    },
    {
        path: 'monthly',
        component: MonthlyViewComponent
    },
    {
        path: 'yearly',
        component: YearlyViewComponent
    },
];

export const routing = RouterModule.forRoot(appRoutes);


