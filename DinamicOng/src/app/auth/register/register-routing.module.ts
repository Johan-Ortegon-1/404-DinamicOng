import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register.component';
import { RegisterOngComponent } from './register-ong/register-ong.component';
import { RegisterVoluntarioComponent } from './register-voluntario/register-voluntario.component';
import { RegisterHomeComponent } from './register-home/register-home.component';

const routes: Routes = [
  { path: '', component: RegisterComponent,
    children: [
      { path: '', component: RegisterHomeComponent },
      { path: 'ong', component: RegisterOngComponent },
      { path: 'voluntario', component: RegisterVoluntarioComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
