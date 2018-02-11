import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { EntryForm } from './entry-form/entry-form.component';
import { CalendarComponent } from './calendar';
import { YearlyPageComponent } from './yearly.page/yearly.component';
import { MonthlyPageComponent } from './monthly.page/monthly.component';
import { ROUTE_CALENDAR_MONTHLY_PAGE, ROUTE_CALENDAR_YEARLY_PAGE, ROUTE_ENTRY_FORM } from './calendar.constants';

const calendarRoutes: Routes = [
  {
    path: '',
    component: CalendarComponent,
    children: [
      {
        path: ROUTE_CALENDAR_MONTHLY_PAGE,
        component: MonthlyPageComponent
      },
      {
        path: ROUTE_CALENDAR_YEARLY_PAGE,
        component: YearlyPageComponent
      },
      {
        path: ROUTE_ENTRY_FORM,
        component: EntryForm
      }
    ]
  }
];

export const calendarRouting: ModuleWithProviders = RouterModule.forChild(calendarRoutes);
