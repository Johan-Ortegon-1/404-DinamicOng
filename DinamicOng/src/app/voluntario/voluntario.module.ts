import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoluntarioRoutingModule } from './voluntario-routing.module';
import { VoluntarioComponent } from './voluntario.component';
import { NavbarVoluntarioComponent } from '../shared/navbar-voluntario/navbar-voluntario.component';
import { VerMiPerfilComponent } from './ver-mi-perfil/ver-mi-perfil.component';


@NgModule({
  declarations: [
    VoluntarioComponent,
    NavbarVoluntarioComponent,
    VerMiPerfilComponent
  ],
  imports: [
    CommonModule,
    VoluntarioRoutingModule
  ]
})
export class VoluntarioModule { }
