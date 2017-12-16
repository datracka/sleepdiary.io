import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {CalendarComponent} from './calendar';
import {YearlyPageComponent} from './yearly.page/yearly.component';
import {MonthlyPageComponent} from './monthly.page/monthly.component';
import {AuthGuard} from '../services/common/auth-guard';

const calendarRoutes: Routes = [
    {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: MonthlyPageComponent
            },
            {
                path: 'monthly',
                component: MonthlyPageComponent
            },
            {
                path: 'yearly',
                component: YearlyPageComponent
            }
        ]
    }
];

export const calendarRouting: ModuleWithProviders = RouterModule.forChild(calendarRoutes);
