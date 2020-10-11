import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OngRoutingModule } from './ong-routing.module';
import { OngComponent } from './ong.component';
import { NavbarOngComponent } from './shared/navbar-ong/navbar-ong.component';
import { MatIconModule } from '@angular/material/icon';
import { CrearIniciativaComponent } from './crear-iniciativa/crear-iniciativa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VerIniciativaComponent } from '../iniciativa/ver-iniciativa/ver-iniciativa.component';
import { VerIniciativasComponent } from './ver-iniciativas/ver-iniciativas.component';
import { VerMiPerfilComponent } from './ver-mi-perfil/ver-mi-perfil.component';
import {GoogleMapsModule} from '@angular/google-maps';


@NgModule({
  declarations: [
    OngComponent,
    NavbarOngComponent,
    CrearIniciativaComponent,
    VerIniciativasComponent,
    VerMiPerfilComponent
    CrearIniciativaComponent,
    VerIniciativaComponent
  ],
  imports: [
    CommonModule,
    OngRoutingModule,
    MatIconModule,
    FormsModule, ReactiveFormsModule,
    NgbModule, GoogleMapsModule,
  ]
})
export class OngModule { }
