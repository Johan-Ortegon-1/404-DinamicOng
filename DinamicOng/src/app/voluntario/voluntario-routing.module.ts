import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoluntarioComponent } from './voluntario.component';
import { VerIniciativaComponent } from '../iniciativa/ver-iniciativa/ver-iniciativa.component';
import { MisParticipacionesComponent } from './mis-participaciones/mis-participaciones.component';
import { BuscarIniciativaComponent } from './buscar-iniciativa/buscar-iniciativa.component';
import { MostrarBusquedaComponent } from './mostrar-busqueda/mostrar-busqueda.component';
import { VerMiPerfilComponent } from './ver-mi-perfil/ver-mi-perfil.component';
import { VerOngComponent } from './ver-ong/ver-ong.component';
import { VerNotificacionesComponent } from './ver-notificaciones/ver-notificaciones.component';
import { RecomendacionesVoluntarioComponent } from './recomendaciones-voluntario/recomendaciones-voluntario.component';
import { VerVoluntarioComponent } from './../ong/ver-voluntario/ver-voluntario.component';

const routes: Routes = [
  { path: '', component: VoluntarioComponent,
    children: [
      {path: 'buscar-iniciativa', component: BuscarIniciativaComponent},
      {path: 'mostrar-iniciativa', component: MostrarBusquedaComponent},
      {path: 'mi-perfil', component: VerMiPerfilComponent},
      {path: 'ver-ong/:id', component: VerOngComponent} ,
      { path: 'iniciativa/:id', component: VerIniciativaComponent },
      { path: 'participaciones', component: MisParticipacionesComponent },
      { path: 'ver-notificaciones', component: VerNotificacionesComponent },
      { path: 'chat', loadChildren: () => import('../chat/modulo-chat/modulo-chat.module').then(m => m.ModuloChatModule) },
      {path: 'recomendaciones-voluntario', component: RecomendacionesVoluntarioComponent},
      { path: 'ver-voluntario/:id' , component: VerVoluntarioComponent },
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoluntarioRoutingModule { }
