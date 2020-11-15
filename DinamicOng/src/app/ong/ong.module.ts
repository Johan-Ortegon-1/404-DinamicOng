import { MostrarBusquedaVoluntarioComponent } from './mostrar-busqueda-voluntario/mostrar-busqueda-voluntario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OngRoutingModule } from './ong-routing.module';
import { OngComponent } from './ong.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BuscarVoluntarioComponent } from './buscar-voluntario/buscar-voluntario.component';
import { VerIniciativaComponent } from '../iniciativa/ver-iniciativa/ver-iniciativa.component';
import { VerIniciativasComponent } from './ver-iniciativas/ver-iniciativas.component';
import { VerMiPerfilComponent } from './ver-mi-perfil/ver-mi-perfil.component';
import { AdministrarVoluntariosComponent } from './administrar-voluntarios/administrar-voluntarios.component';
import { VerVoluntarioComponent } from './ver-voluntario/ver-voluntario.component';
import { NavbarOngComponent } from '../shared/navbar-ong/navbar-ong.component';
import { CrearIniciativaComponent } from '../iniciativa/crear-iniciativa/crear-iniciativa.component';
@NgModule({
  declarations: [
    OngComponent,
    NavbarOngComponent,
    CrearIniciativaComponent,
    BuscarVoluntarioComponent,
    VerIniciativasComponent,
    VerMiPerfilComponent,
    VerIniciativaComponent,
    AdministrarVoluntariosComponent,
    MostrarBusquedaVoluntarioComponent,
    VerVoluntarioComponent
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
