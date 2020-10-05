import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoluntarioComponent } from './voluntario.component';

const routes: Routes = [{ path: '', component: VoluntarioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoluntarioRoutingModule { }
