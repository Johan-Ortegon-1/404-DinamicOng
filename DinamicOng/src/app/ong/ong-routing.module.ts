import { RecomendacionesOngComponent } from './recomendaciones-ong/recomendaciones-ong.component';
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
const routes: Routes = [
  {
    path: '',
    component: OngComponent,
    children: [
      { path: 'crear-iniciativa', component: CrearIniciativaComponent},
      { path: 'iniciativa/:id', component: VerIniciativaComponent},
      { path: 'ver-iniciativas', component: VerIniciativasComponent},
      { path: 'ver-perfil' , component: VerMiPerfilComponent},
      { path: 'administrar-voluntarios' , component: AdministrarVoluntariosComponent},
      { path: 'buscar-voluntario' , component: BuscarVoluntarioComponent},
      { path: 'mostrar-busqueda-voluntario' , component: MostrarBusquedaVoluntarioComponent},
      { path: 'ver-voluntario/:id' , component: VerVoluntarioComponent},
      { path: 'chat', loadChildren: () => import('../chat/modulo-chat/modulo-chat.module').then(m => m.ModuloChatModule) },
      { path: 'recomendaciones-ong' , component: RecomendacionesOngComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OngRoutingModule { }
