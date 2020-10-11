import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoluntarioComponent } from './voluntario.component';
import { VerIniciativaComponent } from '../iniciativa/ver-iniciativa/ver-iniciativa.component';
import { MisParticipacionesComponent } from './mis-participaciones/mis-participaciones.component';

const routes: Routes = [{ path: '', component: VoluntarioComponent, children: [
  {
    path: 'iniciativa/:id', component: VerIniciativaComponent
  },
  {
    path: 'participaciones', component: MisParticipacionesComponent
  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoluntarioRoutingModule { }
