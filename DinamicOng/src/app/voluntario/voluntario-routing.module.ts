import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoluntarioComponent } from './voluntario.component';
import { BuscarIniciativaComponent } from './buscar-iniciativa/buscar-iniciativa.component';
import { MostrarBusquedaComponent } from './mostrar-busqueda/mostrar-busqueda.component';

const routes: Routes = [
  { path: '', component: VoluntarioComponent,
    children: [
      {path: 'buscar-iniciativa', component: BuscarIniciativaComponent},
      {path: 'mostrar-iniciativa', component: MostrarBusquedaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoluntarioRoutingModule { }
