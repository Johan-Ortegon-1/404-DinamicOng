import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoluntarioComponent } from './voluntario.component';
import { VerMiPerfilComponent } from './ver-mi-perfil/ver-mi-perfil.component';

const routes: Routes = [
  {
    path: '', component: VoluntarioComponent,
    children: [
      { path: 'mi-perfil', component: VerMiPerfilComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoluntarioRoutingModule { }
