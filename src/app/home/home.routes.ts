import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home";
import {YearlyViewComponent} from "./yearly/yearly.component";
import {MonthlyViewComponent} from "./monthly/monthly.component";
import {EntryForm} from "./entryForm/entry-form.component";
const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'yearly',
                component: YearlyViewComponent,
            },
            {
                path: 'monthly',
                component: MonthlyViewComponent,
            },
            {
                path: 'entry',
                component: EntryForm,
            },
            {
                path: '',
                component: MonthlyViewComponent,
            }
        ]
    }
];

export const homeRouting = RouterModule.forRoot(appRoutes);