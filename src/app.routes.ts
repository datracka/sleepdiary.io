import { provideRouter, RouterConfig } from '@angular/router';
import {MonthlyViewComponent} from "./monthy-view.component";
import {YearlyViewComponent} from "./yearly-view.component";

export const routes: RouterConfig = <any>[
  {
    path: 'monthly', 
    component: MonthlyViewComponent,
    useAsDefault: true
  },
  {
    path: 'yearly', 
    component: YearlyViewComponent,
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
