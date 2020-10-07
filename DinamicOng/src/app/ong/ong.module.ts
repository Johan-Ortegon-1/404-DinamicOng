import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OngRoutingModule } from './ong-routing.module';
import { OngComponent } from './ong.component';
import { NavbarOngComponent } from './shared/navbar-ong/navbar-ong.component';
import { MatIconModule } from '@angular/material/icon';
import { CrearIniciativaComponent } from './crear-iniciativa/crear-iniciativa.component';


@NgModule({
  declarations: [
    OngComponent,
    NavbarOngComponent,
    CrearIniciativaComponent
  ],
  imports: [
    CommonModule,
    OngRoutingModule,
    MatIconModule
  ]
})
export class OngModule { }
