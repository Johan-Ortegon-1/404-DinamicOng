import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoluntarioComponent } from './voluntario.component';
import { VerIniciativaComponent } from '../iniciativa/ver-iniciativa/ver-iniciativa.component';
import { MisParticipacionesComponent } from './mis-participaciones/mis-participaciones.component';
import { BuscarIniciativaComponent } from './buscar-iniciativa/buscar-iniciativa.component';
import { MostrarBusquedaComponent } from './mostrar-busqueda/mostrar-busqueda.component';
import { VerMiPerfilComponent } from './ver-mi-perfil/ver-mi-perfil.component';
import { VerOngComponent } from './ver-ong/ver-ong.component';

const routes: Routes = [
  { path: '', component: VoluntarioComponent,
    children: [
      {path: 'buscar-iniciativa', component: BuscarIniciativaComponent},
      {path: 'mostrar-iniciativa', component: MostrarBusquedaComponent},
      {path: 'mi-perfil', component: VerMiPerfilComponent},
      {path: 'ver-ong', component: VerOngComponent} ,
      { path: 'iniciativa/:id', component: VerIniciativaComponent },
      { path: 'participaciones', component: MisParticipacionesComponent }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoluntarioRoutingModule { }
