import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearIniciativaComponent } from './crear-iniciativa/crear-iniciativa.component';
import { VerIniciativasComponent } from './ver-iniciativas/ver-iniciativas.component';


import { OngComponent } from './ong.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OngRoutingModule { }
