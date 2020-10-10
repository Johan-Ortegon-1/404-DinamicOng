import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoluntarioComponent } from './voluntario.component';
import { BuscarIniciativaComponent } from './buscar-iniciativa/buscar-iniciativa.component';

const routes: Routes = [
  { path: '', component: VoluntarioComponent,
    children: [
      {path: 'buscar-iniciativa', component: BuscarIniciativaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoluntarioRoutingModule { }
