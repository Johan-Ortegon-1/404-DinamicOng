import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoluntarioRoutingModule } from './voluntario-routing.module';
import { VoluntarioComponent } from './voluntario.component';
import { NavbarVoluntarioComponent } from '../shared/navbar-voluntario/navbar-voluntario.component';
import { MisParticipacionesComponent } from './mis-participaciones/mis-participaciones.component';
import { MatIconModule } from '@angular/material/icon';
import { BuscarIniciativaComponent } from './buscar-iniciativa/buscar-iniciativa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MostrarBusquedaComponent } from './mostrar-busqueda/mostrar-busqueda.component';
import { VerOngComponent } from './ver-ong/ver-ong.component';
import { VerMiPerfilComponent } from './ver-mi-perfil/ver-mi-perfil.component';
import { VerNotificacionesComponent } from './ver-notificaciones/ver-notificaciones.component';
import { RecomendacionesVoluntarioComponent } from './recomendaciones-voluntario/recomendaciones-voluntario.component';

@NgModule({
  declarations: [
    VoluntarioComponent,
    NavbarVoluntarioComponent,
    BuscarIniciativaComponent,
    MostrarBusquedaComponent,
    VerOngComponent,
    MisParticipacionesComponent,
    VerMiPerfilComponent,
    VerNotificacionesComponent,
    RecomendacionesVoluntarioComponent
  ],
  imports: [
    CommonModule,
    VoluntarioRoutingModule,
    MatIconModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ]
})
export class VoluntarioModule { }
