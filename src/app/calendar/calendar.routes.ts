import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { EntryForm } from './entry-form/entry-form.component';
import { CalendarComponent } from './calendar';
import { YearlyPageComponent } from './yearly.page/yearly.component';
import { MonthlyPageComponent } from './monthly.page/monthly.component';

const calendarRoutes: Routes = [
  {
    path: '',
    component: CalendarComponent,
    children: [
      {
        path: 'monthly',
        component: MonthlyPageComponent
      },
      {
        path: 'yearly',
        component: YearlyPageComponent
      },
      {
        path: 'entry/:uuid',
        component: EntryForm
      }
    ]
  }
];

export const calendarRouting: ModuleWithProviders = RouterModule.forChild(calendarRoutes);
