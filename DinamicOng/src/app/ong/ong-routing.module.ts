import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearIniciativaComponent } from './crear-iniciativa/crear-iniciativa.component';

import { OngComponent } from './ong.component';
import { VerIniciativaComponent } from '../iniciativa/ver-iniciativa/ver-iniciativa.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OngRoutingModule { }
