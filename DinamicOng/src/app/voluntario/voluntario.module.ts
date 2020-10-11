import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoluntarioRoutingModule } from './voluntario-routing.module';
import { VoluntarioComponent } from './voluntario.component';
import { NavbarVoluntarioComponent } from '../shared/navbar-voluntario/navbar-voluntario.component';
import { MisParticipacionesComponent } from './mis-participaciones/mis-participaciones.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    VoluntarioComponent,
    NavbarVoluntarioComponent,
    MisParticipacionesComponent,
  ],
  imports: [
    CommonModule,
    VoluntarioRoutingModule,
    MatIconModule
  ]
})
export class VoluntarioModule { }
