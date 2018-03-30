import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics';
import { AuthGuard } from '../services/common/auth-guard';
import { ModuleWithProviders } from '@angular/core';
import { SampleComponent } from './sample/sample.component';

const statisticsRoutes: Routes = [
  {
    path: '',
    component: StatisticsComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SampleComponent
      },
      {
        path: 'sample',
        component: SampleComponent
      },
    ]
  }
];

export const statisticsRouting: ModuleWithProviders = RouterModule.forChild(statisticsRoutes);
