import { VerVoluntarioComponent } from './ver-voluntario/ver-voluntario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerIniciativasComponent } from './ver-iniciativas/ver-iniciativas.component';
import { AdministrarVoluntariosComponent } from './administrar-voluntarios/administrar-voluntarios.component';
import { OngComponent } from './ong.component';
import { VerIniciativaComponent } from '../iniciativa/ver-iniciativa/ver-iniciativa.component';
import { VerMiPerfilComponent } from './ver-mi-perfil/ver-mi-perfil.component';
import { BuscarVoluntarioComponent } from './buscar-voluntario/buscar-voluntario.component';
import { MostrarBusquedaVoluntarioComponent } from './mostrar-busqueda-voluntario/mostrar-busqueda-voluntario.component';
import { CrearIniciativaComponent } from '../iniciativa/crear-iniciativa/crear-iniciativa.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { VerNotificacionesComponent } from './ver-notificaciones/ver-notificaciones.component';
import { EditarIniciativaComponent } from '../iniciativa/editar-iniciativa/editar-iniciativa.component';
const routes: Routes = [
  {
    path: '',
    component: OngComponent,
    children: [
      { path: 'crear-iniciativa', component: CrearIniciativaComponent},
      { path: 'iniciativa/:id', component: VerIniciativaComponent},
      { path: 'ver-iniciativas', component: VerIniciativasComponent},
      { path: 'editar-iniciativa/:id', component: EditarIniciativaComponent},
      { path: 'ver-perfil' , component: VerMiPerfilComponent},
      { path: 'editar-perfil' , component: EditarPerfilComponent},
      { path: 'administrar-voluntarios' , component: AdministrarVoluntariosComponent},
      { path: 'buscar-voluntario' , component: BuscarVoluntarioComponent},
      { path: 'mostrar-busqueda-voluntario' , component: MostrarBusquedaVoluntarioComponent},
      { path: 'ver-notificaciones', component: VerNotificacionesComponent},
      { path: 'ver-voluntario/:id' , component: VerVoluntarioComponent},

      { path: 'chat', loadChildren: () => import('../chat/modulo-chat/modulo-chat.module').then(m => m.ModuloChatModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OngRoutingModule { }
