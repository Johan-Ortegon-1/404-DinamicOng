import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoluntarioRoutingModule } from './voluntario-routing.module';
import { VoluntarioComponent } from './voluntario.component';
import { NavbarVoluntarioComponent } from './shared/navbar-voluntario/navbar-voluntario.component';
import { BuscarIniciativaComponent } from './buscar-iniciativa/buscar-iniciativa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MostrarBusquedaComponent } from './mostrar-busqueda/mostrar-busqueda.component';


@NgModule({
  declarations: [
    VoluntarioComponent,
    NavbarVoluntarioComponent,
    BuscarIniciativaComponent,
    MostrarBusquedaComponent
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
