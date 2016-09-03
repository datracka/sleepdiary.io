import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home";
import {YearlyViewComponent} from "./yearly/yearly.component";
import {MonthlyViewComponent} from "./monthly/monthly.component";
import {EntryForm} from "./entryForm/entry-form.component";
import {ModuleWithProviders} from "@angular/core";

const homeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: MonthlyViewComponent,
            },
            {
                path: 'monthly',
                component: MonthlyViewComponent,
            }/*,
            {
                path: 'yearly',
                component: YearlyViewComponent,
            },
            {
                path: 'entry',
                component: EntryForm,
            },*/
        ]
    }
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);
