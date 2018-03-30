import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Drawer } from './drawer/drawer';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [Footer, Header, Drawer],
  exports: [Footer, Header,
    CommonModule, Drawer]
})
export class SharedModule { }
