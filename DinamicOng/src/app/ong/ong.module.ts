import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OngRoutingModule } from './ong-routing.module';
import { OngComponent } from './ong.component';
import { NavbarOngComponent } from './shared/navbar-ong/navbar-ong.component';
import { MatIconModule } from '@angular/material/icon';
import { CrearIniciativaComponent } from './crear-iniciativa/crear-iniciativa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BuscarVoluntarioComponent } from './buscar-voluntario/buscar-voluntario.component';



@NgModule({
  declarations: [
    OngComponent,
    NavbarOngComponent,
    CrearIniciativaComponent,
    BuscarVoluntarioComponent
  ],
  imports: [
    CommonModule,
    OngRoutingModule,
    MatIconModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ]
})
export class OngModule { }
