import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OngRoutingModule } from './ong-routing.module';
import { OngComponent } from './ong.component';
import { NavbarOngComponent } from '../shared/navbar-ong/navbar-ong.component';


@NgModule({
  declarations: [
    OngComponent,
    NavbarOngComponent
  ],
  imports: [
    CommonModule,
    OngRoutingModule
  ]
})
export class OngModule { }
