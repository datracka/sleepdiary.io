import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home";
import {YearlyViewComponent} from "./yearly/yearly.component";
import {MonthlyViewComponent} from "./monthly/monthly.component";
import {EntryForm} from "./entryForm/entry-form.component";
import {ModuleWithProviders} from "@angular/core";
import {AuthGuard} from "../services/common/auth-guard";

const homeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: MonthlyViewComponent
            },
            {
                path: 'monthly',
                component: MonthlyViewComponent
            },
            {
                path: 'yearly',
                component: YearlyViewComponent
            },
            {
                path: 'entry/:uuid',
                component: EntryForm
            }
        ]
    }
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);
