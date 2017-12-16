import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {Login} from './login';
import {SignUp} from './signup';
import {ModuleWithProviders} from '@angular/core';
import {EntryForm} from './entry-form/entry-form.component';

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
  },
  {
    path: 'entry/:uuid',
    component: EntryForm
  }

];

const appRoutes: Routes = [
  ...appRouting,

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  useHash: false,
  preloadingStrategy: PreloadAllModules
});




