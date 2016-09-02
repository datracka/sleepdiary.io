import { Routes, RouterModule } from '@angular/router';

import {Login} from "./login";
import {SignUp} from "./signup";
import {homeRouting} from "./home/home.routes";
import {ModuleWithProviders} from "@angular/core";

// https://angular.io/docs/ts/latest/guide/router.html
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
        path: 'home',
        loadChildren: 'app/home/home.module#homeModule'
    }
];

const appRoutes: Routes = [
    ...homeRouting
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);



