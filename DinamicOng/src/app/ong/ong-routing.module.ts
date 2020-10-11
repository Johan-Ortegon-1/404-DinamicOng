import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearIniciativaComponent } from './crear-iniciativa/crear-iniciativa.component';
import { VerIniciativasComponent } from './ver-iniciativas/ver-iniciativas.component';


import { OngComponent } from './ong.component';
import { VerIniciativaComponent } from '../iniciativa/ver-iniciativa/ver-iniciativa.component';
import { VerMiPerfilComponent } from './ver-mi-perfil/ver-mi-perfil.component';

const routes: Routes = [
  {
    path: '', component: OngComponent,
    children: [
      {
        path: 'crear-iniciativa', component: CrearIniciativaComponent
      },
      {
        path: 'iniciativa/:id', component: VerIniciativaComponent
      },
      {
        path: 'ver-iniciativas', component: VerIniciativasComponent
      },
      {
        path: 'ver-perfil' , component: VerMiPerfilComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OngRoutingModule { }
