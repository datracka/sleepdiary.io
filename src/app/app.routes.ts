import { Routes, RouterModule } from '@angular/router';

import {Login} from "./login";
import {SignUp} from "./signup";
import {ModuleWithProviders} from "@angular/core";
import {homeRouting} from "./home/home.routes";

// https://angular.io/docs/ts/latest/guide/router.html
const appRouting: Routes = [
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
    }
];

const appRoutes: Routes = [
    ...appRouting,

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


