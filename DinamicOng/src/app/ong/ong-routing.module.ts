import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearIniciativaComponent } from './crear-iniciativa/crear-iniciativa.component';
import { VerIniciativasComponent } from './ver-iniciativas/ver-iniciativas.component';


import { OngComponent } from './ong.component';
import { VerMiPerfilComponent } from './ver-mi-perfil/ver-mi-perfil.component';
import { VerIniciativaComponent } from '../iniciativa/ver-iniciativa/ver-iniciativa.component';

const routes: Routes = [
  {
    path: '', component: OngComponent,
    children: [
      {
        path: 'crear-iniciativa', component: CrearIniciativaComponent
      },
      {
        path: 'ver-iniciativas', component: VerIniciativasComponent
      },
      {
        path: 'ver-perfil' , component: VerMiPerfilComponent
      },
      {
        path: 'iniciativa/:id', component: VerIniciativaComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OngRoutingModule { }
