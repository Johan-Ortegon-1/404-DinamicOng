import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarHomeComponent } from '../shared/navbar-home/navbar-home.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarHomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
