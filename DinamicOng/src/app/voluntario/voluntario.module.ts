import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoluntarioRoutingModule } from './voluntario-routing.module';
import { VoluntarioComponent } from './voluntario.component';
import { NavbarVoluntarioComponent } from '../shared/navbar-voluntario/navbar-voluntario.component';


@NgModule({
  declarations: [
    VoluntarioComponent,
    NavbarVoluntarioComponent
  ],
  imports: [
    CommonModule,
    VoluntarioRoutingModule
  ]
})
export class VoluntarioModule { }
